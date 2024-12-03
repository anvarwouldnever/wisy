import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Audio } from 'expo-av';
import store from '../store/store';
import { AppState } from 'react-native';

const BackgroundMusic = observer(() => {
  const sound = useRef(null);
  const [appState, setAppState] = useState(AppState.currentState);

  const configureAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,  // Отключаем запись (важно для музыки) // Не смешиваем звуки
        playsInSilentModeIOS: true, 
        shouldDuckAndroid: false,  // Не занижаем громкость других звуков
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false
      });
    } catch (error) {
      console.error('Ошибка настройки аудиорежима', error);
    }
  };

  useEffect(() => {
    const manageSound = async () => {
      if (sound.current) {
        if (store.musicPlaying) {
          await configureAudioMode();
          await sound.current.playAsync();
        } else {
          await sound.current.pauseAsync();
        }
      }
    };

    manageSound();
  }, [store.musicPlaying]);

  useEffect(() => {

    const configureAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          allowsRecordingANDROID: false,  // Отключаем запись (важно для музыки) // Не смешиваем звуки
          playsInSilentModeIOS: true,
          staysActiveInBackground: true, // Оставляем активным в фоне
          shouldDuckAndroid: false,  // Не занижаем громкость других звуков
          playThroughEarpieceAndroid: false, // Стерео через динамики, а не через наушник
        });
      } catch (error) {
        console.error('Ошибка настройки аудиорежима', error);
      }
    };

    const loadAndPlayMusic = async() => {
      try {
        await configureAudioMode();

        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../../assets/bg_music.mp3'),  // Файл с фоновой музыкой
          { shouldPlay: true, isLooping: true }  // Зацикливаем музыку
        );
        sound.current = newSound;

        await sound.current.setVolumeAsync(1);
        await sound.current.playAsync();
        
      } catch (error) {
        console.error('Ошибка загрузки музыки', error);
      }
    };

    loadAndPlayMusic();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();  // Очищаем ресурсы при размонтировании компонента
      }
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (sound.current && store.musicPlaying) {
          await sound.current.playAsync();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        if (sound.current) {
          await sound.current.pauseAsync();
        }
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, [appState]);

  return null;
});

export default BackgroundMusic;

