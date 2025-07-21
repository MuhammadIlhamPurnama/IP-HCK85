import { BrowserRouter, Routes, Route } from 'react-router';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />} >
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}