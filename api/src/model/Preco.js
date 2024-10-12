import obterConexaoDoPool from "../config/mysql.js"

export default class Preco {
    constructor(Id, Preco, Status, ID_Produto) {
        this._id = Id;
        this._preco = Preco;
        this._status = Status;
        this._id_produto = ID_Produto;
    }
    get Id() {
        return this._id;
    }

    get Preco() {
        return this._preco;
    }

    get Status() {
        return this._status;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    set Id(value) {
        this._id = value;
    }

    set Preco(value) {
        this._preco = value;
    }

    set Status(value) {
        this._status = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    async CadastraPreco() {
        const bd = await obterConexaoDoPool();
        try {
            const precoSelect = await bd.query(`SELECT * FROM preco WHERE produto_id = ? ORDER BY id DESC LIMIT 1;`,[this._id_produto])
            const preco = precoSelect[0].Id

            if(preco == 0){
                const precoResult = await bd.query(`INSERT INTO preco (preco,status,produto_id,data_cad) VALUES (?,?,?,CURRENT_TIMESTAMP);`,[this._preco,this._status,this._id_produto]);
                const precoId = precoResult[0].insertId;
                console.log('ID do preco:', precoId);
                return precoId
            }

            const precoModifica = await bd.query(`UPDATE preco SET status = ? WHERE id = ?;`,[this._status,preco])
            console.log(precoModifica)

           
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}
