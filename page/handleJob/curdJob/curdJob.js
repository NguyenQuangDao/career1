// display
document.addEventListener("DOMContentLoaded", function () {
  let inputName = document.getElementById("inputName");
  let inputPrice = document.getElementById("inputPrice");
  let inputNumjob = document.getElementById("inputNumjob");
  let inputDatejob = document.getElementById("inputDatejob");
  let inputTypeOfWork = document.getElementById("inputTypeOfWork");
  let inputLocation = document.getElementById("inputLocation");
  let inputDescribe = document.getElementById("inputDescribe");
  let inputRequest = document.getElementById("inputRequest");
  let inputLinkJob = document.getElementById("inputLinkJob");
  let btnAdd = document.getElementById("btnAdd");
  let btnClear = document.getElementById("btnClear");

  const jobsContainer = document.getElementById("jobs-container");
  const locationFilter = document.getElementById("location");
  const jobTypeFilter = document.getElementById("job-type");

  function fetchAndDisplayJobs() {
    fetch("https://6411ea8ff9fe8122ae17b101.mockapi.io/travelivez-career")
      .then((response) => response.json())
      .then((data) => {
        displayJobs(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function displayJobs(jobs) {
    jobsContainer.innerHTML = "";

    jobs.forEach((job) => {
      if (
        (locationFilter.value === "all" ||
          job.dia_diem === locationFilter.value) &&
        (jobTypeFilter.value === "all" ||
          job.loai_cong_viec === jobTypeFilter.value)
      ) {
        const jobItem = document.createElement("div");
        jobItem.classList.add("recruitment-item");

        var jobInfoContainer = document.createElement("div");
        jobInfoContainer.classList.add("recruitment-item-info");

        var jobImageElement = document.createElement("div");
        jobImageElement.classList.add("recruitment-item-image");
        var logoImageElement = document.createElement("img");
        logoImageElement.src = "../../../img/logo.png";
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

        //xem chi tiết job
        var jobActionsElement = document.createElement("div");
        jobActionsElement.classList.add("recruitment-item-actions");
        var jobLinkElement = document.createElement("a");
        jobLinkElement.href = "../../../page/job-detail/job-detail.html";
        jobLinkElement.textContent = "Chi tiết";
        jobActionsElement.appendChild(jobLinkElement);
        jobLinkElement.addEventListener("click", function (event) {
          displayJobDetail(job);
        });
        // xóa job
        var deleteButtonElement = document.createElement("button");
        deleteButtonElement.textContent = "Xóa";
        deleteButtonElement.classList.add("delete-button");

        deleteButtonElement.addEventListener("click", function (event) {
          event.preventDefault();
          deleteJob(job);
        });

        jobActionsElement.appendChild(deleteButtonElement);

        jobInfoContainer.appendChild(jobImageElement);
        jobInfoContainer.appendChild(jobDetailElement);
        jobInfoContainer.appendChild(jobActionsElement);
        jobItem.appendChild(jobInfoContainer);
        jobsContainer.appendChild(jobItem);
      }
    });
  }

  locationFilter.addEventListener("change", fetchAndDisplayJobs);
  jobTypeFilter.addEventListener("change", fetchAndDisplayJobs);
  fetchAndDisplayJobs();

  // add job
  btnAdd.addEventListener("click", (_) => {
    if (
      inputName.value != "" &&
      inputPrice.value != "" &&
      inputNumjob.value != "" &&
      inputDatejob.value != "" &&
      inputTypeOfWork.value != "" &&
      inputLocation.value != "" &&
      inputDescribe.value != "" &&
      inputRequest.value != "" &&
      inputLinkJob.value != ""
    ) {
      let postData = {
        ten_cong_viec: inputName.value,
        muc_luong: inputPrice.value,
        so_luong_tuyen: inputNumjob.value,
        han_chot_tuyen: inputDatejob.value,
        loai_cong_viec: inputTypeOfWork.value,
        dia_diem: inputLocation.value,
        mo_ta: inputDescribe.value,
        yeu_cau: inputRequest.value,
        link_job: inputLinkJob.value,
      };
      fetch("https://6411ea8ff9fe8122ae17b101.mockapi.io/travelivez-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          fetchAndDisplayJobs();
          clearForm();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("lỗi");
    }
  });
  // clearForm
  btnClear.addEventListener("click", clearForm);
  function clearForm() {
    inputName.value = "";
    inputPrice.value = "";
    inputNumjob.value = "";
    inputDatejob.value = "";
    inputTypeOfWork.value = "";
    inputLocation.value = "";
    inputDescribe.value = "";
    inputRequest.value = "";
    inputLinkJob.value = "";
  }
  // deleteJob
  function deleteJob(jobs) {
    fetch(
      `https://6411ea8ff9fe8122ae17b101.mockapi.io/travelivez-career/${jobs.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Job deleted successfully.");
          fetchAndDisplayJobs();
          console.log("dâdsd");
        } else {
          console.error("Error deleting job:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  }
  //   job chi tiết
  function displayJobDetail(job) {
    // Gửi dữ liệu sang trang khác thông qua Local Storage
    localStorage.setItem("DetailJob", JSON.stringify(job));
  }
});
