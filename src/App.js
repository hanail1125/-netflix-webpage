import {Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/Home/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetails/MovieDetailPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path='movies'>
          <Route index element={<MoviePage />} />
          <Route path=':id' element={<MovieDetailPage />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;