import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const otherPage = () => {
	return (
		<Fragment>
			In some other page!
			<Link to='/'>Go back home</Link>
		</Fragment>
	);
};

export default otherPage;
