import React from 'react';
import { useAppState } from '../services/stateContext';
import {
  ShieldAlert,
  LayoutDashboard,
  Map as MapIcon,
  Cpu,
  FileText,
  Truck,
  Bell,
  Activity,
  Bot,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, alerts, incidents, fieldReports, user, setIsAuthenticated } = useAppState();

  const activeAlertsCount = alerts.filter((a) => a.active).length;
  const inProgressIncidentsCount = incidents.filter((i) => i.status === 'IN PROGRESS' || i.status === 'ASSIGNED').length;
  const pendingReportsCount = fieldReports.filter((r) => r.status === 'Pending').length;

  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'risk-map', label: 'Risk Map', icon: MapIcon },
    { id: 'risk-intelligence', label: 'Risk Intelligence', icon: Cpu },
    { id: 'field-reports', label: 'Field Reports', icon: FileText, badge: pendingReportsCount, isAlert: false },
    { id: 'roads', label: 'Road & Infrastructure', icon: Truck },
    { id: 'alerts', label: 'Alerts & Warnings', icon: Bell, badge: activeAlertsCount, isAlert: true },
    { id: 'response', label: 'Response Management', icon: Activity, badge: inProgressIncidentsCount, isAlert: false },
    { id: 'video-showcase', label: 'AI Video Showcase', icon: Sparkles, tag: 'VIDEO' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, tag: 'AI' },
    { id: 'ml-model', label: 'AI/ML Model Engine', icon: Cpu, tag: 'ML' },
    { id: 'analytics', label: 'Risk Analytics', icon: BarChart3 }
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div>
        <div className="brand-header">
          <div className="brand-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m8 14 3-3 2 2 3-4" />
            </svg>
          </div>
          <div>
            <div className="brand-title">
              LandslideShield <span className="brand-tag">NER</span>
            </div>
            <div className="brand-sub">Risk Intelligence Platform</div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                id={`nav-${item.id}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`nav-badge ${item.isAlert ? 'alert-badge' : ''}`}>
                    {item.badge}
                  </span>
                )}
                {item.tag && (
                  <span className="nav-badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button
          onClick={() => setActiveTab('settings')}
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          id="nav-settings"
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className="nav-item"
          id="nav-help"
        >
          <HelpCircle size={18} />
          <span>Documentation / About</span>
        </button>

        <div className="user-profile-badge">
          <div className="user-avatar">TD</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            title="Log out"
            style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
