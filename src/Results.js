import React from 'react';
import './Results.css';

class Results extends React.Component {
  state = {
    votes: [],
    bestMemes: [],
    worstMemes: [],
  }
  
  componentDidMount(){
    fetch('/vote')
      .then(response=> response.json())
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
      .then(()=> fetch('/meme').then(response=> response.json()))
      .then(memes => this.setState({
        memes,
        bestMemes: memes.sort((a, b)=> (
          (this.state.winByMeme[a.id].wins / this.state.winByMeme[a.id].total ) >
          (this.state.winByMeme[b.id].wins / this.state.winByMeme[b.id].total ) ? 1 : -1
        )).slice(0, 3),
        worstMemes: memes.sort((a, b)=> (
          (this.state.winByMeme[a.id].wins / this.state.winByMeme[a.id].total ) <
          (this.state.winByMeme[b.id].wins / this.state.winByMeme[b.id].total ) ? 1 : -1
        )).slice(0, 3),
      }) )
  }

  componentWillUnmount(){
    console.log('Results unmount');
  }

  render(){
    return (
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
    );
  }
};

export default Results;
