'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

export default function Login()
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Login to Your Account</h2>
                <p className="text-muted">Welcome back! Enter your credentials to access your account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                  />
                  <Link href="/forgot-password" className="text-danger text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button variant="danger" type="submit" className="w-100 py-2">
                  Login
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p>Don't have an account? <Link href="/signup" className="text-danger">Sign up</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
