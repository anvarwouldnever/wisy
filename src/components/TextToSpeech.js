import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeech() {

  const speak = () => {
    const thingToSay = 'Šis dzīvnieks murrā un bieži guļ saulē.';
    Speech.speak(thingToSay, { language: 'lv-LV', pitch: 1.3,        // Высокая тональность (приближение к детскому голосу)
        rate: 1 });
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
