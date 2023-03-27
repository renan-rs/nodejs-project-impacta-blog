const router = require('express').Router();
const {User, validate} = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/users', async(req,res) => {
  try {
    const{error} = validate(req.body);;
    if(error){
      return res.status(400).send({message: error.details[0].message})
    }

    const user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(409).send({message: "Um usuário com o email informado já existe"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({...req.body, password: hashPassword}).save();
    res.status(201).send({message: "Usuário criado com sucesso"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: "Erro interno no servidor"});
  }
});


module.exports = router;