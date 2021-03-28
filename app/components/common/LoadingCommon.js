import React from 'react';
import { ActivityIndicator } from 'react-native';
import { theme } from '../../constants';
import BlockCommon from './BlockCommon';

const LoadingCommon = ({ color, size }) => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    white: theme.colors.white,
    gray: theme.colors.gray,
    gray2: theme.colors.gray2,
  };

  return (
    <BlockCommon f_center f_middle>
      <ActivityIndicator color={colors[color]} size={size} />
    </BlockCommon>
  );
};

LoadingCommon.defaultProps = {
  color: 'secondary',
  size: theme.sizes.base,
};

export default LoadingCommon;
