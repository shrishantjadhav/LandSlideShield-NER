import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { X, Users, Truck, CheckCircle2 } from 'lucide-react';

export default function AssignTeamModal({ isOpen, onClose }) {
  const { incidents, assignTeamToIncident, selectedZone } = useAppState();

  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-401');
  const [teamName, setTeamName] = useState('SDRF Team Alpha (Gangtok Quick Response)');
  const [equipment, setEquipment] = useState('Heavy Earthmovers & Portable Inclinometers');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    assignTeamToIncident(selectedIncidentId, teamName);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
              Dispatch Disaster Response Team
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Target Incident</label>
              <select
                className="form-select"
                value={selectedIncidentId}
                onChange={(e) => setSelectedIncidentId(e.target.value)}
              >
                {incidents.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.id}: {inc.title} ({inc.location})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Available Response Unit</label>
              <select className="form-select" value={teamName} onChange={(e) => setTeamName(e.target.value)}>
                <option value="SDRF Team Alpha (Gangtok Quick Response)">
                  SDRF Team Alpha (Gangtok Quick Response — 14 Personnel)
                </option>
                <option value="NDRF 12th Battalion Task Force">
                  NDRF 12th Battalion Task Force (Search & Structural Evac)
                </option>
                <option value="Border Roads Organisation (BRO) Heavy Clearing Unit">
                  Border Roads Organisation (BRO) Heavy Clearing Unit (Dozers & Loaders)
                </option>
                <option value="State PWD Geotechnical Rapid Survey Unit">
                  State PWD Geotechnical Rapid Survey Unit
                </option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Mandated Mission Protocol</label>
              <textarea
                className="form-textarea"
                rows={3}
                defaultValue="Deploy immediate safety cordon around road fissure. Establish secondary drone monitoring over unstable crest. Coordinate vehicular diversion with district traffic police."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="btn-confirm-assign-team">
              <Truck size={15} />
              <span>Confirm & Dispatch Team</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
