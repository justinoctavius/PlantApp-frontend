import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { theme } from '../../constants';
import BlockCommon from './BlockCommon';
import ErrorCommon from './ErrorCommon';
import LoadingCommon from './LoadingCommon';
import TextCommon from './TextCommon';

const ListCardCommon = ({
  data,
  keyExtractor,
  headerTitle,
  renderItem,
  loading,
  error,
}) => {
  if (error) {
    return <ErrorCommon text={error} />;
  }

  if (loading) {
    return <LoadingCommon size={32} />;
  }
  return (
    <BlockCommon>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        horizontal={false}
        numColumns={2}
        ListHeaderComponent={() => (
          <TextCommon gray h3>
            {headerTitle}
          </TextCommon>
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.sizes.padding,
          minHeight: '100%',
        }}
        renderItem={({ item }) => renderItem(item)}
      />
    </BlockCommon>
  );
};

export default ListCardCommon;
