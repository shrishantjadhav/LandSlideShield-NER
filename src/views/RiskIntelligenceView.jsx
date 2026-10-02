import React from 'react';
import { useAppState } from '../services/stateContext';
import {
  Cpu,
  TrendingUp,
  Droplets,
  Mountain,
  Compass,
  Wind,
  Thermometer,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function RiskIntelligenceView() {
  const {
    riskZones,
    selectedZoneId,
    setSelectedZoneId,
    selectedZone,
    syncLiveOpenMeteoWeather,
    isSyncingWeather
  } = useAppState();

  const isCritical = selectedZone.riskLevel === 'CRITICAL';
  const isHigh = selectedZone.riskLevel === 'HIGH';

  // Risk Trend Line Chart Data
  const trend24h = selectedZone.riskTrend24h || [42, 48, 55, 61, 69, 78, 87];
  const forecast12h = selectedZone.forecast12h || [87, 89, 88, 84];
  const allPoints = [...trend24h, ...forecast12h.slice(1)];
  const labels = ['-24h', '-20h', '-16h', '-12h', '-8h', '-4h', 'Now', '+4h', '+8h', '+12h'];

  // SVG Chart Geometry
  const chartWidth = 680;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 25;

  const pointsString = allPoints
    .map((val, idx) => {
      const x = paddingX + (idx / (allPoints.length - 1)) * (chartWidth - 2 * paddingX);
      const y = chartHeight - paddingY - (val / 100) * (chartHeight - 2 * paddingY);
      return `${x},${y}`;
    })
    .join(' ');

  // Split into actual 24h and forecast 12h
  const historicalPoints = trend24h.map((val, idx) => {
    const x = paddingX + (idx / (allPoints.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - (val / 100) * (chartHeight - 2 * paddingY);
    return { x, y, val };
  });

  const forecastPoints = forecast12h.map((val, idx) => {
    const overallIdx = trend24h.length - 1 + idx;
    const x = paddingX + (overallIdx / (allPoints.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - (val / 100) * (chartHeight - 2 * paddingY);
    return { x, y, val };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Location Selector & Primary Metrics (#15) */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Target Operational Zone
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <select
                className="form-select"
                style={{ width: '280px', fontWeight: 600, fontSize: '14px' }}
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
              >
                {riskZones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.riskLevel})
                  </option>
                ))}
              </select>
              <span className={`kpi-badge ${isCritical ? 'badge-critical' : isHigh ? 'badge-high' : 'badge-watch'}`}>
                {selectedZone.riskLevel}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk Score</span>
              <div style={{ fontSize: '26px', fontWeight: 800, color: isCritical ? 'var(--risk-critical)' : 'var(--text-main)', lineHeight: 1.1 }}>
                {selectedZone.riskScore} <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>/ 100</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confidence</span>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                {selectedZone.confidence}%
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk Trend</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--risk-critical)', lineHeight: 1.1 }}>
                {selectedZone.riskTrend}
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Forecast Window</span>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.1 }}>
                Next 12 Hours
              </div>
            </div>
          </div>
        </div>

        {/* Explainable AI Assessment Narrative (#16) */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '4px solid var(--primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <strong style={{ color: 'var(--text-main)', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={16} color="var(--primary)" />
              AI Risk Assessment Narrative
            </strong>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
              Model: XGBoost-TerrainFused v2.4 (Confidence: {selectedZone.confidence}%)
            </span>
          </div>
          <p style={{ margin: 0 }}>
            "{selectedZone.aiExplanation}"
          </p>
          <div style={{ marginTop: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
            * Operational Note: AI early warning represents probabilistic risk estimation based on multi-sensor telemetry and geotechnical profiles; it does not claim absolute certainty.
          </div>
        </div>
      </div>

      {/* Middle Row: Ranked Risk Drivers Table (#15) & Weather/Environment Telemetry (#18) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Risk Drivers Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={16} color="var(--primary)" />
              <span>Ranked Risk Drivers & Multi-Factor Contribution</span>
            </div>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>SHAP-grounded weights</span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Current Value</th>
                  <th>Normal Range</th>
                  <th>Contribution to Risk</th>
                </tr>
              </thead>
              <tbody>
                {selectedZone.drivers.map((d, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{d.name}</td>
                    <td style={{ fontWeight: 600, color: idx === 0 && isCritical ? 'var(--risk-critical)' : 'var(--text-main)' }}>
                      {d.current}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{d.normal}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${d.weight}%`,
                              height: '100%',
                              backgroundColor: idx === 0 && isCritical ? 'var(--risk-critical)' : 'var(--primary)',
                              borderRadius: '3px'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
                          {d.contribution}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weather & Environmental Telemetry Panel (#18) */}
        <div className="card">
          <div className="card-header" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <div className="card-title">
              <Droplets size={16} color="var(--primary)" />
              <span>Weather & Environment Telemetry</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => syncLiveOpenMeteoWeather(selectedZoneId)}
                disabled={isSyncingWeather}
                className="btn btn-secondary btn-sm"
                title="Fetch real-world meteorological readings from Open-Meteo API"
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                <RefreshCw size={11} className={isSyncingWeather ? 'spin' : ''} />
                <span>{isSyncingWeather ? 'Syncing...' : 'Sync Open-Meteo Live'}</span>
              </button>
              <span style={{ fontSize: '10.5px', color: 'var(--risk-safe-text)', fontWeight: 700, backgroundColor: 'var(--risk-safe-bg)', border: '1px solid var(--risk-safe-border)', padding: '2px 6px', borderRadius: '4px' }}>
                OPEN-METEO LIVE
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Droplets size={14} color="var(--primary)" />
                <span>24h Rainfall</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedZone.telemetry.rainfall24h} mm
              </div>
              <div style={{ fontSize: '11px', color: 'var(--risk-critical)', marginTop: '2px' }}>
                +18 mm in last 6 hrs
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Droplets size={14} color="var(--primary)" />
                <span>Soil Moisture</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: isCritical ? 'var(--risk-critical)' : 'var(--text-main)' }}>
                {selectedZone.telemetry.soilMoisture}%
              </div>
              <div style={{ fontSize: '11px', color: 'var(--risk-high-text)', marginTop: '2px' }}>
                Near saturation point
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Mountain size={14} color="var(--primary)" />
                <span>Slope Angle</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedZone.telemetry.slopeAngle}°
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Steep scarp threshold
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Thermometer size={14} color="var(--primary)" />
                <span>Temperature</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedZone.telemetry.temperature}°C
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Dew point 19°C
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Wind size={14} color="var(--primary)" />
                <span>Wind Speed</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedZone.telemetry.windSpeed} km/h
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Gusts up to 26 km/h
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '11.5px', marginBottom: '4px' }}>
                <Calendar size={14} color="var(--primary)" />
                <span>3-Day Cumulative</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                {selectedZone.telemetry.rainfall3Day} mm
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Cumulative threshold exceeded
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Clean SVG Risk Trend Line Chart (#17) */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <TrendingUp size={16} color="var(--primary)" />
              <span>Risk Trend — Last 24 Hours & Next 12 Hours Forecast</span>
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Evolution sequence: 42 → 48 → 55 → 61 → 69 → 78 → 87 with projected decay curve
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11.5px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', backgroundColor: 'var(--primary)' }}></span>
              Observed Past 24h
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', borderTop: '2px dashed var(--primary)' }}></span>
              Projected 12h Forecast
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--risk-critical)' }}>
              <span style={{ width: '12px', height: '1px', borderTop: '1px dashed var(--risk-critical)' }}></span>
              Critical Line (85)
            </span>
          </div>
        </div>

        {/* SVG Chart Rendering */}
        <div style={{ width: '100%', overflowX: 'auto', padding: '10px 0' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', minWidth: '600px' }}>
            {/* Semantic Risk Bands */}
            <rect x={paddingX} y={chartHeight - paddingY - 40 * 1.7} width={chartWidth - 2 * paddingX} height={40 * 1.7} fill="#ECFDF3" opacity="0.3" />
            <rect x={paddingX} y={chartHeight - paddingY - 70 * 1.7} width={chartWidth - 2 * paddingX} height={30 * 1.7} fill="#FFFAEB" opacity="0.3" />
            <rect x={paddingX} y={chartHeight - paddingY - 85 * 1.7} width={chartWidth - 2 * paddingX} height={15 * 1.7} fill="#FEF3F2" opacity="0.4" />
            <rect x={paddingX} y={paddingY} width={chartWidth - 2 * paddingX} height={(100 - 85) * 1.7} fill="#FEF3F2" opacity="0.6" />

            {/* Threshold lines */}
            <line x1={paddingX} y1={chartHeight - paddingY - 85 * 1.7} x2={chartWidth - paddingX} y2={chartHeight - paddingY - 85 * 1.7} stroke="var(--risk-critical)" strokeWidth="1" strokeDasharray="4,4" />
            <text x={paddingX + 6} y={chartHeight - paddingY - 85 * 1.7 - 4} fontSize="9" fill="var(--risk-critical)" fontWeight="600">CRITICAL THRESHOLD (85)</text>

            <line x1={paddingX} y1={chartHeight - paddingY - 70 * 1.7} x2={chartWidth - paddingX} y2={chartHeight - paddingY - 70 * 1.7} stroke="var(--risk-watch)" strokeWidth="1" strokeDasharray="3,3" />

            {/* Historical Solid Line (Deep Blue) */}
            <path
              d={historicalPoints.reduce((acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), '')}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.8"
            />

            {/* Forecast Dashed Line (Deep Blue) */}
            <path
              d={forecastPoints.reduce((acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), '')}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.4"
              strokeDasharray="5,5"
            />

            {/* Data Point Circles */}
            {historicalPoints.map((pt, i) => {
              const isPeak = pt.val >= 85;
              return (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isPeak ? 5 : 3.5}
                    fill={isPeak ? 'var(--risk-critical)' : '#FFFFFF'}
                    stroke={isPeak ? 'var(--risk-critical)' : 'var(--primary)'}
                    strokeWidth="2"
                  />
                  <text x={pt.x} y={pt.y - 8} fontSize="10" fontWeight="700" textAnchor="middle" fill={isPeak ? 'var(--risk-critical)' : 'var(--text-main)'}>
                    {pt.val}
                  </text>
                </g>
              );
            })}

            {forecastPoints.slice(1).map((pt, i) => (
              <g key={`f-${i}`}>
                <circle cx={pt.x} cy={pt.y} r="3.5" fill="#FFFFFF" stroke="var(--primary)" strokeWidth="2" />
                <text x={pt.x} y={pt.y - 8} fontSize="9.5" fontWeight="600" textAnchor="middle" fill="var(--text-muted)">
                  {pt.val}
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {labels.map((lbl, i) => {
              const x = paddingX + (i / (labels.length - 1)) * (chartWidth - 2 * paddingX);
              return (
                <text key={i} x={x} y={chartHeight - 6} fontSize="9.5" textAnchor="middle" fill="var(--text-muted)">
                  {lbl}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
