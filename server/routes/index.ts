import { IRouter } from '../../../../src/core/server';
import {GLOBAL_VARIABLES} from "../../../incidents_review/server/routes/global_variables"; //импорт глобальнных переменных

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/tag_search/get_tags',
      validate: false,
    },
    async (context, request, response) => {
			const res = await context.core.elasticsearch.client.asCurrentUser.search({
				'index': GLOBAL_VARIABLES.TAGS_ALIAS,
				'q':'_id:*',
        'size':'10000'
			})
			console.log(res)
      return response.ok({
        body: res
      });
    }
  );
}
