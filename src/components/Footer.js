import { Facebook, Twitter, Instagram, Pinterest } from 'react-bootstrap-icons';

export default function Footer()
{
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase mb-4">ShopNow</h5>
                        <p className="small">
                            ShopNow offers the best online shopping experience with a wide selection of products at competitive prices.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="text-white">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-white">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-white">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-white">
                                <Pinterest size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase mb-4">Shop</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">All Products</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Deals & Offers</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Best Sellers</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">New Arrivals</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase mb-4">Customer Service</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">FAQs</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Returns & Refunds</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping Information</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase mb-4">Newsletter</h5>
                        <p className="small">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Your email" aria-label="Email" />
                            <button className="btn btn-danger" type="button">Subscribe</button>
                        </div>
                        <div className="mt-4">
                            <img src="https://i.imgur.com/AHCoUZO.png" alt="Payment Methods" className="img-fluid" />
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p className="small mb-md-0">© 2023 ShopNow. All rights reserved.</p>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <ul className="list-inline text-md-end mb-0 small">
                            <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                            <li className="list-inline-item me-3"><a href="#" className="text-white text-decoration-none">Terms of Use</a></li>
                            <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
} 