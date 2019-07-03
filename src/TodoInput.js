import React,{ Component } from 'react';

class TodoInput extends Component{
  render(){
    return (
      <input type="text" defaultValue={this.props.content} onKeyPress={this.submit.bind(this)} />
    )
  }
  submit(event){
    if(event.key === 'Enter'){
      this.props.onSubmit.call()
    }
  }
}

export default TodoInput;