import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

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

  public menuState = 'out';
  public showSidenav = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public toggleNav(): void{
    this.showSidenav = !this.showSidenav;
  }

  public toggleMenu =() => {
  }


}
