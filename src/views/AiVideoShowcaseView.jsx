import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Shield,
  Layers,
  Cpu,
  Truck,
  Bell,
  Activity,
  Download,
  Sparkles,
  ChevronRight,
  Eye,
  Radio
} from 'lucide-react';

const SCENES = [
  {
    id: 1,
    title: 'The Challenge in North East India',
    subtitle: 'Why Traditional Landslide Early Warnings Fail',
    duration: 16,
    badge: 'PROBLEM STATEMENT',
    voiceText:
      'In India\'s North Eastern Region, landslides strike fast and sever critical lifeline corridors like National Highway 10 and 54. Traditional warning systems fail because they offer predictions without explanation, fragmented data silos, and hazard warnings without identifying which roads, villages, or bridges are actually in danger. Response remains purely reactive.',
    highlightPoints: [
      'Predictions without explanation: A bare "High Risk" warning provides no cause or confidence level.',
      'Hazard without impact: Authorities do not know which roads, villages, and bridges are exposed.',
      'Disconnected field evidence: Ground photos of tension cracks never feed back into mathematical models.',
      'Severe connectivity barriers: Remote mountainous valleys break traditional internet-only alerts.'
    ],
    visualFocus: 'isolated_corridor'
  },
  {
    id: 2,
    title: 'Introducing LandslideShield NER',
    subtitle: 'Predict Risk. Explain Threats. Protect Communities.',
    duration: 18,
    badge: 'CORE INNOVATION',
    voiceText:
      'Meet LandslideShield NER. It is not just another prediction algorithm. It is an end-to-end AI-powered decision support platform that turns multi-sensor data into immediate real-world response. Built specifically for the unique terrain and meteorological challenges of the eight North Eastern States.',
    highlightPoints: [
      'Transforms disaster management from reactive relief to proactive operational intelligence.',
      'Governed by a continuous operational loop: Monitor, Predict, Explain, Prioritize, Alert, Verify, and Respond.',
      'Strict government-grade command-and-control visual interface with zero distraction.'
    ],
    visualFocus: 'platform_hero'
  },
  {
    id: 3,
    title: 'USP 1 & 2: Prediction + Explanation & Impact',
    subtitle: 'From Black-Box Models to Actionable Risk Intelligence',
    duration: 20,
    badge: 'EXPLAINABLE AI',
    voiceText:
      'LandslideShield never says high risk without explaining why. Our XGBoost model, validated with 89.4% accuracy, decomposes risk into exact contributing drivers: rainfall accumulation, soil saturation, slope angle, and ground fissures. Crucially, it translates risk into operational impact: identifying exactly which road segments, villages, and bridges are exposed.',
    highlightPoints: [
      'Explainable AI Drivers: 82mm rainfall (32%), 78% soil moisture (26%), 34° slope (18%), verified cracks (11%).',
      'Operational Impact Mapping: 2 road segments, 3 villages, 1 critical bridge, and 2,450 exposed citizens.',
      'AI Response Prioritization: Automated, non-political operational priority schedule for state authorities.'
    ],
    visualFocus: 'xai_breakdown'
  },
  {
    id: 4,
    title: 'USP 3 & 4: Multi-Source Fusion & GIS + Field CV',
    subtitle: 'Fusing Open-Meteo, InSAR Satellites & Computer Vision',
    duration: 20,
    badge: 'MULTI-SENSOR FUSION',
    voiceText:
      'We combine live atmospheric feeds from the Open-Meteo API, satellite InSAR ground displacement rates, and real-time field photography. When field officers submit photos of slope cracks, our ResNet Computer Vision model measures crack length and aperture, immediately escalating the risk score.',
    highlightPoints: [
      'Live Open-Meteo API Integration: Ingests real-time temperature, humidity, and rainfall for Gangtok, Aizawl, and Cherrapunji.',
      'ResNet50 Computer Vision: Detects longitudinal tension cracks with 82.4% structural confidence from smartphone cameras.',
      'Interactive GIS Map: Built on clean topological vector layers with zero watermarks across the 8 NER states.'
    ],
    visualFocus: 'cv_fusion'
  },
  {
    id: 5,
    title: 'USP 5 & 6: Continuous Reassessment & Remote NER Readiness',
    subtitle: 'Living Models that Adapt with Offline Synchronization',
    duration: 18,
    badge: 'CONTINUOUS FEEDBACK',
    voiceText:
      'Landslide risk is dynamic. As monsoon rainfall surges, the system automatically recalculates risk scores from 69 to 87 in real-time. Built for remote mountain passes, field officers log reports offline, and early warnings broadcast through Cell-Broadcast SMS without needing active internet.',
    highlightPoints: [
      'Interactive Live Simulation: Real-time risk recalculation as precipitation and soil saturation evolve.',
      'Offline/Low-Network Mode: Local client storage with automatic synchronization upon cellular handshake.',
      'Cell-Broadcast CAP Integration: Emergency warnings reach citizen handsets even during major internet outages.'
    ],
    visualFocus: 'reassessment_loop'
  },
  {
    id: 6,
    title: 'USP 7: From Warning to Coordinated Response',
    subtitle: 'Multi-Channel Alerting, SDRF Dispatch & SambaNova AI',
    duration: 20,
    badge: 'RESPONSE COMMAND',
    voiceText:
      'Within seconds of a critical risk trigger, early warnings are broadcast across SMS, app push, and siren grids. SDRF Team Alpha is deployed with earthmovers and inclinometers. Meanwhile, commanders query live telemetry through our AI Assistant, powered live by SambaNova Cloud high-speed LLM inference.',
    highlightPoints: [
      'Multi-Channel CAP Dissemination: SMS geo-broadcast to 2,450 residents, app push, and highway message signs.',
      'Response Management: Assigned teams, task checklists, and chronological event timelines from surge to stabilization.',
      'SambaNova Cloud LLM: Operational assistant grounded in live telemetry with zero hallucination.'
    ],
    visualFocus: 'response_dispatch'
  },
  {
    id: 7,
    title: 'The Real USP & Grand Conclusion',
    subtitle: 'Observe. Understand. Decide. Act.',
    duration: 16,
    badge: 'THE WINNING EDGE',
    voiceText:
      'The real uniqueness of LandslideShield NER is this: From predicting landslide risk to explaining its cause, identifying what is at risk, and prioritizing the response — all in one unified platform. Predicting risk, explaining threats, and protecting communities across North Eastern India.',
    highlightPoints: [
      '"From predicting landslide risk to explaining its cause, identifying what is at risk, and prioritizing response."',
      'Complete end-to-end operational loop ready for deployment across NDMA and SDMAs.',
      'Built, benchmarked, and operational for Round 1 judging.'
    ],
    visualFocus: 'grand_conclusion'
  }
];

export const SCENE_DURATIONS = SCENES.map((s) => s.duration);

export default function AiVideoShowcaseView() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showCaptions, setShowCaptions] = useState(true);

  const activeScene = SCENES[currentSceneIdx];
  const timerRef = useRef(null);
  const speechRef = useRef(null);

  // Play narration audio using Web Speech API
  const speakScene = (text) => {
    if (isMuted) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05 * playbackSpeed;
    utterance.pitch = 1.0;

    // Try to pick an English voice
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Alex')));
    if (naturalVoice) utterance.voice = naturalVoice;

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Scene progression loop
  useEffect(() => {
    if (!isPlaying) {
      if (speechRef.current) window.speechSynthesis.cancel();
      clearInterval(timerRef.current);
      return;
    }

    // Trigger voiceover for active scene
    speakScene(activeScene.voiceText);

    const stepMs = 100;
    const totalMs = (activeScene.duration * 1000) / playbackSpeed;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (stepMs / totalMs) * 100;
        if (nextVal >= 100) {
          // Next scene or loop
          if (currentSceneIdx < SCENES.length - 1) {
            setCurrentSceneIdx((curr) => curr + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return nextVal;
      });
    }, stepMs);

    return () => {
      clearInterval(timerRef.current);
      if (speechRef.current) window.speechSynthesis.cancel();
    };
  }, [isPlaying, currentSceneIdx, playbackSpeed, isMuted]);

  const handleTogglePlay = () => {
    if (!isPlaying && progress >= 100 && currentSceneIdx === SCENES.length - 1) {
      setCurrentSceneIdx(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectScene = (idx) => {
    setCurrentSceneIdx(idx);
    setProgress(0);
    if (isPlaying) {
      window.speechSynthesis.cancel();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSceneIdx(0);
    setProgress(0);
    window.speechSynthesis.cancel();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header Card */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              AI Video & Animated Cinematic Showcase
            </h2>
          </div>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Narrated walkthrough: What makes LandslideShield NER unique from traditional early warning systems
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn btn-secondary btn-sm"
            title={isMuted ? 'Unmute voiceover narration' : 'Mute voiceover'}
          >
            {isMuted ? <VolumeX size={14} color="var(--risk-critical)" /> : <Volume2 size={14} color="var(--risk-safe)" />}
            <span>{isMuted ? 'Muted' : 'AI Voiceover ON'}</span>
          </button>

          <button
            onClick={handleTogglePlay}
            className="btn btn-primary btn-sm"
            id="btn-video-play"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause Video' : 'Play Showcase'}</span>
          </button>
        </div>
      </div>

      {/* Main Video Cinema Screen (16:9 Aspect Ratio) */}
      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}
      >
        {/* Visual Stage Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: '520px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Background Poster Image */}
          <img
            src="/hero_banner.jpg"
            alt="LandslideShield NER Digital Platform"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.32) contrast(1.15)',
              transform: `scale(${1.0 + (progress / 100) * 0.05})`,
              transition: 'transform 0.2s ease-out'
            }}
          />

          {/* Animated Overlay Grid Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(21, 94, 239, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top Scene Tag & Timing Badge */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '24px',
              right: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em'
                }}
              >
                {activeScene.badge}
              </span>
              <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: 600 }}>
                Chapter {activeScene.id} of {SCENES.length}: {activeScene.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isPlaying ? 'var(--risk-safe)' : 'var(--risk-watch)' }} className={isPlaying ? 'pulse' : ''} />
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                {isPlaying ? 'AI BROADCAST STREAMING' : 'READY TO PLAY'}
              </span>
            </div>
          </div>

          {/* Center Stage Presentation Card */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '850px',
              padding: '24px 32px',
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(8px)',
              margin: '0 24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary-border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {activeScene.subtitle}
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px', marginBottom: '14px', lineHeight: 1.25 }}>
              {activeScene.title}
            </h2>

            {/* Key Bullet Visual Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {activeScene.highlightPoints.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '13px',
                    color: '#E2E8F0',
                    lineHeight: 1.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    borderLeft: '3px solid var(--primary)'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Quote Badge */}
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontStyle: 'italic', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '8px' }}>
              Core Philosophy: <strong>Observe → Understand → Decide → Act</strong>
            </div>
          </div>

          {/* Bottom Captions & Voiceover Subtitles */}
          {showCaptions && (
            <div
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '24px',
                right: '24px',
                textAlign: 'center',
                zIndex: 15,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#F8FAFC',
                lineHeight: 1.5,
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              🎙️ <em>"{activeScene.voiceText}"</em>
            </div>
          )}
        </div>

        {/* Video Player Control Bar */}
        <div
          style={{
            backgroundColor: '#090D16',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Progress Timeline Scrubber */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                flex: 1,
                height: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(pos * 100);
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--primary)',
                  borderRadius: '3px',
                  transition: 'width 0.1s linear'
                }}
              />
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>
              Scene {currentSceneIdx + 1}/{SCENES.length} ({Math.round((activeScene.duration * progress) / 100)}s / {activeScene.duration}s)
            </span>
          </div>

          {/* Control Buttons Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handleTogglePlay}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  backgroundColor: 'transparent',
                  color: '#94A3B8',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Restart showcase from beginning"
              >
                <RotateCcw size={13} />
                <span>Restart</span>
              </button>

              <button
                onClick={() => setShowCaptions(!showCaptions)}
                style={{
                  backgroundColor: showCaptions ? 'rgba(21, 94, 239, 0.2)' : 'transparent',
                  color: showCaptions ? '#60A5FA' : '#94A3B8',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Captions {showCaptions ? 'ON' : 'OFF'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94A3B8' }}>
                <span>Speed:</span>
                {[1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    style={{
                      background: playbackSpeed === spd ? 'var(--primary)' : 'transparent',
                      color: playbackSpeed === spd ? '#FFFFFF' : '#94A3B8',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '3px',
                      padding: '2px 6px',
                      fontSize: '10.5px',
                      cursor: 'pointer'
                    }}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters & Scenes Selector Row */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Layers size={16} color="var(--primary)" />
            <span>Showcase Chapters & Unique Value Pillars</span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Click any chapter to jump directly</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {SCENES.map((scene, idx) => {
            const isCurrent = idx === currentSceneIdx;

            return (
              <div
                key={scene.id}
                onClick={() => handleSelectScene(idx)}
                style={{
                  border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: isCurrent ? 'var(--primary-light)' : 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: isCurrent ? 'var(--primary)' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {scene.badge}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{scene.duration}s</span>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {scene.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {scene.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
