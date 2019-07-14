import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }
  poster_base_url = "https://image.tmdb.org/t/p/w500/"

  execute( url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json"
      }),
   
    };
        return this.http.get<any>(url, httpOptions);
  }
  getFamousMovies(page){
    return this.execute("https://api.themoviedb.org/3/movie/popular?api_key=4b10cf2f8e6ed1fcb506bd3929ecee40&language=en-US&page=" + page)
  }
}
