class Frete {
    Id
    ID_Peido
    constructor(Id, ID_Peido) {
        this.Id = Id
        this.ID_Peido = ID_Peido
    }

    get Id() { return this.Id; }
    set Id(value) { this.Id = value; }

    get ID_Peido() { return this.ID_Peido; }
    set ID_Peido(value) { this.ID_Peido = value; }
}

export default Frete