import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Swal from 'sweetalert2';

/* ----------------------------- Small UI pieces ----------------------------- */

const STAR_PATH =
  'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z';

const Star = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={STAR_PATH} />
  </svg>
);

const StarRating = ({ value = 0, size = 'w-4 h-4' }) => {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div className="relative inline-flex" aria-label={`${value} out of 5 stars`}>
      <div className="flex text-gray-200">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={size} />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden text-amber-400" style={{ width: `${pct}%` }}>
        <div className="flex w-max">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={size} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Icon = ({ d, className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ICONS = {
  heart:
    'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  cart: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  check: 'M4.5 12.75l6 6 9-13.5',
  minus: 'M5 12h14',
  plus: 'M12 5v14m-7-7h14',
  leaf: 'M12 21c-4.5 0-8-3.5-8-8 0-5 4-9 16-9 0 12-4 17-8 17zm0 0c0-4 1.5-7 5-9',
  truck:
    'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  shield:
    'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  arrowLeft: 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18',
  x: 'M6 18L18 6M6 6l12 12',
};

/* ------------------------------- Helpers ----------------------------------- */

// SweetAlert er html option e user input dekhale XSS ar jhuki thake, tai escape kora hocche
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/* ---------------------------- Payment Modal Component ----------------------------- */

const PaymentModal = ({ isOpen, onClose, product, quantity, total }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullName = escapeHtml(form.get('fullName'));

    // Age modal bondho kori, tarpor success popup dekhai
    onClose();

    Swal.fire({
      icon: 'success',
      title: 'Order Confirmed!',
      html: `
        <p style="margin-bottom:6px;color:#374151">Thank you, <b>${fullName}</b></p>
        <p style="margin-bottom:4px">${escapeHtml(product.name)} × ${quantity}</p>
        <p style="font-weight:700;color:#065f46;font-size:18px;margin-bottom:8px">
          Total: ${total.toLocaleString('en-US')} Tk
        </p>
        <p style="color:#6b7280;font-size:13px">
          Amader team shiggroi apnar sathe jogajog korbe.
        </p>
      `,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#065f46',
      timerProgressBar: true,
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
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon d={ICONS.x} className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold text-gray-900 mb-1">Checkout Order</h3>
          <p className="text-sm text-gray-500 mb-6">Complete your payment details to confirm the order.</p>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">Qty: {quantity} Pcs</p>
            </div>
            <p className="text-lg font-extrabold text-emerald-800">৳{total.toLocaleString('en-US')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
              <input
                required
                name="fullName"
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+880 1700-000000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Delivery Address</label>
              <textarea
                required
                name="address"
                rows="2"
                placeholder="House/Street, Area, City"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="border border-emerald-700 bg-emerald-50/50 p-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-800">
                  <input type="radio" name="payment" defaultChecked className="accent-emerald-800" />
                  Cash On Delivery
                </label>
                <label className="border border-gray-200 p-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-600 opacity-60">
                  <input type="radio" name="payment" disabled />
                  bKash / Nagad
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 mt-4 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/10 text-sm"
            >
              Confirm Order (৳{total.toLocaleString('en-US')})
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ------------------------------- Animations -------------------------------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* --------------------------------- States ---------------------------------- */

const LoadingSkeleton = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-4 w-32 bg-gray-100 rounded mb-8" />
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-3xl" />
        <div className="space-y-5">
          <div className="h-10 w-3/4 bg-gray-100 rounded" />
          <div className="h-5 w-1/3 bg-gray-100 rounded" />
          <div className="h-9 w-40 bg-gray-100 rounded" />
          <div className="h-24 bg-gray-100 rounded-2xl" />
          <div className="h-12 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

const NotFound = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4 text-center">
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
        <Icon d={ICONS.leaf} className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
      <p className="text-gray-500 mb-8">The product you are looking for does not exist or was removed.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-semibold hover:bg-emerald-700 transition-colors"
      >
        <Icon d={ICONS.arrowLeft} className="w-4 h-4" /> Back to Products
      </Link>
    </div>
  </section>
);

/* ------------------------------ Main component ----------------------------- */

const TABS = [
  { key: 'reviews', label: 'Reviews' },
  { key: 'description', label: 'Description' },
  { key: 'details', label: 'Details' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const reduceMotion = useReducedMotion();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('reviews'); // Default set to 'reviews'
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const addedTimer = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    setLoading(true);
    setQuantity(1);
    setActiveImage(0);
    setActiveTab('reviews'); // Default set to 'reviews'
    setLiked(false);

    fetch('/products.json', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.find((p) => p.id === parseInt(id, 10)) || null);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const comments = product?.comments ?? [];

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    comments.forEach((c) => {
      const r = Math.min(5, Math.max(1, Math.round(c.rating)));
      counts[r - 1] += 1;
    });
    return counts;
  }, [comments]);

  if (loading) return <LoadingSkeleton />;
  if (!product) return <NotFound />;

  const images = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
  const inStock = Number(product.inStock) || 0;
  const isAvailable = inStock > 0;
  const isLow = isAvailable && inStock <= 10;
  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * quantity;
  const money = (n) => `৳${n.toLocaleString('en-US')}`;
  const description = (product.description || '').replace(/\.\s*$/, '');

  const handleAddToCart = () => {
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-emerald-50/40 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-emerald-800 transition-colors group">
            <Icon d={ICONS.arrowLeft} className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Products
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group bg-white rounded-3xl overflow-hidden aspect-square border border-gray-100 shadow-xl shadow-emerald-900/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[activeImage]}
                  src={images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur ${
                  isAvailable ? 'bg-emerald-600/90 text-white' : 'bg-red-500/90 text-white'
                }`}
              >
                {isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setLiked((v) => !v)}
                aria-pressed={liked}
                className="absolute top-4 right-4 w-11 h-11 bg-white/95 backdrop-blur rounded-full shadow-md flex items-center justify-center"
              >
                <motion.svg
                  key={String(liked)}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={1.6}
                  className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={ICONS.heart} />
                </motion.svg>
              </motion.button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImage
                        ? 'border-emerald-700 ring-2 ring-emerald-200'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
            <motion.div variants={item}>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-5">
                <div className="flex items-center gap-2">
                  <StarRating value={Number(product.rating) || 0} />
                  <span className="font-semibold text-gray-800">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-gray-200" />
                <span className="inline-flex items-center gap-1.5">
                  <Icon d={ICONS.heart} className="w-4 h-4 text-red-400" />
                  {product.likes} Likes
                </span>
              </div>

              <div className="flex items-end gap-3">
                <div className="text-4xl font-extrabold text-emerald-800">{money(unitPrice)}</div>
                {isLow && (
                  <span className="mb-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    Only {inStock} left
                  </span>
                )}
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={item} className="grid grid-cols-3 gap-3 my-7">
              {[
                { icon: ICONS.leaf, label: 'Natural' },
                { icon: ICONS.truck, label: 'Fast Delivery' },
                { icon: ICONS.shield, label: 'Quality Checked' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl bg-white border border-emerald-100 py-3 px-2 text-center shadow-sm"
                >
                  <span className="text-emerald-700">
                    <Icon d={b.icon} />
                  </span>
                  <span className="text-xs font-medium text-gray-600">{b.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Purchase box with Responsive Button Paddings */}
            <motion.div
              variants={item}
              className="rounded-2xl bg-white border border-gray-100 shadow-lg shadow-emerald-900/5 p-4 sm:p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 h-11 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-30 transition-colors"
                  >
                    <Icon d={ICONS.minus} className="w-4 h-4" />
                  </button>
                  <div className="w-12 text-center font-bold text-gray-900">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={quantity}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="block"
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => setQuantity((q) => Math.min(inStock || 1, q + 1))}
                    disabled={!isAvailable || quantity >= inStock}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-30 transition-colors"
                  >
                    <Icon d={ICONS.plus} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-dashed border-gray-200 mb-4">
                <span className="text-sm text-gray-500">Total</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-2xl font-extrabold text-emerald-800"
                  >
                    {money(total)}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Action Buttons with responsive layout & padding */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`flex-1 min-h-[48px] px-4 sm:px-6 py-3 rounded-xl font-bold border-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    added
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'bg-white border-emerald-800 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={added ? 'added' : 'add'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Icon d={added ? ICONS.check : ICONS.cart} className="w-5 h-5" />
                      {added ? 'Added!' : 'Add to Cart'}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsPaymentOpen(true)}
                  disabled={!isAvailable}
                  className="flex-1 min-h-[48px] px-4 sm:px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold shadow-md shadow-emerald-900/20 hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={item}>
              <div className="flex gap-6 border-b border-gray-200 mb-6" role="tablist">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative pb-3 text-sm font-semibold transition-colors ${
                      activeTab === tab.key ? 'text-emerald-800' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {tab.key === 'reviews' && comments.length > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px]">
                        {comments.length}
                      </span>
                    )}
                    {activeTab === tab.key && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-emerald-700 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'reviews' && (
                    <div>
                      {comments.length === 0 ? (
                        <p className="text-gray-500 text-sm">No reviews yet.</p>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl bg-gray-50 p-5 mb-6">
                            <div className="text-center sm:pr-6 sm:border-r border-gray-200">
                              <div className="text-5xl font-extrabold text-gray-900">{product.rating}</div>
                              <div className="mt-1 flex justify-center">
                                <StarRating value={Number(product.rating) || 0} />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</div>
                            </div>
                            <div className="flex-1 w-full space-y-1.5">
                              {[5, 4, 3, 2, 1].map((star) => {
                                const count = distribution[star - 1];
                                const pct = comments.length ? (count / comments.length) * 100 : 0;
                                return (
                                  <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="w-3">{star}</span>
                                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.7, delay: (5 - star) * 0.07 }}
                                        className="h-full bg-amber-400 rounded-full"
                                      />
                                    </div>
                                    <span className="w-4 text-right">{count}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <motion.ul variants={container} initial="hidden" animate="show" className="space-y-4">
                            {comments.map((c) => (
                              <motion.li
                                key={c.id}
                                variants={item}
                                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                              >
                                <img
                                  src={c.userAvatar}
                                  alt={c.userName}
                                  className="w-11 h-11 rounded-full object-cover border border-gray-200 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                                    <h4 className="font-bold text-gray-900 text-sm">{c.userName}</h4>
                                    <StarRating value={c.rating} size="w-3 h-3" />
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{c.comment}</p>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === 'description' && (
                    <p className="text-gray-600 leading-relaxed">
                      {description}. Carefully dehydrated to preserve maximum flavor and nutrients.
                    </p>
                  )}

                  {activeTab === 'details' && (
                    <dl className="rounded-2xl bg-gray-50 divide-y divide-gray-100 text-sm">
                      <div className="flex justify-between gap-4 p-4">
                        <dt className="text-gray-500">Availability</dt>
                        <dd className={`font-semibold ${isAvailable ? 'text-emerald-600' : 'text-red-500'}`}>
                          {product.availability} ({inStock} left)
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4 p-4">
                        <dt className="text-gray-500">Supplier</dt>
                        <dd className="font-medium text-gray-800 break-all text-right">{product.supplierEmail}</dd>
                      </div>
                      <div className="flex justify-between gap-4 p-4">
                        <dt className="text-gray-500">Unit price</dt>
                        <dd className="font-medium text-gray-800">{money(unitPrice)}</dd>
                      </div>
                    </dl>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal Component */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        product={product}
        quantity={quantity}
        total={total}
      />
    </section>
  );
};

export default ProductDetails;