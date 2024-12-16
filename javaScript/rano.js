let salaryInput = document.getElementById("salaryInput");
let salaryChart = new Chart(document.querySelector(".salary-chart"), {
  type: "doughnut",
  data: {
    labels: ["Social insurance", "Tax", "Net salary"],
    datasets: [
      {
        label: "Salary data",
        data: [0, 0, 0],
      },
    ],
  },
  options: {
    borderWidth: 10,
    borderRadius: 2,
    hoverBorderWidth: 0,
  },
});

let ulSalary = document.querySelector(".flex-details .details ul");

salaryInput.oninput = () => {
  let salary = parseFloat(salaryInput.value);
  let socialInsurance = (salary * 7) / 100;
  let tax;

  if (salary <= 250000) {
    tax = (salary * 3) / 100;
  } else if (salary >= 185940 && salary <= 250000) {
    tax = (salary * 5) / 100;
  } else if (salary >= 250001 && salary <= 450000) {
    tax = (salary * 7) / 100;
  } else if (salary >= 450001 && salary <= 650000) {
    tax = (salary * 9) / 100;
  } else {
    tax = (salary * 9) / 100;
  }

  let netSalary = salary - (tax + socialInsurance);
  salaryChart.data.datasets[0].data = [socialInsurance, tax, netSalary];
  salaryChart.update();

  ulSalary.innerHTML = "";
  const labels = ["Social insurance", "Tax", "Net salary"];
  const data = [socialInsurance, tax, netSalary];

  labels.forEach((label, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${label}: <span class="precentage">${data[index]}</span>`;
    ulSalary.appendChild(li);
  });
};
