/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MediaPlayerImageOnly from "./MediaPlayerImageOnly";

const passProps = {
  defaultOpened: 0,
  size: "sm",
  items: [
    "https://demos.creative-tim.com/notus-pro-react/static/media/sofia-kuniakina.d748127a.jpg",
    "https://demos.creative-tim.com/notus-pro-react/static/media/sacha-styles.b70fcf79.jpg",
    "https://demos.creative-tim.com/notus-pro-react/static/media/victor-garcia.517e6e46.jpg",
    "https://demos.creative-tim.com/notus-pro-react/static/media/doyoun-seo.626bcf05.jpg",
    "https://demos.creative-tim.com/notus-pro-react/static/media/ayo-ogunseinde.171c7cb2.jpg",
  ],
};

const props = `MediaPlayerImageOnly.defaultProps = {
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
};`;
const description = "";

const preview = `import React from "react";

// @notus-pro/react
import MediaPlayerImageOnly from "@notus-pro/react/MediaPlayerImageOnly";

const props = ${JSON.stringify(passProps)}

export default function Example() {
  return (
    <>
      <MediaPlayerImageOnly {...props} />
    </>
  );
}`;

const docsObjects: any = {
  component: MediaPlayerImageOnly,
  componentName: "MediaPlayerImageOnly",
  description,
  props,
  preview,
  passProps,
};
export default docsObjects;
