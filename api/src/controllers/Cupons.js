import Cupons from "../model/Cupons.js";

const CuponsController = {
    CreateCupons: async (req, res) => {
        try {
            const {Descricao,Codigo,Quantidade,Valor} = req.body
       
            let valorSemSimbolo = Valor.replace("R$", "").trim();
            valorSemSimbolo = valorSemSimbolo.replace(/\./g, "");
            valorSemSimbolo = valorSemSimbolo.replace(",", ".");
            let valor = parseFloat(valorSemSimbolo);
            const cCupom  = new Cupons(null,Codigo,Descricao,Quantidade,valor,1)
            
            const validaCampos = cCupom.validaCampos()
          
            if(!validaCampos){
                return res.status(400).json({ message: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cCupom.verificaCampos()
      
            if(!verificaCampos){
                return res.status(400).json({ error: "Numero máximo de caracteres "})
            }
            const insertCupom = await cCupom.CadastraCupom()
       
            if(insertCupom.error){
                return error
            }
            return res.status(200).json({ message: "Cupom cadastrado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar cupom!" })
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

                return res.status(400).json({ error: "Numero máximo de caracteres "})
            }
            const updateCupom = await cCupom.ModificaCupom()

            if(updateCupom.error){
                return error
            }
            return res.status(200).json({ message: "Cupom editado com sucesso!" })
        } catch (error) {
            res.status(500).json({ error: "Erro ao editar cupom!" })
        }
    },
    Seleciona: async (req,res) => {
        try {
            const selecionaCupom = await Cupons.SelecionaCupom()
            return res.json(selecionaCupom);
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
    },
    Deletar:async(req,res)=>{
        try {
            const {id} = req.params
            if(id === 0 || !id || id === ''){
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const cCupom = new Cupons(id,null,null,null,null,0)
            const inativaCupom = await cCupom.InativaCupom()
            return res.status(200).json({ message: "Cupom deletado com sucesso!" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Erro ao excluir uma categoria" });
        }
    }
}

export default CuponsController