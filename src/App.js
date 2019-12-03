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
        tasks: [
            {id:0,title: "JS", isDone: true, priority: "medium"},
            {id:1,title: "HTML", isDone: true, priority: "low"},
            {id:2,title: "CSS", isDone: true, priority: "low"},
            {id:3,title: "ReactJS", isDone: false, priority: "high"}
        ],
        filterValue: "All"
    };
    nextId=4;

    addTask = (newText) => {
        let newTask = {
            title: this.nextId,
            isDone: false,
            priority: "low"
        };
        this.nextId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        });
    }
    changeTitle=(taskId,title)=>{
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t; //возвращаем таску без изменения, если это не та таска, которую нужно поменять
            }
            else {
                // делаем копию таски и сразу перезатираем в ней сво-во isDone новым значением
                return {...t, title: title};
            }
        });
        // а уже получив новый массив, изменяем этот массив в state с помощью setState
        this.setState({
            tasks: newTasks
        })
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        });
    }

    changeStatus = (taskId, isDone) => {
        // создадим с помощью map новый массив, в котором все остальные таски будут сидеть такие же,
        // а вот та, которую нужно изменить, будет другой: вернём копию таски с изменённым сво-вом
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t; //возвращаем таску без изменения, если это не та таска, которую нужно поменять
            }
            else {
                // делаем копию таски и сразу перезатираем в ней сво-во isDone новым значением
                return {...t, isDone: isDone};
            }
        });
        // а уже получив новый массив, изменяем этот массив в state с помощью setState
        this.setState({
            tasks: newTasks
        })

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

