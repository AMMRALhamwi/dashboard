console.log("portofolio");

let skillsSection = document.querySelector(".skills");
console.log(skillsSection);
let fill = document.querySelectorAll(".fill");
console.log(fill);

window.onscroll = function () {
  if (window.scrollY >= skillsSection.offsetTop) {
    console.log("good");
    fill.forEach((p) => {
      p.style.width = p.dataset.width;
    });
  }
};
