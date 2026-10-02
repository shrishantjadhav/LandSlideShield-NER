import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { X, Upload, MapPin, Camera, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SubmitReportModal({ isOpen, onClose }) {
  const { selectedZone, submitFieldReport, user } = useAppState();

  const [type, setType] = useState('Slope Crack');
  const [severity, setSeverity] = useState('High');
  const [sector, setSector] = useState('Km 42 Mountain Cut (Near Rangpo Checkpost)');
  const [description, setDescription] = useState(
    'Noticed active soil slumping and transverse tension cracks developing along the road shoulder. Surface drainage ditch overflowing.'
  );
  const [gps, setGps] = useState(
    selectedZone ? `${selectedZone.lat.toFixed(4)}° N, ${selectedZone.lng.toFixed(4)}° E` : '27.3389° N, 88.6065° E'
  );
  const [photoSelected, setPhotoSelected] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFieldReport({
      location: selectedZone ? selectedZone.name : 'East Sikkim',
      sector,
      reportedBy: user.name,
      type,
      severity,
      description,
      gps
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
              Submit Geo-Tagged Field Report
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Location & Sector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Location / Zone</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedZone?.name || 'East Sikkim'}
                  disabled
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sector / Landmark</label>
                <input
                  type="text"
                  className="form-input"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Incident Type & Severity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Incident Type</label>
                <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Slope Crack">Slope Crack / Tension Fissure</option>
                  <option value="Landslide">Active Landslide (Mass Movement)</option>
                  <option value="Rockfall">Rockfall / Boulder Roll</option>
                  <option value="Road Blockage">Road Blockage / Debris Inflow</option>
                  <option value="Debris & Drainage Overflow">Debris & Drainage Overflow</option>
                  <option value="Other">Other Geotechnical Anomaly</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Observed Severity</label>
                <select className="form-select" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                  <option value="Critical">Critical (Immediate Hazard to Life/Transit)</option>
                  <option value="High">High (Substantial Movement / Threat)</option>
                  <option value="Watch">Watch (Early Warning Signs / Seepage)</option>
                </select>
              </div>
            </div>

            {/* GPS Location */}
            <div className="form-group">
              <label className="form-label">GPS Coordinates</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={gps}
                  onChange={(e) => setGps(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                  required
                />
                <MapPin size={16} color="var(--primary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              </div>
            </div>

            {/* Photo / Media Simulation */}
            <div className="form-group">
              <label className="form-label">Upload Field Evidence (Photo / Video)</label>
              <div
                style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-secondary)',
                  cursor: 'pointer'
                }}
                onClick={() => setPhotoSelected(true)}
              >
                {photoSelected ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <CheckCircle2 size={20} color="var(--risk-safe)" />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                      Photo attached: DSC_4091_fissure_cut.jpg (1.8 MB, Geotagged)
                    </span>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} color="var(--text-muted)" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Click or drag geotagged photos or telemetry logs
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description of Ground Conditions</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="btn-submit-report-confirm">
              <Upload size={15} />
              <span>Submit Field Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
