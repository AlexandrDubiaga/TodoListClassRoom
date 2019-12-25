import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitel from "./TodoListTitel";
import {connect} from "react-redux";
import {addTaskAC, addTodolistAC, changeFilterValueAC, changeTaskAC,deleteTask} from "./redux/appReducer";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }




    nextId = 1
    addItem = (newText) => {
        let newTask = {
            id: this.nextId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextId++;
        this.props.addTaskAC(this.props.id, newTask)
    }
    changeTask = (taskId, obj) => {
        this.props.changeTaskAC(this.props.id, taskId, obj)
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeFilter = (newFilterValue) => {
        this.props.changeFilterValueAC(newFilterValue)
    }

    deleteTask=(taskId)=>{
        this.props.deleteTask(this.props.id,taskId)
    }



    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitel delTodo={this.props.delTodo} idTodo={this.props.id} title={this.props.title}/>
                    </div>
                    <AddNewItemForm addItem={this.addItem}/>
                    <TodoListTasks deleteTask={this.deleteTask} changeTitle={this.changeTitle}
                                   changeStatus={this.changeStatus}
                                   tasks={this.props.tasks.filter(t => {
                                       if (this.props.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.props.filterValue === "Active") {
                                           return t.isDone === false;
                                       }
                                       if (this.props.filterValue === "Completed") {
                                           return t.isDone === true;
                                       }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.props.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterValue: state.app.filterValue,
    }
}


export default connect(mapStateToProps, {addTaskAC, changeFilterValueAC,addTodolistAC, changeTaskAC,deleteTask})(TodoList);

