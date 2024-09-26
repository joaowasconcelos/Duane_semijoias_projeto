class Login {
    Id
    Usuario
    Senha
    P_Log
    Ativo
    ID_Perfil
    ID_Pessoa
    constructor(Id,Usuario,Senha,P_Log,Ativo,ID_Perfil,ID_Pessoa) {
        this.Id = Id
        this.Usuario = Usuario
        this.Senha = Senha
        this.P_Log = P_Log
        this.Ativo = Ativo
        this.ID_Perfil = ID_Perfil
        this.ID_Pessoa = ID_Pessoa
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
}

export default Login