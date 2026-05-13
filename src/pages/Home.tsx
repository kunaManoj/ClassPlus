import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockTemplates, CATEGORIES } from '../lib/templates';
import { Crown, Lock } from 'lucide-react';

export default function Home() {
  const { user, setPremium } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUpsell, setShowUpsell] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredTemplates = activeCategory === 'All'
    ? mockTemplates
    : mockTemplates.filter(t => t.category === activeCategory);

  const handleTemplateClick = (e: React.MouseEvent, isPremium: boolean) => {
    if (isPremium && !user.isPremium) {
      e.preventDefault();
      setShowUpsell(true);
    }
  };

  const handleSubscribe = () => {
    setPremium(true);
    setShowUpsell(false);
    alert('Welcome to Premium! You can now use all templates.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="fade-in">
          Hello, <span className="gradient-text">{user.name}</span>!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Choose a beautiful template below to create your personalized greeting card.
        </p>
      </section>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline'}`}
            style={{ whiteSpace: 'nowrap', borderRadius: '2rem' }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredTemplates.map((template) => (
          <Link
            key={template.id}
            to={`/preview/${template.id}`}
            onClick={(e) => handleTemplateClick(e, template.isPremium)}
            className="fade-in"
            style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', position: 'relative', transition: 'transform 0.3s ease, box-shadow 0.3s ease', textDecoration: 'none', background: 'var(--surface)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', paddingTop: '125%', background: '#fff' }}>
              <img
                src={template.imageUrl}
                alt={template.title}
                referrerPolicy="no-referrer"
                style={{ position: 'absolute', top: '15%', left: 0, width: '100%', height: '85%', objectFit: 'cover' }}
              />

              {/* Dark Header */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '15%', background: '#2c2623', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '1.25rem', letterSpacing: '0.05em', fontWeight: '500' }}>{user.name}</span>
              </div>

              {/* Profile Picture overlapping */}
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #22c55e',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 2
              }}>
                <img src={user.profilePicture} alt={user.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {template.isPremium && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.875rem', fontWeight: 'bold', backdropFilter: 'blur(4px)', zIndex: 3 }}>
                  {user.isPremium ? <Crown size={16} /> : <Lock size={16} />}
                  Premium
                </div>
              )}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{template.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{template.category}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Subscription Upsell Modal */}
      {showUpsell && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="glass fade-in" style={{ padding: '3rem', borderRadius: '1rem', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
            <button
              onClick={() => setShowUpsell(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)', fontSize: '1.5rem' }}
            >
              &times;
            </button>
            <div style={{ display: 'inline-flex', background: 'rgba(251, 191, 36, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', color: '#fbbf24' }}>
              <Crown size={48} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Unlock Premium</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Get access to all exclusive templates and remove watermarks. Upgrade your experience today!
            </p>
            <button onClick={handleSubscribe} className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
              Subscribe Now - ₹199/month
            </button>
            <button onClick={() => setShowUpsell(false)} className="btn" style={{ width: '100%', marginTop: '1rem', color: 'var(--text-muted)' }}>
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
