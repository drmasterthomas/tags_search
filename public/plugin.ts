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
import { CoreSetup, Plugin } from 'kibana/public';
import { VisualizationsSetup } from '../../../../../src/plugins/visualizations/public';
import { TagsSearchEditor } from './tag_search_vis/tag_search_editor';
import { TagsSearchComponent } from './tag_search_vis/tag_search_components';

interface SetupDependencies {
  visualizations: VisualizationsSetup;
}

export class TagsSearchPublicPlugin
  implements Plugin<TagsSearchSetup, TagsSearchStart> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies) {
    setupDeps.visualizations.createReactVisualization({
      name: 'tag_search_vis',
      title: 'Tag Search Vis SLSDL',
      icon: 'tableDensityExpanded',
      description:
        'Tag Search visualization SLSDL',
      visConfig: {
        component: TagsSearchComponent,
        defaults: {
          counter: 0,
        },
      },
      editorConfig: {
        optionTabs: [
          {
            name: 'options',
            title: 'Options',
            editor: TagsSearchEditor,
          },
        ],
      },
      requestHandler: 'none',
    });
  }

  public start() {}
  public stop() {}
}

export type TagsSearchSetup = ReturnType<TagsSearchPublicPlugin['setup']>;
export type TagsSearchStart = ReturnType<TagsSearchPublicPlugin['start']>;


