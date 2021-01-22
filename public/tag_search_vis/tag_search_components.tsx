/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import { EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiFormRow } from '@elastic/eui';
import rison from 'rison-node';
import styles from './styles.css';

let allOptions = []
let arr3 = [];
let rawtags = []
const url='/slsdl/api/tag_search/get_tags'

fetch(url).then(response => response.json()).then((a) => {
	for(var w=0;w<a.body.hits.hits.length;w++){
		rawtags.push(a.body.hits.hits[w])
		if(Array.isArray(a.body.hits.hits[w]._source.tag)){
			"do nothing"
		} else {
			a.body.hits.hits[w]._source.tag = a.body.hits.hits[w]._source.tag.replace(/\s/gi,"")
			a.body.hits.hits[w]._source.tag = a.body.hits.hits[w]._source.tag.split(",")
		}
	}

	for(var s=0;s<a.body.hits.hits.length;s++){
		for(var i=0;i<a.body.hits.hits[s]._source.tag.length;i++){
			arr3.push(a.body.hits.hits[s]._source.tag[i])
		}
	}

	let uniq = [...new Set(arr3)];

	for(var i=0;i<uniq.length;i++){
		allOptions.push({
			label: uniq[i]
		})
	}
});

export class TagsSearchComponent extends React.Component {

	constructor(props) {
		super(props);

		this.options = []
		this.state = {
			selectedOptions: [],
			options: []
		};
	}

	onChange = (selectedOptions) => {
		this.setState({
			selectedOptions,
		});

		const currentURL = decodeURI(window.location.href)
		const filters = currentURL.split("?")[1].replace(/\=/g,":").replace(/\)&/g,"),")
		const risonedURL = rison.decode_object(filters)
		risonedURL["_a"].filters = []

		for(var i=0;i<selectedOptions.length;i++){
			const customFilter = {
				"$state": {
					"store": "appState"
				},
				"meta": {
					"alias": "tag",
					"disabled": false,
					"index": "4486e920-1a66-11ea-a64d-2f0bd2a2bed6",
					"key": "query",
					"negate": false,
					"type": "custom",
					"value": {
						"query": {
							"bool": {
								"should": [],
								"minimum_should_match": 1
							}
						}
					}
				},
				"query": {
					"bool": {
						"minimum_should_match": 1,
						"should": []
					}
				}
			}
			for(var j=0;j<rawtags.length;j++){
				selectedOptions.filter(a=> {
					if(rawtags[j]._source.tag.includes(a.label)){
						customFilter.meta.value.query.bool.should.push({
							"term": { [rawtags[j]._source.key]: rawtags[j]._source.value }
						})
						customFilter.query.bool.should = customFilter.meta.value.query.bool.should;
					}
				})
			}

			risonedURL["_a"].filters.push(customFilter)
		}

		risonedURL['_a'].description = {}
		delete risonedURL["_a"].panels
		delete risonedURL["_a"].options
		delete risonedURL["_a"].fullScreenMode
		delete risonedURL["_a"].title
		delete risonedURL["_a"].viewMode
		delete risonedURL["_a"].timeRestore
		var encoded = rison.encode_object(risonedURL)
		const dashboardID = currentURL.match(/dashboards#\/view\/(.*?)\?/gi)[0].split("/")[2].replace(/\?/,"")
		var result = "/slsdl/s/kt/app/dashboards#/view/" + dashboardID + "?" + encoded.replace(/\,_g:/g,"&_g=").replace(/\_a:/g,'_a=')
		window.location.replace(result)
	};

	onCreateOption = (searchValue, flattenedOptions) => {
		const normalizedSearchValue = searchValue.trim().toLowerCase();

		if (!normalizedSearchValue) {
			return;
		}

		const newOption = {
			label: searchValue,
		};

		// Create the option if it doesn't exist.
		if (flattenedOptions.findIndex(option =>
			option.label.trim().toLowerCase() === normalizedSearchValue
		) === -1) {
			this.options.push(newOption);
		}
		// Select the option.
		this.setState(prevState => ({
			selectedOptions: prevState.selectedOptions.concat(newOption),
		}));
	};

	onClick = (el) => {
		this.options = allOptions
	}

	componentWillUpdate(){
		rawtags = []
		arr3 = []
		allOptions = []

		fetch(url).then(response => response.json()).then((a) => {
			for(var w=0;w<a.body.hits.hits.length;w++){
				rawtags.push(a.body.hits.hits[w])
				if(Array.isArray(a.body.hits.hits[w]._source.tag)){
					"do nothing"
				} else {
					a.body.hits.hits[w]._source.tag = a.body.hits.hits[w]._source.tag.replace(/\s/gi,"")
					a.body.hits.hits[w]._source.tag = a.body.hits.hits[w]._source.tag.split(",")
				}
			}

			for(var s=0;s<a.body.hits.hits.length;s++){
				for(var i=0;i<a.body.hits.hits[s]._source.tag.length;i++){
					arr3.push(a.body.hits.hits[s]._source.tag[i])
				}
			}

			let uniq = [...new Set(arr3)];

			for(var i=0;i<uniq.length;i++){
				allOptions.push({
					label: uniq[i]
				})
			}
		});
		this.options = allOptions
		this.props.renderComplete()
	}
	componentDidMount() {
		this.options = allOptions
		this.props.renderComplete()
	}
	
	componentDidUpdate(prevProps , prevState) {
    this.props.renderComplete();
  }

	componentWillReceiveProps(nextProps){
    this.props.renderComplete();
  }
	
	render() {
		const { selectedOptions } = this.state;

		return (
			<EuiFlexGroup className="tagSearch" style={{maxWidth:"310px", maxHeight: "98px"}}>
					<EuiFlexItem>
						<EuiFormRow label="Поиск по тегу" style={{marginTop: "8px"}}>
								<EuiComboBox
							placeholder="Select..."
							options={this.options}
							selectedOptions={selectedOptions}
							isClearable={true}
							onChange={this.onChange}
							onCreateOption={this.onCreateOption}
							onClick={this.onClick}
							/>
							</EuiFormRow>
					</EuiFlexItem>
			</EuiFlexGroup>
	);
	}
}
