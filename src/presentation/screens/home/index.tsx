import React from 'react';
import { ScrollView, Text, View } from 'react-native';

type Props = {
  optionsList: Array<{ id: string; option: string }>;
};

const Home: React.FC<Props> = ({ optionsList }) => {
  return (
    <View>
      <ScrollView testID="options_list_id">
        {optionsList.map((optionByList) => (
          <View key={optionByList.id}>
            <Text testID={`option_${optionByList.id}_id`}>
              {optionByList.option}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
