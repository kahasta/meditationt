
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as Brightness from 'expo-brightness';
import { Audio } from 'expo-av'

const playSound = async (flag) => {
  const timer_sound = await Audio.Sound.createAsync(require('../../../assets/sounds/tibetan-singing-bowl-struck.mp3'))
  const timer_sound_end = await Audio.Sound.createAsync(require('../../../assets/sounds/tibetan-bowl-4.mp3'))
  if (flag) {
    await timer_sound.sound.playAsync()
  } else {
    await timer_sound_end.sound.playAsync()
  }
}

const TimerModal = ({ timers, isPlay, onClose }) => {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);




  if (isPlay) {
    // Блокируем экран от отключения
    activateKeepAwakeAsync();

    // Устанавливаем минимальную яркость
    const setBrightness = async () => {
      await Brightness.setBrightnessAsync(0.1); // Яркость на уровне 10%
    };
    setBrightness();
  } else {
    // Очистка яркости и отмена блокировки экрана при размонтировании
    deactivateKeepAwake();
    Brightness.useSystemBrightnessAsync(); // Возвращаем системную яркость
  }

  // Сбрасываем состояние таймера при закрытии
  const resetTimer = () => {
    setCurrentTimerIndex(0);
    setRemainingTime(null);
  };

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
            playSound(false)
            resetTimer()
            setTimeout(onClose, 0);
          } else {
            setCurrentTimerIndex((prevIndex) => prevIndex + 1);
            playSound(true)
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
      onRequestClose={() => {
        resetTimer();
        onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerTitle}>Current Timer {currentTimerIndex + 1}</Text>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          <TouchableOpacity onPress={() => {
            resetTimer()
            onClose()
          }} style={styles.closeButton}>
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
