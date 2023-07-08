import React from 'react';

import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import useHomeViewModel from './HomeViewModel';
import Alarm from '../../../../model/Alarm';
import Styles from './HomeStyles';
import AlarmView from '../alarm/AlarmView';
import SeparatorView from '../separator/SeparatorView';
import TimePickerView from '../time_picker/TimePickerView';

const HomeView = ( {navigation}: any) => {

  const {alarms, addAction, showTimePick, setShowTimePick, newAlarm, openTimePickDialog, setShouldRefreshAlarms} = 
    useHomeViewModel();

  const RenderAlarm = (renderProps: Alarm) => (
    <AlarmView 
      key={renderProps.id}
      alarm={renderProps}
      setShouldRefreshAlarms={setShouldRefreshAlarms}/>
  );
  
  return (

    <SafeAreaView style={Styles.background}>
    
    <View style={Styles.titleView}>
      <Text style={Styles.title}>Alarm Clock</Text>

      <TouchableOpacity onPress={()=> navigation.navigate('About')} testID='navigateToAbout'>
        <Image source={require("../../../../assets/images/AboutIcon.png")} style={Styles.aboutImage} />
      </TouchableOpacity>

    </View>


      <FlatList
        data={alarms}
        renderItem={({ item }) => <RenderAlarm {...item}/> }
        keyExtractor={alarm => alarm.id+""}
        ItemSeparatorComponent={() => <SeparatorView />}/>

      <View style={Styles.addButtonView}>

        <TouchableOpacity onPress={openTimePickDialog}>
          <Image style={Styles.addButton} source={require("../../../../assets/images/Add.png")}/>
        </TouchableOpacity>

        {showTimePick && 
          <TimePickerView
            alarm={newAlarm} 
            action={addAction} 
            whenFinish={() => {setShowTimePick(false)}} />}
        
      </View>

    </SafeAreaView>
);
}

export default HomeView;