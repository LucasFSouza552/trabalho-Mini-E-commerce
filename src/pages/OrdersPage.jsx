import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#5a809e'; // Primary Accent
    case 'processing':
      return '#5a809e'; // Primary Accent
    case 'shipped':
      return '#5a809e'; // Primary Accent
    case 'delivered':
      return '#8fbc8f'; // Secondary Accent (Green)
    default:
      return '#666666'; // Secondary Text
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(''); // Clear any previous errors
        // Fetch user's carts
        const cartsResponse = await api.get('/carts/user/1');
        const carts = cartsResponse.data;

        if (!carts || carts.length === 0) {
          setOrders([]);
          setLoading(false);
          console.log('No carts found for user ID 1.'); // Log if no carts are found
          return;
        }

        const ordersWithDetails = await Promise.all(carts.map(async (cart) => {
          // For each cart, fetch details for each product
          const productsWithDetails = await Promise.all(cart.products.map(async (item) => {
            try {
              const productResponse = await api.get(`/products/${item.productId}`);
              // Combine product details with cart item quantity
              return { ...productResponse.data, quantity: item.quantity };
            } catch (productError) {
              console.error(`Error fetching product ${item.productId}:`, productError.message); // Log specific product fetch error
              // Return a placeholder or partial data if product fetch fails
              return { productId: item.productId, quantity: item.quantity, title: 'Erro ao carregar produto', price: 0, image: '' };
            }
          }));

          // Combine cart data with the detailed products
          return { ...cart, products: productsWithDetails };
        }));

        setOrders(ordersWithDetails);

      } catch (error) {
        console.error('Error fetching orders:', error.message); // Log overall error message
        setError('Erro ao carregar pedidos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Dependency array is empty as we only fetch orders on component mount

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaShoppingBag />;
      case 'processing':
        return <FaBox />;
      case 'shipped':
        return <FaTruck />;
      case 'delivered':
        return <FaCheckCircle />;
      default:
        return <FaShoppingBag />;
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Carregando pedidos...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <EmptyMessage>
          <FaShoppingBag size={48} />
          <h2>Nenhum pedido encontrado</h2>
          <p>Você ainda não fez nenhum pedido.</p>
        </EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Meus Pedidos</Title>
      <OrdersList>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <OrderNumber>Pedido #{order.id}</OrderNumber>
                <OrderDate>
                  {new Date(order.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </OrderDate>
              </OrderInfo>
              <OrderStatus status={order.status}>
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </OrderStatus>
            </OrderHeader>

            <OrderItems>
              {order.products.map((product) => (
                <OrderItem key={product.productId}>
                  <ItemImage src={product.image} alt={product.title} />
                  <ItemInfo>
                    <ItemTitle>{product.title}</ItemTitle>
                    <ItemQuantity>Quantidade: {product.quantity}</ItemQuantity>
                    <ItemPrice>R$ {product.price.toFixed(2)}</ItemPrice>
                  </ItemInfo>
                </OrderItem>
              ))}
            </OrderItems>

            <OrderFooter>
              <OrderTotal>
                Total: R$ {order.products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}
              </OrderTotal>
              <OrderActions>
                <ActionButton>Ver Detalhes</ActionButton>
                <ActionButton>Rastrear Pedido</ActionButton>
              </OrderActions>
            </OrderFooter>
          </OrderCard>
        ))}
      </OrdersList>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 4rem);
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333; /* Primary Text */
  margin-bottom: 2rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #666666; /* Secondary Text */
  font-size: 1.125rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #e57373; /* Error color */
  font-size: 1.125rem;
  text-align: center;
  padding: 1rem;
  background-color: #eef2f6; /* Light background */
  border-radius: 0.375rem;
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #666666; /* Secondary Text */
  text-align: center;
  
  svg {
    color: #5a809e; /* Primary Accent */
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #999999; /* Lighter gray */
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background-color: #ffffff; /* White background */
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #eef2f6; /* Light background */
  border-bottom: 1px solid #cccccc; /* Secondary Text/Borders */
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const OrderNumber = styled.span`
  font-weight: 600;
  color: #333333; /* Primary Text */
`;

const OrderDate = styled.span`
  font-size: 0.875rem;
  color: #666666; /* Secondary Text */
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: ${props => getStatusColor(props.status)}20;
  color: ${props => getStatusColor(props.status)};
  font-weight: 500;
  
  svg {
    font-size: 1rem;
  }
`;

const OrderItems = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #ffffff; /* White background */
  border-radius: 0.375rem;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  background-color: #eef2f6; /* Light background */
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ItemTitle = styled.h3`
  font-weight: 500;
  color: #333333; /* Primary Text */
  font-size: 0.875rem;
`;

const ItemQuantity = styled.span`
  font-size: 0.875rem;
  color: #666666; /* Secondary Text */
`;

const ItemPrice = styled.span`
  font-weight: 600;
  color: #5a809e; /* Primary Accent */
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #eef2f6; /* Light background */
  border-top: 1px solid #cccccc; /* Secondary Text/Borders */
`;

const OrderTotal = styled.div`
  font-weight: 600;
  color: #333333; /* Primary Text */
`;

const OrderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background-color: #5a809e; /* Primary Accent */
  color: white; /* White text */
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3d6a87; /* Darker shade on hover */
  }
`;

export default OrdersPage; 