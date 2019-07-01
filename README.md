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

### one input (create meme)

### two images (voting page)




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
