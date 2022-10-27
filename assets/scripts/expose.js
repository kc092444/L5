// expose.js
window.addEventListener('DOMContentLoaded', init);

let play_audio = (event, chosen_audio, audio_element) => {
  if(!chosen_audio) return;
  audio_element.play();
  console.log(chosen_audio);
  if(chosen_audio === 'party-horn') {
    const jsconfetti = new JSConfetti();
    jsconfetti.addConfetti();
  }
}

let change_volume = (event, audio_element) => {
  const volume = Number(event.target.value)
  const normalized_volume = volume/100.0;
  // console.log(normalized_volume);
  audio_element.volume = normalized_volume;
  return volume;
}

let change_image = (event, chosen_audio, image_element) => {
  if(!chosen_audio) {
    return;
  }
  image_element.src = `/assets/images/${chosen_audio}.svg`
}

let change_chosen_audio = (event, audio_element) => {
  let chosen_audio = event.target.value;
  audio_element.src = `/assets/audio/${chosen_audio}.mp3`
  return chosen_audio;
}

let change_volume_icon = (event, volume, volume_icon) => {
  if(volume <= 0) {
    volume_icon.src = `/assets/icons/volume-level-0.svg`;
  }
  else if(volume < 33) {
    volume_icon.src = `/assets/icons/volume-level-1.svg`;
  }
  else if(volume < 67) {
    volume_icon.src = `/assets/icons/volume-level-2.svg`;
  }
  else {
    volume_icon.src = `/assets/icons/volume-level-3.svg`;
  }
}

function init() {

  // Audio element
  let audio_element = document.querySelector('audio');
  let chosen_audio = undefined;
  // console.log(audio_element);

  // Top level Image
  let images = document.querySelectorAll('img');
  // console.log(images);
  let audio_image = images[0];

  // Audio picker
  let audio_picker = document.querySelector('#horn-select');
  // console.log(audio_picker);

  // Volume Selector
  let volume_slider = document.querySelector('#volume');
  // console.log(volume_slider);

  // Volume Icon
  let volume_icon = images[1];
  // console.log(volume_icon);

  // Play Sound Button
  let play_sound_button = document.querySelector('button');
  // console.log(play_sound_button);

  // Event Listeners
  audio_picker.addEventListener('change', (event) => {
    chosen_audio = change_chosen_audio(event, audio_element);
    change_image(event, chosen_audio, audio_image);
    // console.log(audio_element);
  });

  // Volume Slider
  volume_slider.addEventListener('change', (event) => {
    const new_volume = change_volume(event, audio_element);
    change_volume_icon(event, new_volume, volume_icon);
  });

  // Play audio
  play_sound_button.addEventListener('click', (event) => {
    play_audio(event, chosen_audio, audio_element);
  });


}