import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { getProductByCategory, getProducts } from '../utils/api';

const HomePage = ({ onAddToCart, selectedCategory, isAuthenticated }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 12;

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = selectedCategory ? await getProductByCategory(selectedCategory) : await getProducts()
				setProducts(response);
				setError(null);
				setCurrentPage(1);
			} catch (err) {
				setError('Failed to fetch products. Please try again later.');
				console.error('Error fetching products:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [selectedCategory]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
	const totalPages = Math.ceil(products.length / productsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (loading) {
		return (
			<LoadingContainer>
				<Spinner />
			</LoadingContainer>
		);
	}

	if (error) {
		return (
			<ErrorContainer>
				<ErrorMessage>{error}</ErrorMessage>
			</ErrorContainer>
		);
	}

	return (
		<Container>
			<PageHeader>
				<Title>
					{selectedCategory
						? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
						: 'Todos os Produtos'}
				</Title>
				<Description>
					{selectedCategory
						? `Navegue por nossa coleção de produtos ${selectedCategory}`
						: 'Descubra nossa ampla variedade de produtos'}
				</Description>
			</PageHeader>

			<ProductGrid>
				{currentProducts.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={onAddToCart}
						isAuthenticated={isAuthenticated}
					/>
				))}
			</ProductGrid>

			{totalPages > 1 && (
				<Pagination>
					<PageButton
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<FaChevronLeft />
					</PageButton>
					
					{[...Array(totalPages)].map((_, index) => (
						<PageButton
							key={index + 1}
							onClick={() => handlePageChange(index + 1)}
							isActive={currentPage === index + 1}
						>
							{index + 1}
						</PageButton>
					))}
					
					<PageButton
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<FaChevronRight />
					</PageButton>
				</Pagination>
			)}
		</Container>
	);
};

const Container = styled.div`
	max-width: 72rem;
	margin: 0 auto;
`;

const PageHeader = styled.div`
	text-align: center;
	margin-bottom: 2rem;
`;

const Title = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	color: #1f2937;
	margin-bottom: 0.5rem;
`;

const Description = styled.p`
	color: #6b7280;
	font-size: 1.125rem;
`;

const ProductGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2rem;
	margin-bottom: 2rem;
`;

const Pagination = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-top: 2rem;
`;

const PageButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.375rem;
	background-color: ${({ isActive }) => (isActive ? '#4f46e5' : 'white')};
	color: ${({ isActive }) => (isActive ? 'white' : '#4b5563')};
	font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
	transition: all 0.3s ease;
	
	&:hover:not(:disabled) {
		background-color: ${({ isActive }) => (isActive ? '#4338ca' : '#f3f4f6')};
	}
	
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 50vh;
`;

const Spinner = styled.div`
	width: 3rem;
	height: 3rem;
	border: 4px solid #f3f4f6;
	border-top: 4px solid #4f46e5;
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;

const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 50vh;
`;

const ErrorMessage = styled.p`
	color: #ef4444;
	font-size: 1.125rem;
	text-align: center;
`;

export default HomePage;
