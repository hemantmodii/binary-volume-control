const audiotag = document.querySelector("audio");
audiotag.volume = 0.2;

const volumeText = document.getElementById("volume");
const bitIds = [7, 6, 5, 4, 3, 2, 1];
const buttons = bitIds.map((id) => document.getElementById(`bin-${id}`));

function bitsToValue() {
  let v = 0;
  for (let i = 0; i < buttons.length; i++) {
    const bit = buttons[i].innerText.trim() === "1" ? 1 : 0;
    const weight = 1 << (buttons.length - 1 - i);
    v += bit * weight;
  }
  return v;
}

function valueToBits(v) {
  v = Math.max(0, Math.min(100, v));
  for (let i = 0; i < buttons.length; i++) {
    const bitPos = buttons.length - 1 - i;
    const bit = (v >> bitPos) & 1;
    buttons[i].innerText = bit ? "1" : "0";
  }
}

function setVolumeFromBits() {
  const val = bitsToValue();
  const capped = Math.min(val, 100);
  audiotag.volume = capped / 100;
  volumeText.textContent = capped + "%";
}

function syncUIFromVolume() {
  const v = Math.round(audiotag.volume * 100);
  valueToBits(v);
  volumeText.textContent = v + "%";
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.innerText = btn.innerText.trim() === "1" ? "0" : "1";
    setVolumeFromBits();
  });
});

audiotag.addEventListener("volumechange", syncUIFromVolume);

syncUIFromVolume();
