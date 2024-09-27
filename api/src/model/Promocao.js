class Promocao {
    Id
    Categoria_Produto
    Valor
    ID_Categoria
    ID_Produto
    constructor(Id,Categoria_Produto,Valor,ID_Categoria,ID_Produto) {
        this.Id = Id
        this.Categoria_Produto = Categoria_Produto
        this.Valor = Valor
        this.ID_Categoria = ID_Categoria
        this.ID_Produto = ID_Produto
    }
    get Id() {
        return this.id;
    }

    get Categoria_Produto() {
        return this.categoria_produto;
    }

    get Valor() {
        return this.valor;
    }

    get ID_Categoria() {
        return this.id_categoria;
    }

    get ID_Produto() {
        return this.id_produto;
    }

    set Id(value) {
        this.id = value;
    }

    set Categoria_Produto(value) {
        this.categoria_produto = value;
    }

    set Valor(value) {
        this.valor = value;
    }

    set ID_Categoria(value) {
        this.id_categoria = value;
    }

    set ID_Produto(value) {
        this.id_produto = value;
    }
}

export default Promocao