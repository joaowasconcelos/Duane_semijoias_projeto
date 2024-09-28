import obterConexaoDoPool from "../config/mysql.js"

class Itens {
    Id
    Valor
    Quantidade
    ID_Produto
    ID_Pedido
    ID_Preço
    constructor(Id,Valor,Quantidade,ID_Produto,ID_Pedido,ID_Preço) {
        this.Id = Id
        this.Valor = Valor
        this.Quantidade = Quantidade
        this.ID_Produto = ID_Produto
        this.ID_Pedido = ID_Pedido
        this.ID_Preço = ID_Preço
    }
    get Id() {
        return this.Id;
    }

    get Valor() {
        return this.Valor;
    }

    get Quantidade() {
        return this.Quantidade;
    }

    get ID_Produto() {
        return this.ID_Produto;
    }

    get ID_Pedido() {
        return this.ID_Pedido;
    }

    get ID_Preço() {
        return this.ID_Preço;
    }

    set Id(value) {
        this.Id = value;
    }

    set Valor(value) {
        this.Valor = value;
    }

    set Quantidade(value) {
        this.Quantidade = value;
    }

    set ID_Produto(value) {
        this.ID_Produto = value;
    }

    set ID_Pedido(value) {
        this.ID_Pedido = value;
    }

    set ID_Preço(value) {
        this.ID_Preço = value;
    }
}

export default Itens