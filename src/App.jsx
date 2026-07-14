import { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import UploadResume from './components/UploadResume';

function App() {
  const [view, setView] = useState('signup'); // 'signup' | 'onboarding'

  return (
    <div className="app-container">
      {view === 'signup' ? (
        <>
          <LeftPanel />
          <RightPanel onSignupSuccess={() => setView('onboarding')} />
          {/* Quick jump link to preview the onboarding screen directly */}
          <div className="floating-preview-bar">
            <span>Development Mode:</span>
            <button className="preview-toggle-btn" onClick={() => setView('onboarding')}>
              Show Upload Resume Screen (V1.F1.4) ➔
            </button>
          </div>
        </>
      ) : (
        <UploadResume onBackToSignup={() => setView('signup')} />
      )}
    </div>
  );
}

export default App;
