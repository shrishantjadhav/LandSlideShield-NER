import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { X, Send, AlertTriangle, Radio } from 'lucide-react';

export default function CreateAlertModal({ isOpen, onClose }) {
  const { selectedZone, createAlert } = useAppState();

  const [level, setLevel] = useState('CRITICAL');
  const [audience, setAudience] = useState('Local Residents & District Authorities');
  const [message, setMessage] = useState(
    `CRITICAL LANDSLIDE WARNING for ${selectedZone?.name}. Sustained rainfall and active slope fissure detected along lifeline corridor. Avoid non-essential transit along NH-10. Follow district evacuation instructions.`
  );
  const [action, setAction] = useState('Evacuate low-lying slopes and observe immediate road closures.');
  const [channels, setChannels] = useState({
    sms: true,
    push: true,
    cap: true,
    radio: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeChannels = [];
    if (channels.sms) activeChannels.push('SMS Broadcast');
    if (channels.push) activeChannels.push('Disaster App Push');
    if (channels.cap) activeChannels.push('National CAP Gateway');
    if (channels.radio) activeChannels.push('VHF Emergency Radio');

    createAlert({
      zoneId: selectedZone?.id,
      location: selectedZone?.name,
      level,
      title: `${level} ALERT: ${selectedZone?.shortName}`,
      message,
      channels: activeChannels
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--risk-critical)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
              Issue Early Warning Alert
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Target Location */}
            <div className="form-group">
              <label className="form-label">Target Zone</label>
              <input
                type="text"
                className="form-input"
                value={`${selectedZone?.name} (${selectedZone?.state})`}
                disabled
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              />
            </div>

            {/* Severity Level */}
            <div className="form-group">
              <label className="form-label">Alert Severity Level</label>
              <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="CRITICAL">CRITICAL (Immediate evacuation / road closure)</option>
                <option value="HIGH">HIGH (Preparedness & heavy transit restrictions)</option>
                <option value="WATCH">WATCH (Precautionary advisory & slope monitoring)</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select className="form-select" value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option value="All Citizens & Response Agencies">All Citizens & Response Agencies (Public Broadcast)</option>
                <option value="Local Residents & District Authorities">Local Residents & District Authorities</option>
                <option value="Police, BRO & Disaster Teams Only">Police, BRO & Disaster Teams Only (Internal)</option>
              </select>
            </div>

            {/* Warning Message */}
            <div className="form-group">
              <label className="form-label">Alert Message Content</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Recommended Action */}
            <div className="form-group">
              <label className="form-label">Recommended Action</label>
              <input
                type="text"
                className="form-input"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
            </div>

            {/* Dissemination Channels */}
            <div className="form-group">
              <label className="form-label">Dissemination Channels</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={channels.sms}
                    onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                  />
                  <span>SMS Geo-Broadcast</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={channels.push}
                    onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                  />
                  <span>Disaster App Push</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={channels.cap}
                    onChange={(e) => setChannels({ ...channels, cap: e.target.checked })}
                  />
                  <span>National CAP Gateway</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={channels.radio}
                    onChange={(e) => setChannels({ ...channels, radio: e.target.checked })}
                  />
                  <span>Siren & Highway Signage</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="btn-confirm-issue-alert">
              <Send size={15} />
              <span>Issue Alert Broadcast</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
