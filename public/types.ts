import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { DataPublicPluginStart } from '../../../src/plugins/data/public';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';

export interface TagsSearchPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagsSearchPluginStart {
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
}

export interface AppPluginStartDependencies {
  visualizations: VisualizationsSetup;
}
