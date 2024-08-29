function dropHandler(ev) {
    console.log("File(s) dropped");

    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('boxhover');
    dropZone.classList.add('divbox');
  
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");
    
    ev.preventDefault();
    
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.add('boxhover');
    dropZone.classList.remove('divbox');
  }
  
  function dragLeaveHandler(ev) {
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('boxhover');
    dropZone.classList.add('divbox');
  }

  function openFileDialog() {
    document.getElementById('fileInput').click();
  }
  
  function handleFiles(files) {
    console.log("File(s) selected:", files);
  }
  