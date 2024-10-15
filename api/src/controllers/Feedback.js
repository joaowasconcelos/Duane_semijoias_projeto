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
                return res.status(400).json({ message: "Comentário contém palavrões. Por favor, corrija." });
            }
           
            const cFeedback = new Feedback(null, avaliacao, comentarios, id_produto, id)
            const validaCampos = cFeedback.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const verificaCampos = cFeedback.verificaCampos()
            if (!verificaCampos) {
                return res.status(500).json({ message: "Numero máximo de caracteres " })
            }
            const insertFeedback = await cFeedback.CadastrarFeedback()
            if (insertFeedback.error) {
                return res.status(500).json({message: "Erro ao registrar feedback!"});
            }
            console.log(insertFeedback)
            return res.status(201).json({ message: "feedback cadastrado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao cadastrar um feedback" });
        }
    },
      Modificar: async (req, res) => {
        try {
            const { id } = req.params;
            const { avaliacao, comentario, idProduto, idPessoa } = req.body;
            const feedback = new Feedback(id, avaliacao, comentario, idProduto, idPessoa);

            const modificaFeedback = await feedback.modificarFeedback();
            if (modificaFeedback.error) {
                return res.status(500).json({ error: "Erro ao modificar feedback", details: modificaFeedback.details });
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
                return res.status(500).json({ error: "Erro ao deletar feedback", details: deletarFeedback.details });
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
                return res.status(500).json({ error: "Erro ao buscar feedbacks por produto", details: feedbacks.details });
            }
            return res.json(feedbacks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao buscar feedbacks por produto" });
        }
    },
}


export default FeedbackController;
