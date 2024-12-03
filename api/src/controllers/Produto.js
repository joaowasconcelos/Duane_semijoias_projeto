import Produto from "../model/Produto.js";
import Preco from "../model/Preco.js"
import Produto_img from "../model/Produto_img.js"
import { listAllFilesId } from "../middleware/imagens.js";

const ProdutoController = {
    cadastro: async (req, res) => {
        try {
            const { descricao, produto, categoria, preco } = req.body;
            const idImagens = req.imageUrls

            let valorSemSimbolo = preco.replace("R$", "").trim();
            valorSemSimbolo = valorSemSimbolo.replace(/\./g, "");
            valorSemSimbolo = valorSemSimbolo.replace(",", ".");
            let valor = parseFloat(valorSemSimbolo);

            const cProduto = new Produto(null, descricao, 1, produto, categoria)
            const vericaCampos = cProduto.verificaCampos()
            if (!vericaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCampos = cProduto.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertProduto = await cProduto.CadastraProduto();
            if (insertProduto.error) {
                return res.status(400).json({ error: "Erro ao cadastrar produto!" });
            }

            for (const imagemId of idImagens) {
                const cProdutoImg = new Produto_img(null, imagemId, insertProduto);
                const insertImagem = await cProdutoImg.CadastraProdutoImg()
                if (insertImagem.error) {
                    return res.status(400).json({ error: "Erro ao associar imagem ao produto!" });
                }
            }

            const cPreco = new Preco(null, valor, 1, insertProduto);
            const verificaCamposPreco = cPreco.verificaCampos()
            if (!verificaCamposPreco) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCamposPreco = cPreco.validaCampos()
            if (!validaCamposPreco) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const insertPreco = await cPreco.CadastraPreco()

            if (insertPreco.error) {
                const deleteProduto = await cProduto.DeletaProduto()
                console.log("delete", deleteProduto)
                return res.status(400).json({ error: "Erro ao cadastrar Produto!" });
            }
            return res.status(201).json({ message: "Produto cadastrado com sucesso!", insertProduto })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar produto!" })
        }
    },
    editar: async (req, res) => {
        try {
            const { id } = req.params
            const { Descricao, Status, NomeProduto, Valor, ID_categoria, Status_preco } = req.body;
            const cProduto = new Produto(id, Descricao, Status, NomeProduto, ID_categoria)
            const vericaCampos = cProduto.verificaCampos()
            if (!vericaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCampos = cProduto.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const editaProduto = await cProduto.ModificaProduto()

            if (editaProduto.error) {
                return res.status(400).json({ error: "Erro ao editar produto!" });
            }
            const cPreco = new Preco(null, Valor, Status_preco, id);
            const verificaCamposPreco = cPreco.verificaCampos()
            if (!verificaCamposPreco) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCamposPreco = cPreco.validaCampos()
            if (!validaCamposPreco) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const editaPreco = await cPreco.CadastraPreco()

            if (insertPreco.error) {
                return res.status(400).json({ message: "Erro ao cadastrar Produto!" });
            }

            return res.status(200).json({ message: "Produto editado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar produto!" })
        }
    },

    //fazer validações
    Seleciona: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProduto()
            selectProdutos.forEach(produto => {
                produto.imagens = produto.imagens.split(',').map(img => img.trim());
            });
            const ListarImg = await listAllFilesId(selectProdutos);
            return res.json(selectProdutos)

        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    Deleta: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 0 || !id || id === '') {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const cProduto = new Produto(id,null,0)
            const InativaProduto = await cProduto.InativaProduto()
            return res.status(200).json({ message: "Produto deletado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaCate: async (req, res) => {
        try {
            const id = req.params
            const cProduto = new Produto(id)
            const selectProdutos = await cProduto.SelectProdutoPorCategoria()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMaiorMenor: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMaiorMenor()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMenorMaior: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMenorMaior()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    SelecionaMaisVendido: async (req, res) => {
        try {
            const selectProdutos = await Produto.SelectProdutoMaisVendidos()
            return res.json(selectProdutos)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    selecionUmProduto: async (req, res) => {
        try {
            const id = req.params
            const cProduto = new Produto(id)
            const selectProduto = await cProduto.selecProdutoUnico()
            return res.json(selectProduto)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao vizualizar produto!" })
        }
    },
    atualizarProduto: async (req, res) => {
        const { idProduto, dadosAtualizados, imagensExistentes } = req.body;
        const novasImagens = req.files; // Novas imagens enviadas pelo cliente
    
        try {
            // Obter o produto do banco
            const produto = await Produto.findById(idProduto);
            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado.' });
            }
    
            // Validar imagens existentes no Firebase
            const imagensValidas = await validateExistingImages(imagensExistentes);
    
            // Atualizar imagens no Firebase
            const imagensAtualizadas = await updateImagesInFirebase(novasImagens, imagensValidas);
    
            // Atualizar os dados do produto no banco
            produto.nome = dadosAtualizados.nome || produto.nome;
            produto.descricao = dadosAtualizados.descricao || produto.descricao;
            produto.preco = dadosAtualizados.preco || produto.preco;
            produto.imagens = imagensAtualizadas;
    
            await produto.save();
    
            return res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!',
                produto,
            });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ mensagem: 'Erro ao atualizar produto.' });
        }
    }
}

export default ProdutoController