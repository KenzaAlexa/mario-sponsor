/**
 * IT-FESTIVAL 2026 — RETRO PIXEL SPRITE FACTORY
 * Generates high-definition, scalable pixel art vector sprites for Mario, Pacman,
 * Question Blocks, Warp Pipes, Coins, Boo, and Goomba.
 */

const SpriteFactory = {
  /**
   * Mario Sprite (SVG Pixel Matrix)
   * Rendered on a 16x16 or 24x24 pixel grid with authentic retro coloring.
   * Supports states: idle, walk1, walk2, jump, throw, cheer.
   */
  getMarioSVG(state = 'idle') {
    // Colors
    const R = '#E52521'; // Red (Cap/Shirt)
    const B = '#002688'; // Blue (Overalls)
    const S = '#FCC082'; // Skin/Face
    const H = '#6B4000'; // Brown (Hair/Mustache/Shoes)
    const Y = '#FCD800'; // Yellow (Buttons)
    const W = '#FFFFFF'; // White (Gloves)
    const K = '#000000'; // Black/Eyes
    const _ = 'transparent';

    let grid = [];

    if (state === 'idle') {
      // 16x16 Classic Mario Idle
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,R,R,B,R,R,R,_,_,_,_,_,_],
        [_,_,_,R,R,R,B,R,R,B,R,R,R,_,_,_],
        [_,_,R,R,R,R,B,B,B,B,R,R,R,R,_,_],
        [_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,W,W,W,B,B,B,B,B,B,W,W,W,_,_],
        [_,_,W,W,B,B,B,B,B,B,B,B,W,W,_,_],
        [_,_,_,_,B,B,B,_,_,B,B,B,_,_,_,_],
        [_,_,_,H,H,H,_,_,_,_,H,H,H,_,_,_],
        [_,_,H,H,H,H,_,_,_,_,H,H,H,H,_,_]
      ];
    } else if (state === 'walk1') {
      // Walk frame 1 (Left leg forward)
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,R,R,B,R,R,R,_,_,_,_,_,_],
        [_,_,_,R,R,R,B,R,R,B,R,R,R,_,_,_],
        [_,_,R,R,R,R,B,B,B,B,R,R,R,R,_,_],
        [_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,W,W,W,B,B,B,B,B,B,W,W,W,_,_],
        [_,_,_,W,B,B,B,B,B,B,B,B,W,_,_,_],
        [_,_,_,_,B,B,B,_,B,B,B,_,_,_,_,_],
        [_,_,_,_,H,H,H,_,_,H,H,H,_,_,_,_],
        [_,_,_,H,H,H,H,_,_,_,H,H,H,H,_,_]
      ];
    } else if (state === 'walk2') {
      // Walk frame 2 (Mid-stride)
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,R,R,B,R,R,R,_,_,_,_,_,_],
        [_,_,_,R,R,R,B,R,R,B,R,R,R,_,_,_],
        [_,_,R,R,R,R,B,B,B,B,R,R,R,R,_,_],
        [_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,_,W,W,B,B,B,B,B,B,W,W,_,_,_],
        [_,_,_,_,B,B,B,B,B,B,B,B,_,_,_,_],
        [_,_,_,_,B,B,B,B,B,B,B,_,_,_,_,_],
        [_,_,_,H,H,H,H,H,H,_,_,_,_,_,_,_],
        [_,_,H,H,H,H,H,H,_,_,_,_,_,_,_,_]
      ];
    } else if (state === 'walk3') {
      // Walk frame 3 (Right leg forward)
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,_,R,R,B,R,R,R,_,_,_,_,_],
        [_,_,_,_,R,R,R,B,R,R,B,R,R,_,_,_],
        [_,_,_,R,R,R,R,B,B,B,B,R,R,R,_,_],
        [_,_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_],
        [_,_,_,W,W,W,B,B,B,B,B,B,W,W,W,_],
        [_,_,_,_,W,B,B,B,B,B,B,B,B,W,_,_],
        [_,_,_,_,_,B,B,B,_,B,B,B,_,_,_,_],
        [_,_,_,_,H,H,H,_,_,_,H,H,H,_,_,_],
        [_,_,_,H,H,H,H,_,_,_,_,H,H,H,H,_]
      ];
    } else if (state === 'skid') {
      // Skid Frame (Facing backward with cap tipped back!)
      grid = [
        [_,_,_,_,_,_,R,R,R,R,R,_,_,_,_,_],
        [_,_,_,_,_,R,R,R,R,R,R,R,R,R,_,_],
        [_,_,_,_,_,H,H,H,S,S,K,S,_,_,_,_],
        [_,_,_,_,H,S,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,_,H,S,H,H,S,S,S,K,S,S,S,_],
        [_,_,_,_,H,H,S,S,S,S,H,H,H,H,_,_],
        [_,_,_,_,_,_,S,S,S,S,S,S,S,_,_,_],
        [_,_,_,W,W,R,R,B,R,R,_,_,_,_,_,_],
        [_,_,W,W,R,R,R,B,R,R,B,R,R,_,_,_],
        [_,_,W,R,R,R,R,B,B,B,B,R,R,R,_,_],
        [_,_,_,_,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,_,_,_,B,B,B,B,B,B,W,W,W,_,_],
        [_,_,_,_,B,B,B,B,B,B,B,B,W,W,_,_],
        [_,_,_,H,H,H,H,_,_,B,B,B,_,_,_,_],
        [_,_,H,H,H,H,H,H,_,_,H,H,H,_,_,_],
        [_,_,H,H,H,H,H,H,_,_,H,H,H,H,_,_]
      ];
    } else if (state === 'crouch') {
      // Crouch / Squat Frame (Squashed down)
      grid = [
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,R,R,R,B,B,B,B,R,R,R,_,_,_],
        [_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,W,W,W,B,B,B,B,B,B,W,W,W,_,_],
        [_,_,W,W,B,B,B,B,B,B,B,B,W,W,_,_],
        [_,_,_,B,B,B,B,B,B,B,B,B,B,_,_,_],
        [_,_,H,H,H,H,_,_,_,_,H,H,H,H,_,_],
        [_,_,H,H,H,H,H,_,_,H,H,H,H,H,_,_]
      ];
    } else if (state === 'jump') {
      // Jump Pose (Fist Up!)
      grid = [
        [_,_,_,_,_,_,_,_,R,R,R,R,R,_,_,_],
        [_,_,_,_,_,_,_,R,R,R,R,R,R,R,R,R],
        [_,_,_,_,_,_,_,H,H,H,S,S,K,S,_,_],
        [_,_,_,_,_,_,H,S,H,S,S,S,K,S,S,S],
        [_,_,_,_,_,_,H,S,H,H,S,S,S,K,S,S],
        [_,_,_,_,_,_,H,H,S,S,S,S,H,H,H,H],
        [_,_,_,_,_,_,_,_,S,S,S,S,S,S,S,_],
        [_,_,_,_,_,W,W,R,R,B,R,R,_,_,_,_],
        [_,_,_,_,W,W,W,R,R,B,R,R,R,_,_,_],
        [_,_,_,W,W,W,R,R,B,B,B,B,R,R,_,_],
        [_,_,_,_,W,R,R,B,Y,B,B,Y,B,R,_,_],
        [_,_,_,_,_,B,B,B,B,B,B,B,B,B,_,_],
        [_,_,_,_,B,B,B,B,B,B,B,B,B,B,_,_],
        [_,_,_,H,H,H,B,B,B,_,_,_,_,_,_,_],
        [_,_,H,H,H,H,H,B,B,_,_,_,_,_,_,_],
        [_,_,_,_,_,_,_,_,_,_,_,H,H,H,H,_]
      ];
    } else if (state === 'throw') {
      // Throw Pose (Arm extended forward/upward, releasing projectile)
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,R,R,B,R,R,W,W,W,W,_,_,_],
        [_,_,_,R,R,R,B,R,R,W,W,W,W,_,_,_],
        [_,_,R,R,R,R,B,B,B,B,R,R,R,_,_,_],
        [_,W,W,R,R,B,Y,B,B,Y,B,R,_,_,_,_],
        [_,W,W,W,B,B,B,B,B,B,B,_,_,_,_,_],
        [_,_,W,B,B,B,B,B,B,B,B,_,_,_,_,_],
        [_,_,_,B,B,B,_,_,B,B,B,_,_,_,_,_],
        [_,_,H,H,H,_,_,_,_,H,H,H,_,_,_,_],
        [_,H,H,H,H,_,_,_,_,H,H,H,H,_,_,_]
      ];
    } else if (state === 'cheer') {
      // Cheer / Victory Pose (Both fists in the air!)
      grid = [
        [_,W,W,_,_,_,R,R,R,R,R,_,_,_,W,W],
        [_,W,W,W,_,R,R,R,R,R,R,R,R,W,W,W],
        [_,_,W,W,_,H,H,H,S,S,K,S,_,W,W,_],
        [_,_,_,_,H,S,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,_,H,S,H,H,S,S,S,K,S,S,S,_],
        [_,_,_,_,H,H,S,S,S,S,H,H,H,H,_,_],
        [_,_,_,_,_,_,S,S,S,S,S,S,S,_,_,_],
        [_,_,_,_,R,R,R,B,R,R,R,R,_,_,_,_],
        [_,_,_,R,R,R,R,B,R,R,B,R,R,_,_,_],
        [_,_,R,R,R,R,R,B,B,B,B,R,R,R,_,_],
        [_,_,_,_,R,R,B,Y,B,B,Y,B,R,_,_,_],
        [_,_,_,_,_,B,B,B,B,B,B,B,B,_,_,_],
        [_,_,_,_,B,B,B,B,B,B,B,B,B,B,_,_],
        [_,_,_,_,B,B,B,_,_,_,B,B,B,_,_,_],
        [_,_,_,H,H,H,_,_,_,_,_,H,H,H,_,_],
        [_,_,H,H,H,H,_,_,_,_,_,H,H,H,H,_]
      ];
    } else {
      // Default idle
      grid = [
        [_,_,_,_,_,R,R,R,R,R,_,_,_,_,_,_],
        [_,_,_,_,R,R,R,R,R,R,R,R,R,_,_,_],
        [_,_,_,_,H,H,H,S,S,K,S,_,_,_,_,_],
        [_,_,_,H,S,H,S,S,S,K,S,S,S,_,_,_],
        [_,_,_,H,S,H,H,S,S,S,K,S,S,S,_,_],
        [_,_,_,H,H,S,S,S,S,H,H,H,H,_,_,_],
        [_,_,_,_,_,S,S,S,S,S,S,S,_,_,_,_],
        [_,_,_,_,R,R,B,R,R,R,_,_,_,_,_,_],
        [_,_,_,R,R,R,B,R,R,B,R,R,R,_,_,_],
        [_,_,R,R,R,R,B,B,B,B,R,R,R,R,_,_],
        [_,_,W,W,R,B,Y,B,B,Y,B,R,W,W,_,_],
        [_,_,W,W,W,B,B,B,B,B,B,W,W,W,_,_],
        [_,_,W,W,B,B,B,B,B,B,B,B,W,W,_,_],
        [_,_,_,_,B,B,B,_,_,B,B,B,_,_,_,_],
        [_,_,_,H,H,H,_,_,_,_,H,H,H,_,_,_],
        [_,_,H,H,H,H,_,_,_,_,H,H,H,H,_,_]
      ];
    }

    return this.renderGridToSVG(grid, 16, 16, 'mario-sprite');
  },

  /**
   * Question Mark [?] Block SVG
   */
  getQuestionBlockSVG(hit = false) {
    const gold = hit ? '#8B5A2B' : '#F5C800';
    const highlight = hit ? '#A06E3B' : '#FFF070';
    const shadow = hit ? '#5C3818' : '#C28E00';
    const border = '#050718';
    const qColor = hit ? '#5C3818' : '#050718';

    return `
      <svg viewBox="0 0 32 32" width="100%" height="100%" style="image-rendering: pixelated; display: block;">
        <!-- Base block -->
        <rect x="0" y="0" width="32" height="32" fill="${border}" />
        <rect x="2" y="2" width="28" height="28" fill="${gold}" />
        
        <!-- Highlights (top & left) -->
        <rect x="2" y="2" width="28" height="3" fill="${highlight}" />
        <rect x="2" y="2" width="3" height="28" fill="${highlight}" />
        
        <!-- Shadow (bottom & right) -->
        <rect x="2" y="27" width="28" height="3" fill="${shadow}" />
        <rect x="27" y="2" width="3" height="28" fill="${shadow}" />
        
        <!-- Corner Rivets -->
        <rect x="4" y="4" width="2" height="2" fill="${border}" />
        <rect x="26" y="4" width="2" height="2" fill="${border}" />
        <rect x="4" y="26" width="2" height="2" fill="${border}" />
        <rect x="26" y="26" width="2" height="2" fill="${border}" />
        
        ${hit ? `
          <!-- Blank hit block rivets -->
          <rect x="12" y="12" width="8" height="8" fill="${shadow}" />
        ` : `
          <!-- Question Mark '?' pixel pattern -->
          <rect x="11" y="7" width="10" height="3" fill="${qColor}" />
          <rect x="9" y="9" width="4" height="4" fill="${qColor}" />
          <rect x="19" y="9" width="4" height="5" fill="${qColor}" />
          <rect x="15" y="14" width="5" height="4" fill="${qColor}" />
          <rect x="13" y="18" width="4" height="3" fill="${qColor}" />
          <rect x="13" y="23" width="4" height="3" fill="${qColor}" />
        `}
      </svg>
    `;
  },

  /**
   * Brick Block SVG
   */
  getBrickBlockSVG() {
    return `
      <svg viewBox="0 0 32 32" width="100%" height="100%" style="image-rendering: pixelated; display: block;">
        <rect x="0" y="0" width="32" height="32" fill="#050718" />
        <rect x="2" y="2" width="28" height="28" fill="#B84800" />
        <!-- Mortar lines -->
        <rect x="2" y="10" width="28" height="2" fill="#050718" />
        <rect x="2" y="20" width="28" height="2" fill="#050718" />
        <rect x="16" y="2" width="2" height="8" fill="#050718" />
        <rect x="8" y="12" width="2" height="8" fill="#050718" />
        <rect x="24" y="12" width="2" height="8" fill="#050718" />
        <rect x="16" y="22" width="2" height="8" fill="#050718" />
        <!-- Highlights -->
        <rect x="3" y="3" width="12" height="2" fill="#E87830" />
        <rect x="19" y="3" width="10" height="2" fill="#E87830" />
      </svg>
    `;
  },

  /**
   * Green Warp Pipe SVG
   */
  getWarpPipeSVG() {
    return `
      <svg viewBox="0 0 48 64" width="100%" height="100%" style="image-rendering: pixelated; display: block;">
        <!-- Border -->
        <rect x="0" y="0" width="48" height="20" fill="#050718" />
        <rect x="4" y="20" width="40" height="44" fill="#050718" />
        
        <!-- Top Rim -->
        <rect x="2" y="2" width="44" height="16" fill="#00A800" />
        <rect x="4" y="2" width="8" height="16" fill="#80E800" />
        <rect x="34" y="2" width="10" height="16" fill="#005800" />
        
        <!-- Body -->
        <rect x="6" y="22" width="36" height="42" fill="#00A800" />
        <rect x="8" y="22" width="6" height="42" fill="#80E800" />
        <rect x="32" y="22" width="8" height="42" fill="#005800" />
      </svg>
    `;
  },

  /**
   * Pacman SVG (Facing Left, ready to chomp from right to left!)
   */
  getPacmanSVG(mouthOpenAngle = 45) {
    return `
      <svg viewBox="0 0 64 64" width="100%" height="100%" style="overflow: visible; filter: drop-shadow(0 0 10px rgba(245, 200, 0, 0.6));">
        <!-- Pacman Body (Yellow with border) -->
        <path d="M 32,32 L 6,17 A 28,28 0 1,1 6,47 Z" fill="#F5C800" stroke="#050718" stroke-width="3" stroke-linejoin="round" />
        <!-- Pacman Eye -->
        <circle cx="28" cy="16" r="4.5" fill="#050718" />
        <circle cx="27" cy="15" r="1.5" fill="#FFFFFF" />
      </svg>
    `;
  },

  /**
   * Golden Coin SVG
   */
  getCoinSVG() {
    return `
      <svg viewBox="0 0 20 28" width="100%" height="100%" style="image-rendering: pixelated;">
        <rect x="4" y="0" width="12" height="28" fill="#050718" />
        <rect x="2" y="2" width="16" height="24" fill="#F5C800" />
        <rect x="4" y="4" width="12" height="20" fill="#FFE266" />
        <rect x="8" y="6" width="4" height="16" fill="#C28E00" />
      </svg>
    `;
  },

  /**
   * Cute Boo Ghost SVG (Mario easter egg)
   */
  getBooSVG() {
    return `
      <svg viewBox="0 0 40 40" width="100%" height="100%" style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));">
        <!-- Body -->
        <ellipse cx="20" cy="22" rx="16" ry="14" fill="#FFFFFF" stroke="#050718" stroke-width="2" />
        <!-- Tail/ruffles -->
        <path d="M 6,24 Q 4,28 6,32 Q 10,28 12,30" fill="#FFFFFF" stroke="#050718" stroke-width="2" />
        <!-- Eyes -->
        <rect x="18" y="16" width="3" height="5" fill="#050718" />
        <rect x="26" y="16" width="3" height="5" fill="#050718" />
        <rect x="22" y="14" width="4" height="2" fill="#050718" /> <!-- Eyebrow anger -->
        <!-- Mouth & Tongue -->
        <path d="M 17,24 Q 23,28 29,24 Q 23,32 17,24" fill="#050718" />
        <rect x="20" y="24" width="2" height="2" fill="#FFFFFF" /> <!-- Tooth -->
        <rect x="24" y="24" width="2" height="2" fill="#FFFFFF" /> <!-- Tooth -->
        <ellipse cx="23" cy="27" rx="3" ry="2" fill="#FF3D8A" /> <!-- Tongue -->
        <!-- Arm -->
        <path d="M 32,22 Q 38,20 36,24" fill="#FFFFFF" stroke="#050718" stroke-width="2" />
      </svg>
    `;
  },

  /**
   * Classic Goomba Sprite (Walk Frame 1 & 2)
   */
  getGoombaSVG(walkFrame = 0) {
    const B = '#9c4300'; // Brown head
    const S = '#ffd599'; // Skin stem
    const K = '#050718'; // Black
    const W = '#ffffff'; // White
    const _ = 'transparent';

    const footLeft = walkFrame === 0 ? K : _;
    const footRight = walkFrame === 1 ? K : _;

    const grid = [
      [_,_,_,_,_,B,B,B,B,B,B,_,_,_,_,_],
      [_,_,_,_,B,B,B,B,B,B,B,B,_,_,_,_],
      [_,_,_,B,B,B,B,B,B,B,B,B,B,_,_,_],
      [_,_,B,B,B,B,B,B,B,B,B,B,B,B,_,_],
      [_,B,B,B,B,B,B,B,B,B,B,B,B,B,B,_],
      [_,B,B,K,K,B,B,B,B,B,B,K,K,B,B,_],
      [B,B,K,W,W,K,B,B,B,B,K,W,W,K,B,B],
      [B,B,K,W,K,K,B,B,B,B,K,K,W,K,B,B],
      [B,B,K,K,K,K,B,B,B,B,K,K,K,K,B,B],
      [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B],
      [_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_],
      [_,_,_,S,S,S,S,S,S,S,S,S,S,_,_,_],
      [_,_,S,S,S,S,S,S,S,S,S,S,S,S,_,_],
      [_,_,S,S,S,S,S,S,S,S,S,S,S,S,_,_],
      [_,K,K,K,K,K,_,_,_,_,K,K,K,K,K,_],
      [K,K,K,K,K,K,footLeft,_,_,footRight,K,K,K,K,K,K]
    ];

    return this.renderGridToSVG(grid, 16, 16, 'goomba-sprite');
  },

  /**
   * Piranha Plant Sprite (Peeks out of the pipe)
   */
  getPiranhaPlantSVG() {
    return `
      <svg viewBox="0 0 32 40" width="100%" height="100%" style="image-rendering: pixelated; display: block; filter: drop-shadow(0 0 6px rgba(255, 61, 138, 0.4));">
        <!-- Stem & Leaves -->
        <rect x="14" y="20" width="4" height="20" fill="#00A800" stroke="#050718" stroke-width="1" />
        <ellipse cx="10" cy="30" rx="6" ry="3" fill="#80E800" stroke="#050718" stroke-width="1" />
        <ellipse cx="22" cy="32" rx="6" ry="3" fill="#80E800" stroke="#050718" stroke-width="1" />
        <!-- Head Base -->
        <circle cx="16" cy="14" r="12" fill="#E52521" stroke="#050718" stroke-width="2" />
        <!-- White Dots -->
        <circle cx="10" cy="8" r="2.5" fill="#FFFFFF" />
        <circle cx="22" cy="8" r="2.5" fill="#FFFFFF" />
        <circle cx="8" cy="16" r="2" fill="#FFFFFF" />
        <circle cx="24" cy="16" r="2" fill="#FFFFFF" />
        <!-- Mouth & Sharp Teeth -->
        <path d="M 6,14 Q 16,6 26,14 Q 16,22 6,14" fill="#050718" />
        <polygon points="10,13 12,17 14,13" fill="#FFFFFF" />
        <polygon points="18,13 20,17 22,13" fill="#FFFFFF" />
        <polygon points="11,15 13,12 15,15" fill="#FFFFFF" />
        <polygon points="17,15 19,12 21,15" fill="#FFFFFF" />
        <!-- Lips -->
        <ellipse cx="16" cy="14" rx="10" ry="3" fill="none" stroke="#FFFFFF" stroke-width="2" />
      </svg>
    `;
  },

  /**
   * Vixel Robot Mascot Sprite (Matching IT-Fest 26 Mascot)
   */
  getVixelMascotSVG() {
    return `
      <svg viewBox="0 0 48 48" width="100%" height="100%" style="image-rendering: pixelated; display: block; filter: drop-shadow(2px 4px 0px #050718);">
        <!-- Antenna -->
        <rect x="22" y="2" width="4" height="8" fill="#F5C800" stroke="#050718" stroke-width="2" />
        <circle cx="24" cy="2" r="3" fill="#FF3D8A" stroke="#050718" stroke-width="1" />
        
        <!-- Head Box -->
        <rect x="8" y="10" width="32" height="26" rx="4" fill="#0c1033" stroke="#050718" stroke-width="3" />
        
        <!-- Face Screen -->
        <rect x="12" y="14" width="24" height="18" rx="2" fill="#00E5FF" stroke="#050718" stroke-width="2" />
        
        <!-- Pixel Eyes (Cute smiling / blinking) -->
        <rect x="16" y="18" width="4" height="6" fill="#050718" rx="1" />
        <rect x="28" y="18" width="4" height="6" fill="#050718" rx="1" />
        <circle cx="17" cy="19" r="1" fill="#FFFFFF" />
        <circle cx="29" cy="19" r="1" fill="#FFFFFF" />
        
        <!-- Smile -->
        <path d="M 20,26 Q 24,30 28,26" fill="none" stroke="#050718" stroke-width="2" stroke-linecap="round" />
        
        <!-- Side Headphones / Ears -->
        <rect x="4" y="18" width="4" height="10" rx="2" fill="#F5C800" stroke="#050718" stroke-width="2" />
        <rect x="40" y="18" width="4" height="10" rx="2" fill="#F5C800" stroke="#050718" stroke-width="2" />
        
        <!-- Little Body / Jets -->
        <rect x="16" y="36" width="16" height="8" rx="2" fill="#FF3D8A" stroke="#050718" stroke-width="2" />
        <polygon points="20,44 24,48 28,44" fill="#00E5FF" />
      </svg>
    `;
  },

  /**
   * Classic Mario Bush SVG
   */
  getMarioBushSVG() {
    return `
      <svg viewBox="0 0 64 32" width="100%" height="100%" style="image-rendering: pixelated; display: block;">
        <ellipse cx="20" cy="18" rx="14" ry="12" fill="#00A800" stroke="#050718" stroke-width="3" />
        <ellipse cx="44" cy="18" rx="14" ry="12" fill="#00A800" stroke="#050718" stroke-width="3" />
        <ellipse cx="32" cy="14" rx="16" ry="13" fill="#80E800" stroke="#050718" stroke-width="3" />
        <!-- Cute Eyes -->
        <rect x="28" y="12" width="2" height="4" fill="#050718" />
        <rect x="34" y="12" width="2" height="4" fill="#050718" />
      </svg>
    `;
  },

  /**
   * Classic Mario Castle Silhouette SVG
   */
  getCastleSVG() {
    return `
      <svg viewBox="0 0 80 80" width="100%" height="100%" style="image-rendering: pixelated; display: block; filter: drop-shadow(4px 4px 0px rgba(5,7,24,0.7));">
        <!-- Main wall -->
        <rect x="10" y="30" width="60" height="50" fill="#a0522d" stroke="#050718" stroke-width="3" />
        <!-- Towers -->
        <rect x="10" y="20" width="16" height="12" fill="#cd853f" stroke="#050718" stroke-width="2" />
        <rect x="54" y="20" width="16" height="12" fill="#cd853f" stroke="#050718" stroke-width="2" />
        <rect x="28" y="10" width="24" height="22" fill="#cd853f" stroke="#050718" stroke-width="2" />
        <!-- Crenellations -->
        <rect x="10" y="16" width="4" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <rect x="22" y="16" width="4" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <rect x="54" y="16" width="4" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <rect x="66" y="16" width="4" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <rect x="28" y="6" width="5" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <rect x="47" y="6" width="5" height="4" fill="#8b4513" stroke="#050718" stroke-width="1" />
        <!-- Flag on main tower -->
        <line x1="40" y1="6" x2="40" y2="0" stroke="#050718" stroke-width="2" />
        <polygon points="40,0 48,3 40,6" fill="#FF3D8A" />
        <!-- Castle Gate Door -->
        <path d="M 32,80 L 32,54 Q 40,46 48,54 L 48,80 Z" fill="#050718" />
      </svg>
    `;
  },

  /**
   * Pacman Ghost SVG (Blinky, Pinky, Inky, Clyde)
   */
  getPacmanGhostSVG(color = '#FF3D8A', eyeDirection = 'left') {
    return `
      <svg viewBox="0 0 32 32" width="100%" height="100%" style="image-rendering: pixelated; filter: drop-shadow(0 0 6px ${color});">
        <!-- Ghost body -->
        <path d="M 4,16 Q 4,4 16,4 Q 28,4 28,16 L 28,28 L 24,24 L 20,28 L 16,24 L 12,28 L 8,24 L 4,28 Z" fill="${color}" stroke="#050718" stroke-width="2" />
        <!-- Eyes (white) -->
        <ellipse cx="${eyeDirection === 'left' ? 10 : 13}" cy="13" rx="3.5" ry="4.5" fill="#FFFFFF" />
        <ellipse cx="${eyeDirection === 'left' ? 20 : 23}" cy="13" rx="3.5" ry="4.5" fill="#FFFFFF" />
        <!-- Pupils (blue/black) -->
        <circle cx="${eyeDirection === 'left' ? 9 : 14}" cy="13" r="2" fill="#002688" />
        <circle cx="${eyeDirection === 'left' ? 19 : 24}" cy="13" r="2" fill="#002688" />
      </svg>
    `;
  },

  /**
   * Helper to convert grid matrix to SVG
   */
  renderGridToSVG(grid, width, height, className = '') {
    const cellWidth = 1;
    const cellHeight = 1;
    let rects = '';

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = grid[y] && grid[y][x];
        if (color && color !== 'transparent') {
          rects += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="${color}" />`;
        }
      }
    }

    return `
      <svg class="${className}" viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="image-rendering: pixelated; shape-rendering: crispEdges; display: block;">
        ${rects}
      </svg>
    `;
  }
};

window.SpriteFactory = SpriteFactory;
