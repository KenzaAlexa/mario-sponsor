/**
 * IT-FESTIVAL 2026 — CROSS-WINDOW SYNC PROTOCOL
 * Communicates between Control Panel and Overlay using BroadcastChannel with localStorage fallback.
 */

const CHANNEL_NAME = 'it_fest_2026_sponsor_sync';

class SponsorChannel {
  constructor(role = 'overlay') {
    this.role = role;
    this.channel = null;
    this.listeners = new Map();
    this.init();
  }

  init() {
    // Try BroadcastChannel
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          this.handleRawMessage(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel failed, using localStorage fallback', e);
      }
    }

    // Storage fallback for cross-window / OBS if BroadcastChannel has isolation
    window.addEventListener('storage', (e) => {
      if (e.key === CHANNEL_NAME && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          // Only process messages not sent by self
          if (parsed._sender !== this.role + '_' + this.instanceId) {
            this.handleRawMessage(parsed);
          }
        } catch (err) {
          console.error('Failed to parse storage message', err);
        }
      }
    });

    this.instanceId = Math.random().toString(36).substring(2, 9);
  }

  handleRawMessage(data) {
    if (!data || !data.type) return;
    const callbacks = this.listeners.get(data.type) || [];
    callbacks.forEach(cb => {
      try {
        cb(data.payload, data);
      } catch (e) {
        console.error(`Error in listener for ${data.type}:`, e);
      }
    });

    // Also notify wildcard listeners
    const wildcards = this.listeners.get('*') || [];
    wildcards.forEach(cb => cb(data.type, data.payload, data));
  }

  on(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
    return () => this.off(type, callback);
  }

  off(type, callback) {
    if (!this.listeners.has(type)) return;
    const list = this.listeners.get(type).filter(cb => cb !== callback);
    this.listeners.set(type, list);
  }

  send(type, payload = {}) {
    const message = {
      type,
      payload,
      _sender: `${this.role}_${this.instanceId}`,
      _timestamp: Date.now()
    };

    // 1. Send via BroadcastChannel
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {
        console.warn('BroadcastChannel postMessage error', e);
      }
    }

    // 2. Also write to localStorage for OBS / cross-context compatibility
    try {
      localStorage.setItem(CHANNEL_NAME, JSON.stringify(message));
    } catch (e) {
      // Storage quota or private mode fallback
    }
  }

  // Pre-typed actions
  showSponsor(sponsor) {
    this.send('SHOW_SPONSOR', { sponsor });
  }

  hideSponsor(options = {}) {
    this.send('HIDE_SPONSOR', options);
  }

  triggerIntro() {
    this.send('TRIGGER_INTRO');
  }

  setVolume(volume, muted) {
    this.send('SET_VOLUME', { volume, muted });
  }

  setTransparent(transparent) {
    this.send('SET_TRANSPARENT', { transparent });
  }

  setCRT(enabled) {
    this.send('SET_CRT', { enabled });
  }

  requestState() {
    this.send('REQUEST_STATE');
  }

  updateState(state) {
    this.send('STATE_UPDATE', state);
  }
}

// Export for browser
window.SponsorChannel = SponsorChannel;
