import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#A1A1A1',
  },
  modalTextInput: {
    height: 40,
    borderColor: '#A1A1A1',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  modalActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalActionButton: {
    height: 22,
  },
});

export default styles;
