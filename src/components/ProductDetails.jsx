import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCartPlus, FaStar, FaRegStar, FaSignInAlt } from 'react-icons/fa';
import styled from 'styled-components';

const ProductDetails = ({ product, onAddToCart, isAuthenticated }) => {
  const stars = Math.round(product.rating.rate);
  
  return (
    <Container>
      <BackLink to="/">
        <FaArrowLeft />
        <span>Voltar para Produtos</span>
      </BackLink>
      
      <ProductCard>
        <ProductContent>
          <ImageContainer>
            <ProductImage src={product.image} alt={product.title} />
          </ImageContainer>
          <DetailsContainer>
            <Title>{product.title}</Title>
            <RatingContainer>
              <Stars>
                {[...Array(5)].map((_, i) => (
                  i < stars ? <FaStar key={i} /> : <FaRegStar key={i} />
                ))}
              </Stars>
              <RatingText>
                {product.rating.rate} ({product.rating.count} avaliações)
              </RatingText>
            </RatingContainer>
            <Description>{product.description}</Description>
            
            <PriceSection>
              <Price>R$ {product.price.toFixed(2)}</Price>
              <StockStatus>Em Estoque</StockStatus>
            </PriceSection>
            
            <ActionsContainer>
              {isAuthenticated ? (
                <AddToCartButton onClick={() => onAddToCart(product.id)}>
                  <FaCartPlus />
                  <span>Adicionar ao Carrinho</span>
                </AddToCartButton>
              ) : (
                <LoginButton to="/auth">
                  <FaSignInAlt />
                  <span>Entrar para Comprar</span>
                </LoginButton>
              )}
            </ActionsContainer>
            
            <CategoryContainer>
              <CategoryLabel>Categoria</CategoryLabel>
              <CategoryTag>{product.category}</CategoryTag>
            </CategoryContainer>
          </DetailsContainer>
        </ProductContent>
      </ProductCard>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #333333; /* Primary Text */
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a809e; /* Primary Accent */
  }
`;

const ProductCard = styled.div`
  background-color: #ffffff; /* White background */
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* White background */
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem; /* Added padding for spacing */
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333333; /* Primary Text */
  margin-bottom: 1rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  color: #8fbc8f; /* Secondary Accent (Green for stars) */
  font-size: 1rem;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: #666666; /* Secondary Text */
`;

const Description = styled.p`
  color: #333333; /* Primary Text */
  margin-bottom: 1.5rem;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid #cccccc; /* Secondary Text/Borders */
  border-bottom: 1px solid #cccccc; /* Secondary Text/Borders */
  margin-bottom: 1.5rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5a809e; /* Primary Accent */
`;

const StockStatus = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #8fbc8f; /* Secondary Accent (Green for stock) */
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddToCartButton = styled.button`
  flex: 1;
  background-color: #5a809e; /* Primary Accent */
  color: white; /* White text */
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3d6a87; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #cccccc; /* Secondary Text/Borders */
    cursor: not-allowed;
  }
`;

const LoginButton = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #8fbc8f; /* Secondary Accent */
  color: white; /* White text */
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a9b79; /* Darker shade on hover */
  }
`;

const CategoryContainer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #cccccc; /* Secondary Text/Borders */
`;

const CategoryLabel = styled.h3`
  font-weight: 600;
  color: #333333; /* Primary Text */
  margin-bottom: 0.5rem;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: #eef2f6; /* Light background */
  color: #666666; /* Secondary Text */
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
`;

export default ProductDetails;