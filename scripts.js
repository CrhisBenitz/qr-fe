
document.addEventListener('DOMContentLoaded', () => {

  AColorPicker.from('.picker')
  .on('change', (picker, color) => {
    document.querySelectorAll('.color-button').forEach(btn => {
      const baseId = btn.id.replace(/-bt$/, '');

        const checkbox = document.getElementById(`${baseId}-cb`);
        const hiddenInput = document.getElementById(`${baseId}-ip`);

        if (checkbox?.checked && hiddenInput) {
          btn.style.backgroundColor = color;
          hiddenInput.value = color;
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


    const form = document.getElementById('qrForm');
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams([...formData.entries()]);
      // const url = `http://127.0.0.1:5000/qr-be?${params}`;
      const url = `https://qr-be-8fux.onrender.com/qr-be?${params}`;
      const qrContainer = document.getElementById("qrCode");
      qrContainer.innerHTML = `<img src="${url}" alt="QR Code" style="max-width: 100%; max-height: 100%;">`;
      // qrContainer.innerHTML = `"${url}"`;
    };


    const shareBtn = document.getElementById("shareBtn");

    shareBtn.addEventListener("click", async () => {
      const qrImg = document.querySelector("#qrCode img");
      if (!qrImg) {
        alert("Generate a QR code first.");
        return;
      }

      try {
        const response = await fetch(qrImg.src);
        const blob = await response.blob();
        const file = new File([blob], "qr-code.png", { type: blob.type });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Cur",
            text: "Here's your custom Cur",
            files: [file],
          });
        } else {
          alert("Sharing not supported on this device/browser.");
        }
      } catch (err) {
        console.error("Error sharing QR:", err);
        alert("Failed to share the QR code.");
      }
    });


});
