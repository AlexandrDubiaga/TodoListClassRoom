import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    }
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    onTitleChange = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    }

    render = () => {

        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={containerCssClass}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                {this.state.editMode ?
                    <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onTitleChange}
                           value={this.props.task.title}/> :
                    <span
                        onClick={this.activateEditMode}>{"id:" + this.props.task.id + " "}{this.props.task.title + " "}priority: {this.props.task.priority}</span>


                }

            </div>
        );
    }
}

export default TodoListTask;

