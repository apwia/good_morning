import { useState } from "react";

import Moment from 'moment';

import AlarmModel from "./AlarmModel"
import Alarm from "../../../../model/Alarm";
import { deleteAlarmService, updateAlarmService } from "../../../../services/DbService";
import { Alert } from "react-native";

const useAlarmViewModel = (alarm: Alarm, setShouldRefreshAlarms: React.Dispatch<React.SetStateAction<boolean>>): AlarmModel => {

  const [showTimePick, setShowTimePick] = useState(false);

  const [isActive, setIsActive] = useState(alarm.active);

  const removeAction = () => {
    deleteAlarmService(alarm.id);
    setShouldRefreshAlarms(true); 
  };
  
  const updateAction = (alarm: Alarm) => {
    updateAlarmService(alarm);
    setShouldRefreshAlarms(true);
  };
  
  const toggleActiveAction = () => {
    alarm.active = !alarm.active;
    updateAlarmService(alarm);
    setIsActive(!isActive);
  };
  
  const displayedTime = Moment(new Date(alarm.time)).format('HH:mm');

  const removeAlarmAlert = () => {
    Alert.alert('Hey...', 'Do you really want to delete this alarm ?', 
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Alarm keeped...'),
        style: 'cancel',
      },
      {
        text: 'OK', 
        onPress: () => removeAction()
      },
    ]);
  };

  return {
    updateAction,
    toggleActiveAction,
    showTimePick,
    setShowTimePick,
    isActive,
    displayedTime,
    removeAlarmAlert,
  }
}

export default useAlarmViewModel;