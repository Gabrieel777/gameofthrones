module.exports.index = function(app, req, res){
    res.render("index", {validacao: {}});
}

module.exports.autenticar = function(app, req, res){
    
    const dadosForm = req.body;

    req.assert("usuario", "Campo usuario não pode ser vazio").notEmpty();
    req.assert("senha", "Campo senha não pode ser vazio").notEmpty();

    const erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao: erros});
        return;
    }
    const connection = app.config.dbConnection;
    const UsuariosDAO = new app.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

    //res.send("Tudo ok para criar a sessão! :)");

}