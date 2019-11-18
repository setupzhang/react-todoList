import React, { Component } from 'react'
import "normalize.css"
import './App.css'
import TodoInput from './component/TodoInput'
import TodoItem from './component/TodoItem'
import UserDialog from './component/UserDialog'
import { getCurrentUser } from './leanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete(event, todo) {
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
  onSignUp(user) {
    this.setState({ user: user })
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
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
        <h1>{this.state.user.username || '我'}的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp.bind(this)} />}
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
