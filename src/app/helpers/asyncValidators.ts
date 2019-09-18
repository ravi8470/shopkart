import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const isEmailUniqueValidator = (authService: AuthService, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => authService.isEmailUnique(input.value)),
      map((res: any) => {
        return res.result ? null : { isEmailUnique: true };
      })
    );
  };
};
