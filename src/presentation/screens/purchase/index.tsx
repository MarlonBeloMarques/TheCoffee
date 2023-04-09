import React from 'react';
import { ImageSourcePropType } from 'react-native';
import PurchaseView from './model';
import {
  ConfirmPurchaseButton,
  ConfirmPurchaseButtonDescription,
  CreditCardIcon,
  CreditCardNumber,
  CreditCardWrapper,
  PaymentDescription,
  PaymentWrapper,
  ProductImage,
  ProductName,
  ProductPrice,
  Wrapper,
  WrapperScreen,
} from './styles';

const Purchase: React.FC<PurchaseView> = ({
  productSelected,
  paymentDetail,
  confirmPurchase,
}) => {
  return (
    <WrapperScreen>
      <Wrapper>
        <ProductName testID="coffee_name_id">
          {productSelected.productName}
        </ProductName>
        <ProductPrice testID="coffee_price_id">{`R$ ${productSelected.productPrice.toFixed(
          2,
        )}`}</ProductPrice>
      </Wrapper>
      <Wrapper style={{ flex: 0.8, justifyContent: 'center' }}>
        <ProductImage
          testID="coffee_image_id"
          source={productSelected.productImage as ImageSourcePropType}
        />
      </Wrapper>
      <PaymentWrapper>
        <PaymentDescription testID="payment_description_id">
          {'Pay with credit card: '}
        </PaymentDescription>
        <CreditCardWrapper>
          <CreditCardNumber testID="payment_number_credit_card_id">
            {paymentDetail.creditCard.number + '  '}
          </CreditCardNumber>
          <CreditCardIcon testID="payment_icon_credit_card_id" />
        </CreditCardWrapper>
      </PaymentWrapper>
      <ConfirmPurchaseButton
        testID="confirm_purchase_button_id"
        onPress={confirmPurchase}
      >
        <ConfirmPurchaseButtonDescription>
          {'Confirm purchase'}
        </ConfirmPurchaseButtonDescription>
      </ConfirmPurchaseButton>
    </WrapperScreen>
  );
};

export default Purchase;
