import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../containers/Header';
import ResultCard from '../components/ResultCard';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      searchTerm: '',
      activeItem: 0,
      dataLoaded: false,
      result: []
    }
    this.showResult = this.showResult.bind(this);
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5b68caaf3300008a3a32dd9c?mocky-delay=2000ms')
    .then(res => res.json())
    .then(data=>{
      let contacts = Array.from(data);
      this.setState({contacts: contacts, dataLoaded: true});
    });
  }

  showResult(id) {
    let res = this.state.contacts.filter(item => item.id === id);
    this.setState({result: res[0]});  
  }

  render() {
    return (
      <div className="App">
        <Header {...this.state} showResult={this.showResult}/>
        {(this.state.result.length !== 0) &&
        (
          <ResultCard {...this.state.result}/>
         )
        }
      </div>
    );
  }
}

export default App;
