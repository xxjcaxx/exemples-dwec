import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToEmoji'
})
export class StringToEmojiPipe implements PipeTransform {

  transform(uuid: string | undefined): string {
    return stringToHashEmoji(uuid ? uuid : '');
  }

}



const stringToHashEmoji = (uuid: string) => {

  const animalEmojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
    '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋',
    '🐌', '🐞', '🐜', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦀',
    '🐡', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🦥', '🦦', '🦨',
    '🦘', '🦡', '🐘', '🦏', '🦛', '🐪', '🐫', '🦒', '🐃', '🐂'
  ];
  let hash = uuid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % animalEmojis.length;
  return animalEmojis[hash];
}
