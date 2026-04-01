import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThumbnailCardComponent } from './thumbnail-card.component';
import { DogImage } from '../../../../shared/models/dog.model';
import { By } from '@angular/platform-browser';

const mockDog: DogImage = {
  id: 'test-1',
  url: 'https://example.com/dog.jpg',
  breed: 'Labrador',
};

describe('ThumbnailCardComponent', () => {
  let fixture: ComponentFixture<ThumbnailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThumbnailCardComponent);
    fixture.componentRef.setInput('dog', mockDog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the breed name', () => {
    const breedEl = fixture.debugElement.query(By.css('.thumb-breed'));
    expect(breedEl.nativeElement.textContent.trim()).toBe('Labrador');
  });

  it('renders the dog image', () => {
    const img = fixture.debugElement.query(By.css('.thumb-img'));
    expect(img.nativeElement.src).toBe('https://example.com/dog.jpg');
  });

  it('applies is-active class when isActive is true', () => {
    fixture.componentRef.setInput('isActive', true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.thumbnail-card'));
    expect(btn.nativeElement.classList).toContain('is-active');
  });

  it('emits selected event on click', () => {
    let emitted: DogImage | undefined;
    fixture.componentInstance.selected.subscribe((dog) => (emitted = dog));

    const btn = fixture.debugElement.query(By.css('.thumbnail-card'));
    btn.nativeElement.click();

    expect(emitted).toEqual(mockDog);
  });
});
