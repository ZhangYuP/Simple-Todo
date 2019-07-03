import React,{ Component } from 'react';
import TodoInput from './TodoInput';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      newTodo: 'test',
      todoList: [
        {id: 1, title: '第一个待办'}
      ]
    }
  }
  render(){
    let todos = this.state.todoList.map((item,index)=>{
      return <p>{item.title}</p>
    })
    return (
      <div className="App">
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo} />
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
  }

export default App;
