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
// import ShowFireBalls from "./components/ShowFireBalls";

const App = () => {
  // get the api data from https://ssd-api.jpl.nasa.gov/doc/fireball.html
  // const apiUrl = "https://ssd-api.jpl.nasa.gov/fireball.api";
  // const apiUrl =
  //   "https://echarts.apache.org/examples/data-gl/asset/data/population.json";
  // const apiUrl =
  //   "https://echarts.apache.org/examples/data-gl/asset/data/flights.json";

  // const handleError = useErrorHandler();
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState();
  const [series, setSeries] = useState("airlines");
  const [apiUrl, setApiUrl] = useState([
    "https://echarts.apache.org/examples/data-gl/asset/data/flights.json",
    1,
  ]);

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

  // todo list //////////////////////////////////////////////////
  // ** need to run before start:
  // ** - open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
  // fix muddle up between American Airlines and EasyJet
  // download assets
  // refactor to Typescript
  // prettify
  // move env variables
  // add react-testing-lib tests
  // initial zoom out on mobile devices
  // get minimal bundle for charts
  /////////////////////////////////////////////////////////////////
  // data from  nasa api
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
        const response = await fetch(apiUrl[0]);
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
        if (apiUrl[1] === 0) {
          localStorage.setItem("apiDataNasa", JSON.stringify(jsonData));
        } else {
          localStorage.setItem("apiData", JSON.stringify(jsonData));
        }
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
  }, [apiUrl, setApiUrl, hasError]);

  useEffect(() => {
    data && (option = getChartOptions(data, series));
    const chartDom = ref.current;
    const globeChart = echarts.init(chartDom);

    option && globeChart.setOption(option);
    window.addEventListener("resize", globeChart.resize);

    return () => {};
  }, [data, getChartOptions, option, setData, setSeries, series]);

  return (
    <div className="App">
      <Header
        setApiUrl={setApiUrl}
        setSeries={setSeries}
        style={{ width: "100vw", height: "10vh" }}
      />
      {isLoading && <div className="loader">Loading</div>}
      {hasError && <div className="loader">hasError!!!</div>}

      <div ref={ref} style={{ width: "100vw", height: "82vh" }}></div>
      {data && (
        <Footer>
          {apiUrl[1] === 1 ? (
            <>
              <ShowAirlinefilter setData={setData} setSeries={setSeries} />
              <ShowDistanceFilter setData={setData} setSeries={setSeries} />
              <ShowOnlyAirports setData={setData} setSeries={setSeries} />
            </>
          ) : (
            ""
          )}
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
