import obterConexaoDoPool from "../config/mysql.js"

export default class Telefone {
    constructor(id, numero, idPessoa) {
        this._id = id;
        this._numero = numero;
        this._idPessoa = idPessoa;
    }

    get id() {
        return this._id;
    }

    get numero() {
        return this._numero;
    }

    get idPessoa() {
        return this._idPessoa;
    }

    set id(value) {
        this._id = value;
    }

    set numero(value) {
        this._numero = value;
    }

    set idPessoa(value) {
        this._idPessoa = value;
    }

    async CadastrarTelefone() {
        const bd = await obterConexaoDoPool();
        try {
                const telefoneResult = await bd.query(`INSERT INTO telefone (numero) VALUES (?)`, [this._numero.Numero]);
                const tel = (telefoneResult[0].insertId);
                console.log('ID do Telefone:', tel);
                

                const telefoneHasPessoaResult = await bd.query(`INSERT INTO telefone_has_pessoa (telefone_id,pessoa_id) VALUES (?,?)`,
                    [tel,this._idPessoa]);
                console.log("Inseriu Pessoa e Telefone")
                return tel
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
            const telefoneResult = await bd.query(`update telefone set numero = ? where id = ?`,[this._numero.Numero,this._idPessoa])
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
            const telefoneResult = await bd.query(`delete from telefone where numero = ?`,[this._numero.Numero])
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
            const telefoneResult = await bd.query(`select * from telefone`)
            console.log(telefoneResult)
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}

