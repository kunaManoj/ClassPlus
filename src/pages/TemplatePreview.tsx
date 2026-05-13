import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockTemplates } from '../lib/templates';
import { Share2, ArrowLeft, Check, Download, Edit3, Image as ImageIcon, Type, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function TemplatePreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useStore();
  const [shareSuccess, setShareSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [preloadedFile, setPreloadedFile] = useState<File | null>(null);
  const [preloadedDataUrl, setPreloadedDataUrl] = useState<string | null>(null);
  
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardPhoto] = useState(user?.profilePicture || '');
  const [cardBackground, setCardBackground] = useState('');
  const [cardMessage, setCardMessage] = useState('Wishing you a wonderful day filled with joy and happiness!');
  const [showMessage, setShowMessage] = useState(false);
  const [activeEditor, setActiveEditor] = useState<'name' | 'background' | 'message' | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const template = mockTemplates.find(t => t.id === id);

  useEffect(() => {
    if (!user) navigate('/login');
    if (!template) navigate('/');
    if (template?.isPremium && !user?.isPremium) navigate('/');
    if (template) setCardBackground(template.imageUrl);
  }, [user, template, navigate]);

  useEffect(() => {
    setPreloadedFile(null);
    setPreloadedDataUrl(null);

    const timer = setTimeout(async () => {
      if (!cardRef.current || !template) return;
      try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
        setPreloadedDataUrl(dataUrl);
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `${template.title.replace(/\s+/g, '_')}_Greeting.png`, { type: 'image/png' });
        setPreloadedFile(file);
      } catch (err) {
        console.error('Failed to pre-generate image', err);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [template, cardName, cardBackground, cardMessage, showMessage]);

  if (!user || !template) return null;

  const handleShare = async () => {
    if (!preloadedFile) return alert("Still preparing your image, please try again in a second...");

    try {
      if (navigator.canShare && navigator.canShare({ files: [preloadedFile] })) {
        await navigator.share({
          title: `My ${template.category} Greeting`,
          text: `Check out this personalized greeting I created!`,
          files: [preloadedFile]
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        alert("Your device doesn't support sharing files directly. It will be downloaded instead.");
        handleDownload(); 
      }
    } catch (err: any) {
      console.error('Error sharing image', err);
      if (err.name !== 'AbortError') {
        alert("Sharing failed. Downloading instead...");
        handleDownload();
      }
    }
  };

  const handleDownload = () => {
    if (!preloadedDataUrl) return alert("Still preparing your image, please try again in a second...");

    try {
      const link = document.createElement('a');
      link.download = `${template.title.replace(/\s+/g, '_')}_Greeting.png`;
      link.href = preloadedDataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error downloading image', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        onClick={() => navigate('/')} 
        className="btn btn-outline" 
        style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}
      >
        <ArrowLeft size={18} /> Back to Templates
      </button>

      <div className="fade-in" style={{ width: '100%', background: 'var(--surface)', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        
        {/* The Card Container that will be captured */}
        <div 
          ref={cardRef} 
          style={{ 
            position: 'relative', 
            width: '100%', 
            paddingTop: '125%', 
            borderRadius: '1rem', 
            overflow: 'hidden',
            background: '#fff'
          }}
        >
          <img 
            src={cardBackground || template.imageUrl} 
            alt={template.title} 
            referrerPolicy="no-referrer"
            style={{ position: 'absolute', top: '15%', left: 0, width: '100%', height: '85%', objectFit: 'cover' }}
          />
          
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '15%', background: '#2c2623', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '2rem', letterSpacing: '0.05em', fontWeight: '500' }}>{cardName}</span>
          </div>
          <div style={{ 
            position: 'absolute', 
            top: '15%', 
            left: '10%', 
            transform: 'translateY(-50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid #22c55e',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            zIndex: 2
          }}>
            <img src={cardPhoto} alt={cardName} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {showMessage && (
            <div style={{ 
              position: 'absolute', 
              bottom: '5%', 
              left: '5%', 
              right: '5%', 
              background: 'rgba(0,0,0,0.6)', 
              backdropFilter: 'blur(8px)',
              padding: '1.25rem', 
              borderRadius: '0.75rem',
              color: '#fff',
              textAlign: 'center',
              fontSize: '1.1rem',
              lineHeight: '1.4',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {cardMessage}
            </div>
          )}
        </div>

      </div>

      {/* Personalization Toolbar */}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => setActiveEditor(activeEditor === 'name' ? null : 'name')} 
            className={`btn ${activeEditor === 'name' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
          >
            <Edit3 size={16} /> Edit Name
          </button>
          <button 
            onClick={() => setActiveEditor(activeEditor === 'background' ? null : 'background')} 
            className={`btn ${activeEditor === 'background' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
          >
            <ImageIcon size={16} /> Change Background
          </button>
          <button 
            onClick={() => {
              setActiveEditor(activeEditor === 'message' ? null : 'message');
              if (!showMessage) setShowMessage(true);
            }} 
            className={`btn ${showMessage ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
          >
            <Type size={16} /> {showMessage ? 'Edit Message' : 'Add Message'}
          </button>
          <button 
            onClick={() => {
              setCardName(user?.name || '');
              if (template) setCardBackground(template.imageUrl);
              setCardMessage('Wishing you a wonderful day filled with joy and happiness!');
              setShowMessage(false);
              setActiveEditor(null);
            }} 
            className="btn btn-outline"
            style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {activeEditor && (
          <div className="glass fade-in" style={{ width: '100%', padding: '1.5rem', borderRadius: '1rem' }}>
            {activeEditor === 'name' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Display Name</label>
                <input 
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff' }}
                />
              </div>
            )}
            {activeEditor === 'background' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Template Image URL</label>
                <input 
                  type="text"
                  value={cardBackground}
                  onChange={(e) => setCardBackground(e.target.value)}
                  placeholder="Paste background image URL here..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff' }}
                />
              </div>
            )}
            {activeEditor === 'message' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Personal Message</label>
                  <button 
                    onClick={() => {
                      setShowMessage(false);
                      setActiveEditor(null);
                    }}
                    style={{ fontSize: '0.8rem', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Remove from card
                  </button>
                </div>
                <textarea 
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  style={{ width: '100%', height: '80px', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff', resize: 'none' }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
        <button 
          onClick={handleShare} 
          disabled={!preloadedFile}
          className={`btn ${shareSuccess ? 'btn-primary' : 'btn-outline'}`} 
          style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}
        >
          {!preloadedFile ? (
            'Preparing...'
          ) : shareSuccess ? (
            <><Check size={20} style={{ color: '#fff' }} /> Shared!</>
          ) : (
            <><Share2 size={20} /> Share</>
          )}
        </button>

        <button 
          onClick={handleDownload} 
          disabled={!preloadedFile}
          className={`btn ${downloadSuccess ? 'btn-outline' : 'btn-primary'}`} 
          style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}
        >
          {!preloadedFile ? (
            'Preparing...'
          ) : downloadSuccess ? (
            <><Check size={20} style={{ color: '#10b981' }} /> Saved!</>
          ) : (
            <><Download size={20} /> Download</>
          )}
        </button>
      </div>
    </div>
  );
}
