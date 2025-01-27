import { StringToEmojiPipe } from './string-to-emoji.pipe';

describe('StringToEmojiPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToEmojiPipe();
    expect(pipe).toBeTruthy();
  });
});
