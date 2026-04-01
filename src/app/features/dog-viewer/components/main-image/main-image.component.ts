import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { DogImage } from '../../../../shared/models/dog.model';

@Component({
  selector: 'app-main-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-image.component.html',
  styleUrl: './main-image.component.scss',
})
export class MainImageComponent {
  readonly dog = input.required<DogImage>();
  readonly favoriteToggled = output<void>();
}
