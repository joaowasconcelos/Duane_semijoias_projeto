import Pedido from "../model/Pedido.js"

const PedidoController = {
    Cadastro: async (req,res) =>{
        try {
            const {status,valor_total,id_pessoa} = req.body;
            console.log(req.body)
            // const cPromocao = new Promocao(null,Categoria_produto,Valor,Id_categoria,Id_produto);
            // const validaCampos = cPromocao.validaCampos()
            // if(!validaCampos){
            //     res.status(400).json({ error: "Dados inválidos fornecidos." });
            // }
            // const insertPromocao = await cPromocao.CadastraPromocao()
            // console.log(insertPromocao)
            // return res.status(201).json({ message: "Promoção cadastrada com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
    // Modifica: async (req,res) =>{
    //     try {
    //         const {Categoria_produto,Valor,Id_produto,Id_categoria} = req.body;
    //         const {id} = req.params
    //         const cPromocao = new Promocao(id,Categoria_produto,Valor,Id_categoria,Id_produto);
    //         const validaCampos = cPromocao.validaCampos()
    //         if(!validaCampos){
    //             res.status(400).json({ error: "Dados inválidos fornecidos." });
    //         }
    //         const modificaPromocao = await cPromocao.ModificaPromocao()
    //         return res.status(201).json({ message: "Promoção modificada com sucesso!" });
    //     }catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
    //     }
    // },
    // Deletar: async (req,res) =>{
    //     try {
    //         const {id} = req.params
    //         const cPromocao = new Promocao(id);
    //         const DeletaPromocao = await cPromocao.DeletePromocao()
    //         console.log(DeletaPromocao)
    //         return res.status(201).json({ message: "Promoção deletada com sucesso!" });
    //     }catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
    //     }
    // },
    Seleciona: async (req, res) => {
        try {
            const selecionaPedido = await Pedido.SelecionaPedido()
            return res.json(selecionaPedido);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    }

}

export default PedidoController;