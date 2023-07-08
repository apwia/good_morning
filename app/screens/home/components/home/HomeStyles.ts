import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 25,
      flexGrow: 1,
      color: '#717171'
    },
    titleView: {
      flexDirection: 'row',
      padding: 15
    },
    background: {
      padding: 5,
      flex: 1,
    },
    addButton: {
      width: 65,
      height: 65,
    },
    addButtonView: {
      alignItems: 'center',
    },
    aboutImage: {
      width: 28,
      height: 28,
      flexDirection: 'row-reverse', 
      padding: 10,
      alignItems: 'center'
    }
  });