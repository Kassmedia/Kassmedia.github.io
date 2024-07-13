// Add smooth scrolling to navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor link behavior

    const targetSection = document.getElementById(this.getAttribute('href').slice(1)); // Get target section ID

    if (targetSection) {
      smoothScroll(targetSection);
    }
  });
});

function smoothScroll(targetSection) {
  const targetY = targetSection.offsetTop; // Get target section's Y position
  const startPosition = window.pageYOffset; // Get current scroll position

  let distance = targetY - startPosition;
  let startTime = null;

  const animation = () => {
    if (startTime === null) {
      startTime = performance.now();
    }

    const time = performance.now() - startTime;
    const ease = Math.easeInOutQuad(time, startPosition, distance, 500); // Adjust duration as needed

    window.scrollTo(0, ease);

    if (Math.round(ease) !== Math.round(distance)) {
      window.requestAnimationFrame(animation);
    }
  };

  window.requestAnimationFrame(animation);
}

// Math.easeInOutQuad function (for smooth scrolling animation)
Math.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

