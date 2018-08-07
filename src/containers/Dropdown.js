import React, {PureComponent} from 'react';
import Item from '../components/Item';
import '../styles/dropdown.css';
class Dropdown extends PureComponent {
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
    // this.mouseEnter = this.mouseEnter.bind(this);
    // this.mouseLeave = this.mouseLeave.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.loaded !== state.loaded) {
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
      this.props.showResult(id);
      this.hideDropdown();
    } else if(e.keyCode === 27) {
      this.hideDropdown();
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
    this.props.showResult(id);
  }
  hideDropdown(delay=0) {
    setTimeout(() => {
      this.setState({isDDVisible: false});      
    }, delay);
  }
  render() {
    return (
      <div className="dropdown" onBlur={this.hideDropdown.bind(this, 200)}>
      {this.state.loaded ? 
      (<input
      className={`dropdown-input ${this.state.isDDVisible ? 'open': ''}`}
      placeholder='type to search through contacts' 
      value={this.state.searchTerm}
      onKeyDown={this.handleKeyNavigation} 
      onChange={this.handleSearch} 
      />) : (<p className='loader'></p>)
      }
      {
        this.state.isDDVisible && (
        <ul className='dropdown-list' id='dropdown-list'>
          { this.state.visibleContacts.length >0 ?
            this.state.visibleContacts.map((contact)=> {
              return (
              <Item key={contact.id}
              isActive={this.state.activeItem === contact.id} 
              contact ={contact}
              searchTerm = {this.state.searchTerm} 
              mouseMove ={this.handleMove.bind(this, contact.id)}
              handleClick = {this.handleClick.bind(this,contact.id)}
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