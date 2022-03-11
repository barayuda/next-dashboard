import React from 'react';

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
				className="form-control"
				placeholder="Search"
				aria-label="Search"
				value={filter || ''}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</div>
	);
}

export default GlobalFilter;
