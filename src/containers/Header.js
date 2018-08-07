import React, {Component} from 'react';
import Dropdown from './Dropdown';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: this.props.dataLoaded,
      contacts: this.props.contacts
    }
  }
  static getDerivedStateFromProps(props, state) {
    if(props.dataLoaded !== state.loaded) {
      return {
        loaded: props.dataLoaded,
        contacts: props.contacts
      }
    }
    return null;
  }

  render() {
    return(
        <header className="App-header">
          <Dropdown {...this.state} />
        </header>
        );
    }
}


export default Header;