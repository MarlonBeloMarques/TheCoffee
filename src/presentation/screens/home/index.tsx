import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ItemCoffee } from '~/presentation/components';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';

import HomeViewModel from './model';
import {
  CoffeeDetailsWrapper,
  CoffeeName,
  CoffeePrice,
  CoffeesImagesEmptyWrapper,
  CoffeesImagesList,
  CoffeesImagesWrapper,
  EmptyMessageCoffeesImages,
  ListOfOptions,
  Option,
  OptionButton,
  OptionWrapper,
  TryAgainButton,
  TryAgainMessage,
  UnderlineOfOption,
  Wrapper,
} from './styles';

const Home: React.FC<HomeViewModel> = ({
  listOfOptions,
  selectOption,
  optionSelected,
  optionList,
  selectedOptionItem,
  tryAgain,
  scrollHandler,
  transY,
  viewabilityConfigCallbackPairs,
}) => {
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
            <Icon testID="icon_option_list_empty_id" name="coffee" size={96} />
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
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
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

export default Home;
