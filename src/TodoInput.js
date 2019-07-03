import React,{ Component } from 'react';

class TodoInput extends Component{
  render(){
    return (
      <input type="text" defaultValue={this.props.content} onKeyPress={this.submit} />
    )
  }
  submit(event){
    if(event.key === 'Enter'){
      console.log('用户按回车了')
    }
  }
}

export default TodoInput;