import React from 'react';
import { ViewabilityConfigCallbackPair } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';
import * as Utils from '~/presentation/helpers/utils';
import {
  Option,
  OptionOfList,
  Product,
} from '../../../../src/presentation/viewModels/model/homeViewModel';
import getListOfOptionsFake from '../../fakers/listOfOptionsFake';
import getOptionSelectedFake from '../../fakers/optionSelectedFake';
import getOptionListFake from '../../fakers/optionListFake';
import getSelectedOptionItemStub from '../../stubs/selectedOptionItemStub';
import getEventDataStub from '../../stubs/eventDataStub';
import { getTransYStub } from '../../helpers/testFactories';

describe('UI: Home', () => {
  test('should show options list component successfully', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const optionsList = getByTestId('options_list_id');

    expect(optionsList).toBeTruthy();
  });

  test('should show options of list with success', () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { getByTestId },
    } = makeSut([], {} as Product, listOfOptions);

    listOfOptions.forEach((optionByList) => {
      const option = getByTestId(`option_${optionByList.id}_id`);
      expect(option.props.children).toEqual(optionByList.option);
    });
  });

  test('should press the second option from the list successfully', () => {
    const listOfOptions = getListOfOptionsFake();
    const {
      sut: { getByTestId },
      selectOption,
    } = makeSut([], {} as Product, listOfOptions);

    const optionSelected = getByTestId(`option_2_id`);

    fireEvent.press(optionSelected);

    expect(selectOption).toHaveBeenCalledTimes(1);
    expect(selectOption).toHaveBeenCalledWith(listOfOptions[1]);
  });

  test('should show underline of option selected with success', async () => {
    const optionSelected = getOptionSelectedFake('2');
    const listOfOptions = getListOfOptionsFake();

    const {
      sut: { getByTestId, queryByTestId },
    } = makeSut([], {} as Product, listOfOptions, optionSelected);
    const underlineOptionSelected = getByTestId(`underline_option_2_id`);
    const underlineOptionOther = queryByTestId(`underline_option_1_id`);

    expect(underlineOptionSelected).toBeTruthy();
    expect(underlineOptionOther).not.toBeTruthy();
  });

  test('should show products list component with success', async () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList);

    const productsList = getByTestId('option_list_id');

    expect(productsList).toBeTruthy();
  });

  test('should show images product with success', async () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList);

    optionList.forEach(({ productImage, id }) => {
      const product = getByTestId(`product_image_${id}_id`);
      expect(product.type).toEqual('Image');
      expect(product.props.source).toEqual(productImage);
    });
  });

  test('should show price of product in correct pattern', () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList, optionList[0]);

    const productPrice = getByTestId('product_price_id');

    expect(productPrice.props.children).toEqual(
      `R$ ${optionList[0].productPrice.toFixed(2)}`,
    );
  });

  test('should not show products list if optionList is empty', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();
    const productsList = queryByTestId('option_list_id');

    expect(productsList).not.toBeTruthy();
  });

  test('should show message of option list empty', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const messageOptionListEmpty = getByTestId('message_option_list_empty_id');

    expect(messageOptionListEmpty).toBeTruthy();
    expect(messageOptionListEmpty.props.children).toEqual(
      "looks like we're out of products",
    );
  });

  test('should show icon of option list empty', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const iconOptionListEmpty = getByTestId('icon_option_list_empty_id');

    expect(iconOptionListEmpty).toBeTruthy();
  });

  test('should show message try again if optionList is empty', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const messageOptionListEmpty = getByTestId('message_option_list_empty_id');

    expect(messageOptionListEmpty).toBeTruthy();
  });

  test('should not show name product and price if selectedOptionItem and optionList are empty', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();

    const productName = queryByTestId('product_name_id');
    const productPrice = queryByTestId('product_price_id');

    expect(productName).not.toBeTruthy();
    expect(productPrice).not.toBeTruthy();
  });

  test('should call scrollHandler when scrolled products images list', () => {
    const scrollHandler = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      scrollHandler,
    );

    const optionList = getByTestId('option_list_id');

    fireEvent.scroll(optionList, getEventDataStub());

    expect(scrollHandler).toHaveBeenCalled();
  });

  test('should not call scrollHandler if not scrolled products images list', () => {
    const scrollHandler = jest.fn();
    makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      scrollHandler,
    );

    expect(scrollHandler).not.toHaveBeenCalled();
  });

  test('should set viewabilityConfigCallbackPairs of ProductsImagesList with the same value received by param', async () => {
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
    );

    const productsImagesList = getByTestId('option_list_id');

    await waitFor(() => {
      expect(
        productsImagesList.props.viewabilityConfigCallbackPairs[0]
          .viewabilityConfig,
      ).toEqual(
        viewabilityConfigCallbackPairsStub.current[0].viewabilityConfig,
      );
    });
  });

  test('should call setSelectedOption when press the product image', async () => {
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImage = getByTestId('product_image_1_id');

    fireEvent.press(productImage);

    expect(setSelectedOption).toHaveBeenCalledTimes(1);
  });

  test('should update marginBottom style of ItemProduct if is last list position', async () => {
    const optionList = getOptionListFake();
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      optionList,
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const anyProductImageWrapper = getByTestId(`product_image_wrapper_1_id`);
    const lastProductImageWrapper = getByTestId(
      `product_image_wrapper_${optionList.length - 1}_id`,
    );

    expect(anyProductImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 0,
    });
    expect(lastProductImageWrapper.props.style).toEqual({
      marginBottom: 26,
      marginTop: 0,
    });
  });

  test('should update marginTop style of ItemProduct if is first list position', async () => {
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const anyProductImageWrapper = getByTestId(`product_image_wrapper_1_id`);
    const firstProductImageWrapper = getByTestId(
      `product_image_wrapper_${0}_id`,
    );

    expect(anyProductImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 0,
    });
    expect(firstProductImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 26,
    });
  });

  test('should call setSelectedOption with correct param when press the product image', async () => {
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImage = getByTestId('product_image_1_id');

    fireEvent.press(productImage);

    expect(setSelectedOption).toHaveBeenCalledTimes(1);
    expect(setSelectedOption).toHaveBeenCalledWith(getOptionListFake()[0]);
  });

  test('should the height product image equal to 400 if platform is equal iOS', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('ios');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImage = getByTestId('product_image_1_id');

    expect(productImage.props.style[0].height).toEqual(400);
  });

  test('should the height product image equal to 533.6 if platform is equal android', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('android');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImage = getByTestId('product_image_1_id');

    expect(productImage.props.style[0].height).toEqual(533.6);
  });

  test('top margin of product details should equal 100 if platform equals ios', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('ios');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub('any_id'),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productDetailsWrapper = getByTestId('product_details_id');

    expect(productDetailsWrapper.props.style[0].marginTop).toEqual(100);
  });

  test('top margin of product details should equal 60 if platform equals android', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('android');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub('any_id'),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productDetailsWrapper = getByTestId('product_details_id');

    expect(productDetailsWrapper.props.style[0].marginTop).toEqual(60);
  });

  test('bottom margin of product image wrapper should equal 26 if platform equals ios', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('ios');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImageWrapper = getByTestId(
      `product_image_wrapper_${getOptionListFake().length - 1}_id`,
    );

    expect(productImageWrapper.props.style.marginBottom).toEqual(26);
  });

  test('bottom margin of product image wrapper should equal 40 if platform equals android', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('android');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const productImageWrapper = getByTestId(
      `product_image_wrapper_${getOptionListFake().length - 1}_id`,
    );

    expect(productImageWrapper.props.style.marginBottom).toEqual(40);
  });

  test('snapToInterval of products images list should equal 635 if platform equals ios', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('ios');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const optionList = getByTestId('option_list_id');

    expect(optionList.props.snapToInterval).toEqual(635.2380952380952);
  });

  test('snapToInterval of products images list should equal 555 if platform equals android', async () => {
    jest.spyOn(Utils, 'getOs').mockReturnValue('android');
    const setSelectedOption = jest.fn();
    const viewabilityConfigCallbackPairsStub =
      getViewabilityConfigCallbackPairsStub();
    const {
      sut: { getByTestId },
    } = makeSut(
      getOptionListFake(),
      getSelectedOptionItemStub(),
      [],
      getOptionSelectedFake(),
      () => {},
      viewabilityConfigCallbackPairsStub,
      setSelectedOption,
    );

    const optionList = getByTestId('option_list_id');

    expect(optionList.props.snapToInterval).toEqual(555.8333333333334);
  });
});

const makeSut = (
  optionList: Array<Product> = [],
  selectedOptionItem: Product = getSelectedOptionItemStub(),
  listOfOptions: Array<OptionOfList> = [],
  optionSelected: Option = getOptionSelectedFake(),
  scrollHandler = () => {},
  viewabilityConfigCallbackPairs = {
    current: [
      { onViewableItemsChanged: {}, viewabilityConfig: {} },
    ] as Array<ViewabilityConfigCallbackPair>,
  },
  setSelectedOption = () => {},
) => {
  const selectOption = jest.fn();

  const sut = render(
    <Home
      listOfOptions={listOfOptions}
      selectOption={selectOption}
      optionSelected={optionSelected}
      optionList={optionList}
      selectedOptionItem={selectedOptionItem}
      scrollHandler={scrollHandler}
      transY={getTransYStub()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      setSelectedOption={setSelectedOption}
    />,
  );

  return { sut, selectOption };
};

const getViewabilityConfigCallbackPairsStub = () => {
  return {
    current: [
      {
        onViewableItemsChanged: () => {},
        viewabilityConfig: {
          itemVisiblePercentThreshold: 1,
          minimumViewTime: 1,
          viewAreaCoveragePercentThreshold: 1,
          waitForInteraction: true,
        },
      },
    ] as Array<ViewabilityConfigCallbackPair>,
  };
};
