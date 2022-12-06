//
import db from './dataSource';
import { User } from './entities/User';

export default {
  user: db.getRepository(User),
};
