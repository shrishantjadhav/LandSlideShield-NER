import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../services/stateContext';
import { Search, Bell, CheckCircle2, AlertTriangle, Info, ChevronRight, X, Award } from 'lucide-react';
import JudgeScriptModal from './JudgeScriptModal';

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    notifications,
    setNotifications,
    setSelectedZoneId,
    scenarioStep,
    applyScenarioStep
  } = useAppState();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showJudgeScript, setShowJudgeScript] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const pageTitles = {
    'command-center': { title: 'Command Center', sub: 'Regional landslide risk and response overview' },
    'risk-map': { title: 'GIS Risk Map', sub: 'North Eastern Region high-resolution risk spatial layers' },
    'risk-intelligence': { title: 'Risk Intelligence', sub: 'AI-generated assessment of evolving landslide conditions' },
    'field-reports': { title: 'Field Reports', sub: 'Verified ground telemetry, citizen observations and image diagnostics' },
    'roads': { title: 'Road & Infrastructure Intelligence', sub: 'Monitoring arterial lifeline corridors, bridges and settlements' },
    'alerts': { title: 'Early Warning & Alerts', sub: 'Multi-channel public and authority early warning dissemination' },
    'response': { title: 'Response Management', sub: 'Operational incident tracking, resource dispatch and verification' },
    'video-showcase': { title: 'AI Video & Animated Cinematic Showcase', sub: 'Narrated presentation walkthrough: What makes LandslideShield NER unique' },
    'ai-assistant': { title: 'LandslideShield AI Assistant', sub: 'Operational natural language risk intelligence queries' },
    'ml-model': { title: 'AI/ML Model Architecture & Diagnostic Simulator', sub: 'XGBoost susceptibility model, SHAP feature weights, and CV crack diagnostics' },
    'analytics': { title: 'Risk Analytics', sub: 'Historical trends, regional risk distribution and response telemetry' },
    'settings': { title: 'Platform Settings & Info', sub: 'Operational configuration, sensor thresholds and system metadata' }
  };

  const currentMeta = pageTitles[activeTab] || { title: 'Command Center', sub: 'Disaster management portal' };

  // Close notifications on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      {/* Left Title & Breadcrumbs */}
      <div className="header-title-section">
        <div>
          <h1 className="page-main-heading">{currentMeta.title}</h1>
          <p className="page-sub-heading">{currentMeta.sub}</p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="header-actions">
        {/* Search Input */}
        <div className="header-search">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search zones, roads, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Operational Status Pill */}
        <div className="status-pill" title="All NER InSAR and telemetry feeds connected">
          <span className="status-dot"></span>
          <span>System Operational</span>
        </div>

        {/* Judge Pitch Script Button */}
        <button
          onClick={() => setShowJudgeScript(true)}
          className="btn btn-secondary btn-sm"
          style={{
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderColor: 'var(--primary-border)',
            fontWeight: 700,
            fontSize: '11.5px',
            gap: '5px'
          }}
          title="Open 3-Minute Hackathon Judge Speaking Script & Q&A"
          id="btn-open-pitch-script"
        >
          <Award size={13} color="var(--primary)" />
          <span>Judge Pitch Script</span>
        </button>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            id="notif-toggle-btn"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="icon-btn-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '360px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 150,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Operational Notifications ({unreadCount} unread)
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                    No recent notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (notif.zoneId) {
                          setSelectedZoneId(notif.zoneId);
                          setActiveTab('command-center');
                        } else if (notif.reportId) {
                          setActiveTab('field-reports');
                        } else if (notif.incidentId) {
                          setActiveTab('response');
                        }
                        setShowNotifications(false);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid var(--border-subtle)',
                        backgroundColor: notif.unread ? 'var(--primary-light)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-main)' }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* On-Screen Judge Speaking Script & Q&A Modal */}
      <JudgeScriptModal isOpen={showJudgeScript} onClose={() => setShowJudgeScript(false)} />
    </header>
  );
}
