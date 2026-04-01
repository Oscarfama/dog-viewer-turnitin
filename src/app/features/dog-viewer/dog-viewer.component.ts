import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DogStateService } from '../../core/services/dog-state.service';
import { MainImageComponent } from './components/main-image/main-image.component';
import { ThumbnailGridComponent } from './components/thumbnail-grid/thumbnail-grid.component';
import { FavoritesPanelComponent } from './components/favorites-panel/favorites-panel.component';
import { DogImage } from '../../shared/models/dog.model';

@Component({
  selector: 'app-dog-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainImageComponent, ThumbnailGridComponent, FavoritesPanelComponent],
  templateUrl: './dog-viewer.component.html',
  styleUrl: './dog-viewer.component.scss',
})
export class DogViewerComponent implements OnInit {
  protected readonly state = inject(DogStateService);

  ngOnInit(): void {
    this.state.loadInitialData();
  }

  onDogSelected(dog: DogImage): void {
    this.state.setMainImage(dog);
  }

  onFavoriteToggled(dogUrl?: string): void {
    this.state.toggleFavorite(dogUrl);
  }

  onFavoriteSelected(dog: DogImage): void {
    this.state.setMainImage(dog);
  }

  onFavoriteRemoved(url: string): void {
    this.state.removeFavorite(url);
  }

}
