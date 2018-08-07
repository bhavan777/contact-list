import React, {Component} from 'react';
import Dropdown from './Dropdown';
import '../styles/header.css';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: this.props.dataLoaded,
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
          <Dropdown {...this.state} showResult={this.props.showResult} />
        </header>
        );
    }
}


export default Header;