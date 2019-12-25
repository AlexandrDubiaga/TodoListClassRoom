import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import appReducer from "./appReducer";


let reducers = combineReducers({   //Создал для последующих редюсеров сразу компайню наперед!!!
    app:appReducer
});



const store = createStore(reducers);

export default store;
