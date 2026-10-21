
import { motion } from 'framer-motion';

const CustomerFeedback = () => {
  const reviews = [
    {
      id: 1,
      name: "Ayesha Rahman",
      role: "Verified Buyer",
      text: "The Sundarban Honey is absolutely incredible. Pure, raw, and tastes exactly like nature intended. Will definitely order again!",
      rating: 5,
    },
    {
      id: 2,
      name: "Tanvir Ahmed",
      role: "Health Enthusiast",
      text: "Finally found a brand that doesn't add sugar to dried fruits. The mixed citrus slices are my new favorite guilt-free snack.",
      rating: 5,
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      role: "Regular Customer",
      text: "The packaging is premium and resealable. The strawberry slices were gone within two days in my house. So good!",
      rating: 5,
    },
    {
      id: 4,
      name: "Rafiul Islam",
      role: "Fitness Coach",
      text: "I recommend DeshiRoot to all my clients. The Deglet Noor dates are the perfect pre-workout energy boost.",
      rating: 4,
    },
    {
      id: 5,
      name: "Sadia Karim",
      role: "Verified Buyer",
      text: "Fast delivery and excellent customer service. The green grape slices are tangy and sweet, exactly as described.",
      rating: 5,
    },
    {
      id: 6,
      name: "Mehedi Hasan",
      role: "Tea Lover",
      text: "The lemon slices are a game-changer for my evening tea. You can tell these are made from real, fresh lemons.",
      rating: 5,
    },
    {
      id: 7,
      name: "Farhana Akter",
      role: "Parent",
      text: "My kids love the lychee flower honey on their pancakes. It feels great to give them something natural and healthy.",
      rating: 5,
    },
    {
      id: 8,
      name: "Imran Chowdhury",
      role: "Food Blogger",
      text: "DeshiRoot has nailed the quality. Farm-fresh taste, beautiful packaging, and zero preservatives. Highly impressed.",
      rating: 4,
    },
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-emerald-50/30 overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Real reviews from real people who love our natural, dehydrated goodness.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Overlays for smooth fade effect on edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-emerald-50/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-emerald-50/90 to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30, // Adjust speed here
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[300px] sm:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between whitespace-normal"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4 text-emerald-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < review.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                  <span className="text-xs text-gray-500">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;