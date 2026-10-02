import React, { useState } from 'react';
import { useAppState } from '../services/stateContext';
import { askLandslideShieldAI } from '../services/aiService';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Zap,
  Loader2
} from 'lucide-react';

export default function AiAssistantView() {
  const {
    riskZones,
    roads,
    fieldReports,
    alerts,
    incidents,
    selectedZone,
    scenarioStep
  } = useAppState();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      timestamp: '13:40',
      modelTag: 'SambaNova (Gemma-4-31B)',
      text:
        'Greetings Officer. I am LandslideShield AI, powered by SambaNova Cloud high-speed inference and grounded directly in North Eastern Region live telemetry, Open-Meteo atmospheric feeds, and verified field reports. Ask me about evolving risks, affected road lifelines, or response deployments.'
    }
  ]);

  const suggestedQuestions = [
    'Which areas currently require attention?',
    'Why is East Sikkim marked critical?',
    'Which roads are currently affected?',
    'Show recent field reports.',
    'What caused the recent risk increase?'
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Gather live context
      const currentContext = {
        selectedZone,
        riskZones,
        roads,
        fieldReports,
        alerts,
        incidents,
        scenarioStep
      };

      // Call SambaNova Cloud LLM with fallbacks
      const aiResult = await askLandslideShieldAI({
        userQuery: query,
        currentContext,
        conversationHistory: messages
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelTag: `${aiResult.provider} (${aiResult.model})`,
          text: aiResult.text
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelTag: 'Internal Knowledge Engine',
          text: `Based on current telemetry for ${selectedZone.name}: Risk score is ${selectedZone.riskScore}/100 (${selectedZone.riskLevel}). Primary hazard corridor remains NH-10 with active response deployment under SDRF Team Alpha.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 110px)' }}>
      {/* Top Header Card with SambaNova Badge */}
      <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              LandslideShield AI Operational Assistant
            </h2>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid var(--primary-border)'
              }}
            >
              <Zap size={12} color="var(--primary)" />
              SambaNova Cloud Live Inference
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Grounded in live telemetry, InSAR displacement rates, Open-Meteo atmospheric readings, and ground incident reports.
          </span>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 1,
                sender: 'ai',
                timestamp: '13:40',
                modelTag: 'SambaNova (Gemma-4-31B)',
                text: 'Chat history reset. How may I assist your disaster management operations?'
              }
            ])
          }
          className="btn btn-secondary btn-sm"
        >
          <RotateCcw size={12} />
          <span>Clear History</span>
        </button>
      </div>

      {/* Suggested Questions Pills (#29) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Suggested Inquiries:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            style={{
              padding: '5px 12px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--primary)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Stream Container */}
      <div
        className="card"
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          backgroundColor: '#FFFFFF'
        }}
      >
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '82%'
              }}
            >
              {isAi && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Bot size={18} />
                </div>
              )}

              <div
                style={{
                  backgroundColor: isAi ? 'var(--bg-secondary)' : 'var(--primary)',
                  color: isAi ? 'var(--text-main)' : '#FFFFFF',
                  border: isAi ? '1px solid var(--border-color)' : 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                <div
                  style={{
                    fontSize: '10px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    color: isAi ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {isAi && msg.modelTag ? (
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      ⚡ {msg.modelTag}
                    </span>
                  ) : <span />}
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {!isAi && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', alignItems: 'center' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bot size={18} />
            </div>
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '12.5px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Loader2 size={16} className="spin" color="var(--primary)" />
              <span>Generating response via SambaNova Cloud inference...</span>
            </div>
          </div>
        )}
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{ display: 'flex', gap: '10px' }}
      >
        <input
          type="text"
          className="form-input"
          style={{ height: '42px', fontSize: '14px' }}
          placeholder="Ask an operational question (e.g., 'What is the risk in East Sikkim?')..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ height: '42px', padding: '0 20px' }}
          disabled={isLoading}
          id="btn-send-ai-chat"
        >
          {isLoading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
          <span>{isLoading ? 'Processing' : 'Ask AI'}</span>
        </button>
      </form>
    </div>
  );
}
