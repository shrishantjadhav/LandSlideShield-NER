import React from 'react';
import { useAppState } from '../services/stateContext';
import {
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Mountain,
  History,
  FileCheck,
  Send,
  Users,
  Navigation,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

export default function ExplainableAiPanel({ onOpenAlertModal, onOpenTeamModal }) {
  const { selectedZone, setActiveTab } = useAppState();

  if (!selectedZone) return null;

  const isCritical = selectedZone.riskLevel === 'CRITICAL';
  const isHigh = selectedZone.riskLevel === 'HIGH';

  const riskBadgeClass =
    selectedZone.riskLevel === 'CRITICAL'
      ? 'badge-critical'
      : selectedZone.riskLevel === 'HIGH'
      ? 'badge-high'
      : selectedZone.riskLevel === 'WATCH'
      ? 'badge-watch'
      : 'badge-safe';

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Zone Title Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Selected Operational Zone
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
            {selectedZone.name}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            State: {selectedZone.state} &bull; Coordinates: {selectedZone.lat.toFixed(4)}° N, {selectedZone.lng.toFixed(4)}° E
          </span>
        </div>
        <span className={`kpi-badge ${riskBadgeClass}`} style={{ fontSize: '12px', padding: '3px 10px' }}>
          {selectedZone.riskLevel}
        </span>
      </div>

      {/* Visual Risk Score (#13) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            AI Risk Score
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: isCritical ? 'var(--risk-critical)' : isHigh ? 'var(--risk-high-text)' : 'var(--text-main)',
                lineHeight: 1
              }}
            >
              {selectedZone.riskScore}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '11.5px', marginTop: '4px', fontWeight: 600, color: isCritical ? 'var(--risk-critical)' : 'var(--text-muted)' }}>
            {selectedZone.changePercent} from previous assessment
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Confidence:</span>
            <strong style={{ color: 'var(--text-main)' }}>{selectedZone.confidence}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Risk Trend:</span>
            <strong style={{ color: 'var(--risk-critical)' }}>{selectedZone.riskTrend}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Forecast Window:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Next 12 Hours</span>
          </div>
        </div>
      </div>

      {/* Potential Impact Card (#11) */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.03em' }}>
          Assessed Potential Impact
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{selectedZone.impact.roadsCount}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Roads</div>
          </div>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{selectedZone.impact.villagesCount}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Villages</div>
          </div>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{selectedZone.impact.bridgesCount}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Bridge</div>
          </div>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: isCritical ? 'var(--risk-critical)' : 'var(--text-main)' }}>
              {selectedZone.impact.populationExposed.toLocaleString()}
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Exposed Pop.</div>
          </div>
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          <strong>Critical Corridor:</strong> {selectedZone.impact.roadNames.join(', ')}
        </div>
      </div>

      {/* Explainable AI — Why is this area at risk? (#12) */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-main)' }}>
            Why is this area at risk? (Explainable AI)
          </span>
          <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>Multi-Factor Fusion</span>
        </div>

        {/* Driver Progress Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {selectedZone.drivers.map((driver, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{driver.name}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {driver.current} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({driver.contribution})</span>
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${driver.weight}%`,
                    height: '100%',
                    backgroundColor:
                      index === 0 && isCritical
                        ? 'var(--risk-critical)'
                        : index === 1 && isCritical
                        ? 'var(--risk-high)'
                        : 'var(--primary)',
                    borderRadius: '3px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Explainable AI Paragraph (#12, #16) */}
        <div
          style={{
            marginTop: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '3px solid var(--primary)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.45
          }}
        >
          {selectedZone.aiExplanation}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={onOpenAlertModal}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '13px' }}
          id="btn-issue-alert"
        >
          <Send size={15} />
          <span>Issue Early Alert</span>
        </button>

        <button
          onClick={onOpenTeamModal}
          className="btn btn-secondary"
          style={{ width: '100%', fontSize: '13px' }}
          id="btn-assign-team"
        >
          <Users size={15} />
          <span>Assign Response</span>
        </button>
      </div>

      <button
        onClick={() => setActiveTab('risk-intelligence')}
        className="btn btn-secondary btn-sm"
        style={{ width: '100%', color: 'var(--primary)', borderColor: 'var(--primary-border)' }}
      >
        <span>View Full AI Risk Intelligence</span>
        <ExternalLink size={13} />
      </button>
    </div>
  );
}
