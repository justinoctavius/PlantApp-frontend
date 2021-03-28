import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../constants';

const BlockCommon = (props) => {
  const {
    children,
    //display
    d_flex,
    d_card,
    d_absolute,
    //flex layout
    f_row,
    f_column,
    f_center,
    f_middle,
    f_left,
    f_right,
    f_top,
    f_bottom,
    //spaces: string, (between,evenly,arount)
    f_space,
    //adsolute layout
    a_top,
    a_bottom,
    a_right,
    a_left,
    //styles
    shadow,
    color,
    style,
    //layout
    p1,
    m1,
    height,
    width,
  } = props;

  const blockStyles = [
    styles.block,
    //layout
    p1 && styles.p1, //padding
    m1 && styles.m1, //margin
    height && { height },
    width && { width },
    //displays
    d_flex && { flex: d_flex },
    d_flex === false && { flex: 0 }, // reset / disable flex
    d_card && styles.card,
    d_absolute && styles.absolute,
    //flex layout
    f_row && styles.row,
    f_column && styles.column,
    f_center && styles.center,
    f_middle && styles.middle,
    f_left && styles.left,
    f_right && styles.right,
    f_top && styles.top,
    f_bottom && styles.bottom,
    f_space && { justifyContent: `space-${f_space}` },
    //absolute layout
    a_top && { top: a_top },
    a_bottom && { bottom: a_bottom },
    a_left && { left: a_left },
    a_right && { right: a_right },
    //styles
    shadow && styles.shadow,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style, // rewrite predefined styles
  ];

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  //layout
  p1: { padding: theme.sizes.padding },
  m1: { margin: theme.sizes.margin },
  //flex layout
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: theme.sizes.border,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  //displays
  absolute: {
    position: 'absolute',
  },
  //styles
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  //colors
  danger: { backgroundColor: theme.colors.danger },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  warning: { backgroundColor: theme.colors.warning },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
});

export default BlockCommon;
