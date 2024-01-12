import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {AccordionComponent} from '../accordion/accordion.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CdkAccordionModule,
    AccordionComponent
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-faq'
  }
})
export class FaqComponent {

  faq = [
    {
      title: 'What is Frontend Mentor, and how will it help me?',
      body: 'Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It\'s suitable for all levels and ideal for portfolio building.'
    },
    {
      title: 'Is Frontend Mentor free?',
      body: 'Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.'
    },
    {
      title: 'Can I use Frontend Mentor projects in my portfolio?',
      body: 'Yes, you can use projects completed on Frontend Mentor in your portfolio. It\'s an excellent way to showcase your skills to potential employers!'
    },
    {
      title: 'How can I get help if I\'m stuck on a Frontend Mentor challenge?',
      body: 'The best place to get help is inside Frontend Mentor\'s Discord community. There\'s a help channel where you can ask questions and seek support from other community members.'
    }
  ];
}
