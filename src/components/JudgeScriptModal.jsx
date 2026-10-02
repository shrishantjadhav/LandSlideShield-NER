import React, { useState } from 'react';
import { X, Clock, HelpCircle, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function JudgeScriptModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('script');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 300 }}>
      <div className="modal-card" style={{ maxWidth: '780px', maxHeight: '88vh' }}>
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                3-Minute Hackathon Winning Pitch Script
              </h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Presenter Cheat-Sheet & Anticipated Judge Q&A
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <button
                onClick={() => setActiveTab('script')}
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'script' ? 'var(--primary)' : '#FFFFFF',
                  color: activeTab === 'script' ? '#FFFFFF' : 'var(--text-secondary)'
                }}
              >
                Speaking Script
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                style={{
                  border: 'none',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'qa' ? 'var(--primary)' : '#FFFFFF',
                  color: activeTab === 'qa' ? '#FFFFFF' : 'var(--text-secondary)'
                }}
              >
                Judge Q&A
              </button>
            </div>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="modal-body" style={{ padding: '20px', overflowY: 'auto' }}>
          {activeTab === 'script' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Part 1 */}
              <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  <Clock size={12} />
                  <span>0:00 – 0:30 | The Hook & Access Portal</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                  Action: Open Login Screen → Click "Continue as Demo Officer"
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px', fontStyle: 'italic', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px' }}>
                  "Respected Judges, in India's North Eastern Region, landslides sever lifeline corridors like NH-10 overnight, cutting off medical supplies, fuel, and civil defense. Today's response is purely reactive. We present LandslideShield NER—an AI platform to: Predict Risk, Explain Threats, and Protect Communities."
                </p>
              </div>

              {/* Part 2 */}
              <div style={{ borderLeft: '3px solid var(--risk-critical)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--risk-critical)', textTransform: 'uppercase' }}>
                  <Clock size={12} />
                  <span>0:30 – 1:15 | Command Center & Explainable AI</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                  Action: Click East Sikkim (Zone ES-042) on GIS Map → Highlight Drivers Panel
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px', fontStyle: 'italic', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px' }}>
                  "In the Command Center, an officer monitors 8 critical zones across the 8 NER states. Notice the pulsing circle on East Sikkim. Rather than an unexplainable black-box, our XGBoost model (89.4% accuracy, 0.912 ROC-AUC) breaks down the exact drivers: 82mm rainfall (32%), 78% soil saturation (26%), 34° slope (18%), and verified surface cracks. It directly calculates operational impact: 2 roads (NH-10), 3 villages, 1 bridge, and 2,450 exposed citizens."
                </p>
              </div>

              {/* Part 3 */}
              <div style={{ borderLeft: '3px solid var(--risk-high)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--risk-high-text)', textTransform: 'uppercase' }}>
                  <Clock size={12} />
                  <span>1:15 – 2:00 | Live Weather & Computer Vision Ground Truth</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                  Action: Click "Simulate +15mm Rain" → Open Field Reports (FR-2041) → Click "Verify Report"
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px', fontStyle: 'italic', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px' }}>
                  "To demonstrate live reactivity, I click 'Simulate +15mm Rain'. The risk index escalates in real-time to 87 (CRITICAL). Under Risk Intelligence, our live Open-Meteo API ingests real ambient weather for Gangtok and Aizawl. In Field Reports, Report FR-2041 shows our ResNet50 Computer Vision model detecting a 45-meter tension crack along the roadside embankment with 82.4% structural confidence, fusing ground truth into the early warning loop."
                </p>
              </div>

              {/* Part 4 */}
              <div style={{ borderLeft: '3px solid var(--risk-safe)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--risk-safe-text)', textTransform: 'uppercase' }}>
                  <Clock size={12} />
                  <span>2:00 – 2:40 | Actionable Response & SambaNova AI Assistant</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                  Action: Click "Create Alert" → Dispatch SDRF Team Alpha → Open AI Assistant
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px', fontStyle: 'italic', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px' }}>
                  "From intelligence to action: We issue an ITU-T Common Alerting Protocol warning simultaneously through SMS, app push, and siren grids. Under Response Management, SDRF Team Alpha is dispatched with earthmovers. Finally, under AI Assistant, powered live by SambaNova Cloud high-speed LLM inference, commanders query live telemetry in natural language with zero hallucination."
                </p>
              </div>

              {/* Part 5 */}
              <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  <Clock size={12} />
                  <span>2:40 – 3:00 | Strong Conclusion</span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px', fontStyle: 'italic', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px' }}>
                  "Under the AI/ML Model Engine tab, you can inspect the full XGBoost architecture and feature weights. LandslideShield embodies the entire disaster management loop: Observe → Understand → Decide → Act. Thank you, we are ready for your questions!"
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                  Q1: How is this different from existing rainfall threshold warnings?
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  <strong>A:</strong> Simple 1D rainfall thresholds (e.g. &gt;100mm) cause rampant false alarms. LandslideShield fuses multi-day rainfall, soil saturation pore pressure, slope steepness (DEM), InSAR satellite creep, and computer-vision crack verification. It detects imminent failure even during moderate rain when soil saturation is already at 80%.
                </p>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                  Q2: What ML models are running under the hood?
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  <strong>A:</strong> An XGBoost-TerrainFused classifier and regressor trained on 5,240 historical NER events (89.4% accuracy, 0.912 ROC-AUC), SHAP-based feature importance explainer, ResNet50 tension crack CV model, and SambaNova Cloud LLM inference.
                </p>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                  Q3: What if there is no internet in remote mountain passes?
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  <strong>A:</strong> Field officers can log geotagged reports offline via local client storage; reports sync automatically when cellular or VHF data packets connect. For alerts, CAP integrates Cell-Broadcast SMS which reaches citizen phones without internet.
                </p>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                  Q4: How do you prevent false alarms?
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  <strong>A:</strong> We require confidence score validation (&gt;80%) and issue two-tier verification: high risk triggers an immediate Field Officer Verification Task before mass evacuation siren broadcasts are activated.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Practice pace: ~130 words per minute
          </span>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Script
          </button>
        </div>
      </div>
    </div>
  );
}
