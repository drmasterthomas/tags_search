import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { TagSearchPluginSetup, TagSearchPluginStart } from './types';
import { defineRoutes } from './routes';

export class TagSearchPlugin
  implements Plugin<TagSearchPluginSetup, TagSearchPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('TagSearch: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('TagSearch: Started');
    return {};
  }

  public stop() {}
}
