import React,{ Component } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import { getCurrentUser, signOut, TodoModel } from './leanCloud';
import 'normalize.css';
import './reset.css';
import './App.css';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser(),
      newTodo: '',
      todoList: [],
      chooseTab: 1,
      filterFn: (item)=> !item.deleted
    }
  }

  render(){
    let todos = this.state.todoList
      .filter(this.state.filterFn)
      .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
            onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    console.log(todos)
    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办
          {this.state.user.id ? <span className="iconfont icon-logout" title="登出" onClick={this.signOut.bind(this)}></span> : null}
        </h1>
        <nav>
          <div className={this.state.chooseTab === 1 ? 'active' : ''} onClick={this.showAllTodos.bind(this)}>全部</div>
          <div className={this.state.chooseTab === 2 ? 'active' : ''} onClick={this.showUncompletedTodos.bind(this)}>未完成</div>
          <div className={this.state.chooseTab === 3 ? 'active' : ''} onClick={this.showCompletedTodos.bind(this)}>已完成</div>
          <div className={this.state.chooseTab === 4 ? 'active' : ''} onClick={this.showDeletedTodos.bind(this)}>回收站</div>
        </nav>
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)} />
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)} onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    );
  }
  showAllTodos(){
    let filterFn = (item)=> !item.deleted
    let stateCopy = copyState(this.state)
    stateCopy.filterFn = filterFn
    stateCopy.chooseTab = 1
    this.setState(stateCopy)
  }
  showUncompletedTodos(){
    let filterFn = (item)=> !item.deleted && !item.status
    let stateCopy = copyState(this.state)
    stateCopy.filterFn = filterFn
    stateCopy.chooseTab = 2
    this.setState(stateCopy)
  }
  showCompletedTodos(){
    let filterFn = (item)=> !item.deleted && item.status
    let stateCopy = copyState(this.state)
    stateCopy.filterFn = filterFn
    stateCopy.chooseTab = 3
    this.setState(stateCopy)
  }
  showDeletedTodos(){
    let filterFn = (item)=> item.deleted
    let stateCopy = copyState(this.state)
    stateCopy.filterFn = filterFn
    stateCopy.chooseTab = 4
    this.setState(stateCopy)
    console.log(stateCopy)
  }
  componentDidMount(){
    let user = getCurrentUser()
    TodoModel.getByUser(user, (todos)=>{
      let stateCopy = copyState(this.state)
      stateCopy.todoList = todos
      this.setState(stateCopy)
    })
  }
  signOut(){
    signOut()
    let stateCopy = copyState(this.state)
    stateCopy.user = {}
    stateCopy.todoList = []
    this.setState(stateCopy)
  }
  onSignUpOrSignIn(user){
    let stateCopy = copyState(this.state)
    stateCopy.user = user
    TodoModel.getByUser(user, (todos)=>{
      stateCopy.todoList = todos
      this.setState(stateCopy)
    })
  }
  toggle(event, todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, ()=>{
      this.setState(this.state)
    }, (error)=>{
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  delete(event, todo){
    let oldStatus = todo.status
    todo.deleted = !todo.deleted
    TodoModel.update(todo, ()=>{
      this.setState(this.state)
    }, (error)=>{
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error)=>{
      console.log(error)
    })
  }
}

export function copyState(obj){
  return JSON.parse(JSON.stringify(obj))
}

export default App;