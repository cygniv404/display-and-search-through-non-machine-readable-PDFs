import React, { useEffect, useState } from "react";
import DataTable from "../../components/data-table";
import DataCanvas from "../../components/data-convas";
import { useFetchImage } from "../../components/utils/fetch-image-data";
import Search from "../../components/search-container";

function SinglePage({ match,parentQuery }) {
  const {
    params: { imageId }
  } = match;
  const defaultFillColor = "rgba(0,0,0,0.01)";
  const defaultStrokeColor = "rgba(0,255,0,1)";
  const selectedFillColor = "rgba(0,0,0,0.08)";
  const selectedStrokeColor = "rgba(255,0,0,1)";
  const shape = "rect";
  const [data, setData] = useState([]);
  const [image, loadingImage] = useFetchImage(imageId);
  const [mapAreas, setMapAreas] = useState({
    name: "my-map",
    areas: [
      {
        id: 0,
        shape: shape,
        coords: [0, 0, 0, 0],
        preFillColor: defaultFillColor,
        strokeColor: defaultStrokeColor
      }
    ]
  });
  const updateMapArea = (id, coords) => {
    const areas = mapAreas.areas.map(item =>
      item.id === id
        ? {
            ...item,
            preFillColor: selectedFillColor,
            strokeColor: selectedStrokeColor
          }
        : {
            ...item,
            preFillColor: defaultFillColor,
            strokeColor: defaultStrokeColor
          }
    );
    setMapAreas({
      name: mapAreas.name,
      areas
    });
  };
  const addMapArea = data => {
    let areas = [];
    data.map(({ token_id, x1, y1, x2, y2 }) =>
      areas.push({
        id: token_id,
        shape,
        coords: [x1, y1, x2, y2],
        preFillColor: defaultFillColor,
        strokeColor: defaultStrokeColor
      })
    );
    setMapAreas({
      name: mapAreas.name,
      areas
    });
  };
  const handelToken = event => {
    const presentID = event.target.id;
    const presentShape = data.filter(({ token_id }) => token_id === presentID);
    const [{ x1, x2, y1, y2 }] = presentShape;
    updateMapArea(
      presentID,
      [x1, y1, x2, y2],
      selectedStrokeColor,
      selectedFillColor
    );
  };
  const handelFetchedData = fd => {
    setData(fd);
  };
  useEffect(() => {
    addMapArea(data);
  }, [data]);
  return (
    <div className="container flex w-100">
      <nav className="gn-menu-wrapper w-30 flex flex-wrap">
        <Search imageID={imageId} parentQuery={parentQuery} handelFetchedData={handelFetchedData} />
        <DataTable data={data} handelToken={handelToken} />
      </nav>
      <header className="flex w-70 pa2 justify-center items-center">
        {loadingImage ? (
          <div>loading</div>
        ) : (
          <DataCanvas image={image} mapAreas={mapAreas} />
        )}
      </header>
    </div>
  );
}

export default SinglePage;
