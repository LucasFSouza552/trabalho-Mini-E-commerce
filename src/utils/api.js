export const fetchProducts = async (category = null) => {
  const url = category 
    ? `https://fakestoreapi.com/products/category/${category}`
    : 'https://fakestoreapi.com/products';
  const response = await fetch(url);
  return await response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return await response.json();
};