const authenticatePerfil = (req, res, next) => {
    const perfil = req.perfil;

    // Verifica se o perfil existe
    if (perfil === undefined) {
        return res.status(400).json({ message: 'Perfil não definido' });
    }

    if (perfil === 1) {
        console.log("aqui")
        return res.json({ message: 'Acesso permitido' });
        next();
    } else {
        return res.json({ message: 'Acesso negado' });
    }
}
export default authenticatePerfil;