import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const ITEM_HEIGHT = screenHeight / 2;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

type ItemCoffee = {
  id: string;
  coffeeName: string;
  coffeePrice: number;
  coffeeImage: ImageSourcePropType | string;
  optionId: string;
};

interface Option {
  id: string;
  option: string;
}

interface ListOfOption {
  list: Array<ItemCoffee>;
}

type OptionOfList = Option & ListOfOption;

type Props = {
  listOfOptions: Array<OptionOfList>;
  selectOption: (option: Option) => void;
  optionSelected: Option;
  selectedOptionItem: ItemCoffee;
  optionList: Array<ItemCoffee>;
  tryAgain: () => void;
};

const Home: React.FC<Props> = ({
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
      <View style={{ flex: 0.1 }}>
        <ScrollView
          testID="options_list_id"
          horizontal
          style={{ width: screenWidth, height: 22 }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {listOfOptions.map((optionByList) => (
            <TouchableOpacity
              key={optionByList.id}
              onPress={() => selectOption(optionByList)}
            >
              <View
                style={{
                  marginHorizontal: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  testID={`option_${optionByList.id}_id`}
                  style={{ fontSize: 16, lineHeight: 18 }}
                >
                  {optionByList.option}
                </Text>
                {optionSelected.id === optionByList.id && (
                  <View
                    style={{
                      bottom: -6,
                      position: 'absolute',
                      width: '100%',
                      height: 2,
                      backgroundColor: '#000000',
                    }}
                    testID={`underline_option_${optionByList.id}_id`}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderCoffeeDetails = () => {
    return (
      optionList.length !== 0 && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              lineHeight: 27,
              marginBottom: 9,
              textAlign: 'center',
            }}
            testID="coffee_name_id"
          >
            {selectedOptionItem.coffeeName}
          </Text>
          <Text
            style={{ fontSize: 20, lineHeight: 23, textAlign: 'center' }}
            testID="coffee_price_id"
          >{`R$ ${selectedOptionItem.coffeePrice.toFixed(2)}`}</Text>
        </View>
      )
    );
  };

  const renderItemCoffee = ({ item, index }: { item: any; index: any }) => {
    return <ItemCoffee index={index} item={item} transY={transY} />;
  };

  const renderCoffeesImages = () => {
    return (
      <View
        style={{
          height: '70%',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        {optionList.length === 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 60,
            }}
          >
            <Text
              testID="message_option_list_empty_id"
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 23,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {"looks like we're out of products"}
            </Text>
            <TouchableWithoutFeedback
              testID="button_try_again_id"
              onPress={tryAgain}
            >
              <Text style={{ fontSize: 16, lineHeight: 18 }}>
                {'try again another time'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        )}
        {optionList.length !== 0 && (
          <AnimatedFlatList
            onScroll={scrollHandler}
            testID="option_list_id"
            data={optionList}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment="center"
            centerContent
            scrollEventThrottle={16}
            pagingEnabled
            snapToInterval={ITEM_HEIGHT}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItemCoffee}
          />
        )}
      </View>
    );
  };
  return (
    <View style={{ marginHorizontal: 12, flex: 1 }}>
      {renderListOfOptions()}
      <View style={{ flex: 0.9 }}>
        {renderCoffeeDetails()}
        {renderCoffeesImages()}
      </View>
    </View>
  );
};

const ItemCoffee = ({
  index,
  item,
  transY,
}: {
  index: number;
  item: ItemCoffee;
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
    <Animated.View style={animatedStyle}>
      <Image
        testID={`coffee_image_${item.id}_id`}
        source={item.coffeeImage as ImageSourcePropType}
        resizeMode="contain"
        style={{ width: screenWidth, height: 400 }}
      ></Image>
    </Animated.View>
  );
};

export default Home;
