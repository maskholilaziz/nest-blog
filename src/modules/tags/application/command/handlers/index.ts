import { CreateTagHandler } from './create-tag.handler';
import { UpdateTagHandler } from './update-tag.handler';
import { DeleteTagHandler } from './delete-tag.handler';

export const CommandHandlers = [
  CreateTagHandler,
  UpdateTagHandler,
  DeleteTagHandler,
];
