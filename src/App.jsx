import { useState } from 'react';
import { PlatformProvider } from './context/PlatformContext';
import DashboardView from './components/dashboard/DashboardView';
import TbaView from './components/tba/TbaView';
import PatientView from './components/patient/PatientView';

function PlatformHub() {
  const [viewMode, setViewMode] = useState('ecosystem'); // 'ecosystem' | 'dashboard' | 'tba' | 'patient'
  const [mobilePersona, setMobilePersona] = useState('patient'); // 'patient' | 'tba'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8F9FB', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Portal Header */}
      <header style={{
        background: '#1A2B4A',
        color: '#FFFFFF',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '4px solid #C6F135',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #007A7C 0%, #3D9B8F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}>
            ❤️
          </div>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 800, letterSpacing: 0.5 }}>AHF</h1>
            <p style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Maternal Health Platform Hub</p>
          </div>
        </div>

        {/* View Switchers */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setViewMode('ecosystem')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: viewMode === 'ecosystem' ? '#C6F135' : 'rgba(255,255,255,0.1)',
              color: viewMode === 'ecosystem' ? '#1A2B4A' : '#FFFFFF',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: viewMode === 'ecosystem' ? '0 4px 12px rgba(198,241,53,0.3)' : 'none'
            }}
          >
            👥 Interactive Ecosystem (Recommended)
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: viewMode === 'dashboard' ? '#007A7C' : 'rgba(255,255,255,0.06)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            📊 Admin Dashboard Only
          </button>
          <button
            onClick={() => setViewMode('tba')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: viewMode === 'tba' ? '#007A7C' : 'rgba(255,255,255,0.06)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🩺 TBA mobile App Only
          </button>
          <button
            onClick={() => setViewMode('patient')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: viewMode === 'patient' ? '#007A7C' : 'rgba(255,255,255,0.06)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🤰 Patient App Only
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        {/* INTERACTIVE ECOSYSTEM VIEW */}
        {viewMode === 'ecosystem' && (
          <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 64px)', overflow: 'hidden' }}>
            
            {/* Left: Administrative Dashboard (62% width) */}
            <div style={{ width: '64%', borderRight: '2px solid #E2E8F0', overflowY: 'auto', background: '#F8F9FB' }}>
              <DashboardView />
            </div>

            {/* Right: Phone Simulator Panel (36% width) */}
            <div style={{
              width: '36%',
              background: '#F0F2F5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 16px',
              overflowY: 'auto',
              boxShadow: 'inset 4px 0 15px rgba(0,0,0,0.02)'
            }}>
              {/* Device switcher tab */}
              <div style={{
                display: 'flex',
                background: '#E2E8F0',
                borderRadius: 14,
                padding: 4,
                marginBottom: 20,
                width: 320,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <button
                  onClick={() => setMobilePersona('patient')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: 'none',
                    background: mobilePersona === 'patient' ? '#FFFFFF' : 'transparent',
                    color: mobilePersona === 'patient' ? '#E07A5F' : '#6B6460',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: mobilePersona === 'patient' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  🤰 Patient App (AHF Mama)
                </button>
                <button
                  onClick={() => setMobilePersona('tba')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: 'none',
                    background: mobilePersona === 'tba' ? '#FFFFFF' : 'transparent',
                    color: mobilePersona === 'tba' ? '#007A7C' : '#6B6460',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: mobilePersona === 'tba' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  🩺 TBA / CHEW Tool
                </button>
              </div>

              {/* Tips for demo */}
              <div style={{
                background: '#E6F4F4',
                color: '#005F61',
                padding: '10px 14px',
                borderRadius: 12,
                fontSize: 11,
                lineHeight: 1.4,
                width: 320,
                marginBottom: 20,
                border: '1px solid #B2DEDE',
                textAlign: 'left'
              }}>
                💡 <b>Try it:</b> Record a symptom or check-in in the <b>Patient App</b>, or log a delivery or ANC visit in the <b>TBA Tool</b>, and watch the dashboard metrics and alerts update instantly on the left!
              </div>

              {/* Render the selected mobile device simulation */}
              {mobilePersona === 'patient' ? <PatientView /> : <TbaView />}
            </div>
          </div>
        )}

        {/* FULLSCREEN STANDALONE VIEWS */}
        {viewMode === 'dashboard' && (
          <div style={{ width: '100%', overflowY: 'auto', background: '#F8F9FB', minHeight: 'calc(100vh - 64px)' }}>
            <DashboardView />
          </div>
        )}

        {viewMode === 'tba' && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#F0F2F5', padding: '32px 0', overflowY: 'auto', minHeight: 'calc(100vh - 64px)' }}>
            <TbaView />
          </div>
        )}

        {viewMode === 'patient' && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#F0F2F5', padding: '32px 0', overflowY: 'auto', minHeight: 'calc(100vh - 64px)' }}>
            <PatientView />
          </div>
        )}

      </main>
    </div>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <PlatformHub />
    </PlatformProvider>
  );
}
