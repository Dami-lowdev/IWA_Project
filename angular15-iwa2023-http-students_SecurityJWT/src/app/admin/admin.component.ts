import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board?: string;
  errorMessage?: string;
  constructor(private userService: UserService,
              private router: Router,
  private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.userService.getAdminPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.href = '/home';
  }


}
