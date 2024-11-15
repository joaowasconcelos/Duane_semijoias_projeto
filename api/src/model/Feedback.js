import obterConexaoDoPool from "../config/mysql.js";

export default class Feedback {
    constructor(Id, Avaliacao, Comentario, ID_Produto, ID_Pessoa) {
        this._id = Id;
        this._avaliacao = Avaliacao;
        this._comentario = Comentario;
        this._id_produto = ID_Produto;
        this._id_pessoa = ID_Pessoa;
    }

    // Getters
    get id() {
        return this._id;
    }

    get avaliacao() {
        return this._avaliacao;
    }

    get comentario() {
        return this._comentario;
    }

    get id_produto() {
        return this._id_produto;
    }

    get id_pessoa() {
        return this._id_pessoa;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set avaliacao(value) {
        this._avaliacao = value;
    }

    set comentario(value) {
        this._comentario = value;
    }

    set id_produto(value) {
        this._id_produto = value;
    }

    set id_pessoa(value) {
        this._id_pessoa = value;
    }

    async CadastrarFeedback() {
        const bd = await obterConexaoDoPool();
        try {
            const feedbackResult = await bd.query(`INSERT INTO comentarios (comentarios,produto_id,pessoa_id,avaliacao) VALUES (?,?,?,?);`,
                [this._comentario,this._id_produto,this._id_pessoa,this._avaliacao]);
            const feedbackId = feedbackResult[0].insertId;
            return feedbackId;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
  async modificarFeedback() {
        const bd = await obterConexaoDoPool();
        try {
            const updateResult = await bd.query (`UPDATE comentarios SET avaliacao = ?, comentarios = ? WHERE id = ? AND pessoa_id =? AND produto_id = ?;`,
                [this._avaliacao, this._comentario, this._id,this._id_pessoa,this._id_produto]);
            return updateResult;
        } catch (error) {
            return { error: 'Erro ao modificar feedback', details: error };
        } finally {
            bd.release();
        }
    }

    // async deletarFeedback() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const query = `DELETE FROM comentarios WHERE id = ?`;
    //         const result = await bd.query(query, [this._id]);
    //         return result;
    //     } catch (error) {
    //         return { error: 'Erro ao deletar feedback', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }

    static async selecionarFeedbacksPorProduto(idProduto) {
        const bd = await obterConexaoDoPool();
        try {
            const query = `SELECT * FROM comentarios WHERE produto_id = ?`;
            const [result] = await bd.query(query, [idProduto]);
            return result;
        } catch (error) {
            return { error: 'Erro ao buscar feedbacks por produto', details: error };
        } finally {
            bd.release();
        }
    }

    
    validaCampos() {
        if (!this._avaliacao || !this._comentario|| !this._id_pessoa|| !this._id_produto) {
            return false
        }
        return true 
    }

    verificaCampos() {
        if(this._avaliacao.length>5|| this._comentario.length>100 || this._id_pessoa === 0 || this._id_produto ===0 ){
            return false
        }
        return true
    }

}
