import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ValueDTO {
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  public value: string;

  constructor(private http: HttpClient) {

  }

  public handleLoadDataClick() {
    this.http.get<ValueDTO>('/api/values').subscribe(
      (data) => {

        this.value = data.value
      },
      (err) => {

          this.value = "Error: " + err
      }
    );
  }
}
