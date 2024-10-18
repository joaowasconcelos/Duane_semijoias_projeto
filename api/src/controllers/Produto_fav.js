import Produto_Fav from "../model/Produtos_favoritos.js";

const ProdutoFavController ={
    Cadastro:async(req,res)=>{
        try {
            const {id_produto} = req.body
            const id = req.id
            const cProduto = new Produto_Fav(null,id_produto,id)
            const validaCampos = cProduto.validaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertProduto = cProduto.CadastraProduto_Fav()
            if (insertProduto.error) {
                return res.status(500).json({message: "Erro ao inserir um produto favorito!"})
            }
            return res.status(201).json({ message: "Produto favorito cadastrado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
    Delete:async(req,res)=>{
        try {
            const {id_produto} = req.body
            const {id} = req.params
            const cProduto = new Produto_Fav(null,id_produto,id)
            console.log(cProduto)
            const validaCampos = cProduto.validaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const deleteProduto = cProduto.DeleteProdutoFav()
            if (deleteProduto.error) {
                return res.status(500).json({message: "Erro ao deletar um produto favorito!"})
            }
            return res.status(201).json({ message: "Produto favorito deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
    Seleciona:async(req,res)=>{
        try {
            const id = req.id
            const cProduto = new Produto_Fav(null,null,id)
            const selecionaProdutoFav = await cProduto.SelecionaProdutoFav()
            console.log(selecionaProdutoFav)
            if (selecionaProdutoFav.error) {
                return res.status(500).json({message: "Erro ao selecionar um produto favorito!"})
            }
            if(selecionaProdutoFav == ""){
                return res.status(500).json({message: "Não tem produto favorito cadastrado"})
            }
            return res.json(selecionaProdutoFav);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar um produto" });
        }
    },
    
}
export default ProdutoFavController