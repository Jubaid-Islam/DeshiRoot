import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import banner from "/images/banner.jpg";

const Banner = () => {
  // Animation variants for text elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <div className="relative w-full h-[500px] md:h-[800px] flex items-center overflow-hidden bg-gray-900">

      {/* Background Image with Zoom-out Animation */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Dark Emerald/Black Overlay for text readability */}
      <div className="absolute inset-0 bg-gray-500/20"></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block bg-emerald-700/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Premium Quality
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            Nature's Sweetness, <br />
            <span className="text-emerald-700">Perfectly Sliced.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-gray-100 text-lg md:text-xl max-w-lg"
          >
            Discover our premium dehydrated fruit slices. 100% natural, no added sugar, and packed with flavor.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => {
                const element = document.getElementById('products-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-block bg-white text-emerald-800 font-bold px-8 py-3.5 rounded-md hover:bg-emerald-50  transition-all duration-300 text-center shadow-lg"
            >
              Shop Now
            </button>
            <Link
              to="/about"
              className="inline-block bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-md hover:bg-emerald-600  transition-all duration-300 text-center shadow-lg"
            >
              About Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;