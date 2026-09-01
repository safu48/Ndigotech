/**
 * NDIGO TECH SOLUTIONS - Interactive 3D Perspective Tilt Engine
 * Provides ultra-smooth 3D depth, specular reflection, and floating layer parallax on hover.
 */

(function () {
  'use strict';

  class Tilt3D {
    constructor(element, options = {}) {
      this.el = element;
      this.options = Object.assign({
        maxTilt: 10,        // Max rotation in degrees
        perspective: 1000,  // Perspective in px
        scale: 1.02,        // Scale on hover
        speed: 400,         // Transition speed in ms
        glare: true,        // Enable specular reflection glare
        maxGlare: 0.22      // Max glare opacity
      }, options);

      this.width = null;
      this.height = null;
      this.left = null;
      this.top = null;
      this.transitionTimeout = null;
      this.isHovering = false;

      this.init();
    }

    init() {
      this.el.style.transformStyle = 'preserve-3d';
      this.el.style.willChange = 'transform';

      if (this.options.glare) {
        this.prepareGlare();
      }

      this.bindEvents();
    }

    prepareGlare() {
      const glareContainer = document.createElement('div');
      glareContainer.classList.add('tilt-glare-container');
      glareContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        border-radius: inherit;
        z-index: 10;
      `;

      const glareElement = document.createElement('div');
      glareElement.classList.add('tilt-glare-element');
      glareElement.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        pointer-events: none;
        background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%);
        width: 200%;
        height: 200%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity ${this.options.speed}ms ease;
      `;

      glareContainer.appendChild(glareElement);
      this.el.style.position = this.el.style.position || 'relative';
      this.el.appendChild(glareContainer);

      this.glareElement = glareElement;
    }

    bindEvents() {
      this.onMouseEnter = this.handleMouseEnter.bind(this);
      this.onMouseMove = this.handleMouseMove.bind(this);
      this.onMouseLeave = this.handleMouseLeave.bind(this);

      this.el.addEventListener('mouseenter', this.onMouseEnter);
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.addEventListener('mouseleave', this.onMouseLeave);
    }

    handleMouseEnter() {
      this.isHovering = true;
      this.updateRect();
      this.setTransition();
    }

    handleMouseMove(event) {
      if (!this.isHovering) return;
      this.updateRect();

      const x = (event.clientX - this.left) / this.width;
      const y = (event.clientY - this.top) / this.height;

      const tiltX = (this.options.maxTilt * (0.5 - y)).toFixed(2);
      const tiltY = (this.options.maxTilt * (x - 0.5)).toFixed(2);

      this.applyTransform(tiltX, tiltY);

      if (this.glareElement) {
        const glareX = x * 100;
        const glareY = y * 100;
        const distFromCenter = Math.hypot(x - 0.5, y - 0.5);
        const opacity = Math.min(distFromCenter * 2 * this.options.maxGlare, this.options.maxGlare);

        this.glareElement.style.transform = `translate(${glareX - 100}%, ${glareY - 100}%)`;
        this.glareElement.style.opacity = opacity;
      }
    }

    handleMouseLeave() {
      this.isHovering = false;
      this.setTransition();
      this.el.style.transform = `perspective(${this.options.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (this.glareElement) {
        this.glareElement.style.opacity = '0';
      }
    }

    updateRect() {
      const rect = this.el.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.left = rect.left;
      this.top = rect.top;
    }

    setTransition() {
      clearTimeout(this.transitionTimeout);
      this.el.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      this.transitionTimeout = setTimeout(() => {
        if (this.isHovering) {
          this.el.style.transition = '';
        }
      }, this.options.speed);
    }

    applyTransform(tiltX, tiltY) {
      this.el.style.transform = `perspective(${this.options.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})`;
    }
  }

  function initTilt() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const elements = document.querySelectorAll('.tilt-3d, [data-tilt], .home-product-card, #hero-slider-container');
      elements.forEach(el => {
        if (!el._tiltInstance) {
          el._tiltInstance = new Tilt3D(el);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }

  window.init3DTilt = initTilt;
})();
