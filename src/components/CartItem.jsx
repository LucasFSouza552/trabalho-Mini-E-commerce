import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <ItemContainer>
      <ItemImage src={item.image} alt={item.title} />
      <ItemContent>
        <ItemInfo>
          <ItemTitle to={`/produto/${item.id}`}>{item.title}</ItemTitle>
          <ItemCategory>{item.category}</ItemCategory>
          <ItemPrice>R$ {item.price.toFixed(2)}</ItemPrice>
        </ItemInfo>
        <ItemFooter>
          <QuantityControl>
            <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
              <FaMinus />
            </QuantityButton>
            <QuantityValue>{item.quantity}</QuantityValue>
            <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
              <FaPlus />
            </QuantityButton>
          </QuantityControl>
          <PriceContainer>
            <ItemTotal>R$ {(item.price * item.quantity).toFixed(2)}</ItemTotal>
            <RemoveButton onClick={() => onRemove(item.id)}>
              <FaTrash />
            </RemoveButton>
          </PriceContainer>
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  mix-blend-mode: multiply;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled(Link)`
  font-weight: 600;
  color: #333333;
  font-size: 1.1rem;
  text-decoration: none;
  line-height: 1.4;
  
  &:hover {
    color: #5a809e;
  }
`;

const ItemCategory = styled.span`
  font-size: 0.875rem;
  color: #666666;
  text-transform: capitalize;
`;

const ItemPrice = styled.span`
  font-weight: 600;
  color: #5a809e;
  font-size: 1.1rem;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const QuantityButton = styled.button`
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: #5a809e;
    color: #ffffff;
    border-color: #5a809e;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  padding: 0 0.5rem;
  font-weight: 600;
  color: #333333;
  min-width: 2rem;
  text-align: center;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ItemTotal = styled.span`
  font-weight: bold;
  color: #333333;
  font-size: 1.25rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    color: #dc3545;
  }
`;

export default CartItem; 