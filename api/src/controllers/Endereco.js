import Endereco from "../model/Endereco"

const EnderecoController = {
    cadastro: async (req, res) => {
        //Pegando o ID da pessoa logada vindo do JWT
        const userId = req.pessoa_id
        try {
            const { CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento } = req.body
            const cEndereco = new Endereco(null, CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento, userId)
            const validaCampos = cEndereco.validaCampos()
            if (!validaCampos) {
                res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertEndereco = await cEndereco.CadastrarEndereco()
            console.log(insertEndereco)
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
    }


}

export default EnderecoController;