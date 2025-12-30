import { inject, Injectable } from "@angular/core";
import { AuthEndPoints, HttpService } from "../api";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthRepository {
    private http = inject(HttpService);

    login(payload: {username: string, password: string}): Observable<string> {
        return this.http.post(AuthEndPoints.Login.url(), payload)
        .pipe(map((res: any) => res.token));
    }
}