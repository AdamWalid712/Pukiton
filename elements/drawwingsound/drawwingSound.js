// this won't be appended in the body iit will just work while drawwing

export const drawwingSound = document.createElement("audio");
drawwingSound.src = "../../sound_effects/dj.m4a";
drawwingSound.volume = 0.2
drawwingSound.loop = true;
drawwingSound.currentTime = 0;