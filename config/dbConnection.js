/* Importar o mongodb */

const mongo = require("mongodb");

const connMongoDB = function(){
    console.log("Entrou na função de conexão");
    const db = new mongo.Db(
        "got",
        new mongo.Server(
            "localhost", //String contendo o endereço do servidor
            27017, //Porta de conexão
            {}
        ),
        {}
    );

    return db;

}

module.exports = function(){
    return connMongoDB;
};

