import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './../../constants';

const ButtonCommon = (props) => {
  const {
    style,
    opacity,
    gradient,
    color,
    colorless,
    startColor,
    endColor,
    end,
    start,
    locations,
    shadow,
    children,
    width,
    height,
    p1,
    m1,
  } = props;

  const buttonStyles = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color],
    color && !styles[color] && { backgroundColor: color },
    colorless && styles.colorless,
    width && { width },
    height && { height },
    p1 && styles.p1,
    m1 && styles.m1,
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

ButtonCommon.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  p1: {
    padding: theme.sizes.padding,
  },
  m1: {
    margin: theme.sizes.margin,
  },
  danger: { backgroundColor: theme.colors.danger },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  warning: { backgroundColor: theme.colors.warning },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  colorless: { backgroundColor: 'transparent' },
});

export default ButtonCommon;
