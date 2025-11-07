import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductCatalog = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Mock data
  const products = [
    { id: 1, name: 'Wireless Power Bank 20000mAh', price: 2500, originalPrice: 3000, brand: 'Anker', rating: 4.5, inStock: true },
    { id: 2, name: 'Smart Watch Pro', price: 8500, originalPrice: 10000, brand: 'Samsung', rating: 4.7, inStock: true },
    { id: 3, name: 'Bluetooth Headphones', price: 1800, originalPrice: 2200, brand: 'Sony', rating: 4.3, inStock: true },
    { id: 4, name: 'Gaming Mouse RGB', price: 1200, originalPrice: 1500, brand: 'Logitech', rating: 4.6, inStock: true },
    { id: 5, name: 'USB-C Hub 7-in-1', price: 3200, originalPrice: 4000, brand: 'Anker', rating: 4.4, inStock: true },
    { id: 6, name: 'Wireless Keyboard', price: 2800, originalPrice: 3500, brand: 'Logitech', rating: 4.5, inStock: false },
    { id: 7, name: 'Portable SSD 1TB', price: 12000, originalPrice: 15000, brand: 'Samsung', rating: 4.8, inStock: true },
    { id: 8, name: 'Webcam HD 1080p', price: 4500, originalPrice: 5500, brand: 'Logitech', rating: 4.2, inStock: true }
  ];

  const brands = ['Anker', 'Samsung', 'Sony', 'Logitech'];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(p => 
    (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
    p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 animate-fade-in">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900">{category || 'All Products'}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category || 'All Products'}</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 animate-scale-in">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 sticky top-24 hover:shadow-2xl transition-shadow duration-300 border border-white/30">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: BDT {priceRange[0]} - {priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Brands */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 50000]);
                  setSortBy('featured');
                }}
                className="w-full bg-white/50 backdrop-blur-lg text-gray-700 py-2 rounded-2xl hover:bg-white/80 transform hover:scale-105 transition-all duration-200 shadow-md border border-white/30"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover-lift group animate-scale-in border border-white/30"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100/80 to-gray-200/80 group-hover:from-blue-50/80 group-hover:to-purple-50/80 transition-all duration-500"></div>
                  <div className="p-4">
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;