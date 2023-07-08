import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Linking, } from 'react-native';

import styles from './AboutStyles'
import  useAboutViewModel from './AboutViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutView = () => {

  const {title, texts, urlGitHub} = useAboutViewModel();

  return (

    <SafeAreaView>
      <View style={styles.container}>

        <Text style={styles.title}>{title}</Text>

        <FlatList 
          data={texts} 
          renderItem={({item}) => <Text style={styles.description}>{item}</Text> }
          keyExtractor={item => item.toString()}
        />

        <TouchableOpacity onPress={() => Linking.openURL(urlGitHub)} testID='link'>
          <Image 
            style={styles.image}
            source={require('../../../assets/images/GitHub.png')}/>
        </TouchableOpacity>

      </View>
    </SafeAreaView>

  );
};

export default AboutView;
