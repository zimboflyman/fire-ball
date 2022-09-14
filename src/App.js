import React, { useState, useEffect, useRef } from "react";

import "echarts-gl";
import * as echarts from "echarts";

import { getChartOptions } from "./utils/dataUtils";
import Header from "./components/header";
import Footer from "./components/Footer";
import { ErrorContainer } from "./components/Toolkit";
import ShowDistanceFilter from "./components/ShowDistanceFilter";
import ShowAirlinefilter from "./components/ShowAirlineFilter";
import ShowOnlyAirports from "./components/ShowOnlyAirports";
import InfoContainer from "./components/InfoContainer";

const App = () => {
  const ref = useRef(null);
  let option;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [series, setSeries] = useState("airlines");
  const [apiUrl, setApiUrl] = useState([
    "https://echarts.apache.org/examples/data-gl/asset/data/flights.json",
    1,
  ]);

  // todo list //////////////////////////////////////////////////
  // ** need to run before yarn start:
  // ** - open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

  // fix muddle up between American Airlines and EasyJet
  // add fireball filters to show impact energy and/or brightness
  // download assets
  // move env variables
  // refactor to Typescript
  // add react-testing-lib tests
  // add a decent error boundary
  // initial zoom out on mobile devices
  // get minimal bundle for charts
  // prettify
  // todo ///////////////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl[0]);
        if (!response.ok) {
          setHasError(true);
          setIsLoading(false);
          console.log("response not ok Status = ", response.status);
          // error => handleError(error);
        }
        const jsonData = await response.json();
        console.log("jsonData:::", jsonData);
        setData(jsonData);
        if (apiUrl[1] === 0) {
          localStorage.setItem("apiDataNasa", JSON.stringify(jsonData));
        } else {
          localStorage.setItem("apiData", JSON.stringify(jsonData));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
        setError(error.message);
      }
    };
    fetchData();
  }, [apiUrl, setApiUrl, hasError]);

  useEffect(() => {
    const id = setTimeout(() => {
      //prevent running getChartOptions with old or before data received from fetchData()
      data && (option = getChartOptions(data, series));
      const chartDom = ref.current;
      const globeChart = echarts.init(chartDom);
      option && globeChart.setOption(option);
      window.addEventListener("resize", globeChart.resize);
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [data, setSeries, series]);

  return (
    <div className="App">
      <Header
        setApiUrl={setApiUrl}
        setSeries={setSeries}
        style={{ width: "100vw", height: "10vh" }}
      />
      {isLoading || hasError ? (
        <ErrorContainer className="text-warning justify-content-center">
          {isLoading && <div>Loading...</div>}
          {hasError && <div>{`hasError!!! - ${error}`}</div>}
        </ErrorContainer>
      ) : (
        ""
      )}

      {/* blank canvas for globe chart to render to */}
      <div
        id="globe-Canvas"
        ref={ref}
        style={{ width: "100vw", height: "80vh" }}
      ></div>

      {data && (
        <Footer>
          {/* only render these dropdowns if we are calling flight data */}
          {apiUrl[1] === 1 ? (
            <>
              <ShowAirlinefilter setData={setData} setSeries={setSeries} />
              <ShowDistanceFilter setData={setData} setSeries={setSeries} />
              <ShowOnlyAirports setData={setData} setSeries={setSeries} />
            </>
          ) : (
            <InfoContainer />
          )}
        </Footer>
      )}
    </div>
  );
};

export default App;
