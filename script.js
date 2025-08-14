document.addEventListener("DOMContentLoaded", () => {
  let startTime = Date.now();
  let duration = 2000;

  function animate() {
    let progress = Math.min(1, (Date.now() - startTime) / duration);
    document.getElementById("satisfaction").innerText = Math.floor(progress * 98) + "%";
    document.getElementById("responseTime").innerText = Math.floor(progress * 24) + "h";
    document.getElementById("assessments").innerText = Math.floor(progress * 500) + "+";
    document.getElementById("experience").innerText = Math.floor(progress * 15) + "+";
    if (progress < 1) requestAnimationFrame(animate);
  }
  animate();
});
