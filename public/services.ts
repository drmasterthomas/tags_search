import { createGetterSetter } from '../../../../src/plugins/kibana_utils/public';


export const [getData, setData] = createGetterSetter<any>(
    'Data'
  );