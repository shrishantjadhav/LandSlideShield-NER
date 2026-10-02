import React from 'react';
import { useAppState } from '../services/stateContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isCritical = toast.type === 'critical';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`toast ${isCritical ? 'toast-critical' : isSuccess ? 'toast-success' : ''}`}
          >
            {isCritical ? (
              <AlertTriangle size={18} color="var(--risk-critical)" style={{ flexShrink: 0 }} />
            ) : isSuccess ? (
              <CheckCircle2 size={18} color="var(--risk-safe)" style={{ flexShrink: 0 }} />
            ) : (
              <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            )}

            <div style={{ flex: 1, fontSize: '12.5px', color: 'var(--text-main)', lineHeight: 1.4 }}>
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '2px',
                display: 'flex'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
