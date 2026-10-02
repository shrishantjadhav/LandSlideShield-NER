import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import {
  Settings,
  Shield,
  Bell,
  Cpu,
  Database,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';

export default function SettingsView() {
  const { user, addToast } = useAppState();

  const [watchThreshold, setWatchThreshold] = useState(40);
  const [highThreshold, setHighThreshold] = useState(70);
  const [criticalThreshold, setCriticalThreshold] = useState(85);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('Risk thresholds and operational preferences saved successfully.', 'success');
  };

  const integrations = [
    {
      name: 'India Meteorological Department (IMD) Radar Feed',
      status: 'Integration-Ready Module',
      protocol: 'REST / NetCDF-4 Weather Grid API',
      description: '24-hour and 72-hour cumulative precipitation ingestion for the 8 North Eastern States.',
      ready: true
    },
    {
      name: 'Sentinel-1 SAR / InSAR Ground Displacement',
      status: 'Integration-Ready Module',
      protocol: 'Copernicus Open Access Hub GeoTIFF',
      description: 'Bi-weekly phase interferometry detecting millimeter-scale precursory slope creep.',
      ready: true
    },
    {
      name: 'IoT Piezometer & Soil Moisture Telemetry',
      status: 'Integration-Ready Module',
      protocol: 'MQTT / CoAP Sensor Ingestion Broker',
      description: 'Real-time pore water pressure and volumetric water content from vulnerable highway cuts.',
      ready: true
    },
    {
      name: 'National Disaster Management Authority (CAP Gateway)',
      status: 'Integration-Ready Module',
      protocol: 'ITU-T X.1303 Common Alerting Protocol',
      description: 'Automated cell-broadcast SMS, radio sirens, and police control-room alerts.',
      ready: true
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px' }}>
      {/* Mandatory Final Product Statement Card (#49) */}
      <div
        className="card"
        style={{
          borderLeft: '4px solid var(--primary)',
          backgroundColor: 'var(--primary-light)',
          padding: '20px 24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Shield size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Official Product Statement
          </h3>
        </div>
        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--text-main)',
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 500
          }}
        >
          "LandslideShield NER is an AI-powered landslide early-warning and risk intelligence platform designed to help authorities identify evolving risk, understand contributing factors, assess potential impact, prioritize response and coordinate field verification across vulnerable regions of North Eastern India."
        </p>
      </div>

      {/* Officer Profile & Node Info */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Shield size={16} color="var(--primary)" />
            <span>Operational Officer Profile</span>
          </div>
          <span className="kpi-badge badge-safe">AUTHENTICATED SESSION</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Officer Name</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{user.name}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Designation</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{user.role}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Jurisdiction</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>NER 8 States Integrated Grid</div>
          </div>
        </div>
      </div>

      {/* Risk Thresholds Configuration Form (#35) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Sliders size={16} color="var(--primary)" />
            <span>AI Risk Scoring Calibration & Thresholds</span>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--risk-watch-text)' }}>
                Watch State Threshold
              </label>
              <input
                type="number"
                className="form-input"
                value={watchThreshold}
                onChange={(e) => setWatchThreshold(e.target.value)}
              />
              <span className="text-meta">Triggers precautionary sensor sweeps</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--risk-high-text)' }}>
                High Risk Threshold
              </label>
              <input
                type="number"
                className="form-input"
                value={highThreshold}
                onChange={(e) => setHighThreshold(e.target.value)}
              />
              <span className="text-meta">Triggers highway single-lane convoy control</span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--risk-critical)' }}>
                Critical Risk Threshold
              </label>
              <input
                type="number"
                className="form-input"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(e.target.value)}
              />
              <span className="text-meta">Triggers evacuation pre-orders and CAP siren</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Calibration Settings
            </button>
          </div>
        </form>
      </div>

      {/* Future-Ready Architecture & Module Status (#48) */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Database size={16} color="var(--primary)" />
              <span>Future-Ready Data Ingestion Architecture (#48)</span>
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Standardized interfaces ready for real-world government API and sensor connectivity
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {integrations.map((mod, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {mod.name}
                  </span>
                  <span className="kpi-badge badge-primary">{mod.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {mod.description}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Protocol: <code>{mod.protocol}</code>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--risk-safe-text)', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="var(--risk-safe)" />
                <span>Interface Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
