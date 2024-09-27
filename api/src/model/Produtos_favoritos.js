class Produto_Fav {
    Id
    ID_Produto
    ID_Pessoa
    constructor(Id,ID_Produto,ID_Pessoa) {
        this.Id = Id
        this.ID_Produto = ID_Produto
        this.ID_Pessoa = ID_Pessoa
    }
    get Id() {
        return this.id;
    }

    get ID_Produto() {
        return this.id_produto;
    }

    get ID_Pessoa() {
        return this.id_pessoa;
    }

    set Id(value) {
        this.id = value;
    }

    set ID_Produto(value) {
        this.id_produto = value;
    }

    set ID_Pessoa(value) {
        this.id_pessoa = value;
    }
}

export default Produto_Fav