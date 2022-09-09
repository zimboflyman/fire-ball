import React, { useState, useEffect, useErrorHandler } from "react";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";

const App = () => {
  // get the api data from https://ssd-api.jpl.nasa.gov/doc/fireball.html
  const apiUrl = "https://ssd-api.jpl.nasa.gov/fireball.api";

  // const handleError = useErrorHandler();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState([]);

  // use fetch instead of try / catch
  // const callAPI = async () => {
  //   const response = await fetch(apiUrl);
  //   const jsonData = await response.json();
  //   setData(jsonData);
  // };
  // useEffect(() => {
  // (async function () {
  //   await callAPI();
  // })();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log("response Status = ", response.status);
        if (!response.ok) {
          setIsError(true);
          console.log("response not ok Status = ", response.status);
          // (error) => handleError(error);
          // throw Error(response.status);
        }
        const jsonData = await response.json();
        console.log("jsonData:::", jsonData);
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log("error here!", error.message);
        setIsLoading(false);
        console.log("isError = ", isError);
        setIsError(true);
      }
    };
    fetchData();
  }, [apiUrl, isError]);

  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div role="alert">
        <p>Something went wrong while fetching fireBall data:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <p>{`returned: ${data.count} records`} .</p>
        </ErrorBoundary>
      </header>
    </div>
  );
};

export default App;
