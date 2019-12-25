import React from 'react';

const ADD_TODOLIST = "ADD_TODOLIST";
const ADD_TASK = "ADD_TASK";
const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE";
const CHANGE_TASK = "CHANGE_TASK";
const DELL_TODOLIST = "DELL_TODOLIST";
const DELETE_TASK = "DELETE_TASK";





const initialState = {
    todolists: [{id: 0, title: "First", tasks: []}, {id: 1, title: "Second", tasks: []}, {
        id: 2,
        title: "Third",
        tasks: []
    }],
    filterValue: "All"
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            debugger
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELL_TODOLIST:{
            return{
                ...state,
                todolists: [...action.data]
            }
        }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        let newData = tl.tasks.filter(task=>{
                            return task.id!==action.taskId;
                        })
                        return {...tl, tasks: [...newData]}
                    } else {
                        return tl;
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTasks]}
                    } else {
                        return tl;
                    }
                })
            }

        case CHANGE_FILTER_VALUE:
            return {
                ...state,
                filterValue: action.newFilterValue
            }
        case CHANGE_TASK:
            return {
                ...state,

            }

        default:
            return state

    }

}
export const deleteTodo = (data) => ({type: DELL_TODOLIST, data});
export const deleteTask = (todolistId,taskId) => ({type: DELETE_TASK, todolistId,taskId});

export const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist});
export const addTaskAC = (todolistId, newTasks,) => ({type: ADD_TASK, todolistId, newTasks});
export const changeFilterValueAC = (newFilterValue) => ({type: CHANGE_FILTER_VALUE, newFilterValue});
export const changeTaskAC = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});


export default appReducer;