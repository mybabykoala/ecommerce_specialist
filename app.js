function navigate(tab) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById("page-" + tab);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`[data-tab="${tab}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  window.location.hash = tab;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleModule(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector(".chevron");

  if (body) {
    body.classList.toggle("open");
  }

  if (chevron) {
    chevron.classList.toggle("open");
  }
}

function updateProgress() {
  const checks = document.querySelectorAll(".task-check");
  const checked = document.querySelectorAll(".task-check:checked");

  const percent = checks.length
    ? Math.round((checked.length / checks.length) * 100)
    : 0;

  const globalProgress = document.getElementById("globalProgress");
  const progressLabel = document.getElementById("progressLabel");
  const mobileProgLabel = document.getElementById("mobileProgLabel");
  const completedCount = document.getElementById("completedCount");

  if (globalProgress) globalProgress.style.width = percent + "%";
  if (progressLabel) progressLabel.textContent = percent + "% selesai";
  if (mobileProgLabel) mobileProgLabel.textContent = percent + "%";
  if (completedCount) completedCount.textContent = checked.length;

  checks.forEach(check => {
    const moduleId = check.dataset.module;
    const circle = document.getElementById("check-" + moduleId);

    if (circle) {
      circle.classList.toggle("done", check.checked);
    }
  });

  localStorage.setItem("uruProgress", JSON.stringify(
    Array.from(checks).map(check => check.checked)
  ));
}

function saveNotes() {
  const notes = document.getElementById("notesInput");
  const saved = document.getElementById("notesSaved");

  if (notes) {
    localStorage.setItem("uruNotes", notes.value);
  }

  if (saved) {
    saved.textContent = "Catatan tersimpan";
    setTimeout(() => saved.textContent = "", 1500);
  }
}

function clearNotes() {
  const notes = document.getElementById("notesInput");
  if (notes) notes.value = "";

  localStorage.removeItem("uruNotes");
  saveNotes();
}

document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    navigate(hash);
  }

  const savedProgress = JSON.parse(localStorage.getItem("uruProgress") || "[]");
  const checks = document.querySelectorAll(".task-check");

  checks.forEach((check, index) => {
    check.checked = savedProgress[index] || false;
  });

  const notes = document.getElementById("notesInput");
  if (notes) {
    notes.value = localStorage.getItem("uruNotes") || "";
  }

  updateProgress();

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
});
