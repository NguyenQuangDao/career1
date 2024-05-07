const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let activeSlide = 0;
let intervalId;

function updateSlide() {
  carouselContainer.style.transform = `translateX(-${activeSlide * 100}%`;
}

updateSlide();

prevBtn.addEventListener('click', () => {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = 2;
  }
  updateSlide();
  clearInterval(intervalId);
  intervalId = setInterval(changeSlide, 3000);
});

nextBtn.addEventListener('click', () => {
  activeSlide++;
  if (activeSlide > 2) {
    activeSlide = 0;
  }
  updateSlide();
  clearInterval(intervalId);
  intervalId = setInterval(changeSlide, 3000);
});

function changeSlide() {
  activeSlide++;
  if (activeSlide > 2) {
    activeSlide = 0;
  }
  updateSlide();
}

intervalId = setInterval(changeSlide, 3000);

document.addEventListener("DOMContentLoaded", function () {
  const jobsContainer = document.getElementById('jobs-container');
  const locationFilter = document.getElementById('location');
  const jobTypeFilter = document.getElementById('job-type');


  function fetchAndDisplayJobs() {

    fetch('https://6411ea8ff9fe8122ae17b101.mockapi.io/travelivez-career')
      .then(response => response.json())
      .then(data => {
        displayJobs(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }


  function displayJobs(jobs) {
    jobsContainer.innerHTML = '';

    jobs.forEach(job => {
      console.log(job.dia_diem)
      if ((locationFilter.value === 'all' || job.dia_diem === locationFilter.value) &&
        (jobTypeFilter.value === 'all' || job.loai_cong_viec === jobTypeFilter.value)) {
        const jobItem = document.createElement('div');
        jobItem.classList.add('recruitment-item');

        var jobInfoContainer = document.createElement("div");
        jobInfoContainer.classList.add("recruitment-item-info");

        var jobImageElement = document.createElement("div");
        jobImageElement.classList.add("recruitment-item-image");
        var logoImageElement = document.createElement("img");
        logoImageElement.src = "img/logo.png";
        logoImageElement.alt = "";
        jobImageElement.appendChild(logoImageElement);

        var jobDetailElement = document.createElement("div");
        jobDetailElement.classList.add("recruitment-item-detail");
        var jobTitleElement = document.createElement("h3");
        jobTitleElement.classList.add("recruitment-item-title");
        jobTitleElement.textContent = job.ten_cong_viec;
        var jobSalaryElement = document.createElement("div");
        jobSalaryElement.classList.add("recruitment-item-salary");
        jobSalaryElement.textContent = job.muc_luong;
        var jobMetaElement = document.createElement("div");
        jobMetaElement.classList.add("recruitment-item-meta");
        var jobPlaceElement = document.createElement("div");
        jobPlaceElement.classList.add("recruitment-item-place");
        var placeSpanElement = document.createElement("span");
        placeSpanElement.textContent = job.dia_diem;
        jobPlaceElement.appendChild(placeSpanElement);
        var jobExpiryElement = document.createElement("div");
        jobExpiryElement.classList.add("recruitment-item-expiry");
        var expirySpanElement = document.createElement("span");
        expirySpanElement.textContent = "Hạn nộp hồ sơ: ";
        var expiryDateElement = document.createTextNode(job.han_chot_tuyen);
        jobExpiryElement.appendChild(expirySpanElement);
        jobExpiryElement.appendChild(expiryDateElement);

        jobMetaElement.appendChild(jobPlaceElement);
        jobMetaElement.appendChild(jobExpiryElement);

        jobDetailElement.appendChild(jobTitleElement);
        jobDetailElement.appendChild(jobSalaryElement);
        jobDetailElement.appendChild(jobMetaElement);

        var jobActionsElement = document.createElement("div");
        jobActionsElement.classList.add("recruitment-item-actions");
        var jobLinkElement = document.createElement("a");
        jobLinkElement.href = job.link;
        jobLinkElement.textContent = "Chi tiết";
        jobActionsElement.appendChild(jobLinkElement);

        jobInfoContainer.appendChild(jobImageElement);
        jobInfoContainer.appendChild(jobDetailElement);
        jobInfoContainer.appendChild(jobActionsElement);
        jobItem.appendChild(jobInfoContainer);
        jobsContainer.appendChild(jobItem);
      }
    });
  }

  locationFilter.addEventListener('change', fetchAndDisplayJobs);
  jobTypeFilter.addEventListener('change', fetchAndDisplayJobs);
  fetchAndDisplayJobs();
});


