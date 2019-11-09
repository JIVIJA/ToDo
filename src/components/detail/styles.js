import {StyleSheet} from 'react-native';
import {HEADER_HEIGHT, scaledDimension, SCREEEN_HEIGHT} from '../../helpers/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addToDoModalView: {
    width: scaledDimension(300),
    height: scaledDimension(280),
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-between',
  },
  bottomTask: {
    flex: 1,
  },
});

export default styles;
