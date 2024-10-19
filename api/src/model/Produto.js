import obterConexaoDoPool from "../config/mysql.js"

export default class Produto {
    constructor(id, descricao, status, nomeProduto, ID_categoria) {
        this._id = id;
        this._descricao = descricao;
        this._status = status;
        this._nomeProduto = nomeProduto;
        this._id_categoria = ID_categoria
    }

    get id() {
        return this._id;
    }

    get descricao() {
        return this._descricao;
    }

    get status() {
        return this._status;
    }

    get ID_categoria() {
        return this._id_categoria;
    }

    get nomeProduto() {
        return this._nomeProduto;
    }
    set id(value) {
        this._id = value;
    }

    set descricao(value) {
        this._descricao = value;
    }

    set status(value) {
        this._status = value;
    }

    set nomeProduto(value) {
        this._nomeProduto = value;
    }

    set ID_categoria(value) {
        this._id_categoria = value;
    }

    async CadastraProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`INSERT INTO produto (nome_produto, descricao, status, data_cad,categoria_id) VALUES (?, ?, ?, CURRENT_TIMESTAMP,?);`,
                [this._nomeProduto, this._descricao, this._status, this._id_categoria]);
            const produtoId = produtoResult[0].insertId;
            console.log('ID do protudo:', produtoId);
            this._id = produtoId
            return produtoId;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`UPDATE produto SET nome_produto = ?, descricao = ?, status = ?,categoria_id = ? where id = ?;`, [this._nomeProduto, this._descricao, this._status, this._id_categoria, this._id]);
            return produtoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`DELETE FROM produto WHERE id = ?;`, [this._id]);
            return produtoResult
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }



    static async SelectProduto() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`
    SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.porcentagem / 100), 
        pc.preco - (pc.preco * pr_cat.porcentagem / 100),   
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
WHERE 
    p.status = 1 
    AND pc.status = 1;`);
            return produtoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelectProdutoPorCategoria() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`
   SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  -- Exibe o preço normal
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.valor / 100), 
        pc.preco - (pc.preco * pr_cat.valor / 100),   
        pc.preco                                      
    ) AS preco_promocional,  -- Exibe o preço com desconto, se houver
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
WHERE 
    p.status = 1 
    AND pc.status = 1
    AND C.id = ?
` , [this._id]);
            return produtoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


   static async SelectProdutoMenorMaior() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`
    SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  -- Exibe o preço normal
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.valor / 100), 
        pc.preco - (pc.preco * pr_cat.valor / 100),   
        pc.preco                                      
    ) AS preco_promocional,  -- Exibe o preço com desconto, se houver
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
WHERE 
    p.status = 1 
    AND pc.status = 1
ORDER BY preco_promocional ASC;
` , [this._id]);
            return produtoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelectProdutoMaiorMenor() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`
    SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  -- Exibe o preço normal
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.valor / 100), 
        pc.preco - (pc.preco * pr_cat.valor / 100),   
        pc.preco                                      
    ) AS preco_promocional,  -- Exibe o preço com desconto, se houver
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
WHERE 
    p.status = 1 
    AND pc.status = 1
ORDER BY preco_promocional DESC;
` , [this._id]);
            return produtoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


    static async SelectProdutoMaisVendidos() {
        const bd = await obterConexaoDoPool();
        try {
            const produtoResult = await bd.query(`
    SELECT 
    p.id,
    p.nome_produto,
    p.descricao,
    pc.preco AS preco_normal,  
    COALESCE( 
        pc.preco - (pc.preco * pr_prod.valor / 100), 
        pc.preco - (pc.preco * pr_cat.valor / 100),   
        pc.preco                                     
    ) AS preco_promocional,  
    c.tipo,
    SUM(it.quantidade) AS total_vendido
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
    itens it ON it.produto_id = p.id 
WHERE 
    p.status = 1 
    AND pc.status = 1
GROUP BY 
    p.id, p.nome_produto, p.descricao, pc.preco, pr_prod.valor, pr_cat.valor, c.tipo
ORDER BY 
    total_vendido DESC; 
` , [this._id]);
            return produtoResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
   
    verificaCampos() {
        if (this._descricao.length > 200 || this._status.length > 20 || this._nomeProduto.length > 150 || this._id_categoria.length > 20) {
            return false
        }
        return true
    }

    validaCampos() {
        if (!this._descricao || !this._status || !this._nomeProduto || !this._id_categoria) {
            return false
        }
        return true
    }
}
