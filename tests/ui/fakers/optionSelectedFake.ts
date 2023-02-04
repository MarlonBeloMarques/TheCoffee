const getOptionSelectedFake = (id = '1') => {
  return {
    id,
    option: 'products',
    emptyMessage: "looks like we're out of products",
  };
};

export default getOptionSelectedFake;
