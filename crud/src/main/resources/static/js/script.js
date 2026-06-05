
'use strict';

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// ACTIVE NAV LINK BERDASARKAN HALAMAN SAAT INI
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'Index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'Index.html') {
            link.classList.add('active');
        } else if (currentLocation.includes('Index.html') && linkPath === 'Index.html') {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM VALIDATION
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const pesanInput = document.getElementById('pesan');
    const charCount = document.getElementById('charCount');
    
    // Character counter untuk pesan
    if (pesanInput && charCount) {
        pesanInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = '#dc3545';
                this.value = this.value.substring(0, 500);
            } else if (count > 400) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = '#6c757d';
            }
        });
    }
    
    // Real-time validation
    if (namaInput) {
        namaInput.addEventListener('input', function() {
            validateNama(this);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    if (pesanInput) {
        pesanInput.addEventListener('input', function() {
            validatePesan(this);
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNamaValid = validateNama(namaInput);
        const isEmailValid = validateEmail(emailInput);
        const isPesanValid = validatePesan(pesanInput);
        
        if (isNamaValid && isEmailValid && isPesanValid) {
            // Tampilkan modal konfirmasi
            const modalPreview = document.getElementById('modalPreview');
            if (modalPreview) {
                modalPreview.innerHTML = `
                    <strong>Nama:</strong> ${namaInput.value}<br>
                    <strong>Email:</strong> ${emailInput.value}<br>
                    <strong>Pesan:</strong> ${pesanInput.value.substring(0, 50)}...
                `;
            }
            
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
        } else {
            // Tampilkan alert error
            showAlert('Mohon lengkapi semua field dengan benar!', 'danger');
        }
    });
    
    // Konfirmasi pengiriman
    const confirmSendBtn = document.getElementById('confirmSend');
    if (confirmSendBtn) {
        confirmSendBtn.addEventListener('click', function() {
            // Tutup modal
            const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            confirmModal.hide();
            
            // Tampilkan alert sukses
            showAlert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
            
            // Reset form
            contactForm.reset();
            if (charCount) charCount.textContent = '0';
            
            // Hapus validasi
            const inputs = contactForm.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        });
    }
}

// Fungsi validasi nama
function validateNama(input) {
    const value = input.value.trim();
    const feedback = input.nextElementSibling;
    
    if (value.length < 3) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (feedback) feedback.textContent = 'Nama minimal 3 karakter';
        return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

// Fungsi validasi email
function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const feedback = input.nextElementSibling;
    
    if (!emailRegex.test(value)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (feedback) feedback.textContent = 'Masukkan email yang valid (contoh: nama@domain.com)';
        return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

// Fungsi validasi pesan
function validatePesan(input) {
    const value = input.value.trim();
    const feedback = input.nextElementSibling;
    
    if (value.length < 10) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (feedback) feedback.textContent = 'Pesan minimal 10 karakter';
        return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

// ============================================
// ALERT FUNCTION
// ============================================
function showAlert(message, type = 'success') {
    let alertElement;
    
    if (type === 'success') {
        alertElement = document.getElementById('alertSuccess');
        const messageElement = document.getElementById('alertMessage');
        if (messageElement) messageElement.textContent = message;
    } else {
        alertElement = document.getElementById('alertError');
        const messageElement = document.getElementById('alertErrorMessage');
        if (messageElement) messageElement.textContent = message;
    }
    
    if (alertElement) {
        alertElement.classList.remove('d-none');
        
        // Auto hide setelah 5 detik
        setTimeout(() => {
            alertElement.classList.add('d-none');
        }, 5000);
        
        // Scroll ke alert
        alertElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

 // ============================================
// GALLERY MODAL FUNCTION
// ============================================
function openModal(imageSrc, title, description) {
    var modalImage = document.getElementById('modalImage');
    var modalTitle = document.getElementById('modalTitle');
    var modalHeaderTitle = document.getElementById('modalHeaderTitle');
    var modalDescription = document.getElementById('modalDescription');
    
    if (modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
    }
    
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    
    if (modalHeaderTitle) {
        modalHeaderTitle.innerHTML = '<i class="bi bi-images me-2"></i>' + title;
    }
    
    if (modalDescription) {
        modalDescription.textContent = description;
    }
}

// ============================================
// GALLERY FILTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            var filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    console.log('✅ Gallery siap! Klik gambar untuk melihat modal.');
});

// ============================================
// PROJECT ALERT
// ============================================
function showProjectAlert(projectName) {
    alert('Demo untuk project "' + projectName + '" akan segera tersedia!\n\nTerima kasih atas ketertarikan Anda. 😊');
}

// ============================================
// SKILLS PROGRESS BAR ANIMATION
// ============================================

function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    
    bars.forEach(function(bar) {
        const targetWidth = bar.style.width || bar.getAttribute('data-width');
        
        if (!targetWidth) return;
        
        bar.style.width = '0%';
        bar.style.transition = 'none';
        
        bar.offsetHeight;
        
        bar.style.transition = 'width 1.5s ease';
        bar.style.width = targetWidth;
    });
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateProgressBars, 100);
});

// ============================================
// INISIALISASI TOOLTIPS (BOOTSTRAP)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ============================================
// KONFIRMASI SEBELUM MENINGGALKAN HALAMAN CONTACT
// ============================================
if (contactForm) {
    let formChanged = false;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            formChanged = true;
        });
    });
    
    window.addEventListener('beforeunload', function(e) {
        if (formChanged && contactForm.querySelector('input').value !== '') {
            e.preventDefault();
            e.returnValue = 'Anda memiliki perubahan yang belum disimpan. Yakin ingin meninggalkan halaman?';
        }
    });
    
    // Reset formChanged saat form di-reset
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            formChanged = false;
        });
    }
}

console.log('✅ Portfolio website siap! - M. Fajrun A Adillah Bustam');
console.log('📧 mfajrun01@student.ciputra.ac.id | 📍 Makassar, Indonesia');