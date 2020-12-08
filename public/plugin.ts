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
import { TagSearchEditor } from './tag_search_vis/tag_search_editor';
import { TagSearchComponent } from './tag_search_vis/tag_search_components';

interface SetupDependencies {
  visualizations: VisualizationsSetup;
}

export class TagSearchPublicPlugin
  implements Plugin<TagSearchSetup, TagSearchStart> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies) {
    setupDeps.visualizations.createReactVisualization({
      name: 'tag_search_vis',
      title: 'Tag Search Vis SLSDL',
      icon: 'tableDensityExpanded',
      description:
        'Tag Search visualization SLSDL',
      visConfig: {
        component: TagSearchComponent,
        defaults: {
          counter: 0,
        },
      },
      editorConfig: {
        optionTabs: [
          {
            name: 'options',
            title: 'Options',
            editor: TagSearchEditor,
          },
        ],
      },
      requestHandler: 'none',
    });
  }

  public start() {}
  public stop() {}
}

export type TagSearchSetup = ReturnType<TagSearchPublicPlugin['setup']>;
export type TagSearchStart = ReturnType<TagSearchPublicPlugin['start']>;


