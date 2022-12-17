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
  optionsList: Array<{ id: string; option: string }>;
  coffeesList: Array<{ id: string; coffeeName: string; coffeeImage: string }>;
  selectOption: (option: { id: string; option: string }) => void;
  optionSelected: { id: string; option: string };
  coffeeSelected: { id: string; coffeeName: string; coffeeImage: string };
};

const Home: React.FC<Props> = ({
  optionsList,
  selectOption,
  optionSelected,
  coffeesList,
  coffeeSelected,
}) => {
  return (
    <View>
      <ScrollView testID="options_list_id">
        {optionsList.map((optionByList) => (
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
        <Text testID="coffee_name_id">{coffeeSelected.coffeeName}</Text>
      </View>
      <FlatList
        testID="coffees_list_id"
        data={coffeesList}
        renderItem={({ item }) => (
          <View>
            <Image
              testID={`coffee_image_${item.id}_id`}
              source={{ uri: item.coffeeImage }}
            ></Image>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
