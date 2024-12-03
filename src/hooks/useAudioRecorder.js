import { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import store from '../store/store';

export const useAudioRecorder = (setText, setLevel, level) => {
    const [recording, setRecording] = useState(null);

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                console.log("Permission to access microphone is required");
            }
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecording(null);
                console.log(uri )
                return uri
            }
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    return {
        startRecording,
        stopRecording,
        recording
    };
};
