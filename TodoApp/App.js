/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// KeyboardAvoidingView : 키보드가 화면을 가리지 않게 하기
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from 'react-native';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';

function App() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.block}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: undefined,
        })}
        style={styles.android}>
        <DateHead />
        <Empty />
        <AddTodo />
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
