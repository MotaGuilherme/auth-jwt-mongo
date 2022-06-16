// const { update } = require("../model/usuario.model");
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.json")

const generateToken = (user = {})=> {
    
    return jwt.sign({
        id: user.id,
        name: user.name
    },authConfig.secret ,{
        expiresIn: 86400
    })
 }

module.exports = {
    async registerUser(req, res) {
        
        const {email} = req.body

        if(await userModel.findOne({email})){
            return res.status(400).json({
                error:true,
                message: "Usuario ja cadastrado"
            })
        }
        const user = await userModel.create(req.body);

        user.password = undefined

        return res.json({
            user,
            token: generateToken(user)
        })
    },

    async authUser(req, res) {

        const {email, password} = req.body

        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                error:true,
                message: "Usuario nao econtrado"
            })
        } 

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({
                error:true,
                message: "Senha invalida"
            })
        }
        
        user.password = undefined;

        return res.json({user, token: generateToken(user)})

        },
    
    async authLegal(req, res){
        console.log("Logado")
        return res.json({msg: "logado"})
    }
}

 