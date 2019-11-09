import {StyleSheet} from 'react-native';
import {
  HEADER_HEIGHT,
  scaledDimension,
  SCREEEN_HEIGHT,
} from '../../helpers/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 1,
    alignSelf: 'stretch',
    flexGrow: 0.8,
    paddingVertical: 10,
  },
  bottomView: {
    flex: 1,
    alignSelf: 'stretch',
    flexGrow: 1,
    paddingVertical: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '400',
    color: '#A4A7AF',
    marginHorizontal: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: '300',
    color: '#28A4FE',
    marginHorizontal: 12,
  },
  taskListHStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  taskListView: {
    flexDirection: 'row',
  },
  taskListText: {
    fontSize: 24,
    color: '#A4A7AF',
  },
  addTaskTouchable: {
    width: 25,
    height: 25,
    backgroundColor: '#F9525F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addTaskModalView: {
    width: scaledDimension(300),
    height: scaledDimension(150),
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-between',
  },
  addToDoModalView: {
    width: scaledDimension(300),
    height: scaledDimension(280),
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-between',
  },
});

export default styles;
