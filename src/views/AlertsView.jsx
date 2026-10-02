import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import CreateAlertModal from '../components/CreateAlertModal';
import AssignTeamModal from '../components/AssignTeamModal';
import {
  Bell,
  Plus,
  Send,
  Radio,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  Users
} from 'lucide-react';

export default function AlertsView() {
  const { alerts, setSelectedZoneId, setActiveTab, addToast } = useAppState();
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isAssignTeamOpen, setIsAssignTeamOpen] = useState(false);

  const handleNotifyAuthorities = (alert) => {
    addToast(`Automated notification dispatched to District Magistrate & SDRF Control Room for ${alert.location}.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Action Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
            Early Warning & Common Alerting Protocol (CAP)
          </h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Geo-targeted dissemination across citizen SMS, mobile push, highway variable-message signs, and emergency siren grid
          </span>
        </div>

        <button
          onClick={() => setIsCreateAlertOpen(true)}
          className="btn btn-primary"
          id="btn-open-create-alert-modal"
        >
          <Plus size={16} />
          <span>Issue New Warning</span>
        </button>
      </div>

      {/* Chronological Alert Stream (#25) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {alerts.map((alert) => {
          const isCritical = alert.level === 'CRITICAL';
          const isHigh = alert.level === 'HIGH';

          return (
            <div
              key={alert.id}
              className="card"
              style={{
                borderLeft: `4px solid ${isCritical ? 'var(--risk-critical)' : isHigh ? 'var(--risk-high)' : 'var(--risk-watch)'}`,
                padding: '18px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: isCritical ? 'var(--risk-critical-bg)' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`kpi-badge ${isCritical ? 'badge-critical' : isHigh ? 'badge-high' : 'badge-watch'}`}>
                    {alert.level} ALERT
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {alert.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  <span>Created: {alert.timestamp}</span>
                </div>
              </div>

              {/* Alert Summary & Potential Impact */}
              <div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {alert.summary}
                </p>
                <div style={{ fontSize: '12.5px', color: 'var(--text-main)', fontWeight: 600, marginTop: '6px' }}>
                  <strong>Potential Impact:</strong> {alert.impact}
                </div>
              </div>

              {/* Multi-Channel Distribution Badges */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Active Dissemination:
                </span>
                {alert.channels.map((chan, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle2 size={12} color="var(--risk-safe)" />
                    <span>{chan}</span>
                  </span>
                ))}
              </div>

              {/* Actions Row (#25) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                <button
                  onClick={() => {
                    setSelectedZoneId(alert.zoneId);
                    setActiveTab('command-center');
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <MapPin size={13} />
                  <span>View Zone</span>
                </button>

                <button
                  onClick={() => handleNotifyAuthorities(alert)}
                  className="btn btn-secondary btn-sm"
                >
                  <Radio size={13} />
                  <span>Notify Authorities</span>
                </button>

                <button
                  onClick={() => setIsAssignTeamOpen(true)}
                  className="btn btn-primary btn-sm"
                  style={{ marginLeft: 'auto' }}
                >
                  <Users size={13} />
                  <span>Assign Response</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <CreateAlertModal isOpen={isCreateAlertOpen} onClose={() => setIsCreateAlertOpen(false)} />
      <AssignTeamModal isOpen={isAssignTeamOpen} onClose={() => setIsAssignTeamOpen(false)} />
    </div>
  );
}
