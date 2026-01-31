class VisitorCounter {
  constructor() {
    this.key = 'rosft_visitor_counter';
    this.initializeCounter();
  }

  initializeCounter() {
    let count = localStorage.getItem(this.key);
    
    if (!count) {
      count = 1;
    } else {
      count = parseInt(count) + 1;
    }
    
    localStorage.setItem(this.key, count);
    this.displayCount(count);
  }

  displayCount(count) {
    // Cari semua element dengan class visitor-counter
    const elements = document.querySelectorAll('.visitor-counter');
    elements.forEach(el => {
      el.textContent = count.toLocaleString();
    });
  }
}

// Jalankan saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  new VisitorCounter();
});