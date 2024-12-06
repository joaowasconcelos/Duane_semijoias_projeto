import multer from "multer";
import admin from "firebase-admin";
// import serviceAccount from "../config/firebase.js";
import serviceAccount from "../config/firebase.json" assert { type: 'json' };

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