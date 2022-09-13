import React, {
  useState,
  useEffect,
  useRef,
  // useErrorHandler,
} from "react";
// import { ErrorBoundary } from "react-error-boundary";

import "echarts-gl";
import * as echarts from "echarts";

import { getChartOptions } from "./utils/dataUtils";
import Header from "./components/header";
import Footer from "./components/Footer";
import ShowDistanceFilter from "./components/ShowDistanceFilter";
import ShowAirlinefilter from "./components/ShowAirlineFilter";
import ShowOnlyAirports from "./components/ShowOnlyAirports";

const App = () => {
  // get the api data from https://ssd-api.jpl.nasa.gov/doc/fireball.html
  // const apiUrl = "https://ssd-api.jpl.nasa.gov/fireball.api";
  // const apiUrl =
  //   "https://echarts.apache.org/examples/data-gl/asset/data/population.json";
  const apiUrl =
    "https://echarts.apache.org/examples/data-gl/asset/data/flights.json";

  // const handleError = useErrorHandler();
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState();
  let option;

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

  // const ErrorFallback = ({ error, resetErrorBoundary }) => {
  //   return (
  //     <div role="alert">
  //       <p>Something went wrong while fetching fireBall data:</p>
  //       <pre>{error.message}</pre>
  //       <button onClick={resetErrorBoundary}>Try again</button>
  //     </div>
  //   );
  // };

  // todo list
  // download assets
  // style DD's and sort selected label
  // get minimal bundle
  // initial zoom out on mobile devices
  // refactor to Typescript
  // prettify
  // move env variables

  // data from api
  // 0: "date"
  // 1: "energy"
  // 2: "impact-e"
  // 3: "lat"
  // 4: "lat-dir"
  // 5: "lon"
  // 6: "lon-dir"
  // 7: "alt"
  // 8: "vel"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log("response Status = ", response.status);
        if (!response.ok) {
          setHasError(true);
          setIsLoading(false);

          console.log("response not ok Status = ", response.status);
          // error => handleError(error);
          // throw Error(response.status);
        }
        const jsonData = await response.json();
        console.log("jsonData:::", jsonData);
        setData(jsonData);
        localStorage.setItem("apiData", JSON.stringify(jsonData));
        setIsLoading(false);
      } catch (error) {
        console.log("error here!", error.message);
        setIsLoading(false);
        console.log("isError = ", hasError);
        setHasError(true);
      }
    };
    fetchData();
    // const chartDom = ref.current;
    // globeChart = echarts.init(ref.current);
  }, [hasError]);

  useEffect(() => {
    data && (option = getChartOptions(data, option));
    const chartDom = ref.current;
    const globeChart = echarts.init(chartDom);

    option && globeChart.setOption(option);
    window.addEventListener("resize", globeChart.resize);

    return () => {};
  }, [data, getChartOptions, option, setData]);

  return (
    <div className="App">
      <Header style={{ width: "100vw", height: "10vh" }} />
      {isLoading && <div className="loader">Loading</div>}
      {hasError && <div className="loader">hasError!!!</div>}

      <div ref={ref} style={{ width: "100vw", height: "82vh" }}></div>
      {data && (
        <Footer>
          <ShowAirlinefilter setData={setData} />
          <ShowDistanceFilter setData={setData} />
          <ShowOnlyAirports setData={setData} />
        </Footer>
      )}

      {/* <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <p>{`returned: ${data.count} records`} .</p>
        </ErrorBoundary> */}
    </div>
  );
};

export default App;
