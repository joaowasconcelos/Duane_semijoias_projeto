import Feedback from "../model/Feedback.js";
import createFilter from "../middleware/bad-words.js";

const FeedbackController = {
    Cadastro: async (req, res) => {
        try {
            const { comentarios, avaliacao } = req.body;
            const { id_produto } = req.params
            const id = req.id

            const filter = createFilter();
            const cleanText = filter.clean(comentarios);
        
            if (filter.isProfane(comentarios)) {
                return res.status(400).json({ error: "Comentário contém palavrões. Por favor, corrija." });
            }
           
            const cFeedback = new Feedback(null, avaliacao, comentarios, id_produto, id)
            const validaCampos = cFeedback.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cFeedback.verificaCampos()
            if (!verificaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const insertFeedback = await cFeedback.CadastrarFeedback()
            if (insertFeedback.error) {
                return res.status(400).json({error: "Erro ao registrar feedback!"});
            }

            return res.status(201).json({ message: "feedback cadastrado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao cadastrar um feedback" });
        }
    },
      Modificar: async (req, res) => {
        try {
            const { id_feedback } = req.params;
            const id_pessoa = req.id
            const { avaliacao, comentario, idProduto } = req.body;

            const filter = createFilter();
            const cleanText = filter.clean(comentario);
        
            if (filter.isProfane(comentario)) {
                return res.status(400).json({ error: "Comentário contém palavrões. Por favor, corrija." });
            }

            const cFeedback = new Feedback(id_feedback, avaliacao, comentario, idProduto, id_pessoa);
         
            const validaCampos = cFeedback.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cFeedback.verificaCampos()
            if (!verificaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }

            const modificaFeedback = await cFeedback.modificarFeedback();
            if (modificaFeedback.error) {
                return res.status(400).json({ error: "Erro ao modificar feedback", details: modificaFeedback.details });
            }
            return res.status(200).json({ message: "Feedback modificado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao modificar feedback" });
        }
    },

    // Deletar feedback
    Deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const feedback = new Feedback(id);

            const deletarFeedback = await feedback.deletarFeedback();
            if (deletarFeedback.error) {
                return res.status(400).json({ error: "Erro ao deletar feedback", details: deletarFeedback.details });
            }
            return res.status(200).json({ message: "Feedback deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao deletar feedback" });
        }
    },

    SelecionarPorProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; 
            const feedbacks = await Feedback.selecionarFeedbacksPorProduto(idProduto);
            if (feedbacks.error) {
                return res.status(400).json({ error: "Erro ao buscar feedbacks por produto", details: feedbacks.details });
            }
            return res.json(feedbacks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao buscar feedbacks por produto" });
        }
    },
}


export default FeedbackController;
