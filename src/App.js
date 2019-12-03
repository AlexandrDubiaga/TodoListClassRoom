import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    state = {
        tasks: [],
        filterValue: "All",
        id:1
    };


    componentDidMount(){
        this.todo = JSON.parse(localStorage.getItem('todo'));
        if (localStorage.getItem('todo')) {
            this.setState({
                tasks: [...this.todo.tasks],
                filterValue: "All",
                id:this.todo.id
            })
        } else {
            this.setState({
                tasks: [],
                filterValue: "All",
                id:1
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todo', JSON.stringify(nextState));
    }



    addTask = (newText) => {
        let newTask = {
            id:this.state.id,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.state.id++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        });
    }
    changeTask=(taskId,obj)=>{
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
    changeTitle=(taskId,title)=>{
       this.changeTask(taskId,{title:title})
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId,{isDone:isDone})
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        });
    }



    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
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
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

