import { motion } from 'framer-motion';

const ComparisonTable = () => {
  const features = [
    { name: "100% Natural Ingredients", deshiroot: true, others: false },
    { name: "No Added Sugar or Preservatives", deshiroot: true, others: false },
    { name: "Farm Direct Sourcing", deshiroot: true, others: "Varies" },
    { name: "Premium Resealable Packaging", deshiroot: true, others: false },
    { name: "Free Shipping over ৳1000", deshiroot: true, others: "Varies" },
    { name: "30-Day Money Back Guarantee", deshiroot: true, others: false },
    { name: "Price", deshiroot: "From ৳180", others: "৳300+" },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Same Quality. <br className="hidden sm:block" />
            <span className="text-emerald-800">Without the premium price tag.</span>
          </h2>
          <p className="text-gray-600">
            You don't need to spend a fortune to get premium, healthy snacks.
          </p>
        </motion.div>

        {/* Table Container with Horizontal Scroll on Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm"
        >
          <table className="w-full min-w-[500px] text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-3 sm:py-5 sm:px-6 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider w-1/2">
                  Feature
                </th>
                <th className="py-4 px-3 sm:py-5 sm:px-6 text-center text-sm sm:text-base font-extrabold text-emerald-800 w-1/4 border-l border-gray-200 bg-emerald-50/30">
                  DeshiRoot
                </th>
                <th className="py-4 px-3 sm:py-5 sm:px-6 text-center text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4 border-l border-gray-200">
                  Other Brands
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm font-medium text-gray-700">
                    {feature.name}
                  </td>
                  
                  {/* DeshiRoot Column */}
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-center border-l border-gray-200 bg-emerald-50/10">
                    {typeof feature.deshiroot === 'boolean' ? (
                      feature.deshiroot ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold text-xs sm:text-sm">✕</span>
                      )
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-emerald-800 whitespace-nowrap">{feature.deshiroot}</span>
                    )}
                  </td>
                  
                  {/* Other Brands Column */}
                  <td className="py-3 px-3 sm:py-4 sm:px-6 text-center border-l border-gray-200">
                    {typeof feature.others === 'boolean' ? (
                      feature.others ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-gray-300 font-bold text-xs sm:text-sm">✕</span>
                      )
                    ) : (
                      <span className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">{feature.others}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
};

export default ComparisonTable;