/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./track.playes.service'));

AppRegistry.registerComponent(appName, () => App);
