import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkAccordionItem, CdkAccordionModule} from '@angular/cdk/accordion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges, OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {AccordionItem} from '../models/accordion';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CdkAccordionModule
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-accordion'
  },
  animations: [
    trigger('accordionItemOpened', [
      state('1', style({
        height: '*',
        marginTop: '*',
        marginBottom: '*'
      })),
      state('0', style({
        height: '0px',
        marginTop: '0px',
        marginBottom: '0px',
      })),
      transition('* => *', animate('200ms ease'))
    ])
  ]
})
export class AccordionComponent implements OnChanges, AfterViewInit {

  private static _id = 1;
  id = 'app-accordion-' + AccordionComponent._id;

  @ViewChildren(CdkAccordionItem) cdkAccordionItems!: QueryList<CdkAccordionItem>;
  @ViewChildren(CdkAccordionItem, {read: ElementRef}) cdkAccordionItemsRef!: QueryList<ElementRef>;

  @Input({required: true}) items: AccordionItem[] = [];
  @Input() headerIconNarrowed: string | undefined;
  @Input() headerIconExpended: string | undefined;
  @Input() multi = false;

  focused = -1;
  lastOpened: number[] = [];
  beforeAfterViewInit = true;

  @HostListener('document:keydown', ['$event'])
  handleKeyPress($event: KeyboardEvent) {

    $event.stopPropagation();

    const key = $event.key;

    if (this.lastOpened.length !== 0 || this.focused !== -1) {

      switch (key) {

        case ('ArrowUp'): {

          const isFocused = this.focused !== -1;

          if (!isFocused) {
            this.focus(this.lastOpened[this.lastOpened.length - 1]);
          } else {
            this.focusNext();
          }

          break;
        }

        case ('ArrowDown'): {

          const isFocused = this.focused !== -1;

          if (!isFocused) {
            this.focus(this.lastOpened[this.lastOpened.length - 1]);
          } else {
            this.focusPrev();
          }

          break;
        }

        case 'Enter':
        case ' ': {

          if (this.focused !== -1) {

            const cdkAccordionItem =  this.cdkAccordionItems.get(this.focused);

            if (cdkAccordionItem?.expanded) {
              this.cdkAccordionItems.get(this.focused)?.close();
              this.removeOpened(this.focused);
            } else {
              this.cdkAccordionItems.get(this.focused)?.open();
              this.addOpened(this.focused);
            }

            setTimeout(() => {
              this.focus(this.focused);
              this.cdkAccordionItemsRef.get(this.focused)?.nativeElement.scrollIntoView({behavior: 'smooth'});
            });
          }
        }
      }

    }
  }

  ngAfterViewInit(): void {
    this.beforeAfterViewInit = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['multi']) {
      this.cdkAccordionItems?.forEach((cdkAccordionItem) => cdkAccordionItem.close());
    }
  }

  focus(index: number) {
    this.focused = index;
    this.cdkAccordionItemsRef.get(index)?.nativeElement.focus();
  }

  focusOut() {
    this.focused = -1;
    ((document.activeElement) as HTMLElement)?.blur();
  }

  focusNext() {
    this.focused = this.focused - 1 < 0 ? this.cdkAccordionItems.length - 1 : this.focused - 1;
    this.focus(this.focused);
  }

  focusPrev() {
    this.focused = this.focused + 1 > this.cdkAccordionItems.length - 1 ? 0 : this.focused + 1;
    this.focus(this.focused);
  }

  onClick(accordionItem: CdkAccordionItem, index: number) {

    this.focusOut();

    if (accordionItem.expanded) {
      accordionItem.close();
      this.removeOpened(index);
    } else {
      accordionItem.open();
      this.addOpened(index);
    }
  }

  removeOpened(index: number) {
    this.lastOpened = this.lastOpened.filter((i) => i !== index);
  }

  addOpened(index: number) {
    this.lastOpened.push(index);
    this.lastOpened = [...new Set(this.lastOpened)];
  }
}
