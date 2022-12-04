import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  optionsList: Array<{ id: string; option: string }>;
  coffeesList: Array<{ id: string; coffeeImage: string }>;
  selectOption: (option: { id: string; option: string }) => void;
  optionSelected: { id: string; option: string };
};

const Home: React.FC<Props> = ({
  optionsList,
  selectOption,
  optionSelected,
  coffeesList,
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
      <FlatList
        testID="coffees_list_id"
        data={coffeesList}
        renderItem={() => <View testID="coffee_image_id"></View>}
      />
    </View>
  );
};

export default Home;
