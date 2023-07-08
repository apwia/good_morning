import { Platform, Linking } from 'react-native';

import Moment from 'moment';
import BackgroundService from 'react-native-background-actions';

import { getAlarms, getDbConnection } from '../repository/DbRepository';
import { usePlayAlarm } from '../hooks/usePlayAlarm';

const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

BackgroundService.on('expiration', () => {
  console.log('iOS: I am being closed!');
});

const taskRandom = async (taskData: any) => {
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
    );
  }
  await new Promise(async () => {
    // For loop with a delay
    const { delay } = taskData;

    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log('Searching for new alarms... ', i);

      const db = await getDbConnection();
      const alarms = await getAlarms(db);
      const now = Moment(new Date()).format('HHmm');

      for (let i = 0; i < alarms.length; i++) {

        if(alarms[i].active && Moment(new Date(alarms[i].time)).format('HHmm') === now) {
         
          usePlayAlarm(alarms[i]);
          
        }
        
      }            

      console.log('Finish looking up for new alarms... ', i);
      await sleep(delay);
    }
  });
};

function handleOpenURL(evt: any) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

const options = {
  taskName: 'AlarmTask',
  taskTitle: 'VerifyToActiveAlarm',
  taskDesc: 'Task to check if there are alarms to be activated.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 5000,
  },
};

export const startBackgroundTask = () => {

  if(BackgroundService.isRunning())
    return;

  new Promise<void>(async() => {
    try {
      console.log('Trying to start background service');
      await BackgroundService.start(taskRandom, options);
      console.log('Successful start!');
    } catch (e) {
      console.log('Error', e);
    }
  });

};


export const stopBackgroundTask = () => {
    
  if(!BackgroundService.isRunning())
    return;

  new Promise<void>(async() => {
    console.log('Stop background service');
    await BackgroundService.stop();
  });
    
};
