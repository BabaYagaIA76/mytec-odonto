import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PricingSystem from './pages/PricingSystem';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PricingSystem />} />
        <Route path="/admin/*" element={<PricingSystem />} />
      </Routes>
    </BrowserRouter>
  );
}
