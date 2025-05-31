import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowRight, FaLock, FaTrash, FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';
import styled from 'styled-components';
import CartItem from '../components/CartItem';

const CartPage = ({ cart, onRemove, onUpdateQuantity, onClearCart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleRemoveAll = () => {
    onClearCart();
  };

  return (
    <Container>
      <Title>Carrinho de Compras</Title>
      {totalItems > 0 && (
        <Description>
          Você tem {totalItems} {totalItems === 1 ? 'item' : 'itens'} no seu carrinho.
        </Description>
      )}

      {cart.length === 0 ? (
        <EmptyCart>
          <CartIcon>
            <FaShoppingCart size={64} />
          </CartIcon>
          <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
          <EmptyText>
            Parece que você ainda não adicionou nenhum item ao seu carrinho.
            Explore nossa loja e encontre produtos incríveis!
          </EmptyText>
          <ContinueShopping to="/">
            Continuar Comprando
            <FaArrowRight />
          </ContinueShopping>
        </EmptyCart>
      ) : (
        <CartContainer>
          <CartItems>
            <CartHeader>
              <CartTitle>Produtos ({totalItems})</CartTitle>
              <RemoveAllButton onClick={handleRemoveAll}>
                <FaTrash />
                Remover Todos
              </RemoveAllButton>
            </CartHeader>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </CartItems>

          <OrderSummary>
            <SummaryTitle>Resumo do Pedido</SummaryTitle>
            <SummaryContent>
              <SummaryRow>
                <SummaryLabel>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</SummaryLabel>
                <SummaryValue>R$ {subtotal.toFixed(2)}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Frete</SummaryLabel>
                <SummaryValue>R$ {shipping.toFixed(2)}</SummaryValue>
              </SummaryRow>
              <Divider />
              <TotalRow>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </TotalRow>
              <CheckoutButton>
                <FaLock />
                Finalizar Compra
              </CheckoutButton>
              <PaymentMethods>
                <PaymentTitle>Formas de Pagamento</PaymentTitle>
                <PaymentIcons>
                  <PaymentIcon>
                    <FaCreditCard />
                    <span>Cartão</span>
                  </PaymentIcon>
                  <PaymentIcon>
                    <FaMoneyBillWave />
                    <span>Boleto</span>
                  </PaymentIcon>
                  <PaymentIcon>
                    <FaMobileAlt />
                    <span>PIX</span>
                  </PaymentIcon>
                </PaymentIcons>
              </PaymentMethods>
            </SummaryContent>
          </OrderSummary>
        </CartContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CartItems = styled.div`
  flex: 2;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const CartTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333333;
`;

const RemoveAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #dc3545;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;

  &:hover {
    color: #c82333;
  }
`;

const OrderSummary = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333333;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

const SummaryContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const SummaryLabel = styled.span`
  color: #666666;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #333333;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e9ecef;
  margin: 0.5rem 0;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333333;
  margin-top: 0.5rem;
`;

const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #5a809e;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3d6a87;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const PaymentMethods = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
`;

const PaymentTitle = styled.h3`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1rem;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PaymentIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #666666;
  font-size: 1.5rem;
  
  span {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  &:hover {
    color: #5a809e;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartIcon = styled.div`
  color: #5a809e;
  margin-bottom: 1.5rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #666666;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
`;

const ContinueShopping = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #5a809e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3d6a87;
    transform: translateY(-2px);
  }
`;

export default CartPage;