import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import TemplatePreview from './pages/TemplatePreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="preview/:id" element={<TemplatePreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
