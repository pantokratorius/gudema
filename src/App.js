import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';





function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </Suspense>
  );
}



export default App
