const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = (app, { User, Meme, Vote })=>{
  app.post('/user', (req, res)=>{
    let user = {
      name: req.body.name,
      passwordHash: crypto.pbkdf2Sync(req.body.password, 'salt', 100, 64, 'sha512')
                          .toString('hex'),
    };
    
    User.create(user)
        .then((r)=> res.json({ message: 'user created', userId: r.dataValues.id }))
        .catch(err => {
          res.status(500).json({ message: JSON.stringify(err) })
        });
  });

  app.post('/login', (req, res)=> {
    const passwordAttemptHash = crypto
      .pbkdf2Sync(req.body.password, 'salt', 100, 64, 'sha512')
      .toString('hex');
    
    User.findOne({ where: { name: req.body.name }})
        .then(userResponse => {
          const user = userResponse.dataValues;
          if( user.passwordHash !== passwordAttemptHash )
            return Promise.reject(401);
          else
            jwt.sign({
              userId: user.id,
              username: user.name,
              exp: Date.now() + 86400000,
              
            }, 'secret code', (err, token)=>{
              res.json({ token });
            });
        })
        .catch(code => res.status(code).end())
  });
  
  app.get('/user/:id', (req, res)=>{
    User.findByPk(1*req.params.id)
      .then(user => res.json(user));
  });

  app.post('/meme', (req, res)=>{
    Meme.create(req.body)
        .then(()=> res.json({ message: 'meme created' }))
        .catch(err => {
          res.status(500).json({ message: JSON.stringify(err) })
        });
  });

  app.get('/meme/:id', (req, res)=>{
    Meme.findByPk(1*req.params.id)
        .then(meme => res.json(meme));
  });

  app.get('/meme', (req, res)=>{
    Meme.findAll().then(memes => res.json(memes));
  });

  app.post('/vote', (req, res)=>{
    Vote.create(req.body)
        .then(()=> res.json({ message: 'vote created' }))
        .catch(err => {
          res.status(500).json({ message: JSON.stringify(err) })
        });
  });

  app.get('/vote/:id', (req, res)=>{
    Vote.findByPk(1*req.params.id)
      .then(vote => res.json(vote));
  });

  app.get('/vote', (req, res)=>{
    Vote.findAll().then(votes => res.json(votes));
  });
}
