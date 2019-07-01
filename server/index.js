const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');

const connection = new ORM('postgres://meme_wars:guest@localhost:5432/meme_wars');


connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


/// define models

const User = connection.define('user', {
  // attributes
  name: {
    type: ORM.STRING,
    allowNull: false
  },
  id: {
    type: ORM.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});


app.use( express.static('build') );
app.use( express.json() );


app.get('/hydrate', (req, res)=> {
  // sync table

  User.sync({ force: true }).then(()=> res.json({ great: 'success' }));
});

app.post('/user', (req, res)=> {
  User.create({ name: 'nik' }).then(u => {
    console.log(u);
    res.json([u]);
  });
});

app.get('/user/:id', (req, res)=> {
  User.findByPk(1*req.params.id).then(u => res.json([u]));
});


app.post('/meme', (req, res)=> {
  // save to db
  res.status(500).send('no db connection yet');
});

app.get('/memes', (req, res)=>{
  res.json([]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
