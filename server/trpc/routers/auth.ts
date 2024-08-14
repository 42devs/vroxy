import * as AuthModel from '~/server/models/auth';

import { router } from '~/server/trpc/trpc';

export const authRouter = router({
  ...AuthModel,
});
