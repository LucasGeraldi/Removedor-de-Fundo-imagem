async function removeBackground() {
  const fileInput = document.getElementById('imageInput');
  const originalImg = document.getElementById('originalImage');
  const outputImg = document.getElementById('outputImage');

  if (!fileInput.files.length) {
    alert('Selecione uma imagem!');
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', 'auto');

  originalImg.src = URL.createObjectURL(file);

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'imgN1KhnmLnyMtBYJEDtAaM4'
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const blob = await response.blob();
    outputImg.src = URL.createObjectURL(blob);
    
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao remover o fundo: ' + error.message);
  }
}