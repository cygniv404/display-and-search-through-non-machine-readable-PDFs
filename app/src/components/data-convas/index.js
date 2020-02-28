import React, { useEffect, useRef, useState } from "react";
import ImageMapper from "react-image-mapper";

function DataCanvas({ image, mapAreas }) {
  const imageMapper = useRef(null);
  const [query, setQuery] = useState(1);
  // user feedback on area hover
  // const getTipPosition = area => {
  //   const obj = { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  // };

  useEffect(() => {
    setQuery(Math.random());
  }, [mapAreas]);

  return (
    <>
      <ImageMapper
        ref={imageMapper}
        src={image}
        //onClick={area => getTipPosition(area)}
        map={mapAreas}
        width={800}
        imgWidth={2481}
      />
    </>
  );
}

export default DataCanvas;
