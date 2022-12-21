import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import HomeViewModel, { Coffee } from './model';
import {
  AnimatedView,
  CoffeeDetailsWrapper,
  CoffeeImage,
  CoffeeName,
  CoffeePrice,
  CoffeesImagesEmptyWrapper,
  CoffeesImagesList,
  CoffeesImagesWrapper,
  EmptyMessageCoffeesImages,
  ITEM_HEIGHT,
  ListOfOptions,
  Option,
  OptionButton,
  OptionWrapper,
  TryAgainButton,
  TryAgainMessage,
  UnderlineOfOption,
  Wrapper,
} from './styles';

const opacityAnimation = (transY: SharedValue<number>, index: number) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [0.6, 1, 0.6],
    Extrapolate.CLAMP,
  );
};

const scaleAnimation = (transY: SharedValue<number>, index: number) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [0.7, 1, 0.7],
    Extrapolate.CLAMP,
  );
};

const bottomAnimation = (transY: SharedValue<number>, index: number) => {
  'worklet';

  return interpolate(
    transY.value,
    [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
    [-360, 1, -360],
    Extrapolate.CLAMP,
  );
};

const Home: React.FC<HomeViewModel> = ({
  listOfOptions,
  selectOption,
  optionSelected,
  optionList,
  selectedOptionItem,
  tryAgain,
}) => {
  const transY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      transY.value = event.contentOffset.y;
    },
  });

  const renderListOfOptions = () => {
    return (
      <Wrapper style={{ flex: 0.1 }}>
        <ListOfOptions testID="options_list_id">
          {listOfOptions.map((optionByList) => (
            <OptionButton
              key={optionByList.id}
              onPress={() => selectOption(optionByList)}
            >
              <OptionWrapper>
                <Option testID={`option_${optionByList.id}_id`}>
                  {optionByList.option}
                </Option>
                {optionSelected.id === optionByList.id && (
                  <UnderlineOfOption
                    testID={`underline_option_${optionByList.id}_id`}
                  />
                )}
              </OptionWrapper>
            </OptionButton>
          ))}
        </ListOfOptions>
      </Wrapper>
    );
  };

  const renderCoffeeDetails = () => {
    return (
      optionList.length !== 0 && (
        <CoffeeDetailsWrapper>
          <CoffeeName testID="coffee_name_id">
            {selectedOptionItem.coffeeName}
          </CoffeeName>
          <CoffeePrice testID="coffee_price_id">{`R$ ${selectedOptionItem.coffeePrice.toFixed(
            2,
          )}`}</CoffeePrice>
        </CoffeeDetailsWrapper>
      )
    );
  };

  const renderItemCoffee = ({ item, index }: { item: any; index: any }) => {
    return <ItemCoffee index={index} item={item} transY={transY} />;
  };

  const renderCoffeesImages = () => {
    return (
      <CoffeesImagesWrapper>
        {optionList.length === 0 && (
          <CoffeesImagesEmptyWrapper>
            <EmptyMessageCoffeesImages testID="message_option_list_empty_id">
              {"looks like we're out of products"}
            </EmptyMessageCoffeesImages>
            <TryAgainButton testID="button_try_again_id" onPress={tryAgain}>
              <TryAgainMessage>{'try again another time'}</TryAgainMessage>
            </TryAgainButton>
          </CoffeesImagesEmptyWrapper>
        )}
        {optionList.length !== 0 && (
          <CoffeesImagesList
            onScroll={scrollHandler}
            testID="option_list_id"
            data={optionList}
            snapToInterval={ITEM_HEIGHT}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItemCoffee}
          />
        )}
      </CoffeesImagesWrapper>
    );
  };
  return (
    <Wrapper style={{ marginHorizontal: 12, flex: 1 }}>
      {renderListOfOptions()}
      <Wrapper style={{ flex: 0.9 }}>
        {renderCoffeeDetails()}
        {renderCoffeesImages()}
      </Wrapper>
    </Wrapper>
  );
};

const ItemCoffee = ({
  index,
  item,
  transY,
}: {
  index: number;
  item: Coffee;
  transY: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation(transY, index),
      bottom: bottomAnimation(transY, index),
      transform: [
        {
          scale: scaleAnimation(transY, index),
        },
      ],
    };
  });
  return (
    <AnimatedView style={animatedStyle}>
      <CoffeeImage
        testID={`coffee_image_${item.id}_id`}
        source={item.coffeeImage as ImageSourcePropType}
      ></CoffeeImage>
    </AnimatedView>
  );
};

export default Home;
