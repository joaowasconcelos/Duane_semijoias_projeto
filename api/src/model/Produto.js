import obterConexaoDoPool from "../config/mysql.js"

export default class Produto {
    constructor(id, descricao, status, nomeProduto, ID_categoria) {
        this._id = id;
        this._descricao = descricao;
        this._status = status;
        this._nomeProduto = nomeProduto;
        this._id_categoria = ID_categoria
    }

    get id() {
        return this._id;
    }

    get descricao() {
        return this._descricao;
    }

    get status() {
        return this._status;
    }

    get ID_categoria() {
        return this._id_categoria;
    }

    get nomeProduto() {
        return this._nomeProduto;
    }
    set id(value) {
        this._id = value;
    }

    set descricao(value) {
        this._descricao = value;
    }

    set status(value) {
        this._status = value;
    }

    set nomeProduto(value) {
        this._nomeProduto = value;
    }

    set ID_categoria(value) {
        this._id_categoria = value;
    }

    async CadastraProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`INSERT INTO produto (nome_produto, descricao, status, data_cad,categoria_id) VALUES (?, ?, ?, CURRENT_TIMESTAMP,?);`,
                [this._nomeProduto, this._descricao, this._status,this._id_categoria]);
            const produtoId = produtoResult[0].insertId;
            console.log('ID do protudo:', produtoId);
            return produtoId;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`UPDATE produto SET nome_produto = ?, descricao = ?, status = ? where id = ?;`,[this._nomeProduto, this._descricao, this._status,this._id]);
            console.log(produtoResult)
            return produtoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`DELETE FROM produto WHERE id = ?;`,[this._id]);
            console.log(produtoResult)
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelectProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`SELECT * FROM produtos`);
            console.log(produtoResult)
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}
