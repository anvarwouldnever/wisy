import { useEffect, useState } from 'react';
import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from 'expo-av';
import store from '../store/store';
import { Platform } from 'react-native';

export const playSound = async(base64: any) => {

      if (base64) {
        try {
          store.setPlayingMusic(false);
  
          let sound = new Audio.Sound();
          await sound.loadAsync({
            uri: `data:audio/mp3;base64,${base64}`,
          });

          await sound.setVolumeAsync(1.0);
          await sound.playAsync();
  
          sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatusSuccess) => {
            if (status.didJustFinish) {
              store.setPlayingMusic(true);
              sound.unloadAsync();
            }
          }, );
        } catch (error) {
          console.error('Ошибка при воспроизведении звука:', error);
          store.setPlayingMusic(true);
        } finally {
          if(Platform.OS === 'android') {
            setTimeout(() => {
              store.setPlayingMusic(true);
            }, 3000);
          }
        }
      }
  };