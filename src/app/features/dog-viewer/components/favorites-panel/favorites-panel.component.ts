import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DogImage } from '../../../../shared/models/dog.model';

@Component({
  selector: 'app-favorites-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-panel.component.html',
  styleUrl: './favorites-panel.component.scss',
})
export class FavoritesPanelComponent {
  readonly favorites = input.required<DogImage[]>();
  readonly activeDogUrl = input<string | null>(null);
  readonly favoriteSelected = output<DogImage>();
  readonly favoriteRemoved = output<string>();
}
