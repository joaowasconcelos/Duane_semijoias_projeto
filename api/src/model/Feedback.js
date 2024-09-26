class Feedback {
    Id
    Avaliação
    Comentario
    ID_Produto
    ID_Pessoa
    constructor(Id,Avaliação,Comentario,ID_Produto,ID_Pessoa) {
        this.Id = Id
        this.Avaliação = Avaliação
        this.Comentario = Comentario
        this.ID_Produto = ID_Produto
        this.ID_Pessoa = ID_Pessoa
    }

     get Id() { return this.Id; }
     set Id(value) { this.Id = value; }
 

     get Avaliação() { return this.Avaliação; }
     set Avaliação(value) { this.Avaliação = value; }
 

     get Comentario() { return this.Comentario; }
     set Comentario(value) { this.Comentario = value; }
 

     get ID_Produto() { return this.ID_Produto; }
     set ID_Produto(value) { this.ID_Produto = value; }

     get ID_Pessoa() { return this.ID_Pessoa; }
     set ID_Pessoa(value) { this.ID_Pessoa = value; }
}

export default Feedback