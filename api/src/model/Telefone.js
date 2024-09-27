export default class Telefone {
    Id
    Numero
    constructor(Id,Numero) {
        this.Id = Id
        this.Numero = Numero
    }

    get Id() {
        return this.id;
    }

    get Numero() {
        return this.numero;
    }

    set Id(value) {
        this.id = value;
    }

    set Numero(value) {
        this.numero = value;
    }

    async CadastrarTelefone(telefone,pessoaId) {
        console.log(telefone)
        const bd = await obterConexaoDoPool();
        try {
            const idtel = []
            telefone.forEach(async (tel) => {
                const telefoneResult = await bd.query('INSERT INTO telefone (numero) VALUES (?)',[tel]);
                idtel.push(telefoneResult[0].insertId);
                console.log('ID do Telefone:', idtel[0]);
            });

            const idtelHasPessoa = []
            idtel.forEach(async (id) => {
                const telefoneHasPessoaResult = await bd.query("INSERT INTO telefone_has_pessoa (telefone_id,pessoa_id) VALUES (?,?)",
                    [pessoaId, id]);
                idtelHasPessoa.push(telefoneHasPessoaResult[0].insertId)
                console.log("Inseriu Pessoa e Telefone",idtelHasPessoa)
            });
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}

