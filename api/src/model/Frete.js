import obterConexaoDoPool from "../config/mysql.js";

export default class Frete {
    constructor(Id,Acompanhamento, ID_Pedido) {
        this._id = Id;
        this._acompanhamento = Acompanhamento;
        this._id_pedido = ID_Pedido;
    }

    // Getters
    get id() {
        return this._id;
    }

    get ID_Pedido() {
        return this._id_pedido;
    }
    get Acompanhamento() {
        return this._acompanhamento;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set ID_Pedido(value) {
        this._id_pedido = value;
    }
    set Acompanhamento(value) {
        this._acompanhamento = value;
    }

    async CadastrarFrete() {
        const bd = await obterConexaoDoPool();
        try {
            const freteResult = await bd.query(`INSERT INTO pessoa (acompanhamento,pedidos_id) VALUES (?, ?)`,
                [this._acompanhamento, this._id_pedido]);
            const freteId = freteResult[0].insertId;
            console.log('ID do frete', freteId);
            return freteId;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async EditaStatusFrete() {
        const bd = await obterConexaoDoPool();
        try {
            const freteResult = await bd.query(`UPDATE frete SET acompanhamento = ? WHERE pedido_id = ? `,
                [this._acompanhamento, this._id_pedido]);
            return freteResult;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    validaCampos() {
        if (!this._acompanhamento || !this._id_pedido) {
            return false
        }
        return true 
    }

    verificaCampos() {
        if(this._acompanhamento.length>100 || this._id_pedido != 0){
            return false
        }
        return true
    }
}
