import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { DogImage, LoadingState } from '../../shared/models/dog.model';
import { DogApiService } from './dog-api.service';

const FAVORITES_KEY = 'favorites';
const THUMBNAIL_COUNT = 10;

@Injectable({ providedIn: 'root' })
export class DogStateService {
  private readonly api = inject(DogApiService);

  readonly mainImage = signal<DogImage | null>(null);
  readonly thumbnails = signal<DogImage[]>([]);
  readonly favorites = signal<DogImage[]>(this.loadFavorites());
  readonly loadingState = signal<LoadingState>('idle');
  readonly errorMessage = signal<string | null>(null);

  readonly isLoading = computed(() => this.loadingState() === 'loading');
  readonly hasError = computed(() => this.loadingState() === 'error');

  loadInitialData(): void {
    this.loadingState.set("loading");
    this.errorMessage.set(null);

    this.api
      .fetchRandomImages(THUMBNAIL_COUNT + 1)
      .pipe(
        catchError(() => {
          this.errorMessage.set("Failed to load dog images. Please try again.");
          this.loadingState.set("error");
          return of([] as DogImage[]);
        }),
        finalize(() => {
          if (this.loadingState() === "loading") {
            this.loadingState.set("success");
          }
        }),
      )
      .subscribe((images) => {
        if (images.length === 0) return;
        const [first, ...rest] = images;
        this.mainImage.set({ ...first, id: "main" });
        this.thumbnails.set(
          rest.map((img, i) => ({ ...img, id: `thumb-${i}` })),
        );
        this.loadingState.set("success");
      });
  }

  setMainImage(dog: DogImage): void {
    this.mainImage.set(dog);
  }

  // logic whenever user clicks favorite button
  toggleFavorite(dogUrl?: string): void {
    const targetUrl = dogUrl ?? this.mainImage()?.url;
    if (!targetUrl) return;

    const current = this.favorites();
    const existingIndex = current.findIndex((favorite) => favorite.url === targetUrl);
    if(existingIndex >= 0)
    {
      return;
    }

    const dogToAdd = this.thumbnails().find((thumbnail) => thumbnail.url === targetUrl) || 
                      this.mainImage();
    if (dogToAdd) {
      const item: DogImage = { ...dogToAdd };
      this.favorites.update((favs) => [item, ...favs]);
    }

    this.persistFavoritesInLocalStorage();
  }

  removeFavorite(url: string): void {
    this.favorites.update((favs) => favs.filter((favorite) => favorite.url !== url));
    this.persistFavoritesInLocalStorage();
  }


  private loadFavorites(): DogImage[] {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as DogImage[]) : [];
  }

  private persistFavoritesInLocalStorage(): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites()));
  }
}
