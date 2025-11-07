import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');

  // Mock data
  const allProducts = [
    { id: 1, name: 'Wireless Power Bank 20000mAh', price: 2500, originalPrice: 3000, category: 'Power Bank', rating: 4.5, inStock: true },
    { id: 2, name: 'Smart Watch Pro', price: 8500, originalPrice: 10000, category: 'Wearables', rating: 4.7, inStock: true },
    { id: 3, name: 'Bluetooth Headphones', price: 1800, originalPrice: 2200, category: 'Audio', rating: 4.3, inStock: true },
    { id: 4, name: 'Gaming Mouse RGB', price: 1200, originalPrice: 1500, category: 'Accessories', rating: 4.6, inStock: true },
    { id: 5, name: 'USB-C Hub 7-in-1', price: 3200, originalPrice: 4000, category: 'Accessories', rating: 4.4, inStock: true },
    { id: 6, name: 'Wireless Keyboard', price: 2800, originalPrice: 3500, category: 'Accessories', rating: 4.5, inStock: false },
    { id: 7, name: 'Portable SSD 1TB', price: 12000, originalPrice: 15000, category: 'Storage', rating: 4.8, inStock: true },
    { id: 8, name: 'Webcam HD 1080p', price: 4500, originalPrice: 5500, category: 'Accessories', rating: 4.2, inStock: true }
  ];

  const searchResults = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">{searchResults.length} products found</p>
        </div>

        {/* Sort Bar */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-4 mb-6 flex justify-between items-center animate-fade-in border border-white/30">
          <div className="text-sm text-gray-600">
            Showing {searchResults.length} results
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover-lift group animate-scale-in border border-white/30"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="h-48 bg-gradient-to-br from-gray-100/80 to-gray-200/80 group-hover:from-blue-50/80 group-hover:to-purple-50/80 transition-all duration-500"></div>
                <div className="p-4">
                  <div className="text-xs text-blue-600 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-lg font-bold text-blue-600">BDT {product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        BDT {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="text-sm">
                    {product.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="mb-4">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">Try searching with different keywords</p>
            <Link
              to="/"
              className="inline-block bg-blue-600/90 backdrop-blur-lg text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl border border-white/20"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;