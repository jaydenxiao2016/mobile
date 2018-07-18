import React, { Component } from "react";
import { List, InputItem } from "antd-mobile";

const Item = List.Item;

let todoKeySuffix = 2,
  completeKeySuffix = 0;

class CustomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          text: "静坐常思己过",
          key: "todo_0"
        },
        {
          text: "闲谈莫论人非",
          key: "todo_1"
        }
      ],
      completedList: [],
      addText: ""
    };
  }

  addTodo = () => {
    const { addText } = this.state;
    if (!addText) return null;
    const key = "todo_" + todoKeySuffix++;
    this.setState(prevStatus => {
      return {
        todoList: prevStatus.todoList.concat({ text: addText, key }),
        addText: ""
      };
    });
  };

  switchStatus = (index, type) => {
    const { todoList, completedList } = this.state;
    if (type === "todo") {
      let item = completedList.splice(index, 1)[0];
      item.key = "todo_" + todoKeySuffix++;
      this.setState(prevStatus => {
        return {
          todoList: prevStatus.todoList.concat(item),
          completedList
        };
      });
    } else {
      let item = todoList.splice(index, 1)[0];
      item.key = "complete_" + completeKeySuffix++;
      this.setState(prevStatus => {
        return {
          completedList: prevStatus.completedList.concat(item),
          todoList
        };
      });
    }
  };

  render() {
    const { todoList, completedList, addText } = this.state;
    const todoEle = todoList.map((item, index) => {
      return (
        <Item
          arrow="horizontal"
          key={item.key}
          onClick={() => this.switchStatus(index, "complete")}
        >
          {item.text}
        </Item>
      );
    });
    const completedEle = completedList.map((item, index) => {
      return (
        <Item
          arrow="horizontal"
          key={item.key}
          onClick={() => this.switchStatus(index, "todo")}
        >
          {item.text}
        </Item>
      );
    });
    return (
      <div className="todo">
        <div className="operate">
          <InputItem
            className="input"
            placeholder="click here"
            value={addText}
            onChange={val => this.setState({ addText: val })}
            ref={el => (this.inputItem = el)}
            extra="添加"
            onExtraClick={this.addTodo}
          >
            输入待办事项
          </InputItem>
        </div>

        <List renderHeader={() => "待办事项"}>{todoEle}</List>
        <List renderHeader={() => "已完成"}>{completedEle}</List>
      </div>
    );
  }
}

export default CustomView;
