class Categoria {
    Id
    Tipo
    constructor(Id,Tipo) {
        this.Id = Id;
        this.Tipo = Tipo;
    }
    
     get id() {
        return this.Id;
    }

    set id(value) {
        this.Id = value;
    }
    get tipo() {
        return this.Tipo;
    }

    set tipo(value) {
        this.Tipo = value;
    }

}
export default Categoria 