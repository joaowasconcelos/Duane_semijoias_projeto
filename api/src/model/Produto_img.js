class Produto_Img {
    Id
    ID_Img
    ID_Produto
    constructor(Id,ID_Img,ID_Produto) {
        this.Id = Id
        this.ID_Img = ID_Img
        this.ID_Produto = ID_Produto
    }
    get Id() {
        return this.id;
    }

    get ID_Img() {
        return this.id_img;
    }

    get ID_Produto() {
        return this.id_produto;
    }


    set Id(value) {
        this.id = value;
    }

    set ID_Img(value) {
        this.id_img = value;
    }

    set ID_Produto(value) {
        this.id_produto = value;
    }
}

export default Produto_Img