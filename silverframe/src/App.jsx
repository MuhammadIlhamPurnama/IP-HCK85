import { BrowserRouter, Routes, Route } from 'react-router';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResgisterPage from './pages/ResgisterPage';
import PopularPage from './pages/PopularPage';
import NewestPage from './pages/NewestPage';
import DetailPage from './pages/DetailPage';
import ScrollToTop from './lib/ScrollToTop';
import ThreadPage from './pages/ThreadPage';
import AiAssistant from './pages/AiAssistant';
import Infographic from './pages/Infographic';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ResgisterPage />} />
        

        <Route element={<HomeLayout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/newest" element={<NewestPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />

          <Route path="/thread" element={<ThreadPage />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/infographic" element={<Infographic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}