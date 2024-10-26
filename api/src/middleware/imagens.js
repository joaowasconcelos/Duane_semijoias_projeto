import multer from "multer";
import admin from "firebase-admin";
import sharp from 'sharp';
import serviceAccount from "../config/firebase.js";

const bucketName = "teste-firebase-b05a9.appspot.com";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
});
const bucket = admin.storage().bucket();


const storage = multer.diskStorage({
    destination: (req) => {
        console.log(storage)
        console.log(req.body);
        console.log(req.files);
        console.log(req.body.descricao);
       
        const nomeArquivo = `${Date.now()}-${req.body.descricao}`;

        const file = bucket.file(nomeArquivo);
        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg',
            }
        });

        stream.on('error', (err) => {
            console.error('Erro ao salvar a imagem:', err);
            return res.status(500).send('Erro ao salvar a imagem.');
        });

        stream.on('finish', async () => {
            await file.makePublic();

            const firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nomeArquivo}`;
            console.log('Imagem salva com sucesso:', firebaseUrl);
        });

        stream.end();
    },
   
});

export const upload = multer({ storage });

