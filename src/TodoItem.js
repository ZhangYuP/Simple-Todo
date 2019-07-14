import React,{ Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component{
  render(){
    return (
      <div className="TodoItem">
        <input type="checkbox" checked={this.props.todo.status === 'completed'} 
          onChange={this.toggle.bind(this)} /> 
        <span className="title" data-status={this.props.todo.status}>{this.props.todo.title}</span>
        <span className="iconfont icon-delete" title="删除" onClick={this.delete.bind(this)}></span>
      </div>
    )
  }
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }
  delete(e){
    this.props.onDelete(e, this.props.todo)
  }
}

export default TodoItem;
