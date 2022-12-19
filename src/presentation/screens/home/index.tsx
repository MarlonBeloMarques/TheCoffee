import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

interface ItemCoffee {
  id: string;
  coffeeName: string;
  coffeePrice: number;
  coffeeImage: string;
  optionId: string;
}

type Props = {
  listOfOptions: Array<{
    id: string;
    option: string;
    list: Array<ItemCoffee>;
  }>;
  selectOption: (option: { id: string; option: string }) => void;
  optionSelected: { id: string; option: string };
  selectedOptionItem: {
    id: string;
    coffeeName: string;
    coffeePrice: number;
    coffeeImage: string;
  };
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
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.6,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              lineHeight: 27,
              marginBottom: 9,
            }}
            testID="coffee_name_id"
          >
            {selectedOptionItem.coffeeName}
          </Text>
          <Text
            style={{ fontSize: 20, lineHeight: 23 }}
            testID="coffee_price_id"
          >{`R$ ${selectedOptionItem.coffeePrice.toFixed(2)}`}</Text>
        </View>
      )
    );
  };

  const renderCoffeesImages = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
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
          <FlatList
            testID="option_list_id"
            data={optionList}
            showsVerticalScrollIndicator={false}
            snapToAlignment="center"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Image
                  testID={`coffee_image_${item.id}_id`}
                  source={{ uri: item.coffeeImage }}
                  resizeMode="contain"
                  style={{ width: screenWidth, height: 400 }}
                ></Image>
              </View>
            )}
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

export default Home;
