
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TimerView = ({ timer, index, onDelete }) => {
  console.log(timer)
  if (timer.minutes) {
    return (
      <View style={styles.container}>
        {/* Номер таймера */}
        <Text style={styles.index}>{index + 1}.</Text>

        {/* Время таймера */}
        <Text style={styles.timerText}>
          {`${timer.hours.toString().padStart(2, '0')}:${timer.minutes.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(2, '0')}`}
        </Text>

        {/* Кнопка удаления */}
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <MaterialIcons name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
};

export default TimerView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  index: {
    fontSize: 18,
    color: '#555',
    marginRight: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Занимает оставшееся пространство
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});
