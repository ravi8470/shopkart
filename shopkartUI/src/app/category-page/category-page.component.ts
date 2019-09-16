import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  categoryName: string;
  ngOnInit() {
    this.route.params.subscribe(params => this.categoryName = params.name);
  }
}
