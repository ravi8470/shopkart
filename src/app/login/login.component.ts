import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { isEmailUniqueValidator } from '../helpers/asyncValidators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSubmitted = false;
  signupForm: FormGroup;
  signupFormSubmitted = false;
  asv = false;
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
    this.signupForm = new FormGroup({
      // name: ['', Validators.compose([Validators.required, Validators.pattern(`^[a-z ,.'-]+$`)])],
      name: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [isEmailUniqueValidator(this.authService)],
      }),
      password: new FormControl('', Validators.required)
    })
    this.signupForm.statusChanges.subscribe(x => {
      console.log(x);
      if (x === 'PENDING') {
        this.asv = true;
      }
      if (x === 'INVALID') {
        this.asv = false;
      }
    })
    // this._snackBar.open('sdkljflkfj', null, {
    //   verticalPosition: 'top',
    //   duration: 5000
    // })
  }

  get f() { return this.loginForm.controls; }

  get fs() { return this.signupForm.controls; }

  get asyncValidationOngoing() {
    if (this.signupForm.status === 'PENDING') {
      return true;
    }
    return false;
  }

  isEmailUnique(control: AbstractControl) {
    console.log(control.value);
    return this.authService.isEmailUnique(control.value).subscribe(res => {
      console.log(res);
      // return res ? null : { emailTaken: true }
      return res ? { emailTaken: true } : null;
    })
  }

  onLoginSubmit() {
    console.log(this.loginForm);
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((x: any) => {
      this.dialogRef.close();
      if (x === 'Unauthorized') {
        this._snackBar.open('Invalid Credentials!!!', null, {
          duration: 2500,
          verticalPosition: 'top'
        })
      }
      if (x.token) {
        localStorage.setItem('token', x.token);
        this._snackBar.open('Logged In Successfully', null, {
          duration: 2500,
          verticalPosition: 'top'
        })
      }
    });
  }

  onSignupSubmit() {
    console.log(this.signupForm);
    this.signupFormSubmitted = true;
    if (this.signupForm.invalid || this.signupForm.status === 'PENDING') {
      return;
    }
    this.dialogRef.close();
    this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe(x => {
      if (x._id) {
        this._snackBar.open('Signed Up Successfully, Login to Continue', null, {
          duration: 3000
        })
      }
      else {
        this._snackBar.open('Error in signing up!', null, {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    });
  }

}
