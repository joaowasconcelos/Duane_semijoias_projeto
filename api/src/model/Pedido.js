import obterConexaoDoPool from "../config/mysql.js"

export default class Pedido {
    constructor(id, status, valor, dataCad, ID_Pessoa, ID_Cupom) {
        this._id = id;
        this._status = status;
        this._valor = valor;
        this._dataCad = dataCad;
        this._id_pessoa = ID_Pessoa;
        this._id_cupom = ID_Cupom;
    }

    get id() {
        return this._id;
    }

    get status() {
        return this._status;
    }

    get valor() {
        return this._valor;
    }

    get dataCad() {
        return this._dataCad;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }

    get ID_Cupom() {
        return this._id_cupom;
    }

    set id(value) {
        this._id = value;
    }

    set status(value) {
        this._status = value;
    }

    set valor(value) {
        this._valor = value;
    }

    set dataCad(value) {
        this._dataCad = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    set ID_Cupom(value) {
        this._id_cupom = value;
    }

    // async CadastraPedido() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const pedidoResult = await bd.query(`INSERT INTO pedidos (pessoa_id,status,valor_total,data_cad) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP,?);`,
    //             [this._nomeProduto, this._descricao, this._status,this._id_categoria]);
    //         const produtoId = produtoResult[0].insertId;
    //         console.log('ID do protudo:', produtoId);
    //     } catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }
}
