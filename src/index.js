import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './redux/store/store';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MoviesDetails } from './page/MoviesDetails';
import SearchedMovies from './page/SearchedMovies';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={ store }>

    <Routes>
      <Route exect path='/' element={<App/>}/>
      <Route path='/:id' element={<MoviesDetails/>} />
      <Route path='/search' element={<SearchedMovies/>} />
    </Routes>

    </Provider>
  </BrowserRouter>
);
