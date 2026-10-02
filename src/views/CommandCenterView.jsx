import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import GisMap from '../components/GisMap';
import ExplainableAiPanel from '../components/ExplainableAiPanel';
import ScenarioTourBar from '../components/ScenarioTourBar';
import CreateAlertModal from '../components/CreateAlertModal';
import AssignTeamModal from '../components/AssignTeamModal';
import SubmitReportModal from '../components/SubmitReportModal';
import {
  ShieldAlert,
  AlertTriangle,
  Bell,
  FileText,
  Truck,
  TrendingUp,
  Activity,
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function CommandCenterView() {
  const {
    riskZones,
    roads,
    fieldReports,
    alerts,
    selectedZone,
    setSelectedZoneId,
    setActiveTab
  } = useAppState();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // KPIs (#9)
  const criticalCount = riskZones.filter((z) => z.riskLevel === 'CRITICAL').length;
  const highRiskCount = riskZones.filter((z) => z.riskLevel === 'HIGH').length;
  const activeAlertsCount = alerts.filter((a) => a.active).length;
  const totalReportsCount = fieldReports.length;
  const affectedRoadsCount = roads.filter((r) => r.status === 'BLOCKED' || r.status === 'RESTRICTED').length;

  return (
    <div>
      {/* Interactive Judging Demo Scenario Bar (#32, #33, #46) */}
      <ScenarioTourBar />

      {/* KPI Cards Grid (#9) */}
      <div className="kpi-grid">
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-critical)' }}>
          <span className="kpi-label">Critical Zones</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-critical)' }}>
              0{criticalCount}
            </span>
            <span className="kpi-badge badge-critical">IMMEDIATE ACTION</span>
          </div>
          <span className="text-meta" style={{ marginTop: '2px' }}>
            East Sikkim &bull; Mizoram Central
          </span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-high)' }}>
          <span className="kpi-label">High Risk Zones</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-high-text)' }}>
              17
            </span>
            <span className="kpi-badge badge-high">+3 from yesterday</span>
          </div>
          <span className="text-meta" style={{ marginTop: '2px' }}>
            Meghalaya &bull; Arunachal
          </span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <span className="kpi-label">Active Alerts</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--primary)' }}>
              12
            </span>
            <span className="kpi-badge badge-primary">CAP DISPATCHED</span>
          </div>
          <span className="text-meta" style={{ marginTop: '2px' }}>
            Multi-channel broadcast
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Field Reports</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--text-main)' }}>
              43
            </span>
            <span className="kpi-badge badge-neutral">38 VERIFIED</span>
          </div>
          <span className="text-meta" style={{ marginTop: '2px' }}>
            Ground evidence active
          </span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-watch)' }}>
          <span className="kpi-label">Roads Affected</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-watch-text)' }}>
              06
            </span>
            <span className="kpi-badge badge-watch">2 BLOCKED</span>
          </div>
          <span className="text-meta" style={{ marginTop: '2px' }}>
            NH-10, NH-54 arterial lines
          </span>
        </div>
      </div>

      {/* Main Command Center Layout: Map (68%) + Explainable AI Panel (32%) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.9fr) minmax(360px, 1fr)', gap: '18px', marginBottom: '20px' }}>
        {/* GIS Map Container (#10) */}
        <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="var(--primary)" />
              <h3 className="card-title" style={{ margin: 0 }}>
                North Eastern Region GIS Command Grid
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="btn btn-secondary btn-sm"
                title="Log a new field report"
                id="btn-quick-log-report"
              >
                <Plus size={14} />
                <span>Log Field Report</span>
              </button>
              <button
                onClick={() => setActiveTab('risk-map')}
                className="btn btn-secondary btn-sm"
                title="Open full-screen GIS page"
              >
                <span>Full GIS View</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          <GisMap height="560px" onSelectZone={(id) => setSelectedZoneId(id)} />

          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Click any circular zone or road polyline on map to inspect AI drivers & potential impact</span>
            <span>Real-time Sentinel-1 InSAR & IMD Telemetry Active</span>
          </div>
        </div>

        {/* Explainable AI Risk Driver Side Panel (#11, #12, #13) */}
        <div>
          <ExplainableAiPanel
            onOpenAlertModal={() => setIsAlertModalOpen(true)}
            onOpenTeamModal={() => setIsTeamModalOpen(true)}
          />
        </div>
      </div>

      {/* Operational Response & Alert Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px' }}>
        {/* Recent Early Warning Alerts */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Bell size={16} color="var(--risk-critical)" />
              <span>Active Early Warning Alerts</span>
            </div>
            <button
              onClick={() => setActiveTab('alerts')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11.5px' }}
            >
              View All Alerts
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  backgroundColor: alert.level === 'CRITICAL' ? 'var(--risk-critical-bg)' : '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className={`kpi-badge ${alert.level === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`}>
                    {alert.level}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {alert.title}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 6px' }}>
                  {alert.summary}
                </p>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  <strong>Dispatched:</strong> {alert.channels.join(' &bull; ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lifeline Road Status Summary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Truck size={16} color="var(--primary)" />
              <span>Critical Corridor Connectivity</span>
            </div>
            <button
              onClick={() => setActiveTab('roads')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11.5px' }}
            >
              Road Intelligence
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {roads.slice(0, 4).map((road) => {
              const statusBadge =
                road.status === 'BLOCKED'
                  ? 'badge-critical'
                  : road.status === 'RESTRICTED'
                  ? 'badge-high'
                  : road.status === 'CAUTION'
                  ? 'badge-watch'
                  : 'badge-safe';

              return (
                <div
                  key={road.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {road.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{road.sector}</div>
                  </div>
                  <span className={`kpi-badge ${statusBadge}`}>{road.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateAlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
      <AssignTeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
      <SubmitReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
}
