'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Card, Button, Spinner, Container, Row, Col } from 'react-bootstrap';

export default function ProductDetail()
{
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchProduct = async () =>
        {
            try
            {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();

                setProduct({
                    id: data.id,
                    name: data.title,
                    price: data.price.toFixed(2),
                    description: data.description,
                    image: data.image,
                    category: data.category
                });
            } catch (err)
            {
                setError(err.message);
            } finally
            {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-4"><Spinner animation="border" variant="danger" /></div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
                        <span className="text-uppercase text-muted small">{product.category}</span>
                        <h2 className="fw-bold mb-3">{product.name}</h2>
                        <h3 className="text-danger mb-4">${product.price}</h3>

                        <p className="text-muted mb-4">{product.description}</p>

                        <div className="mt-auto">
                            <Button
                                variant="danger"
                                size="lg"
                                className="w-100"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
} 