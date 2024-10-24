import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('multer: ', req.body);
        //cb(null, 'src/public/uploads/imagensProdutos');
    },
    filename: (req, file, cb) => {
        console.log('multer: ', req.body);
        //cb(null, Date.now() + '-' + req.body.descricao+('.png'));
    }
});

export const upload = multer({ storage });

