import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-emerald-800 font-semibold">
        Loading products...
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section id="products-section" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Latest Products
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div 
              key={product.id} 
              variants={cardVariants}
        onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-shadow duration-300 group cursor-pointer"
            >
              
              {/* Image Container */}
              <div className="h-60 w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900 truncate pr-2">
                    {product.name}
                  </h3>
                  <span className="text-sm font-bold text-emerald-700 whitespace-nowrap">
                    {product.price} ৳
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-5 flex-grow truncate">
                  {product.description || "Placeat non exercit"}
                </p>

                <div        
                  className="text-emerald-800 text-xs font-bold tracking-wider hover:text-emerald-600 transition-colors flex items-center gap-1 uppercase mt-auto"
                >
                  SHOP THE PRODUCT 
                  <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
              
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProductGrid;