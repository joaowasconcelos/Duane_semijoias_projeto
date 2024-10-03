import obterConexaoDoPool from "../config/mysql.js"

export default class Pedido {
    constructor(id, status, valor_total, ID_Pessoa) {
        this._id = id;
        this._status = status;
        this._valor_total = valor_total;
        this._id_pessoa = ID_Pessoa;
    }

    get id() {
        return this._id;
    }

    get status() {
        return this._status;
    }

    get valor_total() {
        return this._valor_total;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }

    set id(value) {
        this._id = value;
    }

    set status(value) {
        this._status = value;
    }

    set valor_total(value) {
        this._valor_total = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    async CadastraPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`INSERT INTO pedidos (pessoa_id,status,valor_total,data_cad) VALUES (?, ?, ?,CURRENT_TIMESTAMP);`,
                [this._id_pessoa,this._status,this._valor_total]);
            const pedidoId = pedidoResult[0].insertId;
            console.log('ID do pedido:', pedidoId);
            return pedidoId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaStatusPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`UPDATE pedidos SET status =? WHERE id = ?;`,
                [this._status, this._id]);
            console.log(pedidoResult);
            return pedidoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`DELETE FROM pedidos WHERE id = ?;`,
                [this._id]);
            console.log(pedidoResult);
            return pedidoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async PedidoPorUsuario() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`SELECT * FROM pedidos WHERE pessoa_id = ?;`,[this._id_pessoa]);
            console.log(pedidoResult);
            return pedidoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelecionaPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`SELECT id,status,data_cad FROM pedidos;`);
            return pedidoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    validaCampos() {
        if (!this._status || !this._valor_total || !this._id_pessoa ) {
            return false
        }
        return true 
    }
}
