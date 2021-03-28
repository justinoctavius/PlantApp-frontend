import React from 'react';
import BlockCommon from './BlockCommon';
import ButtonCommon from './ButtonCommon';
import TextCommon from './TextCommon';

function NavPageCommon({ page, setPage, limit = null }) {
  const _prevHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const _nextHandler = () => {
    if (!limit) {
      setPage(page + 1);
      return;
    }
    if (page < limit) {
      setPage(page + 1);
    }
  };

  return (
    <BlockCommon>
      <BlockCommon f_row f_center f_middle>
        <ButtonCommon gradient width={50} onPress={_prevHandler}>
          <TextCommon white center semibold>
            Prev
          </TextCommon>
        </ButtonCommon>
        <BlockCommon d_flex={false} m1>
          <TextCommon>{page + 1}</TextCommon>
        </BlockCommon>
        <ButtonCommon gradient width={50} onPress={_nextHandler}>
          <TextCommon white center semibold>
            Next
          </TextCommon>
        </ButtonCommon>
      </BlockCommon>
    </BlockCommon>
  );
}

export default NavPageCommon;
