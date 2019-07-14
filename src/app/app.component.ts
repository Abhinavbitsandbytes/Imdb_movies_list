import { Component, OnInit } from '@angular/core';
import { MovieListService } from './service/movie-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public movie_service: MovieListService) {
  }
  poster_url: any[]
  movies_content
  imdb_ratings = [];
  movies_title: any[];
  currentPage: number = 1;
  pages: Array<number>;
  showChart: boolean = true;
  showBanner: boolean = false;
  pageToshow:number = 1;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,

  };





  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {
      data: this.imdb_ratings, label: 'Rating', backgroundColor: 'rgba(79, 255, 195, 1)', hoverBackgroundColor: 'rgba(79, 255, 195, 1)'
    },
  ];
  ngOnInit() {
    this.getAllMovies()
  }
  getAllMovies() {
    this.movie_service.getFamousMovies(this.currentPage).subscribe(data => {
      this.pageToshow = this.currentPage;
      this.movies_content = data
      console.log(this.movies_content);
      this.poster_url = this.movies_content.results.map(content => content.poster_path);
      console.log(this.poster_url);
      this.movies_title = this.movies_content.results.map(content => content.title);
      console.log(this.movies_title);
      this.imdb_ratings = this.movies_content.results.map(content => content.vote_average);
      console.log(this.imdb_ratings);
      console.log("barChartData", this.barChartData)
      this.barChartData[0].data = this.imdb_ratings;
      console.log("barChartData", this.barChartData)
    })
  }
  goPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllMovies();
    }
  }
  goNext() {
    if (this.currentPage < 56) {
      this.currentPage++;
      this.getAllMovies();
    }
  }
  displayChart() {
    this.showBanner = false
    this.showChart = true;
  }
  displayPoster() {
    this.showChart = false;
    this.getAllMovies()
    this.showBanner = true;
  }
}