import React from "react";

type AlarmModel = {
	updateAction: any,
	toggleActiveAction: any,
	showTimePick: boolean,
	setShowTimePick: React.Dispatch<React.SetStateAction<boolean>>
	isActive: boolean, 
	displayedTime: string,
	removeAlarmAlert: any,
}

export default AlarmModel;