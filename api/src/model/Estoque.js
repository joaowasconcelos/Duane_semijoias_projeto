class Estoque {
    Id
    Quantidade
    ID_Produto
    constructor(Id,Quantidade,ID_Produto) {
        this.Id = Id
        this.Quantidade = Quantidade
        this.ID_Produto = ID_Produto
    }

      get Id() { return this.Id; }
      set Id(value) { this.Id = value; }
  

      get Quantidade() { return this.Quantidade; }
      set Quantidade(value) { this.Quantidade = value; }

      get ID_Produto() { return this.ID_Produto; }
      set ID_Produto(value) { this.ID_Produto = value; }
}

export default Estoque