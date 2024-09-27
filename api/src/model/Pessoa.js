import obterConexaoDoPool from "../config/mysql.js"

export default class Pessoa {
    Id
    Nome
    Data_nasc
    CPF
    Genero
    Data_Cad
    constructor(Id, Nome, Data_nasc, CPF, Genero, Data_Cad) {
        this.Id = Id
        this.Nome = Nome
        this.Data_nasc = Data_nasc
        this.CPF = CPF
        this.Genero = Genero
        this.Data_Cad = Data_Cad
    }

    get Id() {
        return this.id;
    }

    get Nome() {
        return this.nome;
    }

    get Data_nasc() {
        return this.data_nasc;
    }

    get CPF() {
        return this.cpf;
    }

    get Genero() {
        return this.genero;
    }

    get Data_Cad() {
        return this.data_cad;
    }

    set Id(value) {
        this.id = value;
    }

    set Nome(value) {
        this.nome = value;
    }

    set Data_nasc(value) {
        this.data_nasc = value;
    }

    set CPF(value) {
        this.cpf = value;
    }

    set Genero(value) {
        this.genero = value;
    }

    set Data_Cad(value) {
        this.data_cad = value;

    }
    async CadastrarPessoa(pessoa) {
            console.log(pessoa)
            const bd = await obterConexaoDoPool();
            try {
                const pessoaResult = await bd.query('INSERT INTO pessoa (nome,data_nasc,cpf,genero,data_cad) VALUES (?, ?, ?,?,CURRENT_TIMESTAMP)',
                    [pessoa.Nome, pessoa.Data_nasc, pessoa.CPF, pessoa.Data_nasc, pessoa.Genero]);
                const pessoaId = pessoaResult[0].insertId;
                console.log(pessoaResult);
                console.log('ID da Pessoa:', pessoaId);
                return pessoaId;
               
               
            }
            catch (error) {
                console.log('Erro na transação:', error);
                return { error: 'Falha na transação', details: error };
            } finally {
                bd.release();
            }
        }

    async ModificaPessoa(pessoa) {
            console.log(pessoa)
            const bd = await obterConexaoDoPool();
            try {
                const pessoaResult = await bd.query(`update pessoa set nome = ?,data_nasc = ?,cpf = ?, genero = ?, where id =?;`,
                    [pessoa.Nome, pessoa.Data_nasc, pessoa.CPF, pessoa.Data_nasc, pessoa.Genero]);
                const pessoaId = pessoaResult[0].insertId;
                console.log(pessoaResult);
                console.log('ID da Pessoa:', pessoaId);
            }
            catch (error) {
                console.log('Erro na transação:', error);
                return { error: 'Falha na transação', details: error };
            } finally {
                bd.release();
            }
        }

    async DeletarPessoa(pessoa) {
        console.log(pessoa)
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query('DELETE FROM pessoa WHERE id = ? VALUES (?)',
                [pessoa.id]);
            const pessoaId = pessoaResult[0].insertId;
            console.log(pessoaResult);
            console.log('ID da Pessoa:', pessoaId);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();

        }
    }
