const pessoa = {
  selectPessoa: async (req, res) => {
        try {
     
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno do servidor");
        }
    },

    
}

export default pessoa;