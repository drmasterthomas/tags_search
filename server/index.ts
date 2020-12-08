import { PluginInitializerContext } from '../../../src/core/server';
import { TagsSearchPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new TagsSearchPlugin(initializerContext);
}

export { TagsSearchPluginSetup, TagsSearchPluginStart } from './types';
