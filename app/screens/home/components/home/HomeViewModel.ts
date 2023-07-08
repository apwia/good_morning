import { useEffect, useState } from "react";

import HomeModel from "./HomeModel";
import Alarm from "../../../../model/Alarm";
import { getAlarmsService, saveAlarmService } from "../../../../services/DbService";

const useHomeViewModel = ():HomeModel => {

  const [showTimePick, setShowTimePick] = useState(false);
  const [newAlarm, setNewAlarm] = useState<Alarm>({"id" : 0, "active" : false,  "time" : new Date(), "periodicity" : ""});
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [shouldRefreshAlarms, setShouldRefreshAlarms] = useState(true);

  const addAction = (alarm: Alarm) => {

    saveAlarmService(alarm);    
    setShouldRefreshAlarms(true);
    
  };
  
  const openTimePickDialog = () => {
    
    setNewAlarm({"id" : 0, "active" : true,  "time" : new Date(), "periodicity" : "Every Day"});
    setShowTimePick(true);

  };

  useEffect(() => {

    const refreshAlarms = async () => {

      try {
  
        const sortedAlarmsList = await getAlarmsService();
    
        setAlarms(sortedAlarmsList);

        setShouldRefreshAlarms(false);

        console.log(alarms);

      } catch (error) {
        console.error(error);
      }
    
    };

    refreshAlarms();

  }, [shouldRefreshAlarms]);

  return ({
    alarms,
    addAction,
    showTimePick,
    setShowTimePick,
    newAlarm, 
    setNewAlarm,
    openTimePickDialog,
    setShouldRefreshAlarms
  });
}

export default useHomeViewModel;