(function () {
  "use strict";

  var sidebar, modal, modalBody, modalClose, modalBackdrop;
  var activeSpan = null;
  var sidebarNote = null;
  var activeNoteHtml = "";

  /* ---- Profanity ---- */
  function syncProfanity(node) {
    var profanityEnabled = localStorage.getItem("profanityEnabled") === "true";
    var nsfwEls = node.querySelectorAll(".nsfw");
    var sfwEls = node.querySelectorAll(".sfw");
    for (var i = 0; i < nsfwEls.length; i++) {
      nsfwEls[i].style.display = profanityEnabled ? "inline" : "none";
    }
    for (var i = 0; i < sfwEls.length; i++) {
      sfwEls[i].style.display = profanityEnabled ? "none" : "inline";
    }
  }

  /* ---- Is mobile? ---- */
  function isMobile() {
    return window.matchMedia("(max-width: 1199px)").matches;
  }

  /* ---- Dismiss ---- */
  function dismiss() {
    // Desktop
    if (sidebarNote) {
      sidebarNote.parentNode.removeChild(sidebarNote);
      sidebarNote = null;
    }
    // Mobile
    if (modal) {
      modal.classList.remove("open");
    }
    document.body.style.overflow = "";
    // Active highlight
    if (activeSpan) {
      activeSpan.classList.remove("active");
      activeSpan = null;
    }
  }

  /* ---- Desktop: show note in sidebar ---- */
  function showSidebar(noteHtml) {
    // Remove any existing note
    if (sidebarNote) {
      sidebarNote.parentNode.removeChild(sidebarNote);
      sidebarNote = null;
    }

    // Create note card
    sidebarNote = document.createElement("div");
    sidebarNote.className = "sidebar-note";

    var body = document.createElement("div");
    body.className = "sidebar-note-body";
    body.innerHTML = noteHtml;

    sidebarNote.appendChild(body);
    sidebar.appendChild(sidebarNote);

    // Position: top-align with the paragraph containing the active span
    var para = activeSpan.closest("p, li, blockquote, h1, h2, h3, h4, h5, h6");
    if (para) {
      var paraRect = para.getBoundingClientRect();
      var sidebarRect = sidebar.getBoundingClientRect();
      var offset = paraRect.top - sidebarRect.top;
      sidebarNote.style.marginTop = offset + "px";
    }

    // Clamp: if note extends past visible area, shrink max-height
    var noteRect = sidebarNote.getBoundingClientRect();
    var viewBottom = window.innerHeight;
    if (noteRect.bottom > viewBottom) {
      var available = viewBottom - noteRect.top - 16; // 16px breathing room
      if (available > 80) {
        sidebarNote.style.maxHeight = available + "px";
      }
    }

    syncProfanity(body);
  }

  /* ---- Mobile: show full-screen modal ---- */
  function showModal(noteHtml) {
    modalBody.innerHTML = noteHtml;
    syncProfanity(modalBody);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ---- Main click handler ---- */
  function onSidenoteClick(e) {
    e.stopPropagation();
    var span = e.currentTarget;

    // Toggle: clicking the same note dismisses it
    if (activeSpan === span) {
      dismiss();
      return;
    }

    // Deactivate previous
    if (activeSpan) {
      activeSpan.classList.remove("active");
    }
    activeSpan = span;
    activeSpan.classList.add("active");

    var encoded = span.getAttribute("data-note");
    activeNoteHtml = atob(encoded);

    if (isMobile()) {
      showModal(activeNoteHtml);
    } else {
      showSidebar(activeNoteHtml);
    }
  }

  /* ---- Init ---- */
  function init() {
    sidebar = document.getElementById("sidenote-sidebar");
    modal = document.getElementById("sidenote-modal");
    modalBody = document.getElementById("sidenote-modal-body");
    modalClose = document.getElementById("sidenote-modal-close");
    modalBackdrop = document.getElementById("sidenote-modal-backdrop");

    // Attach sidenote click handlers
    var notes = document.querySelectorAll(".sidenote");
    for (var i = 0; i < notes.length; i++) {
      notes[i].addEventListener("click", onSidenoteClick);
    }

    // Modal close
    if (modalClose) {
      modalClose.addEventListener("click", function (e) {
        e.stopPropagation();
        dismiss();
      });
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", function () {
        dismiss();
      });
    }

    // Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") dismiss();
    });

    // Clean up on resize across breakpoint
    window
      .matchMedia("(max-width: 1199px)")
      .addEventListener("change", function () {
        dismiss();
      });

    document.addEventListener("blogsettingschange", function () {
      if (!activeSpan) return;
      showSidebar(activeNoteHtml);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
