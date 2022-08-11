import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView, // 키보드가 화면을 가리지 않게 하기
  Platform,
} from 'react-native';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리엑트 네이티브 기초 공부', done: false},
    {id: 3, text: 'Todo리스트 만들어보기', done: false},
  ]);

  /**
   * 텍스트 작성 후 Add 버튼 누르면 List에 해당 Text를 추가해줌
   */
  const onInsert = text => {
    /**
     * 새로 등록할 항목의 id를 구한다.
     * 등록된 항목(List) 중에서 가장 큰 id를 구하고, 그 값에 1을 더한다.
     * 만약 리스트가 비어있다면 1을 id로 사용
     */
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todo = {
      id: nextId,
      text,
      done: false,
    };

    // 배열에 값 추가
    setTodos(todos.concat(todo));
  };

  // List Item Click 시 done 만 바꿔서 넣어줌
  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.block}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: undefined,
        })}
        style={styles.android}>
        <DateHead />
        {todos.length === 0 ? (
          <Empty />
        ) : (
          <TodoList todos={todos} onToggle={onToggle} />
        )}
        <AddTodo onInsert={onInsert} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  android: {
    flex: 1,
  },
});

export default App;
