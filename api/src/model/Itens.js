import obterConexaoDoPool from "../config/mysql.js";

export default class Itens {
    constructor(Id, Valor, Quantidade, ID_Produto, ID_Pedido, ID_Preço) {
        this._Id = Id;
        this._Valor = Valor;
        this._Quantidade = Quantidade;
        this._ID_Produto = ID_Produto;
        this._ID_Pedido = ID_Pedido;
        this._ID_Preço = ID_Preço;
    }

    get Id() {
        return this._Id;
    }

    get Valor() {
        return this._Valor;
    }

    get Quantidade() {
        return this._Quantidade;
    }

    get ID_Produto() {
        return this._ID_Produto;
    }

    get ID_Pedido() {
        return this._ID_Pedido;
    }

    get ID_Preço() {
        return this._ID_Preço;
    }

    set Id(value) {
        this._Id = value;
    }

    set Valor(value) {
        this._Valor = value;
    }

    set Quantidade(value) {
        this._Quantidade = value;
    }

    set ID_Produto(value) {
        this._ID_Produto = value;
    }

    set ID_Pedido(value) {
        this._ID_Pedido = value;
    }

    set ID_Preço(value) {
        this._ID_Preço = value;
    }

    async CadastraItens() {
        const bd = await obterConexaoDoPool();
        try {
            const itensResult = await bd.query(`INSERT INTO itens (produto_id,quantidade,pedidos_id,preco_id) VALUES (?,?,?,?);`,
                [this._ID_Produto,this._Quantidade,this._ID_Pedido,this._ID_Preço]);
            const itemId = itensResult[0].insertId;
            console.log(pessoaResult);
            console.log('ID do Item:', itemId);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}

