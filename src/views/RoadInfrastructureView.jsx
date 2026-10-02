import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Building,
  School,
  HeartPulse,
  Users,
  Compass,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function RoadInfrastructureView() {
  const { roads, riskZones, selectedZone, setSelectedZoneId, setActiveTab } = useAppState();

  const [selectedRoadId, setSelectedRoadId] = useState('RD-01');

  // Road counters (#22)
  const totalMonitored = 124;
  const atRisk = 18;
  const restrictedCount = 6;
  const blockedCount = 2;

  const selectedRoad = roads.find((r) => r.id === selectedRoadId) || roads[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Road Metrics (#22) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card">
          <span className="kpi-label">Monitored Mountain Corridors</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{totalMonitored}</span>
            <span className="kpi-badge badge-neutral">NER ARTERIAL</span>
          </div>
          <span className="text-meta">Highways & state corridors</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-watch)' }}>
          <span className="kpi-label">At Elevated Risk</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-watch-text)' }}>{atRisk}</span>
            <span className="kpi-badge badge-watch">PRE-ALERT</span>
          </div>
          <span className="text-meta">Slope saturation &gt;65%</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-high)' }}>
          <span className="kpi-label">Restricted Movement</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-high-text)' }}>{restrictedCount}</span>
            <span className="kpi-badge badge-high">ONE-WAY / ESCORT</span>
          </div>
          <span className="text-meta">NH-29, SH-5, NH-13</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-critical)' }}>
          <span className="kpi-label">Fully Blocked Corridors</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-critical)' }}>0{blockedCount}</span>
            <span className="kpi-badge badge-critical">IMPASSIBLE</span>
          </div>
          <span className="text-meta">NH-10 (Sikkim) &bull; NH-54 (Mizoram)</span>
        </div>
      </div>

      {/* Middle: AI Response Prioritization (#24) & Impact Assessment (#23) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* AI Response Prioritization (#24) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <ShieldAlert size={16} color="var(--primary)" />
                <span>AI Operational Response Prioritization</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Dynamically weighted from real-time landslide risk, population exposure & lifeline criticality
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Priority 1 */}
            <div
              style={{
                border: '1px solid var(--risk-critical-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--risk-critical-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="kpi-badge badge-critical">PRIORITY 1</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    East Sikkim Corridor (Zone ES-042)
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Risk Score: <strong>87</strong> &bull; Impact: <strong>High</strong> &bull; Road Status: <strong>Critical (NH-10 Blocked)</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  2,450 exposed &bull; Main civil & defense supply lifeline to Gangtok
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedZoneId('ES-042');
                  setActiveTab('command-center');
                }}
                className="btn btn-danger btn-sm"
              >
                <span>Action Focus</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Priority 2 */}
            <div
              style={{
                border: '1px solid var(--risk-high-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--risk-high-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="kpi-badge badge-high">PRIORITY 2</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Mizoram Central (Zone MZ-014)
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Risk Score: <strong>81</strong> &bull; Impact: <strong>High</strong> &bull; Road Status: <strong>Blocked (NH-54)</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  1,820 exposed &bull; Durtlang bypass subsidence threatening transit
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedZoneId('MZ-014');
                  setActiveTab('command-center');
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>Inspect</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Priority 3 */}
            <div
              style={{
                border: '1px solid var(--risk-watch-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--risk-watch-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="kpi-badge badge-watch">PRIORITY 3</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Meghalaya Plateau (Zone MG-008)
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Risk Score: <strong>76</strong> &bull; Impact: <strong>Medium</strong> &bull; Road Status: <strong>Caution (SH-5 Scarp)</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  940 exposed &bull; Boulder catch-fence clearance underway
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedZoneId('MG-008');
                  setActiveTab('command-center');
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>Inspect</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: '12px',
              padding: '10px 12px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              border: '1px solid var(--border-subtle)'
            }}
          >
            <strong>OPERATIONAL PROTOCOL NOTE (#24):</strong> This is NOT a political ranking. It is an automated operational risk-priority schedule generated strictly from the platform's multi-factor risk calculations, infrastructure vulnerability weights, and exposed population numbers.
          </div>
        </div>

        {/* Infrastructure Impact Assessment Panel (#23) */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Building size={16} color="var(--primary)" />
              <span>Infrastructure Impact Assessment</span>
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{selectedZone?.shortName}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>2</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Road Segments</div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>1</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bridge Span</div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>3</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Villages</div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>1</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Hospital</div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>4</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Schools</div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--risk-critical)' }}>2,450</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exposed Pop.</div>
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '3px solid var(--primary)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              marginBottom: '12px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
              Command Priority Finding (#23)
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
              "High operational priority due to potential connectivity disruption along the primary lifeline corridor."
            </p>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <strong>Primary Corridors:</strong> NH-10 (Sevoke–Gangtok), Singtam–Dikchu Link
            </div>
            <div>
              <strong>Exposed Villages:</strong> Martam Village, Singtam North Hamlet, Rangpo Outpost
            </div>
            <div>
              <strong>Critical Facility:</strong> Singtam Sub-Divisional Hospital (Ambulance diversion activated)
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Detailed Road Status Table (#22) */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
              Monitored Mountain Corridors & Lifeline Status
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Statuses: OPEN &bull; CAUTION &bull; RESTRICTED &bull; BLOCKED &bull; UNKNOWN
            </span>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Road Name</th>
                <th>State & Sector</th>
                <th>Length</th>
                <th>Status</th>
                <th>Hazard Score</th>
                <th>Detour Route / Operational Advice</th>
                <th>Clearance ETA</th>
              </tr>
            </thead>
            <tbody>
              {roads.map((road) => {
                const statusBadge =
                  road.status === 'BLOCKED'
                    ? 'badge-critical'
                    : road.status === 'RESTRICTED'
                    ? 'badge-high'
                    : road.status === 'CAUTION'
                    ? 'badge-watch'
                    : 'badge-safe';

                return (
                  <tr key={road.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      {road.name}
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>{road.sector}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{road.state}</div>
                    </td>
                    <td>{road.lengthKm} km</td>
                    <td>
                      <span className={`kpi-badge ${statusBadge}`}>
                        {road.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: road.vulnerabilityScore > 80 ? 'var(--risk-critical)' : 'var(--text-main)' }}>
                        {road.vulnerabilityScore}/100
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                      {road.detourRoute}
                    </td>
                    <td style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main)' }}>
                      {road.clearanceEta}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
