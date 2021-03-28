import React from 'react';
import BlockCommon from './BlockCommon';
import TextCommon from './TextCommon';

const ErrorCommon = (props) => {
  const { text } = props;
  return (
    <BlockCommon>
      <TextCommon title {...props} center danger>
        {text}
      </TextCommon>
    </BlockCommon>
  );
};

export default ErrorCommon;
