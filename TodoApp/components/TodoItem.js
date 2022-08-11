import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
/**
 * https://oblador.github.io/react-native-vector-icons/ 해당 사이트에서 확인 가능
 * MaterialIcons 부분에는 해당 사이트의 빨간색 부분을 넣으면됨
 * Icon name 부분에 아이콘 이름 넣으면됨.
 */
import Icon from 'react-native-vector-icons/MaterialIcons';

function TodoItem({id, text, done, onToggle, onRemove}) {
  const remove = () => {
    // Android는 버튼에 스타일이 적용되지 않음. 필요하다면 Alert 처럼 보이는 컴포넌트를 직접 제작해야 함.
    Alert.alert(
      '삭제', // 제목
      '정말로 삭제하시겠습니까?', // 내용
      // 버튼 배열
      [
        // "취소" 버튼
        {text: '취소', onPress: () => {}, style: 'cancel'},
        // "삭제" 버튼
        {
          text: '삭제',
          onPress: () => {
            onRemove(id);
          },
          style: 'destructive',
        },
      ],
      {
        // Dialog 취소 가능 여부 ex) 다이얼로그 영역 외 클릭 했을 경우
        cancelable: true,
        // 취소 시 Callback 함수
        onDismiss: () => {},
      },
    );
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggle(id)}>
        <View style={[styles.circle, done && styles.filled]}>
          {done && (
            <Image
              source={require('../assets/icons/check_white/check_white.png')}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
      {done ? (
        <TouchableOpacity onPress={remove}>
          <Icon name="delete" size={32} color="red" />
        </TouchableOpacity>
      ) : (
        <View style={styles.removePlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#e0e0e0',
    alignItem: 'center',
  },
  // 원 만들기
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#ffab91',
    borderWidth: 1,
    marginRight: 16,
  },
  // 완료 되었을 경우 가득 채워진 원을 보여줌
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffab91',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  lineThrough: {
    color: '#929292',
    textDecorationLine: 'line-through',
  },
  removePlaceholder: {
    width: 32,
    height: 32,
  },
});

export default TodoItem;
