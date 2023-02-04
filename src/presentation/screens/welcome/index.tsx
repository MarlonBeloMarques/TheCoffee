import React from 'react';
import { WelcomeVideo } from '~/presentation/assets/videos';
import { BackgroundVideo, Wrapper } from './styles';

const Welcome: React.FC = () => {
  return (
    <>
      <Wrapper />
      <BackgroundVideo
        testID="video_id"
        source={WelcomeVideo}
        resizeMode="cover"
        muted
      />
    </>
  );
};

export default Welcome;
