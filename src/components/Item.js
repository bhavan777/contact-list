import React, {Component} from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove =this.onMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.handleClick) {
      this.props.handleClick(this.props.contact.id);
    }
  }

  onMouseMove() {
    if(this.props.mouseMove) {
      this.props.mouseMove(this.props.contact.id)
    }
  }

  render() {
    let searchTerm = this.props.searchTerm;
    let {name, address, items, pincode} = this.props.contact;
    let highlight = (str) => {
      var reg = new RegExp(searchTerm, 'gi');
      return str.replace(reg, function(str) {return '<b>'+str+'</b>'})
    }
    { 
      return (
      <li className={`dropdown-list-item ${this.props.isActive ? 'active ': ''}`} onMouseMove={this.onMouseMove} onClick={this.handleClick}>
        <h5 dangerouslySetInnerHTML = {{__html: highlight(name)}}></h5>
        <p className='small' dangerouslySetInnerHTML = {{__html: highlight(address+', '+ pincode)}}></p>
        <p className='smaller' dangerouslySetInnerHTML = {{__html: highlight(items.join(', '))}}></p>
      </li>
      )
    }
  }
}

export default Item;