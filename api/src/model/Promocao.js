import obterConexaoDoPool from "../config/mysql.js"

export default class Promocao {
    constructor(Id, Categoria_Produto, Valor, ID_Categoria, ID_Produto) {
        this._id = Id; 
        this._categoria_produto = Categoria_Produto;
        this._valor = Valor;
        this._id_categoria = ID_Categoria;
        this._id_produto = ID_Produto;
    }

    get Id() {
        return this._id;
    }

    get Categoria_Produto() {
        return this._categoria_produto;
    }

    get Valor() {
        return this._valor;
    }

    get ID_Categoria() {
        return this._id_categoria;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    set Id(value) {
        this._id = value;
    }

    set Categoria_Produto(value) {
        this._categoria_produto = value;
    }

    set Valor(value) {
        this._valor = value;
    }

    set ID_Categoria(value) {
        this._id_categoria = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    async CadastraPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const promocaoResult = await bd.query(`INSERT INTO promocao(categoria_produto,valor,categoria_id,produto_id) VALUES (?,?,?,?);`,
                [this._categoria_produto,this._valor,this._id_categoria,this._id_produto]);
            const promocaoId = promocaoResult[0].insertId;
            return promocaoId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const promocaoResult = await bd.query(`UPDATE promocao SET categoria_produto = ?, valor =?, categoria_id=?, produto_id=? WHERE id = ?;`,
                [this._categoria_produto,this._valor,this._id_categoria,this._id_produto,this._id]);
            console.log(promocaoResult);
            return promocaoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletePromocao() {
        const bd = await obterConexaoDoPool();
        console.log(this._id)
        try {
            const promocaoResult = await bd.query(`DELETE FROM promocao WHERE id = ?;`,[this._id]);
            return promocaoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelecionaPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const promocaoResult = await bd.query(`SELECT * FROM promocao;`);
            console.log(promocaoResult);
            return promocaoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    validaCampos() {
        if (!this._categoria_produto || !this._id_categoria || !this._valor || !this._id_produto) {
            return false
        }
        return true 
    }
}
