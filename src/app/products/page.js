'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Card, Button, Row, Col, Spinner, Container, Alert } from 'react-bootstrap';

export default function Products()
{
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all products
    useEffect(() =>
    {
        const fetchProducts = async () =>
        {
            try
            {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                // Map the Fake Store API data structure
                const mappedProducts = data.map(product => ({
                    id: product.id,
                    name: product.title,
                    price: product.price.toFixed(2),
                    description: product.description,
                    image: product.image,
                    category: product.category
                }));

                setProducts(mappedProducts);
                setFilteredProducts(mappedProducts);
            } catch (err)
            {
                setError(err.message);
            } finally
            {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search or category
    useEffect(() =>
    {
        if (products.length > 0)
        {
            let result = [...products];

            // Apply category filter if present
            if (category)
            {
                result = result.filter(product =>
                    product.category?.toLowerCase().includes(category.toLowerCase())
                );
            }

            // Apply search filter if present
            if (search)
            {
                result = result.filter(product =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.toLowerCase().includes(search.toLowerCase()) ||
                    product.category?.toLowerCase().includes(search.toLowerCase())
                );
            }

            setFilteredProducts(result);
        }
    }, [products, search, category]);

    if (loading) return <div className="text-center mt-4"><Spinner animation="border" variant="danger" /></div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <Container className="my-5">
            {search && (
                <Alert variant="info" className="mb-4">
                    <h5 className="mb-0">Search results for: <strong>{search}</strong></h5>
                </Alert>
            )}

            {category && (
                <Alert variant="info" className="mb-4">
                    <h5 className="mb-0">Category: <strong>{category}</strong></h5>
                </Alert>
            )}

            <h1 className="mb-4 fw-bold">
                {search ? 'Search Results' : category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
            </h1>

            {filteredProducts.length === 0 ? (
                <Alert variant="warning">
                    No products found. Try a different search term or category.
                </Alert>
            ) : (
                <Row className="g-4">
                    {filteredProducts.map((product) => (
                        <Col md={4} lg={3} key={product.id} className="mb-4">
                            <Card className="h-100 shadow-sm card-hover border-0">
                                <Link href={`/products/${product.id}`} passHref>
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        style={{ height: '200px', objectFit: 'contain', padding: '20px', cursor: 'pointer' }}
                                    />
                                </Link>
                                <Card.Body className="d-flex flex-column">
                                    <Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
                                        <Card.Title className="fs-6 fw-bold text-truncate">{product.name}</Card.Title>
                                    </Link>
                                    <Card.Text className="text-muted small mb-2">
                                        {product.description.substring(0, 70)}...
                                    </Card.Text>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <span className="h5 mb-0 text-danger fw-bold">${product.price}</span>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
} 