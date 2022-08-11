import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import TodoItem from './TodoItem';

/**
 * data = list에 보여줄 Data 넣기
 * renderItem = Android 로 치면 Adapter itemView
 * keyExtractor = 고유값, 고유값은 문자열 타입이어야 함
 */
function TodoList({todos, onToggle}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  // 각 Item 사이 구분 선
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginHorizontal: 10,
  },
});

export default TodoList;
