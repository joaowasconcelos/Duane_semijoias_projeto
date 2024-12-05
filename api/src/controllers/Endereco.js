import Endereco from "../model/Endereco.js"

const EnderecoController = {
    cadastro: async (req, res) => {
        console.log("aqui")
        console.log(req.body)
        const userId = req.id
        console.log(userId)
      
        try {
            const { cep, cidade, bairro, uf, logradouro, numero } = req.body
            const cEndereco = new Endereco(null, cep, cidade, bairro, uf, logradouro, numero,null,userId)
            const validaCampos = cEndereco.validaCampos()
            if (!validaCampos) {
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertEndereco = await cEndereco.CadastrarEndereco()
            if (insertEndereco.error) {
                return res.status(500).json({
                    message: "Erro ao cadastrar um endereço",
                    details: returnProduto.details
                });
            }
            return res.status(201).json({ message: "Categoria cadastrada com sucesso!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar um  endereço" });

        }
    },
    editar: async (req, res) => {
        try {
            //Pegando o ID da pessoa logada vindo do JWT
            const userId = req.pessoa_id
            const { CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento } = req.body
            const cEndereco = new Endereco(null, CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento, userId)
            const validaCampos = cEndereco.validaCampos()
            if (!validaCampos) {
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const updateEndereco = await cEndereco.ModificaEndereco()
            if (updateEndereco.error) {
                return res.status(400).json({
                    error: "Erro ao editar um endereço",
                    details: returnProduto.details
                });
            }
            return res.status(201).json({ message: "Endereço editado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao editar um endereço" });
        }
    },
    deletar: async (req, res) => {
        const id = req.params.id
        const cEndereco = new Endereco(id)
        const deletarEndereco = await cEndereco.DeletaEndereco()
        if (deletarEndereco.error) {
            return res.status(400).json({
                error: "Erro ao deletar um endereço",
                details: returnProduto.details
            });
        }
        return res.status(201).json({ message: "Endereço deletado com sucesso!" });
    },

    seleciona: async (req, res) => {

        const id = req.id
        console.log(id)

        const cEndereco = new Endereco(id)
        const sendereco = await cEndereco.SelecionaEndereco()
        if (sendereco.error) {
            return res.status(400).json({
                error: "Erro ao selecionar um endereço",
                details: returnProduto.details
            });
        }

        return res.json({endereco})
    }


}

export default EnderecoController;