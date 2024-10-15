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
            const produtoImgResult = await bd.query(`INSERT INTO produto_img (id_img,produto_id)VALUES((SELECT REPLACE(DATE_FORMAT(CURRENT_TIMESTAMP(6), '%H%i%s%f'), ':', '') AS id_imagem),?);`,
                [this._id_produto]);
            const produtoImgId = produtoImgResult[0].insertId;
            const select = await bd.query(`SELECT id_img FROM produto_img WHERE id = ?;`,[produtoImgId])
            return select[0][0].id_img
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
            console.log(produtoImgResult)
            return produtoImgResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

}
