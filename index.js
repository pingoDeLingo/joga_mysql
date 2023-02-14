const express = require('express')
const app = express()

const path = require('path')

const hbs = require('express-handlebars')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'));

const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql',
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to joga_mysql database successfully!')
})

app.get('/', (req,res) =>{
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err,result)=>{
        if(err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
})

app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.*, author.name AS author_name FROM article INNER JOIN author ON article.author_id = author.id WHERE article.slug="${req.params.slug}"`;
    con.query(query, (err, result) => {
        if (err) throw err;
        let article = result[0];
        res.render('article', { article: article });
    });
});

app.get('/author/:id', (req, res) => {
    const authorId = req.params.id;
    const authorQuery = `SELECT name FROM author WHERE id=${authorId}`;
    const articlesQuery = `SELECT * FROM article WHERE author_id=${authorId}`;

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;
        const authorName = authorResult[0].name;

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            res.render('author', {
                authorName: authorName,
                articles: articlesResult
            });
        });
    });
});



app.listen(3000, () => {
    console.log('App is started at localhost:3000')
})