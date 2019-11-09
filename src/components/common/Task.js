import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import ToDo from './ToDo';

class Task extends React.Component {
  renderSeparator = () => {
    return <View style={{height: 8}} />;
  };

  render() {
    let taskData = this.props.taskData.item;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.onClick && this.props.onClick(this.props.taskData.index);
        }}>
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
              <ToDo
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
    width: 250,
    flex: 0.92,
    padding: 20,
    borderRadius: 15,
    borderColor: '#E8EBF1',
    borderWidth: 1,
    shadowOffset: {width: 12, height: 12},
    shadowColor: '#E8EBF1',
    shadowOpacity: 1.0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  addTodoTouchable: {
    width: 25,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTodoText: {
    fontSize: 25,
    fontWeight: '300',
  },
  todoList: {
    flex: 1,
    marginVertical: 10,
  },
});

export default Task;
