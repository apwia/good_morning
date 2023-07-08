import { useEffect } from "react";

import { startBackgroundTask } from "../tasks/BackgroundScheduledTask";
import { createTable, getDbConnection } from "../repository/DbRepository";
import TrackPlayer from "react-native-track-player";

const useStartUp = () => {

  useEffect(() => {
    
    loadData();
    
    setupPlayer();

    startBackgroundTask(); // stopBackgroundTask();

  }, []);
  
}

const loadData = async () => {

  try {

    const db = await getDbConnection();

    await createTable(db);

  } catch (error) {
    console.error(error);
  }
  
};

const setupPlayer = async () => {

  try {

    console.log('setting up the player');

    await TrackPlayer.setupPlayer();

  } catch(error) {

    if(error == 'Error: The player has already been initialized via setupPlayer.')
      return;

    console.log('setup player problems :/ ' + error);
  
  }

};

export default useStartUp;