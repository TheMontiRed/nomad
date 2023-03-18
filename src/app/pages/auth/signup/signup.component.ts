import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;
  user: any;
  errorMessage:string = "";

  constructor(public authService: AuthService) { }
  ngOnInit(): void {

  }
}
