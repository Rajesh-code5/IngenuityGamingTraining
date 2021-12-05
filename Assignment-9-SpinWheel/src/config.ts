export const config = {
    "slices":10, //10 slices
    "sliceColors": [0x006400, 0xffffff, 0x00008b, 0xA9A9A9, 0xFFFF00, 0xD3D3D3, 0x654321, 0xFFC0CB, 0x00ff00, 0x8B0000],
    prizes: ['0001 STARS','0003 STARS','0005 STARS','10 STARS','20 STARS','50 STARS','100 STARS','200 STARS','500 STARS','1000 STARS'],
    // If you are looking for probability method, Please check in Game.ts for how I added probability
    // I have generated a random number for defining the different weights between 1 to 100 to define probability of answer
    duration: 5,
    radius: 250
};