import React from 'react';
import { useAppState } from '../services/stateContext';
import {
  BarChart3,
  TrendingUp,
  Droplets,
  PieChart,
  Truck,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function AnalyticsView() {
  const { riskZones } = useAppState();

  const stateIncidents = [
    { state: 'Sikkim', count: 24, critical: 8 },
    { state: 'Assam', count: 18, critical: 4 },
    { state: 'Meghalaya', count: 16, critical: 5 },
    { state: 'Mizoram', count: 14, critical: 4 },
    { state: 'Arunachal', count: 12, critical: 3 },
    { state: 'Nagaland', count: 9, critical: 2 },
    { state: 'Manipur', count: 8, critical: 2 },
    { state: 'Tripura', count: 3, critical: 0 }
  ];

  const categories = [
    { name: 'Slope Crack', percent: 42, color: 'var(--primary)' },
    { name: 'Rockfall', percent: 28, color: 'var(--text-secondary)' },
    { name: 'Road Blockage', percent: 18, color: 'var(--risk-critical)' },
    { name: 'Debris Flow', percent: 12, color: 'var(--risk-watch)' }
  ];

  const roadDisruptions7Days = [
    { day: 'Mon', blocked: 1, restricted: 3 },
    { day: 'Tue', blocked: 1, restricted: 4 },
    { day: 'Wed', blocked: 2, restricted: 4 },
    { day: 'Thu', blocked: 3, restricted: 5 },
    { day: 'Fri', blocked: 2, restricted: 6 },
    { day: 'Sat', blocked: 2, restricted: 6 },
    { day: 'Sun (Today)', blocked: 2, restricted: 6 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Overview Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card">
          <span className="kpi-label">Cumulative Landslide Incidents</span>
          <div className="kpi-value-row">
            <span className="kpi-value">104</span>
            <span className="kpi-badge badge-neutral">NER YTD</span>
          </div>
          <span className="text-meta">Historical records verified</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <span className="kpi-label">Average Response Time</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--primary)' }}>14m</span>
            <span className="kpi-badge badge-primary">-4m vs target</span>
          </div>
          <span className="text-meta">From risk surge to SDRF deploy</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--risk-safe)' }}>
          <span className="kpi-label">Prediction Accuracy</span>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: 'var(--risk-safe-text)' }}>88.4%</span>
            <span className="kpi-badge badge-safe">XGBoost InSAR</span>
          </div>
          <span className="text-meta">ROC-AUC score benchmark</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Active Warning Coverage</span>
          <div className="kpi-value-row">
            <span className="kpi-value">98.2%</span>
            <span className="kpi-badge badge-neutral">NER CELL GRID</span>
          </div>
          <span className="text-meta">SMS & CAP tower reach</span>
        </div>
      </div>

      {/* Charts Grid Row 1: Incidents by State & Field Reports Category */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Landslide Incidents by State Bar Chart (#30) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <BarChart3 size={16} color="var(--primary)" />
                <span>Historical Landslide Incidents by NER State</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Geological Survey of India & NDMA records
              </span>
            </div>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Sorted by frequency</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {stateIncidents.map((item) => (
              <div key={item.state} style={{ display: 'grid', gridTemplateColumns: '85px 1fr 40px', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {item.state}
                </span>

                <div style={{ height: '18px', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
                  <div
                    style={{
                      width: `${(item.count / 28) * 100}%`,
                      backgroundColor: 'var(--primary)',
                      height: '100%',
                      borderRadius: '3px'
                    }}
                    title={`${item.count} total incidents`}
                  />
                </div>

                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-main)', textAlign: 'right' }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Field Reports by Category (#30) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <PieChart size={16} color="var(--primary)" />
                <span>Field Reports by Category</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Distribution of 43 submitted ground observations</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            {categories.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{cat.name}</span>
                  <strong style={{ color: 'var(--text-main)' }}>{cat.percent}%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cat.percent}%`,
                      height: '100%',
                      backgroundColor: cat.color,
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <strong>Dominant Factor:</strong> Tension cracks along steep roadside cuts represent 42% of all verified field observations, acting as key leading indicators 2–6 hours before catastrophic failure.
          </div>
        </div>
      </div>

      {/* Charts Grid Row 2: Road Disruption Trend & Alert Response Velocity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* 7-Day Road Disruption Trend */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Truck size={16} color="var(--primary)" />
                <span>7-Day Road Disruption Trend</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active blockages and convoy restrictions</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-critical)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-critical)' }}></span>
                Blocked
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-high-text)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-high)' }}></span>
                Restricted
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center', marginTop: '16px' }}>
            {roadDisruptions7Days.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ height: '110px', width: '28px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ height: `${d.restricted * 12}px`, width: '100%', backgroundColor: 'var(--risk-high)', borderRadius: '2px', marginBottom: '2px' }} title={`${d.restricted} restricted`} />
                  <div style={{ height: `${d.blocked * 18}px`, width: '100%', backgroundColor: 'var(--risk-critical)', borderRadius: '2px' }} title={`${d.blocked} blocked`} />
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rainfall vs Risk Correlation Panel (#30) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Droplets size={16} color="var(--primary)" />
                <span>Rainfall Intensity vs Risk Index</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Empirical saturation tipping points</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            <div style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>&lt; 30 mm / 24h</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Nominal seasonal drainage</div>
              </div>
              <span className="kpi-badge badge-safe">LOW RISK (Index &lt; 40)</span>
            </div>

            <div style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>30 – 60 mm / 24h</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Topsoil pore pressure build-up</div>
              </div>
              <span className="kpi-badge badge-watch">WATCH (Index 40–69)</span>
            </div>

            <div style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>60 – 80 mm / 24h</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Shear strength degradation on &gt;25° slopes</div>
              </div>
              <span className="kpi-badge badge-high">HIGH (Index 70–84)</span>
            </div>

            <div style={{ padding: '10px 12px', border: '1px solid var(--risk-critical-border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--risk-critical-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--risk-critical)' }}>&gt; 80 mm / 24h</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hydrostatic liquefaction & rapid debris runout</div>
              </div>
              <span className="kpi-badge badge-critical">CRITICAL (Index ≥ 85)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
