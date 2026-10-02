import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import SubmitReportModal from '../components/SubmitReportModal';
import CreateAlertModal from '../components/CreateAlertModal';
import AssignTeamModal from '../components/AssignTeamModal';
import {
  FileText,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Eye,
  Camera,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Send,
  Users
} from 'lucide-react';

export default function FieldReportsView() {
  const {
    fieldReports,
    verifyFieldReport,
    selectedZone,
    setSelectedZoneId
  } = useAppState();

  const [selectedReportId, setSelectedReportId] = useState('FR-2041');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const selectedReport = fieldReports.find((r) => r.id === selectedReportId) || fieldReports[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header & Metrics Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
            Ground Truth & Field Observations
          </h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Fusion of SDMA field officer telemetry, citizen observations, and computer-vision crack diagnostics
          </span>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="btn btn-primary"
          id="btn-open-submit-report"
        >
          <Plus size={16} />
          <span>Submit Geo-Tagged Report</span>
        </button>
      </div>

      {/* Main Content: Table (60%) + Detail Panel (40%) (#19, #20) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(380px, 1fr)', gap: '20px' }}>
        {/* Reports Table (#19) */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
              Recent Field Submissions ({fieldReports.length})
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click row to open diagnostic panel</span>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Location</th>
                  <th>Reported By</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Risk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fieldReports.map((report) => {
                  const isSelected = report.id === selectedReportId;
                  const isCrit = report.risk === 'Critical';
                  const isH = report.risk === 'High';

                  return (
                    <tr
                      key={report.id}
                      onClick={() => setSelectedReportId(report.id)}
                      className={isSelected ? 'selected' : ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {report.id}
                      </td>
                      <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                        {report.location}
                      </td>
                      <td>
                        <div style={{ fontSize: '12.5px', color: 'var(--text-main)' }}>{report.reportedBy}</div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{report.role}</div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{report.type}</td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{report.timestamp}</td>
                      <td>
                        <span className={`kpi-badge ${isCrit ? 'badge-critical' : isH ? 'badge-high' : 'badge-watch'}`}>
                          {report.risk}
                        </span>
                      </td>
                      <td>
                        <span className={`kpi-badge ${report.status === 'Verified' ? 'badge-safe' : 'badge-neutral'}`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Field Report Detail Panel (#20) */}
        {selectedReport && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Field Observation Detail
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedReport.id} — {selectedReport.type}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedReport.location} &bull; {selectedReport.timestamp}
                </span>
              </div>

              <span className={`kpi-badge ${selectedReport.status === 'Verified' ? 'badge-safe' : 'badge-neutral'}`}>
                {selectedReport.status}
              </span>
            </div>

            {/* Simulated Photo & Computer Vision Diagnostics */}
            <div
              style={{
                position: 'relative',
                height: '170px',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '12px'
              }}
            >
              {/* Image Graphic representation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(15, 23, 42, 0.75)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                  GEOTAGGED EVIDENCE FEED
                </span>
                <span style={{ fontSize: '11px', backgroundColor: 'rgba(15, 23, 42, 0.75)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}>
                  {selectedReport.gps}
                </span>
              </div>

              {/* Fissure detection visual bounding box */}
              <div
                style={{
                  alignSelf: 'center',
                  border: '2px solid var(--risk-critical)',
                  backgroundColor: 'rgba(217, 45, 32, 0.1)',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AlertTriangle size={16} color="var(--risk-critical)" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--risk-critical)' }}>
                  CV Bounding Box: 45m Longitudinal Tension Fissure
                </span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start', border: '1px solid var(--border-color)' }}>
                Field Camera #4091 &bull; Resolution: 3840x2160 &bull; Telemetry Ingested
              </div>
            </div>

            {/* AI Image Assessment Box (#20) */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={14} color="var(--primary)" />
                  AI Image Assessment
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)' }}>
                  Confidence: {selectedReport.aiConfidence}%
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                "{selectedReport.aiImageAssessment}"
              </p>
            </div>

            {/* Risk Before vs Risk After (#20) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Risk Before Report</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {selectedReport.riskBefore} / 100
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: 'var(--risk-critical-bg)', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--risk-critical-border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--risk-critical)' }}>Risk After Reassessment</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--risk-critical)' }}>
                  {selectedReport.riskAfter} / 100
                </div>
              </div>
            </div>

            {/* Description & Reporter Details */}
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Observer Notes:</strong> {selectedReport.description}
            </div>

            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              <strong>Reporter:</strong> {selectedReport.reportedBy} ({selectedReport.role}) &bull; Contact: {selectedReport.contact}
            </div>

            {/* Action Buttons (#20) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: 'auto' }}>
              <button
                onClick={() => verifyFieldReport(selectedReport.id)}
                className="btn btn-secondary btn-sm"
                disabled={selectedReport.status === 'Verified'}
                id="btn-verify-report"
              >
                <CheckCircle2 size={14} color="var(--risk-safe)" />
                <span>Verify</span>
              </button>

              <button
                onClick={() => setIsAlertModalOpen(true)}
                className="btn btn-secondary btn-sm"
                id="btn-report-create-alert"
              >
                <Send size={14} color="var(--primary)" />
                <span>Create Alert</span>
              </button>

              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="btn btn-primary btn-sm"
                id="btn-report-assign-team"
              >
                <Users size={14} />
                <span>Assign Team</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SubmitReportModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
      <CreateAlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
      <AssignTeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
    </div>
  );
}
