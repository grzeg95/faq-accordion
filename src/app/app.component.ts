import {Dialog} from '@angular/cdk/dialog';
import {ComponentPortal} from '@angular/cdk/portal';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BackgroundTopComponent} from './background-top/background-top.component';
import {CardComponent} from './card/card.component';
import {FaqComponent} from './faq/faq.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundTopComponent, BackgroundTopComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {

  constructor(
    private dialog: Dialog
  ) {

    const card = this.dialog.open(CardComponent, {
      maxWidth: 542 + 16 + 16,
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'overlay-pane'
    });

    const cardComponentInstance = card.componentInstance;

    if (cardComponentInstance) {
      cardComponentInstance.portal = new ComponentPortal(FaqComponent);
    }
  }
}
