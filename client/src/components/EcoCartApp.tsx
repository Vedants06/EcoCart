import { useEffect, useMemo, useState } from 'react';
import { categories, Product, products } from '../data/products';

type Cart = Record<number, number>;
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function EcoCartApp() {
    const [cart, setCart] = useState<Cart>({});
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [roundup, setRoundup] = useState(true);
    const [notice, setNotice] = useState('');
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 120);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const visibleProducts = useMemo(() => products.filter((product) => {
        const matchesCategory = category === 'All' || product.category === category;
        return matchesCategory && product.name.toLowerCase().includes(search.toLowerCase());
    }), [category, search]);
    const cartItems = products.filter((product) => cart[product.id]);
    const subtotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0);
    const roundupAmount = subtotal ? Math.ceil(subtotal) - subtotal : 0;
    const total = subtotal + (roundup ? roundupAmount : 0);
    const treesFunded = roundup ? roundupAmount : 0;

    const updateQuantity = (product: Product, amount: number) => {
        setCart((current) => {
            const next = { ...current, [product.id]: Math.max(0, (current[product.id] || 0) + amount) };
            if (!next[product.id]) delete next[product.id];
            return next;
        });
    };
    const checkout = () => {
        if (!subtotal) return;
        setNotice('Order reserved. Your impact receipt is ready.');
        setCart({});
        setCartOpen(false);
    };

    return <div className="eco-cart-app">
        <header className="topbar"><a className="brand" href="#top" aria-label="EcoCart home"><span className="brand-mark">+</span> EcoCart</a><nav aria-label="Main navigation"><a href="#shop">Shop</a><a href="#impact">Your impact</a><a href="#story">Our story</a></nav><button className={`cart-button ${hasScrolled ? 'cart-button-floating' : ''}`} onClick={() => setCartOpen(true)} aria-label="Open cart"><span className="cart-label">Cart</span><span className="cart-count">{Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)}</span></button></header>
        <main id="top">
            <section className="hero">
            <div className="hero-copy"><p className="eyebrow">GOOD GOODS, GENTLER PLANET</p><h1>Small choices.<br /><em>Real change.</em></h1><p className="hero-text">Thoughtfully made essentials that make everyday living a little lighter.</p><a className="primary-button" href="#shop">Explore the collection <span>↘</span></a></div><div className="hero-art"><div className="hero-note">01 / 06<br /><strong>Designed to<br />stay in use.</strong></div><div className="hero-disc">NEW<br /><b>SEASON</b></div></div></section>
            <section className="trust-row"><span>Ships plastic-free</span><span>Certified materials</span><span>1% for the planet</span><span>Carbon-conscious delivery</span></section>
            <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">THE EDIT</p><h2>Everyday, considered.</h2></div><p className="section-intro">Objects with a longer life and a smaller footprint.</p></div><div className="shop-tools"><div className="categories">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search collection" /></label></div><div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} /><span className="impact-tag">Low impact</span><button className="quick-add" onClick={() => updateQuantity(product, 1)} aria-label={`Add ${product.name} to cart`}>+</button></div><div className="product-meta"><div><p className="product-category">{product.category} · ★ {product.rating}</p><h3>{product.name}</h3><p className="impact-copy">{product.impact}</p></div><strong>{money.format(product.price)}</strong></div></article>)}</div></section>
            <section className="impact-section" id="impact"><div><p className="eyebrow">THE ECOCART PROMISE</p><h2>Your checkout can<br /><em>grow something.</em></h2><p>Every order rounds up to fund verified local restoration projects. You choose the goods; we make the good go further.</p><button className="text-button" onClick={() => setRoundup(!roundup)}>{roundup ? 'Round-up on' : 'Round-up off'} <span className={`toggle ${roundup ? 'on' : ''}`} /></button></div><div className="impact-stats"><div><span className="stat-number">{treesFunded.toFixed(2)}</span><span>trees funded<br />this order</span></div><div><span className="stat-number">{(treesFunded * 20).toFixed(0)}kg</span><span>CO₂ offset<br />estimated</span></div><div><span className="stat-number">100%</span><span>of round-ups<br />go to impact</span></div></div></section>
            <section className="story-section" id="story"><span className="story-number">02</span><div><p className="eyebrow">A BETTER WAY TO BUY</p><h2>Less stuff.<br />More <em>meaning.</em></h2></div><p>EcoCart brings together the makers, materials, and mindful habits that move us toward a more considered way of living.</p></section>
        </main>
        <footer><span className="brand"><span className="brand-mark">+</span> EcoCart</span><span>© 2024 EcoCart Collective</span><span>Made for a lighter tomorrow.</span></footer>
        {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">YOUR BAG</p><h2>{subtotal ? `${cartItems.length} selections` : 'Your bag is empty'}</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{money.format(product.price)}</span><div className="quantity"><button onClick={() => updateQuantity(product, -1)} aria-label="Decrease quantity">−</button><span>{cart[product.id]}</span><button onClick={() => updateQuantity(product, 1)} aria-label="Increase quantity">+</button></div></div></div>)}{subtotal > 0 && <div className="checkout"><label><input type="checkbox" checked={roundup} onChange={(event) => setRoundup(event.target.checked)} /> Round up ${roundupAmount.toFixed(2)} for restoration</label><div><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div><div className="total"><span>Total</span><strong>{money.format(total)}</strong></div><button className="primary-button" onClick={checkout}>Continue to checkout <span>↗</span></button></div>}{notice && <p className="notice">{notice}</p>}</aside></div>}
    </div>;
}

export default EcoCartApp;
