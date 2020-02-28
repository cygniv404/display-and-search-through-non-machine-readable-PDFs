import React from "react";

const DataTable = ({ data, handelToken }) => {
  return (
    <div className="text-field w-100 ">
      {data.map(({ text, token_id }) => (
        <div
          className="text w-100 pa2"
          key={token_id}
          id={token_id}
          onMouseEnter={handelToken}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default DataTable;
