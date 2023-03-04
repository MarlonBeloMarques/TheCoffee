const { Routes } = Modules;

declare type StackParams = {
  [Routes.PURCHASE]: { coffeeSelected: string };
  [Routes.HOME]: undefined;
  [Routes.WELCOME]: undefined;
};
