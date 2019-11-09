import {actionTypes} from '../actions/TaskListActions';
import tasks from '../../helpers/jsons/tasks';

const initialState = {
  tasks: tasks,
};

const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_TODO:
      return {
        tasks: toggleTodo(action.payload),
      };
    case actionTypes.CREATE_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case actionTypes.CREATE_TODO:
      return {
        tasks: updateTask(action.payload),
      };
    default:
      return state;
  }
};

const updateTask = task => {
  const allTasks = initialState.tasks;
  let index = allTasks.findIndex(task1 => task1.id == task.id);

  if (index >= 0) {
    allTasks[index] = task;
  }

  return allTasks;
};

const toggleTodo = todo => {
  const allTasks = initialState.tasks;
  let taskNeedToUpdate = allTasks.filter(task =>
    task.todo.filter(todo1 => todo1.id == todo.id),
  )[0];

  if (taskNeedToUpdate) {
    let taskIndex = allTasks.indexOf(taskNeedToUpdate);
    let index = taskNeedToUpdate.todo.findIndex(todo1 => todo1.id == todo.id);

    todo.isCompleted = !todo.isCompleted;
    taskNeedToUpdate.todo[index] = todo;

    if (taskIndex >= 0) {
      allTasks[taskIndex] = taskNeedToUpdate;
    }
  }

  return allTasks;
};

export default taskListReducer;
