document.addEventListener('DOMContentLoaded', () => {
  function smoothScroll(id) {
    console.log(id);
    document.querySelector(id).scrollIntoView({
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
