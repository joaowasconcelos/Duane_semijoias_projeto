class Endereco {
    Id
    CEP
    Cidade
    Bairro
    Estado
    Logradouro
    Numero
    Complemento
    constructor(Id,CEP,Cidade,Bairro,Estado,Logradouro,Numero,Complemento) {
        this.Id = Id
        this.CEP = CEP
        this.Cidade = Cidade
        this.Bairro = Bairro
        this.Estado = Estado
        this.Logradouro = Logradouro
        this.Numero = Numero
        this.Complemento = Complemento
    }

    get Id () { return this.Id }
    set Id (value) {this.Id = value}
}

export default Endereco