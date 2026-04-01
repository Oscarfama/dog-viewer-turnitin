import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DogApiService } from './dog-api.service';

describe('DogApiService', () => {
  let service: DogApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DogApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('fetchRandomImages', () => {
    it('fetches multiple images and maps them', () => {
      const urls = [
        'https://images.dog.ceo/breeds/beagle/1.jpg',
        'https://images.dog.ceo/breeds/poodle/2.jpg',
      ];

      service.fetchRandomImages(2).subscribe((dogs) => {
        expect(dogs.length).toBe(2);
        expect(dogs[0].breed).toBe('beagle');
        expect(dogs[1].breed).toBe('poodle');
      });

      const req = httpMock.expectOne('https://dog.ceo/api/breeds/image/random/2');
      req.flush({ message: urls, status: 'success' });
    });
  });
});
