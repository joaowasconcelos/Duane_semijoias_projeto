import Cupons from "../model/Cupons.js";

const CuponsController = {
    CreateCupons: async (req, res) => {
        try {
            const {Descricao,Codigo,Quantidade,Valor,Status} = req.body
            const cCupom  = new Cupons(null,Codigo,Descricao,Quantidade,Valor,Status)
            const validaCampos = cCupom.validaCampos()
            if(!validaCampos){
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cCupom.verificaCampos()
            if(!verificaCampos){
                return res.status(500).json({ message: "Numero máximo de caracteres "})
            }
            const insertCupom = await cCupom.CadastraCupom()
            console.log(insertCupom.error)
            if(insertCupom.error){
                return error
            }
            return res.status(200).json({ message: "Cupom cadastrado com sucesso!" })
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar cupom!" })
        }
    },

    Edita: async(req,res)=>{
        try {
            const {Descricao,Codigo,Quantidade,Valor,Status} = req.body
            const {id} = req.params 
            const cCupom  = new Cupons(id,Codigo,Descricao,Quantidade,Valor,Status)
            const validaCampos = cCupom.validaCampos()
            if(!validaCampos){
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cCupom.verificaCampos()
            if(!verificaCampos){
                return res.status(500).json({ message: "Numero máximo de caracteres "})
            }
            const updateCupom = await cCupom.ModificaCupom()
            console.log(updateCupom.error)
            if(updateCupom.error){
                return error
            }
            return res.status(200).json({ message: "Cupom editado com sucesso!" })
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar cupom!" })
        }
    },
    Seleciona: async (req,res) => {
        try {
            const selecionaPessoas = Cupons.SelecionaCupom()
            return res.json(selecionaPessoas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar cupons" });
        }
    },
    SelecionaDetalhes: async (req,res) => {
        try {
            const {id} = req.params
            const cCupons = new Cupons(id)
            const selecionaPessoas = await cCupons.SelecionaCupomDetalhes()
            return res.json(selecionaPessoas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar detalhes do cupons" });
        }
    }
}

export default CuponsController