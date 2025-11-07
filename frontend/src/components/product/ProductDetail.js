import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - replace with API call
  const product = {
    id: id,
    name: 'Wireless Power Bank 20000mAh',
    price: 2500,
    originalPrice: 3000,
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 50,
    description: 'High-capacity wireless power bank with fast charging technology. Compatible with all smartphones and devices.',
    specifications: {
      'Capacity': '20000mAh',
      'Input': '5V/2A, 9V/2A',
      'Output': '5V/3A, 9V/2A, 12V/1.5A',
      'Wireless Output': '10W/7.5W/5W',
      'Weight': '450g',
      'Dimensions': '150 × 68 × 28mm'
    },
    features: [
      'Wireless charging capability',
      'Fast charging technology',
      'LED power indicator',
      'Multiple device charging',
      'Compact and portable design'
    ]
  };

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    alert(`Added ${product.name} to wishlist`);
  };

  const formatPrice = (price) => {
    return `BDT ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-slide-up">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-blue-600">Products</a></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="animate-scale-in">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transform hover:scale-110 transition-all duration-200 ${
                    selectedImage === index ? 'border-blue-600 scale-105' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="ml-3 text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="text-sm text-green-600 mt-1">
                {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600/90 backdrop-blur-lg text-white py-3 px-6 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 hover:shadow-xl border border-white/20"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="px-6 py-3 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl hover:bg-white/80 transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
                >
                  ♡ Wishlist
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 animate-fade-in hover:shadow-2xl transition-shadow duration-300 border border-white/30">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors duration-200 animate-slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;