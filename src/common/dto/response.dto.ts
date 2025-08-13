import { MultiLanguageMessageDto } from './multi-language-message.dto';
import { PaginationDto } from './pagination.dto';

export class ResponseDto<T> {
  constructor(
    readonly code: string,
    readonly message: MultiLanguageMessageDto | string,
    readonly data?: T,
    readonly pagination?: PaginationDto,
  ) {}
}
