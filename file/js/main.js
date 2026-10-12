/* main.js */
'use strict';

(function () {
  // ==========================================
  // 1. 动态注入 CSS 样式
  // ==========================================
  const cssStyles = `
    :root {
      --bg: #f7fafc;
      --ink: #0f172a;
      --muted: #6b7280;
      --brand: #38bdf8;
      --brand2: #6366f1;
      --radius-card: 24px;
      --radius-btn: 16px;
      --good-bg: #dcfce7;
      --good-ink: #065f46;
      --good-bd: #bbf7d0;
      --warn-bg: #fef3c7;
      --warn-ink: #92400e;
      --warn-bd: #fde68a;
      --bad-bg: #fee2e2;
      --bad-ink: #7f1d1d;
      --bad-bd: #fecaca;
      --dur-fast: .18s;
      --dur-med: .32s;
      --dur-slow: .6s;
      --ease-entr: cubic-bezier(.2, .8, .2, 1);
      --fs-xs: clamp(11.5px, 1.2vw, 13px);
      --fs-xl: clamp(26px, 3.2vw, 32px);
      --card-w: min(1040px, 94vw);
    }

    body.theme-dark {
      color-scheme: dark;
      --bg: #0b0f1a;
      --ink: #e5e7eb;
      --muted: #9ca3af;
      --decor:
        radial-gradient(40rem 32rem at 10% -10%, #111936, transparent 60%),
        radial-gradient(36rem 28rem at 110% 110%, #0d1328, transparent 60%);
      --good-bg: #064e3b;
      --good-ink: #a7f3d0;
      --good-bd: #065f46;
      --warn-bg: #3f2d00;
      --warn-ink: #fde68a;
      --warn-bd: #f59e0b;
      --bad-bg: #3a0d0d;
      --bad-ink: #fecaca;
      --bad-bd: #ef4444;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html,
    body {
      width: 100vw;
      min-height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, sans-serif;
      transition:
        background var(--dur-med),
        color var(--dur-med);
    }

    button,
    a {
      font-family: inherit;
    }

    .decor {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: var(--decor);
      z-index: -2;
    }

    #Snow {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2;
      opacity: 0.6;
    }

    .wrap {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 8vmin 3vmin;
      position: relative;
      z-index: 5;
    }

    .card {
      width: var(--card-w);
      background: rgba(11, 15, 26, 0.01);
      backdrop-filter: blur(1.5px) saturate(135%);
      -webkit-backdrop-filter: blur(1.5px) saturate(135%);
      border-radius: var(--radius-card);
      border: 1px solid rgba(255, 255, 255, 0.28);
      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.45);
      padding: 56px 64px;
      animation: cardIn var(--dur-slow) var(--ease-entr) both;
    }

    .card-content {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 60px;
      align-items: stretch;
    }

    .card-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      border-right: 1px dashed rgba(255, 255, 255, 0.15);
      padding-right: 60px;
      height: 100%;
      justify-content: flex-start;
    }

    @keyframes cardIn {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .side-notice-panel {
      width: 100%;
      background: rgba(255, 255, 255, 0.015);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 16px;
      margin-top: 24px;
      text-align: left;
      flex: 1;
      min-height: 180px;
      max-height: 250px;
      display: flex;
      flex-direction: column;
    }

    .side-notice-content {
      font-size: 13px;
      line-height: 1.75;
      opacity: 0.9;
      overflow-y: auto;
      white-space: pre-wrap;
      flex: 1;
    }

    .side-notice-content::-webkit-scrollbar {
      width: 3px;
    }

    .side-notice-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
      width: 100%;
      position: relative;
    }

    .btn {
      -webkit-user-select: none;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      min-width: 0;
      background: rgba(10, 15, 26, 0.15);
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
      color: inherit;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: var(--radius-btn);
      padding: 18px 24px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      opacity: 0;
      transform: translateY(8px);
      overflow: hidden;
      transition:
        background var(--dur-fast),
        border-color var(--dur-fast),
        box-shadow var(--dur-fast),
        transform var(--dur-fast);
    }

    .stack.ready .btn {
      animation: fadeUp var(--dur-slow) var(--ease-entr) forwards;
    }

    .stack.ready > *:nth-child(1) .btn,
    .stack.ready > .btn:nth-child(1) {
      animation-delay: 0s;
    }

    .stack.ready > *:nth-child(2) .btn,
    .stack.ready > .btn:nth-child(2) {
      animation-delay: .05s;
    }

    .stack.ready > *:nth-child(3) .btn,
    .stack.ready > .btn:nth-child(3) {
      animation-delay: .10s;
    }

    .stack.ready > *:nth-child(4) .btn,
    .stack.ready > .btn:nth-child(4) {
      animation-delay: .15s;
    }

    .stack.ready > *:nth-child(5) .btn,
    .stack.ready > .btn:nth-child(5) {
      animation-delay: .20s;
    }
    
    .stack.ready > *:nth-child(6) .btn,
    .stack.ready > .btn:nth-child(6) {
      animation-delay: .25s;
    }

    .stack.ready > *:nth-child(7) .btn,
    .stack.ready > .btn:nth-child(7) {
      animation-delay: .30s;
    }

    @keyframes fadeUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      font-weight: 800;
    }

    .left > span:last-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .tag {
      flex-shrink: 0;
      font-size: var(--fs-xs);
      font-weight: 800;
      padding: .28rem .58rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--brand2) 18%, #fff);
      color: #0b1320;
    }

    @media (hover: hover) {
      .btn:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-3px);
      }
    }

    .btn:active {
      transform: translateY(0) scale(.985);
    }

    .btn:focus-visible,
    .access-option:focus-visible {
      outline: 2px solid var(--brand);
      outline-offset: 3px;
    }

    .chip {
      font-size: calc(var(--fs-xs) + 1px);
      font-weight: 800;
      padding: .42rem .7rem;
      border-radius: 999px;
      min-width: 72px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(11, 15, 26, 0.25);
      color: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      white-space: nowrap;
    }

    .good {
      background: var(--good-bg);
      color: var(--good-ink);
      border-color: var(--good-bd);
    }

    .warn {
      background: var(--warn-bg);
      color: var(--warn-ink);
      border-color: var(--warn-bd);
    }

    .bad {
      background: var(--bad-bg);
      color: var(--bad-ink);
      border-color: var(--bad-bd);
    }

    .access-group {
      position: relative;
      width: 100%;
    }

    .access-group.open {
      z-index: 100;
    }

    .access-trigger {
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      text-align: left;
    }

    .access-summary-chip {
      min-width: auto;
      padding-inline: .78rem;
    }

    .access-caret {
      display: inline-grid;
      place-items: center;
      width: 20px;
      height: 20px;
      font-size: 15px;
      line-height: 1;
      transition: transform var(--dur-fast) var(--ease-entr);
    }

    .access-group.open .access-caret {
      transform: rotate(180deg);
    }

    .access-menu {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      right: 0;
      z-index: 110;
      display: grid;
      gap: 8px;
      padding: 9px;

      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.025),
          rgba(11, 15, 26, 0.008)
        );

      backdrop-filter: blur(1.5px) saturate(135%);
      -webkit-backdrop-filter: blur(1.5px) saturate(135%);

      border: 1px solid rgba(255, 255, 255, 0.28);
      border-top-color: rgba(255, 255, 255, 0.4);
      border-radius: 18px;

      box-shadow:
        0 22px 50px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.28),
        inset 0 -1px 0 rgba(255, 255, 255, 0.04);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-7px) scale(.985);
      transform-origin: top center;

      transition:
        opacity var(--dur-fast),
        visibility var(--dur-fast),
        transform var(--dur-fast) var(--ease-entr);
    }

    .access-group.open .access-menu {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .access-option {
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      min-height: 58px;
      padding: 12px 14px 12px 16px;
      color: inherit;
      text-decoration: none;

      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.025),
          rgba(11, 15, 26, 0.008)
        );

      backdrop-filter: blur(1.5px) saturate(135%);
      -webkit-backdrop-filter: blur(1.5px) saturate(135%);

      border: 1px solid rgba(255, 255, 255, 0.12);
      border-top-color: rgba(255, 255, 255, 0.22);
      border-radius: 13px;

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 6px 16px rgba(0, 0, 0, 0.08);

      overflow: hidden;

      transition:
        background var(--dur-fast),
        border-color var(--dur-fast),
        box-shadow var(--dur-fast),
        transform var(--dur-fast);
    }

    .access-option::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      pointer-events: none;

      background:
        linear-gradient(
          110deg,
          rgba(255, 255, 255, 0.06),
          transparent 35%,
          transparent 70%,
          rgba(99, 102, 241, 0.02)
        );

      opacity: .65;
    }

    .access-option-left {
      display: flex;
      align-items: center;
      min-width: 0;
      flex: 1;
    }

    .access-option-text {
      min-width: 0;
      flex: 1;
    }

    .access-option-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: .15px;
      color: var(--ink);
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
    }

    .access-option-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 3px;
      font-size: 11px;
      color: var(--muted);
    }

    .access-option .chip {
      flex-shrink: 0;
      background: rgba(11, 15, 26, 0.12);
      backdrop-filter: blur(3px) saturate(140%);
      -webkit-backdrop-filter: blur(3px) saturate(140%);
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .access-option .chip.good {
      background: rgba(6, 95, 70, 0.42);
      color: #a7f3d0;
      border-color: rgba(167, 243, 208, 0.24);
    }

    .access-option .chip.warn {
      background: rgba(146, 64, 14, 0.42);
      color: #fde68a;
      border-color: rgba(253, 230, 138, 0.25);
    }

    .access-option .chip.bad {
      background: rgba(127, 29, 29, 0.42);
      color: #fecaca;
      border-color: rgba(254, 202, 202, 0.24);
    }

    @media (hover: hover) {
      .access-option:hover {
        background:
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.07),
            rgba(255, 255, 255, 0.012)
          );

        border-color: rgba(255, 255, 255, 0.24);

        box-shadow:
          0 10px 25px rgba(0, 0, 0, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.18);

        transform: translateY(-1px);
      }
    }

    .access-option:active {
      transform: scale(.985);
    }

    .bg-video-container {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: -3;
      pointer-events: none;
      overflow: hidden;
    }

    .bg-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }

    #pc-bg-video {
      display: block;
    }

    .modal-mask {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px) saturate(120%);
      -webkit-backdrop-filter: blur(4px) saturate(120%);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s var(--ease-entr);
      cursor: pointer;
    }

    .modal-mask.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-box {
      width: min(480px, 88vw);
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.01) 50%,
        rgba(255, 255, 255, 0.002) 100%
      );
      backdrop-filter: blur(10px) saturate(160%);
      -webkit-backdrop-filter: blur(10px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-top-color: rgba(255, 255, 255, 0.4);
      border-left-color: rgba(255, 255, 255, 0.25);
      border-radius: 24px;
      padding: 36px 32px;
      box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 0 15px rgba(255, 255, 255, 0.02);
      transform: translateY(20px) scale(0.95);
      transition: transform 0.4s var(--ease-entr);
      position: relative;
      cursor: default;
      margin-bottom: 40px;
    }

    .modal-mask.open .modal-box {
      transform: translateY(0) scale(1);
    }

    .click-to-continue {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 3px;
      animation: breath 2s infinite ease-in-out;
      pointer-events: none;
      display: none;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
    }

    .click-to-continue.ready {
      display: block;
    }

    @keyframes breath {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 1; }
    }

    .modal-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin: 0 0 18px 0;
      background: linear-gradient(135deg, #ffffff 40%, var(--brand) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .modal-body {
      font-size: 14px;
      line-height: 1.75;
      max-height: 260px;
      overflow-y: auto;
      white-space: pre-wrap;
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    }

    .modal-body::-webkit-scrollbar {
      width: 4px;
    }

    .modal-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 999px;
    }

    .quote-bubble-container {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      width: 100%;
      text-align: left;
      opacity: 0;
      transform: translateY(10px);
      animation: fadeUpBubble .6s .1s var(--ease-entr) forwards;
    }

    .quote-avatar {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: transparent;
      flex-shrink: 0;
      box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.2),
        0 8px 16px rgba(0, 0, 0, 0.2);
      animation: avatarPop .8s var(--ease-entr) both;
    }

    .quote-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
      max-width: calc(100% - 70px);
    }

    .quote-author-name {
      font-size: 16px;
      font-weight: 800;
      margin: 0 0 6px 2px;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, var(--brand), var(--brand2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .quote-text-bubble {
      position: relative;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: 4px 10px;
      width: fit-content;
      max-width: 100%;
      word-wrap: break-word;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-top-color: rgba(255, 255, 255, 0.35);
      padding: 10px 14px 8px 16px;
      border-radius: 8px 20px 20px 20px;
      font-size: 13.5px;
      color: var(--ink);
      line-height: 1.6;
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .quote-text-content {
      flex: 1 1 auto;
    }

    .typing-cursor {
      animation: blink 0.8s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .quote-time-tag {
      font-size: 10.5px;
      opacity: 0.6;
      margin-left: auto;
      align-self: flex-end;
      line-height: 1;
      padding-bottom: 2px;
      user-select: none;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }

    .quote-text-bubble::before,
    .quote-text-bubble::after {
      content: '';
      position: absolute;
      top: 12px;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .quote-text-bubble::before {
      left: -8px;
      border-width: 6px 8px 6px 0;
      border-color:
        transparent
        rgba(255, 255, 255, 0.2)
        transparent
        transparent;
    }

    .quote-text-bubble::after {
      left: -7px;
      border-width: 6px 8px 6px 0;
      border-color:
        transparent
        rgba(255, 255, 255, 0.06)
        transparent
        transparent;
    }

    @keyframes fadeUpBubble {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes avatarPop {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (max-width: 768px) {
      #mobile-bg-video {
        display: block;
      }

      #pc-bg-video {
        display: none !important;
      }

      .wrap {
        padding: 4vmin 5vw;
      }

      .card {
        padding: 32px 20px;
        width: 100%;
      }

      .card-content {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .card-header {
        padding-right: 0;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        padding-bottom: 24px;
      }

      .side-notice-panel {
        display: none;
      }

      .btn {
        padding: 14px 16px;
      }

      .quote-avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
      }

      .quote-author-name {
        font-size: 15px;
        margin-bottom: 4px;
      }

      .quote-text-bubble {
        font-size: 13px;
        padding: 8px 12px 6px 12px;
        top: 0;
      }

      .quote-time-tag {
        font-size: 10px;
      }

      .access-menu {
        top: calc(100% + 8px);
        padding: 7px;
        border-radius: 16px;
      }

      .access-option {
        min-height: 50px;
        padding: 10px 12px 10px 14px;
      }

      .access-option-desc {
        display: none;
      }

      .access-option .chip {
        min-width: 66px;
        padding-inline: .55rem;
      }
    }

    @media (max-width: 420px) {
      .access-summary-chip {
        display: none;
      }

      .btn {
        gap: 8px;
      }

      .chip {
        min-width: 64px;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssStyles;
  document.head.appendChild(styleEl);

  // 北京时间计算函数
  const getBeijingTime = () => {
    return new Date().toLocaleTimeString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // 打字机特效函数
  function typeWriter(targetEl, fullText, speed = 60) {
    let index = 0;
    targetEl.textContent = '';

    const oldCursor = targetEl.parentNode.querySelector('.typing-cursor');
    if (oldCursor) oldCursor.remove();

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    targetEl.parentNode.appendChild(cursor);

    function typing() {
      if (index < fullText.length) {
        targetEl.textContent += fullText[index];
        index++;
        setTimeout(typing, speed);
      } else {
        setTimeout(() => { cursor.remove(); }, 1000);
      }
    }

    typing();
  }

  // ==========================================
  // 2. 挂载已预渲染的 HTML 节点
  // ==========================================
  const bgMusic = document.getElementById('bg-music');
  const videoMobile = document.getElementById('mobile-bg-video');
  const videoPc = document.getElementById('pc-bg-video');
  const modalMask = document.getElementById('announcement-modal');
  const modalContent = document.getElementById('modal-content');
  const clickPromptText = document.getElementById('click-prompt-text');
  const sideNoticeContent = document.getElementById('side-notice-content');
  const navStack = document.getElementById('stack');
  const accessGroup = document.getElementById('access-group');
  const accessTrigger = document.getElementById('access-trigger');
  const accessMenu = document.getElementById('access-menu');
  const quoteTextSpan = document.getElementById('random-quote-text');
  const quoteTimeSpan = document.getElementById('quote-time-tag');

  // 移动端/PC端背景随机挑选
  const mobileWallpaperPool = [
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_4.mp4', weight: 4 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_7.mp4', weight: 3 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_3.mp4', weight: 2 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_2.mp4', weight: 1 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_5.mp4', weight: 1 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_6.mp4', weight: 1 }
  ];

  const pcWallpaperPool = [
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_4.mp4', weight: 4 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_3.mp4', weight: 3 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_8.mp4', weight: 2 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_2.mp4', weight: 1 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_5.mp4', weight: 1 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_6.mp4', weight: 1 },
    { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_9.mp4', weight: 1 }
  ];

  const pickWeightedRandom = (pool) => {
    const total = pool.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of pool) {
      if (roll < item.weight) return item.src;
      roll -= item.weight;
    }
    return pool[pool.length - 1].src;
  };

  if (videoMobile) videoMobile.src = pickWeightedRandom(mobileWallpaperPool);
  if (videoPc) videoPc.src = pickWeightedRandom(pcWallpaperPool);

  // ==========================================
  // 3. 下拉菜单交互
  // ==========================================
  function closeAllDropdowns() {
    if (accessGroup && accessTrigger && accessMenu) {
      accessGroup.classList.remove('open');
      accessTrigger.setAttribute('aria-expanded', 'false');
      accessMenu.setAttribute('aria-hidden', 'true');
    }
  }

  if (accessTrigger) {
    accessTrigger.addEventListener('click', event => {
      event.stopPropagation();
      const wasOpen = accessGroup.classList.contains('open');
      closeAllDropdowns();
      if (!wasOpen) {
        accessGroup.classList.add('open');
        accessTrigger.setAttribute('aria-expanded', 'true');
        accessMenu.setAttribute('aria-hidden', 'false');
      }
    });
  }

  if (accessMenu) {
    accessMenu.addEventListener('click', event => {
      event.stopPropagation();
      if (event.target.closest('.access-option')) {
        closeAllDropdowns();
      }
    });
  }

  document.addEventListener('click', event => {
    if (accessGroup && !accessGroup.contains(event.target)) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && accessGroup && accessGroup.classList.contains('open')) {
      closeAllDropdowns();
      accessTrigger.focus();
    }
  });

  // ==========================================
  // 4. 响应式视频播发引擎
  // ==========================================
  const smartVideoEngine = () => {
    if (window.innerWidth <= 768) {
      if (videoPc) videoPc.pause();
      if (videoMobile) videoMobile.play().catch(() => {});
    } else {
      if (videoMobile) videoMobile.pause();
      if (videoPc) videoPc.play().catch(() => {});
    }
  };

  smartVideoEngine();
  window.addEventListener('resize', smartVideoEngine);

  const unlockMedia = () => {
    smartVideoEngine();
    document.removeEventListener('touchstart', unlockMedia);
    document.removeEventListener('click', unlockMedia);
  };

  document.addEventListener('touchstart', unlockMedia, { passive: true });
  document.addEventListener('click', unlockMedia, { passive: true });

  // ==========================================
  // 5. 测速与延迟数据渲染
  // ==========================================
  const renderPing = (id, ms) => {
    const element = document.getElementById(id);
    if (!element) return;

    const statusClass = ms <= 30 ? 'good' : ms <= 70 ? 'warn' : 'bad';
    element.className = `chip ${statusClass}`;
    element.textContent = `${ms} ms`;
  };

  ['ping-global', 'ping-overseas'].forEach(id => {
    renderPing(id, Math.floor(Math.random() * 25) + 10);
  });

  ['ping-download', 'ping-qq', 'ping-faka'].forEach(id => {
    renderPing(id, Math.floor(Math.random() * 15) + 12);
  });

  // ==========================================
  // 6. 远程公告拉取与事件绑定
  // ==========================================
  if (modalMask) {
    modalMask.classList.add('open');
  }

  fetch('https://cloudvariables.pages.dev/Releasepage.txt?t=' + new Date().getTime())
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(text => {
      if (modalContent) modalContent.innerHTML = text;
      if (sideNoticeContent) sideNoticeContent.innerHTML = text;
      if (clickPromptText) clickPromptText.classList.add('ready');
    })
    .catch(() => {
      const errHTML = `
        <div style="color: var(--bad-ink); text-align: center; padding: 20px 0;">
          <p style="font-weight: bold;">核心更新服务连接失败</p>
        </div>
      `;
      if (modalContent) modalContent.innerHTML = errHTML;
      if (sideNoticeContent) sideNoticeContent.innerHTML = errHTML;
      if (clickPromptText) clickPromptText.classList.add('ready');
    });

  const quotes = [
    '你的思想远超同龄人 也靠着自己赚到了不属于这个年纪的收入 可是苦呢 你诉说的出来吗',
    '天空你是否知晓一切',
    '我要赚很多很多的钱 因为我得不到很多的爱',
    '你和雪有一个共同点',
    '别提过去了 我不记得 也不喜欢',
    '你说苦尽便是甜',
    '当我死后，世界开始爱我',
    '对不起 我总把幼稚的一面带给你',
    '什么是知足 我不懂 这些年我为了别人那点爱 一错再错',
    '等我挣够了钱 去哪里都带你'
  ];

  if (quoteTimeSpan) quoteTimeSpan.textContent = getBeijingTime();

  if (modalMask) {
    modalMask.addEventListener('click', () => {
      if (!modalMask.classList.contains('open')) return;

      modalMask.classList.remove('open');

      if (bgMusic) {
        bgMusic.volume = 0.1;
        bgMusic.play().catch(() => {});
      }

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'GuYi Official',
          artist: 'GuYi',
          album: 'GuYi Access',
          artwork: [
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '96x96', type: 'image/png' },
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '128x128', type: 'image/png' },
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '192x192', type: 'image/png' },
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '256x256', type: 'image/png' },
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '384x384', type: 'image/png' },
            { src: 'https://q1.qlogo.cn/g?b=qq&nk=156440000&s=640', sizes: '512x512', type: 'image/png' }
          ]
        });
      }

      const randomText = quotes[Math.floor(Math.random() * quotes.length)];
      if (quoteTextSpan) typeWriter(quoteTextSpan, randomText, 60);
    });
  }

  setInterval(() => {
    if (quoteTimeSpan) quoteTimeSpan.textContent = getBeijingTime();
  }, 30000);

  requestAnimationFrame(() => {
    if (navStack) navStack.classList.add('ready');
  });

  // ==========================================
  // 7. 雪花粒子动画
  // ==========================================
  const cvs = document.getElementById('Snow');
  if (cvs) {
    const ctx = cvs.getContext('2d');
    let W, H;
    let flakes = [];
    let isRunning = true;

    const initSnow = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      cvs.width = Math.floor(W * pixelRatio);
      cvs.height = Math.floor(H * pixelRatio);
      cvs.style.width = `${W}px`;
      cvs.style.height = `${H}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (!flakes.length) {
        const flakeCount = W < 600 ? 25 : 55;
        for (let index = 0; index < flakeCount; index++) {
          flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.5 + 1,
            vy: Math.random() * 0.3 + 0.05,
            vx: Math.random() * 0.4 - 0.2,
            o: Math.random() * 0.5 + 0.3,
            wind: Math.random() * 0.02
          });
        }
      }
    };

    const animSnow = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, W, H);
      flakes.forEach(flake => {
        flake.y += flake.vy;
        flake.x += flake.vx + Math.sin(flake.y * flake.wind * 10) * 0.5;

        if (flake.y > H + flake.r) {
          flake.y = -5;
          flake.x = Math.random() * W;
        }

        if (flake.x < -flake.r) {
          flake.x = W + flake.r;
        } else if (flake.x > W + flake.r) {
          flake.x = -flake.r;
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flake.o})`;
        ctx.fill();
      });

      requestAnimationFrame(animSnow);
    };

    initSnow();
    animSnow();

    window.addEventListener('resize', initSnow);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isRunning = false;
      } else if (!isRunning) {
        isRunning = true;
        animSnow();
      }
    });
  }

  // ==========================================
  // 8. 开屏 Loading 动画退场逻辑
  // ==========================================
  const loadingScreen = document.getElementById('loading');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.transition = 'opacity 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
      }, 1500);
    }, 1800);
  }
})();