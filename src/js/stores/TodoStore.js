import { EventEmitter } from "events";

// storesのデータに変更があった場合は、すぐにViewに送信する
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

  getAll() {
    return this.todos;
  }
}

// Storeは一つのアプリに一つのインスタンスのみを使用する
// 上記を実現するためにシングルトンパターンを採用する
// で、その為にはほかのコンポーネントでnewできないようにする必要がある
// ということで、exportする前に先にnewしてしまう
const todoStore = new TodoStore;
window.todoStore = todoStore;
export default todoStore;