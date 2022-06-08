import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PensionDetail } from '../models/pension-detail';
import { PensionerInput } from '../models/pensioner-input';
import { ProcessPensionInput } from '../models/process-pension-input';
import { ProcessPensionResponse } from '../models/process-pension-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessPensionService {

  // add your base URL here
  baseUrl: string = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  // Method to get pension details
  getPensionDetails(processPensionInput: ProcessPensionInput): Observable<PensionDetail> {
    return this.http.post<PensionDetail>(`${this.baseUrl}/processPension`, processPensionInput);
  }

}

