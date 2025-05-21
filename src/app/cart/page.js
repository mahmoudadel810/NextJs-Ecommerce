'use client';
import { useCart } from '@/context/CartContext';
import { Table, Button } from 'react-bootstrap';

export default function Cart()
{
    const { cart, removeFromCart } = useCart();

    return (
        <div className="container mt-4">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="text-end">
                        <h4>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</h4>
                        <Button href="/checkout" variant="success">
                            Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
} 