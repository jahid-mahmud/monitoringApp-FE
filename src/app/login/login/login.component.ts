import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:gapi.auth2.GoogleUser
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.service.observable().subscribe((user) => {
      this.user=user
    })
  }

  signIn() {
    this.service.signIn().then((res) => {
       this.router.navigate(['/home'])
    })
  }

}
