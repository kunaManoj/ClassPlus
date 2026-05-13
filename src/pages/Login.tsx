import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Mail, User as UserIcon, Camera } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://tse3.mm.bing.net/th/id/OIP.9BmcntVPRmZutVgjHB9IOwHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      login({
        id: decoded.sub || Date.now().toString(),
        name: decoded.name || 'Google User',
        email: decoded.email,
        profilePicture: decoded.picture || 'https://tse3.mm.bing.net/th/id/OIP.9BmcntVPRmZutVgjHB9IOwHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        isPremium: false,
      });
      navigate('/');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    login({
      id: Date.now().toString(),
      name,
      email,
      profilePicture,
      isPremium: false,
    });
    navigate('/');
  };

  const handleGuestLogin = () => {
    login({
      id: Date.now().toString(),
      name: 'Guest User',
      profilePicture: 'https://tse3.mm.bing.net/th/id/OIP.9BmcntVPRmZutVgjHB9IOwHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
      isPremium: false,
    });
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, var(--surface) 0%, var(--background) 100%)' }}>
      <div className="glass fade-in" style={{ padding: '2.5rem', borderRadius: '1rem', width: '100%', maxWidth: '550px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="Greetify Logo" style={{ height: '64px', width: 'auto' }} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }} className="gradient-text">Welcome to Greetify</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Create stunning personalized cards in seconds.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={profilePicture}
              alt="Profile Preview"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block', border: '3px solid var(--surface-hover)' }}
            />
            <button
              type="button"
              onClick={() => {
                const url = prompt('Enter image URL for profile picture:', profilePicture);
                if (url) setProfilePicture(url);
              }}
              style={{ position: 'absolute', bottom: 0, right: '50%', transform: 'translateX(40px)', background: 'var(--primary-color)', color: 'white', padding: '0.4rem', borderRadius: '50%', border: '2px solid var(--surface)' }}
            >
              <Camera size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>

            <div style={{ position: 'relative', flex: 1 }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Continue
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Login Failed');
            }}
            useOneTap
          />
        </div>

        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ padding: '0 1rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        <button onClick={handleGuestLogin} className="btn btn-outline" style={{ width: '100%' }}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
