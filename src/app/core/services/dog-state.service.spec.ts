import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DogStateService } from './dog-state.service';
import { DogApiService } from './dog-api.service';
import { DogImage } from '../../shared/models/dog.model';

const makeDog = (id: string, url = `https://example.com/${id}.jpg`): DogImage => ({
  id,
  url,
  breed: 'Labrador',
});

describe('DogStateService', () => {
  let service: DogStateService;
  let apiSpy: jasmine.SpyObj<DogApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('DogApiService', [
      'fetchRandomImages',
    ]);

    localStorage.removeItem('favorites');

    TestBed.configureTestingModule({
      providers: [{ provide: DogApiService, useValue: apiSpy }],
    });

    service = TestBed.inject(DogStateService);
  });

  describe('loadInitialData', () => {
    it('sets main image and thumbnails on success', () => {
      const images = Array.from({ length: 11 }, (_, i) => makeDog(`d${i}`));
      apiSpy.fetchRandomImages.and.returnValue(of(images));

      service.loadInitialData();

      expect(service.mainImage()).toBeTruthy();
      expect(service.thumbnails().length).toBe(10);
      expect(service.loadingState()).toBe('success');
    });

    it('sets error state when API fails', () => {
      apiSpy.fetchRandomImages.and.returnValue(throwError(() => new Error('Network error')));

      service.loadInitialData();

      expect(service.loadingState()).toBe('error');
      expect(service.errorMessage()).toBeTruthy();
    });
  });

  describe('setMainImage', () => {
    it('updates mainImage signal', () => {
      const dog = makeDog('test');
      service.setMainImage(dog);
      expect(service.mainImage()).toEqual(dog);
    });
  });

  describe('toggleFavorite', () => {
    it('adds main image to favorites when not favorited', () => {
      const dog = makeDog('fav1');
      service.setMainImage(dog);
      service['thumbnails'].set([]);
      service.toggleFavorite();

      expect(service.favorites().length).toBe(1);
      expect(service.favorites()[0].url).toBe(dog.url);
    });

    it('does not add to favorites when already favorited', () => {
      const dog = makeDog('fav1');
      service.setMainImage(dog);
      service['thumbnails'].set([]);
      service.toggleFavorite(); 
      service.toggleFavorite(); 

      expect(service.favorites().length).toBe(1); 
    });

    it('adds dog by URL from thumbnails', () => {
      const dog = makeDog('thumb1', 'https://example.com/thumb1.jpg');
      service['thumbnails'].set([dog]);
      service.toggleFavorite(dog.url);

      expect(service.favorites().length).toBe(1);
      expect(service.favorites()[0].url).toBe(dog.url);
    });

    it('does nothing when no main image is set', () => {
      service.toggleFavorite();
      expect(service.favorites().length).toBe(0);
    });
  });

  describe('removeFavorite', () => {
    it('removes the correct favorite by url', () => {
      const dog1 = makeDog('d1', 'https://example.com/1.jpg');
      const dog2 = makeDog('d2', 'https://example.com/2.jpg');

      service.setMainImage(dog1);
      service.toggleFavorite();
      service.setMainImage(dog2);
      service.toggleFavorite();

      service.removeFavorite(dog1.url);

      expect(service.favorites().length).toBe(1);
      expect(service.favorites()[0].url).toBe(dog2.url);
    });
  });
});
