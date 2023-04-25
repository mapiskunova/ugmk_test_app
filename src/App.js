
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { sagaActions } from './store/sagaActions';
import MainPage from './pages/MainPage/MainPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

import './style.css'

const routes = {
  MAIN_PAGE: '/',
  DETAILS_PAGE: '/details/:factory_id/:month_number'
}

Chart.register(ChartDataLabels, ...registerables);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCTS });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path={routes.MAIN_PAGE}
          element={<MainPage />}
        />
        <Route
          path={routes.DETAILS_PAGE}
          element={<DetailsPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
