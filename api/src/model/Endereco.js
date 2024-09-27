export default class Endereco {
    Id
    CEP
    Cidade
    Bairro
    Estado
    Logradouro
    Numero
    Complemento
    constructor(Id, CEP, Cidade, Bairro, Estado, Logradouro, Numero, Complemento) {
        this.Id = Id
        this.CEP = CEP
        this.Cidade = Cidade
        this.Bairro = Bairro
        this.Estado = Estado
        this.Logradouro = Logradouro
        this.Numero = Numero
        this.Complemento = Complemento
    }

    get Id() { return this.Id }
    set Id(value) { this.Id = value }

    async CadastrarEndereco(endereco,pessoa) {
        console.log(endereco)
        const bd = await obterConexaoDoPool();
        try {
            const enderecoResult = await bd.query('INSERT INTO endereco (cep,cidade,estado,logradouro,numero_endereco,complemento) VALUES (?,?,?,?,?,?)',
                [endereco.cep,endereco.cidade,endereco.estado,endereco.logradouro,endereco.numero_endereco,endereco.complemento]);
            const enderecoId = enderecoResult[0].insertId;
            console.log(enderecoId);
            console.log('ID da Pessoa:', enderecoId);

            const endereco_has_pessoa = await bd.query(`INSERT INTO endereco_has_pessoa (endereco_id,pessoa_id) VALUES (?,?)`,[enderecoId,pessoa])
            console.log(endereco_has_pessoa);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


}

