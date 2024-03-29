import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  tabs = [
    { label: 'Page 1', link: '/' },
    { label: 'Page 2', link: '/list' },
  ];
  activeLink = this.router.url;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        this.activeLink = value.url;
      }
    });
  }
}
