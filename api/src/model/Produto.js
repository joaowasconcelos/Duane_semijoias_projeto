class Produto {
    Id
    Descrição
    Status
    Nome_Produto
    Data_Cad
    constructor(Id,Descrição,Status,Nome_Produto,Data_Cad) {
        this.Id = Id
        this.Descrição = Descrição
        this.Status = Status
        this.Nome_Produto = Nome_Produto
        this.Data_Cad = Data_Cad
    }
    get Id() {
        return this.id;
    }

    get Descrição() {
        return this.descricao;
    }

    get Status() {
        return this.status;
    }

    get Nome_Produto() {
        return this.nome_produto;
    }

    get Data_Cad() {
        return this.data_cad;
    }
    set Id(value) {
        this.id = value;
    }

    set Descrição(value) {
        this.descricao = value;
    }

    set Status(value) {
        this.status = value;
    }

    set Nome_Produto(value) {
        this.nome_produto = value;
    }

    set Data_Cad(value) {
        this.data_cad = value;
    }
}

export default Produto