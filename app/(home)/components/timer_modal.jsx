
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const TimerModal = ({ timers, isPlay, onClose }) => {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (isPlay && timers[currentTimerIndex]) {
      const { hours, minutes, seconds } = timers[currentTimerIndex];
      setRemainingTime(hours * 3600 + minutes * 60 + seconds);
    }
  }, [isPlay, currentTimerIndex]);

  useEffect(() => {
    if (!isPlay || remainingTime === null) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          if (currentTimerIndex === timers.length - 1) {
            setTimeout(onClose, 0);
          } else {
            setCurrentTimerIndex((prevIndex) => prevIndex + 1);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlay, remainingTime, currentTimerIndex]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isPlay}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerTitle}>Current Timer {currentTimerIndex + 1}</Text>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    width: '80%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 15,
    alignItems: 'center',
  },
  timerTitle: {
    fontSize: 18,
    color: '#BB86FC',
    marginBottom: 10,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E0E0E0',
    letterSpacing: 2,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#BB86FC',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
