import {ChangeDetectionStrategy, Component, computed, Input, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../services/device.service';

@Component({
  selector: 'app-background-top',
  standalone: true,
  imports: [],
  templateUrl: './background-top.component.html',
  styleUrl: './background-top.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-background-top'
  }
})
export class BackgroundTopComponent {

  @Input({required: true}) mobile!: string;
  @Input() desktop: string = this.mobile;

  screenSize = this.deviceService.screenSize;

  backgroundUrl = computed(() => {
    return `url(${this.screenSize() === 'desktop' ? this.desktop : this.mobile})`;
  });

  constructor(
    private deviceService: DeviceService
  ) {

  }
}
