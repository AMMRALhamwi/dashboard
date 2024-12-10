console.log("main one");
let quick = document.querySelector(".quick");
console.log(quick);
let quickTitle = document.querySelector(".title");
console.log(quickTitle);
let quicklength = quickTitle.getAttribute("maxlength");
console.log(quicklength);
let count = document.querySelector(".count");
console.log(count);
count.innerHTML = quicklength;
let progressBar = document.querySelector(".progress-bar");
console.log(progressBar);

quickTitle.oninput = function () {
  count.innerHTML = quicklength - quickTitle.value.length;

  if (count.innerHTML == 0) {
    console.log("hi");
    count.style.cssText = "background-color : red;";
    progressBar.style.cssText = "background-color : red;";
  } else {
    count.style.cssText = "background-color : #0d69d5";
    progressBar.style.cssText = "background-color : #0d69d5";
  }
  progressBar.style.width = `${
    (quickTitle.value.length * 100) / quicklength - 3
  }%  `;
};

let fill = document.querySelectorAll(".pop-up");
let section = document.querySelector(".targets");
// console.log(fill.dataset.width);
console.log(section);

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 200) {
    fill.forEach((p) => {
      //   element.style.width = element.dataset.width;
      p.style.width = p.dataset.width;
    });
  }
};
