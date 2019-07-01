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

```js

const ORM = require('sequelize');

const connection = new ORM('postgres://meme-wars:guest@localhost:5432/meme-wars');

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
const User = sequelize.define('user', {
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
```

### meme model

...


### vote model

...



## sequelize sync, aka creating tables


```js
app.get('/hydrate', (req, res)=> {
  // sync table

  User.sync({ force: true }).then(()=> res.json({ great: 'success' }));
});
```

### reading and writing data

now we're ready to write data and read it out!



```js

app.post('/user', (req, res)=> {
  User.create({ name: 'nik' }).then(u => {
    console.log(u);
    res.json([u]);
  });
});

app.get('/user/:id', (req, res)=> {
  User.findByPk(1*req.params.id).then(u => res.json([u]));
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

to see our created user!







[for reference, here's the list of datatypes we have available](http://docs.sequelizejs.com/manual/data-types.html)













This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
