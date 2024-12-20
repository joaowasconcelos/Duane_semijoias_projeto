import Pedido from "../model/Pedido.js"
import Itens from "../model/Itens.js"

const PedidoController = {
    Cadastro: async (req,res) =>{
        try {
            const {status, valor_total, id_cupons, itens} = req.body;
            const id =req.id

            const cPedido = new Pedido(null,status,valor_total,id,id_cupons);
            const convertValor = cPedido.convertevalor()
            if(!convertValor){
            return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }

            const validaCampos = cPedido.validaCampos()
            if(!validaCampos){
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cPedido.verificaCampos()
            if(!verificaCampos){
                return res.status(400).json({ error: "Numero máximo de caracteres "})
            }
            const insertPedido = await cPedido.CadastraPedido()
            const objItens = [];

            if (itens.length > 0) {
                await Promise.all(itens.map(async vItens => {
                    const { quantidade, id_produto, id_preco } = vItens;
                    const cItem = new Itens(null, quantidade, id_produto, insertPedido, id_preco);
                    const validaCamposItem = cItem.validaCampos();

                    if(!validaCamposItem){
                        return res.status(400).json({ error: "Dados inválidos fornecidos." });
                    }

                    const insertItens = await cItem.CadastraItens()
                    objItens.push(cItem);

                }));
            }
            const insertItem = await cItem.CadastraItens()

            return res.status(201).json({ message: "Pedido cadastrado com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao cadastrar um pedido" });
        }
    },
    Modifica: async (req,res) =>{
        try {
            const {status} = req.body;
            const {id} = req.params
            if (!status || status.length === 0|| status === undefined|| status === null) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const cPedido = new Pedido(id,status)
            const modificaPedido = cPedido.ModificaStatusPedido()
            return res.status(201).json({ message: "Pedido modificado com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao modificar" });
        }
    },
    Deletar: async (req,res) =>{
        try {
            const {id} = req.params
            const cPedido = new Pedido(id)
            const DeletaPedido = await cPedido.DeletaPedido()
            return res.status(201).json({ message: "Pedido deletado com sucesso!" });
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao deletar" });
        }
    },
    Seleciona: async (req, res) => {
        try {
            const selecionaPedido = await Pedido.SelecionaPedido()
            return res.json(selecionaPedido);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar pedidos" });
        }
    },
    selecionaMeusPedidos : async (req,res) => {
        try {
          const id = req.id
          const cPedido = new Pedido(id)
          const selecionaMeusPedidos = await cPedido.PedidoPorUsuario()
          return res.json(selecionaMeusPedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao selecionar pedidos" });
        }
    },
    SelecionaDetalhes: async (req,res) => {
        try {
            const {id} = req.params
            const cPedido = new Pedido(id)
            const selecionaMeuPedidos = await cPedido.SelecionaPedidoInfo()
            return res.json(selecionaMeuPedidos);
          } catch (error) {
              console.error(error);
              res.status(500).json({ error: "Erro ao selecionar pedidos" });
          }
    }

}

export default PedidoController;