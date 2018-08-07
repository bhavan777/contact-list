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
    let highlight = (str) => {
      var reg = new RegExp(searchTerm, 'gi');
      return str.replace(reg, function(str) {return '<b>'+str+'</b>'})
    }
    let name = highlight(this.props.contact.name);
    let address = highlight(this.props.contact.address);
    let pincode = highlight(this.props.contact.pincode);
    let items = highlight(this.props.contact.items.join(', '));
    let className = this.props.isActive ? 'active': '';
    let elemtype = this.props.type && this.props.type === 'div' ? 'div' : '';
    { 
      if (elemtype === 'div'){
      return (
        <div className='card'>
          <div className='header'>
            <h3 dangerouslySetInnerHTML = {{__html: name}}></h3>
          </div>
          <div className='body'>
            <p><span className='title'>Address:</span> <span className='small' dangerouslySetInnerHTML = {{__html: address+', '+pincode}}></span></p>
            <p>
            <span className='title'>Orders:</span>
            <span className='smaller' dangerouslySetInnerHTML = {{__html: items}}></span>
            </p>
          </div>  
        </div>  
        )
      } else {
        return (
        <li className={className} onMouseMove={this.onMouseMove} onClick={this.handleClick}>
          <h5 dangerouslySetInnerHTML = {{__html: name}}></h5>
          <p className='small' dangerouslySetInnerHTML = {{__html: address+', '+ pincode}}></p>
          <p className='smaller' dangerouslySetInnerHTML = {{__html: items}}></p>
        </li>
        )
      }  
    }
  }
}

export default Item;