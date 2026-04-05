// this won't be appended in the body iit will just work while drawwing

export const drawwingSound = document.createElement("audio");
drawwingSound.src = "../pages/editor/sound_effects/d2j.m4a";
drawwingSound.volume = 0.2
drawwingSound.loop = true;
drawwingSound.currentTime = 0;
