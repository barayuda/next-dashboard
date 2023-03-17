/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ChangeEvent, MouseEventHandler } from "react";
import PropTypes from "prop-types";

import Button from "../../components/Elements/Button.js";

interface MediaPlayerProps {
  items: any;
  defaultOpened: any;
  size: any;
}
type commonOptions = {
  [key: string]: string;
};

export default function MediaPlayerImageOnly(props: MediaPlayerProps) {
  const { items, defaultOpened, size } = props;
  const [open, setOpen] = React.useState(defaultOpened);
  const [oldInTransition, setOldInTransition] = React.useState(false);
  const [newInTransition, setNewInTransition] = React.useState(false);
  const toggleNew = (e: any, newOpen: any) => {
    e.preventDefault();
    if (!newInTransition && !oldInTransition) {
      setOldInTransition(true);
      setTimeout(function () {
        setOpen(newOpen);
      }, 500);
      setTimeout(function () {
        setOldInTransition(false);
        setNewInTransition(true);
      }, 600);
      setTimeout(function () {
        setNewInTransition(false);
      }, 1100);
    }
  };
  const imgClasses: commonOptions = {
    sm: "w-450-px",
    lg: "w-850-px",
    regular: "w-650-px",
  };
  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        {items.map((prop: any, key: any) => {
          return (
            <div
              className={
                "mx-auto w-full transform transition-all duration-500 ease-in-out " +
                {
                  hidden: key !== open,
                  block: key === open,
                  "scale-95 opacity-0": key === open && oldInTransition,
                  "scale-100 opacity-100": key === open && newInTransition,
                }
              }
              key={key}
            >
              <img
                alt="..."
                src={prop}
                className={
                  "mx-auto h-auto rounded-lg shadow-xl " + imgClasses[size]
                }
              />
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          color="white"
          onClick={(e) =>
            toggleNew(e, open - 1 < 0 ? items.length - 1 : open - 1)
          }
        >
          <i className="fas fa-chevron-left"></i>
        </Button>
        <Button
          color="white"
          onClick={(e) =>
            toggleNew(e, open + 1 > items.length - 1 ? 0 : open + 1)
          }
        >
          <i className="fas fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}

MediaPlayerImageOnly.defaultProps = {
  defaultOpened: 0,
  items: [],
  size: "regular",
};

MediaPlayerImageOnly.propTypes = {
  // 0 represents the first element
  // also, you should note that
  // the number should not be lower then 0
  // or higher than the number of items - 1
  defaultOpened: PropTypes.number,
  // an array of string representing valid image sources
  items: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(["sm", "regular", "lg"]),
};
