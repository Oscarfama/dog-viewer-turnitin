import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DogImage, RandomImagesResponse } from "../../shared/models/dog.model";

const API_BASE = "https://dog.ceo/api";

@Injectable({ providedIn: "root" })
export class DogApiService {
  private readonly http = inject(HttpClient);

  fetchRandomImages(count: number): Observable<DogImage[]> {
    return this.http
      .get<RandomImagesResponse>(`${API_BASE}/breeds/image/random/${count}`)
      .pipe(
        map((res) =>
          res.message.map((url, i) => this.mapUrlToDogImage(url, `thumb-${i}`)),
        ),
      );
  }
  private extractBreedFromUrl(url: string): string {
    const match = url.match(/\/breeds\/([^/]+)\//);
    if (!match) return "Unknown";
    const breed = match[1].replace(/-/g, " ");
    return breed;
  }

  private mapUrlToDogImage(url: string, id: string): DogImage {
    const breed = this.extractBreedFromUrl(url);
    return { id, url, breed };
  }
}
