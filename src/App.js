import React, { Component } from 'react';
import './App.css';
import Item from './Item.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      visibleContacts: [],
      ddVisible: false,
      searchTerm: '',
      activeItem: 0,
      dataLoaded: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleKeyNavigation = this.handleKeyNavigation.bind(this);
  }

  handleSearch(e){
    let visible = false;
    let val = e.target.value;
    var newcontacts = this.state.contacts;
    if(val !== '') {
      visible =true;
      newcontacts = this.state.contacts.filter(item => (item.name.toUpperCase().indexOf(val.toUpperCase()) > -1 || item.address.toUpperCase().indexOf(val.toUpperCase()) > -1 || item.pincode.toUpperCase().indexOf(val.toUpperCase())  > -1 || item.items.join(',').toUpperCase().indexOf(val.toUpperCase())  > -1 ));
    } else {
      visible =false;
    }
    this.setState({ddVisible: visible, searchTerm: val, visibleContacts: newcontacts, activeItem: newcontacts.length> 0 ?newcontacts[0].id: 0});
  }

  handleKeyNavigation (e){
    let id = this.state.activeItem;
    let newid = id;
    if(e.keyCode === 40 && this.state.ddVisible) {
      if(this.state.visibleContacts[this.state.visibleContacts.length -1 ].id === id) {
        newid = this.state.visibleContacts[0].id ;
      } else {
        for( let i =0; i < this.state.visibleContacts.length - 1 ;i++) {
          if(this.state.visibleContacts[i].id === id){
            newid = this.state.visibleContacts[i+1].id;
          }
        }
      }
    } else if(e.keyCode === 38) {
      if(this.state.visibleContacts[0].id === id) {
        newid = this.state.visibleContacts[this.state.visibleContacts.length - 1].id ;
      } else {
        for( let i = 1; i<this.state.visibleContacts.length ;i++) {
          if(this.state.visibleContacts[i].id === id){
            newid = this.state.visibleContacts[i-1].id;
          }
        }
      }
    }
    this.setState({activeItem:newid});
  }

  hideDropdown() {
    this.setState({ddVisible: false});
  }

  handleMouseEnter(id) {
    this.setState({activeItem: id});
  }

  componentDidUpdate() {
    let activeComp =  document.querySelectorAll('li.active')[0];
    if(activeComp) {
      activeComp.scrollIntoView({behavior: "instant", block: "nearest", inline: "nearest"});
    }
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5b68caaf3300008a3a32dd9c?mocky-delay=2000ms')
    .then(res => res.json())
    .then(data=>{
      let contacts = Array.from(data);
      this.setState({contacts: contacts, visibleContacts: this.contacts, dataLoaded: true});
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="dropdown">
          {this.state.dataLoaded ? 
          (<input 
          placeholder='type to search through contacts' 
          value={this.state.searchTerm} 
          onKeyDown={this.handleKeyNavigation} 
          onBlur={this.hideDropdown} 
          onChange={this.handleSearch} 
          />) : (<p className='loader'></p>)
          }
          {
            this.state.ddVisible && (
            <ul id='dropdown-list'>
              { this.state.visibleContacts.length >0 ?
                this.state.visibleContacts.map((contact)=> {
                  return (
                  <Item key={contact.id}
                  isActive={this.state.activeItem === contact.id} 
                  contact ={contact} searchTerm = {this.state.searchTerm} 
                  mouseEnter ={this.handleMouseEnter} 
                  />)
                })
                : (<li className='empty-list'><p>No User found</p></li>)
              }
            </ul>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
