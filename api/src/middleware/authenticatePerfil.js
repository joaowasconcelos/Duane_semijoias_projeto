const authenticatePerfil = (req, res, next) => {
    const perfil = req.perfil;

    // Verifica se o perfil existe
    if (perfil === undefined) {
        return res.status(400).json({ message: 'Perfil não definido' });
    }

    if (perfil === 1) {
        if (req.path === '/pagina-admin') {
            return res.status(200).json({ message: "Token válido." });
        }
        next();
    } else {
        return res.json({ message: 'Acesso negado' });
    }
}
export default authenticatePerfil;