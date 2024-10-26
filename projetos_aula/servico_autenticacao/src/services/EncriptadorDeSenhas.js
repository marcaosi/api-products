const bcrypt = require('bcrypt')

const encriptar = (senha) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                reject(err)
            }
              
            bcrypt.hash(senha, salt, function(err, hash) {
              resolve(hash)
            })
        })
    })
}

const comparar = (hash, senha) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(senha, hash, function(err, senhasSaoIguais) {   
            if(err == null){
                resolve(senhasSaoIguais)
            }else{
                reject(err)
            }
        })
    })
}

module.exports = {
    encriptar, comparar
}