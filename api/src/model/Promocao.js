import obterConexaoDoPool from "../config/mysql.js"

export default class Promocao {
    constructor(Id, Categoria_Produto, Porcentagem, ID_Categoria, ID_Produto) {
        this._id = Id; 
        this._categoria_produto = Categoria_Produto;
        this._porcentagem = Porcentagem;
        this._id_categoria = ID_Categoria;
        this._id_produto = ID_Produto;
    }

    get Id() {
        return this._id;
    }

    get Categoria_Produto() {
        return this._categoria_produto;
    }

    get Porcentagem() {
        return this._porcentagem;
    }

    get ID_Categoria() {
        return this._id_categoria;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    set Id(value) {
        this._id = value;
    }

    set Categoria_Produto(value) {
        this._categoria_produto = value;
    }

    set Porcentagem(value) {
        this._porcentagem = value;
    }

    set ID_Categoria(value) {
        this._id_categoria = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    async CadastraPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const selecionaPromocao = await bd.query(`SELECT * FROM promocao WHERE produto_id=?;`,[this._id_produto])
            console.log(selecionaPromocao[0])
            if(selecionaPromocao[0] != ''){
                const editaPromocao = await bd.query(`UPDATE promocao set status=? WHERE produto_id =? ;`,[0,this._id_produto])
            }
            const promocaoResult = await bd.query(`INSERT INTO promocao(categoria_produto,porcentagem,categoria_id,produto_id,status) VALUES (?,?,?,?,1);`,
                [this._categoria_produto,this._porcentagem,this._id_categoria,this._id_produto]);
            const promocaoId = promocaoResult[0].insertId;
            return promocaoId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const promocaoResult = await bd.query(`UPDATE promocao SET categoria_produto = ?, porcentagem =?, categoria_id=?, produto_id=? WHERE id = ?;`,
                [this._categoria_produto,this._porcentagem,this._id_categoria,this._id_produto,this._id]);
            console.log(promocaoResult);
            return promocaoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletePromocao() {
        const bd = await obterConexaoDoPool();
        console.log(this._id)
        try {
            const promocaoResult = await bd.query(`DELETE FROM promocao WHERE id = ?;`,[this._id]);
            return promocaoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelecionaPromocao() {
        const bd = await obterConexaoDoPool();
        try {
            const promocaoResult = await bd.query(`
                 SELECT 
        p.id,
        p.nome_produto,
        p.descricao,
        pc.preco,
        c.tipo,
        pm.porcentagem
    FROM 
        produto p
    JOIN 
        preco pc on pc.produto_id = p.id
    JOIN
        categoria c on c.id = p.categoria_id
	JOIN 
		promocao pm on p.id = pm.produto_id
    WHERE p.status =1 AND pc.status = 1 AND pm.status =1;`);
            console.log(promocaoResult);
            return promocaoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    validaCampos() {
        if (!this._categoria_produto || !this._id_categoria || !this._porcentagem || !this._id_produto) {
            return false
        }
        return true 
    }

    verificaCampos() {
        if (this._categoria_produto.length > 100 || 
            this._porcentagem.length > 5 || 
            this._id_categoria.length > 10 || 
            this._id_produto.length > 10) {
            return false;
        }
        return true;
    }
}
