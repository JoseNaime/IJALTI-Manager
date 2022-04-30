import React from 'react'

function App() {
  return (
      <div className='container mx-auto'>
        <h1>Tailwind CSS</h1>
        <h2>Incorporado con PostCss</h2>
        <button className="btn btn-blue btn-blue:hover">Botón</button>
        <div className="my-5 flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 my-2">
            Hola
          </div>

        </div>
      </div>
  );
}

export default App;
