class Perfil {
    Id
    Tipo
    constructor(Id,Tipo) {
        this.Id = Id
        this.Tipo = Tipo
    }
    get Id() {
        return this.id;
    }

    get Tipo() {
        return this.tipo;
    }

    set Id(value) {
        this.id = value;
    }

    set Tipo(value) {
        this.tipo = value;
    }
}

export default Perfil