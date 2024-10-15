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
    }
}

export default FeedbackController;
