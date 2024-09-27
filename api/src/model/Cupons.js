class Cupons {
    Id
    Codigo
    Descrição
    Quantidade
    Valor
    Status
    constructor(Id,Codigo,Descrição,Quantidade,Valor,Status) {
        this.Id = Id
        this.Codigo = Codigo;
        this.Descrição = Descrição;
        this.Quantidade = Quantidade
        this.Valor = Valor
        this.Status = Status
    }

    get Id () { return this.Id }
    set Id (value) { this.Id = value }

    get Codigo () { return this.Codigo }
    set Codigo (value) { this.Codigo = value }

    get Descrição() { return this.Quantidade }
    set Descrição(value) { this.Descrição = value }

    get Quantidade() { return this.Quantidade }
    set Quantidade(value) { this.Quantidade = value }

    get Valor() { return this.Valor }
    set Valor(value) { this.Valor = value }

    get Status() { return this.Status }
    set Status(value) { this.Status = value }
}
export default Cupons