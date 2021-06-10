import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient, private user: UserService) {}

  getPersons(): Observable<any> {
    return this.http.get(`${environment.backend}/api/people`, this.getHeader());
  }
  addPerson(data: any): Observable<any> {
    return this.http.post(
      `${environment.backend}/api/person/add`,
      data,
      this.getHeader()
    );
  }
  updatePerson(id: number, data: any) {
    return this.http.patch(
      `${environment.backend}/api/person/${id}/update`,
      data,
      this.getHeader()
    );
  }

  deletePerson(id: number) {
    return this.http.delete(
      `${environment.backend}/api/person/${id}/delete`,
      this.getHeader()
    );
  }
  getHeader() {
    return {
      headers: { Authorization: `Bearer ${this.user.getJwt()}` },
    };
  }
}
