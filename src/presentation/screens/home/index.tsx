import React from 'react';
import { getItemHeight } from '~/presentation/helpers/animations';
import { getOs } from '~/presentation/helpers/utils';
import { ItemCoffeeDecorator } from '../../../presentation/decorators';
import HomeView from './model';

import {
  EmptyMessageProductsImages,
  IconProductEmpty,
  ListOfOptions,
  Option,
  OptionButton,
  OptionWrapper,
  ProductDetailsWrapper,
  ProductName,
  ProductPrice,
  ProductsImagesEmptyWrapper,
  ProductsImagesList,
  ProductsImagesWrapper,
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

  const renderProductDetails = () => {
    return (
      selectedOptionItem?.id &&
      optionList.length !== 0 && (
        <ProductDetailsWrapper os={getOs()} testID="product_details_id">
          <ProductName testID="product_name_id">
            {selectedOptionItem.productName}
          </ProductName>
          <ProductPrice testID="product_price_id">{`R$ ${selectedOptionItem.productPrice.toFixed(
            2,
          )}`}</ProductPrice>
        </ProductDetailsWrapper>
      )
    );
  };

  const renderItemProduct = ({ item, index }: { item: any; index: any }) => {
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

  const renderMessageIfProductsImagesIsEmpty = () => {
    if (optionList.length === 0) {
      return (
        <ProductsImagesEmptyWrapper>
          <IconProductEmpty testID="icon_option_list_empty_id" />
          <EmptyMessageProductsImages testID="message_option_list_empty_id">
            {optionSelected.emptyMessage}
          </EmptyMessageProductsImages>
          <TryAgainMessage>{'try again another time'}</TryAgainMessage>
        </ProductsImagesEmptyWrapper>
      );
    }
  };

  const renderProductsImages = () => {
    return (
      <ProductsImagesWrapper>
        {optionList.length !== 0 && (
          <ProductsImagesList
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            onScroll={scrollHandler}
            testID="option_list_id"
            data={optionList}
            snapToInterval={getItemHeight(getOs())}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItemProduct}
          />
        )}
      </ProductsImagesWrapper>
    );
  };
  return (
    <Wrapper style={{ marginHorizontal: 12, flex: 1 }}>
      {renderListOfOptions()}
      <Wrapper style={{ flex: 1 }}>
        {renderProductDetails()}
        {renderProductsImages()}
        {renderMessageIfProductsImagesIsEmpty()}
      </Wrapper>
    </Wrapper>
  );
};

export default Home;
