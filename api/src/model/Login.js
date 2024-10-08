import obterConexaoDoPool from "../config/mysql.js"
import bcrypt from "bcrypt"

export default class Login {
    _id
    _usuario
    _senha
    _p_log
    _ativo
    _id_perfil
    _id_pessoa
    _nova_senha

    constructor(Id, Usuario, Senha, P_Log, Ativo, ID_Perfil, ID_Pessoa, Nova_Senha) {
        this._id = Id;
        this._usuario = Usuario;
        this._senha = Senha;
        this._p_log = P_Log;
        this._ativo = Ativo;
        this._id_perfil = ID_Perfil;
        this._id_pessoa = ID_Pessoa;
        this._nova_senha = Nova_Senha;
    }

    get Id() {
        return this._id;
    }

    get Usuario() {
        return this._usuario;
    }

    get Senha() {
        return this._senha;
    }

    get P_Log() {
        return this._p_log;
    }

    get Ativo() {
        return this._ativo;
    }

    get ID_Perfil() {
        return this._id_perfil;
    }

    get ID_Pessoa() {
        return this._id_pessoa;
    }

    get Nova_Senha() {
        return this._nova_senha;
    }

    set Id(value) {
        this._id = value;
    }

    set Usuario(value) {
        this._usuario = value;
    }

    set Senha(value) {
        this._senha = value;
    }

    set P_Log(value) {
        this._p_log = value;
    }

    set Ativo(value) {
        this._ativo = value;
    }

    set ID_Perfil(value) {
        this._id_perfil = value;
    }

    set ID_Pessoa(value) {
        this._id_pessoa = value;
    }

    set Nova_Senha(value) {
        this._nova_senha = value;
    }

    async CadastrarLogin() {
        const bd = await obterConexaoDoPool();
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(this._senha, salt);

            const loginResul = await bd.query('INSERT INTO login (pessoa_id,usuario,senha,perfis_id,ativo,primeiro_login) VALUES (?,?,?,?,?,?)',
                [this._id_pessoa, this._usuario, passwordHash, this._id_perfil, this._ativo, this._p_log]);
            const loginId = loginResul[0].insertId;
            return loginId
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
            const loginResul = await bd.query(`UPDATE login SET usuario = ? WHERE pessoa_id`, [this._usuario, this._id_pessoa]);
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

    async AlterarSenha() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`SELECT senha FROM login WHERE pessoa_id = ?`, [this._id_pessoa]);
            const senhaResult = loginResul[0][0].senha;
            const compare = await bcrypt.compare(this._senha, senhaResult)

            if (!compare) {
                return "senha já cadastrada"
            }
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(this._senha, salt);
            const modificaSenha = await bd.query(`UPDATE login SET senha = ? WHERE pessoa_id = ?`, [passwordHash, this._id_pessoa])
            console.log(modificaSenha)
            return "senha modificada com sucesso"
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async EsqueciSenha() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`SELECT * FROM login WHERE usuario=? = ?`, [this._usuario]);
            const idResult = loginResul[0][0].id;

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(this._nova_senha, salt);

            const modificaSenha = await bd.query(`UPDATE login SET senha = ? WHERE id= ?`, [passwordHash, idResult])
            console.log(modificaSenha)
            return "senha alterada com sucesso"
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    async VerificaLogin() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`SELECT usuario,senha,pessoa_id,perfis_id FROM login WHERE usuario=?;`, [this._usuario]);
            if(loginResul[0]== ""){
                return false
            }
            const senhaResult = loginResul[0][0].senha;
            const compare = await bcrypt.compare(this._senha, senhaResult)
            if (!compare) {
                return false
            }

            if(loginResul[0][0].ativo === 0){
                return "Usuario Inativo"
            }
            return loginResul[0]
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    //QUANDO O CLIENTE ESTIVER FAZENDO SEU CADASTRO ESSE FUNÇÃO IRÁ VERIFICAR 
    //SE AQUELE E-MAIL QUE INFORMOU JÁ NÃO POSSUI CADASTRO EM NOSSA BASE DE DADOS
    async VerificaUsuario() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`SELECT usuario FROM login WHERE usuario=?;`, [this._usuario]);
            const usuarioResult = loginResul[0][0].usuario;

            if (usuarioResult === this._usuario) {
                console.log("Entrei")
                return false
            }
            return true
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }

    //ESSA FUNÇÃO SERVE PARA INATIVAR UM USUARIO
    async InativaUsuario() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`UPDATE login SET ativo = ? WHERE pessoa_id = ?;`, [0, this._id_pessoa]);
            console.log(loginResul)
            return "Usuario Inativado"
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


    async ativaUsuario() {
        const bd = await obterConexaoDoPool();
        try {
            const loginResul = await bd.query(`UPDATE login SET ativo = ? WHERE pessoa_id = ?;`, [1, this._id_pessoa]);
            console.log(loginResul)
            return "Usuario Ativado"
        }
        catch (error) {
            console.log('Erro na transação:', error);
            return { error: 'Falha na transação', details: error };
        } finally {
            bd.release();
        }
    }


    verificaCampos() {
        if(this._usuario.length>100 || this._senha.length>50){
            return false
        }
        return true
    }
}


