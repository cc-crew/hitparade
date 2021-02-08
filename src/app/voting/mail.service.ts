import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

class ApiResponseModel {
  status: number | undefined;
  message: string | undefined;
}

class MailBodyModel {
  email: string | undefined;
  title1: string | undefined;
  interpret1: string | undefined;
  title2: string| undefined;
  interpret2: string| undefined;
  title3: string| undefined;
  interpret3: string| undefined;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  public sendVoting(body: MailBodyModel): Observable<ApiResponseModel> {
    const url = 'https://guarded-sierra-65340.herokuapp.com/mail';
    return this.httpClient.post<ApiResponseModel>(url, body);
  }
}
