import React,{ Component } from 'react';
import './TodoInput.css';

class TodoInput extends Component{
  render(){
    return (
      <input className="TodoInput" type="text" value={this.props.content} 
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)} />
    )
  }
  submit(event){
    if(event.key === 'Enter'){
      this.props.onSubmit(event)
    }
  }
  changeTitle(event){
    this.props.onChange(event)
  }
}

export default TodoInput;