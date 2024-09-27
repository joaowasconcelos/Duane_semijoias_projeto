export default class Telefone {
    Id
    Numero
    ID_pessoa
    constructor(Id, Numero,ID_pessoa) {
        this.Id = Id
        this.Numero = Numero
        this.ID_pessoa = ID_pessoa
    }

    get Id() {
        return this.id;
    }

    get Numero() {
        return this.numero;
    }

    get ID_pessoa() {
        return this.id_pessoa;
    }

    set Id(value) {
        this.id = value;
    }

    set Numero(value) {
        this.numero = value;
    }

    set ID_pessoa(value) {
        this.id = value;
    }

    async CadastrarTelefone() {
        const bd = await obterConexaoDoPool();
        try {
                const telefoneResult = await bd.query('INSERT INTO telefone (numero) VALUES (?)', [tel]);
                const tel = (telefoneResult[0].insertId);
                console.log('ID do Telefone:', tel);

                const telefoneHasPessoaResult = await bd.query("INSERT INTO telefone_has_pessoa (telefone_id,pessoa_id) VALUES (?,?)",
                    [pessoaId, id]);
                const telPessoa = (telefoneHasPessoaResult[0].insertId)
                console.log("Inseriu Pessoa e Telefone", telPessoa)
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaTelefone() {
        const bd = await obterConexaoDoPool();
        try {
            const telefoneResult = await bd.query(`update telefone set numero = ? where id = ?`,[this.Numero])
            console.log(telefoneResult)
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaTelefone() {
        try {
            const telefoneResult = await bd.query(`delete from telefone where id = ?`,[this.ID_pessoa])
            console.log(telefoneResult)
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaTelefone() {
        try {


        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}

