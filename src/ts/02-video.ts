import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef: HTMLElement | null = document.querySelector('iframe');
if(iframeRef) {
    const player: Player = new Player(iframeRef);
    const CURRENT_TIME: string = 'videoplayer-current-time';
    
    let savedTime: string | null = localStorage.getItem(CURRENT_TIME);
    let storageTime: number = checkStorageTime(savedTime);
    
    player.setCurrentTime(storageTime).then(function (): void {});
    
    player.on('timeupdate', throttle(saveCurrentTime, 1000));
    
    function checkStorageTime(time: string | null): number {
      try {
        return time ? JSON.parse(time) : 0;
      } catch (error) {
        console.log((error as Error).name);
        console.log((error as Error).message);
        return 0;
      }
    }
    
    function saveCurrentTime(): void {
      player.getCurrentTime().then(function (seconds: number): void {
        localStorage.setItem(CURRENT_TIME, JSON.stringify(seconds));
      });
    }
}
