# meme wars

Agenda:

 - client side SPA
   - install react router
   - make View Components
     - two lists (results)
     - two inputs (login)
     - one input (create meme)
     - two images (voting page)
   - integrate create meme to server ...
 - install express, get started
 - server side routing
   - [set up CRA proxying](https://www.google.com/search?q=create+react+app+from+a+server)
   - POST /meme
     - model design for Meme
 - install postgres
   - googling for mac, ubuntu & windows installation guide + user + password + db


## getting started

`$ npx create-react-app meme-wars`

or, if your installations are ferkakte for react app version

`$ git clone --branch start https://github.com/nikfrank/meme-wars`

`$ cd meme-wars`

`$ rm -rf .git`

`$ git init`





## client side SPA

in order to have multiple pages on our front end, we will install a client side router

`$ npm i -S react-router react-router-dom`


here we will start with a Single Page App boilerplate

<sub>./src/App.js</sub>
```js
import React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

import Navbar from './Navbar';
import Login from './Login';
import Meme from './Meme';
import Vote from './Vote';
import Results from './Results';


export default ()=> (
  <Router>
    <>
      <Navbar />

      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/meme' component={Meme} />

        <Route exact path='/vote' component={Vote} />
        <Route exact path='/results' component={Results} />
        <Redirect from='/' to='/login' />
      </Switch>

      <footer></footer>
    </>
  </Router>
);

```

of course now we will need to make boilerplate Component files for the View components

`$ touch src/Login.js src/Login.css src/Meme.js src/Meme.css src/Vote.js src/Vote.css src/Results.js src/Results.css src/Navbar.js src/Navbar.css`



each of the View Component files will look like

<sub>./src/Login.js</sub>
```js
import React from 'react';
import './Login.css';

class Login extends React.Component {
  componentDidMount(){
    console.log('Login mount');
  }

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    return (
      <div className='Login Page'>
        Login Coming Soon...
      </div>
    );
  }
};

export default Login;
```

the css files we can leave blank until we start styling elements on each of the pages.



and we'll need a navbar

<sub>./src/Navbar.js</sub>
```js
import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ()=> (
  <div className='Navbar'>
    <h1>MEME WARS</h1>
    <ul className='nav-links'>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/meme'>Meme</Link>
      </li>
      <li>
        <Link to='/Vote'>Vote</Link>
      </li>
      <li>
        <Link to='/Results'>Results</Link>
      </li>
    </ul>
  </div>
);

export default Navbar;
```

<sub>./src/Navbar.css</sub>
```css
.Navbar {
  position: fixed;
  top: 0;
  z-index: 10;
  
  width: 100%;
  min-height: 80px;
  
  background-image: linear-gradient(
    to bottom,
    rgba(15, 21, 21, 0.75),
    rgba(15, 21, 21, 0.125)
  );

  display: flex;
  flex-direction: row;
}

.Navbar h1 {
  color: #fffa;
  padding: 10px 0 10px 20px;
  flex-grow: 5;
}

.Navbar ul.nav-links {
  list-style: none;
  padding: 13px 0 0 0;

  flex-grow: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.Navbar ul.nav-links a {
  color: white;
  font-size: 1.25rem;
  text-decoration: none;
}

.Navbar ul.nav-links a:hover {
  color: #fffa;
}

.Navbar ul.nav-links li {
  flex-grow: 1;
  text-align: center;
  padding-top: 10px;
}
```


## make View Components


here we will go through the exercise of building

### two lists (results)

### two inputs (login)

```css
.Login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;

  min-height: 40vh;
  min-width: 60vw;

  box-shadow:
    0px 1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14),
    0px 2px 1px -1px rgba(0,0,0,0.12);
}

.login-box label {
  height: 80px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.login-box input {
  border-radius: 4px;
  padding: 4px;
  outline: none;
}

.login-box button {
  border-radius: 8px;
  padding: 8px;
  background-color: #24a;
  color: white;
  outline: none;
}

```

```js
import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    toVote: false,
  }

  setUsername = (event)=>
    this.setState({ username: event.target.value })

  setPassword = (event)=>
    this.setState({ password: event.target.value })

  login = ()=> {
    console.log('pretend to check password');
    this.setState({ toVote: true });
  }

  componentDidMount(){
    console.log('Login mount');
  }

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    if( this.state.toVote ) return (<Redirect to='/vote'/>);

    return (
      <div className='Login Page'>
        <div className='login-box'>
          <label>
            <span>Username</span>
            <input value={this.state.username}
                   onChange={this.setUsername}/>
          </label>
          <label>
            <span>Password</span>
            <input type='password'
                   value={this.state.password}
                   onChange={this.setPassword}/>
          </label>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
};

export default Login;

```


### one input (create meme)

```css
.Meme {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Meme .meme-box {
  min-height: 60vh;
  min-width: 60vw;

  box-shadow:
    0px -1px 3px 0px rgba(0,0,0,0.2),
    0px 1px 1px 0px rgba(0,0,0,0.14),
    0px 2px 1px -1px rgba(0,0,0,0.12);

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;
}

.Meme .meme-box span {
  margin: 5px;
}

.Meme .meme-box img {
  max-width: 50%;
  max-height: 50%;
}

```

```js
import React from 'react';
import './Meme.css';

class Meme extends React.Component {
  state = {
    imgUrl: '',
  }

  setImgUrl = (event)=>
    this.setState({ imgUrl: event.target.value })

  upload = ()=>{
    console.log('CREATE MEME ', this.state.imgUrl);
    this.setState({ imgUrl: '' })
  }

  componentDidMount(){
    console.log('Meme mount');
  }

  componentWillUnmount(){
    console.log('Meme unmount');
  }

  render(){
    return (
      <div className='Meme Page'>
        <div className='meme-box'>
          <label>
            <span>Url to Upload</span>
            <input value={this.state.imgUrl}
                   onChange={this.setImgUrl}/>
          </label>
          <button onClick={this.upload}>Upload</button>
          <img src={this.state.imgUrl}/>
        </div>
      </div>
    );
  }
};

export default Meme;

```


### two images (voting page)

```css
.Vote .img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.Vote .img-box .vote-img {
  min-height: 300px;
  min-width: 40vw;
  width: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
}

```


```js
import React from 'react';
import './Vote.css';

class Vote extends React.Component {
  state = {
    imgUrls: [
      'http://theawkwardyeti.com/wp-content/uploads/2015/01/0121_Heartwatchesthenews.png',
      'https://media.discordapp.net/attachments/576550326509764619/589870367968067584/Snapchat-1663181687.jpg?width=725&height=666',
      'https://cdn.discordapp.com/attachments/576550326509764619/588542078460362753/Snapchat-1743849407.jpg',
      'https://cdn.discordapp.com/attachments/576550326509764619/587878048087539713/image0.jpg',
      'https://cdn.discordapp.com/attachments/576550326509764619/593075547815280661/bobbhlkash631.png',
      'https://images-ext-2.discordapp.net/external/G_e-rxPLhczo-uGCM2W0O85uPyRaZ26AQyv6LCGBdCk/https/bit.ly/2Xd9RnB?width=589&height=619',
    ],

    firstImg: 0,
    secondImg: 1,
  }

  pickNextImgs = ()=> {
    const nextFirstImg = Math.floor(Math.random() * this.state.imgUrls.length);
    let nextSecondImg = Math.floor(Math.random() * this.state.imgUrls.length);
    while(nextSecondImg === nextFirstImg)
      nextSecondImg = Math.floor(Math.random() * this.state.imgUrls.length);

    this.setState({
      firstImg: nextFirstImg,
      secondImg: nextSecondImg,
    });
  }

  voteFirst = ()=> {
    console.log('CREATE VOTE for '+this.state.imgUrls[this.state.firstImg]);
    this.pickNextImgs();
  }

  voteSecond = ()=> {
    console.log('CREATE VOTE for '+this.state.imgUrls[this.state.secondImg]);
    this.pickNextImgs();
  }

  componentDidMount(){
    console.log('Vote mount');
  }

  componentWillUnmount(){
    console.log('Vote unmount');
  }

  render(){
    return (
      <div className='Vote Page'>
        <div className='img-box'>
          <div className='vote-img' style={{
            backgroundImage: `url(${this.state.imgUrls[this.state.firstImg]})`
          }} onClick={this.voteFirst}/>
          <div className='vote-img' style={{
            backgroundImage: `url(${this.state.imgUrls[this.state.secondImg]})`
          }} onClick={this.voteSecond}/>
        </div>
      </div>
    );
  }
};

export default Vote;

```




## integrate create meme to server ...

here we will discuss the fetch call to create a meme, read memes




## install express, get started

`$ npm i -S express`

`$ mkdir server`

`$ touch server/index.js`


## server side routing


<sub>./server/index.js</sub>
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use( express.static('build') );
app.use( express.json() );


// connect to db


app.post('/meme', (req, res)=> {
  // save to db
  res.status(500).send('no db connection yet');
});

app.get('/memes', (req, res)=>{
  res.json([]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```


### set up CRA proxying

[set up CRA proxying](https://www.google.com/search?q=create+react+app+from+a+server)

let's follow the instructions from react on setting up a proxy so we can run both server and front end on the same domain (and not need CORS)


<sub>./package.json</sub>
```js
  //...
  "proxy": "http://localhost:4000",
  //...
```

now when we run the dev server (front end... using `npm start`) the requests for the server will be proxied to our server

we will still have to open another terminal to run the server from using

`$ node ./server/index.js`



### POST /meme

#### model design for Meme

(googling about sequelize)


### install postgres

#### googling for mac, ubuntu & windows installation guide + user + password + db





## creating a database in postgres, connecting from node

[here are digital ocean instructions for ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)


I'm sure mac and windows have similarly demonstrably deterministic instructions for organizing our work.



### sequelize

it is considered passe to write SQL by hand in the majority of routine REST API endpoints.

here we will use sequelize, a nodeJS module ORM with support for all popular variants of SQL, to connect to our database and make our lives easy querying and writing data.



`$ npm i -S sequelize pg pg-hstore`


[sequelize has fantastic docs with many examples](http://docs.sequelizejs.com/manual/getting-started), and is definitely worth working through.



### connecting to the database

<sub>./server/index.js</sub>
```js

const ORM = require('sequelize');

const connection = new ORM('postgres://memewars:guest@localhost:5432/memewars');

```


here, I tend to name the module exports in a way which makes sense of the vairous objects, as opposed to the given naming in the docs (which is a bit ambiguous)


when we move to production, we will have to override this value with the one provided by heroku.



### making our first database requests

in order to check the connection, we will make a trivial call to the database

```js
connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

```

we should see a success message

usually, if this fails, we need to set our username and password correctly, or fix a configuration in the database itself (granting privileges on database ... to ...)


### data modeling

now that we have established a connection to the database, it is time to create tables

of course, we should discuss our data requirements, making sure that our product is future friendly


here, we will need models for

 - user
 - meme
 - vote


[defining models is well documented](http://docs.sequelizejs.com/manual/models-definition.html), and will require learning a bit about the datatypes we have available on the SQL level


here, let's review a model for User, which we will use as a basis for building our other models

```js
  const User = connection.define('user', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: ORM.TEXT,
      allowNull: false,
      unique: true,
    },
  }, { freezeTableName: true });
```

### meme model

```js
  const Meme = connection.define('meme', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imgUrl: {
      type: ORM.TEXT,
      allowNull: false,
    },
    author: {
      type: ORM.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  }, { freezeTableName: true });

```


### vote model

```js
  const Vote = connection.define('vote', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    winner: {
      type: ORM.INTEGER,
      allowNull: false,
      references: {
        model: 'meme',
        key: 'id',
      },
    },
    loser: {
      type: ORM.INTEGER,
      allowNull: false,
      references: {
        model: 'meme',
        key: 'id',
      },
    },
    voter: {
      type: ORM.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  }, { freezeTableName: true });

```



## sequelize sync, aka creating tables


```js
app.get('/hydrate', (req, res)=> {
  // sync table

  User.sync({ force: true }).then(()=> res.json({ great: 'success' }));
});
```

now when we want to run this on all of our models, we need to do them in order, as each one referes to the previous

```js

app.get('/hydrate', (req, res)=> {
  User.sync({ force: true })
    .then(()=> Meme.sync({ force: true }))
    .then(()=> Vote.sync({ force: true }))
    .then(()=> res.json({ message: 'success creating User, Meme, Vote tables' }))
    .catch(err => res.status(500).json({ message: JSON.stringify(err) }));
});
```

### reading and writing data

now we're ready to write data and read it out!



```js

app.post('/user', (req, res)=> {
  User.create(req.body).then(u => {
    console.log(u);
    res.json({ message: 'create user' });
  });
});

app.get('/user/:id', (req, res)=> {
  User.findByPk(1*req.params.id).then(u => res.json(u));
});

```

similarly for the other two models

```js

app.post('/meme', (req, res)=> {
  Meme.create(req.body).then(u => {
    console.log(u);
    res.json({ message: 'create meme' });
  });
});

app.get('/meme/:id', (req, res)=> {
  Meme.findByPk(1*req.params.id).then(u => res.json(u));
});

```


```js

app.post('/vote', (req, res)=> {
  Vote.create(req.body).then(u => {
    console.log(u);
    res.json({ message: 'create vote' });
  });
});

app.get('/vote/:id', (req, res)=> {
  Vote.findByPk(1*req.params.id).then(u => res.json(u));
});

```


and now on the browser we can load [localhost:4000](http://localhost:4000)

and run from the console


```js
fetch('/user', {
  method: 'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify({ name: 'nik' })
  
}).then(response => response.text())
  .then(r => console.log(r))
```


or build the equivalent request in POSTMAN


now we can test [localhost:4000/user/1](http://localhost:4000/user/1)

[localhost:4000/meme/1](http://localhost:4000/meme/1)

[localhost:4000/vote/1](http://localhost:4000/vote/1)

to see our created user, meme and vote!





[for reference, here's the list of datatypes we have available](http://docs.sequelizejs.com/manual/data-types.html)










### sign up user integration

let's use our login page for now to act as a sign up

we'll return to this later when we build our session / identity management

for now, we're interested in sending the `username` and `password` to our `CREATE USER` route



<sub>./src/Login.js</sub>
```js
  login = ()=> {
    fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password,
      }),
    }).then(response => response.status < 300 ?
                        response.json() :
                        response.json().then(err => Promise.reject(err)))
      .then(jsonResponse => {
        console.log('response from create user', jsonResponse);
        this.setState({ toVote: true });
      })
      .catch(err => console.error('create user failed with', err));
  }
```

now we will want to know our user id in the front end in order to complete our meme upload (we need it for the `author` field


let's make sure the server responds with it


<sub>./server/api.js</sub>
```js
  app.post('/user', (req, res)=>{
    User.create(req.body)
        .then(response=> res.json({
           message: 'user created',
           userId: response.dataValues.id,
         }))
        .catch(err => {
          res.status(500).json({ message: JSON.stringify(err) })
        });
  });
```

and now we can store the `userId` in `localStorage` on response, so we can use it as a session variable around the application


<sub>./src/Login.js</sub>
```js
      .then(jsonResponse => {
        console.log('response from create user', jsonResponse);
        
        localStorage.userId = jsonResponse.userId;
        this.setState({ toVote: true });
      })
      .catch(err => console.error('create user failed with', err));
```




### create meme integration

here, we want to use the `localStorage.userId` we set in the Login success as the upload's `author` field


<sub>./src/Meme.js</sub>
```js
  upload = ()=>{
    fetch('/meme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imgUrl: this.state.imgUrl,
        author: 1*localStorage.userId,
      }),
    }).then(response=> response.status < 300 ?
                                         this.setState({ imgUrl: '' }) :
                                         console.error('upload failed')
    )
  }
```


remembering of course to cast it to `Number` before we send it!



### reading memes from the databas for voting

let's replace the default `imgUrls` in our voting page with memes we load from the database!


#### read all memes route

<sub>./server/api.js</sub>
```js
  app.get('/meme', (req, res)=>{
    Meme.findAll().then(memes => res.json(memes));
  });
```


#### front end integration


first, we can get rid of the existing array

<sub>./src/Vote.js</sub>
```js
  state = {
    imgUrls: [],

    firstImg: null,
    secondImg: null,
  }

```


careful! now our render function will fail, as we don't have any images to render


let's put in a condition for rendering images (that we have images to render)

```html
  render(){
    return (
      <div className='Vote Page'>
        <div className='img-box'>
          { this.state.imgUrls.length ? (
              <>
                <div className='vote-img' style={{
                  backgroundImage: `url(${this.state.imgUrls[this.state.firstImg]})`
                }} onClick={this.voteFirst}/>
                <div className='vote-img' style={{
                  backgroundImage: `url(${this.state.imgUrls[this.state.secondImg]})`
                }} onClick={this.voteSecond}/>
              </>
          ): null }
        </div>
      </div>
    );
  }
```


now we're ready to load the images


we can use the `componentDidMount(){ ... }` lifecycle function to load all memes when the page is selected

```js
  componentDidMount(){
    console.log('Vote mount');

    fetch('/meme', { headers: { 'Content-Type': 'application/json' }})
      .then(response => response.json())
      .then(memes => this.setState({ memes, firstImg: 0, secondImg: 1 }) );
  }
```

but now we need to rework the `state` a bit...

before, we were using just the `imgUrl`

however, now when we vote, we'll want to know the `id` of the meme, so we should switch over to using `this.state.memes`


```js
  state = {
    memes: [],

    firstImg: null,
    secondImg: null,
  }

  pickNextImgs = ()=> {
    const nextFirstImg = Math.floor(Math.random() * this.state.memes.length);
    let nextSecondImg = Math.floor(Math.random() * this.state.memes.length);
    while(nextSecondImg === nextFirstImg)
      nextSecondImg = Math.floor(Math.random() * this.state.memes.length);

    this.setState({
      firstImg: nextFirstImg,
      secondImg: nextSecondImg,
    });
  }

```

and in the render

```
  render(){
    return (
      <div className='Vote Page'>
        <div className='img-box'>
          { this.state.memes.length ? (
              <>
                <div className='vote-img' style={{
                  backgroundImage: `url(${this.state.memes[this.state.firstImg].imgUrl})`
                }} onClick={this.voteFirst}/>
                <div className='vote-img' style={{
                  backgroundImage: `url(${this.state.memes[this.state.secondImg].imgUrl})`
                }} onClick={this.voteSecond}/>
              </>
          ): null }
        </div>
      </div>
    );
  }
```

now we'll be ready to create votes through the API!



### voting

<sub>./src/Vote.js</sub>
```js
  vote = (winner, loser)=>
    fetch('/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        winner, loser, voter: 1*localStorage.userId,
      }),
    }).then(response=> response.status < 300 ?
                                         Promise.resolve() :
                                         Promise.reject())
      .then(()=> this.pickNextImgs())
      .catch(()=> console.log('voting failed') );

  
  voteFirst = ()=> this.vote(
    this.state.memes[this.state.firstImg].id,
    this.state.memes[this.state.secondImg].id,
  )

  voteSecond = ()=> this.vote(
    this.state.memes[this.state.secondImg].id,
    this.state.memes[this.state.firstImg].id,
  )
```





### read all votes

now that we have all these votes, let's make an easy way to read them all

(just like read all memes before)

<sub>./server/api.js</sub>
```js
  app.get('/vote', (req, res)=>{
    Vote.findAll().then(votes => res.json(votes));
  });
```





## deployment

here's the tasks we have left before we can deploy our application to the cloud:

 - generating some fake data to start the database with
 - Results page (best / worst) columns
 - splitting sign up and log in (with hashed database passwords)
   - authentication checks on (create meme, vote)


### generating fake data to start the database with

this is called "hydrating the database", which is why we named our route like that

so far we have

<sub>./server/index.js</sub>
```js

app.get('/hydrate', (req, res)=> {
  User.sync({ force: true })
    .then(()=> Meme.sync({ force: true }))
    .then(()=> Vote.sync({ force: true }))
    .then(()=> res.json({ message: 'success creating User, Meme, Vote tables' }))
    .catch(err => res.status(500).json({ message: JSON.stringify(err) }));
});
```

which drops our tables and remakes them when we make a GET request to /hydrate


now, where we have `()=> res.json(...)` in our final callback in our `.then` Promise chain, we have already finished making our tables - and so far all we're doing is responding to the request with a success message

let's use the opportunity now to put some records in to the newly created tables

first we'll make our function into a full bodied fat arrow

```js
app.get('/hydrate', (req, res)=> {
  User.sync({ force: true })
      .then(()=> Meme.sync({ force: true }))
      .then(()=> Vote.sync({ force: true }))
      .then(()=> {
        res.json({ message: 'success creating User, Meme, Vote tables' })
      })
      .catch(err => res.status(500).json({ message: JSON.stringify(err) }));
});
```

now we can [google](https://www.google.com/search?q=sequelize+bulkcreate) for a sequlize method to [insert bulk records to our db](http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-bulkCreate)


#### fake users


we'll need an array of Users to make:

```js
        const users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];
```

so now we can put them in the database with `bulkCreate`

```js
      .then(()=> {
        const users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];

        User.bulkCreate(users, { returning: true })
            .then(usersResponse => {
              console.log(usersResponse);
              res.json({ message: 'success creating User, Meme, Vote tables' })
            });
      })

```

we'll need the `id`s that are created on the `User`s to put onto the `Meme`s and `Vote`s

so let's take a look at the log output to userstand the format of sequelize's response

```js
[ { dataValues:
    { id: 1,
      name: 'nik',
      createdAt: 2019-07-05T11:46:53.104Z,
      updatedAt: 2019-07-05T11:46:53.104Z },
    ...
  },
  ...
]
```

so it looks like we have an array of responseObjects that we'll need to map out `dataValues` from

```js
      .then(()=> {
        const users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];

        User.bulkCreate(users, { returning: true })
            .then(usersResponse => {
              console.log(usersResponse.map(u=> u.dataValues) );
              res.json({ message: 'success creating User, Meme, Vote tables' })
            });
      })

```

great! now we have our JSON copies of the `User`s with the `id`s that we need

let's return them from our Promise so we can chain our next function

```js
      .then(()=> {
        const users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];

        User.bulkCreate(users, { returning: true })
            .then(usersResponse => usersResponse.map(u=> u.dataValues) )
            .then((createdUsers => {
              res.json({ message: 'success creating User, Meme, Vote tables' })
            });
      })
```

even better, if we return the Promise from `User.bulkCreate` then we can chain onto that Promise with no nesting

```js

app.get('/hydrate', (req, res)=> {\
  const users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];
  
  User.sync({ force: true })
      .then(()=> Meme.sync({ force: true }))
      .then(()=> Vote.sync({ force: true }))
      .then(()=>
        User.bulkCreate(users, { returning: true })
            .then(usersResponse => usersResponse.map(u=> u.dataValues) )
        
      ).then((createdUsers => {
        res.json({ message: 'success creating User, Meme, Vote tables' })
        
      }).catch(err => res.status(500).json({ message: JSON.stringify(err) }));
});

```


I've also moved the `const users` declaration for convenience


#### fake memes

now that we have `id`s to put as `author` on our `Meme`s, we can generate `Meme`s in our hydrate


```js
      .then((createdUsers => {
        const memes = memeUrls.map((imgUrl, i) => ({
          imgUrl, author: createdUsers[i % createdUsers.length].id,
        }) );
        
        res.json({ message: 'success creating User, Meme, Vote tables' })
        
      })
```


and now we can `bulkCreate` those


```js
        Meme.bulkCreate(memes, { returning: true })
            .then(memesResponse => memesResponse.map(m => m.dataValues) )
```

we'll want to keep the chain going, so let's return the Promise and chain on the next one


```js
      ).then((createdUsers => {
        const memes = memeUrls.map((imgUrl, i) => ({
          imgUrl, author: createdUsers[i % createdUsers.length].id,
        }) );

        return Meme.bulkCreate(memes, { returning: true })
                   .then(memesResponse => memesResponse.map(m => m.dataValues) )
        
      }).then(createdMemes => {
        res.json({ message: 'success creating User, Meme, Vote tables' })
        
      }).catch(err => res.status(500).json({ message: JSON.stringify(err) }));

```


#### fake votes

in our last callback, we get out the `createdMemes`... however, in order to make fake votes we'll need `User` `id`s AND `Meme` `id`s

so, we'll have to keep track of the created `User`s from a higher lexical scope (the routehandler)

first, let's change our `users` array to `let` so we can override it with database `User`s

```js
  let users = [{ name: 'nik' }, { name: 'dan' }, { name: 'raphael' }];
```

so now when we create the `User`s we can override it

```js
      ).then(createdUsers => {
        users = createdUsers;
        
        const memes = memeUrls.map((imgUrl, i) => ({
          imgUrl, author: createdUsers[i % createdUsers.length].id,
        }) );

        return Meme.bulkCreate(memes, { returning: true })
                   .then(memesResponse => memesResponse.map(m => m.dataValues) )

```

now once we get to creating votes, we'll have `createdMemes` and `users` to draw `id` values from

for votes, we'll want to generate a lot (100) votes

whereas we could just type them all out, it'll be easier to use a generator function.

let's see what that looks like

```js

        const votes = [...Array(100)].map(()=> {
          return { /* vote object literal */ };
        });
```

now we can fill in the `vote` with randomly selected memes and users

```js
      .then(createdMemes => {
        const votes = [...Array(100)].map(()=> {
          const winner = createdMemes[ Math.floor(Math.random()*createdMemes.length) ].id;
          let loser = winner;
          while( loser === winner )
            loser = createdMemes[ Math.floor(Math.random()*createdMemes.length) ].id;

          const voter = users[ Math.floor(Math.random()*users.length) ].id;
          
          return { winner, loser, voter };
        });
```

and bulk create the votes

```js
        return Vote.bulkCreate(votes);
        
      }).then(()=> {
        res.json({ message: 'success creating User, Meme, Vote tables' })
        
      })
```


### results page

the users are going to want to see what the most popular memes are

let's read out the votes in our `Results` view and sort by winning percentage

we'll want to load the data when the page is selected, so let's use the `componentDidMount` lifecycle again


```js
  componentDidMount(){
    fetch('...')
  }
```

we made a GET /vote which responds with all the votes, so let's use that

```js
state = { votes: [] }
  
  componentDidMount(){
    fetch('/vote')
      .then(response=> response.json())
      .then(votes => this.setState({ votes }) )
  }
```

but what are we going to render?

we want the top winners and losers based on all votes

so maybe we ought to calculate the win % for each meme when we get them (or else we'll have to do that calculation on every render... EXPENSIVE)


```js
      .then(votes => this.setState({
        votes,
        winByMeme: votes.reduce((totals, vote)=> ({
          ...totals,
          [vote.winner]: ({
            wins: (totals[vote.winner] || { wins: 0 }).wins + 1,
            losses: (totals[vote.winner] || { losses: 0 }).losses,
            total: (totals[vote.winner] || { total: 0 }).total + 1,
          }),
          [vote.loser]: ({
            wins: (totals[vote.loser] || { wins: 0 }).wins,
            losses: (totals[vote.loser] || { losses: 0 }).losses + 1,
            total: (totals[vote.loser] || { total: 0 }).total + 1,
          }),
        }), {}),
      }) )

```

now we'll be able to calculate the win % easily and sort in the render


let's also grab all the memes on `componentDidMount` so we'll be able to render them

(you may be thinking these "get all" requests are slow and clunky. you are right - we should really replace them with one "get best/worst" API call....)


```js
      .then(()=> fetch('/meme').then(response=> response.json()))
      .then(memes => this.setState({
        memes,
        bestMemes: memes.sort(),
        worstMemes: memes.sort(),
      }) )
```

and for good measure, we'll need to use the `state.winByMeme` we made in the last callback to sort the memes

```js
      .then(memes => this.setState({
        memes,
        bestMemes: memes.sort((a, b)=> (
          (this.state.winByMeme[a.id].wins / this.state.winByMeme[a.id].total ) >
          (this.state.winByMeme[b.id].wins / this.state.winByMeme[b.id].total ) ? 1 : -1
        )).slice(0, 5),
        worstMemes: memes.sort((a, b)=> (
          (this.state.winByMeme[a.id].wins / this.state.winByMeme[a.id].total ) <
          (this.state.winByMeme[b.id].wins / this.state.winByMeme[b.id].total ) ? 1 : -1
        )).slice(0, 5),
      }) )
```


#### rendering the best / worst

first we'll add empty arrays to our initial state to avoid first time render crash

```js
  state = {
    votes: [],
    bestMemes: [],
    worstMemes: [],
  }
```

now we can render lists

```html

      <div className='Results Page'>
        Best
        <ul className='best-memes'>
          {this.state.bestMemes.map((meme)=>(
             <img style={{ height: 100, width: 'auto' }} src={meme.imgUrl}
                  key={meme.imgUrl}/>
           ))}
        </ul>

        Worst
        <ul className='worst-memes'>
          {this.state.worstMemes.map((meme)=>(
             <img style={{ height: 100, width: 'auto' }} src={meme.imgUrl}
                  key={meme.imgUrl}/>
           ))}
        </ul>
      </div>
```



### user passwords

the last feature we need before going to production is actual user sign in and security

we will build this in four steps

1. adding "passwordHash" to the database, and calculating it when creating users
2. POST /login, which will check the passwordHash and issue a session token or 401
3. replacing our `localStorage.userId` with the new jwt token, send it with requests
4. auth middleware, which will check the session token and allow / 401/3 each request



### adding "passwordHash" to the database, and calculating it when creating users

let's add a field to our User model to save the hashed password into

<sub>./server/models.js</sub>
```js
    passwordHash: {
      type: ORM.TEXT,
      allowNull: false,
    },
```

now when the front end requests to create a user, we'll calculate a hash from the password to save

<sub>./server/api.js</sub>
```js
const crypto = require('crypto');

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

```

one last thing: we need to update our fake data to have passwords:

<sub>./src/index.js</sub>
```js
const crypto = require('crypto');

//...

  let guestPassword = crypto.pbkdf2Sync('guest', 'salt', 100, 64, 'sha512')
                        .toString('hex');
  
  let users = [{
    name: 'nik',
    passwordHash: guestPassword,
  }, {
    name: 'dan',
    passwordHash: guestPassword,
  }, {
    name: 'raphael',
    passwordHash: guestPassword,
  }];

  //...
```

now we can build login (and test it by trying 'guest' as everyone's password)



### POST /login, which will check the passwordHash and issue a session token or 401

now we can add another API route to login

we need to check that the passwordHash matches

<sub>./server/api.js</sub>
```js
  app.post('/login', (req, res)=> {
    const passwordAttemptHash = crypto
      .pbkdf2Sync(req.body.password, 'salt', 100, 64, 'sha512')
      .toString('hex');

      //...
```

first we calculcate the hash from the password attempted

next we'll load the user by name from the db and check for equality


```js
    User.findOne({ where: { name: req.body.name }})
        .then(userResponse => {
          const user = userResponse.dataValues;
          if( user.passwordHash !== passwordAttemptHash )
            return Promise.reject(401);
          else
            res.json({}); // here we want to make a token!
        })
        .catch(code => res.status(code).end())
  });

```

last thing to do is create a jwt and send it back with the successful response


`$ npm i -S jsonwebtoken`


```js
const jwt = require('jsonwebtoken');

//...

          else
            jwt.sign({
              userId: user.id,
              username: user.name,
              exp: Date.now() + 86400000,
              
            }, 'secret code', (err, token)=>{
              res.json({ token });
            });

```

now our API will respond with the jwt which will identify the user cryptographically.

we will have to replace all userId usage on the front end with a session variable in an express middleware... more on that in a bit.


#### calling the login route

we can call the login and sign up the same way

<sub>./src/Login.js</sub>
```js
  login = (url)=> {
    fetch('/'+url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.username,
                             password: this.state.password }),
    }).then(response => response.status < 300 ?
                                          response.json() :
                                          response.json()
                                                  .then(err => Promise.reject(err)))

```

but now we should save the token, not the userId

```js
      .then(jsonResponse => {
        console.log('response from create user', jsonResponse);
        
        localStorage.token = jsonResponse.token;
        this.setState({ toVote: true });
      })
      .catch(err => console.error('create user failed with', err));
  }
```

```html

          <button onClick={()=> this.login('login')}>Login</button>
          <button onClick={()=> this.login('user')}>Signup</button>

```


### replacing our `localStorage.userId` with the new jwt token, send it with requests


### auth middleware, which will check the session token and allow / 401/3 each request
#### replacing `author` and `voter` with the session userId from decrypted token





### heroku assets

we will need to configure a postgres database in heroku, and find out whence to read the connection string




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

