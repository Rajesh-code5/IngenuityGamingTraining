export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/',
  images: [
    {
      key: 'goku_blue',
      url: 'img/gokublue.jpg',
    },
    {
      key: 'goku_ui',
      url: 'img/ultraInstinct.jpg',
    },
    {
      key: 'vegita_blue',
      url: 'img/vegitaBlue.jpg',
    },
    {
      key: 'vegita_super_blue',
      url: 'img/vegitaSuperBlue.jpg',
    },
    {
      key: 'goku-ss',
      url: 'img/ssgoku.png',
    },
    {
      key: 'dino',
      url: 'img/dino.json',
    },
    {
      key: 'back',
      url: 'img/card.jpeg',
    },
    {
      key: 'front',
      url: 'img/smilies.jpg',
    },
    {
      key: 'desyrel',
      url: 'fonts/desyrel.xml',
    },
  ],
};
