import React, {Component} from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter =this.onMouseEnter.bind(this);
  }

  onMouseEnter() {
    this.props.mouseEnter(this.props.contact.id);
  }

  render() {
    let searchTerm = this.props.searchTerm;
    let highlight = (str) => {
      var reg = new RegExp(searchTerm, 'gi');
      return str.replace(reg, function(str) {return '<b>'+str+'</b>'})
    }
    let name = highlight(this.props.contact.name);
    let address = highlight(this.props.contact.address);
    let pincode = highlight(this.props.contact.pincode);
    let items = highlight(this.props.contact.items.join(','));
    let className = this.props.isActive ? 'active': '';
    return (
    <li className={className} onMouseMove={this.onMouseEnter}>
      <h5 dangerouslySetInnerHTML = {{__html: name}}></h5>
      <p className='small' dangerouslySetInnerHTML = {{__html: address+ pincode}}></p>
      <p className='smaller' dangerouslySetInnerHTML = {{__html: items}}></p>
    </li>
    )  
  }
}

export default Item;