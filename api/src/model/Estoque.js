import obterConexaoDoPool from "../config/mysql.js"

export default class Estoque {
    constructor(id, quantidade, idProduto) {
        this._id = id;
        this._quantidade = quantidade;
        this._idProduto = idProduto;
    }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    get quantidade() { return this._quantidade; }
    set quantidade(value) { this._quantidade = value; }

    get idProduto() { return this._idProduto; }
    set idProduto(value) { this._idProduto = value; }

    async CadastrarEstoque() {
        const bd = await obterConexaoDoPool();
        try {
          const estoqueResult = await bd.query(`INSERT INTO estoque (quantidade,produto_id) VALUES (?,?);`,[this._quantidade,this._idProduto])
          const estoqueId = estoqueResult[0].insertId;

        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaEstoque() {
        const bd = await obterConexaoDoPool();
        try {
          const estoqueResult = await bd.query(`UPDATE estoque SET quantidade=? WHERE produto_id =?;`,[this._quantidade,this._idProduto])
          console.log(estoqueResult);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaEstoque() {
        const bd = await obterConexaoDoPool();
        try {
          const estoqueResult = await bd.query(`SELECT * FROM estoque;`)
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    verificaCampos() {
        if ( 
            this._quantidade.length > 10 ||  
            this._idProduto.length > 10) {  
            return false;
        }
        return true;
    }

    validaCampos() {
        if (!this._id || 
            !this._quantidade || 
            !this._idProduto) {
            return false;
        }
        return true;
    }
}
