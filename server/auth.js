const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
  jwt.verify( req.get('Authorization').split(' ')[1], 'secret code', (err, decoded)=>{
    if(err) console.error(err)|| res.status(401).end();
    else {
      req.session = decoded;
      next();
    }
  });
};
