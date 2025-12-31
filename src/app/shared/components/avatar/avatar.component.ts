import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '["avatar" , "avatar--" + (size() || "md"), "avatar--" + shape()]',
  },
})
export class AvatarComponent {
  imageUrl = input.required<string>();
  size = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>('md');
  shape = input<'square' | 'circle'>('circle');
  imageLargeSide = signal<'width' | 'height' | ''>('');
}
