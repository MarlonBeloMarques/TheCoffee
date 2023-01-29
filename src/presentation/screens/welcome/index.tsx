import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { WelcomeVideo } from '~/presentation/assets/videos';

const Welcome: React.FC = () => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      />
      <Video
        testID="video_id"
        source={WelcomeVideo}
        resizeMode="cover"
        audioOnly={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    </>
  );
};

export default Welcome;
