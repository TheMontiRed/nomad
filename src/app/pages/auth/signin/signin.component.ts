import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoading: boolean = false;
  user: any;
  errorMessage:string = "";

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
