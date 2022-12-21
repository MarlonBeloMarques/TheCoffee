const getEventDataStub = () => {
  return {
    nativeEvent: {
      contentOffset: {
        y: 500,
      },
      contentSize: {
        height: 500,
        width: 100,
      },
      layoutMeasurement: {
        height: 100,
        width: 100,
      },
    },
  };
};

export default getEventDataStub;
