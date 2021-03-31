import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../constants';
import InputCommon from './InputCommon';
import BlockCommon from './BlockCommon';
import TextCommon from './TextCommon';

const TextEditableCommon = ({ label, text, setText, rightLabel = 'Edit' }) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <BlockCommon style={styles.textStyle}>
      <BlockCommon d_flex={false}>
        {!showEditor ? (
          <>
            <TextCommon>{label}</TextCommon>
            <TextCommon gray>{text}</TextCommon>
          </>
        ) : (
          <BlockCommon d_flex={false}>
            <InputCommon
              label={label}
              value={text}
              onChangeText={(e) => setText(e)}
              onSubmitEditing={() => setShowEditor(false)}
              style={{ minWidth: Dimensions.get('screen').width / 2 }}
            />
          </BlockCommon>
        )}
      </BlockCommon>
      <Pressable onPress={() => setShowEditor(!showEditor)}>
        <TextCommon primary>{rightLabel}</TextCommon>
      </Pressable>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginTop: theme.sizes.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TextEditableCommon;
