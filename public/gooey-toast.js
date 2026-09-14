"use strict";
var GooeyToast = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // node_modules/gooey-toast/dist/icons.js
  var require_icons = __commonJS({
    "node_modules/gooey-toast/dist/icons.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createStateIcon = void 0;
      var SVG_NS = "http://www.w3.org/2000/svg";
      var createSvgNode = (tag) => document.createElementNS(SVG_NS, tag);
      var setAttrs = (el, attrs) => {
        for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
        }
      };
      var createIcon = (title) => {
        const svg = createSvgNode("svg");
        setAttrs(svg, {
          xmlns: SVG_NS,
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        });
        const titleEl = createSvgNode("title");
        titleEl.textContent = title;
        svg.append(titleEl);
        return svg;
      };
      var appendPath = (svg, d) => {
        const path = createSvgNode("path");
        path.setAttribute("d", d);
        svg.append(path);
      };
      var appendCircle = (svg, cx, cy, r) => {
        const circle = createSvgNode("circle");
        setAttrs(circle, { cx, cy, r });
        svg.append(circle);
      };
      var appendLine = (svg, x1, x2, y1, y2) => {
        const line = createSvgNode("line");
        setAttrs(line, { x1, x2, y1, y2 });
        svg.append(line);
      };
      var createArrowRight = () => {
        const svg = createIcon("Arrow Right");
        appendPath(svg, "M5 12h14");
        appendPath(svg, "m12 5 7 7-7 7");
        return svg;
      };
      var createLifeBuoy = () => {
        const svg = createIcon("Life Buoy");
        appendCircle(svg, "12", "12", "10");
        appendPath(svg, "m4.93 4.93 4.24 4.24");
        appendPath(svg, "m14.83 9.17 4.24-4.24");
        appendPath(svg, "m14.83 14.83 4.24 4.24");
        appendPath(svg, "m9.17 14.83-4.24 4.24");
        appendCircle(svg, "12", "12", "4");
        return svg;
      };
      var createLoaderCircle = () => {
        const svg = createIcon("Loader Circle");
        svg.setAttribute("data-gooey-icon", "spin");
        svg.setAttribute("aria-hidden", "true");
        appendPath(svg, "M21 12a9 9 0 1 1-6.219-8.56");
        return svg;
      };
      var createX = () => {
        const svg = createIcon("X");
        appendPath(svg, "M18 6 6 18");
        appendPath(svg, "m6 6 12 12");
        return svg;
      };
      var createCircleAlert = () => {
        const svg = createIcon("Circle Alert");
        appendCircle(svg, "12", "12", "10");
        appendLine(svg, "12", "12", "8", "12");
        appendLine(svg, "12", "12.01", "16", "16");
        return svg;
      };
      var createCheck = () => {
        const svg = createIcon("Check");
        appendPath(svg, "M20 6 9 17l-5-5");
        return svg;
      };
      var createStateIcon = (state) => {
        switch (state) {
          case "success":
            return createCheck();
          case "loading":
            return createLoaderCircle();
          case "error":
            return createX();
          case "warning":
            return createCircleAlert();
          case "info":
            return createLifeBuoy();
          case "action":
            return createArrowRight();
          default:
            return createCheck();
        }
      };
      exports.createStateIcon = createStateIcon;
    }
  });

  // node_modules/gooey-toast/dist/internal.js
  var require_internal = __commonJS({
    "node_modules/gooey-toast/dist/internal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveAutopilot = exports.resolvePlacement = exports.clamp = exports.normalizeDuration = exports.AUTO_COLLAPSE_DELAY = exports.AUTO_EXPAND_DELAY = exports.DEFAULT_DURATION = void 0;
      exports.DEFAULT_DURATION = 6e3;
      exports.AUTO_EXPAND_DELAY = 150;
      exports.AUTO_COLLAPSE_DELAY = 4e3;
      var normalizeDuration = (value) => value === void 0 ? exports.DEFAULT_DURATION : value;
      exports.normalizeDuration = normalizeDuration;
      var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      exports.clamp = clamp;
      var resolvePlacement = (position) => ({
        align: position.endsWith("left") ? "left" : position.endsWith("center") ? "center" : "right",
        edge: position.startsWith("top") ? "top" : "bottom"
      });
      exports.resolvePlacement = resolvePlacement;
      var resolveAutopilot = (options, duration) => {
        var _a, _b;
        if (options.autopilot === false || duration == null || duration <= 0) {
          return {};
        }
        const cfg = typeof options.autopilot === "object" ? options.autopilot : void 0;
        return {
          autoExpandDelayMs: (0, exports.clamp)((_a = cfg === null || cfg === void 0 ? void 0 : cfg.expand) !== null && _a !== void 0 ? _a : exports.AUTO_EXPAND_DELAY, 0, duration),
          autoCollapseDelayMs: (0, exports.clamp)((_b = cfg === null || cfg === void 0 ? void 0 : cfg.collapse) !== null && _b !== void 0 ? _b : exports.AUTO_COLLAPSE_DELAY, 0, duration)
        };
      };
      exports.resolveAutopilot = resolveAutopilot;
    }
  });

  // node_modules/gooey-toast/dist/types.js
  var require_types = __commonJS({
    "node_modules/gooey-toast/dist/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TOAST_POSITIONS = void 0;
      exports.TOAST_POSITIONS = [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ];
    }
  });

  // node_modules/gooey-toast/dist/toast.js
  var require_toast = __commonJS({
    "node_modules/gooey-toast/dist/toast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.gooeyToast = exports.toast = exports.unmountToaster = exports.configureToaster = exports.mountToaster = exports.createToaster = void 0;
      var icons_1 = require_icons();
      var internal_1 = require_internal();
      var types_1 = require_types();
      var EXIT_DURATION = 260;
      var SWIPE_DISMISS_DISTANCE = 30;
      var SWIPE_MAX_TRANSLATE = 20;
      var HOVER_RESUME_DELAY = 50;
      var TOAST_FALLBACK_WIDTH = 350;
      var TOAST_HEIGHT = 44;
      var DEFAULT_ROUNDNESS = 18;
      var BLUR_RATIO = 0.5;
      var GOOEY_JOIN = 10;
      var store = {
        toasts: [],
        listeners: /* @__PURE__ */ new Set(),
        position: "top-right",
        options: void 0,
        emit() {
          for (const listener of this.listeners) {
            listener(this.toasts);
          }
        },
        update(updater) {
          this.toasts = updater(this.toasts);
          this.emit();
        }
      };
      var isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
      var idCounter = 0;
      var generateId = () => `${++idCounter}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      var isTimedDuration = (value) => value != null && value > 0;
      var getNow = () => typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
      var timeoutKey = (item) => `${item.id}:${item.instanceId}`;
      var mergeOptions = (options) => {
        var _a, _b, _c;
        return Object.assign(Object.assign(Object.assign({}, store.options), options), { styles: Object.assign(Object.assign({}, (_b = (_a = store.options) === null || _a === void 0 ? void 0 : _a.styles) !== null && _b !== void 0 ? _b : {}), (_c = options.styles) !== null && _c !== void 0 ? _c : {}) });
      };
      var buildToastRecord = (merged, id, fallbackPosition) => {
        var _a, _b;
        const duration = (0, internal_1.normalizeDuration)(merged.duration);
        return Object.assign(Object.assign(Object.assign({}, merged), { id, instanceId: generateId(), exiting: false, duration, position: (_b = (_a = merged.position) !== null && _a !== void 0 ? _a : fallbackPosition) !== null && _b !== void 0 ? _b : store.position }), (0, internal_1.resolveAutopilot)(merged, duration));
      };
      var createToast = (options) => {
        var _a;
        const merged = mergeOptions(options);
        const id = (_a = merged.id) !== null && _a !== void 0 ? _a : generateId();
        const existing = store.toasts.find((item) => item.id === id && !item.exiting);
        const next = buildToastRecord(merged, id, existing === null || existing === void 0 ? void 0 : existing.position);
        if (existing) {
          store.update((all) => all.map((item) => item.id === id ? next : item));
        } else {
          store.update((all) => [...all.filter((item) => item.id !== id), next]);
        }
        return { id };
      };
      var updateToast = (id, options) => {
        const existing = store.toasts.find((item) => item.id === id);
        if (!existing)
          return;
        const merged = mergeOptions(Object.assign(Object.assign({}, options), { id }));
        const next = buildToastRecord(merged, id, existing.position);
        store.update((all) => all.map((item) => item.id === id ? next : item));
      };
      var exitTimers = /* @__PURE__ */ new Map();
      var dismissToast = (id) => {
        const existing = store.toasts.find((item) => item.id === id);
        if (!existing || existing.exiting)
          return;
        const key = timeoutKey(existing);
        store.update((all) => all.map((item) => item.id === id ? Object.assign(Object.assign({}, item), { exiting: true }) : item));
        const prevTimers = exitTimers.get(key);
        if ((prevTimers === null || prevTimers === void 0 ? void 0 : prevTimers.remove) != null) {
          clearTimeout(prevTimers.remove);
        }
        const timers = {};
        timers.remove = window.setTimeout(() => {
          exitTimers.delete(key);
          store.update((all) => all.filter((item) => !(item.id === existing.id && item.instanceId === existing.instanceId)));
        }, EXIT_DURATION);
        exitTimers.set(key, timers);
      };
      var resolveRenderableValue = (input) => {
        let value = input;
        while (typeof value === "function") {
          value = value();
        }
        return value;
      };
      var isNode = (value) => typeof Node !== "undefined" && value instanceof Node;
      var renderRenderable = (container, value) => {
        const resolved = resolveRenderableValue(value);
        if (resolved == null)
          return false;
        if (typeof resolved === "string" || typeof resolved === "number") {
          const text = String(resolved);
          if (!text.trim())
            return false;
          container.append(document.createTextNode(text));
          return true;
        }
        if (isNode(resolved)) {
          container.append(resolved.cloneNode(true));
          return true;
        }
        return false;
      };
      var renderIcon = (value, state) => {
        const resolved = resolveRenderableValue(value);
        if (resolved == null) {
          return (0, icons_1.createStateIcon)(state);
        }
        if (typeof resolved === "string" || typeof resolved === "number") {
          return document.createTextNode(String(resolved));
        }
        if (isNode(resolved)) {
          return resolved.cloneNode(true);
        }
        return (0, icons_1.createStateIcon)(state);
      };
      var ToastView = class {
        constructor(item, placement, callbacks) {
          this.sizeObserver = null;
          this.readyRaf = null;
          this.autoExpandTimer = null;
          this.autoCollapseTimer = null;
          this.pointerStartY = null;
          this.hasContent = false;
          this.expanded = false;
          this.containerWidth = TOAST_FALLBACK_WIDTH;
          this.headerWidth = TOAST_HEIGHT;
          this.contentHeight = 0;
          this.handleMouseEnter = () => {
            this.callbacks.onEnter(this.id);
            this.clearAutoPilotTimers();
            if (this.canExpand()) {
              this.setExpanded(true);
            }
          };
          this.handleMouseLeave = () => {
            this.callbacks.onLeave(this.id);
            this.setExpanded(false);
          };
          this.handlePointerDown = (event) => {
            if (this.currentItem.exiting)
              return;
            if (event.pointerType === "mouse" && event.button !== 0)
              return;
            const target = event.target;
            if (target === null || target === void 0 ? void 0 : target.closest("[data-gooey-button]"))
              return;
            this.pointerStartY = event.clientY;
            this.root.setPointerCapture(event.pointerId);
          };
          this.handlePointerMove = (event) => {
            if (this.pointerStartY == null)
              return;
            const delta = event.clientY - this.pointerStartY;
            const sign = delta < 0 ? -1 : 1;
            const clamped = Math.min(Math.abs(delta), SWIPE_MAX_TRANSLATE) * sign;
            this.root.style.setProperty("--gooey-drag-y", `${clamped}px`);
          };
          this.handlePointerUp = (event) => {
            if (this.pointerStartY == null)
              return;
            const delta = event.clientY - this.pointerStartY;
            this.resetPointerState(event.pointerId);
            if (Math.abs(delta) >= SWIPE_DISMISS_DISTANCE) {
              this.callbacks.onDismiss(this.id);
            }
          };
          this.handlePointerCancel = (event) => {
            if (this.pointerStartY == null)
              return;
            this.resetPointerState(event.pointerId);
          };
          this.id = item.id;
          this.currentItem = item;
          this.placement = placement;
          this.callbacks = callbacks;
          this.root = document.createElement("button");
          this.root.type = "button";
          this.root.setAttribute("data-gooey-toast", "");
          this.root.dataset.ready = "false";
          this.root.dataset.expanded = "false";
          this.root.dataset.exiting = String(Boolean(item.exiting));
          this.canvasEl = document.createElement("div");
          this.canvasEl.setAttribute("data-gooey-canvas", "");
          this.svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          this.svgEl.setAttribute("data-gooey-svg", "");
          this.svgEl.setAttribute("width", String(TOAST_FALLBACK_WIDTH));
          this.svgEl.setAttribute("height", String(TOAST_HEIGHT));
          this.svgEl.setAttribute("viewBox", `0 0 ${TOAST_FALLBACK_WIDTH} ${TOAST_HEIGHT}`);
          const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
          const filterId = `gooey-toast-${item.id}-${item.instanceId}`;
          filter.setAttribute("id", filterId);
          filter.setAttribute("x", "-20%");
          filter.setAttribute("y", "-20%");
          filter.setAttribute("width", "140%");
          filter.setAttribute("height", "140%");
          filter.setAttribute("color-interpolation-filters", "sRGB");
          this.blurNode = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
          this.blurNode.setAttribute("in", "SourceGraphic");
          this.blurNode.setAttribute("stdDeviation", String(DEFAULT_ROUNDNESS * BLUR_RATIO));
          this.blurNode.setAttribute("result", "blur");
          const colorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
          colorMatrix.setAttribute("in", "blur");
          colorMatrix.setAttribute("mode", "matrix");
          colorMatrix.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10");
          colorMatrix.setAttribute("result", "goo");
          const composite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
          composite.setAttribute("in", "SourceGraphic");
          composite.setAttribute("in2", "goo");
          composite.setAttribute("operator", "atop");
          filter.append(this.blurNode, colorMatrix, composite);
          defs.append(filter);
          const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
          group.setAttribute("filter", `url(#${filterId})`);
          this.pillRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          this.pillRect.setAttribute("data-gooey-pill", "");
          this.bodyRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          this.bodyRect.setAttribute("data-gooey-body", "");
          group.append(this.pillRect, this.bodyRect);
          this.svgEl.append(defs, group);
          this.canvasEl.append(this.svgEl);
          this.headerEl = document.createElement("div");
          this.headerEl.setAttribute("data-gooey-header", "");
          this.badgeEl = document.createElement("div");
          this.badgeEl.setAttribute("data-gooey-badge", "");
          this.titleEl = document.createElement("span");
          this.titleEl.setAttribute("data-gooey-title", "");
          this.titleMeasureEl = document.createElement("span");
          this.titleMeasureEl.setAttribute("data-gooey-title", "");
          this.titleMeasureEl.setAttribute("data-gooey-title-measure", "");
          this.timeoutTrackEl = document.createElement("span");
          this.timeoutTrackEl.setAttribute("data-gooey-time-track", "");
          this.timeoutTrackEl.hidden = true;
          this.timeoutFillEl = document.createElement("span");
          this.timeoutFillEl.setAttribute("data-gooey-time-fill", "");
          this.timeoutTrackEl.append(this.timeoutFillEl);
          this.headerEl.append(this.badgeEl, this.titleEl, this.timeoutTrackEl);
          this.contentEl = document.createElement("div");
          this.contentEl.setAttribute("data-gooey-content", "");
          this.contentEl.dataset.visible = "false";
          this.descriptionEl = document.createElement("div");
          this.descriptionEl.setAttribute("data-gooey-description", "");
          this.contentEl.append(this.descriptionEl);
          this.root.append(this.canvasEl, this.headerEl, this.contentEl, this.titleMeasureEl);
          this.root.addEventListener("mouseenter", this.handleMouseEnter);
          this.root.addEventListener("mouseleave", this.handleMouseLeave);
          this.root.addEventListener("pointerdown", this.handlePointerDown);
          this.root.addEventListener("pointermove", this.handlePointerMove, {
            passive: true
          });
          this.root.addEventListener("pointerup", this.handlePointerUp, { passive: true });
          this.root.addEventListener("pointercancel", this.handlePointerCancel, {
            passive: true
          });
          if (typeof ResizeObserver !== "undefined") {
            this.sizeObserver = new ResizeObserver(() => {
              this.syncMetrics();
            });
            this.sizeObserver.observe(this.root);
            this.sizeObserver.observe(this.headerEl);
            this.sizeObserver.observe(this.descriptionEl);
          }
          this.update(item, placement);
          this.readyRaf = requestAnimationFrame(() => {
            this.root.dataset.ready = "true";
            this.readyRaf = null;
            this.syncMetrics();
          });
        }
        update(item, placement) {
          this.currentItem = item;
          this.applyPlacement(placement);
          this.root.dataset.exiting = String(Boolean(item.exiting));
          this.render(item);
          if (!item.exiting && !this.canExpand()) {
            this.setExpanded(false);
          }
          if (item.exiting) {
            this.clearAutoPilotTimers();
          } else {
            this.refreshAutopilot();
          }
        }
        destroy() {
          var _a;
          if (this.readyRaf != null) {
            cancelAnimationFrame(this.readyRaf);
            this.readyRaf = null;
          }
          (_a = this.sizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
          this.sizeObserver = null;
          this.clearAutoPilotTimers();
          this.pointerStartY = null;
          this.root.style.removeProperty("--gooey-drag-y");
          this.root.removeEventListener("mouseenter", this.handleMouseEnter);
          this.root.removeEventListener("mouseleave", this.handleMouseLeave);
          this.root.removeEventListener("pointerdown", this.handlePointerDown);
          this.root.removeEventListener("pointermove", this.handlePointerMove);
          this.root.removeEventListener("pointerup", this.handlePointerUp);
          this.root.removeEventListener("pointercancel", this.handlePointerCancel);
          this.root.remove();
        }
        applyPlacement(placement) {
          this.placement = placement;
          this.root.dataset.position = placement.align;
          this.root.dataset.edge = placement.edge;
          this.applyGeometry();
        }
        render(item) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
          const state = (_a = item.state) !== null && _a !== void 0 ? _a : "success";
          const title = (_b = item.title) !== null && _b !== void 0 ? _b : state;
          const showTimeoutIndicator = Boolean(item.timeoutIndicator) && isTimedDuration(item.duration) && !item.exiting;
          this.root.dataset.state = state;
          if (item.fill) {
            this.root.style.setProperty("--gooey-fill", item.fill);
          } else {
            this.root.style.removeProperty("--gooey-fill");
          }
          if (item.roundness != null) {
            this.root.style.setProperty("--gooey-radius", `${Math.max(0, item.roundness)}px`);
          } else {
            this.root.style.removeProperty("--gooey-radius");
          }
          this.badgeEl.dataset.state = state;
          this.badgeEl.className = (_d = (_c = item.styles) === null || _c === void 0 ? void 0 : _c.badge) !== null && _d !== void 0 ? _d : "";
          this.badgeEl.replaceChildren(renderIcon(item.icon, state));
          this.titleEl.dataset.state = state;
          this.titleEl.className = (_f = (_e = item.styles) === null || _e === void 0 ? void 0 : _e.title) !== null && _f !== void 0 ? _f : "";
          this.titleEl.textContent = title;
          this.titleMeasureEl.dataset.state = state;
          this.titleMeasureEl.className = (_h = (_g = item.styles) === null || _g === void 0 ? void 0 : _g.title) !== null && _h !== void 0 ? _h : "";
          this.titleMeasureEl.textContent = title;
          this.timeoutTrackEl.dataset.state = state;
          this.timeoutFillEl.dataset.state = state;
          this.setTimeoutIndicator(showTimeoutIndicator, 1, false);
          this.descriptionEl.className = (_k = (_j = item.styles) === null || _j === void 0 ? void 0 : _j.description) !== null && _k !== void 0 ? _k : "";
          this.descriptionEl.replaceChildren();
          let hasContent = renderRenderable(this.descriptionEl, item.description);
          if (item.button) {
            this.descriptionEl.append(this.buildActionButton(item.button, state, (_l = item.styles) === null || _l === void 0 ? void 0 : _l.button));
            hasContent = true;
          }
          this.hasContent = hasContent;
          this.contentEl.style.display = hasContent ? "" : "none";
          if (!hasContent) {
            this.expanded = false;
            this.root.dataset.expanded = "false";
            this.contentEl.dataset.visible = "false";
          }
          this.syncMetrics();
        }
        buildActionButton(button, state, className) {
          const action = document.createElement("button");
          action.type = "button";
          action.setAttribute("data-gooey-button", "");
          action.dataset.state = state;
          action.className = className !== null && className !== void 0 ? className : "";
          action.textContent = button.title;
          action.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            button.onClick();
          });
          return action;
        }
        setTimeoutIndicator(visible, progress, paused) {
          this.root.dataset.timeoutIndicator = String(visible);
          this.root.dataset.timeoutPaused = String(paused);
          this.timeoutTrackEl.hidden = !visible;
          this.timeoutFillEl.style.transform = `scaleX(${(0, internal_1.clamp)(progress, 0, 1)})`;
        }
        hasExpandableContent() {
          var _a;
          return this.hasContent && ((_a = this.currentItem.state) !== null && _a !== void 0 ? _a : "success") !== "loading";
        }
        canExpand() {
          if (!this.hasExpandableContent())
            return false;
          if (this.currentItem.exiting)
            return false;
          return true;
        }
        setExpanded(next) {
          const resolved = next && this.hasContent;
          if (this.expanded === resolved)
            return;
          this.expanded = resolved;
          this.root.dataset.expanded = String(resolved);
          this.contentEl.dataset.visible = String(resolved);
          this.applyGeometry();
        }
        syncMetrics() {
          const width = this.root.getBoundingClientRect().width;
          if (width > 0) {
            this.containerWidth = Math.max(1, Math.round(width));
          }
          const nextHeaderWidth = this.measureHeaderWidth();
          if (nextHeaderWidth > 0) {
            this.headerWidth = (0, internal_1.clamp)(nextHeaderWidth, TOAST_HEIGHT, this.containerWidth);
          }
          this.contentHeight = this.hasContent ? Math.max(0, Math.ceil(this.descriptionEl.scrollHeight)) : 0;
          this.applyGeometry();
        }
        measureHeaderWidth() {
          const styles = window.getComputedStyle(this.headerEl);
          const gapRaw = styles.columnGap && styles.columnGap !== "normal" ? styles.columnGap : styles.gap;
          const gap = Number.parseFloat(gapRaw || "0") || 0;
          const paddingLeft = Number.parseFloat(styles.paddingLeft || "0") || 0;
          const paddingRight = Number.parseFloat(styles.paddingRight || "0") || 0;
          const badgeWidth = this.badgeEl.getBoundingClientRect().width;
          const titleWidth = Math.max(this.titleMeasureEl.getBoundingClientRect().width, this.titleEl.scrollWidth);
          const safety = 2;
          return Math.ceil(badgeWidth + titleWidth + gap + paddingLeft + paddingRight + safety);
        }
        alignedX(width) {
          if (this.placement.align === "right") {
            return this.containerWidth - width;
          }
          if (this.placement.align === "center") {
            return (this.containerWidth - width) / 2;
          }
          return 0;
        }
        applyGeometry() {
          var _a, _b;
          const canOpen = this.expanded && this.hasExpandableContent();
          const visibleContentHeight = canOpen ? this.contentHeight : 0;
          const visualHeight = TOAST_HEIGHT + visibleContentHeight;
          const totalHeight = visualHeight;
          const headerWidth = (0, internal_1.clamp)(this.headerWidth, TOAST_HEIGHT, this.containerWidth);
          const bodyWidth = this.hasContent ? this.containerWidth : headerWidth;
          const headerX = this.alignedX(headerWidth);
          const bodyX = this.alignedX(bodyWidth);
          const isTopEdge = this.placement.edge === "top";
          const bodyHeight = canOpen ? visibleContentHeight + GOOEY_JOIN : 0;
          const pillY = isTopEdge ? 0 : visualHeight - TOAST_HEIGHT;
          const bodyY = isTopEdge ? TOAST_HEIGHT - GOOEY_JOIN : 0;
          const roundness = Math.max(0, (_a = this.currentItem.roundness) !== null && _a !== void 0 ? _a : DEFAULT_ROUNDNESS);
          const blur = roundness * BLUR_RATIO;
          const fill = (_b = this.currentItem.fill) !== null && _b !== void 0 ? _b : "#FFFFFF";
          this.root.style.setProperty("--_h", `${totalHeight}px`);
          this.root.style.setProperty("--_hx", `${headerX}px`);
          this.root.style.setProperty("--_hw", `${headerWidth}px`);
          this.root.style.setProperty("--_bx", `${bodyX}px`);
          this.root.style.setProperty("--_bw", `${bodyWidth}px`);
          this.contentEl.dataset.visible = String(canOpen);
          this.svgEl.setAttribute("width", String(this.containerWidth));
          this.svgEl.setAttribute("height", String(visualHeight));
          this.svgEl.setAttribute("viewBox", `0 0 ${this.containerWidth} ${visualHeight}`);
          this.blurNode.setAttribute("stdDeviation", String(blur));
          this.pillRect.setAttribute("x", String(headerX));
          this.pillRect.setAttribute("y", String(pillY));
          this.pillRect.setAttribute("width", String(headerWidth));
          this.pillRect.setAttribute("height", String(TOAST_HEIGHT));
          this.pillRect.setAttribute("rx", String(roundness));
          this.pillRect.setAttribute("ry", String(roundness));
          this.pillRect.setAttribute("fill", fill);
          this.bodyRect.setAttribute("x", String(bodyX));
          this.bodyRect.setAttribute("y", String(bodyY));
          this.bodyRect.setAttribute("width", String(bodyWidth));
          this.bodyRect.setAttribute("height", String(bodyHeight));
          this.bodyRect.setAttribute("rx", String(roundness));
          this.bodyRect.setAttribute("ry", String(roundness));
          this.bodyRect.setAttribute("fill", fill);
        }
        refreshAutopilot() {
          this.clearAutoPilotTimers();
          if (!this.canExpand()) {
            return;
          }
          const expandDelay = this.currentItem.autoExpandDelayMs;
          const collapseDelay = this.currentItem.autoCollapseDelayMs;
          if (expandDelay == null && collapseDelay == null) {
            return;
          }
          if ((expandDelay !== null && expandDelay !== void 0 ? expandDelay : 0) <= 0) {
            this.setExpanded(true);
          } else {
            this.autoExpandTimer = window.setTimeout(() => {
              this.autoExpandTimer = null;
              this.setExpanded(true);
            }, expandDelay);
          }
          if (collapseDelay != null) {
            this.autoCollapseTimer = window.setTimeout(() => {
              this.autoCollapseTimer = null;
              this.setExpanded(false);
            }, collapseDelay);
          }
        }
        clearAutoPilotTimers() {
          if (this.autoExpandTimer != null) {
            clearTimeout(this.autoExpandTimer);
            this.autoExpandTimer = null;
          }
          if (this.autoCollapseTimer != null) {
            clearTimeout(this.autoCollapseTimer);
            this.autoCollapseTimer = null;
          }
        }
        resetPointerState(pointerId) {
          this.pointerStartY = null;
          this.root.style.removeProperty("--gooey-drag-y");
          if (this.root.hasPointerCapture(pointerId)) {
            this.root.releasePointerCapture(pointerId);
          }
        }
      };
      var ToasterManager = class {
        constructor(options = {}) {
          var _a, _b;
          this.hovering = false;
          this.hoverResumeTimer = null;
          this.viewports = /* @__PURE__ */ new Map();
          this.views = /* @__PURE__ */ new Map();
          this.dismissStates = /* @__PURE__ */ new Map();
          this.indicatorRaf = null;
          this.mounted = true;
          this.target = (_a = options.target) !== null && _a !== void 0 ? _a : document.body;
          this.position = (_b = options.position) !== null && _b !== void 0 ? _b : store.position;
          this.offset = options.offset;
          this.defaultOptions = options.options;
          store.position = this.position;
          store.options = this.defaultOptions;
          this.listener = (toasts) => {
            this.render(toasts);
          };
          store.listeners.add(this.listener);
          this.render(store.toasts);
        }
        configure(options = {}) {
          if (options.target && options.target !== this.target) {
            for (const viewport of this.viewports.values()) {
              options.target.append(viewport);
            }
            this.target = options.target;
          }
          if (options.position) {
            this.position = options.position;
          }
          if (options.offset !== void 0) {
            this.offset = options.offset;
          }
          if (options.options !== void 0) {
            this.defaultOptions = options.options;
          }
          store.position = this.position;
          store.options = this.defaultOptions;
          this.render(store.toasts);
        }
        unmount() {
          if (!this.mounted)
            return;
          this.mounted = false;
          store.listeners.delete(this.listener);
          this.clearDismissStates();
          this.stopIndicatorUpdates();
          if (this.hoverResumeTimer != null) {
            clearTimeout(this.hoverResumeTimer);
            this.hoverResumeTimer = null;
          }
          for (const view of this.views.values()) {
            view.destroy();
          }
          this.views.clear();
          for (const viewport of this.viewports.values()) {
            viewport.remove();
          }
          this.viewports.clear();
        }
        render(toasts) {
          var _a, _b;
          if (!this.mounted)
            return;
          const toastIds = new Set(toasts.map((item) => item.id));
          for (const [id, view] of this.views) {
            if (!toastIds.has(id)) {
              view.destroy();
              this.views.delete(id);
            }
          }
          const byPosition = /* @__PURE__ */ new Map();
          for (const toast of toasts) {
            const position = (_a = toast.position) !== null && _a !== void 0 ? _a : this.position;
            const bucket = byPosition.get(position);
            if (bucket) {
              bucket.push(toast);
            } else {
              byPosition.set(position, [toast]);
            }
          }
          for (const position of types_1.TOAST_POSITIONS) {
            const items = (_b = byPosition.get(position)) !== null && _b !== void 0 ? _b : [];
            if (!items.length) {
              this.removeViewport(position);
              continue;
            }
            const viewport = this.ensureViewport(position);
            this.applyViewportOffset(viewport, position);
            const placement = (0, internal_1.resolvePlacement)(position);
            for (const item of items) {
              const existing = this.views.get(item.id);
              if (existing) {
                existing.update(item, placement);
                viewport.append(existing.root);
                continue;
              }
              const view = new ToastView(item, placement, {
                onEnter: () => this.handleEnter(),
                onLeave: () => this.handleLeave(),
                onDismiss: (id) => dismissToast(id)
              });
              this.views.set(item.id, view);
              viewport.append(view.root);
            }
          }
          const dismissKeys = /* @__PURE__ */ new Set();
          for (const toast of toasts) {
            const duration = (0, internal_1.normalizeDuration)(toast.duration);
            if (!toast.exiting && isTimedDuration(duration)) {
              const key = timeoutKey(toast);
              dismissKeys.add(key);
              this.ensureDismissState(toast, key, duration);
            }
          }
          for (const key of Array.from(this.dismissStates.keys())) {
            if (!dismissKeys.has(key)) {
              this.deleteDismissState(key);
            }
          }
          if (this.hovering && !this.isAnyToastHovered()) {
            this.hovering = false;
          }
          this.scheduleDismiss(toasts);
          this.syncTimeoutIndicators(toasts);
        }
        ensureViewport(position) {
          const existing = this.viewports.get(position);
          if (existing) {
            existing.dataset.position = position;
            return existing;
          }
          const section = document.createElement("section");
          section.setAttribute("data-gooey-viewport", "");
          section.dataset.position = position;
          section.setAttribute("aria-live", "polite");
          this.target.append(section);
          this.viewports.set(position, section);
          return section;
        }
        removeViewport(position) {
          const viewport = this.viewports.get(position);
          if (!viewport)
            return;
          viewport.remove();
          this.viewports.delete(position);
        }
        applyViewportOffset(viewport, position) {
          if (this.offset === void 0) {
            viewport.style.top = "";
            viewport.style.right = "";
            viewport.style.bottom = "";
            viewport.style.left = "";
            return;
          }
          const value = typeof this.offset === "object" ? this.offset : {
            top: this.offset,
            right: this.offset,
            bottom: this.offset,
            left: this.offset
          };
          const toCss = (entry) => typeof entry === "number" ? `${entry}px` : entry;
          viewport.style.top = position.startsWith("top") && value.top !== void 0 ? toCss(value.top) : "";
          viewport.style.bottom = position.startsWith("bottom") && value.bottom !== void 0 ? toCss(value.bottom) : "";
          viewport.style.left = position.endsWith("left") && value.left !== void 0 ? toCss(value.left) : "";
          viewport.style.right = position.endsWith("right") && value.right !== void 0 ? toCss(value.right) : "";
        }
        ensureDismissState(toast, key = timeoutKey(toast), duration = (0, internal_1.normalizeDuration)(toast.duration)) {
          if (toast.exiting || !isTimedDuration(duration)) {
            return null;
          }
          const existing = this.dismissStates.get(key);
          if (existing) {
            return existing;
          }
          const state = {
            timer: null,
            duration,
            remaining: duration,
            startedAt: null
          };
          this.dismissStates.set(key, state);
          return state;
        }
        deleteDismissState(key) {
          const state = this.dismissStates.get(key);
          if (!state)
            return;
          if (state.timer != null) {
            clearTimeout(state.timer);
          }
          this.dismissStates.delete(key);
        }
        clearDismissStates() {
          for (const key of Array.from(this.dismissStates.keys())) {
            this.deleteDismissState(key);
          }
        }
        getRemainingMs(state, timestamp = getNow()) {
          if (state.startedAt == null) {
            return (0, internal_1.clamp)(state.remaining, 0, state.duration);
          }
          return (0, internal_1.clamp)(state.remaining - (timestamp - state.startedAt), 0, state.duration);
        }
        stopIndicatorUpdates() {
          if (this.indicatorRaf != null) {
            cancelAnimationFrame(this.indicatorRaf);
            this.indicatorRaf = null;
          }
        }
        syncTimeoutIndicators(toasts) {
          this.stopIndicatorUpdates();
          const currentTime = getNow();
          let needsRaf = false;
          for (const toast of toasts) {
            const view = this.views.get(toast.id);
            if (!view)
              continue;
            const duration = (0, internal_1.normalizeDuration)(toast.duration);
            const visible = Boolean(toast.timeoutIndicator) && !toast.exiting && isTimedDuration(duration);
            if (!visible) {
              view.setTimeoutIndicator(false, 1, false);
              continue;
            }
            const state = this.dismissStates.get(timeoutKey(toast));
            const remaining = state ? this.getRemainingMs(state, currentTime) : duration;
            const progress = remaining / duration;
            const paused = this.hovering || (state === null || state === void 0 ? void 0 : state.timer) == null;
            view.setTimeoutIndicator(true, progress, paused);
            if (!paused && progress > 0) {
              needsRaf = true;
            }
          }
          if (needsRaf) {
            this.indicatorRaf = requestAnimationFrame(() => {
              this.indicatorRaf = null;
              this.syncTimeoutIndicators(store.toasts);
            });
          }
        }
        scheduleDismiss(toasts) {
          if (this.hovering)
            return;
          for (const toast of toasts) {
            if (toast.exiting)
              continue;
            const duration = (0, internal_1.normalizeDuration)(toast.duration);
            if (!isTimedDuration(duration))
              continue;
            const key = timeoutKey(toast);
            const state = this.ensureDismissState(toast, key, duration);
            if (!state || state.timer != null)
              continue;
            state.remaining = (0, internal_1.clamp)(state.remaining, 0, state.duration);
            state.startedAt = getNow();
            state.timer = window.setTimeout(() => {
              this.deleteDismissState(key);
              dismissToast(toast.id);
              this.syncTimeoutIndicators(store.toasts);
            }, state.remaining);
          }
        }
        pauseDismissTimers() {
          const currentTime = getNow();
          for (const state of this.dismissStates.values()) {
            if (state.timer == null)
              continue;
            clearTimeout(state.timer);
            state.remaining = this.getRemainingMs(state, currentTime);
            state.startedAt = null;
            state.timer = null;
          }
        }
        handleEnter() {
          if (this.hoverResumeTimer != null) {
            clearTimeout(this.hoverResumeTimer);
            this.hoverResumeTimer = null;
          }
          if (!this.hovering) {
            this.hovering = true;
            this.pauseDismissTimers();
            this.syncTimeoutIndicators(store.toasts);
          }
        }
        handleLeave() {
          if (this.hoverResumeTimer != null) {
            clearTimeout(this.hoverResumeTimer);
          }
          this.hoverResumeTimer = window.setTimeout(() => {
            this.hoverResumeTimer = null;
            if (this.isAnyToastHovered()) {
              return;
            }
            this.hovering = false;
            this.scheduleDismiss(store.toasts);
            this.syncTimeoutIndicators(store.toasts);
          }, HOVER_RESUME_DELAY);
        }
        isAnyToastHovered() {
          for (const view of this.views.values()) {
            if (view.root.matches(":hover")) {
              return true;
            }
          }
          return false;
        }
      };
      var singletonManager = null;
      var ensureManager = () => {
        if (!isBrowser())
          return null;
        if (!singletonManager) {
          singletonManager = new ToasterManager();
        }
        return singletonManager;
      };
      var noopHandle = {
        update: () => {
        },
        unmount: () => {
        }
      };
      var createToaster = (options = {}) => {
        const manager = ensureManager();
        if (!manager) {
          return noopHandle;
        }
        manager.configure(options);
        return {
          update: (next) => manager.configure(next),
          unmount: () => {
            if (singletonManager === manager) {
              singletonManager = null;
            }
            manager.unmount();
          }
        };
      };
      exports.createToaster = createToaster;
      exports.mountToaster = exports.createToaster;
      var configureToaster = (options = {}) => {
        const manager = ensureManager();
        if (!manager)
          return;
        manager.configure(options);
      };
      exports.configureToaster = configureToaster;
      var unmountToaster = () => {
        if (!singletonManager)
          return;
        singletonManager.unmount();
        singletonManager = null;
      };
      exports.unmountToaster = unmountToaster;
      var ensureToastTarget = () => {
        ensureManager();
      };
      var showToast = (opts, state) => {
        if (!isBrowser()) {
          return generateId();
        }
        ensureToastTarget();
        return createToast(state ? Object.assign(Object.assign({}, opts), { state }) : opts).id;
      };
      var resolvePromiseOptions = (value, payload) => typeof value === "function" ? value(payload) : value;
      exports.toast = {
        show: (opts) => showToast(opts),
        success: (opts) => showToast(opts, "success"),
        error: (opts) => showToast(opts, "error"),
        warning: (opts) => showToast(opts, "warning"),
        info: (opts) => showToast(opts, "info"),
        action: (opts) => showToast(opts, "action"),
        promise: (promise, opts) => {
          if (!isBrowser()) {
            return typeof promise === "function" ? promise() : promise;
          }
          ensureToastTarget();
          const id = createToast(Object.assign(Object.assign({}, opts.loading), { state: "loading", duration: null, position: opts.position })).id;
          const pending = typeof promise === "function" ? promise() : promise;
          pending.then((data) => {
            if (opts.action) {
              const action = resolvePromiseOptions(opts.action, data);
              updateToast(id, Object.assign(Object.assign({}, action), { state: "action", id }));
              return;
            }
            const success = resolvePromiseOptions(opts.success, data);
            updateToast(id, Object.assign(Object.assign({}, success), { state: "success", id }));
          }).catch((error) => {
            const failure = resolvePromiseOptions(opts.error, error);
            updateToast(id, Object.assign(Object.assign({}, failure), { state: "error", id }));
          });
          return pending;
        },
        dismiss: (id) => {
          if (!isBrowser())
            return;
          dismissToast(id);
        },
        clear: (position) => {
          if (!isBrowser())
            return;
          if (position) {
            store.update((all) => all.filter((item) => item.position !== position));
            return;
          }
          store.update(() => []);
        }
      };
      exports.gooeyToast = exports.toast;
    }
  });

  // node_modules/gooey-toast/dist/index.js
  var require_index = __commonJS({
    "node_modules/gooey-toast/dist/index.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TOAST_POSITIONS = exports.unmountToaster = exports.toast = exports.mountToaster = exports.gooeyToast = exports.createToaster = exports.configureToaster = void 0;
      var toast_1 = require_toast();
      Object.defineProperty(exports, "configureToaster", { enumerable: true, get: function() {
        return toast_1.configureToaster;
      } });
      Object.defineProperty(exports, "createToaster", { enumerable: true, get: function() {
        return toast_1.createToaster;
      } });
      Object.defineProperty(exports, "gooeyToast", { enumerable: true, get: function() {
        return toast_1.gooeyToast;
      } });
      Object.defineProperty(exports, "mountToaster", { enumerable: true, get: function() {
        return toast_1.mountToaster;
      } });
      Object.defineProperty(exports, "toast", { enumerable: true, get: function() {
        return toast_1.toast;
      } });
      Object.defineProperty(exports, "unmountToaster", { enumerable: true, get: function() {
        return toast_1.unmountToaster;
      } });
      var types_1 = require_types();
      Object.defineProperty(exports, "TOAST_POSITIONS", { enumerable: true, get: function() {
        return types_1.TOAST_POSITIONS;
      } });
    }
  });
  return require_index();
})();
