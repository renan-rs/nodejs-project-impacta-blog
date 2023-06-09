const slugify = require("slugify");
const Article = require("../models/Article");
const { v4: uuidv4 } = require("uuid");

//add article
exports.create = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let slug = slugify(title);
    if (!slug) slug = uuidv4();
  
    //validate
    if(!title){
      return res.status(400).json({ error: "Insira um titulo!" });
    } else if(!content){
      return res.status(400).json({ error: "Insira o conteúdo do artigo!" });
    }

    //save article
    const article = await new Article({title, content, author, slug}).save();
    console.log(article);
    return res.json(article);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Um artigo com esse nome já existe!" });
  }
};

//get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({createdAt:-1});
    return res.json(articles);
  } catch (err) {
    return res.status(400).json({ error: "Erro interno ao retornar lista de artigos!" });
  }
};

//get single article
exports.singleArticle = async (req, res) => {
  const { slug } = req.params;
  try{
    const article = await Article.findOne({slug});
    if(!article){
      return res.status(400).json({ error: `Artigo com slug ${slug} não encontrado!` });
    }
    res.json(article);
  } catch (err) {
    return res.status(400).json({ error: "Erro interno ao retornar o artigo!" });
  }
};

// update data
exports.update = async (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  try{
    const article = await Article.findOneAndUpdate(
      { slug },
      { title, content, author },
      { new: true }
    );
    if(!article){
      return res.status(400).json({ error: `Artigo com slug ${slug} não encontrado para atualizar!` });
    }
    res.json(article);
  } catch (err) {
    return res.status(400).json({ error: "Erro interno ao atualizar o artigo!" });
  }
};

// delete article
exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    await Article.findOneAndRemove({ slug });
    res.json({
      message: "Excluído com sucesso!",
    })
  } catch (err) {
    return res.status(400).json({ error: "Erro ao deletar artigo!" });
  }
};
