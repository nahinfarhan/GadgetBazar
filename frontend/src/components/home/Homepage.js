import React from 'react';

const Homepage = ({ user }) => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl rounded-3xl text-white p-8 mb-12 animate-slide-up overflow-hidden relative shadow-2xl border border-white/20">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Welcome to GadgetBazar</h1>
            <p className="text-xl mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>Discover the latest electronics and gadgets at unbeatable prices</p>
            <button className="bg-white/90 backdrop-blur-lg text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-white transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              Shop Now
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 animate-pulse"></div>
        </section>

        {/* Categories */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Power Bank', 'Wearables', 'Headphones', 'Smartphones', 'Laptops', 'Accessories'].map((category, index) => (
              <div key={category} className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 text-center hover-lift cursor-pointer group animate-scale-in shadow-lg border border-white/30" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100/80 to-purple-100/80 backdrop-blur-lg rounded-full group-hover:from-blue-200/80 group-hover:to-purple-200/80 transition-all duration-300"></div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{category}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Wireless Power Bank 20000mAh', price: 'BDT 2,500' },
              { name: 'Smart Watch Pro', price: 'BDT 8,500' },
              { name: 'Bluetooth Headphones', price: 'BDT 1,800' },
              { name: 'Gaming Mouse RGB', price: 'BDT 1,200' }
            ].map((product, index) => (
              <div key={product.name} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover-lift group animate-scale-in border border-white/30" style={{animationDelay: `${index * 0.15}s`}}>
                <div className="h-48 bg-gradient-to-br from-gray-100/80 to-gray-200/80 group-hover:from-blue-50/80 group-hover:to-purple-50/80 transition-all duration-500"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    <a 
                      href={`/product/${index + 1}`}
                      className="bg-blue-600/90 backdrop-blur-lg text-white px-4 py-2 rounded-2xl hover:bg-blue-700 text-center transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;