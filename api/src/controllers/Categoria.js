import Categoria from "../model/Categoria.js";

const CategoriaController = {
    Cadastro: async (req, res) => {
        try {
            console.log(req.body)
            const { tipo } = req.body;
            const cCategoria = new Categoria(null, tipo,1);
            const validaCampos = cCategoria.validaCampos()
            const verificaCapos = cCategoria.verificaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            if(!verificaCapos){
                res.status(400).json({ error: "Campos vazios" });
            }
            const insertCategoria = await cCategoria.CadastraCategoria()
            console.log(insertCategoria)
            if (insertCategoria.error) {
                return res.status(400).json({
                    error: "Erro ao cadastrar uma categoria",
                    details: returnProduto.details
                });
            }
            return res.status(201).json({ message: "Categoria cadastrada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
    Modifica: async (req, res) => {
        try {
            const {id} = req.params
            const {tipo} = req.body
            const cCategoria = new Categoria(id,tipo);
            const validaCampos = cCategoria.validaCampos()
            const verificaCapos = cCategoria.verificaCampos()
            if(!validaCampos){
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            if(!verificaCapos){
                res.status(400).json({ error: "Campos vazios" });
            }
            const modificaCategoria = await cCategoria.modificaCategoria()

            return res.status(201).json({ message: "Categoria modificada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao modificar uma categoria" });
        }
    },
    Inativar: async (req, res) => {
        try {
            const {id} = req.params
            console.log(id)
            const cCategoria = new Categoria(id);
            const deleteCategoria = await cCategoria.DeletarCategoria()
            return res.status(201).json({ message: "Categoria deletada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
    Seleciona: async (req, res) => {
        try {
            const selecionaCategoria = await Categoria.SelecionarCategorias()
            return res.json(selecionaCategoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar uma categoria" });
        }
    },
};

export default CategoriaController;