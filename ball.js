import gsap from 'gsap';

const ballMouse = () => {
  gsap.set(".ball", {xPercent: -50, yPercent: -50});
  
  const ball = document.querySelector(".ball");
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 0.2;
  
  const xSet = gsap.quickSetter(ball, "x", "px");
  const ySet = gsap.quickSetter(ball, "y", "px");

  ball.style.borderColor = 'darkorange'
  
  window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
  });
  window.addEventListener('mousedown', () => { 
      ball.style.borderColor = 'darkred'
      ball.style.borderWidth = '3px'
  })
  window.addEventListener('mouseup', () => { 
      ball.style.borderColor = 'darkorange'
      ball.style.borderWidth = '1px'
  })
  
  gsap.ticker.add(() => {
    
    // adjust speed for higher refresh monitors
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
    
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });
}

export default ballMouse;