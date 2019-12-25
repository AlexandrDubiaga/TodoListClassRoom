import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC,deleteTodo} from "./redux/appReducer";

class App extends React.Component {


    nextId = 3;
    addTodolist = (newText) => {
        let newTodoList = {
            id: this.nextId,
            title: newText,
            tasks:[]
        };
        this.nextId++;
        this.props.addTodolistAC(newTodoList)
    }
    delTodo = (val) => {
        let newTodolist = this.props.todolists.filter(t=>{
            return t.id!== val
        })
        this.props.deleteTodo(newTodolist)

    }

    render = () => {

        const todolists = this.props.todolists.map(t => <TodoList delTodo={this.delTodo} id={t.id} title={t.title} tasks={t.tasks}/>)
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

const mapStateToProps = (state) => {
    return {
        todolists: state.app.todolists
    }
}
const ConnectedApp = connect(mapStateToProps, {addTodolistAC,deleteTodo})(App);
export default ConnectedApp;

