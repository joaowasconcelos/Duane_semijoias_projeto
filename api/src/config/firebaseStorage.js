import admin from "firebase-admin";
// import serviceAccount from "./firebasekey.json" assert { type: 'json' };
import serviceAccount from "./firebase.js";

const bucketName = "teste-firebase-b05a9.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = admin.storage().bucket();

const uploadImage = async (imagem,id_img) => {
  // console.log("AQUI")
  // console.log(imagem)
  // if (!req.file) return next();
  // const imagem = req.file;
  // console.log(Date.now() );
  // console.log(imagem.originalname.split("."));
  const nomeArquivo = id_img;
  const file = bucket.file(nomeArquivo);
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