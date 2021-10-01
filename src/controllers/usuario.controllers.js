const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = "mysecret";

module.exports = {
    async index(req,res){
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req,res){
        const {nome_usuario,email_usuario,tipo_usuario,senha_usuario} = req.body;
        
        let data = {};
        let user = await Usuario.findOne({email_usuario});
        if(!user){
            data={nome_usuario,email_usuario,tipo_usuario,senha_usuario};
            user = await Usuario.create(data);
            return res.status(200).json(user);
        }else{
            return res.status(400).json(user);
        }

    },
    async details(req,res){
        const {id} = req.params;
        const user = await Usuario.findOne({_id:id});
        res.json(user);
    },
    async delete(req,res){
        const {id} = req.params;

        const user = await Usuario.findByIdAndRemove({_id:id});

        return res.json(user);
    },
    async update(req,res){
        const {id,nome_usuario,email_usuario,senha_usuario,tipo_usuario} = req.body;

        const data = {nome_usuario,email_usuario,senha_usuario,tipo_usuario};

        const user = await Usuario.findOneAndUpdate({_id:id},data,{new:true});

        res.json(user);
    },
    async login(req,res){
        const {email,senha} = req.body;
        Usuario.findOne({email_usuario:email,tipo_usuario:1},function(err, user){
            if(err){
                res.status(500).json({status:2, error:'Erro no servidor, por favor tente novamente'});
            }else if(!user){
                res.status(200).json({status:2, error:'E-mail ou senha não conferem'});
            }else{               
                bcrypt.compare(senha, user.senha_usuario, function(err, matches) {
                    if (err){
                        res.status(200).json({status:2, error:'Erro ao validar senha'});
                    }else if (matches){
                        const payload = {email};
                        const token = jwt.sign(payload,secret,{
                            expiresIn: '24h'
                        })
                        res.cookie('token',token,{httpOnly:true});
                        res.status(200).json({status:1, auth:true, token:token, id_client: user._id, user_name:user.nome_usuario,user_type:user.tipo_usuario})
                    }else{
                        res.status(200).json({status:2, error:'Senha não confere'});
                    }                      
                  });                
            }
        })

    },
    async checkToken(req,res){
        const token = req.body.toke || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401, msg: 'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err,decoded){
                if(err){
                    res.json({status:401, msg: 'Não autorizado: Token inválido!'});
                }else{
                    res.json({status:200});
                }
            })
        }
    }
}