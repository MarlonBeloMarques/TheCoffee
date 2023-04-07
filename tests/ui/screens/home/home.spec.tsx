import React from 'react';
import { ViewabilityConfigCallbackPair } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';
import * as Utils from '~/presentation/helpers/utils';
import {
  Coffee,
  Option,
  OptionOfList,
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
    } = makeSut([], {} as Coffee, listOfOptions);

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
    } = makeSut([], {} as Coffee, listOfOptions);

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
    } = makeSut([], {} as Coffee, listOfOptions, optionSelected);
    const underlineOptionSelected = getByTestId(`underline_option_2_id`);
    const underlineOptionOther = queryByTestId(`underline_option_1_id`);

    expect(underlineOptionSelected).toBeTruthy();
    expect(underlineOptionOther).not.toBeTruthy();
  });

  test('should show coffees list component with success', async () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList);

    const coffeesList = getByTestId('option_list_id');

    expect(coffeesList).toBeTruthy();
  });

  test('should show images coffee with success', async () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList);

    optionList.forEach(({ coffeeImage, id }) => {
      const coffee = getByTestId(`coffee_image_${id}_id`);
      expect(coffee.type).toEqual('Image');
      expect(coffee.props.source).toEqual(coffeeImage);
    });
  });

  test('should show price of coffee in correct pattern', () => {
    const optionList = getOptionListFake();
    const {
      sut: { getByTestId },
    } = makeSut(optionList, optionList[0]);

    const coffeePrice = getByTestId('coffee_price_id');

    expect(coffeePrice.props.children).toEqual(
      `R$ ${optionList[0].coffeePrice.toFixed(2)}`,
    );
  });

  test('should not show coffees list if optionList is empty', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();
    const coffeesList = queryByTestId('option_list_id');

    expect(coffeesList).not.toBeTruthy();
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

  test('should not show name coffee and price if optionList is empty', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();

    const coffeeName = queryByTestId('coffee_name_id');
    const coffeePrice = queryByTestId('coffee_price_id');

    expect(coffeeName).not.toBeTruthy();
    expect(coffeePrice).not.toBeTruthy();
  });

  test('should not show name coffee and price if optionList is empty', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();

    const coffeeName = queryByTestId('coffee_name_id');
    const coffeePrice = queryByTestId('coffee_price_id');

    expect(coffeeName).not.toBeTruthy();
    expect(coffeePrice).not.toBeTruthy();
  });

  test('should call scrollHandler when scrolled coffees images list', () => {
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

  test('should not call scrollHandler if not scrolled coffees images list', () => {
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

  test('should set viewabilityConfigCallbackPairs of CoffeesImagesList with the same value received by param', async () => {
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

    const coffeesImagesList = getByTestId('option_list_id');

    await waitFor(() => {
      expect(
        coffeesImagesList.props.viewabilityConfigCallbackPairs[0]
          .viewabilityConfig,
      ).toEqual(
        viewabilityConfigCallbackPairsStub.current[0].viewabilityConfig,
      );
    });
  });

  test('should call setSelectedOption when press the coffee image', async () => {
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

    const coffeeImage = getByTestId('coffee_image_1_id');

    fireEvent.press(coffeeImage);

    expect(setSelectedOption).toHaveBeenCalledTimes(1);
  });

  test('should update marginBottom style of ItemCoffee if is last list position', async () => {
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

    const anyCoffeeImageWrapper = getByTestId(`coffee_image_wrapper_1_id`);
    const lastCoffeeImageWrapper = getByTestId(
      `coffee_image_wrapper_${optionList.length - 1}_id`,
    );

    expect(anyCoffeeImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 0,
    });
    expect(lastCoffeeImageWrapper.props.style).toEqual({
      marginBottom: 26,
      marginTop: 0,
    });
  });

  test('should update marginTop style of ItemCoffee if is first list position', async () => {
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

    const anyCoffeeImageWrapper = getByTestId(`coffee_image_wrapper_1_id`);
    const firstCoffeeImageWrapper = getByTestId(`coffee_image_wrapper_${0}_id`);

    expect(anyCoffeeImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 0,
    });
    expect(firstCoffeeImageWrapper.props.style).toEqual({
      marginBottom: 0,
      marginTop: 26,
    });
  });

  test('should call setSelectedOption with correct param when press the coffee image', async () => {
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

    const coffeeImage = getByTestId('coffee_image_1_id');

    fireEvent.press(coffeeImage);

    expect(setSelectedOption).toHaveBeenCalledTimes(1);
    expect(setSelectedOption).toHaveBeenCalledWith(getOptionListFake()[0]);
  });

  test('should the height coffee image equal to 400 if platform is equal iOS', async () => {
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

    const coffeeImage = getByTestId('coffee_image_1_id');

    expect(coffeeImage.props.style[0].height).toEqual(400);
  });

  test('should the height coffee image equal to 533.6 if platform is equal android', async () => {
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

    const coffeeImage = getByTestId('coffee_image_1_id');

    expect(coffeeImage.props.style[0].height).toEqual(533.6);
  });

  test('top margin of coffee details should equal 100 if platform equals ios', async () => {
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

    const coffeeDetailsWrapper = getByTestId('coffee_details_id');

    expect(coffeeDetailsWrapper.props.style[0].marginTop).toEqual(100);
  });

  test('top margin of coffee details should equal 60 if platform equals android', async () => {
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

    const coffeeDetailsWrapper = getByTestId('coffee_details_id');

    expect(coffeeDetailsWrapper.props.style[0].marginTop).toEqual(60);
  });

  test('bottom margin of coffee image wrapper should equal 26 if platform equals ios', async () => {
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

    const coffeeImageWrapper = getByTestId(
      `coffee_image_wrapper_${getOptionListFake().length - 1}_id`,
    );

    expect(coffeeImageWrapper.props.style.marginBottom).toEqual(26);
  });

  test('bottom margin of coffee image wrapper should equal 40 if platform equals android', async () => {
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

    const coffeeImageWrapper = getByTestId(
      `coffee_image_wrapper_${getOptionListFake().length - 1}_id`,
    );

    expect(coffeeImageWrapper.props.style.marginBottom).toEqual(40);
  });
});

const makeSut = (
  optionList: Array<Coffee> = [],
  selectedOptionItem: Coffee = getSelectedOptionItemStub(),
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
