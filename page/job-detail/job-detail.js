document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ Local Storage
  const dataString = localStorage.getItem("DetailJob");
  if (dataString) {
    const data = JSON.parse(dataString);
    // Lấy phần tử HTML
    let ten_cong_viec = document.getElementById("ten_cong_viec");
    let muc_luong = document.getElementById("muc_luong");
    let so_luong_tuyen = document.getElementById("so_luong_tuyen");
    let han_chot_tuyen = document.getElementById("han_chot_tuyen");
    let loai_cong_viec = document.getElementById("loai_cong_viec");
    let dia_diem = document.getElementById("dia_diem");
    let mo_ta = document.getElementById("mo_ta");
    let yeu_cau = document.getElementById("yeu_cau");
    let link_job = document.getElementById("link_job");
    let staticten_cong_viec = document.getElementById("staticten_cong_viec");

    // Gán dữ liệu vào các phần tử HTML
    ten_cong_viec.textContent = data.ten_cong_viec;
    muc_luong.textContent = data.muc_luong;
    so_luong_tuyen.textContent = data.so_luong_tuyen;
    han_chot_tuyen.textContent = data.han_chot_tuyen;
    loai_cong_viec.textContent = data.loai_cong_viec;
    dia_diem.textContent = data.dia_diem;
    mo_ta.textContent = data.mo_ta;
    yeu_cau.textContent = data.yeu_cau;
    link_job.textContent = data.link_job;
    staticten_cong_viec.value = data.ten_cong_viec;
  } else {
    console.error("No data found in Local Storage.");
  }

});
