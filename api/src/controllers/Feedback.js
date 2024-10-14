import Feedback from "../model/Feedback.js";

const FeedbackController = {
    // Cadastro de feedback
    Cadastro: async (req, res) => {
        try {
            const { avaliacao, comentario, idProduto, idPessoa } = req.body;
            const feedback = new Feedback(null, avaliacao, comentario, idProduto, idPessoa);

            const cadastraFeedback = await feedback.cadastrarFeedback();
            if (cadastraFeedback.error) {
                return res.status(500).json({ error: "Erro ao cadastrar feedback", details: cadastraFeedback.details });
            }
            return res.status(201).json({ message: "Feedback cadastrado com sucesso!", id: cadastraFeedback });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao cadastrar feedback" });
        }
    },

    // Modificação de feedback
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
};

export default FeedbackController;
