import Produto from "../model/Produto.js";
import Preco from "../model/Preco.js"
import Pessoa from "../model/Pessoa.js";

const ProdutoController = {
    cadastro: async (req, res) => {
        try {
            console.log("req.body",req.body)
            console.log("req.file",req.file)
            return
            const { descricao, produto, categoria, preco } = req.body;
        
            let valorSemSimbolo = preco.replace("R$", "").trim();
            valorSemSimbolo = valorSemSimbolo.replace(/\./g, "");
            valorSemSimbolo = valorSemSimbolo.replace(",", ".");
            let valor = parseFloat(valorSemSimbolo);
            
            const cProduto = new Produto(null, descricao, 1, produto, categoria)
            const vericaCampos = cProduto.verificaCampos()
            if (!vericaCampos) {
                return res.status(500).json({ message: "Numero máximo de caracteres " })
            }
            const validaCampos = cProduto.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertProduto = await cProduto.CadastraProduto();
            if (insertProduto.error) {
                return res.status(500).json({ message: "Erro ao cadastrar produto!" });
            }
            const cPreco = new Preco(null, valor, 1, insertProduto);
            const verificaCamposPreco = cPreco.verificaCampos()
            if (!verificaCamposPreco) {
                return res.status(500).json({ message: "Numero máximo de caracteres " })
            }
            const validaCamposPreco = cPreco.validaCampos()
            if (!validaCamposPreco) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertPreco = await cPreco.CadastraPreco()
            console.log(insertPreco)
            if (insertPreco.error) {
                const deleteProduto = await cProduto.DeletaProduto()
                console.log("delete", deleteProduto)
                return res.status(400).json({ message: "Erro ao cadastrar Produto!" });
            }
            return res.status(201).json({ message: "Produto cadastrado com sucesso!",insertProduto})
        } catch (error) {
            return res.status(500).json({ message: "Erro ao cadastrar produto!" })
        }
    },
    editar: async (req, res) => {
        try {
            const { id } = req.params
            const { Descricao, Status, NomeProduto, Valor, ID_categoria, Status_preco } = req.body;
            const cProduto = new Produto(id, Descricao, Status, NomeProduto, ID_categoria)
            const vericaCampos = cProduto.verificaCampos()
            if (!vericaCampos) {
                return res.status(500).json({ message: "Numero máximo de caracteres " })
            }
            const validaCampos = cProduto.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const editaProduto = await cProduto.ModificaProduto()

            if (editaProduto.error) {
                return res.status(500).json({ message: "Erro ao editar produto!" });
            }
            const cPreco = new Preco(null, Valor, Status_preco, id);
            const verificaCamposPreco = cPreco.verificaCampos()
            if (!verificaCamposPreco) {
                return res.status(500).json({ message: "Numero máximo de caracteres " })
            }
            const validaCamposPreco = cPreco.validaCampos()
            if (!validaCamposPreco) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const editaPreco = await cPreco.CadastraPreco()
            console.log(editaPreco)

            if (insertPreco.error) {
                return res.status(400).json({ message: "Erro ao cadastrar Produto!" });
            }

            return res.status(200).json({ message: "Produto editado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao cadastrar produto!" })
        }
    },


    Seleciona: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProduto()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaCate: async (req, res) => {
        try {
            const id = req.params
            const cProduto = new Produto(id)
            const selectProdutos = await cProduto.SelectProdutoPorCategoria()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMaiorMenor: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMaiorMenor()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMenorMaior: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMenorMaior()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMaisVendido: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMaisVendidos()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao vizualizar produto!" })
        }
    },
}

export default ProdutoController