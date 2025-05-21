'use client';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Lab1 nextjs
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/about-us">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} href="/contact-us">
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} href="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} href="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
