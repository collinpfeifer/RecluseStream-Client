import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <Header />
        <Routes>
          <Route path='/' exact element={<StreamList />} />
          <Route path='/streams/new' exact element={<StreamCreate />} />
          <Route path='/streams/edit/:id' exact element={<StreamEdit />} />
          <Route path='/streams/delete/:id' exact element={<StreamDelete />} />
          <Route path='/streams/:id' exact element={<StreamShow />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
