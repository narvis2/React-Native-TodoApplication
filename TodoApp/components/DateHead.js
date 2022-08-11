import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

function DateHead() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <>
      <StatusBar backgroundColor="#ffab91" barStyle="light-content" />
      <View style={styles.block}>
        <Text style={styles.dateText}>{`${year}년 ${month}월 ${day}일`}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 16,
    backgroundColor: '#ffab91',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});

export default DateHead;
