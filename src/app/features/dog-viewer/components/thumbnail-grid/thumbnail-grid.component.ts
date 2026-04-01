import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DogImage } from '../../../../shared/models/dog.model';
import { ThumbnailCardComponent } from '../thumbnail-card/thumbnail-card.component';

@Component({
  selector: 'app-thumbnail-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThumbnailCardComponent],
  templateUrl: './thumbnail-grid.component.html',
  styleUrl: './thumbnail-grid.component.scss',
})
export class ThumbnailGridComponent {
  readonly thumbnails = input.required<DogImage[]>();
  readonly activeDogUrl = input<string | null>(null);
  readonly dogSelected = output<DogImage>();
}
