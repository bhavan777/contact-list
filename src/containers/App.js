import React, { Component } from 'react';
import '../App.css';
// import Item from './Item.js'
import Header from '../containers/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      searchTerm: '',
      activeItem: 0,
      dataLoaded: false
    }
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5b68caaf3300008a3a32dd9c?mocky-delay=2000ms')
    .then(res => res.json())
    .then(data=>{
      let contacts = Array.from(data);
      this.setState({contacts: contacts, dataLoaded: true});
    })
  }

  render() {
    return (
      <div className="App">
        <Header {...this.state}/>
        {this.state.selectedCard &&
        (<div className='result'>
          {/* <Item type='div' contact ={this.state.selectedCard}  /> */}
         </div>)
        }
      </div>
    );
  }
}

export default App;
