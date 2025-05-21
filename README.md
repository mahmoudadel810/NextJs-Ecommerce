<!-- @format -->

# ShopNow E-Commerce Website

A modern, responsive e-commerce platform built with Next.js and React Bootstrap. This project demonstrates advanced frontend development techniques including routing, state management, API integration, and responsive design.

![ShopNow E-Commerce](https://i.imgur.com/XYZ123.png)

## Features

- **Modern UI/UX**: Clean, responsive design with intuitive navigation
- **Product Catalog**: Display products from external API with filtering options
- **Real-time Search**: Dynamic product search with instant results
- **Product Details**: Detailed product pages with descriptions and images
- **Shopping Cart**: Add/remove products with persistent storage
- **User Authentication**: Login and registration pages
- **Responsive Design**: Mobile-first approach for all device sizes
- **Category Filtering**: Browse products by categories
- **Dynamic Routing**: SEO-friendly URLs for all products and pages

## Technologies Used

- **Next.js 14**: React framework with App Router for optimized rendering
- **React 18**: UI component library
- **React Bootstrap**: UI component framework
- **React Context API**: State management for cart functionality
- **Fake Store API**: External data source for product information
- **CSS Modules**: Component-scoped styling
- **React Bootstrap Icons**: Icon library
- **localStorage**: Client-side data persistence

## Project Structure


src/
├── app/                  # App Router pages and layouts
│   ├── cart/             # Shopping cart page
│   ├── login/            # User authentication pages
│   ├── products/         # Product listing and details
│   ├── signup/           # User registration
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout with common elements
│   └── page.js           # Homepage
├── components/           # Reusable UI components
│   ├── Footer.js         # Site footer
│   └── Navigation.js     # Navigation bar with search
├── context/              # React Context providers
│   └── CartContext.js    # Shopping cart state management
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mahmoudadel810/NextJs-Ecommerce.git
cd shopnow-ecommerce
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## API Integration

The project uses [Fake Store API](https://fakestoreapi.com/) to fetch product data. It demonstrates:

- Fetching and displaying product data
- Error handling for API requests
- Real-time search functionality
- Filtering by product categories

## Deployment

The application can be easily deployed to Vercel or any other hosting platform that supports Next.js:

```bash
npm run build
npm run start
```

## Future Enhancements

- Payment gateway integration
- User profile management
- Admin dashboard
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Dark mode

## License

This project is available as open source under the terms of the MIT License.
