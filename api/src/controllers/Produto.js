import Produto from "../model/Produto.js";

const ProdutoController = {
    cadastro: async (req, res) => {
        try {
            const { Descricao, Status, NomeProduto, ID_categoria } = req.body;
            const Cproduto = new Produto(null, Descricao, Status, NomeProduto, ID_categoria)
            const returnProduto = await Cproduto.CadastraProduto()
            if (returnProduto.error) {
                return res.status(500).json({
                    message: "Erro ao cadastrar produto!",
                    details: returnProduto.details
                });
            }
            res.status(201).json({ message: "Produto cadastrado com sucesso!", returnProduto })
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar produto!" })
        }
    },
    editar: async (req, res) => {
        try {
            const { id } = req.params
            const { Descricao, Status, NomeProduto } = req.body;
            const Cproduto = new Produto(id, Descricao, Status, NomeProduto)
            const returnProduto = await Cproduto.ModificaProduto()
            if (returnProduto.error) {
                return res.status(500).json({message: "Erro ao editar produto!" });
            }
            res.status(200).json({ message: "Produto editado com sucesso!", returnProduto })
        } catch (error) {

        }
    }
}

export default ProdutoController