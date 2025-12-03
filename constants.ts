import { Hero } from './types';

export const HEROES: Hero[] = [
  {
    id: 'grumpy-bro',
    name: '暴躁哥 (Grumpy Bro)',
    title: 'THE RAGE MACHINE',
    imageUrl: 'https://storage.googleapis.com/dn-internal-ai-dev.appspot.com/ai/bot/7vxw0r06yd/image/20251203152442xrw2.png', // Placeholder for user uploaded image
    videoUrl: 'https://livjeus.github.io/liujie.app/%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%912025-12-03_155826_454.mp4', // Placeholder video
    baseTraits: ['always angry', 'hates mornings', 'screams at wifi', 'secretly loves kittens'],
    colorTheme: 'red-600',
  },
  {
    id: 'slacker-queen',
    name: '摸鱼女王 (Slacker Queen)',
    title: 'PROFESSIONAL NAPPER',
    imageUrl: 'https://storage.googleapis.com/dn-argon-uat.appspot.com/ai/at/500/image/20251201162153vjmx.jpg',
    baseTraits: ['lazy', 'addicted to boba', 'replies after 3 days', 'expert procrastinator'],
    colorTheme: 'purple-600',
  },
  {
    id: 'drama-king',
    name: '戏精之王 (Drama King)',
    title: 'MAIN CHARACTER ENERGY',
    imageUrl: 'https://storage.googleapis.com/dn-argon-uat.appspot.com/ai/at/500/image/20251201162153plvv.jpg',
    baseTraits: ['overdramatic', 'gossip engine', 'cries over spilled milk', 'fashion victim'],
    colorTheme: 'pink-500',
  },
  {
    id: 'meme-lord',
    name: '憋气大帝 (Meme Lord)',
    title: 'TERMINELLY ONLINE',
    imageUrl: 'https://storage.googleapis.com/dn-argon-uat.appspot.com/ai/at/500/image/20251201162152aouo.jpg',
    baseTraits: ['speaks in gifs', 'troll', 'no social skills', 'keyboard warrior'],
    colorTheme: 'blue-600',
  },
];