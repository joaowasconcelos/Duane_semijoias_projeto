import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL,deleteObject} from "firebase/storage"


// Inicializando o Firebase
const storage = getStorage();