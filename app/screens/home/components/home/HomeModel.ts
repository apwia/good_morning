import React from "react";
import Alarm from "../../../../model/Alarm";

type HomeModel = {
    alarms: Alarm[],
    addAction: any,
    showTimePick: boolean,
    setShowTimePick: React.Dispatch<React.SetStateAction<boolean>>,
    newAlarm: Alarm,
    setNewAlarm: React.Dispatch<React.SetStateAction<Alarm>>,
    openTimePickDialog: any,
    setShouldRefreshAlarms: React.Dispatch<React.SetStateAction<boolean>>,
}

export default HomeModel;