import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/planetsProvider';
import Form from './components/Form';

function App() {
  return (
    <div className="bg-[url('./images/starwars3.png')] bg-cover h-full">
      <Provider>
        <main className="flex flex-col justify-center content-center items-center p-10">
          <h1 className="font-serif text-5xl text-yellow-400">Star Wars</h1>
          <h3 className="text-3xl text-white">Planets Dashboard</h3>
          <Form />
          <Table />
        </main>
      </Provider>
    </div>
  );
}

export default App;
