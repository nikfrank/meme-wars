import React from 'react';
import './Meme.css';

class Meme extends React.Component {
  state = {
    imgUrl: '',
  }

  setImgUrl = (event)=>
    this.setState({ imgUrl: event.target.value })

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
