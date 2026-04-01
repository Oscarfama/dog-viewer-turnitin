import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DogViewerComponent } from './features/dog-viewer/dog-viewer.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DogViewerComponent],
  template: `<app-dog-viewer />`,
})
export class AppComponent {}
