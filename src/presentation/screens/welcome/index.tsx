import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { WelcomeVideo } from '~/presentation/assets/videos';

const Welcome: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Video testID="video_id" source={WelcomeVideo} />
    </View>
  );
};

export default Welcome;
