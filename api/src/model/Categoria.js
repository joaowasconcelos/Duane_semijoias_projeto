class Categoria {
    Id
    Tipo
    constructor(Id,Tipo) {
        this.Id = Id;
        this.Tipo = Tipo;
    }
    get Id () { return this.Id}
    set Id (value) { this.Id = value}

    get Tipo () {return this.Tipo}
    set Tipo (value) { this.Tipo = value}
}
