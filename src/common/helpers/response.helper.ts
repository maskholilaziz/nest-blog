import { ResponseDto } from '../dto/response.dto';
import { MultiLanguageMessageDto } from '../dto/multi-language-message.dto';
import { PaginationDto } from '../dto/pagination.dto';

export class ResponseHelper {
  private static CODE_SUCCESS = '01';
  private static CODE_FAILED = '02';

  static success = <T>(
    message: MultiLanguageMessageDto | string,
    data?: T,
    pagination?: PaginationDto,
  ) => {
    return new ResponseDto<T>(
      ResponseHelper.CODE_SUCCESS,
      message,
      data,
      pagination,
    );
  };

  static failed = <T>(
    message: MultiLanguageMessageDto | string,
    data?: T,
    pagination?: PaginationDto,
  ) => {
    return new ResponseDto<T>(
      ResponseHelper.CODE_FAILED,
      message,
      data,
      pagination,
    );
  };
}
