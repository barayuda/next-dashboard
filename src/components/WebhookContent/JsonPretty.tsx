/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

interface JsonPrettyProps {
  jsonStr: string;
}
function JsonPretty(props: JsonPrettyProps) {
  const { jsonStr } = props;
  let jsonString = "";
  if (jsonStr === undefined) {
    jsonString = "{}";
  } else {
    jsonString = jsonStr;
  }
  const jsonObj = JSON.parse(jsonString);
  const json = JSON.stringify(jsonObj, null, 4);

  return (
    <pre>
      <code className="text-light">{json}</code>
    </pre>
  );
}

export default JsonPretty;
