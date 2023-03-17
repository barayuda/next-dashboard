/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

interface GlobalFilterProps {
  filter?: any;
  setFilter?: any;
}

function GlobalFilter(props: Partial<GlobalFilterProps>) {
  const { filter, setFilter } = props;
  return (
    <div>
      <input
        type="text"
        className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white bg-white px-3 py-3 pl-10 text-sm shadow outline-none focus:outline-none focus:ring"
        placeholder="Search"
        aria-label="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFilter;
