import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Pages
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Builder from './pages/resume-builder/Builder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                 <RedirectToSignIn />
              </SignedOut>
            </>
          } 
        />
        <Route 
          path="/builder/:id?" 
          element={
            <>
              <SignedIn>
                <Builder />
              </SignedIn>
              <SignedOut>
                 <RedirectToSignIn />
              </SignedOut>
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
