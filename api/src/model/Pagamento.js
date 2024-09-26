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
}

export default Pagamento