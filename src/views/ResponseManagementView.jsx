import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import AssignTeamModal from '../components/AssignTeamModal';
import {
  Activity,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Building,
  CheckSquare,
  AlertTriangle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function ResponseManagementView() {
  const { incidents, addToast } = useAppState();

  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-401');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const handleUpdateStatus = (newStatus) => {
    addToast(`Incident ${selectedIncident.id} status updated to ${newStatus}.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
            Operational Response Coordination
          </h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Tracking active task forces, civil defense, NDRF/SDRF deployments, and infrastructure restoration timelines
          </span>
        </div>

        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="btn btn-primary"
          id="btn-open-dispatch-modal"
        >
          <Truck size={16} />
          <span>Dispatch Response Unit</span>
        </button>
      </div>

      {/* Main Grid: Incidents Table (55%) + Detail Panel (45%) (#27, #28) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(380px, 1fr)', gap: '20px' }}>
        {/* Active Incidents Table (#27) */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
              Active Incidents Under Response ({incidents.length})
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click incident to inspect timeline</span>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Incident</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Assigned Team</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => {
                  const isSelected = inc.id === selectedIncidentId;
                  const isCrit = inc.priority === 'Critical';
                  const isHigh = inc.priority === 'High';

                  const statusBadgeClass =
                    inc.status === 'RESOLVED'
                      ? 'badge-safe'
                      : inc.status === 'IN PROGRESS'
                      ? 'badge-primary'
                      : inc.status === 'VERIFIED'
                      ? 'badge-watch'
                      : 'badge-neutral';

                  return (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncidentId(inc.id)}
                      className={isSelected ? 'selected' : ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        <div style={{ color: 'var(--primary)', fontSize: '12px' }}>{inc.id}</div>
                        <div>{inc.title}</div>
                      </td>
                      <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{inc.location}</td>
                      <td>
                        <span className={`kpi-badge ${isCrit ? 'badge-critical' : isHigh ? 'badge-high' : 'badge-watch'}`}>
                          {inc.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-main)' }}>
                        {inc.assignedTeam}
                      </td>
                      <td>
                        <span className={`kpi-badge ${statusBadgeClass}`}>
                          {inc.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{inc.updated}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Incident Detail View & Operational Timeline (#28) */}
        {selectedIncident && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Incident Control File
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {selectedIncident.id}: {selectedIncident.title}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Location: {selectedIncident.location}
                </span>
              </div>

              <span className="kpi-badge badge-primary">
                {selectedIncident.status}
              </span>
            </div>

            {/* Assigned Unit & Commander */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Assigned Response Unit
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {selectedIncident.assignedTeam}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Officer-in-Charge: {selectedIncident.teamLead}
                </div>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                Reassign Unit
              </button>
            </div>

            {/* Recommended Action Checklist (#28) */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mandated Action Protocol
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedIncident.recommendedActions.map((act, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    <CheckSquare size={15} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Event Timeline (#28) */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Operational Incident Timeline
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', paddingLeft: '16px' }}>
                <div style={{ position: 'absolute', left: '4px', top: '4px', bottom: '4px', width: '2px', backgroundColor: 'var(--border-color)' }}></div>
                {selectedIncident.timeline.map((event, idx) => (
                  <div key={idx} style={{ position: 'relative', fontSize: '12px' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '-16px',
                        top: '4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: idx === selectedIncident.timeline.length - 1 ? 'var(--primary)' : 'var(--border-color)',
                        border: '2px solid #FFFFFF'
                      }}
                    ></span>
                    <strong style={{ color: 'var(--text-main)', marginRight: '6px' }}>{event.time}</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>— {event.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Status Control Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <button
                onClick={() => handleUpdateStatus('VERIFIED')}
                className="btn btn-secondary btn-sm"
              >
                <CheckCircle2 size={14} color="var(--risk-safe)" />
                <span>Mark Verified</span>
              </button>

              <button
                onClick={() => handleUpdateStatus('RESOLVED')}
                className="btn btn-secondary btn-sm"
              >
                <CheckCircle2 size={14} color="var(--primary)" />
                <span>Mark Resolved</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <AssignTeamModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
    </div>
  );
}
