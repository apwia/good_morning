import React from 'react';
import HomeView from './components/home/HomeView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Home = (props: NativeStackScreenProps<any>) => <HomeView {...props}/>;

export default Home;