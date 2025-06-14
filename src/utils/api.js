import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getProductCategories = async () => {
  const response = await api.get('/products/categories');
  return await response.data;
};

export const getUsersById = async (id = 1) => {
  const response = await api.get(`/users/${id}`);
  return await response.data;
};

export const getProductsById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return await response.data;
}

export const getProductByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return await response.data;
}

export const getProducts = async () => {
  const response = await api.get('/products');
  return await response.data;
}

export const validateLogin = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return await response.data.token;
};

export const createUser = async (user) => {
  const response = await api.post('/users', {
    email: user.email,
    username: user.email,
    password: user.password,
    name: {
      firstname: user.name.split(' ')[0],
      lastname: user.name.split(' ').slice(1).join(' ')
    }
  });
  return await response.data;
};
