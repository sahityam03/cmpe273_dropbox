import { combineReducers } from 'redux';

import { data} from './reducer1';
import { files } from './reducer2';
//import { users } from './users.reducer';
//import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  data,
  files
});

export default rootReducer;