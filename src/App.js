import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
    state = ({
        todolist: [{id: 1, title: 'First'}, {id: 2, title: 'Second'}]
    })

    componentDidMount() {
        let todo =   JSON.parse(localStorage.getItem('todoList'));
        if (localStorage.getItem('todoList')) {
            todo.todolist.map(t=>{
                if(t.id>=this.nextId){
                    this.nextId=t.id+1
                }
            })
            this.setState({
                todolist: JSON.parse(localStorage.getItem('todoList')).todolist
            })
        } else {
            this.setState({
                todolist: [{id: 1, title: 'First'}, {id: 2, title: 'Second'}]
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todoList', JSON.stringify(nextState));
    }

    nextId = 3;
    addTodolist = (newText) => {
        let newTodoList = {
            id: this.nextId,
            title: newText
        };
        this.nextId++;
        let newTodolist = [...this.state.todolist, newTodoList];
        this.setState({
            todolist: newTodolist
        });
    }
    render = () => {
        const todolists = this.state.todolist.map(t => <TodoList id={t.id} title={t.title}/>)
        return (
            <>
            <div>
                <AddNewItemForm addItem={this.addTodolist}/>
            </div>

            <div className="App">
                {todolists}
            </div>
            </>

        );
    }
}

export default App;

