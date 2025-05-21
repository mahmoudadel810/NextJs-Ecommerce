'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { Navbar, Container, Nav, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { Search, Person, Cart, Heart } from 'react-bootstrap-icons';

export default function Navigation()
{
    const { cart } = useCart();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);

    // Real-time search
    useEffect(() =>
    {
        // Only search if query is at least 2 characters
        if (searchQuery.length < 2)
        {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        const controller = new AbortController();
        const fetchResults = async () =>
        {
            setLoading(true);
            try
            {
                const response = await fetch('https://fakestoreapi.com/products', {
                    signal: controller.signal
                });

                if (!response.ok) throw new Error('Failed to fetch products');

                const products = await response.json();

                // Filter products based on search query
                const filtered = products.filter(product =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5); // Limit to 5 results

                setSearchResults(filtered);
                setShowDropdown(true);
            } catch (err)
            {
                if (err.name !== 'AbortError')
                {
                    console.error('Search error:', err);
                }
            } finally
            {
                setLoading(false);
            }
        };

        // Debounce search to avoid too many API calls
        const timeoutId = setTimeout(() =>
        {
            fetchResults();
        }, 300);

        return () =>
        {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() =>
    {
        const handleClickOutside = (event) =>
        {
            if (searchRef.current && !searchRef.current.contains(event.target))
            {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
        {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    const handleSearch = (e) =>
    {
        e.preventDefault();
        if (searchQuery.trim())
        {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setShowDropdown(false);
        }
    };

    return (
        <Navbar expand="lg" className="py-3 shadow-sm bg-white" sticky="top">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand className="fw-bold fs-3 text-danger">ShopNow</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    <Nav className="mx-auto mb-2 mb-lg-0">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link className="mx-2 fw-semibold">Home</Nav.Link>
                        </Link>
                        <Link href="/products" passHref legacyBehavior>
                            <Nav.Link className="mx-2 fw-semibold">All Products</Nav.Link>
                        </Link>
                        <Link href="/products?category=electronics" passHref legacyBehavior>
                            <Nav.Link className="mx-2 fw-semibold">Electronics</Nav.Link>
                        </Link>
                        <Link href="/products?category=men's clothing" passHref legacyBehavior>
                            <Nav.Link className="mx-2 fw-semibold">Men's</Nav.Link>
                        </Link>
                        <Link href="/products?category=women's clothing" passHref legacyBehavior>
                            <Nav.Link className="mx-2 fw-semibold">Women's</Nav.Link>
                        </Link>
                    </Nav>

                    <div className="position-relative me-3" style={{ maxWidth: '400px', flex: 1 }} ref={searchRef}>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <InputGroup>
                                <Form.Control
                                    type="search"
                                    placeholder="Search products..."
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-danger" type="submit">
                                    <Search />
                                </Button>
                            </InputGroup>
                        </Form>

                        {/* Real-time search results dropdown */}
                        {showDropdown && (
                            <div className="position-absolute w-100 mt-1 shadow bg-white border rounded z-3">
                                {loading && (
                                    <div className="p-3 text-center">
                                        <div className="spinner-border spinner-border-sm text-danger" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}

                                {!loading && searchResults.length === 0 && (
                                    <div className="p-3 text-center">No products found</div>
                                )}

                                {searchResults.map(product => (
                                    <div
                                        key={product.id}
                                        className="d-flex align-items-center p-2 border-bottom search-item"
                                        onClick={() =>
                                        {
                                            router.push(`/products/${product.id}`);
                                            setShowDropdown(false);
                                            setSearchQuery('');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                            className="me-2"
                                        />
                                        <div>
                                            <div className="small fw-semibold text-truncate" style={{ maxWidth: '280px' }}>{product.title}</div>
                                            <div className="small text-danger">${product.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                ))}

                                {searchResults.length > 0 && (
                                    <div className="p-2 text-center">
                                        <button
                                            className="btn btn-link btn-sm text-decoration-none"
                                            onClick={handleSearch}
                                        >
                                            See all results
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Nav className="d-flex align-items-center gap-3">
                        <Link href="/wishlist" passHref>
                            <Button variant="outline-secondary" className="d-flex align-items-center gap-1">
                                <Heart />
                                <span className="d-none d-md-inline">Wishlist</span>
                            </Button>
                        </Link>
                        <Link href="/login" passHref>
                            <Button variant="outline-secondary" className="d-flex align-items-center gap-1">
                                <Person />
                                <span className="d-none d-md-inline">Account</span>
                            </Button>
                        </Link>
                        <Link href="/cart" passHref>
                            <Button variant="danger" className="d-flex align-items-center gap-1 position-relative">
                                <Cart />
                                <span className="d-none d-md-inline">Cart</span>
                                {cart.length > 0 && (
                                    <Badge pill bg="light" text="dark" className="position-absolute top-0 end-0 translate-middle">
                                        {cart.length}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
} 