import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import Alarm from '../../../../model/Alarm';
import useTimePickerViewModel from './TimePickerViewModel';

type Props = {
  alarm: Alarm,
  action: any,
  whenFinish: any,
};

const TimePickerView = (props: Props) => {

  const {date, onChange} = useTimePickerViewModel(props.alarm, props.action, props.whenFinish);

  return (

    <DateTimePicker
      value={date}
      mode="time"
      is24Hour={true}
      onChange={onChange}/>

  );
  
};

export default TimePickerView;