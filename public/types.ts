import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface TagsSearchPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagsSearchPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
