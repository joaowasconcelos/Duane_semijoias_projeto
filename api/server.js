import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import user from "./src/routes/user.js"


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use("/", user);

app.listen(process.env.port, () => {
    console.log(`Servidor respondendo na porta`);
});
