import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

/* ---------------------------- Checkout Modal Component ----------------------------- */

const CheckoutModal = ({ isOpen, onClose, totalItems, grandTotal }) => {
  if (!isOpen) return null;

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    
    // SweetAlert2 success popup
    Swal.fire({
      title: 'Order Confirmed!',
      text: `Your order of ${totalItems} items for ${grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })} Tk has been placed successfully.`,
      icon: 'success',
      confirmButtonColor: '#065f46', // Emerald-800
      confirmButtonText: 'Confirm',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl px-6 py-2.5 font-bold'
      }
    }).then(() => {
      onClose();
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 className="text-2xl font-bold text-gray-900 mb-1">Checkout Order</h3>
          <p className="text-sm text-gray-500 mb-6">Complete your details to confirm the order.</p>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">Total Items</p>
              <p className="text-xs text-gray-500">Qty: {totalItems} Pcs</p>
            </div>
            <p className="text-lg font-extrabold text-emerald-800">৳{grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>

          <form onSubmit={handleConfirmOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
              <input required type="text" placeholder="Your Name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
              <input required type="tel" placeholder="+880 1700-000000" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Delivery Address</label>
              <textarea required rows="2" placeholder="House/Street, Area, City" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm resize-none"></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="border border-emerald-700 bg-emerald-50/50 p-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-800">
                  <input type="radio" name="payment" defaultChecked className="accent-emerald-800" />
                  Cash On Delivery
                </label>
                <label className="border border-gray-200 p-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-400">
                  <input type="radio" name="payment" disabled />
                  bKash / Nagad
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 mt-4 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/10 text-sm"
            >
              Confirm Order (৳{grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })})
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ------------------------------ Main Cart Component ----------------------------- */

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        const selectedProducts = data.slice(0, 7).map((product) => ({
          ...product,
          quantity: Math.floor(Math.random() * 3) + 1, 
        }));
        setCartItems(selectedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load cart:", err);
        setLoading(false);
      });
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };


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

  const { subtotal, totalItems, shipping, tax, grandTotal } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const ship = sub > 1000 ? 0 : 60;
    const taxAmount = sub * 0.05; 
    return {
      subtotal: sub,
      totalItems: items,
      shipping: ship,
      tax: taxAmount,
      grandTotal: sub + ship + taxAmount,
    };
  }, [cartItems]);

  const money = (n) => `৳${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  if (loading) {
    return <div className="py-24 text-center text-emerald-800 font-semibold">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="inline-block bg-emerald-800 text-white font-bold px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-500 text-sm mt-1">{totalItems} items in your cart</p>
            </div>
            <button onClick={handleShopClick} className="text-sm font-semibold text-emerald-800 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Continue Shopping
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <Link to={`/product/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-emerald-800 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                      <p className="text-emerald-800 font-bold mt-2 sm:hidden">{money(item.price)}</p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-4 sm:gap-2">
                      <div className="hidden sm:block text-lg font-extrabold text-emerald-800">
                        {money(item.price * item.quantity)}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {/* Qty Controls */}
                        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 h-9 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-30 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-emerald-900/5 border border-gray-100 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">
                    {shipping === 0 ? 'Free' : money(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-gray-900">{money(tax)}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-emerald-800">{money(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Proceed to Checkout
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout guaranteed. Free shipping on orders over ৳1000.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        totalItems={totalItems}
        grandTotal={grandTotal}
      />
    </>
  );
};

export default Cart;