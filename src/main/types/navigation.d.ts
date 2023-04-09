const { Routes } = Modules;

declare type StackParams = {
  [Routes.PURCHASE]: { productSelected: string };
  [Routes.HOME]: undefined;
  [Routes.WELCOME]: undefined;
};
