import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  optionsList: Array<{ id: string; option: string }>;
  selectOption: (option: { id: string; option: string }) => void;
  optionSelected: { id: string; option: string };
};

const Home: React.FC<Props> = ({
  optionsList,
  selectOption,
  optionSelected,
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
    </View>
  );
};

export default Home;
