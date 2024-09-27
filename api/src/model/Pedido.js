class Pedido {
    Id
    Status
    Valor
    Data_Cad
    ID_Pessoa
    ID_Cupom
    constructor(Id,Status,Valor,Data_Cad,ID_Pessoa,ID_Cupom) {
        this.Id = Id;
        this.Status = Status;
        this.Valor = Valor
        this.Data_Cad =Data_Cad
        this.ID_Pessoa = ID_Pessoa;
        this.ID_Cupom = ID_Cupom;
    }
    get Id() {
        return this.Id;
    }

    get Status() {
        return this.Status;
    }

    get Valor() {
        return this.Valor;
    }

    get Data_Cad() {
        return this.Data_Cad;
    }

    get ID_Pessoa() {
        return this.ID_Pessoa;
    }

    get ID_Cupom() {
        return this.ID_Cupom;
    }

    set Id(value) {
        this.Id = value;
    }

    set Status(value) {
        this.Status = value;
    }

    set Valor(value) {
        this.Valor = value;
    }

    set Data_Cad(value) {
        this.Data_Cad = value;
    }

    set ID_Pessoa(value) {
        this.ID_Pessoa = value;
    }

    set ID_Cupom(value) {
        this.ID_Cupom = value;
    }
}

export default Pedido