import admin from "firebase-admin"
import serviceAccount from "../config/duane-semijoias-firebase-adminsdk.json" assert { type: 'json' }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const bucket = admin.storage().bucket();

const uploadImage = async (imagem,id_img) => {
  console.log("AQUI")
  console.log(imagem)
  const nomeArquivo = id_img;
  console.log(nomeArquivo)
  const file = bucket.file(nomeArquivo);
  console.log(file)
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    }
  });

  stream.on("error", (e) => {
    console.error(e);
  });
  
  stream.on("finish", async () => {
    await file.makePublic();
    imagem.firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nomeArquivo}`;
    next();
  });
  stream.end(imagem.buffer);
};

const listAllFiles = async () => {
  try {
    const [files] = await bucket.getFiles();
    const fileUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
    return fileUrls;
  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error('Error listing files');
  }
};

export { uploadImage, listAllFiles };