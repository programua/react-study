import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

// What is Stores?
// StoresはViewがレンダリングするのに必要なデータを保持する。
// 今回であれば、todosの配列。
// View（Todo,js）はこのTodoStore.jsからデータを取得し、レンダリングに使用する。


// storesのデータに変更があった場合は、すぐにViewに送信する
// （今回の場合は、createTodoメソッドが呼ばれた時））
// eventEmitterを使って上記機能を実現する（多分websocketみたいなもの）
// 継承しているのがReact.ComponentではなくEventEmitterであることに注意

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bills",
        complete: false
      }
    ]
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false
    });

    // チェンジイベントを送信する 
    this.emit("change");
  }

  receiveTodos(todos) {
    this.todos = todos;
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  // Dispatcherは下記メソッドを呼び出し、createTodoメソッドを用いでイベントを送信している
  // EventEmitterはイベントを受信する（Todo.jsの方）
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text)
      }
      case "RECEIVE_TODOS": {
        this.receiveTodos(action.todos);
      }
    }
  }
}

// Storeは一つのアプリに一つのインスタンスのみを使用する
// 上記を実現するためにシングルトンパターンを採用する
// で、その為にはほかのコンポーネントでnewできないようにする必要がある
// ということで、exportする前に先にnewしてしまう
const todoStore = new TodoStore;

// dispatcher.registerでリスナーを追加している
// どっかでdispatcherがdispatchすると、ここのregisterがリッスンする
// で、todoStore.handleActionsが呼び出される
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;