const { connect } = require("mongodb");

module.exports.cadastro = function(application, req, res) {
    res.render("cadastro", {validacao: {}, dadosForm: {}});
};

module.exports.cadastrar = function(application, req, res){
    
    let dadosForm = req.body;
    
    req.assert("nome", "Campo nome não pode ser vazio").notEmpty();
    req.assert("usuario", "Campo usuário não pode ser vazio").notEmpty();
    req.assert("senha", "Campo senha não pode ser vazia").notEmpty();
    req.assert("casa", "Campo casa não pode ser vazio").notEmpty();

    let erros = req.validationErrors();

    if(erros){
        res.render("cadastro", {validacao: erros, dadosForm: dadosForm});
        return;
    };

    const connection = application.config.dbConnection;

    const UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    const JogoDAO = new application.app.models.JogoDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);
    //Geração dos parametros

    res.send("Podemos cadastrar")
};
