import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IUser } from './user.model';
import { SAMPLE_USERS } from './sample-users';

const parseUser = ({
  guid,
  isActive,
  balance,
  age,
  eyeColor,
  name,
  gender,
  company,
  email,
  phone,
  address,
}: any): IUser => ({
  guid,
  isActive,
  balance,
  age,
  eyeColor,
  name,
  gender,
  company,
  email,
  phone,
  address,
});

@Injectable({ providedIn: 'root' })
export class UserService {
  fetch$ = (): Observable<IUser[]> =>
    of(SAMPLE_USERS).pipe(
      // simulate network delay
      delay(1000),
      map((array: any[]) => array.map(item => parseUser(item)))
    );
}
