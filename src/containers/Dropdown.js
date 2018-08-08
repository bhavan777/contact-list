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
    var newcontacts = Array.from(this.state.contacts);
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
    if((e.keyCode === 40 || e.keyCode === 38) && this.state.isDDVisible) {
      e.preventDefault(); // stop the up/down arrows to move in the input field to start/end of it's value.
      // check if the active item in the list is either first or last in cases of up arrow and down arrow respectively.
        //  incase of down arrow , the reset limit is the last item in the list or first in the list if up arrow
      let isDownArrow = e.keyCode === 40;
      let limit_idx = isDownArrow ? this.state.visibleContacts.length -1 : 0;
        // if limit elem raeched reset the value to first or last elem in list based on arrow direction
      let nextid_idx = isDownArrow ? 0 : this.state.visibleContacts.length -1;
        // if not at limit, where to start the loop from.
      let start_idx = isDownArrow ? 0 : 1;
        // if not at limit, where to run the loop till.
        let end_idx =  isDownArrow ? this.state.visibleContacts.length - 1 : this.state.visibleContacts.length;
        //  increment or decrement active id index in the visible list.
      let inc = isDownArrow ? 1 : -1;
      if(this.state.visibleContacts[limit_idx].id === id) {
        // resest the active to first or last element in the list based on arrow direction and if reached the limit element.
        newid = this.state.visibleContacts[nextid_idx].id;
      } else {
        // if not the limit elem, run through the rest of the list and +1 or -1 the index to use and get that new indexed item's id to be updated in the state.
        for( let i =start_idx; i < end_idx ;i++) {
          if(this.state.visibleContacts[i].id === id){
            newid = this.state.visibleContacts[i+inc].id;
          }
        }
      }
    }
    else if( e.keyCode === 13) {
      // key handle for ENTER/RETURN key press
      this.props.showResult(id);
      this.hideDropdown();
    } else if(e.keyCode === 27) {
      // key handle for enter ESC press
      this.hideDropdown();
    }
    this.setState({activeItem:newid});
  }
  componentDidUpdate() {
    let activeComp =  document.querySelectorAll('li.active')[0];
    if(activeComp) {
      activeComp.scrollIntoView({behavior: "instant", block: "nearest", inline: "nearest"});
    }
  }

  handleMove(id) {
    // update active item id only if its not the same id that is already in the state
    if(id !== this.state.activeItem) {
      this.setState({activeItem: id, isDDVisible: true});
    }
  }
  handleClick(id) {
    // pass the clicked item id to the parent's show result method to display the clicked card details
    this.props.showResult(id);
  }
  hideDropdown(delay=0) {
    // asyncly setting state with optional delay defaulted to 0, to serve the clicked id of the card to be present in the dom to triger the click event nad call clickhandler
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
              <Item
              key={contact.id}
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