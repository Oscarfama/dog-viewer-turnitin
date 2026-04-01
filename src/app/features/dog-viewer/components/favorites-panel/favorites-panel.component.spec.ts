import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPanelComponent } from './favorites-panel.component';
import { DogImage } from '../../../../shared/models/dog.model';
import { By } from '@angular/platform-browser';

const makeFav = (id: string): DogImage => ({
  id,
  url: `https://example.com/${id}.jpg`,
  breed: 'Poodle',
});

describe('FavoritesPanelComponent', () => {
  let fixture: ComponentFixture<FavoritesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPanelComponent);
    fixture.componentRef.setInput('favorites', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows empty state when no favorites', () => {
    const emptyEl = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyEl).toBeTruthy();
  });

  it('renders favorite items', () => {
    fixture.componentRef.setInput('favorites', [makeFav('a'), makeFav('b')]);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.fav-item'));
    expect(items.length).toBe(2);
  });

  it('does not show empty state when favorites exist', () => {
    fixture.componentRef.setInput('favorites', [makeFav('a')]);
    fixture.detectChanges();
    const emptyEl = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyEl).toBeNull();
  });

  it('emits favoriteRemoved with the url when remove button clicked', () => {
    const fav = makeFav('remove-me');
    fixture.componentRef.setInput('favorites', [fav]);
    fixture.detectChanges();

    let removedUrl: string | undefined;
    fixture.componentInstance.favoriteRemoved.subscribe((url) => (removedUrl = url));

    const removeBtn = fixture.debugElement.query(By.css('.remove-btn'));
    removeBtn.nativeElement.click();

    expect(removedUrl).toBe(fav.url);
  });

  it('emits favoriteSelected when a fav item is clicked', () => {
    const fav = makeFav('select-me');
    fixture.componentRef.setInput('favorites', [fav]);
    fixture.detectChanges();

    let selected: unknown;
    fixture.componentInstance.favoriteSelected.subscribe((dog) => (selected = dog));

    const favBtn = fixture.debugElement.query(By.css('.fav-btn'));
    favBtn.nativeElement.click();

    expect(selected).toBeTruthy();
  });

  it('shows badge with count when favorites exist', () => {
    fixture.componentRef.setInput('favorites', [makeFav('a'), makeFav('b')]);
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.textContent.trim()).toBe('2');
  });

  it('applies is-active class to the active favorite', () => {
    const fav = makeFav('active-dog');
    fixture.componentRef.setInput('favorites', [fav]);
    fixture.componentRef.setInput('activeDogUrl', fav.url);
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('.fav-item'));
    expect(item.nativeElement.classList).toContain('is-active');
  });
});
