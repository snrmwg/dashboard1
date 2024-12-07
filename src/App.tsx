import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/features/Layout';
import { FairsPage } from './components/features/fairs/FairsPage';
import { FairDetailsPage } from './components/features/fairs/FairDetailsPage';
import { OrganisersPage } from './components/features/organisers/OrganisersPage';
import { VenuesPage } from './components/features/venues/VenuesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<FairsPage />} />
            <Route path="/fairs/:id" element={<FairDetailsPage />} />
            <Route path="/organisers" element={<OrganisersPage />} />
            <Route path="/venues" element={<VenuesPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;