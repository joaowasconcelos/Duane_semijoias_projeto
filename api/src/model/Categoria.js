import obterConexaoDoPool from "../config/mysql.js"

export default class Categoria {
    constructor(id, tipo,status) {
        this._id = id;
        this._tipo = tipo;
        this._status = status
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

    
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }


    async CadastraCategoria() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`INSERT INTO categoria (tipo,status) VALUES (?,?)`,[this._tipo,this.status]);
            const categoriaId = categoriaResult[0].insertId;
            console.log('ID da categoria:', categoriaId);
            return categoriaId
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
            return categoriaResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
    
   static async SelecionarCategorias() {
        const bd = await obterConexaoDoPool();
        try {
            const categoriaResult = await bd.query(`SELECT * FROM categoria`);
            return categoriaResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    validaCampos() {
        if (!this._tipo) {
            return false
        }
        return true 
    }
    verificaCampos(){
        if(this._tipo.length>50 ){
            return false
        }
        return true
    }

}
