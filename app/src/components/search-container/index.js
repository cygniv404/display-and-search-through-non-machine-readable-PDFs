import React, { useEffect, useState } from "react";

function Search({ imageID, parentQuery, handelFetchedData }) {
  const [treffer, setTreffer] = useState(parentQuery.toString());
  const handelInputChange = e => {
    setTreffer(e.target.value);
  };
  const [trefferData, setTrefferData] = useState([]);
  const getInfo = async () => {
    const fetchedData = await fetch("/data/" + imageID);
    const fetchedDataJson = await fetchedData.json();
    let filteredData = fetchedDataJson.filter(({ text }) => {
      const tokenText = text.toLowerCase();
      return tokenText.indexOf(treffer.toLowerCase()) !== -1;
    });
    if (treffer.length > 0) {
      filteredData.length > 0
        ? setTrefferData(filteredData)
        : setTrefferData([]);
    } else {
      setTrefferData(fetchedDataJson);
    }
  };
  const handelSearch = e => {
    e.preventDefault();
    getInfo();
  };
  useEffect(() => {
    if (parentQuery.length > 0) setTreffer(parentQuery);
    handelFetchedData(trefferData);
  }, [trefferData]);
  return (
    <div className="wrap">
      <form className="search" onSubmit={handelSearch}>
        <input
          type="text"
          className="searchTerm"
          placeholder="What are you looking for?"
          onChange={handelInputChange}
          defaultValue={parentQuery}
        />
        <input type="submit" value="search" />
      </form>
    </div>
  );
}

export default Search;
