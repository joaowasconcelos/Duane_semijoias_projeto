import obterConexaoDoPool from "../config/mysql.js"
import bcrypt from "bcrypt"

export default class Login {
    constructor(Id, Usuario, Senha, P_Log, Ativo, ID_Perfil, ID_Pessoa) {
        this.id = Id;
        this.usuario = Usuario;
        this.senha = Senha;
        this.p_log = P_Log;
        this.ativo = Ativo;
        this.id_perfil = ID_Perfil;
        this.id_pessoa = ID_Pessoa;
    }

    get Usuario() {
        return this.usuario;
    }

    get Senha() {
        return this.senha;
    }

    get P_Log() {
        return this.p_log;
    }

    get Ativo() {
        return this.ativo;
    }

    get ID_Perfil() {
        return this.id_perfil;
    }

    get ID_Pessoa() {
        return this.id_pessoa;
    }

    set Id(value) {
        this.id = value;
    }

    set Usuario(value) {
        this.usuario = value;
    }

    set Senha(value) {
        this.senha = value;
    }

    set P_Log(value) {
        this.p_log = value;
    }

    set Ativo(value) {
        this.ativo = value;
    }

    set ID_Perfil(value) {
        this.id_perfil = value;
    }

    set ID_Pessoa(value) {
        this.id_pessoa = value;
    }

    async CadastrarLogin() {
        const bd = await obterConexaoDoPool();
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(this.senha, salt);
            console.log(passwordHash)

            const loginResul = await bd.query('INSERT INTO login (pessoa_id,usuario,senha,perfis_id,ativo,primeiro_login) VALUES (?,?,?,?,?,?)',
                [this.id_pessoa, this.usuario, this.senha, this.id_perfil, this.ativo, this.p_log]);
            const loginId = loginResul[0].insertId;
            console.log(pessoaResult);
            console.log('ID login:', loginId);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async ModificaLogin() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query('UPDATE login set usuario = ?) VALUES (?)',[this.usuario]);
            const loginId = loginResul[0].insertId;
            console.log(pessoaResult);
            console.log('ID login:', loginId);
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }
}


