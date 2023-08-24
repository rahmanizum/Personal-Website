function rotateContainer(event) {
    const container = event.target;
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const containerCenterX = rect.width / 2;
  
    // Calculate the rotation angle based on mouse position relative to container center
    const rotationAngle = (180 / containerCenterX) * (mouseX - containerCenterX);
    
    // Update the container's rotation using CSS transform
    container.style.transform = `perspective(800px) rotateY(${rotationAngle}deg)`;
  }
  