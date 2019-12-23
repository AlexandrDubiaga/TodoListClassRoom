import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitel from "./TodoListTitel";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    state = {
        tasks: [],
        filterValue: "All"
    };


    componentDidMount() {
        let tasks = JSON.parse(localStorage.getItem('todo'+ this.props.id));
        if (localStorage.getItem('todo' + this.props.id)) {
            tasks.tasks.map(t=>{
                if(t.id>=this.nextId){
                    this.nextId=t.id+1
                }
            })
            this.setState({
                tasks: JSON.parse(localStorage.getItem('todo' + this.props.id)).tasks
            })
        } else {
            this.setState({
                tasks: [],
                filterValue: "All"
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todo' + this.props.id, JSON.stringify(nextState));
    }

    nextId=1
    addItem = (newText) => {
        let newTask = {
            id: this.nextId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    }
    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            }
            else {
                return {...t, ...obj};
            }
        });
        this.setState({
            tasks: newTasks
        })
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }


    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitel title={this.props.title}/>
                    </div>
                    <AddNewItemForm addItem={this.addItem}/>
                    <TodoListTasks changeTitle={this.changeTitle} changeStatus={this.changeStatus }
                                   tasks={this.state.tasks.filter(t => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return t.isDone === false;
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return t.isDone === true;
                                       }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default TodoList;

