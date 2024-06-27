import React from 'react';
import Home from './components/Home/Home';
import useWindowResize from './hooks/useWindowResize'

const App = () => {
  const isLargeScreen = useWindowResize();

  return (
    <>
      {isLargeScreen ? (
        <div className="container">
          <div className="card">
            <Home />
          </div>
        </div>
      ) : (
        <div className="">
          <Home />
        </div>
      )}
    </>
  );
};

export default App;
