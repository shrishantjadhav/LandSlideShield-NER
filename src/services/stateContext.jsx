import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_RISK_ZONES,
  INITIAL_ROADS,
  INITIAL_FIELD_REPORTS,
  INITIAL_ALERTS,
  INITIAL_INCIDENTS,
  INITIAL_NOTIFICATIONS,
  DEMO_SCENARIO_STEPS
} from './mockData';
import { fetchLiveMeteoData } from './weatherService';

const StateContext = createContext(null);

export function StateProvider({ children }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Officer T. Dorjee',
    role: 'Disaster Management Officer',
    department: 'NER Early Warning Cell (SDMA/NDMA)',
    email: 'demo@landslideshield.in'
  });

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState('command-center');
  const [filterState, setFilterState] = useState('All States');
  const [filterRiskLevel, setFilterRiskLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Data Stores
  const [riskZones, setRiskZones] = useState(INITIAL_RISK_ZONES);
  const [selectedZoneId, setSelectedZoneId] = useState('ES-042');
  const [roads, setRoads] = useState(INITIAL_ROADS);
  const [fieldReports, setFieldReports] = useState(INITIAL_FIELD_REPORTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Demo Scenario Simulator (0 to 7)
  const [scenarioStep, setScenarioStep] = useState(4); // Default at Step 4 (Critical) for immediate impressive view

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to get currently selected zone
  const selectedZone = riskZones.find((z) => z.id === selectedZoneId) || riskZones[0];

  // Apply Demo Scenario Step
  const applyScenarioStep = (stepIndex) => {
    const step = DEMO_SCENARIO_STEPS[stepIndex];
    if (!step) return;

    setScenarioStep(stepIndex);

    // Update East Sikkim zone according to scenario definition
    setRiskZones((prev) =>
      prev.map((zone) => {
        if (zone.id === 'ES-042') {
          const oldScore = zone.riskScore;
          const newScore = step.riskScore;
          const diff = newScore - oldScore;
          const sign = diff >= 0 ? `+${diff}%` : `${diff}%`;

          const updatedTrend = [...zone.riskTrend24h.slice(1), newScore];

          return {
            ...zone,
            riskScore: newScore,
            riskLevel: step.riskLevel,
            changePercent: sign,
            telemetry: {
              ...zone.telemetry,
              rainfall24h: step.rainfall24h,
              soilMoisture: step.soilMoisture
            },
            riskTrend24h: updatedTrend
          };
        }
        return zone;
      })
    );

    // If step 3+, ensure field report exists and is prominent
    if (stepIndex >= 3) {
      setFieldReports((prev) =>
        prev.map((r) => (r.id === 'FR-2041' ? { ...r, status: 'Verified', risk: 'Critical' } : r))
      );
    }

    // If step 5+, ensure critical alert is active
    if (stepIndex >= 5) {
      setAlerts((prev) =>
        prev.map((a) => (a.id === 'ALT-1092' ? { ...a, active: true } : a))
      );
    }

    // If step 6+, update incident status
    if (stepIndex >= 6) {
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === 'INC-401' ? { ...inc, status: 'IN PROGRESS' } : inc))
      );
    }

    // Add toast notification for scenario progression
    addToast(`Scenario Step ${stepIndex}: ${step.title} applied. Risk Score: ${step.riskScore}`, step.riskLevel === 'CRITICAL' ? 'critical' : 'success');
  };

  // Simulate Rainfall Surge manually
  const simulateRainfallIncrease = (amount = 15) => {
    setRiskZones((prev) =>
      prev.map((zone) => {
        if (zone.id === selectedZoneId) {
          const newRain = zone.telemetry.rainfall24h + amount;
          const newSoil = Math.min(96, zone.telemetry.soilMoisture + Math.round(amount * 0.4));
          const calculatedScore = Math.min(99, Math.round(zone.riskScore + amount * 0.45));
          const newLevel = calculatedScore >= 85 ? 'CRITICAL' : calculatedScore >= 70 ? 'HIGH' : calculatedScore >= 40 ? 'WATCH' : 'LOW';

          addToast(
            `Simulated +${amount}mm rainfall surge in ${zone.name}. Risk elevated to ${calculatedScore} (${newLevel}).`,
            newLevel === 'CRITICAL' ? 'critical' : 'info'
          );

          // Trigger notification
          const newNotif = {
            id: `NOTIF-${Date.now()}`,
            type: newLevel === 'CRITICAL' ? 'critical' : 'warning',
            title: `Rainfall Surge in ${zone.shortName}`,
            message: `24h rainfall jumped to ${newRain}mm. Current risk score: ${calculatedScore}/100.`,
            time: 'Just now',
            unread: true,
            zoneId: zone.id
          };
          setNotifications((n) => [newNotif, ...n]);

          return {
            ...zone,
            riskScore: calculatedScore,
            riskLevel: newLevel,
            changePercent: `+${Math.round(amount * 0.45)}%`,
            telemetry: {
              ...zone.telemetry,
              rainfall24h: newRain,
              soilMoisture: newSoil
            },
            riskTrend24h: [...zone.riskTrend24h.slice(1), calculatedScore]
          };
        }
        return zone;
      })
    );
  };

  // Live Open-Meteo Weather Sync
  const [isLiveWeatherActive, setIsLiveWeatherActive] = useState(true);
  const [isSyncingWeather, setIsSyncingWeather] = useState(false);

  const syncLiveOpenMeteoWeather = async (targetZoneId = selectedZoneId) => {
    const target = riskZones.find((z) => z.id === targetZoneId);
    if (!target) return;

    setIsSyncingWeather(true);
    const meteo = await fetchLiveMeteoData(target.lat, target.lng);
    setIsSyncingWeather(false);

    if (meteo.success) {
      setRiskZones((prev) =>
        prev.map((zone) => {
          if (zone.id === targetZoneId) {
            return {
              ...zone,
              telemetry: {
                ...zone.telemetry,
                temperature: meteo.temperature,
                windSpeed: meteo.windSpeed,
                rainfall3Day: meteo.rainfall3Day,
                liveFetched: true,
                liveElevation: meteo.elevation
              }
            };
          }
          return zone;
        })
      );
      addToast(
        `Live Open-Meteo synced for ${target.shortName}: ${meteo.temperature}°C, ${meteo.windSpeed} km/h wind, ${meteo.humidity}% humidity.`,
        'success'
      );
    } else {
      addToast(`Open-Meteo live feed: using regional high-resolution calibrated telemetry.`, 'info');
    }
  };

  // Sync live weather on initial load
  useEffect(() => {
    syncLiveOpenMeteoWeather('ES-042');
  }, []);

  // Submit a new Field Report
  const submitFieldReport = (reportData) => {
    const newId = `FR-${Math.floor(2050 + Math.random() * 900)}`;
    const newReport = {
      id: newId,
      location: reportData.location || selectedZone.name,
      sector: reportData.sector || 'Monitored Sector',
      reportedBy: reportData.reportedBy || user.name,
      role: 'Field Officer',
      contact: '+91 94340-99211',
      type: reportData.type || 'Slope Crack',
      timestamp: 'Just now',
      risk: reportData.severity || 'High',
      status: 'Pending',
      gps: reportData.gps || `${selectedZone.lat.toFixed(4)}° N, ${selectedZone.lng.toFixed(4)}° E`,
      description: reportData.description || 'Observed ground movement and localized soil displacement.',
      aiImageAssessment: 'Surface tension features and vegetation tilt observed. Recommended priority inspection.',
      aiConfidence: 85,
      riskBefore: selectedZone.riskScore,
      riskAfter: Math.min(99, selectedZone.riskScore + 6),
      imagePlaceholder: 'uploaded-preview'
    };

    setFieldReports((prev) => [newReport, ...prev]);

    // Update the zone risk slightly
    setRiskZones((prev) =>
      prev.map((z) => {
        if (z.id === selectedZoneId) {
          return {
            ...z,
            riskScore: Math.min(98, z.riskScore + 4),
            riskLevel: z.riskScore + 4 >= 85 ? 'CRITICAL' : 'HIGH'
          };
        }
        return z;
      })
    );

    addToast(`Field report ${newId} submitted. Risk assessment updated.`, 'success');
  };

  // Verify a Field Report
  const verifyFieldReport = (reportId) => {
    setFieldReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'Verified' } : r))
    );
    addToast(`Field Report ${reportId} successfully verified by Command Officer.`, 'success');
  };

  // Create an Alert
  const createAlert = (alertData) => {
    const newId = `ALT-${Math.floor(1100 + Math.random() * 900)}`;
    const newAlert = {
      id: newId,
      zoneId: alertData.zoneId || selectedZoneId,
      location: alertData.location || selectedZone.name,
      level: alertData.level || 'CRITICAL',
      title: alertData.title || `EARLY WARNING: ${selectedZone.shortName}`,
      summary: alertData.message || 'Elevated risk conditions detected. Precautionary evacuation protocol advised.',
      impact: `${selectedZone.impact.roadsCount} roads, ${selectedZone.impact.villagesCount} villages, ~${selectedZone.impact.populationExposed} residents.`,
      channels: alertData.channels || ['SMS Broadcast', 'CAP Siren Gateway', 'Disaster App Push'],
      timestamp: 'Just now',
      active: true
    };

    setAlerts((prev) => [newAlert, ...prev]);
    addToast(`Alert ${newId} issued successfully across selected communication channels.`, 'critical');
  };

  // Assign Field Team to Incident
  const assignTeamToIncident = (incidentId, teamName) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            assignedTeam: teamName,
            status: 'IN PROGRESS',
            updated: 'Just now',
            timeline: [
              ...inc.timeline,
              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `${teamName} dispatched and en route.` }
            ]
          };
        }
        return inc;
      })
    );
    addToast(`Response Team assigned to incident ${incidentId}.`, 'success');
  };

  // Filtered Zones
  const filteredZones = riskZones.filter((z) => {
    const matchesState = filterState === 'All States' || z.state === filterState;
    const matchesRisk = filterRiskLevel === 'ALL' || z.riskLevel === filterRiskLevel;
    const matchesSearch =
      searchQuery === '' ||
      z.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesRisk && matchesSearch;
  });

  return (
    <StateContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        activeTab,
        setActiveTab,
        filterState,
        setFilterState,
        filterRiskLevel,
        setFilterRiskLevel,
        searchQuery,
        setSearchQuery,
        riskZones,
        filteredZones,
        selectedZoneId,
        setSelectedZoneId,
        selectedZone,
        roads,
        setRoads,
        fieldReports,
        alerts,
        incidents,
        notifications,
        setNotifications,
        scenarioStep,
        applyScenarioStep,
        simulateRainfallIncrease,
        submitFieldReport,
        verifyFieldReport,
        createAlert,
        assignTeamToIncident,
        toasts,
        addToast,
        removeToast,
        syncLiveOpenMeteoWeather,
        isLiveWeatherActive,
        isSyncingWeather
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
