import React, { useEffect, useState } from "react";

function SearchInImage({ handelFetchedImages }) {
  const [query, setQuery] = useState("");

  const handelInputChange = e => {
    setQuery(e.target.value);
  };
  const [trefferData, setTrefferData] = useState([]);
  const getInfo = async () => {
    const fetchedData = await fetch("/data?query=" + query);
    const fetchedDataJson = await fetchedData.json();
    setTrefferData(fetchedDataJson);

  };
  const handelSearch = e => {
    e.preventDefault();
    getInfo();
  };
  useEffect(() => {
    handelFetchedImages([trefferData,query]);
  }, [trefferData]);
  return (
    <div className="wrap">
      <form className="search" onSubmit={handelSearch}>
        <input
          type="text"
          className="searchTerm"
          placeholder="search in all documents?"
          onChange={handelInputChange}
        />
        <input type="submit" value="search" />
      </form>
    </div>
  );
}

export default SearchInImage;
