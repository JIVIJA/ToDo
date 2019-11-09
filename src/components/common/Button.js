import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    borderColor: '#1976D2',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
  },
});

const Button = props => (
  <TouchableOpacity {...props} style={[styles.button, props.style]}>
    <Text style={[styles.fieldTitle, props.textStyle]}>{props.title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
  title: '',
};

export default Button;
