import { Alert } from "react-native";
import Alarm from "../model/Alarm";
import { updateAlarmService } from "../services/DbService";
import TrackPlayer from "react-native-track-player";

const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const MINUTES_TO_BE_REACTIVATED = 2 * 60 * 1000;

const startMusic = () => {

  const track = {
    url: require('../assets/alarm_musics/alarm_music.mpeg'),
    title: 'Terra_79',
    artist: 'rasBoom',
    duration: 166
  };

  TrackPlayer.add([track]);
  
  TrackPlayer.play();

};

const stopMusic = () => {
  TrackPlayer.reset();
};

export const usePlayAlarm = (alarm: Alarm) => {
  
  startMusic();

  const stopAlarm = async () => {

    stopMusic();

    alarm.active = false;
    updateAlarmService(alarm);

    await sleep(MINUTES_TO_BE_REACTIVATED);
    alarm.active = true;
    updateAlarmService(alarm);
  }
            
  Alert.alert('ringg ringg !!...', 'It\'s time !', 
  [
    {
      text: 'STOP', 
      onPress: stopAlarm
    },
  ]);

}