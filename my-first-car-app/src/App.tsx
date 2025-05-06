import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BuyingGuide from './pages/BuyingGuide';
import CarSuggestions from './pages/CarSuggestions';
import CarComparison from './pages/CarComparison';
import Paperwork from './pages/Paperwork';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buying-guide" element={<BuyingGuide />} />
              <Route path="/car-suggestions" element={<CarSuggestions />} />
              <Route path="/car-comparison" element={<CarComparison />} />
              <Route path="/paperwork" element={<Paperwork />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 