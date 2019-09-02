import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";

/**
 * flux思想に則ったつくりにするために下記を守ること
 * View：StoresとActionsとのみつながる
 * Actions：ViewとDispatcherとのみつながる
 * Dispatcher：ActionとStoresとのみつながる
 * Stores：DispatcherとViewとのみつながる
 */

export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll()
    };
  }

  componentDidMount() {
    // ↓ changeイベントを受信したら動く
    TodoStore.on("change", this.getTodos);
    console.log("count", TodoStore.listenerCount("change"));
  }

  // stateが使用していたメモリを解放
  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll()
    })
  }

  // dispatcherの呼び出し
  // createTodo() {
  //   TodoActions.createTodo("New Todo");
  // }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo)=>{
      return <Todo key={todo.id}{...todo} />
    })

    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    )
  }
}
