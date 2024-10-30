import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TimerView from './timer_view'; // Импортируем TimerView

const TimerList = ({ timers, setTimers }) => {
  // Функция для удаления таймера по индексу
  const deleteTimer = (index) => {
    setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TimerView
            timer={item}
            index={index}
            onDelete={() => deleteTimer(index)}
          />
        )}
      />
    </View>
  );
};

export default TimerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
