import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';

import allTasks from '../../redux/selectors/TaskListSelectors';
import localization from './../../localization/en';
import styles from './styles';
import genericStyle from './../common/GenericStyle';
import Task from './../common/Task';
import {
  createNewTask,
  createNewTodo,
  toggleTodo,
} from '../../redux/actions/TaskListActions';

class Home extends Component {
  static navigationOptions = {
    title: localization.home,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      addingTask: false,
      addingTodo: false,
      taskTitle: '',
      todoTitle: '',
      todoDetail: '',
      currentEditingTask: null,
    };
  }

  greeting = () => {
    let hours = new Date().getHours();
    var greeting;

    if (hours < 12) {
      greeting = localization.morning;
    } else if (hours >= 12 && hours <= 17) {
      greeting = localization.afternoon;
    } else if (hours >= 17 && hours <= 20) {
      greeting = localization.evening;
    } else if (hours >= 20 && hours <= 24) {
      greeting = localization.night;
    }

    return greeting;
  };

  addTask = () => {
    this.setState({
      modalVisible: true,
      addingTask: true,
    });
  };

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

  renderSeparator = () => {
    return <View style={{width: 30}} />;
  };

  renderSectionHeaderFooter = () => {
    return <View style={{width: 15}} />;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <Text style={styles.greeting}> {this.greeting()} </Text>
          <Text style={styles.username}> {'Varun Makhija'} </Text>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.taskListHStack}>
            <View style={styles.taskListView}>
              <Text style={[styles.taskListText, {fontWeight: '600'}]}>
                {'Tasks'}
              </Text>
              <Text style={[styles.taskListText, {fontWeight: '400'}]}>
                {' List'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addTaskTouchable}
              onPress={() => {
                this.addTask();
              }}>
              <Text style={{color: '#fff'}}> {'+'} </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{flex: 1, marginTop: 10}}
            horizontal
            data={this.props.allTasks}
            extraData={this.props}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderSectionHeaderFooter}
            ListFooterComponent={this.renderSectionHeaderFooter}
            renderItem={taskData => (
              <Task
                taskData={taskData}
                taskDetail={() => {}}
                addToDo={taskData => {
                  this.addToDo(taskData);
                }}
                toggleToDo={todo => {
                  this.toggleToDo(todo);
                }}
                onClick={index => {
                  this.props.navigation.navigate('Detail', {index: index});
                }}
              />
            )}
          />
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={genericStyle.modalContainer}>
            {this.state.addingTask ? (
              <View style={styles.addTaskModalView}>
                <Text style={genericStyle.modalTitleText}>{'Add Task List'}</Text>
                <TextInput
                  style={genericStyle.modalTextInput}
                  placeholder={'List Title'}
                  onChangeText={text => this.setState({taskTitle: text})}
                  value={this.state.taskTitle}
                />

                <View style={genericStyle.modalActionsContainer}>
                  <TouchableOpacity
                    style={genericStyle.modalActionButton}
                    onPress={() => {
                      this.setState({
                        modalVisible: false,
                        addingTask: false,
                        taskTitle: '',
                      });
                    }}>
                    <Text style={{color: 'red'}}> {'CANCEL'} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[genericStyle.modalActionButton, {marginLeft: 10}]}
                    onPress={() => {
                      const {taskTitle} = this.state;

                      if (taskTitle.trim() != '') {
                        let colors = [
                          {
                            backgroundColor: '#fff',
                            contentColor: '#A1A1A1',
                            addIconColor: '#00A7F7',
                          },
                          {
                            backgroundColor: '#F4883F',
                            contentColor: '#fff',
                            addIconColor: '#fff',
                          },
                          {
                            backgroundColor: '#00A7F7',
                            contentColor: '#fff',
                            addIconColor: '#fff',
                          },
                        ];

                        let color =
                          colors[Math.floor(Math.random() * colors.length)];

                        this.props.createTask({
                          id: this.props.allTasks.length,
                          title: taskTitle,
                          created: '1573063425',
                          backgroundColor: color.backgroundColor,
                          contentColor: color.contentColor,
                          addIconColor: color.addIconColor,
                          todo: [],
                        });
                      }

                      this.setState({
                        modalVisible: false,
                        addingTask: false,
                        taskTitle: '',
                      });
                    }}>
                    <Text style={{color: '#00A7F7'}}> {'ADD'} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
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
            )}
          </View>
        </Modal>
      </SafeAreaView>
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
)(Home);
