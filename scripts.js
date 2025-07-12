
document.addEventListener('DOMContentLoaded', () => {

  AColorPicker.from('.picker')
  .on('change', (picker, color) => {
    document.querySelectorAll('.color-button').forEach(btn => {
      const baseId = btn.id.replace(/-bt$/, '');

        const checkbox = document.getElementById(`${baseId}-cb`);
        const hiddenInput = document.getElementById(`${baseId}-ip`);

        if (checkbox?.checked && hiddenInput) {
          btn.style.backgroundColor = AColorPicker.parseColor(color, "hex");
          hiddenInput.value = AColorPicker.parseColor(color, "hex");
          console.log(AColorPicker.parseColor(color, "hex"));
        }
  });

  })
  .on('coloradd', (picker, color) => {
    // color added: color
    // modified palette: picker.palette
  })
  .on('colorremove', (picker, color) => {
    // color removed: color
    // modified palette: picker.palette
  });

});
