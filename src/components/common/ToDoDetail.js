import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

class ToDoDetail extends React.Component {
  render() {
    let todoData = this.props.todoData.item;
    let contentColor = this.props.contentColor;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.toggleToDo && this.props.toggleToDo(todoData);
        }}>
        <View style={styles.container}>
          <Image
            style={{tintColor: contentColor}}
            source={
              todoData.isCompleted
                ? require('../../assets/ic_check.png')
                : require('../../assets/ic_uncheck.png')
            }
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.todoTitle,
                todoData.isCompleted
                  ? {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      color: contentColor,
                    }
                  : {color: contentColor},
              ]}>
              {todoData.title}
            </Text>

            <Text style={[styles.todoDetail, {color: contentColor}]}>
              {todoData.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 8,
    marginRight: 8,
    marginTop: -1,
  },
  todoDetail: {
    fontSize: 11,
    fontWeight: '400',
    marginLeft: 8,
    marginRight: 8,
    marginTop: -1,
  },
});

export default ToDoDetail;
