import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';

import allTasks from '../../redux/selectors/TaskListSelectors';
import styles from './styles';

import TaskDetail from './../common/TaskDetail';
import genericStyle from './../common/GenericStyle';

import {
  createNewTask,
  createNewTodo,
  toggleTodo,
} from '../../redux/actions/TaskListActions';
import {scaledDimension, SCREEEN_HEIGHT} from '../../helpers/AppConstants';

class Detail extends Component {
  static defaultProps = {
    draggableRange: {
      top: SCREEEN_HEIGHT / 1.3,
      bottom: scaledDimension(150),
    },
  };

  _draggedValue = new Animated.Value(100);

  constructor(props) {
    super(props);

    this._panel;
    this.clickedIndex = props.navigation.state.params.index;

    this.state = {
      modalVisible: false,
      addingTodo: false,
      todoTitle: '',
      todoDetail: '',
      currentEditingTask: null,
    };
  }

  componentDidMount(): void {
    if (this._panel) {
      this._panel.show();
    }
  }

  addToDo = taskData => {
    this.setState({
      modalVisible: true,
      addingTodo: true,
      currentEditingTask: taskData,
    });
  };

  toggleToDo = todo => {
    this.props.toggleTodo(todo);
  };

  render() {
    let firstTask = this.props.allTasks[this.clickedIndex];
    let secondTask = this.props.allTasks[this.clickedIndex + 1];

    return (
      <View style={styles.container}>
        {firstTask && (
          <TaskDetail
            taskData={firstTask}
            addToDo={taskData => {
              this.addToDo(taskData);
            }}
            toggleToDo={todo => {
              this.toggleToDo(todo);
            }}
          />
        )}

        {secondTask && (
          <SlidingUpPanel
            showBackdrop={false}
            ref={c => (this._panel = c)}
            draggableRange={this.props.draggableRange}
            snappingPoints={[
              this.props.draggableRange.top,
              this.props.draggableRange.bottom,
            ]}
            animatedValue={this._draggedValue}>
            {dragHandler => (
              <View {...dragHandler} style={styles.bottomTask}>
                <TaskDetail
                  taskData={secondTask}
                  addToDo={taskData => {
                    this.addToDo(taskData);
                  }}
                  toggleToDo={todo => {
                    this.toggleToDo(todo);
                  }}
                />
              </View>
            )}
          </SlidingUpPanel>
        )}

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={genericStyle.modalContainer}>
            <View style={styles.addToDoModalView}>
              <Text style={genericStyle.modalTitleText}>{'Add Todo'}</Text>
              <TextInput
                style={genericStyle.modalTextInput}
                placeholder={'Todo Title'}
                onChangeText={text => this.setState({todoTitle: text})}
                value={this.state.todoTitle}
              />

              <TextInput
                style={[genericStyle.modalTextInput, {height: 90}]}
                multiline={true}
                placeholder={'Todo Description'}
                onChangeText={text => this.setState({todoDetail: text})}
                value={this.state.todoDetail}
              />

              <View style={genericStyle.modalActionsContainer}>
                <TouchableOpacity
                  style={genericStyle.modalActionButton}
                  onPress={() => {
                    this.setState({
                      modalVisible: false,
                      addingToDo: false,
                      todoTitle: '',
                      todoDetail: '',
                      currentEditingTask: null,
                    });
                  }}>
                  <Text style={{color: 'red'}}> {'CANCEL'} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[genericStyle.modalActionButton, {marginLeft: 10}]}
                  onPress={() => {
                    const {
                      todoTitle,
                      todoDetail,
                      currentEditingTask,
                    } = this.state;

                    if (
                      todoTitle.trim() != '' &&
                      todoDetail.trim() != '' &&
                      currentEditingTask
                    ) {
                      currentEditingTask.todo = [
                        ...currentEditingTask.todo,
                        {
                          id: currentEditingTask.todo.length,
                          title: todoTitle,
                          detail: todoDetail,
                          isCompleted: false,
                          created: '1573063426',
                        },
                      ];

                      this.props.createToDo(currentEditingTask);
                    }

                    this.setState({
                      modalVisible: false,
                      addingToDo: false,
                      todoTitle: '',
                      todoDetail: '',
                      currentEditingTask: null,
                    });
                  }}>
                  <Text style={{color: '#00A7F7'}}> {'ADD'} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allTasks: allTasks(state),
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createNewTask(task)),
  createToDo: task => dispatch(createNewTodo(task)),
  toggleTodo: todo => dispatch(toggleTodo(todo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
