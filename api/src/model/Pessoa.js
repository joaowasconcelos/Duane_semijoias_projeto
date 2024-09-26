import obterConexaoDoPool from "../config/mysql.js"

export default class Pessoa {
    Id
    Nome
    Data_nasc
    CPF
    Genero
    Data_Cad
    constructor(Id,Nome,Data_nasc,CPF,Genero,Data_Cad) {
        this.Id = Id
        this.Nome = Nome
        this.Data_nasc = Data_nasc
        this.CPF = CPF
        this.Genero = Genero
        this.Data_Cad = Data_Cad
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

    async CadastrarPessoa(pessoa) {
        console.log(pessoa)
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query('INSERT INTO pessoa (nome,data_nasc,cpf,genero,data_cad) VALUES (?, ?, ?,?,CURRENT_TIMESTAMP)',
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
}

