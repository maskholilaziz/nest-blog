import { CreatePasswordRequestDto } from '../dto/create-password.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../../../../common/dto/response.dto';

export interface CredentialClientInterface {
  CreatePassword: (request: CreatePasswordRequestDto) => Observable<ResponseDto<any>>
}