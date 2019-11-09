export const actionTypes = {
  CREATE_TASK: 'CREATE_TASK',
  CREATE_TODO: 'CREATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
};

const createTask = task => ({
  type: actionTypes.CREATE_TASK,
  payload: task,
});

const createTodo = task => ({
  type: actionTypes.CREATE_TODO,
  payload: task,
});

const toggleTaskTodo = todo => ({
  type: actionTypes.TOGGLE_TODO,
  payload: todo,
});

export const createNewTask = task => dispatch => {
  dispatch(createTask(task));
};

export const createNewTodo = task => dispatch => {
  dispatch(createTodo(task));
};

export const toggleTodo = todo => dispatch => {
  dispatch(toggleTaskTodo(todo));
};
