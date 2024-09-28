import obterConexaoDoPool from "../config/mysql.js"

export default class Cupons {
    constructor(id, codigo, descricao, quantidade, valor, status, ID_pedido) {
        this._id = id;
        this._codigo = codigo;
        this._descricao = descricao;
        this._quantidade = quantidade;
        this._valor = valor;
        this._status = status;
        this._id_pedido = ID_pedido;
    }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    get codigo() { return this._codigo; }
    set codigo(value) { this._codigo = value; }

    get descricao() { return this._descricao; }
    set descricao(value) { this._descricao = value; }

    get quantidade() { return this._quantidade; }
    set quantidade(value) { this._quantidade = value; }

    get valor() { return this._valor; }
    set valor(value) { this._valor = value; }

    get status() { return this._status; }
    set status(value) { this._status = value; }

    get ID_pedido() { return this._id_pedido; }
    set ID_pedido(value) { this._id_pedido = value; }

    //VERIFICAR O BANCO POIS ACHO QUE ESTÁ ERRADO QUANDO CADASTRAMOS UM CUPOM NÃO TEMOS QUE ASSOCIAR UM PEDIDO 
    //ACHO QUE PRECISARÁ DE UMA 3° TABELA VINCULANDO OS PEDIDOS E OS CUPONS 

    // async CadastraCupom() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const cupomResult = await bd.query(`INSERT INTO cupons (descricao,codigo,quantidade,valor,status,pedido_id) VALUES(?,?,?,?,?,?);`,
    //             [this._descricao,this._codigo,this._quantidade,this._valor,this._status,this._id_pedido]);
    //         const cupomId = cupomResult[0].insertId;
    //         console.log('ID do cupom:', cupomId);
    //     } catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }

    // async ModificaCupom() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const cupomResult = await bd.query(`UPDATE cupons SET descricao=?, codigo=?, quantidade=?, valor=?, status=?, pedidos_id = ?;`,
    //             [this._descricao,this._codigo,this._quantidade,this._valor,this._status,this._id_pedido]);
    //         const cupomId = cupomResult[0].insertId;
    //         console.log('ID do cupom:', cupomId);
    //     } catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }

    //  async DeletaCupom() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const cupomResult = await bd.query(`DELETE FROM cupons WHERE id = ?;`,[this._id]);
    //         console.log(cupomResult);
    //     } catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }

    // async SelecionaCupom() {
    //     const bd = await obterConexaoDoPool();
    //     try {
    //         const cupomResult = await bd.query(`SELECT * FROM cupons;`)
    //         console.log(cupomResult);
    //     } catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }
}
