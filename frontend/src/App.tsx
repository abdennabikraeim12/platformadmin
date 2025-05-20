import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { StatisticsPage } from './pages/StatisticsPage/StatisticsPage';
import { CategoriesPage } from './pages/categories';
import { OrdersPage } from './pages/orders';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/stats" element={<StatisticsPage />} />
       <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  </Router>
);

export default App;

