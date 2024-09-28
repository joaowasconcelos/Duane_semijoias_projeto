import obterConexaoDoPool from "../config/mysql.js"

export default class Telefone {
    constructor(Id, Numero, ID_pessoa) {
        this.id = Id;
        this.numero = Numero;
        this.id_pessoa = ID_pessoa;
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
        this.id_pessoa = value;
    }

    async CadastrarTelefone() {
        const bd = await obterConexaoDoPool();
        try {
                const telefoneResult = await bd.query('INSERT INTO telefone (numero) VALUES (?)', [this.Numero.Numero]);
                const tel = (telefoneResult[0].insertId);
                console.log('ID do Telefone:', tel);
                

                const telefoneHasPessoaResult = await bd.query("INSERT INTO telefone_has_pessoa (telefone_id,pessoa_id) VALUES (?,?)",
                    [tel,this.ID_pessoa]);
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
            const telefoneResult = await bd.query(`update telefone set numero = ? where id = ?`,[this.Numero.Numero,this.ID_pessoa])
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
            const telefoneResult = await bd.query(`delete from telefone where numero = ?`,[this.Numero.Numero])
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

