import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DogImage } from '../../../../shared/models/dog.model';

@Component({
  selector: 'app-thumbnail-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './thumbnail-card.component.html',
  styleUrl: './thumbnail-card.component.scss',
})
export class ThumbnailCardComponent {
  readonly dog = input.required<DogImage>();
  readonly isActive = input<boolean>(false);
  readonly selected = output<DogImage>();
}
