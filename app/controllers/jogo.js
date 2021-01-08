const { connect } = require("mongodb");

module.exports.jogo = function(app, req, res){

    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    };

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    };


    const usuario = req.session.usuario;
    const casa = req.session.casa;

    const connection = app.config.dbConnection;
    const JogoDAO = new app.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario, casa, msg);

};

module.exports.sair = function(app, req, res){
    
    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });

};

module.exports.suditos = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    };
    
    res.render("aldeoes", {validacao: {}});

};

module.exports.pergaminhos = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    };



    /* Recuperar as ações inseridas no Banco De Dados - MongoDB */

    const connection = app.config.dbConnection;
    const JogoDAO = new app.app.models.JogoDAO(connection);

    const usuario = req.session.usuario;

    JogoDAO.getAcoes(usuario, res);


};


module.exports.ordenar_acao_sudito = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    };
    
    var dadosForm = req.body;

    req.assert("acao", "Ação deve ser informada").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

    var erros = req.validationErrors();
    
    if(erros){
        res.redirect("jogo?msg=A");
        return;
    };

    const connection = app.config.dbConnection;
    const JogoDAO = new app.app.models.JogoDAO(connection);
    

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect("jogo?msg=B");

};

module.exports.revogar_acao = function(app, req, res){
    let url_query = req.query;
    
    const connection = app.config.dbConnection;
    const JogoDAO = new app.app.models.JogoDAO(connection);

    let _id = url_query.id_acao;
    JogoDAO.revogarAcao(_id, res);
};
