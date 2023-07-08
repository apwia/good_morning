import { useState } from "react";
import TimePickerModel from "./TimePickerModel";
import Alarm from "../../../../model/Alarm";

const useTimePickerViewModel = (alarm: Alarm, action: any, whenFinish: any):TimePickerModel => {

  const [date, setDate] = useState(new Date(alarm.time));

  const onChange = (event: any, selectedDate: any) => {
    
    if(event.type === "set"){

      setDate(selectedDate);
      alarm.time = selectedDate;
      action(alarm);
      
    }

    whenFinish();

  };
  
  return {date, onChange};
};

export default useTimePickerViewModel;