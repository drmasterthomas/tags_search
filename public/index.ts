import { PluginInitializer } from 'kibana/public';
import {
  TagSearchPublicPlugin,
  TagSearchSetup,
  TagSearchStart,
} from './plugin';
import { SecurityPluginSetup } from '../../../x-pack/plugins/security/public';


export { TagSearchPublicPlugin as Plugin };

export const plugin: PluginInitializer<TagSearchSetup, TagSearchStart, SecurityPluginSetup> = () =>
  new TagSearchPublicPlugin();