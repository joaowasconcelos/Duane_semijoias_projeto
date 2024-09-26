class Pessoa {
    Id
    Nome
    Data_nasc
    CPF
    Genero
    Data_Cad
    constructor(Id,Nome,Data_nasc,CPF,Genero,Data_Cad) {
        this.Id = Id
        this.Nome = Nome
        this.Data_nasc = Data_nasc
        this.CPF = CPF
        this.Genero = Genero
        this.Data_Cad = Data_Cad
    }
    get Id() {
        return this.id;
    }

    get Nome() {
        return this.nome;
    }

    get Data_nasc() {
        return this.data_nasc;
    }

    get CPF() {
        return this.cpf;
    }

    get Genero() {
        return this.genero;
    }

    get Data_Cad() {
        return this.data_cad;
    }

    set Id(value) {
        this.id = value;
    }

    set Nome(value) {
        this.nome = value;
    }

    set Data_nasc(value) {
        this.data_nasc = value;
    }

    set CPF(value) {
        this.cpf = value;
    }

    set Genero(value) {
        this.genero = value;
    }

    set Data_Cad(value) {
        this.data_cad = value;
    }
}

export default Pessoa