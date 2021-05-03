import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
          transform: 'translate3d(0,0,0)',
          display : 'block'
      }),
        ),
      state('false', style({
        transform: 'translate3d(-250px, 0, 0)',
        display: 'none'
      })),
      transition('true <=> false', animate('400ms ease-in-out'))
    ]),
  ],
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
