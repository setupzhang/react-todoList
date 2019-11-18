import React, { Component } from 'react'
import "normalize.css"
import './App.css'
import TodoInput from './component/TodoInput'
import TodoItem from './component/TodoItem'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: []
    }
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state) 
  }
  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event) {
    this.setState({
      newTodo: '',
      todoList: [...this.state.todoList,
      {
        id: idMaker(),
        title: event.target.value,
        status: null,
        deleted: false
      }]
    })
  }
  render() {

    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item}
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;

let id = 0

function idMaker() {
  id += 1
  return id
}
