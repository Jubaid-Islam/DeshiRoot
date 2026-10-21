
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleShopClick = () => {
    if (location.pathname !== '/') {
      navigate('/#products-section');
      setTimeout(() => {
        const element = document.getElementById('products-section');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('products-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Hero & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Rooted in Nature, <br />
              <span className="text-emerald-800">Crafted for You.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              DeshiRoot started with a simple mission: to bring the authentic, natural taste of Bangladeshi fruits and honey to your table without any artificial additives.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We work directly with local farmers and beekeepers to ensure every slice of fruit and drop of honey is of the highest quality. Our dehydration process locks in the nutrients and flavor, giving you a healthy, guilt-free snack that lasts longer.
            </p>
            <button
              onClick={handleShopClick}
              className="inline-block bg-emerald-800 text-white font-bold px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors shadow-md"
            >
              Explore Our Products
            </button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1612114552466-dec7f3b89199?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Dried fruits"
              className="w-full h-64 object-cover rounded-2xl mt-8 shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1654515722385-c684c5331c04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Honey jar"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1661879628301-f3662508e1be?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Farm fresh"
              className="w-full h-48 object-cover rounded-2xl col-span-2 shadow-lg"
            />
          </motion.div>
        </div>

        {/* Middle Section: Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-100 rounded-3xl p-8 md:p-12 mb-24 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-700">50+</h3>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Local Farmers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-700">10K+</h3>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-700">100%</h3>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Natural Products</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-700">0%</h3>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Added Sugar</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Values */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600">
            The principles that guide everything we do at DeshiRoot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Purity First",
              desc: "We believe in food as nature intended it. No preservatives, no artificial colors, and absolutely no added sugar.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5 0-8-3.5-8-8 0-5 4-9 16-9 0 12-4 17-8 17zm0 0c0-4 1.5-7 5-9" />
                </svg>
              )
            },
            {
              title: "Farmer Support",
              desc: "By sourcing directly from local farmers, we ensure fair prices for them and the freshest produce for you.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              )
            },
            {
              title: "Eco-Friendly",
              desc: "We use recyclable, resealable packaging to minimize our environmental footprint and keep your food fresh.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.25 2.25 0 01-.659-1.591V8.25a9 9 0 00-18 0v2.417c0 .596-.238 1.164-.659 1.591l-1.135 1.135a2.25 2.25 0 00-.659 1.591v.75a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-.659-1.591z" />
                </svg>
              )
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;