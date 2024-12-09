import obterConexaoDoPool from "../config/mysql.js"

export default class Cupons {
    constructor(id, codigo, descricao, quantidade, valor, status) {
        this._id = id;
        this._codigo = codigo;
        this._descricao = descricao;
        this._quantidade = quantidade;
        this._valor = valor;
        this._status = status;
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

    async CadastraCupom() {
        const bd = await obterConexaoDoPool();
        try {
            const cupomResult = await bd.query(`INSERT INTO cupons (descricao,codigo,quantidade,valor,status) VALUES(?,?,?,?,?);`,
                [this._descricao,this._codigo,this._quantidade,this._valor,this._status]);
            const cupomId = cupomResult[0].insertId;
           return cupomId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaCupom() {
        const bd = await obterConexaoDoPool();
        try {
            const cupomResult = await bd.query(`UPDATE cupons SET descricao=?, codigo=?, quantidade=?, valor=?, status=? WHERE id=?;`,
                [this._descricao,this._codigo,this._quantidade,this._valor,this._status,this._id]);
           return cupomResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

     static async SelecionaCupom() {
        const bd = await obterConexaoDoPool();
        try {
            const cupomResult = await bd.query(`  SELECT 
		c.id,
		c.codigo,
		c.status, 
        c.valor
        FROM 
            cupons c
        WHERE 
        c.status =1;`)
            return cupomResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
    async SelecionaCupomDetalhes() {
        const bd = await obterConexaoDoPool();
        try {
            const cupomResult = await bd.query(`    
                SELECT 
		c.id,
		c.codigo,
		c.status,
        c.quantidade,
        c.valor,
        c.descricao
        FROM 
            cupons c 
		WHERE
			c.id = ?;` , [this._id])
            return cupomResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async InativaCupom() {
        const bd = await obterConexaoDoPool();
        try {
            const cupomResult = await bd.query(`UPDATE cupons SET status=? WHERE id = ?` , [this._status,this._id])
            return cupomResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


    validaCampos() {
        if (!this._codigo || !this._descricao || !this._quantidade|| !this._valor ) {
            return false
        }
        return true 
    }

    verificaCampos(){
        if(this._codigo.length>100 || this._descricao.length>150|| this._valor.length>30|| this._quantidade.length>100|| this._status.length>50){
            return false
        }
        return true 
    }
}
