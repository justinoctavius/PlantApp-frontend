import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import * as Icon from '@expo/vector-icons';

import TextCommon from './TextCommon';
import BlockCommon from './BlockCommon';
import ButtonCommon from './ButtonCommon';

import { theme } from './../../constants';

export default class InputCommon extends Component {
  state = {
    toggleSecure: false,
    showErrorMsg: false,
    defaultErrorMsg: '',
  };

  renderLabel() {
    const { label, error } = this.props;

    return (
      <BlockCommon>
        {label ? (
          <TextCommon
            gray2={!error && !this.state.showErrorMsg}
            danger={error || this.state.showErrorMsg}
          >
            {label} {this.renderErrorMsg()}
          </TextCommon>
        ) : null}
      </BlockCommon>
    );
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <ButtonCommon
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon.Ionicons
            color={theme.colors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </ButtonCommon>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <ButtonCommon
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </ButtonCommon>
    );
  }

  validate() {
    const { require, value } = this.props;

    if (require) {
      if (value === '') {
        this.setState({ showErrorMsg: true, defaultErrorMsg: 'require' });
      } else {
        this.setState({ showErrorMsg: false });
      }
    }
  }

  renderErrorMsg() {
    const { errorMsg } = this.props;
    if (!this.state.showErrorMsg) return null;
    return (
      <TextCommon danger semibold>
        {errorMsg || this.state.defaultErrorMsg}
      </TextCommon>
    );
  }

  render() {
    const { email, phone, number, secure, error, style, ...props } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error ||
        (this.state.showErrorMsg && { borderColor: theme.colors.danger }),
      //layout
      style,
    ];

    const inputType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';

    return (
      <>
        <BlockCommon d_flex={false}>
          {this.renderLabel()}
          <TextInput
            style={inputStyles}
            secureTextEntry={isSecure}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={inputType}
            onBlur={() => this.validate()}
            {...props}
          />
          {this.renderToggle()}
          {this.renderRight()}
        </BlockCommon>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray2,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.primary,
    minHeight: theme.sizes.base * 3,
    textAlignVertical: 'bottom',
    marginBottom: theme.sizes.margin,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
});
