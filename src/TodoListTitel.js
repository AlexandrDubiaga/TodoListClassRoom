import React from 'react';
import './App.css';

class TodoListTitel extends React.Component {

    render = () => {
        return (
            <h3 className="todoList-header__title">{this.props.title}</h3>
        );
    }
}

export default TodoListTitel;
