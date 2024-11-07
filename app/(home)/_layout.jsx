import { StyleSheet, View, Text, } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitleStyle: { color: "#fff" }, title: 'Timer', headerStyle: { backgroundColor: "#1e2e3f", }, navigationBarColor: "#1e2e3f" }} />
    </Stack>
  )
}

export default RootLayout

