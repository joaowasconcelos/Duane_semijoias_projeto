import multer from "multer";
import admin from "firebase-admin";
import serviceAccount from "../config/firebase.js";
import obterConexaoDoPool from "../config/mysql.js"
//import serviceAccount from "../config/firebase.json" assert { type: 'json' };

// Inicializa o Firebase Admin SDK
const bucketName = "teste-firebase-b05a9.appspot.com";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
});

const bucket = admin.storage().bucket();

// Configura o multer para armazenar arquivos na memória
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImagesToFirebase = async (files) => {
    const uploadPromises = files.map(async (file) => {
        const nomeArquivo = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
        const fileUpload = bucket.file(nomeArquivo);

        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        return new Promise((resolve, reject) => {
            stream.on('error', (err) => {
                console.error('Erro ao salvar a imagem:', err);
                reject(err);
            });

            stream.on('finish', async () => {
                try {
                    // Adiciona um pequeno atraso antes de tornar o arquivo público
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    await fileUpload.makePublic();
                    const firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nomeArquivo}`;
                    resolve(nomeArquivo);
                } catch (error) {
                    console.error('Erro ao tornar a imagem pública:', error);
                    reject(error);
                }
            });

            stream.end(file.buffer);
        });
    });

    return Promise.all(uploadPromises);
};

// Middleware para processar o upload e inserir no banco
export const handleImageUpload = async (req, res, next) => {
    try {
        // O multer irá popular req.files
        const files = req.files;

        // Verifica se existem arquivos
        if (!files || files.length === 0) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        // Faz o upload das imagens para o Firebase
        const imageUrls = await uploadImagesToFirebase(files);
        req.imageUrls = imageUrls;
        next();
    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).send('Erro ao fazer upload das imagens.');
    }
};


export async function listAllFilesId(produtos) {
    for (const produto of produtos) {
        const urlsImagens = await Promise.all(produto.imagens.map(async (idImagem) => {
            const arquivo = bucket.file(idImagem);
            try {
                const [url] = await arquivo.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500'
                });
                return url; 
                
            } catch (error) {
                console.warn(`Imagem ${idImagem} não encontrada no Firebase.`);
                return null; 
            }
        }));
        produto.imagens = urlsImagens.filter(url => url);
    }

    return produtos;
}
const uploadSingleImageToFirebase = async (file, nomeArquivo) => {
    const bucket = admin.storage().bucket(); // Pega o bucket do Firebase
    const fileUpload = bucket.file(nomeArquivo); // Cria um arquivo no bucket com o nome gerado

    // Cria um stream de escrita para o arquivo
    const stream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype, // Define o tipo de conteúdo da imagem
        },
    });

    return new Promise((resolve, reject) => {
        // Evento de erro
        stream.on('error', (err) => {
            console.error('Erro ao salvar a imagem no Firebase:', err);
            reject(err);
        });

        // Evento de término do upload
        stream.on('finish', async () => {
            try {
                // Adiciona um pequeno atraso antes de tornar o arquivo público
                await new Promise((resolve) => setTimeout(resolve, 800));
                // Torna a imagem pública
                await fileUpload.makePublic();
                const firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${nomeArquivo}`;
                console.log(`Imagem upload concluído: ${firebaseUrl}`);
                resolve(firebaseUrl); // Resolve com a URL da imagem
            } catch (error) {
                console.error('Erro ao tornar a imagem pública:', error);
                reject(error);
            }
        });

        // Envia a imagem para o Firebase
        stream.end(file.buffer);
    });
};

// Função para buscar as imagens antigas do banco de dados
export const getImagensAntigas = async (produtoImg) => {
    const pool = await obterConexaoDoPool();
    try {
        const query = `
            SELECT id_img 
            FROM produto_img 
            WHERE produto_img = ?;
        `;

        const [rows] = await pool.execute(query, [produtoImg]); // Executa a query com o valor de produtoImg

        // Retorna os IDs das imagens, caso existam
        return rows.map(row => row.id_img);
    } catch (error) {
        console.error('Erro ao buscar imagens antigas:', error);
        throw new Error('Erro ao buscar imagens antigas no banco de dados');
    }
};

// Função para gerenciar o upload e exclusão das imagens
export const manageImagesUpload = async (req, res, next) => {
    try {
        const { produtoImg } = req.body; // Obtém o produto_img do corpo da requisição (do frontend)
        
        // Chama a função para buscar as imagens antigas no banco
        const imagensAntigas = await getImagensAntigas(produtoImg);
        const todasImagens = req.files || []; // Todas as imagens recebidas (novas + antigas)

        // Vamos separar as imagens em novas e antigas
        const novasImagens = [];
        const antigasImagens = [...imagensAntigas]; // Começa com as imagens antigas que já estavam no banco

        // Verificar cada imagem recebida
        for (const file of todasImagens) {
            const nomeArquivo = file.originalname; // Nome original da imagem enviada pelo frontend
            const arquivo = bucket.file(nomeArquivo);

            // Verifica se a imagem já existe no Firebase
            const [exists] = await arquivo.exists();
            if (exists) {
                // Se a imagem já existir no Firebase, é uma imagem antiga
                antigasImagens.push(nomeArquivo);
            } else {
                // Se a imagem não existir, é uma nova imagem
                novasImagens.push(file);
            }
        }

        // Adiciona as novas imagens ao Firebase
        const uploadedImages = [];
        if (novasImagens.length > 0) {
            const uploadedImagePromises = novasImagens.map(async (file) => {
                const nomeArquivo = `${Date.now()}${Math.floor(Math.random() * 10000)}`; // Gera um nome único para a nova imagem
                await uploadSingleImageToFirebase(file, nomeArquivo); // Envia a imagem para o Firebase
                uploadedImages.push(nomeArquivo); // Salva o nome da imagem enviada
            });

            // Espera o upload de todas as novas imagens
            await Promise.all(uploadedImagePromises);
        }

        // Mescla as imagens antigas com as novas
        const updatedImages = [...antigasImagens, ...uploadedImages];

        // Remove imagens antigas que não estão mais na lista enviada
        const imagensParaRemover = imagensAntigas.filter(
            (imagemAntiga) => !updatedImages.includes(imagemAntiga)
        );

        if (imagensParaRemover.length > 0) {
            await Promise.all(
                imagensParaRemover.map(async (idImagem) => {
                    const arquivo = bucket.file(idImagem);
                    try {
                        await arquivo.delete();
                        console.log(`Imagem ${idImagem} removida com sucesso.`);
                    } catch (error) {
                        console.warn(`Erro ao remover imagem ${idImagem}:`, error);
                    }
                })
            );
        }

        // Atualiza a requisição com as imagens válidas (novas e antigas)
        req.imageUrls = updatedImages;

        next(); // Passa para o controlador
    } catch (error) {
        console.error('Erro ao gerenciar imagens:', error);
        res.status(500).send('Erro ao processar imagens.');
    }
};