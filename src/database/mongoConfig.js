const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/teste', {    
},(err)=> {
    if(err){
        console.log(err)
    }else{
        console.log("Mongo Db conectado com sucesso")
    }
})

mongoose.Promise = global.Promise;

module.exports = mongoose;