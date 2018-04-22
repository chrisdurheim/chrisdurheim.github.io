document.addEventListener('DOMContentLoaded', () => {
  function smoothScroll(id) {
    document.querySelector(id).scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: 'smooth'
    });
  }

  scrollLinks = document.querySelectorAll('a.smooth-scroller');
  for (let i = 0; i < scrollLinks.length; i += 1) {
    scrollLinks[i].addEventListener('click', (ele) => {
      ele.preventDefault();
      smoothScroll(ele.target.hash);
    });
  }
});
