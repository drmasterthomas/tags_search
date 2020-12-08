import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface TagSearchPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagSearchPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
