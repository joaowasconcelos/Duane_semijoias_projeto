import obterConexaoDoPool from "../config/mysql.js"

export default class Endereco {
    constructor(Id, CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento,ID_pessoa) {
        this._id = Id; 
        this._cep = CEP;
        this._cidade = Cidade;
        this._bairro = Bairro;
        this._estado = Estado;
        this._logradouro = Logradouro;
        this._numero = Numero;
        this._complemento = Complemento;
        this._id_pessoa = ID_pessoa;
    }

    get Id() {
        return this._id; 
    }

    set Id(value) {
        this._id = value; 
    }

    get CEP() {
        return this._cep;
    }

    set CEP(value) {
        this._cep = value;
    }

    get Cidade() {
        return this._cidade;
    }

    set Cidade(value) {
        this._cidade = value;
    }

    get Bairro() {
        return this._bairro;
    }

    set Bairro(value) {
        this._bairro = value;
    }

    get Estado() {
        return this._estado;
    }

    set Estado(value) {
        this._estado = value;
    }

    get Logradouro() {
        return this._logradouro;
    }

    set Logradouro(value) {
        this._logradouro = value;
    }

    get Numero() {
        return this._numero;
    }

    set Numero(value) {
        this._numero = value;
    }

    get Complemento() {
        return this._complemento;
    }

    set Complemento(value) {
        this._complemento = value;
    }

    get ID_pessoa() {
        return this._id_pessoa;
    }

    set ID_pessoa(value) {
        this._id_pessoa = value;
    }

    async CadastrarEndereco() {
        const bd = await obterConexaoDoPool();
        try {
            const enderecoResult = await bd.query(`INSERT INTO endereco (cep,cidade,estado,logradouro,numero_endereco,complemento) VALUES (?,?,?,?,?,?);`,
                [this._cep,this._cidade,this._estado,this._logradouro,this._numero,this._complemento]);
            const enderecoId = enderecoResult[0].insertId;
            console.log('ID do Endereço:', enderecoId);

            const endereco_has_pessoa = await bd.query(`INSERT INTO endereco_has_pessoa (endereco_id,pessoa_id) VALUES (?,?);`,[enderecoId,this._id_pessoa])
            console.log(endereco_has_pessoa);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaEndereco() {
        const bd = await obterConexaoDoPool();
        try {
            const enderecoResult = await bd.query(`UPDATE endereco SET cep=?, cidade=?,estado=?,logradouro=?,numero_endereco=?,complemento=?;`,
                [this._cep,this._cidade,this._estado,this._logradouro,this._numero,this._complemento]);
            console.log(enderecoResult);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async DeletaEndereco() {
        const bd = await obterConexaoDoPool();
        try {
            const enderecoResult = await bd.query(`DELETE FROM endereco WHERE id = ?;`,[this._id]);
            console.log(enderecoResult);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    // async VerificaCep() {
    //     try {
           
    //     }
    //     catch (error) {
    //         console.log('Erro na transação:', error);
    //         return { error: 'Falha na transação', details: error };
    //     } finally {
    //         bd.release();
    //     }
    // }
}

