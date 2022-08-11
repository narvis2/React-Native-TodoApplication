import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

function TodoItem({id, text, done, onToggle}) {
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
});

export default TodoItem;
