/**
 * IT-FESTIVAL 2026 — SPONSOR CONTROL PANEL ENGINE
 * Manages sponsor data (CRUD), presets, BroadcastChannel commands, and slideshow looping.
 */

// Sample High-Definition SVG Logos as Data URIs for instant out-of-the-box testing!
const DEFAULT_PRESETS = [
  {
    id: 'sp_vixel',
    name: 'VIXEL AI LABS',
    tier: 'Diamond',
    tagline: 'OFFICIAL MENTAL & DIGITAL COMPANION OF IT-FEST',
    logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120"><rect width="240" height="120" rx="12" fill="%23050718"/><circle cx="60" cy="60" r="34" fill="%2300E5FF" stroke="%23F5C800" stroke-width="4"/><rect x="46" y="50" width="10" height="12" rx="3" fill="%23050718"/><rect x="64" y="50" width="10" height="12" rx="3" fill="%23050718"/><path d="M52 74 Q60 82 68 74" stroke="%23050718" stroke-width="4" fill="none" stroke-linecap="round"/><text x="110" y="55" font-family="monospace" font-weight="900" font-size="20" fill="%2300E5FF">VIXEL</text><text x="110" y="76" font-family="monospace" font-weight="700" font-size="14" fill="%23F5C800">AI LABS</text><text x="110" y="94" font-family="sans-serif" font-size="10" fill="%23F5F1E0">INNOVATION PARTNER 2026</text></svg>'
  },
  {
    id: 'sp_wpu',
    name: 'WPU COURSE',
    tier: 'Platinum',
    tagline: 'KEYNOTE SPEAKER & WEB DEVELOPMENT MENTOR',
    logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120"><rect width="240" height="120" rx="12" fill="%23050718"/><rect x="25" y="30" width="60" height="60" rx="8" fill="%23FF3D8A"/><text x="35" y="72" font-family="monospace" font-weight="900" font-size="28" fill="%23FFFFFF">&lt;/&gt;</text><text x="100" y="56" font-family="monospace" font-weight="900" font-size="22" fill="%23FF3D8A">WPU</text><text x="100" y="76" font-family="monospace" font-weight="700" font-size="13" fill="%23F5F1E0">COURSE</text><text x="100" y="93" font-family="sans-serif" font-size="10" fill="%2300E5FF">AVIP SYAIFULLOH</text></svg>'
  },
  {
    id: 'sp_cyber',
    name: 'CYBER DEFENSE CORP',
    tier: 'Gold',
    tagline: 'CAPTURE THE FLAG & CYBER SECURITY SPONSOR',
    logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120"><rect width="240" height="120" rx="12" fill="%23050718"/><polygon points="55,25 85,40 85,75 55,95 25,75 25,40" fill="%23F5C800" stroke="%23050718" stroke-width="3"/><rect x="48" y="50" width="14" height="18" fill="%23050718"/><text x="100" y="55" font-family="monospace" font-weight="900" font-size="18" fill="%23F5C800">CYBER</text><text x="100" y="75" font-family="monospace" font-weight="900" font-size="18" fill="%2300E5FF">DEFENSE</text><text x="100" y="93" font-family="sans-serif" font-size="10" fill="%23F5F1E0">CTF MAIN PARTNER</text></svg>'
  },
  {
    id: 'sp_pixel',
    name: 'PIXEL GAME JAM',
    tier: 'Silver',
    tagline: 'INDIE GAME DEVELOPMENT ACCELERATOR',
    logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120"><rect width="240" height="120" rx="12" fill="%23050718"/><rect x="30" y="35" width="50" height="50" fill="%2310B981" stroke="%23F5F1E0" stroke-width="3"/><rect x="42" y="45" width="10" height="10" fill="%23FFFFFF"/><rect x="58" y="55" width="10" height="10" fill="%23FFFFFF"/><text x="96" y="55" font-family="monospace" font-weight="900" font-size="18" fill="%2310B981">PIXEL JAM</text><text x="96" y="75" font-family="monospace" font-size="12" fill="%23F5F1E0">COMMUNITY</text><text x="96" y="93" font-family="sans-serif" font-size="10" fill="%23F5C800">GAME COMPETITION</text></svg>'
  }
];

class SponsorControlPanel {
  constructor() {
    this.channel = new SponsorChannel('control');
    this.sponsors = [];
    this.activeSponsorId = null;
    this.slideshowTimer = null;
    this.slideshowIndex = 0;
    this.isSlideshowActive = false;
    this.editingId = null;
    this.lastHeartbeat = 0;

    this.initStorage();
    this.initDOM();
    this.initChannel();
    this.renderSponsorsList();
    this.checkHeartbeatLoop();
  }

  initStorage() {
    try {
      const stored = localStorage.getItem('it_fest_sponsors');
      if (stored) {
        this.sponsors = JSON.parse(stored);
      } else {
        this.sponsors = [...DEFAULT_PRESETS];
        this.saveSponsors();
      }
    } catch (e) {
      this.sponsors = [...DEFAULT_PRESETS];
    }
  }

  saveSponsors() {
    try {
      localStorage.setItem('it_fest_sponsors', JSON.stringify(this.sponsors));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  initDOM() {
    // Form elements
    this.form = document.getElementById('sponsor-form');
    this.nameInput = document.getElementById('sponsor-name-input');
    this.tierSelect = document.getElementById('sponsor-tier-select');
    this.taglineInput = document.getElementById('sponsor-tagline-input');
    this.logoFileInput = document.getElementById('sponsor-logo-file');
    this.logoPreviewImg = document.getElementById('form-logo-preview');
    this.btnSubmitForm = document.getElementById('btn-submit-form');
    this.btnCancelEdit = document.getElementById('btn-cancel-edit');

    // Controls
    this.btnHideActive = document.getElementById('btn-hide-active');
    this.btnPlayIntro = document.getElementById('btn-play-intro');
    this.btnSlideshowToggle = document.getElementById('btn-slideshow-toggle');
    this.slideshowIntervalSelect = document.getElementById('slideshow-interval');
    this.audioMuteCheck = document.getElementById('audio-mute-toggle');
    this.audioVolumeRange = document.getElementById('audio-volume-slider');
    this.bgTransparentCheck = document.getElementById('bg-transparent-toggle');
    this.crtToggleCheck = document.getElementById('crt-toggle');
    this.connectionDot = document.getElementById('connection-dot');
    this.connectionText = document.getElementById('connection-text');
    this.activeSponsorText = document.getElementById('active-sponsor-text');
    this.logConsole = document.getElementById('activity-log-console');

    // File upload event
    this.logoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          this.currentLogoDataUrl = loadEvent.target.result;
          this.logoPreviewImg.src = this.currentLogoDataUrl;
          this.logoPreviewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    // Form submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    if (this.btnCancelEdit) {
      this.btnCancelEdit.addEventListener('click', () => {
        this.resetForm();
      });
    }

    // Hide active button
    this.btnHideActive.addEventListener('click', () => {
      this.stopSlideshow();
      this.channel.hideSponsor();
      this.log('Pacman devour command triggered!', 'alert');
    });

    // Intro button
    this.btnPlayIntro.addEventListener('click', () => {
      this.channel.triggerIntro();
      this.log('Opening Intro triggered!', 'success');
    });

    // Slideshow button
    this.btnSlideshowToggle.addEventListener('click', () => {
      if (this.isSlideshowActive) {
        this.stopSlideshow();
      } else {
        this.startSlideshow();
      }
    });

    // Sound controls
    this.audioMuteCheck.addEventListener('change', () => {
      this.channel.setVolume(parseFloat(this.audioVolumeRange.value), this.audioMuteCheck.checked);
    });

    this.audioVolumeRange.addEventListener('input', () => {
      this.channel.setVolume(parseFloat(this.audioVolumeRange.value), this.audioMuteCheck.checked);
    });

    // Overlay Transparency
    this.bgTransparentCheck.addEventListener('change', () => {
      this.channel.setTransparent(this.bgTransparentCheck.checked);
      this.log(`Overlay Transparency set to: ${this.bgTransparentCheck.checked ? 'TRANSPARENT' : 'FULL RETRO STAGE'}`);
    });

    // CRT Toggle
    this.crtToggleCheck.addEventListener('change', () => {
      this.channel.setCRT(this.crtToggleCheck.checked);
    });

    // Widget Visibility Toggles
    const toggleMarquee = document.getElementById('toggle-widget-marquee');
    if (toggleMarquee) {
      toggleMarquee.addEventListener('change', () => {
        this.channel.send('TOGGLE_WIDGET', { widget: 'marquee', visible: toggleMarquee.checked });
        this.log(`Running Marquee ${toggleMarquee.checked ? 'ditampilkan' : 'disembunyikan'}.`);
      });
    }

    const toggleNpcs = document.getElementById('toggle-widget-npcs');
    if (toggleNpcs) {
      toggleNpcs.addEventListener('change', () => {
        this.channel.send('TOGGLE_WIDGET', { widget: 'npcs', visible: toggleNpcs.checked });
        this.log(`Arena Goomba & Piranha ${toggleNpcs.checked ? 'ditampilkan' : 'disembunyikan'}.`);
      });
    }

    // Reset presets button
    const btnReset = document.getElementById('btn-reset-presets');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Kembalikan sponsor ke template bawaan IT-Fest?')) {
          this.sponsors = [...DEFAULT_PRESETS];
          this.saveSponsors();
          this.renderSponsorsList();
          this.log('Preset sponsors dipulihkan ke default.');
        }
      });
    }

    this.log('Control Room siap! BroadcastChannel terhubung.');
  }

  initChannel() {
    this.channel.on('STATE_UPDATE', (payload) => {
      this.lastHeartbeat = Date.now();
      this.setConnected(true);

      if (payload) {
        if (payload.currentSponsor) {
          this.activeSponsorId = payload.currentSponsor.id;
          if (this.activeSponsorText) {
            this.activeSponsorText.textContent = `${payload.currentSponsor.name} (${payload.currentSponsor.tier})`;
          }
        } else {
          this.activeSponsorId = null;
          if (this.activeSponsorText) {
            this.activeSponsorText.textContent = 'STANDBY (KOSONG)';
          }
        }
        this.updateActiveCardHighlights();
      }
    });

    // Request state from overlay
    this.channel.requestState();
  }

  checkHeartbeatLoop() {
    setInterval(() => {
      const isOnline = Date.now() - this.lastHeartbeat < 4000;
      this.setConnected(isOnline);
      // ping
      this.channel.requestState();
    }, 2500);
  }

  setConnected(online) {
    if (online) {
      this.connectionDot.classList.add('online');
      this.connectionText.textContent = 'OVERLAY ONLINE';
    } else {
      this.connectionDot.classList.remove('online');
      this.connectionText.textContent = 'STANDBY / OFFLINE';
    }
  }

  log(message, type = '') {
    if (!this.logConsole) return;
    const time = new Date().toLocaleTimeString('id-ID');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `<span class="log-time">[${time}]</span> ${message}`;
    this.logConsole.appendChild(entry);
    this.logConsole.scrollTop = this.logConsole.scrollHeight;
  }

  // --- CRUD SPONSORS ---
  handleFormSubmit() {
    const name = this.nameInput.value.trim();
    const tier = this.tierSelect.value;
    const tagline = this.taglineInput.value.trim();
    const logoUrl = this.currentLogoDataUrl || (this.editingId ? this.getSponsorById(this.editingId)?.logoUrl : '') || DEFAULT_PRESETS[0].logoUrl;

    if (!name) {
      alert('Mohon isi nama sponsor!');
      return;
    }

    if (this.editingId) {
      // Update
      const index = this.sponsors.findIndex(s => s.id === this.editingId);
      if (index !== -1) {
        this.sponsors[index] = {
          ...this.sponsors[index],
          name,
          tier,
          tagline,
          logoUrl
        };
        this.log(`Sponsor "${name}" berhasil diperbarui.`, 'success');
      }
    } else {
      // Create
      const newSponsor = {
        id: 'sp_' + Date.now().toString(36),
        name,
        tier,
        tagline: tagline || 'OFFICIAL EVENT PARTNER',
        logoUrl
      };
      this.sponsors.push(newSponsor);
      this.log(`Sponsor baru "${name}" berhasil ditambahkan!`, 'success');
    }

    this.saveSponsors();
    this.renderSponsorsList();
    this.resetForm();
  }

  getSponsorById(id) {
    return this.sponsors.find(s => s.id === id);
  }

  editSponsor(id) {
    const sponsor = this.getSponsorById(id);
    if (!sponsor) return;

    this.editingId = id;
    this.nameInput.value = sponsor.name;
    this.tierSelect.value = sponsor.tier;
    this.taglineInput.value = sponsor.tagline || '';
    this.currentLogoDataUrl = sponsor.logoUrl;
    this.logoPreviewImg.src = sponsor.logoUrl;
    this.logoPreviewImg.style.display = 'block';

    this.btnSubmitForm.textContent = '💾 SIMPAN PERUBAHAN';
    if (this.btnCancelEdit) this.btnCancelEdit.style.display = 'inline-flex';
    this.nameInput.focus();
  }

  deleteSponsor(id) {
    const sponsor = this.getSponsorById(id);
    if (!sponsor) return;

    if (confirm(`Hapus sponsor "${sponsor.name}"?`)) {
      this.sponsors = this.sponsors.filter(s => s.id !== id);
      this.saveSponsors();
      this.renderSponsorsList();
      this.log(`Sponsor "${sponsor.name}" dihapus.`, 'alert');
    }
  }

  resetForm() {
    this.editingId = null;
    this.form.reset();
    this.currentLogoDataUrl = null;
    this.logoPreviewImg.src = '';
    this.logoPreviewImg.style.display = 'none';
    this.btnSubmitForm.textContent = '➕ TAMBAH KE DAFTAR';
    if (this.btnCancelEdit) this.btnCancelEdit.style.display = 'none';
  }

  // --- TRIGGER ACTIONS ---
  triggerSponsor(id) {
    const sponsor = this.getSponsorById(id);
    if (!sponsor) return;

    this.channel.showSponsor(sponsor);
    this.activeSponsorId = id;
    this.updateActiveCardHighlights();
    this.log(`🎯 Mario melempar sponsor: ${sponsor.name} (${sponsor.tier})`, 'success');
  }

  updateActiveCardHighlights() {
    document.querySelectorAll('.control-sponsor-card').forEach(card => {
      const cardId = card.getAttribute('data-id');
      if (cardId === this.activeSponsorId) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });
  }

  renderSponsorsList() {
    const container = document.getElementById('sponsors-grid');
    if (!container) return;

    if (this.sponsors.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-cream-muted); font-family: var(--font-mono);">
          Belum ada sponsor terdaftar. Silakan tambahkan sponsor melalui form di samping atau klik "Kembalikan Preset".
        </div>
      `;
      return;
    }

    container.innerHTML = this.sponsors.map((s, index) => {
      const tierClass = (s.tier || 'Gold').toLowerCase();
      const isActive = s.id === this.activeSponsorId;

      return `
        <div class="control-sponsor-card ${isActive ? 'is-active' : ''}" data-id="${s.id}">
          <div class="active-glow-tag">★ ACTIVE ON STREAM</div>
          
          <div class="card-top-info">
            <div class="card-logo-thumb">
              <img src="${s.logoUrl}" alt="${s.name}">
            </div>
            <div class="card-meta">
              <span class="badge-tier tier-${tierClass}">★ ${s.tier}</span>
              <div class="card-name">${s.name}</div>
              <div class="card-tagline">${s.tagline || ''}</div>
            </div>
          </div>

          <div class="card-actions">
            <button class="press-btn btn-yellow btn-trigger-mario" onclick="window.controlPanel.triggerSponsor('${s.id}')">
              🎯 TAMPILKAN
            </button>
            <button class="press-btn btn-dark" title="Edit Sponsor" onclick="window.controlPanel.editSponsor('${s.id}')">
              ✏️
            </button>
            <button class="press-btn btn-pink" title="Hapus Sponsor" onclick="window.controlPanel.deleteSponsor('${s.id}')">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- AUTO-SLIDESHOW LOOP ---
  startSlideshow() {
    if (!this.sponsors.length) {
      alert('Tambahkan sponsor terlebih dahulu sebelum memulai slideshow!');
      return;
    }

    this.isSlideshowActive = true;
    this.btnSlideshowToggle.classList.remove('btn-yellow');
    this.btnSlideshowToggle.classList.add('btn-pink');
    this.btnSlideshowToggle.innerHTML = '⏹ STOP SLIDESHOW';

    const intervalSec = parseInt(this.slideshowIntervalSelect.value, 10) || 10;
    this.log(`Auto-Slideshow dimulai! Pergantian setiap ${intervalSec} detik.`, 'success');

    // Trigger first sponsor
    this.slideshowIndex = 0;
    this.triggerSponsor(this.sponsors[this.slideshowIndex].id);

    this.slideshowTimer = setInterval(() => {
      this.slideshowIndex = (this.slideshowIndex + 1) % this.sponsors.length;
      const nextSponsor = this.sponsors[this.slideshowIndex];
      // Pacman will devour previous and Mario will throw next!
      this.channel.hideSponsor({ nextSponsor });
      this.log(`Slideshow next: Pacman memakan lalu Mario melempar ${nextSponsor.name}`);
    }, intervalSec * 1000);
  }

  stopSlideshow() {
    if (!this.isSlideshowActive) return;
    this.isSlideshowActive = false;
    clearInterval(this.slideshowTimer);
    this.slideshowTimer = null;
    this.btnSlideshowToggle.classList.remove('btn-pink');
    this.btnSlideshowToggle.classList.add('btn-yellow');
    this.btnSlideshowToggle.innerHTML = '🔄 AUTO-SLIDESHOW';
    this.log('Auto-Slideshow dihentikan.');
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.controlPanel = new SponsorControlPanel();
});
