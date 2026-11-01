/**
 * IT-FESTIVAL 2026 — OVERLAY CORE MOTION ENGINE (PRO REVISION)
 * Flawless Mario physics (requestAnimationFrame), zero-glitch Pacman devour,
 * and authentic retro video game arcade opening sequence.
 */

class SponsorOverlayController {
  constructor() {
    this.channel = new SponsorChannel('overlay');
    this.audio = window.retroAudio;
    this.currentSponsor = null;
    this.isAnimating = false;
    this.idleTimer = null;
    this.hudTimer = null;
    this.score = 26000;
    this.coins = 12;
    this.time = 365;

    // Mario Physics State
    this.marioX = 140;
    this.marioY = 60; // bottom offset (ground level = 60)
    this.marioDirection = 1; // 1 = right, -1 = left
    this.marioAction = 'idle';
    this.walkAnimDistance = 0;
    this.walkAnimIndex = 1;

    this.initDOM();
    this.initSprites();
    this.initChannelListeners();
    this.startHUDTimer();
    this.startIdleLoop();

    // Check URL parameters (e.g. ?transparent=1 or ?intro=1)
    const params = new URLSearchParams(window.location.search);
    if (params.get('transparent') === '1' || params.get('transparent') === 'true') {
      document.body.classList.add('transparent-mode');
    }

    if (params.get('intro') === '1' || params.get('intro') === 'true') {
      setTimeout(() => this.playIntro(), 400);
    }
  }

  initDOM() {
    this.marioActor = document.getElementById('mario-actor');
    this.pacmanActor = document.getElementById('pacman-actor');
    this.sponsorCard = document.getElementById('sponsor-card');
    this.sponsorLogo = document.getElementById('sponsor-logo-img');
    this.sponsorName = document.getElementById('sponsor-name');
    this.sponsorTagline = document.getElementById('sponsor-tagline');
    this.sponsorTier = document.getElementById('sponsor-tier-badge');
    this.openingCurtain = document.getElementById('opening-curtain');
    this.stageBanner = document.getElementById('stage-start-banner');
    this.warpPipe = document.getElementById('warp-pipe');
    this.piranhaPlant = document.getElementById('piranha-plant');
    this.goombaActor = document.getElementById('goomba-actor');
    this.bushLeft = document.getElementById('bush-left');
    this.bushRight = document.getElementById('bush-right');
    this.arenaCastle = document.getElementById('arena-castle');
    this.skyGhost = document.getElementById('sky-ghost');
    this.overlayMarquee = document.getElementById('overlay-marquee');
    this.crtOverlay = document.getElementById('crt-overlay');
    this.hudScore = document.getElementById('hud-score');
    this.hudCoins = document.getElementById('hud-coins');
    this.hudTime = document.getElementById('hud-time');
    this.activeSponsorPill = document.getElementById('hud-active-sponsor');

    // Click anywhere on opening curtain to start immediately
    if (this.openingCurtain) {
      this.openingCurtain.addEventListener('click', () => {
        if (!this.openingCurtain.classList.contains('hidden')) {
          this.executeIntroGameStart();
        }
      });
    }

    // Boo Easter Egg click
    const boo = document.getElementById('boo-actor');
    if (boo) {
      boo.addEventListener('click', () => {
        this.audio.playCoin();
        this.addScore(500);
      });
    }

    // Spacebar to skip or test intro
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.openingCurtain && !this.openingCurtain.classList.contains('hidden')) {
        this.executeIntroGameStart();
      }
    });

    this.renderMarioTransform();
    this.startGoombaPatrol();
  }

  initSprites() {
    this.setMarioSprite('idle');

    if (this.warpPipe) this.warpPipe.innerHTML = SpriteFactory.getWarpPipeSVG();
    if (this.piranhaPlant) this.piranhaPlant.innerHTML = SpriteFactory.getPiranhaPlantSVG();
    if (this.pacmanActor) this.pacmanActor.innerHTML = SpriteFactory.getPacmanSVG();
    if (this.bushLeft) this.bushLeft.innerHTML = SpriteFactory.getMarioBushSVG();
    if (this.bushRight) this.bushRight.innerHTML = SpriteFactory.getMarioBushSVG();
    if (this.arenaCastle) this.arenaCastle.innerHTML = SpriteFactory.getCastleSVG();
    if (this.skyGhost) this.skyGhost.innerHTML = SpriteFactory.getPacmanGhostSVG('#00E5FF', 'left');

    const boo = document.getElementById('boo-actor');
    if (boo) boo.innerHTML = SpriteFactory.getBooSVG();

    const blocksContainer = document.getElementById('blocks-row');
    if (blocksContainer) {
      blocksContainer.innerHTML = `
        <div class="arena-block" id="block-0">${SpriteFactory.getBrickBlockSVG()}</div>
        <div class="arena-block question-block" id="block-1" data-index="1">${SpriteFactory.getQuestionBlockSVG()}</div>
        <div class="arena-block" id="block-2">${SpriteFactory.getBrickBlockSVG()}</div>
        <div class="arena-block question-block" id="block-3" data-index="3">${SpriteFactory.getQuestionBlockSVG()}</div>
        <div class="arena-block" id="block-4">${SpriteFactory.getBrickBlockSVG()}</div>
      `;
    }
  }

  setMarioSprite(state) {
    if (!this.marioActor) return;
    this.marioAction = state;
    this.marioActor.innerHTML = SpriteFactory.getMarioSVG(state);
  }

  renderMarioTransform(extraTransform = '') {
    if (!this.marioActor) return;
    const scaleX = this.marioDirection === -1 ? -1 : 1;
    const yOffset = -(this.marioY - 60);
    this.marioActor.style.transform = `translate3d(${this.marioX}px, ${yOffset}px, 0) scaleX(${scaleX}) ${extraTransform}`;
  }

  // --- PATROLLING GOOMBA NPC ---
  startGoombaPatrol() {
    if (!this.goombaActor) return;
    
    let goombaX = 460;
    let goombaDir = 1;
    let frame = 0;
    let lastFrameSwap = 0;
    const minX = 360;
    const maxX = 640;

    const step = (now) => {
      goombaX += goombaDir * 0.9;
      if (goombaX > maxX) {
        goombaX = maxX;
        goombaDir = -1;
      } else if (goombaX < minX) {
        goombaX = minX;
        goombaDir = 1;
      }

      if (now - lastFrameSwap > 220) {
        lastFrameSwap = now;
        frame = frame === 0 ? 1 : 0;
        this.goombaActor.innerHTML = SpriteFactory.getGoombaSVG(frame);
      }

      this.goombaActor.style.transform = `translate3d(${goombaX}px, 0, 0)`;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  initChannelListeners() {
    this.channel.on('SHOW_SPONSOR', (payload) => {
      if (!payload || !payload.sponsor) return;
      this.triggerShowSponsor(payload.sponsor);
    });

    this.channel.on('HIDE_SPONSOR', (payload) => {
      this.triggerHideSponsor(payload && payload.nextSponsor);
    });

    this.channel.on('TRIGGER_INTRO', () => {
      this.playIntro();
    });

    this.channel.on('SET_VOLUME', (payload) => {
      if (payload) {
        if (typeof payload.volume === 'number') this.audio.setVolume(payload.volume);
        if (typeof payload.muted === 'boolean') this.audio.setMuted(payload.muted);
      }
    });

    this.channel.on('SET_TRANSPARENT', (payload) => {
      if (payload && typeof payload.transparent === 'boolean') {
        document.body.classList.toggle('transparent-mode', payload.transparent);
      }
    });

    this.channel.on('SET_CRT', (payload) => {
      if (payload && typeof payload.enabled === 'boolean') {
        if (this.crtOverlay) this.crtOverlay.style.display = payload.enabled ? 'block' : 'none';
      }
    });

    // Remote widget visibility toggle
    this.channel.on('TOGGLE_WIDGET', (payload) => {
      if (!payload) return;
      const { widget, visible } = payload;
      const displayVal = visible ? 'block' : 'none';

      if (widget === 'marquee' && this.overlayMarquee) {
        this.overlayMarquee.style.display = visible ? 'flex' : 'none';
      } else if (widget === 'npcs') {
        if (this.goombaActor) this.goombaActor.style.display = displayVal;
        if (this.piranhaPlant) this.piranhaPlant.style.display = displayVal;
      }
    });

    this.channel.on('REQUEST_STATE', () => {
      this.broadcastState();
    });

    setTimeout(() => this.broadcastState(), 500);
  }

  broadcastState() {
    this.channel.send('STATE_UPDATE', {
      currentSponsor: this.currentSponsor,
      isAnimating: this.isAnimating,
      overlayReady: true,
      score: this.score,
      coins: this.coins
    });
  }

  addScore(pts) {
    this.score += pts;
    if (this.hudScore) this.hudScore.textContent = String(this.score).padStart(6, '0');
  }

  addCoin() {
    this.coins += 1;
    if (this.hudCoins) this.hudCoins.textContent = 'x' + String(this.coins).padStart(2, '0');
    this.addScore(100);
  }

  startHUDTimer() {
    this.hudTimer = setInterval(() => {
      this.time = Math.max(0, this.time - 1);
      if (this.hudTime) this.hudTime.textContent = String(this.time).padStart(3, '0');
    }, 1000);
  }

  createDust(x, y, dx = -10) {
    const dust = document.createElement('div');
    dust.className = 'mario-dust';
    dust.style.left = `${x}px`;
    dust.style.bottom = `${y}px`;
    dust.style.setProperty('--dust-x', `${dx}px`);
    document.body.appendChild(dust);
    setTimeout(() => dust.remove(), 350);
  }

  // ==========================================================================
  // AUTHENTIC VIDEO GAME ARCADE OPENING INTRO
  // ==========================================================================
  playIntro() {
    if (!this.openingCurtain) return;
    this.isAnimating = true;
    this.openingCurtain.classList.remove('hidden');

    // Trigger boot sound
    this.audio.playArcadeBoot();

    // Reset banner
    if (this.stageBanner) this.stageBanner.classList.remove('active');

    // Auto-proceed after brief display if user doesn't click
    this.introTimeout = setTimeout(() => {
      this.executeIntroGameStart();
    }, 2800);
  }

  executeIntroGameStart() {
    if (this.introTimeout) clearTimeout(this.introTimeout);

    // Hide curtain
    this.openingCurtain.classList.add('hidden');

    // 1. Pipe rumbles & emits dust
    if (this.warpPipe) {
      this.warpPipe.classList.add('pipe-rumble');
      this.audio.playPipeWarp();
      this.createDust(75, 130, -18);
      this.createDust(95, 130, 18);
    }

    // 2. Mario shoots out of pipe doing somersault jump
    this.marioX = 85;
    this.marioY = 120;
    this.marioDirection = 1;
    this.setMarioSprite('jump');
    this.renderMarioTransform();

    setTimeout(() => {
      if (this.warpPipe) this.warpPipe.classList.remove('pipe-rumble');

      // Parabolic jump arc from pipe onto ground
      const startX = 85;
      const targetX = 220;
      const duration = 650;
      const startTime = performance.now();

      const jumpArc = (now) => {
        const p = Math.min(1, (now - startTime) / duration);
        this.marioX = startX + (targetX - startX) * p;
        
        // Arc: start at 120, jump to 220, land at 60
        const arcY = Math.sin(p * Math.PI) * 110;
        this.marioY = (120 - 60 * p) + arcY;
        
        // Spin Mario in air
        const rotation = p * 360;
        this.renderMarioTransform(`rotate(${rotation}deg)`);

        if (p < 1) {
          requestAnimationFrame(jumpArc);
        } else {
          // Mario Lands!
          this.marioY = 60;
          this.renderMarioTransform('scale(1.2, 0.8)'); // squash upon landing
          this.createDust(this.marioX - 10, 60, -16);
          this.createDust(this.marioX + 30, 60, 16);
          this.audio.playJump();

          setTimeout(() => {
            this.setMarioSprite('cheer');
            this.renderMarioTransform();

            // 3. Drop "WORLD 1-1: SPONSOR ARENA" banner & play fanfare
            if (this.stageBanner) this.stageBanner.classList.add('active');
            this.audio.playLevelStartTheme();

            setTimeout(() => {
              if (this.stageBanner) this.stageBanner.classList.remove('active');
              this.setMarioSprite('idle');
              this.isAnimating = false;
              this.broadcastState();
            }, 1800);
          }, 150);
        }
      };

      requestAnimationFrame(jumpArc);
    }, 300);
  }

  // ==========================================================================
  // ULTRA-SMOOTH MARIO MOVEMENT (requestAnimationFrame with physics)
  // ==========================================================================
  walkMarioTo(targetX, onComplete) {
    if (this.isAnimating && !onComplete) return;

    const startX = this.marioX;
    const distance = targetX - startX;
    if (Math.abs(distance) < 2) {
      if (onComplete) onComplete();
      return;
    }

    const newDirection = distance > 0 ? 1 : -1;

    // If changing direction while walking fast, trigger skid!
    if (this.marioDirection !== newDirection) {
      this.marioDirection = newDirection;
      this.setMarioSprite('skid');
      this.audio.playSkid();
      this.createDust(this.marioX, 60, -newDirection * 15);
      this.renderMarioTransform();
    }

    // Speed: ~240px per second (feels natural, responsive, and smooth)
    const duration = Math.min(1800, Math.max(350, (Math.abs(distance) / 240) * 1000));
    const startTime = performance.now();
    let lastDustTime = 0;

    const walkFrames = ['walk1', 'walk2', 'walk3', 'walk2'];
    let frameStep = 0;

    const step = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);

      // Smoothstep easing for organic acceleration & deceleration
      const ease = p * p * (3 - 2 * p);
      this.marioX = startX + distance * ease;

      // Cycle walk frames based on distance traveled
      frameStep = Math.floor((Math.abs(this.marioX - startX) / 18)) % walkFrames.length;
      this.setMarioSprite(walkFrames[frameStep]);
      this.renderMarioTransform();

      // Emit running dust periodically
      if (now - lastDustTime > 180) {
        lastDustTime = now;
        this.createDust(this.marioX + (newDirection === 1 ? 0 : 36), 60, -newDirection * 10);
      }

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        this.marioX = targetX;
        this.setMarioSprite('idle');
        this.renderMarioTransform();
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // IDLE MARIO LOOP
  // ==========================================================================
  startIdleLoop() {
    if (this.idleTimer) clearInterval(this.idleTimer);

    this.idleTimer = setInterval(() => {
      if (this.isAnimating) return;

      const action = Math.random();

      if (action < 0.45) {
        // Walk smoothly left or right
        const delta = (Math.random() * 120 + 60) * (Math.random() > 0.5 ? 1 : -1);
        const newX = Math.max(120, Math.min(window.innerWidth - 180, this.marioX + delta));
        this.walkMarioTo(newX);
      } else if (action < 0.75) {
        // Jump under a block to get coin!
        this.idleJumpBlock();
      } else {
        // Quick idle look/blink
        this.setMarioSprite('idle');
      }
    }, 4500);
  }

  idleJumpBlock() {
    const questionBlocks = document.querySelectorAll('.question-block');
    if (!questionBlocks.length) return;

    const randomBlock = questionBlocks[Math.floor(Math.random() * questionBlocks.length)];
    const blockRect = randomBlock.getBoundingClientRect();
    const targetX = blockRect.left + blockRect.width / 2 - 24;

    this.walkMarioTo(targetX, () => {
      // Crouch anticipation
      this.setMarioSprite('crouch');
      this.renderMarioTransform('scale(1.15, 0.85)');

      setTimeout(() => {
        // Jump physics arc
        this.setMarioSprite('jump');
        this.audio.playJump();
        this.createDust(this.marioX, 60, 0);

        const startY = 60;
        const peakY = 165;
        const jumpDuration = 480;
        const jumpStartTime = performance.now();
        let hitTriggered = false;

        const jumpStep = (now) => {
          const jp = Math.min(1, (now - jumpStartTime) / jumpDuration);
          
          // Parabolic jump trajectory: sin(jp * PI)
          this.marioY = startY + (peakY - startY) * Math.sin(jp * Math.PI);
          this.renderMarioTransform();

          // Hit at apex
          if (jp >= 0.5 && !hitTriggered) {
            hitTriggered = true;
            randomBlock.classList.add('bumped');
            this.audio.playCoin();
            this.addCoin();
            this.spawnBlockCoin(randomBlock);
            setTimeout(() => randomBlock.classList.remove('bumped'), 200);
          }

          if (jp < 1) {
            requestAnimationFrame(jumpStep);
          } else {
            // Landed
            this.marioY = 60;
            this.setMarioSprite('idle');
            this.renderMarioTransform('scale(1.15, 0.85)'); // landing squish
            this.createDust(this.marioX - 6, 60, -12);
            this.createDust(this.marioX + 30, 60, 12);
            setTimeout(() => this.renderMarioTransform(), 120);
          }
        };

        requestAnimationFrame(jumpStep);
      }, 90);
    });
  }

  spawnBlockCoin(blockElement) {
    const coin = document.createElement('div');
    coin.className = 'popped-coin';
    coin.innerHTML = SpriteFactory.getCoinSVG();

    const scoreFloat = document.createElement('div');
    scoreFloat.className = 'float-score';
    scoreFloat.textContent = '+100';

    blockElement.appendChild(coin);
    blockElement.appendChild(scoreFloat);

    setTimeout(() => {
      coin.remove();
      scoreFloat.remove();
    }, 800);
  }

  // ==========================================================================
  // SHOW SPONSOR: MARIO RUNS, JUMPS & THROWS WITH ZERO-GLITCH REVEAL!
  // ==========================================================================
  triggerShowSponsor(sponsor) {
    if (this.isAnimating) return;

    // If currently displaying a different sponsor, devour with Pacman first!
    if (this.currentSponsor && this.currentSponsor.id !== sponsor.id) {
      this.triggerHideSponsor(sponsor);
      return;
    }

    this.isAnimating = true;
    this.currentSponsor = sponsor;
    this.broadcastState();

    // Ensure sponsor card starts completely hidden with ZERO transition flash
    this.sponsorCard.classList.add('eaten-hidden');
    this.sponsorCard.classList.remove('visible');

    // 1. Mario runs smoothly to throw spot (~25% of screen)
    const launchX = Math.max(140, window.innerWidth * 0.24);
    this.walkMarioTo(launchX, () => {
      // 2. Crouch anticipation
      this.marioDirection = 1;
      this.setMarioSprite('crouch');
      this.renderMarioTransform('scale(1.15, 0.85)');

      setTimeout(() => {
        // 3. Fluid jump arc
        this.setMarioSprite('jump');
        this.audio.playJump();
        this.createDust(this.marioX, 60, 0);

        const startY = 60;
        const peakY = 195;
        const jumpDuration = 550;
        const jumpStartTime = performance.now();
        let throwTriggered = false;

        const jumpStep = (now) => {
          const jp = Math.min(1, (now - jumpStartTime) / jumpDuration);
          this.marioY = startY + (peakY - startY) * Math.sin(jp * Math.PI);
          this.renderMarioTransform();

          // At jump peak, throw fireball!
          if (jp >= 0.45 && !throwTriggered) {
            throwTriggered = true;
            this.setMarioSprite('throw');
            this.audio.playThrow();

            const startX = this.marioX + 38;
            const startYScreen = window.innerHeight - this.marioY - 24;
            const targetRect = this.sponsorCard.getBoundingClientRect();
            const targetX = targetRect.left + targetRect.width / 2;
            const targetY = targetRect.top + targetRect.height / 2;

            this.animateFireball(startX, startYScreen, targetX, targetY, () => {
              // FIREBALL IMPACT!
              this.audio.playPowerup();
              this.createSparkleBurst(targetX, targetY);

              // Populate sponsor data ONLY NOW at impact
              this.sponsorLogo.src = sponsor.logoUrl || '';
              this.sponsorName.textContent = sponsor.name || 'SPONSOR NAME';
              this.sponsorTagline.textContent = sponsor.tagline || 'OFFICIAL EVENT PARTNER';
              
              const tier = (sponsor.tier || 'Gold').toLowerCase();
              this.sponsorTier.className = `badge-tier tier-${tier}`;
              this.sponsorTier.textContent = `★ ${sponsor.tier || 'GOLD'} SPONSOR`;

              if (this.activeSponsorPill) {
                this.activeSponsorPill.textContent = sponsor.name;
              }

              // Reveal card cleanly with spring bounce!
              this.sponsorCard.classList.remove('eaten-hidden');
              this.sponsorCard.style.clipPath = 'none';
              this.sponsorCard.classList.add('visible');
            });
          }

          if (jp < 1) {
            requestAnimationFrame(jumpStep);
          } else {
            // Landed after throw
            this.marioY = 60;
            this.setMarioSprite('cheer');
            this.renderMarioTransform('scale(1.15, 0.85)');
            this.createDust(this.marioX - 6, 60, -12);
            this.createDust(this.marioX + 30, 60, 12);

            setTimeout(() => {
              this.setMarioSprite('idle');
              this.renderMarioTransform();
              this.isAnimating = false;
              this.broadcastState();
            }, 450);
          }
        };

        requestAnimationFrame(jumpStep);
      }, 100);
    });
  }

  animateFireball(startX, startY, targetX, targetY, onHit) {
    const fireball = document.createElement('div');
    fireball.className = 'fireball-projectile';
    document.body.appendChild(fireball);

    const duration = 460;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);

      const currentX = startX + (targetX - startX) * p;
      const linearY = startY + (targetY - startY) * p;
      const arcHeight = Math.sin(p * Math.PI) * 110;
      const currentY = linearY - arcHeight;

      fireball.style.left = `${currentX}px`;
      fireball.style.top = `${currentY}px`;

      if (Math.random() < 0.65) {
        const spark = document.createElement('div');
        spark.className = 'fireball-spark';
        spark.style.left = `${currentX + Math.random() * 8}px`;
        spark.style.top = `${currentY + Math.random() * 8}px`;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 350);
      }

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        fireball.remove();
        if (onHit) onHit();
      }
    };

    requestAnimationFrame(step);
  }

  createSparkleBurst(cx, cy) {
    for (let i = 0; i < 28; i++) {
      const crumb = document.createElement('div');
      crumb.className = 'pixel-crumb';
      const angle = (i / 28) * 2 * Math.PI;
      const dist = Math.random() * 140 + 40;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      
      const colors = ['#F5C800', '#FF3D8A', '#00E5FF', '#FFFFFF', '#10B981'];
      crumb.style.background = colors[i % colors.length];
      crumb.style.left = `${cx}px`;
      crumb.style.top = `${cy}px`;
      crumb.style.setProperty('--dx', `${dx}px`);
      crumb.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(crumb);
      setTimeout(() => crumb.remove(), 450);
    }
  }

  // ==========================================================================
  // HIDE / SWITCH SPONSOR: PACMAN CHOMPS WITH FLAWLESS ZERO-GLITCH CLEANUP!
  // ==========================================================================
  triggerHideSponsor(nextSponsor = null) {
    if (this.isAnimating) return;

    if (!this.currentSponsor && !this.sponsorCard.classList.contains('visible')) {
      if (nextSponsor) this.triggerShowSponsor(nextSponsor);
      return;
    }

    this.isAnimating = true;
    this.broadcastState();

    const screenWidth = window.innerWidth;
    const cardRect = this.sponsorCard.getBoundingClientRect();
    const cardRight = cardRect.right;
    const cardLeft = cardRect.left;
    const cardWidth = cardRect.width;

    // Position Pacman on the far right
    this.pacmanActor.style.display = 'block';
    this.pacmanActor.style.right = '-150px';
    this.pacmanActor.style.top = `${cardRect.top + cardRect.height / 2 - 45}px`;
    this.pacmanActor.classList.add('eating');

    let chompToggle = false;
    const chompInterval = setInterval(() => {
      this.audio.playPacmanChomp(chompToggle);
      chompToggle = !chompToggle;
    }, 120);

    const duration = 1200; // ms
    const startTime = performance.now();

    const sweep = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);

      // Pacman travels from right to left
      const currentX = (screenWidth + 150) - (screenWidth + 350) * p;
      this.pacmanActor.style.left = `${currentX}px`;
      this.pacmanActor.style.right = 'auto';

      // Progressive devour clip-path from right to left
      if (currentX < cardRight && currentX > cardLeft - 100) {
        const eatenPct = Math.max(0, Math.min(100, ((cardRight - currentX) / cardWidth) * 100));
        this.sponsorCard.style.clipPath = `polygon(0% 0%, ${100 - eatenPct}% 0%, ${100 - eatenPct}% 100%, 0% 100%)`;

        if (Math.random() < 0.7) {
          this.audio.playPacmanCrunch();
          const crumb = document.createElement('div');
          crumb.className = 'pixel-crumb';
          crumb.style.left = `${currentX + 20}px`;
          crumb.style.top = `${cardRect.top + Math.random() * cardRect.height}px`;
          crumb.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
          crumb.style.setProperty('--dy', `${(Math.random() - 0.5) * 80}px`);
          document.body.appendChild(crumb);
          setTimeout(() => crumb.remove(), 400);
        }
      }

      if (p < 1) {
        requestAnimationFrame(sweep);
      } else {
        // Devour complete!
        clearInterval(chompInterval);
        this.pacmanActor.classList.remove('eating');
        this.pacmanActor.style.display = 'none';

        // CRITICAL FIX: Hide IMMEDIATELY with .eaten-hidden so no flash happens!
        this.sponsorCard.classList.add('eaten-hidden');
        this.sponsorCard.classList.remove('visible');
        this.sponsorCard.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
        
        // Clear text and logo data so old sponsor never appears
        this.sponsorLogo.src = '';
        this.sponsorName.textContent = '';
        this.sponsorTagline.textContent = '';
        this.currentSponsor = null;
        if (this.activeSponsorPill) this.activeSponsorPill.textContent = 'STANDBY';

        this.isAnimating = false;
        this.broadcastState();

        // If next sponsor is queued, Mario immediately preps and throws!
        if (nextSponsor) {
          setTimeout(() => {
            this.triggerShowSponsor(nextSponsor);
          }, 250);
        }
      }
    };

    requestAnimationFrame(sweep);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.sponsorOverlay = new SponsorOverlayController();
});
