import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  // useErrorHandler,
} from "react";
// import { ErrorBoundary } from "react-error-boundary";

import "echarts-gl";
// import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

import "./App.css";

import { getRoutes, getAirports } from "./utils/dataUtils";
import Header from "./components/header";
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

  const ROOT_PATH = "https://echarts.apache.org/examples";

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

  // useCallback hook - used to maintain the same memory reference through each render to prevent endless rendering—unless something in its dependency array changes
  const getChartOptions = useCallback(() => {
    const routes = getRoutes(data);
    console.log("ROUTES::", routes);

    const airports = getAirports(data);
    console.log("airports:::", airports);

    const airportSeries = {
      type: "scatter3D",
      coordinateSystem: "globe",
      // blendMode: "lighter",
      symbolSize: 4,
      itemStyle: {
        color: "rgb(50, 50, 150)",
        opacity: 0.9,
      },
      data: airports,
    };

    const flightSeries = {
      type: "lines3D",
      coordinateSystem: "globe",
      effect: {
        show: true,
        trailWidth: 1,
        trailOpacity: 0.7,
        trailLength: 0.2,
        constantSpeed: 5,
      },
      blendMode: "lighter",
      lineStyle: {
        width: 2,
        color: "rgb(61, 190, 255)",
        //purple - rgb(73,15,239)
        //blue - rgb(61, 190, 255)
        //pink - rgb(255, 156, 181)
        //green - rgb(130, 240, 46)
        opacity: 0.1,
      },
      data: routes,
    };

    option = {
      backgroundColor: "#000",
      globe: {
        baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
        heightTexture:
          ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",
        shading: "lambert",
        light: {
          ambient: {
            intensity: 0.4,
          },
          main: {
            intensity: 0.4,
          },
        },
        viewControl: {
          maxDistance: 1000,
          zoomSensitivity: 5,
          panSensitivity: 5,
          autoRotate: false,
          damping: 0.85,
          rotateSensitivity: 2,
        },
      },
    };

    option.series = flightSeries;

    // const chartDom = ref.current;
    // const globeChart = echarts.init(chartDom);

    // option && globeChart.setOption(option);
  });

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
    data && getChartOptions();
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

      <div ref={ref} style={{ width: "100vw", height: "85vh" }}></div>
      {data && (
        <div
          class="d-flex justify-content-around"
          style={{ width: "100vw", height: "5vh" }}
        >
          <ShowAirlinefilter setData={setData} />
          <ShowDistanceFilter setData={setData} />
          <ShowOnlyAirports setData={setData} />
        </div>
      )}

      {/* <ReactEcharts option={option} /> */}
      {/* <header className="App-header">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <p>{`returned: ${data.count} records`} .</p>
        </ErrorBoundary>
      </header> */}
    </div>
  );
};

export default App;
