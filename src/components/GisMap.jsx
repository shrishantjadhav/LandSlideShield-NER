import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useAppState } from '../services/stateContext';
import { Layers, Maximize2, RotateCcw, Filter, Eye, ShieldAlert } from 'lucide-react';

export default function GisMap({ height = '560px', showControls = true, onSelectZone }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersGroupRef = useRef({});

  const {
    filteredZones,
    selectedZoneId,
    setSelectedZoneId,
    roads,
    fieldReports
  } = useAppState();

  // Active Layer Toggles
  const [layers, setLayers] = useState({
    riskZones: true,
    rainfallOverlay: true,
    roads: true,
    villages: true,
    infrastructure: true,
    historicalLandslides: true,
    fieldReports: true
  });

  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Helper for Semantic Risk Color
  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return '#D92D20';
      case 'HIGH':
        return '#F04438';
      case 'WATCH':
        return '#F79009';
      case 'LOW':
      default:
        return '#12B76A';
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    // Center on North East India (approx. 26.0° N, 92.5° E)
    const map = L.map(mapContainerRef.current, {
      center: [26.15, 92.8],
      zoom: 7,
      minZoom: 6,
      maxZoom: 14,
      zoomControl: false
    });

    // Add Zoom Control to bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Clean, crisp Light Gray Canvas Base (Zero watermark, No API key required)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri, DeLorme, NAVTEQ, OpenStreetMap contributors',
      maxZoom: 16
    }).addTo(map);

    // Layer groups
    const riskZonesGroup = L.layerGroup().addTo(map);
    const roadsGroup = L.layerGroup().addTo(map);
    const fieldReportsGroup = L.layerGroup().addTo(map);
    const infraGroup = L.layerGroup().addTo(map);
    const historicalGroup = L.layerGroup().addTo(map);

    layersGroupRef.current = {
      riskZones: riskZonesGroup,
      roads: roadsGroup,
      fieldReports: fieldReportsGroup,
      infrastructure: infraGroup,
      historical: historicalGroup
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Layers & Overlays whenever data or layer toggles change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const {
      riskZones: riskZonesGroup,
      roads: roadsGroup,
      fieldReports: fieldReportsGroup,
      infrastructure: infraGroup,
      historical: historicalGroup
    } = layersGroupRef.current;

    // Clear previous layers
    riskZonesGroup.clearLayers();
    roadsGroup.clearLayers();
    fieldReportsGroup.clearLayers();
    infraGroup.clearLayers();
    historicalGroup.clearLayers();

    // 1. RISK ZONES & RAINFALL OVERLAYS
    if (layers.riskZones) {
      filteredZones.forEach((zone) => {
        const isSelected = zone.id === selectedZoneId;
        const color = getRiskColor(zone.riskLevel);
        const radius = isSelected ? 32000 : 25000;

        // Outer Translucent Zone Circle
        const circle = L.circle([zone.lat, zone.lng], {
          color: color,
          fillColor: color,
          fillOpacity: zone.riskLevel === 'CRITICAL' ? 0.35 : 0.22,
          weight: isSelected ? 3 : 1.5,
          dashArray: isSelected ? '4, 4' : null,
          radius: radius
        }).addTo(riskZonesGroup);

        circle.on('click', () => {
          setSelectedZoneId(zone.id);
          if (onSelectZone) onSelectZone(zone.id);
        });

        // Center Marker with Score Badge
        const isCritical = zone.riskLevel === 'CRITICAL';
        const markerHtml = `
          <div style="
            position: relative;
            background: #FFFFFF;
            border: 2px solid ${color};
            border-radius: 20px;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 700;
            color: ${color};
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            <span style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: ${color};
              display: inline-block;
            "></span>
            <span>${zone.riskScore}</span>
            <span style="font-size: 9px; font-weight: 600; color: #475467;">${zone.id}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-zone-marker',
          html: markerHtml,
          iconSize: [0, 0]
        });

        const marker = L.marker([zone.lat, zone.lng], { icon: customIcon }).addTo(riskZonesGroup);
        marker.on('click', () => {
          setSelectedZoneId(zone.id);
          if (onSelectZone) onSelectZone(zone.id);
        });
      });
    }

    // 2. MONITORED ROADS
    if (layers.roads) {
      roads.forEach((road) => {
        // Approximate coordinates around NER for mountain corridors
        let coords = [];
        if (road.id === 'RD-01') {
          // NH-10 Sevoke - Gangtok
          coords = [
            [26.88, 88.47],
            [27.05, 88.49],
            [27.17, 88.52],
            [27.33, 88.61]
          ];
        } else if (road.id === 'RD-02') {
          // NH-54 Aizawl - Thenzawl
          coords = [
            [23.73, 92.71],
            [23.50, 92.75],
            [23.28, 92.76]
          ];
        } else if (road.id === 'RD-03') {
          // NH-29 Dimapur - Kohima
          coords = [
            [25.90, 93.72],
            [25.75, 93.92],
            [25.67, 94.11]
          ];
        } else if (road.id === 'RD-04') {
          // SH-5 Shillong - Cherrapunji
          coords = [
            [25.57, 91.88],
            [25.42, 91.78],
            [25.29, 91.71]
          ];
        } else if (road.id === 'RD-05') {
          // NH-13 Bhalukpong - Tawang
          coords = [
            [27.01, 92.65],
            [27.35, 92.24],
            [27.58, 91.86]
          ];
        }

        if (coords.length > 0) {
          const roadColor =
            road.status === 'BLOCKED'
              ? '#D92D20'
              : road.status === 'RESTRICTED'
              ? '#F04438'
              : road.status === 'CAUTION'
              ? '#F79009'
              : '#344054';

          const polyline = L.polyline(coords, {
            color: roadColor,
            weight: 4,
            opacity: 0.85,
            dashArray: road.status === 'BLOCKED' ? '6, 6' : null
          }).addTo(roadsGroup);

          polyline.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; padding: 4px;">
              <strong style="color: #0F172A;">${road.name}</strong><br/>
              <span style="font-weight: 600; color: ${roadColor};">Status: ${road.status}</span><br/>
              <span style="color: #475467;">${road.sector}</span><br/>
              <p style="margin-top: 4px; font-size: 11px;">${road.description}</p>
            </div>
          `);
        }
      });
    }

    // 3. FIELD REPORTS
    if (layers.fieldReports) {
      fieldReports.forEach((report) => {
        const isCritical = report.risk === 'Critical';
        const reportMarkerHtml = `
          <div style="
            background: #FFFFFF;
            border: 2px solid ${isCritical ? '#D92D20' : '#F79009'};
            border-radius: 4px;
            padding: 2px 4px;
            font-size: 9.5px;
            font-weight: 700;
            color: #0F172A;
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
            white-space: nowrap;
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            📌 ${report.id}
          </div>
        `;

        // Position slightly offset from zone
        const coords =
          report.id === 'FR-2041'
            ? [27.35, 88.62]
            : report.id === 'FR-2038'
            ? [23.75, 92.73]
            : report.id === 'FR-2035'
            ? [25.32, 91.73]
            : [25.19, 93.04];

        const marker = L.marker(coords, {
          icon: L.divIcon({ className: 'custom-report-pin', html: reportMarkerHtml, iconSize: [0, 0] })
        }).addTo(fieldReportsGroup);

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #0F172A;">${report.id} — ${report.type}</strong><br/>
            <span style="color: #475467;">By: ${report.reportedBy} (${report.timestamp})</span><br/>
            <p style="margin-top: 4px; font-size: 11px;">${report.description}</p>
          </div>
        `);
      });
    }

    // 4. CRITICAL INFRASTRUCTURE & SETTLEMENTS
    if (layers.infrastructure) {
      const infrastructureSites = [
        { name: 'Teesta Valley Bridge #4', type: 'Bridge', lat: 27.24, lng: 88.54, status: 'At Risk' },
        { name: 'Singtam District Hospital', type: 'Hospital', lat: 27.23, lng: 88.50, status: 'Pre-Alert' },
        { name: 'Martam Secondary School', type: 'School', lat: 27.27, lng: 88.57, status: 'Evacuated' },
        { name: 'Durtlang HT Power Pylon', type: 'Grid', lat: 23.78, lng: 92.72, status: 'Threatened' }
      ];

      infrastructureSites.forEach((site) => {
        const infraHtml = `
          <div style="
            background: #0F172A;
            color: #FFFFFF;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 700;
            border: 1.5px solid #FFFFFF;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transform: translate(-50%, -50%);
          " title="${site.name} (${site.type})">
            ${site.type === 'Hospital' ? 'H' : site.type === 'Bridge' ? 'B' : 'S'}
          </div>
        `;

        const marker = L.marker([site.lat, site.lng], {
          icon: L.divIcon({ className: 'custom-infra-pin', html: infraHtml, iconSize: [0, 0] })
        }).addTo(infraGroup);

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #0F172A;">${site.name}</strong><br/>
            <span style="color: #475467;">Type: ${site.type}</span><br/>
            <span style="color: #D92D20; font-weight: 600;">Status: ${site.status}</span>
          </div>
        `);
      });
    }
  }, [filteredZones, selectedZoneId, roads, fieldReports, layers]);

  // Center on Selected Zone
  const centerOnSelectedZone = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const current = filteredZones.find((z) => z.id === selectedZoneId);
    if (current) {
      map.flyTo([current.lat, current.lng], 9, { duration: 1.2 });
    }
  };

  const resetRegionalView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([26.15, 92.8], 7, { duration: 1.2 });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      {/* Map DOM container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', backgroundColor: '#F8FAFC' }} />

      {/* Top Map Floating Action Bar */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {/* Layer Selector Toggle */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
            >
              <Layers size={14} />
              <span>GIS Layers</span>
            </button>

            {showLayerMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '36px',
                  left: '0',
                  width: '210px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-md)',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  zIndex: 20
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Overlay Layers
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={layers.riskZones} onChange={() => toggleLayer('riskZones')} />
                  <span>Risk Zones (InSAR/ML)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={layers.roads} onChange={() => toggleLayer('roads')} />
                  <span>Monitored Road Corridors</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={layers.fieldReports} onChange={() => toggleLayer('fieldReports')} />
                  <span>Field Reports (Ground Pins)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={layers.infrastructure} onChange={() => toggleLayer('infrastructure')} />
                  <span>Lifeline Infrastructure</span>
                </label>
              </div>
            )}
          </div>

          <button
            onClick={centerOnSelectedZone}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
            title="Focus map on selected critical zone"
          >
            <ShieldAlert size={14} color="var(--risk-critical)" />
            <span>Center Focus</span>
          </button>

          <button
            onClick={resetRegionalView}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
            title="Reset to full North Eastern Region view"
          >
            <RotateCcw size={14} />
            <span>Reset NER</span>
          </button>
        </div>
      )}

      {/* Map Legend Overlay (Bottom Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          zIndex: 10,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 12px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '11px',
          fontWeight: 600
        }}
      >
        <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Risk Legend:
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-safe-text)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-safe)' }}></span>
          LOW (&lt;40)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-watch-text)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-watch)' }}></span>
          WATCH (40–69)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-high-text)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-high)' }}></span>
          HIGH (70–84)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--risk-critical)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--risk-critical)' }}></span>
          CRITICAL (≥85)
        </span>
      </div>
    </div>
  );
}
