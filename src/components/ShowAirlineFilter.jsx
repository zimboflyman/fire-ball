import Dropdown from "react-bootstrap/Dropdown";
import { StyledDropDownBtn } from "./Toolkit";

export const ShowAirlinefilter = ({ setData }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));
  const { airlines } = apiData;

  // filter apiData by airline and setData to trigger a new render
  const airlineFilter = (index) => {
    const routeData = apiData?.routes?.filter(
      (airportId) => airportId[0] === index + 1
    );
    console.log("routeData", routeData);

    apiData.routes.length = 0;
    apiData.routes.push.apply(apiData.routes, routeData);

    setData(apiData);
  };

  return (
    <div>
      <Dropdown>
        <StyledDropDownBtn variant="success" id="dropdown-basic">
          Select airline
        </StyledDropDownBtn>
        <Dropdown.Menu>
          {airlines.map((arr, index) => (
            <Dropdown.Item key={arr[0]} onClick={() => airlineFilter(index)}>
              {arr[0]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ShowAirlinefilter;
