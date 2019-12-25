import React from 'react';
import './App.css';

class TodoListTitel extends React.Component {
    deleteTodolist=()=>{
        this.props.delTodo(this.props.idTodo)
    }

    render = () => {
        return (
            <div>
                <h3 className="todoList-header__title">{this.props.title}<button onClick={this.deleteTodolist}>X</button></h3>

            </div>
        );
    }
}

export default TodoListTitel;

