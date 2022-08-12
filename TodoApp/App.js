/**
 * useEffect : 컴포넌트에서 특정 상태가 바뀔 때마다 원하는 코드를 실행할 수 있음.
 * 또한, 컴포넌트가 마운트(가장 처음 화면에 나타날 경우)되거나 언마운트(화면에서 컴포넌트가 사라질 경우)될 때 원하는 코드를 실행할 수 있음.
 */
import React, {useState, useEffect} from 'react';
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
import todoStorage from './storages/todosStorage';

function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리엑트 네이티브 기초 공부', done: false},
  ]);
  // 가져오기, App이 마운트(가장 처음 화면에 나타날 경우) 데이터를 불러옴
  useEffect(() => {
    // async 함수를 따로 선언하지 않고 Promise 를 그대로 사용
    todoStorage.get().then(setTodos).catch(console.error);
  }, []);

  // 저장
  useEffect(() => {
    // todos가 바뀔때 마다 실행되는 Callback 함수, 처음 렌더링될 때에도 호출됨
    // async 함수를 따로 선언하지 않고 Promise 를 그대로 사용
    todoStorage.set(todos).then().catch(console.error);
  }, [todos]);

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

  // List Item Click 시 해당 Item 삭제
  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
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
          <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
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
