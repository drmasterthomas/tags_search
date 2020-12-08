import { PluginInitializer } from 'kibana/public';
import {
  TagsSearchPublicPlugin,
  TagsSearchSetup,
  TagsSearchStart,
} from './plugin';
import { SecurityPluginSetup } from '../../../x-pack/plugins/security/public';


export { TagsSearchPublicPlugin as Plugin };

export const plugin: PluginInitializer<TagsSearchSetup, TagsSearchStart, SecurityPluginSetup> = () =>
  new TagsSearchPublicPlugin();