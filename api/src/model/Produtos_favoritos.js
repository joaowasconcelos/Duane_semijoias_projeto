import obterConexaoDoPool from "../config/mysql.js"

export default class Produto_Fav {
    constructor(Id, ID_Produto, ID_Pessoa) {
        this._id = Id;
        this._id_produto = ID_Produto;
        this._id_pessoa = ID_Pessoa;
    }

    get Id() {
        return this._id;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }

    set Id(value) {
        this._id = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    async CadastraProduto_Fav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`INSERT INTO produto_favoritos(produto_id,pessoa_id) VALUES (?,?);`,[this._id_produto,this._id_produto]);
            const produtoFavId = produtoFavResult[0].insertId;
            console.log('ID do produto_favorito:', produtoFavId);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeleteProdutoFav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`DELETE FROM produto_favorito WHERE pessoa_id = ?;`[this._id_pessoa]);
            console.log(produtoFavResult);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaProdutoFav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`SELECT * FROM produto_favorito WHERE pessoa_id = ?;`,[this._id_pessoa]);
            console.log(produtoFavResult);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}
