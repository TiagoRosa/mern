const Produto = require('../models/produto.model');

module.exports = {
    async index(req,res){
        const product = await Produto.find();
        res.json(product);
    },
    async create(req,res){
        const {nome_produto,descricao_produto,preco_produto,qtd_produto} = req.body;
        
        let data = {};
        let product = await Produto.findOne({nome_produto});
        if(!product){
            data={nome_produto,descricao_produto,preco_produto,qtd_produto};
            product = await Produto.create(data);
            return res.status(200).json(product);
        }else{
            return res.status(500).json(product);
        }

    },
    async details(req,res){
        const {id} = req.params;
        const product = await Produto.findOne({_id:id});
        res.json(product);
    },
    async delete(req,res){
        const {id} = req.params;

        const product = await Produto.findByIdAndRemove({_id:id});

        return res.json(product);
    },
    async update(req,res){
        const {id,nome_produto,descricao_produto,preco_produto,qtd_produto} = req.body;

        const data = {nome_produto,descricao_produto,preco_produto,qtd_produto};

        const product = await Produto.findOneAndUpdate({_id:id},data,{new:true});

        res.json(product);
    }
}