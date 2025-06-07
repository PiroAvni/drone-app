import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AnalyticsHeatmaps from './pages/AnalyticsHeatmaps';
import LiveDroneFeed from './pages/LiveDroneFeed';
import LeakHeatmap from './pages/LeakHeatmap';

const appRoutes = [
  <Route path='/' element={<Home />} key='home' />,
  <Route path='/dashboard' element={<Dashboard />} key='dashboard' />,
  <Route path='/analytics' element={<AnalyticsHeatmaps />} key='analytics' />,
  <Route
    path='/live-drone-feed'
    element={<LiveDroneFeed />}
    key='live-drone-feed'
  />,
  <Route path='/leak-heatmap' element={<LeakHeatmap />} key='leak-heatmap' />,
];

export default appRoutes;
