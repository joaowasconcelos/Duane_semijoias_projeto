import obterConexaoDoPool from "../config/mysql.js"

export default class Produto_Fav {
    constructor(Id, ID_Produto, ID_Pessoa) {
        this._id = Id;
        this._id_produto = ID_Produto;
        this._id_pessoa = ID_Pessoa;
    }

    get Id() {
        return this._id;
    }

    get ID_Produto() {
        return this._id_produto;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }

    set Id(value) {
        this._id = value;
    }

    set ID_Produto(value) {
        this._id_produto = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    async CadastraProduto_Fav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`INSERT INTO produtos_favoritos(produto_id,pessoa_id) VALUES (?,?);`, [this._id_produto, this._id_produto]);
            const produtoFavId = produtoFavResult[0].insertId;
            return produtoFavId
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeleteProdutoFav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`DELETE FROM produtos_favoritos WHERE produto_id =? AND pessoa_id = ?;`, [this._id_produto, this._id_pessoa]);
            return produtoFavResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaProdutoFav() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoFavResult = await bd.query(`SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.valor / 100), 
        pc.preco - (pc.preco * pr_cat.valor / 100),   
        pc.preco                                     
    ) AS preco_promocional,  
    c.tipo
FROM 
    produto p
JOIN 
    preco pc ON pc.produto_id = p.id
JOIN
    categoria c ON c.id = p.categoria_id
LEFT JOIN 
    promocao pr_prod ON pr_prod.produto_id = p.id AND pr_prod.status = 1  
LEFT JOIN 
    promocao pr_cat ON pr_cat.categoria_id = c.id AND pr_cat.status = 1  
JOIN 
    produtos_favoritos f ON f.produto_id = p.id  
WHERE 
    p.status = 1 
    AND pc.status = 1
    AND f.pessoa_id = ?
GROUP BY 
    p.id, p.nome_produto, p.descricao, pc.preco, pr_prod.valor, pr_cat.valor, c.tipo;
;`, [this._id_pessoa]);
            return produtoFavResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
    validaCampos() {
        if (!this._id_pessoa || !this._id_produto) {
            return false
        }
        return true
    }
}
