import dataSource from './dataSource';
import User from './entities/User';

export default {
  user: dataSource.getRepository(User),
};
