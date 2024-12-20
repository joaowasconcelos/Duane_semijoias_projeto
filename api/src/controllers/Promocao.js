import Promocao from "../model/Promocao.js";

const PromocaoController = {
    Cadastro: async (req,res) =>{
        try {
            const {Categoria_produto,Porcentagem,Id_produto,Id_categoria} = req.body;
            const cPromocao = new Promocao(null,Categoria_produto,Porcentagem,Id_categoria,Id_produto);
            const validaCampos = cPromocao.validaCampos()
            const verificaCampos = cPromocao.verificaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            if(!verificaCampos){
                res.status(400).json({ error: "Campos nulos" });
            }
            const insertPromocao = await cPromocao.CadastraPromocao()
            if (insertPromocao.error) {
                return res.status(400).json({error: "Erro ao cadastrar promoção!"});
            }

            return res.status(201).json({ message: "Promoção cadastrada com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma promoção" });
        }
    },
    Modifica: async (req,res) =>{
        try {
            const {Categoria_produto,Valor,Id_produto,Id_categoria} = req.body;
            const {id} = req.params
            const cPromocao = new Promocao(id,Categoria_produto,Valor,Id_categoria,Id_produto);
            const validaCampos = cPromocao.validaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const modificaPromocao = await cPromocao.ModificaPromocao()
            if (modificaPromocao.error) {
                return res.status(400).json({error: "Erro ao modificar promoção!"});
            }
            return res.status(201).json({ message: "Promoção modificada com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma promoção" });
        }
    },
    Deletar: async (req,res) =>{
        try {
            const {id} = req.params
            const cPromocao = new Promocao(id);
            const DeletaPromocao = await cPromocao.DeletePromocao()
            if (DeletaPromocao.error) {
                return res.status(400).json({ error: "Erro ao deletar promoção!"});
            }
            return res.status(201).json({ message: "Promoção deletada com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao deletar uma promoção" });
        }
    },
    Seleciona: async (req, res) => {
        try {
            const selecionaPromocao = await Promocao.SelecionaPromocao()
            if (selecionaPromocao.error) {
                return res.status(400).json({error: "Erro ao selecionar promoção!"})
            }
            return res.json(selecionaPromocao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar uma promoção" });
        }
    },
    SelecionaDetalhes: async (req, res) => {
        try {
            const selecionaPromocao = await Promocao.SelecionaPromocao()
            if (selecionaPromocao.error) {
                return res.status(400).json({error: "Erro ao selecionar promoção!"})
            }
            return res.json(selecionaPromocao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar uma promoção" });
        }
    },
    Verifica: async (req, res) => {
        try {
            const {id}= req.body 



        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar uma promoção" });
        }
    }
}

export default PromocaoController;