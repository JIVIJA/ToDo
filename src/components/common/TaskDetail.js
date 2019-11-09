import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import ToDoDetail from './ToDoDetail';

import {
  SCREEEN_WIDTH,
  SCREEEN_HEIGHT,
  scaledToHeightDimension, HEADER_HEIGHT,
} from '../../helpers/AppConstants';

class TaskDetail extends React.Component {
  renderSeparator = () => {
    return <View style={{height: 14}} />;
  };

  render() {
    let taskData = this.props.taskData;

    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={[
            styles.container,
            {backgroundColor: taskData.backgroundColor},
          ]}>
          <View style={styles.header}>
            <Text style={[styles.taskTitle, {color: taskData.contentColor}]}>
              {taskData.title}
            </Text>
            <TouchableOpacity
              style={styles.addTodoTouchable}
              onPress={() => {
                this.props.addToDo && this.props.addToDo(taskData);
              }}>
              <Text
                style={[styles.addTodoText, {color: taskData.addIconColor}]}>
                {'+'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.todoList}
            data={taskData.todo}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={todoData => (
              <ToDoDetail
                todoData={todoData}
                contentColor={taskData.contentColor}
                toggleToDo={todo => {
                  this.props.toggleToDo && this.props.toggleToDo(todo);
                }}
              />
            )}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEEN_WIDTH,
    height: SCREEEN_HEIGHT - HEADER_HEIGHT(),
    padding: 30,
    borderTopRightRadius: 25,
    borderColor: '#E8EBF1',
    borderWidth: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  addTodoTouchable: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTodoText: {
    fontSize: 32,
    fontWeight: '400',
  },
  todoList: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default TaskDetail;
