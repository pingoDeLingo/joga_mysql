const con = require('../utils/db')

const getAllArticcles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', { articles: articles
        })
    })
};

const getArticleBySlug = (req, res) => {
    let query = `SELECT *, article.name as article_name FROM article INNER JOIN author on author.id = article.author WHERE slug = '${req.params.slug}'`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', { article: article
        })
    });
};

module.exports = {
    getAllArticcles,
    getArticleBySlug
};