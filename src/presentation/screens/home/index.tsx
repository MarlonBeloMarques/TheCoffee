import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  listOfOptions: Array<{
    id: string;
    option: string;
    list: Array<{
      id: string;
      coffeeName: string;
      coffeePrice: number;
      coffeeImage: string;
      optionId: string;
    }>;
  }>;
  selectOption: (option: { id: string; option: string }) => void;
  optionSelected: { id: string; option: string };
  selectedOptionItem: {
    id: string;
    coffeeName: string;
    coffeePrice: number;
    coffeeImage: string;
  };
  optionList: Array<{
    id: string;
    coffeeName: string;
    coffeePrice: number;
    coffeeImage: string;
    optionId: string;
  }>;
};

const Home: React.FC<Props> = ({
  listOfOptions,
  selectOption,
  optionSelected,
  optionList,
  selectedOptionItem,
}) => {
  return (
    <View>
      <ScrollView testID="options_list_id">
        {listOfOptions.map((optionByList) => (
          <TouchableOpacity
            key={optionByList.id}
            onPress={() => selectOption(optionByList)}
          >
            <Text testID={`option_${optionByList.id}_id`}>
              {optionByList.option}
            </Text>
            {optionSelected.id === optionByList.id && (
              <View testID={`underline_option_${optionByList.id}_id`} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <Text testID="coffee_name_id">{selectedOptionItem.coffeeName}</Text>
        <Text testID="coffee_price_id">{`R$ ${selectedOptionItem.coffeePrice.toFixed(
          2,
        )}`}</Text>
      </View>
      {optionList.length !== 0 && (
        <FlatList
          testID="coffees_list_id"
          data={optionList}
          renderItem={({ item }) => (
            <View>
              <Image
                testID={`coffee_image_${item.id}_id`}
                source={{ uri: item.coffeeImage }}
              ></Image>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Home;
