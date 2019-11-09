import {combineReducers} from 'redux';
import taskList from './TaskListReducer';

const AppReducer = combineReducers({
  taskList,
});

export default AppReducer;
