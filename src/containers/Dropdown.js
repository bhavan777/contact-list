import React, {Component} from 'react';
import Item from '../components/Item';
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      visibleContacts: [],
      isDDVisible: false,
      searchTerm: '',
      activeItem: 0
    };
    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleKeyNavigation = this.handleKeyNavigation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.loaded != state.loaded) {
      return ({...props, visibleContacts: props.contacts});
    }
    return null;
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
    console.log(newcontacts);
    this.setState({isDDVisible: visible, searchTerm: val, visibleContacts: newcontacts, activeItem: newcontacts.length> 0 ?newcontacts[0].id: 0});
  }

  handleKeyNavigation (e){
    let id = this.state.activeItem;
    let newid = id;
    let val = e.target.value;
    if(e.keyCode === 40 && this.state.isDDVisible) {
      e.preventDefault();
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
      e.preventDefault();
      if(this.state.visibleContacts[0].id === id) {
        newid = this.state.visibleContacts[this.state.visibleContacts.length - 1].id ;
      } else {
        for( let i = 1; i<this.state.visibleContacts.length ;i++) {
          if(this.state.visibleContacts[i].id === id){
            newid = this.state.visibleContacts[i-1].id;
          }
        }
      }
    } else if( e.keyCode === 13) {
      let selectedCard = this.state.visibleContacts.filter(item => item.id === id);
      this.setState({selectedCard: selectedCard[0], isDDVisible:false});
    } else if(e.keyCode === 27) {
      this.setState({isDDVisible:false});
    }
    e.target.value = val;
    this.setState({activeItem:newid});
  }

  componentDidUpdate() {
    let activeComp =  document.querySelectorAll('li.active')[0];
    if(activeComp) {
      activeComp.scrollIntoView({behavior: "instant", block: "nearest", inline: "nearest"});
    }
  }

  handleMove(id) {
    this.setState({activeItem: id, isDDVisible: true});
  }

  handleClick(id) {
    let selectedCard = this.state.visibleContacts.filter(item => item.id === id);
    console.log(selectedCard);
    this.setState({selectedCard: selectedCard[0], isDDVisible:false});
  }


  hideDropdown() {
    setTimeout(() => {
      this.setState({isDDVisible: false});      
    }, 200);
  }





  render() {
    return (
      <div className="dropdown" onBlurCapture={this.hideDropdown}>
      {this.state.loaded ? 
      (<input 
      placeholder='type to search through contacts' 
      value={this.state.searchTerm}
      onKeyDown={this.handleKeyNavigation} 
      onChange={this.handleSearch} 
      />) : (<p className='loader'></p>)
      }
      {
        this.state.isDDVisible && (
        <ul id='dropdown-list'>
          { this.state.visibleContacts.length >0 ?
            this.state.visibleContacts.map((contact)=> {
              return (
              <Item key={contact.id}
              isActive={this.state.activeItem === contact.id} 
              contact ={contact}
              searchTerm = {this.state.searchTerm} 
              mouseMove ={this.handleMove.bind(this, contact.id)}
              // handleClick = {this.handleClick}
              />)
            })
            : (<li className='empty-list'><p>No User found</p></li>)
          }
        </ul>
        )
      }
    </div>

    )

  }
}

export default Dropdown;