import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    time: {
      fontSize: 35,
      color: '#7f7f7f'
    },
    alarmView: {
      flexDirection: 'row',
    },
    alarmLeftInnerView: {
      flexGrow: 1,
    },
    alarmRightInnerView: {
      flexDirection: 'row-reverse', 
      padding: 10,
      alignItems: 'center',
    },
    deleteIconButton: {
      width: 50,
      height: 50,
    },
    deleteButtonView: {
      flexDirection: 'row-reverse', 
      alignItems: 'center',
    },
    swipeableContainer: {
      flex:1,
    },
    periodicity: {
      color: '#a4a4a4'
    }
  });