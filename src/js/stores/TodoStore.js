import { EventEmitter } from "events";

// storesのデータに変更があった場合は、すぐにViewに送信する
// eventEmitterを使って上記機能を実現する（多分websocketみたいなもの）

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
        text: "Pay Bills",
        complete: false
      }
    ]
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
export default todoStore;