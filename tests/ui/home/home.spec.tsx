import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';
import {
  Coffee,
  Option,
  OptionOfList,
} from '../../../src/presentation/screens/home/model';
import getListOfOptionsFake from '../fakers/listOfOptionsFake';
import getOptionSelectedFake from '../fakers/optionSelectedFake';
import getOptionListFake from '../fakers/optionListFake';
import getSelectedOptionItemStub from '../stubs/selectedOptionItemStub';
import getEventDataStub from '../stubs/eventDataStub';

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

  test('should show button for try again when option list is empty', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const buttonTryAgain = getByTestId('button_try_again_id');

    expect(buttonTryAgain).toBeTruthy();
    expect(buttonTryAgain.props.children).toEqual('try again another time');
  });

  test('should press button try again with success', () => {
    const {
      tryAgain,
      sut: { getByTestId },
    } = makeSut();

    const buttonTryAgain = getByTestId('button_try_again_id');

    fireEvent.press(buttonTryAgain);

    expect(tryAgain).toHaveBeenCalledTimes(1);
  });

  test('should show message and button try again if optionList is empty', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const buttonTryAgain = getByTestId('button_try_again_id');
    const messageOptionListEmpty = getByTestId('message_option_list_empty_id');

    expect(messageOptionListEmpty).toBeTruthy();
    expect(buttonTryAgain).toBeTruthy();
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
});

const makeSut = (
  optionList: Array<Coffee> = [],
  selectedOptionItem: Coffee = getSelectedOptionItemStub(),
  listOfOptions: Array<OptionOfList> = [],
  optionSelected: Option = getOptionSelectedFake(),
  scrollHandler = () => {},
) => {
  const tryAgain = jest.fn();
  const selectOption = jest.fn();

  const sut = render(
    <Home
      listOfOptions={listOfOptions}
      selectOption={selectOption}
      optionSelected={optionSelected}
      optionList={optionList}
      selectedOptionItem={selectedOptionItem}
      tryAgain={tryAgain}
      scrollHandler={scrollHandler}
    />,
  );

  return { sut, tryAgain, selectOption };
};
