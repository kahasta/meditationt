import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { React, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FAB } from '@rneui/themed';
import { TimerPickerModal } from "react-native-timer-picker";
import TimerView from './components/timer_view';
import TimerList from './components/timer_list';

const Home = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [timer, setTimer] = useState({})
  const [timers, setTimerList] = useState([])

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <TimerList timers={timers} setTimers={setTimerList} />

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setTimer(pickedDuration);
          setTimerList((prev) => [...prev, pickedDuration])
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
      <FAB
        style={styles.fab}
        visible={true}
        onPress={() => setShowPicker(true)}
        icon={{ name: 'add', color: 'white' }}
        size="small"
        placement='right'
      />
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
    marin: 20,
    bottom: 16,
    right: 16,
    alignItems: 'center',
  }
});

