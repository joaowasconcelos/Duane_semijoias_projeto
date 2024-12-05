import obterConexaoDoPool from "../config/mysql.js"

export default class Produto_Img {
    constructor(Id, ID_Img, ID_Produto) {
        this._id = Id;
        this._id_img = ID_Img;
        this._id_produto = ID_Produto;
    }

    get Id() {
        return this._id;
    }

    get ID_Img() {
        return this._id_img;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    set Id(value) {
        this._id = value;
    }

    set ID_Img(value) {
        this._id_img = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    async CadastraProdutoImg() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoImgResult = await bd.query(`INSERT INTO produto_img (id_img,produto_id)VALUES(?,?);`,
                [this._id_img,this._id_produto]);
            const produtoImgId = produtoImgResult[0]
            return produtoImgId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaProdutoImg() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoImgResult = await bd.query(`DELETE FROM produto_img WHERE id_img = ?;`,[this._id_img]);
            return produtoImgResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
    buscarBanco = async (id) => {
        const bd = await obterConexaoDoPool();
        try {
            const produto = await bd.query(`SELECT id_img FROM produto_img WHERE produto_id = ?`, [this._id]);
            const ids = produto[0].map(row => row.id_img);
            console.log(produto)
            console.log("IDs extraídos:", ids);
            return ids;
            
        } catch (error) {
            console.error('Erro ao buscar produto pelo ID:', error);
            throw new Error('Erro ao buscar produto pelo ID.');
        }
    };
    static adicionar = async (id_img,produto) => {
        const bd = await obterConexaoDoPool();
        try {
            const resultado = await bd.query(`INSERT INTO produto_img (id_img, produto_id) values (?,?)`,[id_img,produto])
            return resultado;
        } catch (error) {
            
        }
    };
    static excluir = async (id_img) => {
        const bd = await obterConexaoDoPool();
        try {
            const resultado = await bd.query(`DELETE FROM produto_img WHERE id_img = ?`,[id_img])
            return resultado;
        } catch (error) {
            
        }
    }


}
