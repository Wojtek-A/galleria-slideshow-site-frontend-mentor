import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import { Header } from './Header/Header';
import { Gallery } from '../pages/Gallery/Gallery';
import { Painting } from '../pages/Painting/Painting';
import { NotFound } from '../pages/NotFound/NotFound';

const App = () => {
  return (
    <main className={css.container}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Gallery />} />
          <Route path="detail" element={<Painting />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
