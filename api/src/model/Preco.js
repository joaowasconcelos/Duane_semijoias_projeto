class Preco {
    Id
    Preco
    Data_Cad
    ID_Produto
    constructor(Id,Preco,Data_Cad,ID_Produto) {
        this.Id = Id;
        this.Preco = Preco;
        this.Data_Cad = Data_Cad
        this.ID_Produto = ID_Produto
    }
    get Id() {
        return this.id;
    }

    get Preco() {
        return this.preco;
    }

    get Data_Cad() {
        return this.data_cad;
    }

    get ID_Produto() {
        return this.id_produto;
    }

    set Id(value) {
        this.id = value;
    }

    set Preco(value) {
        this.preco = value;
    }

    set Data_Cad(value) {
        this.data_cad = value;
    }

    set ID_Produto(value) {
        this.id_produto = value;
    }
}

export default Preco