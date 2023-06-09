import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerList from './ManufacturerList';
import ManufacturerCreate from './ManufacturerCreate';
import ModelsList from './ModelsList';
import ModelsCreate from './ModelsCreate'
import AutomobileList from './AutomobileList';
import AutomobileCreate from './AutomobileCreate';
import SalespersonCreate from './SalespersonCreate';
import SalespersonList from './SalespersonList';
import CustomerCreate from './CustomerCreate';
import CustomerList from './CustomerList';
import SalesList from './SalesList';
import SalesCreate from './SalesCreate';
import SalesHistory from './SalesHistory';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<ManufacturerList />} />
          <Route path="manufacturers/create/" element={<ManufacturerCreate />} />
          <Route path="models/" element={<ModelsList />} />
          <Route path="models/create/" element={<ModelsCreate />} />
          <Route path="automobiles/" element={<AutomobileList />} />
          <Route path="automobiles/create/" element={<AutomobileCreate />} />
          <Route path="salespeople/" element={<SalespersonList />} />
          <Route path="salespeople/create/" element={<SalespersonCreate />} />
          <Route path="customers/" element={<CustomerList/>} />
          <Route path="customers/create/" element={<CustomerCreate />} />
          <Route path="sales/" element={<SalesList />} />
          <Route path="sales/create/" element={<SalesCreate />} />
          <Route path="sales/history/" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
