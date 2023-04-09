type Option = {
  id: string;
  option: string;
  list: Array<Product>;
  emptyMessage: string;
};

type Product = {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  optionId: string;
};

export default Option;
