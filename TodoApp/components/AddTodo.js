import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity, // 클릭 시 투명도 설정 기본값 0.2
  Platform,
  TouchableNativeFeedback, // 클릭 시 물결 모양 (android 에서는 사용가능하나 ios에서는 사용 불가)
  Keyboard,
} from 'react-native';

function AddTodo() {
  const [text, setText] = useState('');

  /**
   * InputText 의 값을 빈칸으로 만들어주고 keyboard GONE 처리
   */
  const onClick = () => {
    setText('');
    Keyboard.dismiss();
  };

  const customBtn = (
    <View style={styles.buttonStyle}>
      <Image source={require('../assets/images/add_white/add_white.png')} />
    </View>
  );

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onClick}
        returnKeyType="done"
      />
      {Platform.select({
        ios: (
          <TouchableOpacity activeOpacity={0.5} onPress={onClick}>
            {customBtn}
          </TouchableOpacity>
        ),
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onClick}>
              {customBtn}
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    height: 64,
    paddingHorizontal: 16,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#ffab91',
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: 'hidden',
    borderRadius: 24,
  },
});

export default AddTodo;
