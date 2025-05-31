import React from 'react';
import { FaStar, FaRegStar, FaCartPlus, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = ({ product, onAddToCart, isAuthenticated }) => {
  const navigate = useNavigate();
  const stars = Math.round(product.rating.rate);
  
  const handleCardClick = () => {
    navigate(`/produto/${product.id}`);
  };
  
  return (
    <Card onClick={handleCardClick}>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} />
      </ImageContainer>
      <CardContent>
        <CategoryTag>{product.category}</CategoryTag>
        <ProductTitle>{product.title}</ProductTitle>
        <PriceRatingContainer>
          <Price>R$ {product.price.toFixed(2)}</Price>
          <RatingContainer>
            <Stars>
              {[...Array(5)].map((_, i) => (
                i < stars ? <FaStar key={i} /> : <FaRegStar key={i} />
              ))}
            </Stars>
            <RatingCount>({product.rating.count})</RatingCount>
          </RatingContainer>
        </PriceRatingContainer>
        <ButtonContainer>
          <ViewButton to={`/produto/${product.id}`}>
            Ver Detalhes
          </ViewButton>
          {isAuthenticated ? (
            <AddButton onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}>
              <FaCartPlus />
            </AddButton>
          ) : (
            <LoginButton to="/auth" onClick={(e) => e.stopPropagation()}>
              <FaSignInAlt />
            </LoginButton>
          )}
        </ButtonContainer>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #FAFAFA;
`;

const ProductImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  mix-blend-mode: multiply;
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryTag = styled.span`
  font-size: 0.875rem;
  color: #666666; /* Secondary Text */
  margin-bottom: 0.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333333; /* Primary Text */
  margin-bottom: 0.5rem;
`;

const PriceRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #5a809e; /* Primary Accent */
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Stars = styled.div`
  color: #8fbc8f; /* Secondary Accent (Green for stars) */
  font-size: 1rem;
`;

const RatingCount = styled.span`
  font-size: 0.875rem;
  color: #666666; /* Secondary Text */
  margin-left: 0.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ViewButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #eef2f6;
  color: #333333;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cccccc;
  }
`;

const AddButton = styled.button`
  background-color: #5a809e;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3d6a87;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoginButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #8fbc8f;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a9b79;
  }
`;

export default ProductCard;