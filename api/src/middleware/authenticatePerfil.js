const authenticatePerfil = (req, res, next) => {
    const perfil = req.perfil
    if(perfil == 2 )return res.status(500).json({message: "Sem acesso para esse funcionalidade"})
    next()
}
export default authenticatePerfil