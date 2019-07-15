import React,{ Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component{
  render(){
    return (
      <div className="TodoItem">
        <span className={'iconfont ' + (this.props.todo.status === 'completed' ? 'icon-checked' : 'icon-checkbox')} data-status={this.props.todo.status}
          onClick={this.toggle.bind(this)}></span>
        <span className={'title ' + this.props.todo.status}>
          {this.props.todo.title}
        </span>
        {this.props.todo.deleted ?
          <span className="iconfont icon-recover" title="恢复" 
            onClick={this.delete.bind(this)} /> :
          <span className="iconfont icon-delete" title="删除" 
            onClick={this.delete.bind(this)} />
        }        
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
