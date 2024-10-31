import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FAB } from '@rneui/themed';
import { TimerPickerModal } from "react-native-timer-picker";
import TimerList from './components/timer_list';
import TotalTimeView from './components/total_time_view';
import TimerModal from './components/timer_modal';

const Home = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [timers, setTimerList] = useState([])
  const [isPlay, setIsPlay] = useState(false)

  // Следим за изменениями в массиве timers
  useEffect(() => {
    if (timers.length === 0 && isPlay) {
      setIsPlay(false); // Останавливаем, если таймеров нет
    }
  }, [timers]);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  // Сброс режима play, когда таймеры заканчиваются
  const handleStop = () => {
    setIsPlay(false);
  };

  // Условия для отображения FAB
  const fabAdd = (
    <FAB
      style={styles.fab}
      visible={!isPlay}
      onPress={() => setShowPicker(true)}
      icon={{ name: 'add', color: 'white' }}
      size="small"
    />
  );

  const fabPlayStop = (
    <FAB
      style={styles.fabStart}
      visible={timers.length > 0}
      onPress={() => setIsPlay(!isPlay)}
      icon={{ name: isPlay ? 'stop' : 'play-arrow', color: 'white' }}
      size="small"
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <TimerList timers={timers} setTimers={setTimerList} />
      <TotalTimeView timers={timers} />
      <TimerModal
        timers={timers}
        isPlay={isPlay}
        onClose={handleStop}
      />
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          if (pickedDuration.hours !== 0 || pickedDuration.minutes !== 0 || pickedDuration.seconds !== 0) {
            setTimerList((prev) => [...prev, pickedDuration])
          }
          setShowPicker(false);
        }}
        modalTitle="Set Alarm"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        // LinearGradient={LinearGradient}
        // Haptics={Haptics}
        styles={{
          theme: "dark",
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
      {fabAdd}
      {fabPlayStop}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  fab: {
    justifyContent: 'center',
    position: 'absolute',
    margin: 20,
    bottom: 46,
    right: 16,
    alignItems: 'center',
  },
  fabStart: {
    justifyContent: 'center',
    position: 'absolute',
    margin: 20,
    bottom: 46,
    right: 86,
    alignItems: 'center',
  },
  fab_start: {
    justifyContent: 'center',
    position: 'absolute',
    margin: 20,
    bottom: 46,
    right: 86,
    alignItems: 'center',
  },

});

