import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdsListPage } from './pages/AdsListPage'
import { AdEditPage } from './pages/AdEditPage'
import { AdDetailsPage } from './pages/AdDetailsPage';
import {  MantineProvider } from '@mantine/core';

function App() {

  return (
  <MantineProvider>
    <Routes>
      <Route path='/' element = {<Navigate to='/ads' replace/>}/>
      <Route path='/ads' element = {<AdsListPage/>}/>
      <Route path='/ads/:id' element={<AdDetailsPage/>}/>
      <Route path="/ads/:id/edit" element={<AdEditPage />} />
    </Routes>
    </MantineProvider>
  )
}

export default App
