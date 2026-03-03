/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const ToolPage = lazy(() => import('./pages/ToolPage'));

function ToolPageFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/tools/:id"
            element={
              <Suspense fallback={<ToolPageFallback />}>
                <ToolPage />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
