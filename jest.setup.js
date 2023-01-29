global.__reanimatedWorkletInit = () => {};
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-video', ()=> 'ReactNativeVideo')

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');




