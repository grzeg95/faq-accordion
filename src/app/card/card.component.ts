import {Portal, PortalModule} from '@angular/cdk/portal';
import {NgTemplateOutlet} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PortalModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-card'
  }
})
export class CardComponent {

  @Input() portal: Portal<any> | undefined;
}
