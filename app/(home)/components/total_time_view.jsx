import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalTimeView = ({ timers }) => {
  // Суммируем общее время
  const calculateTotalTime = () => {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;

    timers.forEach((timer) => {
      totalHours += timer.hours || 0;
      totalMinutes += timer.minutes || 0;
      totalSeconds += timer.seconds || 0;
    });

    // Конвертируем секунды в минуты и минуты в часы, если нужно
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return {
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    };
  };

  const totalTime = calculateTotalTime();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Общее время:</Text>
      <Text style={styles.time}>
        {`${totalTime.hours.toString().padStart(2, '0')}:${totalTime.minutes
          .toString()
          .padStart(2, '0')}:${totalTime.seconds.toString().padStart(2, '0')}`}
      </Text>
    </View>
  );
};

export default TotalTimeView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    margin: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
