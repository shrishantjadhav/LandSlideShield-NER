import React from 'react';
import { useAppState } from '../services/stateContext';
import { DEMO_SCENARIO_STEPS } from '../services/mockData';
import { Play, RotateCcw, CloudRain, ChevronRight, ChevronLeft, Sparkles, Activity } from 'lucide-react';

export default function ScenarioTourBar() {
  const {
    scenarioStep,
    applyScenarioStep,
    simulateRainfallIncrease,
    selectedZone,
    setActiveTab
  } = useAppState();

  const currentStep = DEMO_SCENARIO_STEPS[scenarioStep] || DEMO_SCENARIO_STEPS[0];
  const totalSteps = DEMO_SCENARIO_STEPS.length;

  const handleNext = () => {
    const nextIdx = (scenarioStep + 1) % totalSteps;
    applyScenarioStep(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (scenarioStep - 1 + totalSteps) % totalSteps;
    applyScenarioStep(prevIdx);
  };

  const handleReset = () => {
    applyScenarioStep(0);
  };

  return (
    <div className="scenario-bar">
      <div className="scenario-info">
        <span className="scenario-badge">JUDGING DEMO SCENARIO</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>
          Step {scenarioStep + 1} of {totalSteps}: {currentStep.title}
        </span>
        <span style={{ color: 'var(--border-color)' }}>|</span>
        <span className="scenario-text" style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
          {currentStep.description}
        </span>
      </div>

      <div className="scenario-controls">
        {/* Quick Steppers */}
        <button
          onClick={handlePrev}
          className="btn btn-secondary btn-sm"
          title="Previous scenario step"
          disabled={scenarioStep === 0}
        >
          <ChevronLeft size={14} />
          <span>Prev</span>
        </button>

        <button
          onClick={handleNext}
          className="btn btn-primary btn-sm"
          title="Advance to next scenario event"
        >
          <span>Next Step</span>
          <ChevronRight size={14} />
        </button>

        {/* Rain Surge Trigger Button (#32) */}
        <button
          onClick={() => simulateRainfallIncrease(15)}
          className="btn btn-secondary btn-sm"
          title="Simulate +15mm immediate rainfall surge in selected zone"
          style={{ borderColor: 'var(--primary-border)', color: 'var(--primary)' }}
        >
          <CloudRain size={14} />
          <span>Simulate +15mm Rain</span>
        </button>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="btn btn-secondary btn-sm"
          title="Reset demonstration to baseline"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
