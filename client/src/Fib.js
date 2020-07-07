import React, { Component, Fragment } from 'react';
import axios from 'axios';

export class Fib extends Component {
	state = {
		seenIndexes: [],
		values: {},
		index: '',
	};

	componentDidMount() {
		this.fetchValues();
		this.fetchIndexes();
	}

	async fetchValues() {
		const values = await axios.get('/api/values/current');
		this.setState({ values: values.data });
	}

	async fetchIndexes() {
		const seenIndexes = await axios.get('/api/values/all');
		this.setState({ seenIndexes: seenIndexes.data });
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		await axios.post('/api/values', {
			index: this.state.index,
		});
		this.setState({ index: '' });
	};

	renderSeenIndexes() {
		return this.state.seenIndexes.map(({ number }) => number.join(', '));
	}

	renderValues() {
		const entries = [];
		const { values } = this.state;
		for (const key in values) {
			if (values.hasOwnProperty(key)) {
				entries.push(
					<div key={key}>
						For index {key} I calculated {values[key]}
					</div>
				);
			}
		}
	}

	render() {
		const { index } = this.state;

		return (
			<Fragment>
				<form onSubmit={this.handleSubmit}>
					<label>Enter your index:</label>
					<input value={index} onChange={(event) => this.setState({ index: event.target.value })} />
					<button type='submit'>Submit</button>
				</form>

				<h3>Indexes I have seen:</h3>
				{this.renderSeenIndexes()}

				<h3>Calculated Values:</h3>
				{this.renderValues()}
			</Fragment>
		);
	}
}

export default Fib;
