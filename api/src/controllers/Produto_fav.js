import Produto_Fav from "../model/Produtos_favoritos.js";

const ProdutoFavController ={
    Cadastro:async(req,res)=>{
        try {
            const {id_produto} = req.body
            const {id} = req.params
            const cProduto = new Produto_Fav(null,id_produto,id)
            const validaCampos = cProduto.validaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertProduto = cProduto.CadastraProduto_Fav()
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
            return res.status(201).json({ message: "Produto favorito deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    }
}
export default ProdutoFavController