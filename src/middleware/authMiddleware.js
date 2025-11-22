const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.get('X-API-Key');
    if (!apiKey || apiKey !== 'sua_chave_api_aqui') {
        return res.status(401).json({ mensagem: 'Chave de API inválida ou não fornecida' });
    }
    next();
};

export default apiKeyMiddleware;