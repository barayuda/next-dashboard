import React from 'react';

interface JsonPrettyProps {
	jsonStr: string;
}
function JsonPretty(props: JsonPrettyProps) {
	const { jsonStr } = props;
	if (jsonStr === undefined) {
		var jsonString = '{}';
	} else {
		var jsonString = jsonStr;
	}
	var jsonObj = JSON.parse(jsonString);
	var json = JSON.stringify(jsonObj, null, 4);

	return (
		<pre>
			<code className="text-light">{json}</code>
		</pre>
	);
}

export default JsonPretty;
