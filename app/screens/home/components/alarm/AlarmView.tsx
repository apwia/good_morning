import React from 'react';

import { Animated, Switch, Image, Text, TouchableOpacity, View } from 'react-native';

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import Styles from './AlarmStyles';
import useAlarmViewModel from './AlarmViewModel';
import Alarm from '../../../../model/Alarm';
import TimePickerView from '../time_picker/TimePickerView';

type Props = {alarm: Alarm, setShouldRefreshAlarms: React.Dispatch<React.SetStateAction<boolean>>};

const AlarmView = (props: Props) => {
  
  const {updateAction, toggleActiveAction, showTimePick, setShowTimePick, isActive, displayedTime, removeAlarmAlert} 
    = useAlarmViewModel(props.alarm, props.setShouldRefreshAlarms);

  const swipeAction = (_progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    
    const scale = dragX.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (

      <Animated.View style={[{transform: [{scale: scale}]}, Styles.deleteButtonView, ]}>

        <TouchableOpacity onPress={removeAlarmAlert}>
          <Image 
            style={Styles.deleteIconButton}
            source={require("../../../../assets/images/TrashBin.png")}/>
        </TouchableOpacity>
      </Animated.View>
    );

  };

  return (
    <GestureHandlerRootView>
      <Swipeable
          friction={5}
          renderLeftActions={swipeAction}
          containerStyle={Styles.swipeableContainer}>

        <View style={Styles.alarmView}>

          <View style={Styles.alarmLeftInnerView}>

            <Text onPress={() => {setShowTimePick(true)}} style={Styles.time}>
              {displayedTime}
            </Text>

            <Text style={Styles.periodicity}>{props.alarm.periodicity}</Text>
            
            {showTimePick && 
              <TimePickerView 
                alarm={props.alarm} 
                action={updateAction} 
                whenFinish={()=>{setShowTimePick(false)}} />}

          </View>

          <View style={Styles.alarmRightInnerView}>
            <Switch onValueChange={() => {toggleActiveAction()}} value={isActive} testID='switch'/>
          </View>

        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default AlarmView;