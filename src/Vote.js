import React from 'react';
import './Vote.css';

const offlineImgs = [
  'http://theawkwardyeti.com/wp-content/uploads/2015/01/0121_Heartwatchesthenews.png',
  'https://media.discordapp.net/attachments/576550326509764619/589870367968067584/Snapchat-1663181687.jpg?width=725&height=666',
  'https://cdn.discordapp.com/attachments/576550326509764619/588542078460362753/Snapchat-1743849407.jpg',
  'https://cdn.discordapp.com/attachments/576550326509764619/587878048087539713/image0.jpg',
  'https://cdn.discordapp.com/attachments/576550326509764619/593075547815280661/bobbhlkash631.png',
  'https://images-ext-2.discordapp.net/external/G_e-rxPLhczo-uGCM2W0O85uPyRaZ26AQyv6LCGBdCk/https/bit.ly/2Xd9RnB?width=589&height=619',
];

class Vote extends React.Component {
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
  
  componentDidMount(){
    console.log('Vote mount');

    fetch('/meme', { headers: { 'Content-Type': 'application/json' }})
      .then(response => response.json())
      .then(memes => this.setState({ memes, firstImg: 0, secondImg: 1 }) );
  }

  componentWillUnmount(){
    console.log('Vote unmount');
  }

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
};

export default Vote;
