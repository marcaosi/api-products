const axios = require("axios")

const auth_middleware = async (req, res, next) => {
    const {authorization} = req.headers

    const token = authorization.replace("Bearer ", "")

    try{
        const response = await axios.post('http://localhost:8081/verifyToken', {token})
        if(response.data.success){
            return next()
        }else{
            return res.status(401).send({
                success: false,
                message: 'token inválido'
            })
        }
    }catch(err){
        return res.status(401).send({
            success: false,
            message: 'Impossível validar token'
        })
    }
}

module.exports = auth_middleware