class Telefone {
    Id
    Numero
    constructor(Id,Numero) {
        this.Id = Id
        this.Numero = Numero
    }
    get Id() {
        return this.id;
    }

    get Numero() {
        return this.numero;
    }

    set Id(value) {
        this.id = value;
    }

    set Numero(value) {
        this.numero = value;
    }
}

export default Telefone