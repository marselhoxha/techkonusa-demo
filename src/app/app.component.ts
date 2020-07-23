import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from './_models';
import { UserService, AuthenticationService, LoaderService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  title = 'techkon-demo';
  timestamp = '12:00 AM';
  profileName = 'Profile';

  constructor(
    public userService: UserService,
    public router: Router,
    public authenticationService: AuthenticationService,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    // set current User profile to header
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
