import obterConexaoDoPool from "../config/mysql.js";

class Feedback {
    constructor(id, avaliacao, comentario, idProduto, idPessoa) {
        this._id = id;
        this._avaliacao = avaliacao;
        this._comentario = comentario;
        this._idProduto = idProduto;
        this._idPessoa = idPessoa;
    }

    // Getters e Setters
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get avaliacao() { return this._avaliacao; }
    set avaliacao(value) { this._avaliacao = value; }

    get comentario() { return this._comentario; }
    set comentario(value) { this._comentario = value; }

    get idProduto() { return this._idProduto; }
    set idProduto(value) { this._idProduto = value; }

    get idPessoa() { return this._idPessoa; }
    set idPessoa(value) { this._idPessoa = value; }

    // Métodos de CRUD
    async cadastrarFeedback() {
        const bd = await obterConexaoDoPool();
        try {
            const query = `
                INSERT INTO feedback (avaliacao, comentario, id_produto, id_pessoa)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await bd.query(query, [this._avaliacao, this._comentario, this._idProduto, this._idPessoa]);
            this._id = result.insertId;
            return this._id;
        } catch (error) {
            return { error: 'Erro ao cadastrar feedback', details: error };
        } finally {
            bd.release();
        }
    }

    async modificarFeedback() {
        const bd = await obterConexaoDoPool();
        try {
            const query = `
                UPDATE feedback SET avaliacao = ?, comentario = ?, id_produto = ?, id_pessoa = ?
                WHERE id = ?
            `;
            const result = await bd.query(query, [this._avaliacao, this._comentario, this._idProduto, this._idPessoa, this._id]);
            return result;
        } catch (error) {
            return { error: 'Erro ao modificar feedback', details: error };
        } finally {
            bd.release();
        }
    }

    async deletarFeedback() {
        const bd = await obterConexaoDoPool();
        try {
            const query = `DELETE FROM feedback WHERE id = ?`;
            const result = await bd.query(query, [this._id]);
            return result;
        } catch (error) {
            return { error: 'Erro ao deletar feedback', details: error };
        } finally {
            bd.release();
        }
    }

    static async selecionarFeedbacksPorProduto(idProduto) {
        const bd = await obterConexaoDoPool();
        try {
            const query = `SELECT * FROM feedback WHERE id_produto = ?`;
            const [result] = await bd.query(query, [idProduto]);
            return result;
        } catch (error) {
            return { error: 'Erro ao buscar feedbacks por produto', details: error };
        } finally {
            bd.release();
        }
    }
}

export default Feedback;
