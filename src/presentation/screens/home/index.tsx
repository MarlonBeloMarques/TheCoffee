import React from 'react';
import { ITEM_HEIGHT } from '~/presentation/helpers/animations';
import { ItemCoffeeDecorator } from '../../../presentation/decorators';

import { HomeView } from './model';
import {
  CoffeeDetailsWrapper,
  CoffeeName,
  CoffeePrice,
  CoffeesImagesEmptyWrapper,
  CoffeesImagesList,
  CoffeesImagesWrapper,
  EmptyMessageCoffeesImages,
  IconCoffeeEmpty,
  ListOfOptions,
  Option,
  OptionButton,
  OptionWrapper,
  TryAgainMessage,
  UnderlineOfOption,
  Wrapper,
} from './styles';

const Home: React.FC<HomeView> = ({
  listOfOptions,
  selectOption,
  optionSelected,
  optionList,
  selectedOptionItem,
  scrollHandler,
  transY,
  setSelectedOption,
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
    return (
      <ItemCoffeeDecorator
        index={index}
        item={item}
        optionList={optionList}
        setSelectedOption={setSelectedOption}
        transY={transY}
      />
    );
  };

  const renderMessageIfCoffeesImagesIsEmpty = () => {
    if (optionList.length === 0) {
      return (
        <CoffeesImagesEmptyWrapper>
          <IconCoffeeEmpty testID="icon_option_list_empty_id" />
          <EmptyMessageCoffeesImages testID="message_option_list_empty_id">
            {optionSelected.emptyMessage}
          </EmptyMessageCoffeesImages>
          <TryAgainMessage>{'try again another time'}</TryAgainMessage>
        </CoffeesImagesEmptyWrapper>
      );
    }
  };

  const renderCoffeesImages = () => {
    return (
      <CoffeesImagesWrapper>
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
        {renderMessageIfCoffeesImagesIsEmpty()}
      </Wrapper>
    </Wrapper>
  );
};

export default Home;
