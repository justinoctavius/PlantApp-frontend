import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../constants';

const TextCommon = (props) => {
  const {
    //font sizes
    h1,
    h2,
    h3,
    h4,
    title,
    body,
    caption,
    small,
    //font weight,
    regular,
    bold,
    weight,
    light,
    //layout
    center,
    right,
    middle,
    bottom,
    //colors
    color,
    danger,
    primary,
    secondary,
    warning,
    black,
    white,
    gray,
    gray2,
    gray3,
    children,
    style,
  } = props;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    h4 && styles.h4,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    //styling,
    regular && styles.regular,
    bold && styles.bold,
    weight && styles.weight,
    light && styles.light,
    //layout
    center && styles.center,
    right && styles.right,
    middle && styles.middle,
    bottom && styles.bottom,
    //colors
    color && styles[color],
    color && !styles[color] && { color: color },
    //colors shortcuts
    danger && styles.danger,
    primary && styles.primary,
    secondary && styles.secondary,
    warning && styles.warning,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    gray3 && styles.gray3,
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  //default styles
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },
  //variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    fontWeight: '200',
  },
  //positions
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  middle: { textAlignVertical: 'center' },
  bottom: { textAlignVertical: 'bottom' },
  //colors
  danger: { color: theme.colors.danger },
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  warning: { color: theme.colors.warning },
  black: { color: theme.colors.black },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  gray3: { color: theme.colors.gray3 },
  //fonts
  h1: theme.sizes.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  h4: theme.fonts.h4,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
});

export default TextCommon;
