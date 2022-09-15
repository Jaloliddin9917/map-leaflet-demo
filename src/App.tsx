import React from 'react';
import './App.css';
import MapContainerLeaflet from './components/MapContainerLeaflet';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <MapContainerLeaflet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
