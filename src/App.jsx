import React from 'react';
import { StateProvider, useAppState } from './services/stateContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';

// Views
import LoginView from './views/LoginView';
import CommandCenterView from './views/CommandCenterView';
import RiskMapView from './views/RiskMapView';
import RiskIntelligenceView from './views/RiskIntelligenceView';
import FieldReportsView from './views/FieldReportsView';
import RoadInfrastructureView from './views/RoadInfrastructureView';
import AlertsView from './views/AlertsView';
import ResponseManagementView from './views/ResponseManagementView';
import AiAssistantView from './views/AiAssistantView';
import AiVideoShowcaseView from './views/AiVideoShowcaseView';
import AnalyticsView from './views/AnalyticsView';
import MlModelView from './views/MlModelView';
import SettingsView from './views/SettingsView';

function AppContent() {
  const { isAuthenticated, activeTab } = useAppState();

  if (!isAuthenticated) {
    return (
      <>
        <LoginView />
        <ToastContainer />
      </>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenterView />;
      case 'risk-map':
        return <RiskMapView />;
      case 'risk-intelligence':
        return <RiskIntelligenceView />;
      case 'field-reports':
        return <FieldReportsView />;
      case 'roads':
        return <RoadInfrastructureView />;
      case 'alerts':
        return <AlertsView />;
      case 'response':
        return <ResponseManagementView />;
      case 'video-showcase':
        return <AiVideoShowcaseView />;
      case 'ai-assistant':
        return <AiAssistantView />;
      case 'ml-model':
        return <MlModelView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CommandCenterView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          {renderActiveView()}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StateProvider>
      <AppContent />
    </StateProvider>
  );
}
