import React from 'react';
import Video from 'react-native-video';
import { WelcomeVideo } from '~/presentation/assets/videos';

const Welcome: React.FC = () => {
  return (
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
  );
};

export default Welcome;
