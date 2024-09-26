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
}

export default Login