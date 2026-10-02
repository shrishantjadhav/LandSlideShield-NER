import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { NER_STATES } from '../services/mockData';
import GisMap from '../components/GisMap';
import {
  Layers,
  Filter,
  Clock,
  Search,
  RotateCcw,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';

export default function RiskMapView() {
  const {
    filterState,
    setFilterState,
    filterRiskLevel,
    setFilterRiskLevel,
    searchQuery,
    setSearchQuery,
    filteredZones,
    selectedZone,
    setSelectedZoneId,
    setActiveTab
  } = useAppState();

  const [timeWindow, setTimeWindow] = useState('LIVE');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 110px)' }}>
      {/* Top Filter and Controls Bar (#14) */}
      <div
        className="card"
        style={{
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* State Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>State:</span>
            <select
              className="form-select"
              style={{ width: '160px', height: '32px', fontSize: '12.5px', padding: '2px 8px' }}
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              {NER_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Risk Level:</span>
            <select
              className="form-select"
              style={{ width: '130px', height: '32px', fontSize: '12.5px', padding: '2px 8px' }}
              value={filterRiskLevel}
              onChange={(e) => setFilterRiskLevel(e.target.value)}
            >
              <option value="ALL">All Levels</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Risk</option>
              <option value="WATCH">Watch State</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {/* Time Window */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Window:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              {['LIVE', '+6h', '+12h', '+24h'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeWindow(t)}
                  style={{
                    border: 'none',
                    background: timeWindow === t ? 'var(--primary)' : '#FFFFFF',
                    color: timeWindow === t ? '#FFFFFF' : 'var(--text-secondary)',
                    padding: '4px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredZones.length}</strong> active zones
          </span>
          <button
            onClick={() => {
              setFilterState('All States');
              setFilterRiskLevel('ALL');
              setSearchQuery('');
            }}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Main Full GIS Map Display */}
      <div style={{ flex: 1, position: 'relative' }}>
        <GisMap height="100%" onSelectZone={(id) => setSelectedZoneId(id)} />

        {/* Floating Quick Summary Card on Top Right */}
        {selectedZone && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '320px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '14px',
              zIndex: 15
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Target Zone
                </span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {selectedZone.name}
                </div>
              </div>
              <span
                className={`kpi-badge ${
                  selectedZone.riskLevel === 'CRITICAL'
                    ? 'badge-critical'
                    : selectedZone.riskLevel === 'HIGH'
                    ? 'badge-high'
                    : 'badge-watch'
                }`}
              >
                {selectedZone.riskLevel}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: selectedZone.riskLevel === 'CRITICAL' ? 'var(--risk-critical)' : 'var(--text-main)' }}>
                {selectedZone.riskScore}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100 Risk Index</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
                Confidence: {selectedZone.confidence}%
              </span>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '8px 0' }}>
              {selectedZone.aiExplanation}
            </p>

            <button
              onClick={() => setActiveTab('risk-intelligence')}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <span>Inspect AI Risk Intelligence</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
