import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import admin from "firebase-admin";
import serviceAccount from "../config/firebase.json" assert { type: 'json' };
import Produto_Img from '../model/Produto_img.js';
// import serviceAccount from "../config/firebase.json";


const bucketName = "teste-firebase-b05a9.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
});

const bucket = admin.storage().bucket();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const UploadImagens = {
    Imagens: async (req, res, next) => {
        try {
            const { id_produto } = req.params
            const cProduto = new Produto_Img(null, null, id_produto)
            const insertProduto_img = await cProduto.CadastraProdutoImg()

            if (!req.file) {
                return res.status(400).send('Nenhuma imagem foi enviada.');
            }

            const imagem = req.file;
            const nomeArquivo = insertProduto_img; // Nome do arquivo gerado dinamicamente com base no tempo

            console.log(`Nome do arquivo: ${nomeArquivo}`);
            console.log(imagem.originalname.split("."));

            // // Processo para salvar no armazenamento (Firebase/Google Cloud Storage)
            // // Exemplo comentado:

            const file = bucket.file(nomeArquivo);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: imagem.mimetype,
                }
            });

            stream.on("error", (e) => {
                console.error(e);
                res.status(500).send('Erro ao salvar a imagem.');
            });

            stream.on("finish", async () => {
                await file.makePublic();
                imagem.firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nomeArquivo}`;
                next();
            });

            stream.end(imagem.buffer);

            return res.status(200).json({ message: `Imagem ${nomeArquivo} processada com sucesso!` });

        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar a imagem.');
        }
    },

    listAllFiles: async (req, res) => {
        try {
            const [files] = await bucket.getFiles();
            const fileUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
            console.log(fileUrls)
            return res.json(fileUrls)
        } catch (error) {
            console.error('Error listing files:', error);
            throw new Error('Error listing files');
        }
    },

    listAllFilesId: async (req, res) => {
        try {
            const filename = req.params.filename;
            const file = bucket.file(filename);
            console.log(`Filename: ${filename}`);

            // Verifica se o arquivo existe
            const exists = await file.exists();
            if (!exists[0]) {
                return res.status(404).send('File not found');
            }

            // Monta a URL da imagem
            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            console.log(`File URL: ${fileUrl}`);

            // Retorna a URL em um JSON
            return res.json({ url: fileUrl });

        } catch (error) {
            console.error('Error retrieving file URL:', error);
            res.status(500).send('Error retrieving file URL');
        }
    },
    DeleteImage: async (req, res) => {
        try {
            const { id} = req.params
            console.log(id)
            const cProduto = new Produto_Img(null, id)
            const deleteProduto_img = await cProduto.DeletaProdutoImg()
            const file = bucket.file(id); 
            await file.delete();
            return res.status(200).json({ message: 'Imagem excluída com sucesso.' });
        } catch (error) {
            console.error('Error retrieving file URL:', error);
            res.status(500).send('Error retrieving file URL');
        }
    },

    Multer: multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 1024 * 1024 } // Limite de 1MB para o tamanho do arquivo
    }).single('imagem') // Nome do campo de upload
}

export default UploadImagens;
