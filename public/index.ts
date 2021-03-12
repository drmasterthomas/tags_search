import { PluginInitializer } from 'kibana/public';
import {
  TagsSearchPublicPlugin,
  TagsSearchSetup,
  TagsSearchStart,
} from './plugin';


export { TagsSearchPublicPlugin as Plugin };

export const plugin: PluginInitializer<TagsSearchSetup, TagsSearchStart> = () =>
  new TagsSearchPublicPlugin();