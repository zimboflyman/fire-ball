import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useErrorHandler,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

import "echarts-gl";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

import "./App.css";

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

  // todo list -
  // download assets
  // speedup rotate
  // get minimal bundle
  // initial zoom out on mobile devices
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

  // const getCometOptions = useCallback(() => {
  //   const globeData = data
  //     // ?.filter((dataItem) => dataItem[2] > 0)
  //     ?.map((dataItem) => [dataItem[3], dataItem[5], dataItem[7]]);

  //   console.log("globeData inside getChartOptions:", globeData);

  //   option = {
  //     backgroundColor: "#000",
  //     globe: {
  //       // displacementScale: 5,
  //       baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
  //       heightTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
  //       // heightTexture:
  //       //   ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",

  //       shading: "lambert",
  //       environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",
  //       light: {
  //         ambient: {
  //           intensity: 0.4,
  //         },
  //         main: {
  //           intensity: 0.4,
  //         },
  //       },
  //       // globeRadius: 100,
  //       globeOuterRadius: 300,
  //       viewControl: {
  //         maxDistance: 1500,
  //         zoomSensitivity: 5,
  //         panSensitivity: 5,
  //         autoRotate: false,
  //       },
  //     },
  //     visualMap: {
  //       max: 40,
  //       calculable: true,
  //       realtime: false,
  //       inRange: {
  //         colorLightness: [0.2, 0.9],
  //       },
  //       textStyle: {
  //         color: "#fff",
  //       },
  //       controller: {
  //         inRange: {
  //           color: "orange",
  //         },
  //       },
  //       outOfRange: {
  //         colorAlpha: 0,
  //       },
  //     },
  //     series: [
  //       {
  //         type: "bar3D",
  //         coordinateSystem: "globe",
  //         data: globeData,
  //         barSize: 1,
  //         minHeight: 0.2,
  //         silent: false,
  //         itemStyle: {
  //           color: "orange",
  //         },
  //       },
  //     ],
  //   };
  // });

  // useCallback hook - used to maintain the same memory reference through each render to prevent endless rendering—unless something in its dependency array changes
  const getChartOptions = useCallback(() => {
    function getAirportCoord(idx) {
      return [data.airports[idx][3], data.airports[idx][4]];
    }

    console.log("data inside getChartOptions:", data);

    const routes = data?.routes?.map(function (airline) {
      return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
    });
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
        },
      },
      series: {
        type: "lines3D",
        coordinateSystem: "globe",
        blendMode: "lighter",
        lineStyle: {
          width: 2,
          color: "rgb(50, 50, 150)",
          opacity: 0.1,
        },
        data: routes,
      },
    };
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
    console.log("data", data);
  }, []);

  useEffect(() => {
    data && getChartOptions();
    const chartDom = ref.current;
    const globeChart = echarts.init(chartDom);

    option && globeChart.setOption(option);
    window.addEventListener("resize", globeChart.resize);

    return () => {};
  }, [data, getChartOptions, option]);

  return (
    <div className="App">
      {isLoading && <div className="loader">Loading</div>}
      {hasError && <div className="loader">hasError!!!</div>}

      <div ref={ref} style={{ width: "100vw", height: "100vh" }} />
      {/* {data?.length > 0 && getChartOptions(data)} */}

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
