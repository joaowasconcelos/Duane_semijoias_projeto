import obterConexaoDoPool from "../config/mysql.js"
import Login from "./Login.js"
import Telefone from "./Telefone.js"

export default class Pessoa {
    constructor(Id, Nome, Data_nasc, CPF, Genero) {
        this._id = Id;
        this._nome = Nome;
        this._data_nasc = Data_nasc;
        this._cpf = CPF;
        this._genero = Genero;
    }

    get Id() {
        return this._id;
    }

    get Nome() {
        return this._nome;
    }

    get Data_nasc() {
        return this._data_nasc;
    }

    get CPF() {
        return this._cpf;
    }

    get Genero() {
        return this._genero;
    }

    set Id(value) {
        this._id = value;
    }

    set Nome(value) {
        this._nome = value;
    }

    set Data_nasc(value) {
        this._data_nasc = value;
    }

    set CPF(value) {
        this._cpf = value;
    }

    set Genero(value) {
        this._genero = value;
    }

    async CadastrarPessoa() {
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query(`INSERT INTO pessoa (nome, data_nasc, cpf, genero, data_cad) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
                [this._nome, this._data_nasc, this._cpf, this._genero]);
            const pessoaId = pessoaResult[0].insertId;
            this._id = pessoaId;
            return pessoaId;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaPessoa(conn) {
        try {
            const pessoaResult = await conn.query(`UPDATE pessoa SET nome = ?, data_nasc = ?, genero = ? WHERE id = ?;`, [this._nome, this._data_nasc, this._genero, this._id]);
            return { message: pessoaResult }

        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        }
    }
    async ModificaPessoaADM(conn) {
        try {
            console.log(this._nome, this._data_nasc, this._id)
            const pessoaResult = await conn.query(`UPDATE pessoa SET nome = ?, data_nasc = ? WHERE id = ?;`, [this._nome, this._data_nasc, this._id]);
            console.log(pessoaResult)
            return { message: pessoaResult }

        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        }
    }

    async DeletarPessoa() {
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query('DELETE FROM pessoa WHERE id = ?',
                [this._id]);
            return { success: true };
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async SelecionaUsuarios() {
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query(`
          SELECT 
	p.id,
    p.nome,
    DATE_FORMAT(p.data_nasc, '%d/%m/%Y') AS data_nasc,
    p.cpf,
    l.usuario,
    pf.tipo,
	MAX(CASE WHEN t.row_num = 1 THEN t.id ELSE NULL END) AS telefone_id_1,
    MAX(CASE WHEN t.row_num = 1 THEN t.numero ELSE NULL END) AS telefone_1,
	MAX(CASE WHEN t.row_num = 2 THEN t.id ELSE NULL END) AS telefone_id_2,
    MAX(CASE WHEN t.row_num = 2 THEN t.numero ELSE NULL END) AS telefone_2
FROM 
    pessoa p
JOIN 
    telefone_has_pessoa tp ON tp.pessoa_id = p.id
JOIN 
    login l ON l.pessoa_id = p.id 
JOIN 
    perfis pf ON pf.id = l.perfis_id
LEFT JOIN (
    SELECT 
        t.id, 
        t.numero, 
        ROW_NUMBER() OVER (PARTITION BY tp.pessoa_id ORDER BY t.id) AS row_num
    FROM 
        telefone t
    JOIN 
        telefone_has_pessoa tp ON tp.telefone_id = t.id
) t ON t.id = tp.telefone_id
WHERE 
    p.id = ?
GROUP BY 
   p.id, p.nome, p.data_nasc, p.cpf, l.usuario, pf.tipo
ORDER BY 
    p.id
LIMIT 0, 1000;`, [this._id]);
            return pessoaResult[0]

        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async Seleciona() {
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query(`
            SELECT 
                p.id,
                p.nome,
                p.data_nasc,
                l.usuario,
                l.ativo
            FROM
                pessoa p
            JOIN
                login l on l.pessoa_id = p.id; `)
            return pessoaResult[0]
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


    static async SelecionaUsuariosAdm() {
        const bd = await obterConexaoDoPool();
        try {
            const pessoaResult = await bd.query(`
        SELECT 
            p.id,
            p.nome,
            p.data_nasc,
            p.cpf,
            l.usuario,
            pf.tipo,
            GROUP_CONCAT(t.numero) AS numeros 
        FROM 
            pessoa p 
        JOIN 
            login l ON l.pessoa_id = p.id 
        JOIN
            perfis pf ON pf.id = l.perfis_id
        JOIN 
            telefone_has_pessoa tp ON tp.pessoa_id = p.id 
        JOIN 
            telefone t ON t.id = tp.telefone_id 
        WHERE 
            pf.id = 1
        GROUP BY 
            p.id, p.nome, pf.tipo, p.data_nasc, p.cpf, l.usuario
        LIMIT 0, 1000;`)
            return pessoaResult[0]

        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    static async SelecionaUserId(id) {
        const bd = await obterConexaoDoPool();
        try {
            const result = await bd.query(`
                 SELECT 
            p.id,
            p.nome,
            p.cpf,
            l.usuario,
            t.numero
        FROM 
            pessoa p 
        JOIN 
            login l ON l.pessoa_id = p.id 
        JOIN
            perfis pf ON pf.id = l.perfis_id
        JOIN 
            telefone_has_pessoa tp ON tp.pessoa_id = p.id 
        JOIN 
            telefone t ON t.id = tp.telefone_id 
        WHERE 
            p.id = ?;
                `, [id])
            return result[0]
        } catch (error) {
            console.log(error)
        }
    }


    DataConvert() {
        let [dia, mes, ano] = this._data_nasc.split('/');
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.Data_nasc = new Date(dataFormatada);
        // this.Data_nasc = dataFormatada
        return this.Data_nasc
    }

    verificaCampos() {
        if (this._cpf.length > 15 || this._data_nasc.length > 10 || this._genero.length > 20 || this._nome.length > 100) {
            return false
        }
        return true
    }


    validaCampos() {
        if (!this._cpf || !this._data_nasc || !this._genero || !this._nome) {
            return false
        }
        return true
    }
    verificaCamposADM() {
        if (this._data_nasc.length > 20 || this._nome.length > 100) {
            return false
        }
        return true
    }


    validaCamposADM() {
        if (!this._data_nasc || !this._nome) {
            return false
        }
        return true
    }
    verificaCamposEditarUsuario() {
        if (this._data_nasc.length > 10 || this._nome.length > 100 || !this._genero) {
            return false
        }
        return true
    }
    validaCamposEditarUsuario() {
        if (!this._data_nasc || !this._genero || !this._nome) {
            return false
        }
        return true
    }
    validaCpf() {
        // Remover caracteres especiais do CPF
        let value = this._cpf.replace(/[.-]/g, '');

        // Verificar se o CPF tem 11 dígitos, caso negativo, retorna false
        if (value.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais, caso positivo, retorna false
        if (/^(\d)\1{10}$/.test(value)) {
            return false;
        }

        // Inicia o cálculo para avaliar se o número informado é um CPF válido

        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(value.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o primeiro dígito verificador está correto
        if (digitoVerificador1 !== parseInt(value.charAt(9))) {
            return false;
        }

        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(value.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o segundo dígito verificador está correto
        if (digitoVerificador2 !== parseInt(value.charAt(10))) {
            return false;
        }
        this.Cpf = value;
        // CPF válido
        return true;
    }
    async verificaCpf() {
        const bd = await obterConexaoDoPool();
        try {
            const resultado = await bd.query(`SELECT COUNT(cpf) AS total FROM pessoa WHERE cpf = ?;`, [this._cpf]);
            const totalCPFs = resultado[0][0].total;
            return totalCPFs > 0;
        } catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}
