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

import React, { Component, useEffect, useState } from 'react';
import { EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiFormRow } from '@elastic/eui';
import rison from 'rison-node';
import {
	DataPublicPluginStart,
} from '../../../../src/plugins/data/public';

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

const optionsStatic = [
	{
		label: 'Titan',
		'data-test-subj': 'titanOption',
	},
	{
		label: 'Enceladus is disabled',
		disabled: true,
	},
	{
		label: 'Mimas',
	},
	{
		label: 'Dione',
	},
	{
		label: 'Iapetus',
	},
	{
		label: 'Phoebe',
	},
	{
		label: 'Rhea',
	},
	{
		label:
			"Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
	},
	{
		label: 'Tethys',
	},
	{
		label: 'Hyperion',
	},
];

interface TagsSearchComponentDeps {
	renderComplete: () => {};
	visParams: {
		counter: number;
	};
	data: DataPublicPluginStart
}

export const TagsSearchComponent = (props: TagsSearchComponentDeps) => {


	useEffect(() => {
		props.renderComplete();
	});

	const [options, setOptions] = useState(optionsStatic);
	const [selectedOptions, setSelected] = useState([options[2], options[4]]);

	const onChange = (selectedOptions) => {
		setSelected(selectedOptions);
		console.log("FILTERS:: ", props.data.query.filterManager.getFilters())
	};

	const onCreateOption = (searchValue, flattenedOptions = []) => {
		const normalizedSearchValue = searchValue.trim().toLowerCase();

		if (!normalizedSearchValue) {
			return;
		}

		const newOption = {
			label: searchValue,
		};

		// Create the option if it doesn't exist.
		if (
			flattenedOptions.findIndex(
				(option) => option.label.trim().toLowerCase() === normalizedSearchValue
			) === -1
		) {
			setOptions([...options, newOption]);
		}

		// Select the option.
		setSelected([...selectedOptions, newOption]);
	};

	return (
		/* DisplayToggles wrapper for Docs only */
			<EuiComboBox
				placeholder="Select or create options"
				options={options}
				selectedOptions={selectedOptions}
				onChange={onChange}
				onCreateOption={onCreateOption}
				isClearable={true}
				data-test-subj="demoComboBox"
			/>
	);
};