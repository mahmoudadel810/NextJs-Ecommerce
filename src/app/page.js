'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Carousel, Card, Button, Row, Col, Spinner, Container } from 'react-bootstrap';

// Mock product categories for better quality images
const productCategories = [
  { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop" },
  { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop" },
  { id: 3, name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=400&fit=crop" }
];

// High-quality product image mapping
const getProductImage = (id) =>
{
  const imageUrls = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop", // Headphones
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop", // Watch
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=200&fit=crop", // Smart watch
    "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=300&h=200&fit=crop", // Keyboard
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop", // Laptop
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop", // Sunglasses
    "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&h=200&fit=crop", // Shoes
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=300&h=200&fit=crop"  // Smartphone
  ];

  return imageUrls[id % imageUrls.length];
};

export default function Home()
{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const mappedProducts = data.slice(0, 8).map(post => ({
          id: post.id,
          name: post.title.split(' ').slice(0, 3).join(' '),  // Shorter product names
          price: (post.id * 10 + 19.99).toFixed(2),
          description: post.body,
          image: getProductImage(post.id)
        }));
        setProducts(mappedProducts);
      } catch (err)
      {
        console.error(err);
      } finally
      {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main>
      {/* Hero Carousel */}
      <Carousel fade className="mb-5" indicators={true}>
        {productCategories.map((category) => (
          <Carousel.Item key={category.id} style={{ maxHeight: '500px' }}>
            <img
              className="d-block w-100"
              src={category.image}
              alt={category.name}
              style={{ objectFit: 'cover', height: '500px' }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3 p-4">
              <h2 className="display-5 fw-bold">{category.name}</h2>
              <p className="lead">Discover our latest collection of {category.name.toLowerCase()}</p>
              <Link href={`/products?category=${category.name.toLowerCase()}`} passHref>
                <Button variant="danger" size="lg">Shop Now</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Featured Products */}
      <Container className="mb-5">
        <h2 className="text-center mb-4 fw-bold">Featured Products</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm card-hover border-0">
                  <Link href={`/products/${product.id}`} passHref>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
                      <Card.Title className="fs-6 fw-bold">{product.name}</Card.Title>
                    </Link>
                    <Card.Text className="text-muted small mb-2">
                      {product.description.substring(0, 50)}...
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

      {/* Special Offer Banner */}
      <div className="bg-danger text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-6 fw-bold">Special Offer</h2>
              <p className="lead">Get 20% off on all products with code: SHOP20</p>
              <Button variant="light" className="text-danger mt-2">Shop Now</Button>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop"
                alt="Special offer"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}
