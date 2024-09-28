import obterConexaoDoPool from "../config/mysql.js"

export default class Categoria {
    constructor(id, tipo) {
        this._id = id;
        this._tipo = tipo;
    }
    
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get tipo() {
        return this._tipo;
    }

    set tipo(value) {
        this._tipo = value;
    }

    async CadastraCategoria() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`INSERT INTO categoria (tipo) VALUES (?)`,[this._tipo]);
            const categoriaId = categoriaResult[0].insertId;
            console.log('ID da categoria:', categoriaId);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async modificaCategoria() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`UPDATE categoria SET tipo = ? WHERE id = ?`,[this._tipo,this._id]);
            console.log(categoriaResult);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletarCategoria() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`DELETE FROM categoria WHERE id = ?`,[this._id]);
            console.log(categoriaResult);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
    
    async SelecionarCategorias() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`SELECT * FROM categoria`);
            console.log(categoriaResult);
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}
