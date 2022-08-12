/**
 * AsyncStorage 는 비교적 소규모 데이터를 다룰 때 사용하는 것이 좋음
 * 데이터의 규모가 커졌을 때는 realm 및 react-native-sqlite-storage를 사용하는 것을 추천
 * 즉, AsyncStorage는 Android에서 SharedPreference 및 DataStore 과 유사
 */
import AsyncStorage from '@react-native-community/async-storage';

const key = 'todos';

const todoStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);

      // rawTodos가 null 이면 사용하지 않음
      if (!rawTodos) {
        throw new Error('No saved todos');
      }

      // AsyncStorage 를 가져올때는 역직렬화를 하여 가져옴
      const savedTodos = JSON.parse(rawTodos);
      console.log('불러오기 완료');
      return savedTodos;
    } catch (e) {
      throw new Error(e.Error, 'Failed to load todos');
    }
  },

  async set(data) {
    try {
      // AsyncStorage에는 String만 저장되기 때문에 직렬화하여 저장
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('저장 완료');
    } catch (e) {
      throw new Error('Failed to save todos');
    }
  },
};

export default todoStorage;
