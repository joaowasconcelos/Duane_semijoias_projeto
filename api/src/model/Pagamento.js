import obterConexaoDoPool from "../config/mysql.js"

class Pagamento {
    Id
    Status
    ID_Pagamento
    ID_Pedido
    constructor(Id,Status,ID_Pagamento,ID_Pedido) {
        this.Id = Id;
        this.Status = Status;
        this.ID_Pagamento = ID_Pagamento
        this.ID_Pedido = ID_Pedido
    }
    getId() {
        return this.Id;
    }

    getStatus() {
        return this.Status;
    }

    getID_Pagamento() {
        return this.ID_Pagamento;
    }

    getID_Pedido() {
        return this.ID_Pedido;
    }


    setId(value) {
        this.Id = value;
    }

    setStatus(value) {
        this.Status = value;
    }

    setID_Pagamento(value) {
        this.ID_Pagamento = value;
    }

    setID_Pedido(value) {
        this.ID_Pedido = value;
    }
}


export default Pagamento