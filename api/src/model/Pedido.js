import obterConexaoDoPool from "../config/mysql.js"

export default class Pedido {
    constructor(id, status, valor_total, ID_Pessoa, ID_cupons) {
        this._id = id;
        this._status = status;
        this._valor_total = valor_total;
        this._id_pessoa = ID_Pessoa;
        this._id_cupons = ID_cupons;
    }

    get id() {
        return this._id;
    }

    get status() {
        return this._status;
    }

    get valor_total() {
        return this._valor_total;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }
    get ID_cupons() {
        return this._id_cupons;
    }


    set id(value) {
        this._id = value;
    }

    set status(value) {
        this._status = value;
    }

    set valor_total(value) {
        this._valor_total = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    set ID_cupons(value) {
        this._id_cupons = value;
    }
    async CadastraPedido() {
        const bd = await obterConexaoDoPool();
        try {
            console.log(this._id_pessoa, this._status, this._valor_total, this._id_cupons)
            const pedidoResult = await bd.query(`INSERT INTO pedidos (pessoa_id,status,valor_total,data_cad,cupons_id) VALUES (?, ?, ?,CURRENT_TIMESTAMP,?);`,
                [this._id_pessoa, this._status, this._valor_total, this._id_cupons]);
            const pedidoId = pedidoResult[0].insertId;
            console.log('ID do pedido:', pedidoId);
            return pedidoId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaStatusPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`UPDATE pedidos SET status =? WHERE id = ?;`,
                [this._status, this._id]);
            console.log(pedidoResult);
            return pedidoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`DELETE FROM pedidos WHERE id = ?;`,
                [this._id]);
            console.log(pedidoResult);
            return pedidoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async PedidoPorUsuario() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`SELECT * FROM pedidos WHERE pessoa_id = ?;`, [this._id_pessoa]);
            console.log(pedidoResult);
            return pedidoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelecionaPedido() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`SELECT id,status, DATE_FORMAT(data_cad, '%d/%m/%Y') AS data_formatada FROM pedidos order by id desc;`);
            return pedidoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaPedidoInfo() {
        const bd = await obterConexaoDoPool();
        try {
            const pedidoResult = await bd.query(`SELECT 
    p.id AS pedidos_id,             
    p.valor_total,                  
    DATE_FORMAT(p.data_cad, '%d/%m/%Y') AS data_formatada,
    pe.nome AS nome_cliente,         
    pe.cpf AS cpf_cliente,          
    GROUP_CONCAT(CONCAT(' Nome: ', prod.nome_produto, ', Quantidade: ', i.quantidade)) AS itens                   
FROM 
    pedidos p
JOIN 
    pessoa pe ON p.pessoa_id = pe.id  
JOIN 
    itens i ON i.pedidos_id = p.id     
JOIN 
    produto prod ON i.produto_id = prod.id  
WHERE 
    p.id = ?
GROUP BY 
    p.id, p.valor_total, p.data_cad, pe.nome, pe.cpf; 
;`, [this._id]);
            return pedidoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    convertevalor() {
        const valorTotalCorrigido = this._valor_total.replace(/\./g, '').replace(',', '.');
        // Converte para número
        const cValor = parseFloat(valorTotalCorrigido);

        // Converte o número para o formato de moeda americana
        let valorConvertidoUS = cValor.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        // Remove o símbolo de moeda (dólar) e espaços extras
        let valor = valorConvertidoUS.replace('$', '').trim();
        this._valor_total = valor
        return this._valor_total
    }


    validaCampos() {
        if (!this._status || !this._valor_total || !this._id_pessoa) {
            return false
        }
        return true
    }

    verificaCampos() {
        if (this._status.length > 50 || this._valor_total.length > 50) {
            return false
        }
        return true
    }
}
