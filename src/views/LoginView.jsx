import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { ShieldCheck, ArrowRight, Lock, Mail, CheckCircle2 } from 'lucide-react';

export default function LoginView() {
  const { setIsAuthenticated, addToast } = useAppState();
  const [email, setEmail] = useState('demo@landslideshield.in');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    addToast('Welcome back, Disaster Management Officer T. Dorjee.', 'success');
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    addToast('Logged in as Disaster Management Officer (Demo Mode).', 'success');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
      >
        {/* Left Side: Brand Narrative */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
            padding: '44px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div className="brand-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m8 14 3-3 2 2 3-4" />
                </svg>
              </div>
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  LandslideShield <span className="brand-tag">NER</span>
                </h1>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>North Eastern Region</p>
              </div>
            </div>

            <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', marginBottom: '12px' }}>
              ROUND 1 PROTOTYPE &bull; NDMA / SDMA SPECIAL CELL
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '12px' }}>
              AI-Powered Landslide Early Warning
            </h2>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              "Monitor evolving landslide risk, understand potential impact, and coordinate early response across vulnerable mountain lifelines."
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--risk-safe)" />
                <span>Multi-source fusion: InSAR, IMD rainfall & soil telemetry</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--risk-safe)" />
                <span>Explainable AI risk factors with 86% baseline confidence</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--risk-safe)" />
                <span>Multi-channel CAP early warning & response dispatch</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            Tagline: <strong>Predict Risk. Explain Threats. Protect Communities.</strong>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>Sign In to Portal</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Authorized disaster management & field personnel
            </p>
          </div>

          {/* Quick Demo Access Button (#8) */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleDemoLogin}
              className="btn btn-primary"
              style={{ width: '100%', height: '42px', fontSize: '14px' }}
              id="btn-demo-officer"
            >
              <span>Continue as Demo Officer</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              One-click instant login for evaluation & judging
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>or sign in with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                  required
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                  required
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Remember credentials for this session
              </label>
            </div>

            <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '40px' }} id="btn-login">
              Sign In
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <strong>Demo Credentials:</strong><br />
            Email: <code style={{ color: 'var(--primary)' }}>demo@landslideshield.in</code> &bull; Password: <code style={{ color: 'var(--primary)' }}>demo123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
