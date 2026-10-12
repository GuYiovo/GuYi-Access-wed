document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Dynamic Style Injection
    // ==========================================
    const headStyles = `
<link rel="icon" href="http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg" type="image/png">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root {
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.85);
    --text-muted: rgba(255, 255, 255, 0.55);
    --brand-pink: #FF2E93;
    --brand-blue: #0088FF;
    --brand-cyan: #00F0FF;
    --brand-green: #00E676;
    --gradient-primary: linear-gradient(135deg, var(--brand-pink), var(--brand-blue), var(--brand-cyan));
    --glass-bg: rgba(11, 15, 26, 0.01);
    --glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.28);
    --glass-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.45);
    --glass-blur: blur(1.5px) saturate(135%);
    --font-sans: 'Outfit', 'Inter', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --nav-height: 60px; 
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
::selection { background: rgba(0,136,255,0.35); color: #fff; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
html { scroll-behavior: smooth; scroll-padding-top: calc(var(--nav-height) + 40px); }
body { font-family: var(--font-sans); background: #0b0f1a; background-image: radial-gradient(40rem 32rem at 10% -10%, #111936, transparent 60%), radial-gradient(36rem 28rem at 110% 110%, #0d1328, transparent 60%); color: var(--text-primary); line-height: 1.6; overflow-x: hidden; min-height: 100vh; }

/* Cursor Glow */
.cursor-glow {
    position: fixed; width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,136,255,0.12) 0%, rgba(255,46,147,0.06) 40%, transparent 70%);
    border-radius: 50%; pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen; opacity: 0;
    transition: opacity 0.4s var(--ease-spring);
}

/* Ripple Animation */
@keyframes rippleEffect { to { transform: scale(1); opacity: 0; } }

/* Glass Shine Sweep */
.glass-shine { position: relative; overflow: hidden; }
.glass-shine::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(
        45deg,
        transparent 40%,
        rgba(255,255,255,0.08) 50%,
        transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.8s var(--ease-spring);
    pointer-events: none;
    z-index: 1;
}
.glass-shine:hover::before { transform: translateX(100%); }

.anime-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; object-fit: cover; pointer-events: none; z-index: 0; opacity: 0.6; }

.navbar { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); width: calc(100% - 48px); max-width: 1000px; height: var(--nav-height); z-index: 1000; display: flex; align-items: center; background: rgba(11, 15, 26, 0.01); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); border-radius: 100px; transition: all .5s var(--ease-spring); box-shadow: var(--glass-shadow); }
.navbar.scrolled { top: 16px; max-width: 900px; background: rgba(15, 21, 36, 0.01); border-color: rgba(255, 255, 255, 0.35); }
.nav-container { width: 100%; margin: 0 auto; padding: 0 20px 0 16px; display: flex; justify-content: space-between; align-items: center; }
.nav-brand { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 17px; color: #fff; text-decoration: none; text-shadow: 0 2px 12px rgba(0,0,0,.5); }
.nav-brand img { width: 34px; height: 34px; border-radius: 50%; }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-links a { color: rgba(255,255,255,.9); text-decoration: none; font-size: 14px; font-weight: 500; padding: 8px 18px; border-radius: 100px; transition: .3s var(--ease-spring); text-shadow: 0 1px 6px rgba(0,0,0,.3); position: relative; overflow: hidden; }
.nav-links a:hover, .nav-links a.active { color: #fff; background: rgba(255,255,255,.15); backdrop-filter: blur(8px); }

.section { padding: 100px 0; position: relative; z-index: 2; }
.container { max-width: 1460px; margin: 0 auto; padding: 0 40px; }
.title-lg { font-size: clamp(32px,3.5vw,52px); font-weight: 900; line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 24px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.95), 0 4px 12px rgba(99, 102, 241, 0.6); }
.text-gradient { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { font-size: clamp(15px,1.2vw,17px); color: var(--text-secondary); max-width: 90%; line-height: 1.8; margin-bottom: 40px; text-shadow: 0 2px 8px rgba(0,0,0,.3); }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 28px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; transition: all .4s var(--ease-spring); border: none; white-space: nowrap; position: relative; overflow: hidden; }
.btn-glow { background: var(--gradient-primary); color: #fff; box-shadow: 0 8px 25px rgba(0,136,255,.35); }
.btn-glow:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(0,136,255,.55); }
.btn-outline { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.35); backdrop-filter: blur(10px); }
.btn-outline:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.5); transform: translateY(-2px); }

.docs-wrapper { display: grid; grid-template-columns: 240px minmax(0,1fr); gap: 40px; align-items: start; }
@media(min-width:1200px){ .docs-wrapper{ grid-template-columns: 220px minmax(0,1fr) 550px; gap:40px; } }

.docs-nav { position: sticky; top: 100px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); padding: 16px 8px; box-shadow: var(--glass-shadow); }
.docs-nav-group { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin: 20px 0 8px 12px; }
.docs-nav a { display: block; padding: 8px 12px; border-radius: 6px; color: var(--text-secondary); text-decoration: none; font-size: 14px; transition: all .3s var(--ease-spring); border-left: 2px solid transparent; position: relative; overflow: hidden; }
.docs-nav a:hover { color: #fff; background: var(--glass-bg-hover); transform: translateX(3px); }
.docs-nav a.active { color: #fff; background: rgba(255, 255, 255, 0.15); border-left-color: var(--brand-blue); font-weight: 600; }
.docs-nav a.active::after {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 2px; height: 100%;
    background: linear-gradient(to bottom, var(--brand-cyan), var(--brand-pink));
    animation: navGlow 2s ease-in-out infinite;
}
@keyframes navGlow {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--brand-cyan); }
    50% { opacity: 0.6; box-shadow: 0 0 16px var(--brand-pink); }
}

.docs-content { padding-bottom: 100px; width: 100%; overflow: hidden; }
.doc-block { margin-bottom: 80px; }
.doc-block h2 { font-size: 28px; font-weight: 800; margin-bottom: 16px; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.4); }
.doc-block h3 { font-size: 18px; font-weight: 700; margin: 32px 0 16px; color: #fff; border-bottom: 1px solid rgba(255,255,255,.15); padding-bottom: 8px; transition: all .3s var(--ease-spring); }
.doc-block p { font-size: 15px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.8; }
.doc-block ul { padding-left: 20px; color: var(--text-secondary); font-size: 14.5px; margin-bottom: 16px; }
.doc-block ul li { margin-bottom: 8px; transition: transform .25s var(--ease-spring); }
.doc-block ul li:hover { transform: translateX(4px); }

.alert { display: flex; gap: 16px; padding: 16px 20px; border-radius: var(--radius-sm); margin: 24px 0; font-size: 14px; line-height: 1.6; transition: all .3s var(--ease-spring); }
.alert:hover { transform: translateY(-2px); }
.alert-warn { border: 1px solid rgba(255,189,46,.45); background: rgba(255,189,46,.12); }
.alert-danger { border: 1px solid rgba(255,46,147,.45); background: rgba(255,46,147,.12); }

.table-wrapper { overflow-x: auto; margin-bottom: 24px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm); background: var(--glass-bg); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); transition: all .3s var(--ease-spring); }
.table-wrapper:hover { border-color: rgba(255,255,255,0.4); }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left; }
th { background: rgba(255,255,255,.05); padding: 12px 16px; color: rgba(255,255,255,.7); border-bottom: 1px solid rgba(255,255,255,.15); white-space: nowrap; }
td { padding: 16px; color: var(--text-secondary); border-bottom: 1px solid rgba(255,255,255,.06); transition: all .25s var(--ease-spring); }
tr:hover td { background: rgba(255,255,255,0.04); color: #fff; }
td code { color: var(--brand-pink); font-family: var(--font-mono); font-size: 12.5px; background: rgba(255,46,147,.15); padding: 2px 6px; border-radius: 4px; }
.tag-req { font-size: 10px; background: rgba(255,46,147,.2); color: var(--brand-pink); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255,46,147,.4); white-space: nowrap; display: inline-block; transition: all .25s var(--ease-spring); }
.tag-req:hover { transform: scale(1.05); }
.tag-opt { font-size: 10px; background: rgba(0,136,255,.2); color: var(--brand-blue); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(0,136,255,.4); white-space: nowrap; display: inline-block; transition: all .25s var(--ease-spring); }
.tag-opt:hover { transform: scale(1.05); }

.code-panel { position: sticky; top: 100px; height: calc(100vh - 140px); background: rgba(15, 21, 36, 0.01); border: 1px solid var(--glass-border); border-radius: var(--radius-md); display: flex; flex-direction: column; overflow: hidden; backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); transition: all .3s var(--ease-spring); }
.code-panel:hover { border-color: rgba(255,255,255,0.4); }
.code-panel-header { display: flex; background: rgba(0,0,0,.25); border-bottom: 1px solid rgba(255,255,255,.1); }
.lang-list { display: flex; overflow-x: auto; scrollbar-width: none; padding: 4px; }
.lang-list::-webkit-scrollbar { display: none; }
.lang-btn { flex: 0 0 auto; padding: 10px 16px; background: transparent; border: none; color: rgba(255,255,255,.6); font-size: 13px; font-weight: 600; cursor: pointer; border-radius:6px; transition: all .3s var(--ease-spring); position: relative; overflow: hidden; }
.lang-btn:hover { color: var(--text-secondary); background: rgba(255,255,255,.05); }
.lang-btn.active { color: #fff; background: rgba(255,255,255,.1); }
.code-panel-body { flex: 1; overflow: auto; padding: 0; position: relative; background: rgba(10, 15, 26, 0.15); }
.code-pane { display: none; padding: 20px; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: #f4f4f5; }
.code-pane.active { display: block; animation: fadeSlideIn .4s var(--ease-spring); }
@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.code-pane .c{color:#8b8b8d} .code-pane .k{color:#FF409F} .code-pane .s{color:#10E880} .code-pane .f{color:#10F0FF} .code-pane .t{color:#9B4BFF}
.copy-btn-abs { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 11px; cursor: pointer; transition: all .3s var(--ease-spring); overflow: hidden; z-index: 10; }
.copy-btn-abs:hover { background: rgba(255,255,255,.25); transform: translateY(-1px); }

.inline-code { background: rgba(10, 15, 26, 0.25); border: 1px solid rgba(255,255,255,.12); border-radius: var(--radius-sm); padding: 16px; font-family: var(--font-mono); font-size: 13px; color: #f4f4f5; overflow-x: auto; margin-bottom: 20px; backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); transition: all .3s var(--ease-spring); }
.inline-code:hover { border-color: rgba(255,255,255,0.25); }

/* Enhanced Reveal with Blur Dissipation */
.reveal { opacity: 0; transform: translateY(30px); filter: blur(12px); transition: all 0.9s var(--ease-spring); }
.reveal.active { opacity: 1; transform: translateY(0); filter: blur(0); }

.qq-banner { background: rgba(0, 136, 255, 0.02); border: 1px solid rgba(0, 136, 255, 0.35); border-radius: var(--radius-md); padding: 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 40px; backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); transition: all .4s var(--ease-spring); }
.qq-banner:hover { transform: translateY(-3px); border-color: rgba(0, 136, 255, 0.5); box-shadow: 0 20px 60px rgba(0, 136, 255, 0.15), var(--glass-shadow); }
.qq-banner h3 { color: #fff; margin-bottom: 8px; font-size: 18px; }
.qq-banner p { color: var(--text-secondary); font-size: 14px; margin: 0; }
.qq-btn { background: rgba(0,136,255,.8); color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid rgba(0,136,255,.6); white-space: nowrap; transition: all 0.3s var(--ease-spring); position: relative; overflow: hidden; }
.qq-btn:hover { background: rgba(0, 136, 255, 1); transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0, 136, 255, 0.4); }

footer { border-top: 1px solid rgba(255,255,255,.1); padding: 60px 0 40px; margin-top: 60px; background: rgba(0,0,0,.3); }
.f-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 40px; padding: 0 40px; }
.f-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 20px; }
.f-links a { display: block; color: var(--text-secondary); text-decoration: none; font-size: 14px; margin-bottom: 12px; transition: all .25s var(--ease-spring); }
.f-links a:hover { color: var(--brand-cyan); transform: translateX(4px); }
.f-bottom { max-width: 1400px; margin: 40px auto 0; padding: 20px 40px 0; border-top: 1px solid rgba(255,255,255,.1); display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); }

.toast { position: fixed; bottom: 40px; left: 50%; transform: translate(-50%,20px) scale(0.95); background: rgba(0,230,118,.2); border: 1px solid rgba(0,230,118,.45); color: #00FF88; padding: 12px 24px; border-radius: 100px; font-size: 13px; font-weight: 600; z-index: 9999; opacity: 0; pointer-events: none; transition: all .4s var(--ease-spring); backdrop-filter: blur(12px); }
.toast.show { opacity: 1; transform: translate(-50%,0) scale(1); }

@media(max-width:1199px){ .code-panel{position:static;height:600px;margin-top:40px;} }
@media(max-width:1024px){ 
    .cursor-glow { display: none; }
}
@media(max-width:768px){ 
    .navbar { top: 16px; width: calc(100% - 32px); height: 56px; }
    .nav-brand span { display: none; }
    .nav-links a:not(:last-child) { display: none; }
    .section{padding:60px 0;} 
    .docs-wrapper{grid-template-columns:1fr;} 
    .docs-nav{display:none;} 
    .qq-banner{flex-direction:column;} 
    .code-panel{height:500px;margin:0 -20px;border-radius:0;} 
    .f-bottom{flex-direction:column;align-items:center;gap:16px;}
}
.docs-page-header { 
    padding: 120px 40px 40px; 
    text-align: center; 
    border-bottom: 1px solid rgba(255,255,255,0.08); 
    background: radial-gradient(circle at top, rgba(0,136,255,0.12) 0%, transparent 60%); 
    position: relative;
    z-index: 2;
}
.docs-page-header h1 { font-size: 42px; font-weight: 800; margin-bottom: 16px; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.95)) drop-shadow(0 4px 12px rgba(99, 102, 241, 0.6)); }
.docs-page-header p { color: var(--text-secondary); font-size: 16px; max-width: 600px; margin: 0 auto; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.95); }
.disclaimer-card {
    background: rgba(15, 21, 36, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    transition: all .35s var(--ease-spring);
}
.disclaimer-card:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    background: rgba(15, 21, 36, 0.55);
}
.disclaimer-card-title {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 6px;
}
.disclaimer-card-desc {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.7;
}
</style>
    `;
    document.head.insertAdjacentHTML('beforeend', headStyles);

    // ==========================================
    // 2. Dynamic Body Content Injection
    // ==========================================
    const bodyContent = `
<div class="cursor-glow" id="cursor-glow"></div>
<video aria-hidden="true" autoplay="" class="anime-bg" id="anime-bg" loop="" muted="" playsinline=""></video>
<header class="navbar scrolled glass-shine" id="navbar">
<nav class="nav-container">
<a class="nav-brand" href="index.html"><img alt="GuYi Access logo" src="http://q.qlogo.cn/headimg_dl?dst_uin=156440000&amp;spec=640&amp;img_type=jpg"/>GuYi Access</a>
<div class="nav-links">
<a href="index.html">Home</a>
<a class="active" href="#">Developer Docs</a>
<a href="https://github.com/GuYiovo/GuYi-Access" target="_blank"><i class="fab fa-github"></i></a>
</div>
</nav>
</header>
<div class="docs-page-header">
<h1>GuYi Access Pro Developer Documentation</h1>
<p>Based on the currently published source code, this guide covers the API, multilingual client integration examples, and AES-256-GCM response decryption.</p>
</div>
<main>
<section class="section docs-section-bg" style="padding-top: 20px;">
<div class="container docs-wrapper">
<aside class="docs-nav glass-shine reveal">
<div class="docs-nav-group">Before You Begin</div>
<a class="active" href="#disclaimer">Open-Source Disclaimer</a>
<div class="docs-nav-group">Quick Start</div>
<a href="#setup">Environment and Deployment</a>
<a href="#protocol">Global Limits and Communication Protocol</a>
<div class="docs-nav-group">Core API Endpoints</div>
<a href="#verify">License Key Verification and Request Rules</a>
<a href="#heartbeat">Heartbeats and Active Devices</a>
<a href="#unbind">Self-Service Unbinding</a>
<a href="#vars">Cloud Variables and Data</a>
<div class="docs-nav-group">Backend Platform Integration</div>
<a href="#admin-api">Automated Key Distribution API</a>
<div class="docs-nav-group">Security and Protection</div>
<a href="#defend">Cloud Blacklist</a>
<a href="#crypto">AES-256-GCM Encryption</a>
<a href="#examples">Integration Examples in 8 Languages</a>
<a href="#error-codes">Global Status Codes</a>
</aside>
<article class="docs-content">
<div class="qq-banner reveal" id="contact">
<div>
<h3><i class="fab fa-qq" style="color:#0088FF"></i> Developer Community</h3>
<p>For questions about cross-language integration, request debugging, or AES-256-GCM decryption, join the developer community. Group ID:  <strong>1077643184</strong></p>
</div>
<a class="qq-btn" href="https://qm.qq.com/q/X3suYdjWAA" target="_blank">Join the Community</a>
</div>
<div class="doc-block reveal" id="disclaimer">
<h2 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">Open-Source Disclaimer and Reading Guide</h2>
<div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid rgba(255, 255, 255, 0.4); padding: 18px 24px; border-radius: 8px; margin-bottom: 28px;">
<strong style="color: #fff; font-size: 15px; display: block; margin-bottom: 8px;">Important: This is a non-profit open-source project, not a paid commercial product.</strong>
<span style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">The core engine is open source to share knowledge and support learning and collaboration. Before reading this guide and integrating the project, please understand the following principles:</span>
</div>
<div>
<div class="disclaimer-card">
<div class="disclaimer-card-title">1. Open Source Does Not Include One-on-One Handholding</div>
<div class="disclaimer-card-desc">Open source is not a commercial service. Maintainers are not obligated to provide step-by-step tutorials from scratch or ready-made code for every programming language.</div>
</div>
<div class="disclaimer-card">
<div class="disclaimer-card-title">2. Basic Technical Skills Are Required</div>
<div class="disclaimer-card-desc">This guide describes the communication protocol, API parameters, and AES-256-GCM response format implemented in the current source. Cross-platform integration requires basic programming skills and the ability to debug requests and analyze logs independently.</div>
</div>
<div class="disclaimer-card">
<div class="disclaimer-card-title">3. Use Open-Source Resources Responsibly</div>
<div class="disclaimer-card-desc">If you expect an open-source project to provide every customization and one-on-one support for free, this project may not be a good fit. We welcome technical discussion and ask that you respect the time and effort of maintainers.</div>
</div>
<div class="disclaimer-card">
<div class="disclaimer-card-title">4. Disclaimer (Provided “As Is”)</div>
<div class="disclaimer-card-desc">The source code and documentation are provided “as is,” without warranties of any kind, express or implied. The authors are not liable for losses or disputes arising from use of this project.</div>
</div>
</div>
<p style="color: var(--text-muted); font-size: 14px; margin-top: 24px; padding-left: 4px; border-left: 2px solid var(--text-muted);">
                        Please respect the spirit of open source and exercise your own judgment. If you agree with these principles, continue with the documentation below.
                    </p>
</div>
<div class="doc-block reveal" id="setup">
<h2>System Requirements and Deployment</h2>
<p>The GuYi Access Pro v2026.10.6 backend is built with native PHP and is lightweight enough to run in any web environment that meets the basic requirements.</p>
<ul><li><strong>PHP version:</strong> 7.2 or later is recommended (PDO and JSON extensions required)</li><li><strong>Database:</strong> MySQL 5.6 or later</li></ul>
<h3>Quick Deployment Steps:</h3>
<p>Upload the source code to your website root directory, then visit  <code>http://your-domain/install.php</code>. Follow the on-screen instructions to enter your database connection details and click Install. The required tables will be created automatically.</p>
</div>
<div class="doc-block reveal" id="protocol">
<h2>Communication Protocol and Global Rate Limits</h2>
<p>The current server exposes a unified JSON API for client verification. Send HTTPS POST requests to the actual PHP API URL provided in the application dashboard; do not assume the static website domain is also the API domain.</p>
<div class="inline-code"><span class="k">POST</span> /Verifyfile/api.php<br/>Content-Type: application/json</div>
<p>The server applies rate limits by IP address and returns HTTP 429 with a JSON error when the limit is exceeded. Clients should set connection/read timeouts and retry later after a rate-limit response. Avoid frequent polling.</p>
</div>
<div class="doc-block reveal" id="verify">
<h2>License Key Verification (Based on the Current Server Source)</h2>
<p>The current <code>Verify.php</code> does not validate the legacy <code>timestamp</code> and <code>sign</code> fields. Basic verification uses <code>app_key</code> and <code>card_code</code>; a stable <code>device_hash</code> is also recommended. Do not copy examples of the legacy signature algorithm.</p>
<h3>Request Parameters</h3>
<div class="table-wrapper glass-shine">
<table>
<thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>app_key</code></td><td>String</td><td><span class="tag-req">Required</span></td><td>The 64-character hexadecimal AppKey generated when an application is created in the dashboard. The current encryption implementation decodes it into a 32-byte AES key.</td></tr>
<tr><td><code>card_code</code></td><td>String</td><td><span class="tag-req">Required for verification</span></td><td>The license key entered by the user. If omitted, the API returns application update information and public cloud variables instead of verifying a key.</td></tr>
<tr><td><code>device_hash</code></td><td>String</td><td><span class="tag-opt">Recommended</span></td><td>A stable device identifier for the current installation. The server binds the key to this string. If omitted, the request source IP is MD5-hashed as a fallback, which may cause unstable binding when the network changes.</td></tr>
<tr><td><code>custom_data</code></td><td>String</td><td><span class="tag-opt">Optional</span></td><td>Custom text associated with the license key. To store JSON, serialize it to a string before sending it.</td></tr>
<tr><td><code>action</code></td><td>String</td><td><span class="tag-opt">Optional</span></td><td>License key verification is the default and this field can be omitted. Use another action only for an administrative operation explicitly implemented by the server.</td></tr>
</tbody>
</table>
</div>
<h3>Important: Client Access Restrictions on the Current Server</h3>
<div class="alert alert-warn"><i class="fas fa-triangle-exclamation"></i><div>The current <code>Database::verifyCard()</code> checks the HTTP <code>User-Agent</code>. Verification proceeds only if it contains <code>[IOS_WEBAPP_VERIFIED]</code> or the license key has <code>browser_whitelist=1</code>. The generic SDK examples below do not forge this marker. For regular desktop or mobile clients, enable the relevant license-key browser whitelist according to your policy, or adjust the server-side client authorization logic; otherwise, requests will be rejected.</div></div>
<h3>Response Format and Success Checks</h3>
<p>A decrypted successful response has the structure <code>{code, msg, data}</code>. The <code>data</code> object may contain <code>expire_time</code>, <code>custom_data</code>, <code>update</code>, and <code>variables</code>. Check whether the JSON field <code>code === 200</code> to determine business-level success. Some error responses are unencrypted JSON, so do not assume that every response contains <code>encrypted_data</code>.</p>
</div>
<div class="doc-block reveal" id="heartbeat">
<h2>Active Devices and Heartbeat Updates</h2>
<p>The current source code does not implement a separate <code>action=heartbeat</code> branch. When an already-bound device submits the same application key and the same <code>device_hash</code> again, the server refreshes the active device’s <code>last_heartbeat</code>. Do not treat the legacy <code>action=heartbeat</code> as a separate endpoint. Poll at a reasonable interval and observe the per-IP rate limit.</p>
</div>
<div class="doc-block reveal" id="unbind">
<h2>Self-Service Device Unbinding</h2>
<p>Users can unbind a device themselves when switching computers. The system deducts a specified penalty period to reduce manual support requests.</p>
<ul>
<li><strong>Parameters:</strong> <code>action=unbind</code>, <code>card_code=TARGET_CARD_CODE</code></li>
<li><strong>Penalty:</strong> A successful call to this endpoint deducts <strong>12 hours</strong> from the license key’s remaining validity period.</li>
<li><strong>How it works:</strong> After a successful call, the system clears the device record for that license key. When the user signs in and verifies the key on a new computer, the new device is bound automatically.</li>
</ul>
</div>
<div class="doc-block reveal" id="vars">
<h2>Software Updates and Cloud Variables</h2>
<p>When a valid <code>app_key</code> is provided without <code>card_code</code>, the API returns application update information and public cloud variables. After successful license-key verification, the response’s <code>data</code> object may also include the key’s expiration time, custom data, update information, and application variables.</p>
<p><code>custom_data</code> is a custom string associated with a license key, not a standalone variable endpoint. Serialize any object as JSON text before sending it. Do not treat an AppKey embedded in a client or cloud variables as secrets that cannot be extracted.</p>
</div>
<div class="doc-block reveal" id="admin-api">
<h2>Automated Key Distribution Platforms and Admin API</h2>
<p>These endpoints are intended for automated key distribution platforms and bot-based administration. Requests <strong>must include <code>api_token</code></strong> for authentication.</p>
<div class="alert alert-warn">
<i class="fas fa-lock" style="font-size: 16px; margin-top: 2px;"></i>
<div><strong>Security Warning:</strong> The repository currently contains a hard-coded default admin API token. Before deployment, replace it with a strong random token and load it from secure configuration or an environment variable. Never include the admin token in client applications or public documentation.</div>
</div>
<h3>1. Generate License Keys in Bulk (For Distribution Platforms)</h3>
<ul>
<li><strong>Parameters:</strong> <code>action=generate</code>, <code>api_token=YOUR_TOKEN</code>, <code>app_id=YOUR_APP_ID</code>, <code>type=day</code> or <code>type=custom</code>, <code>num=COUNT</code></li>
<li><strong>Optional parameters:</strong> <code>pre=PREFIX</code>, <code>note=NOTE</code>, <code>custom_hours=HOURS</code> (used with <code>type=custom</code>)</li>
<li><strong>Response:</strong> The response includes a <code>card_string</code> field containing newline-separated license keys that can be imported directly into a distribution platform.</li>
</ul>
<h3>2. Force Logout and Unbind (No Time Deduction)</h3>
<ul>
<li><strong>Parameters:</strong> <code>action=kick</code>, <code>api_token=YOUR_TOKEN</code>, <code>card_code=TARGET_CARD_CODE</code></li>
<li><strong>Purpose:</strong> An administrator can forcibly clear the target key’s device binding <strong>without deducting any penalty time</strong>.</li>
</ul>
<h3>3. Ban, Unban, and Permanently Delete</h3>
<ul>
<li><strong>Add to blacklist:</strong> <code>action=ban</code> (suspends the key and prevents the user from signing in)</li>
<li><strong>Remove ban:</strong> <code>action=unban</code> (restores normal status)</li>
<li><strong>Permanently delete:</strong> <code>action=del_card</code> (permanently removes the key from the database)</li>
</ul>
</div>
<div class="doc-block reveal" id="defend">
<h2>Active Defense and Cloud Blacklisting (High-Risk Operations)</h2>
<p>This endpoint strengthens software protection. When a client detects <strong>CE / OD, packet-capture tools, or memory injection</strong> in the user’s environment, it can call this API to blacklist the associated device in the cloud.</p>
<div class="alert alert-danger"><i class="fas fa-shield-virus"></i><div><strong>Strict enforcement:</strong> Once triggered, the associated device’s <code>device_hash</code> and public IP address are added to the cloud blacklist, blocking further access.</div></div>
<ul>
<li><strong>Action:</strong> <code>action=ban_machine</code> (or <code>action=blacklist</code>)</li>
<li><strong>Required parameters:</strong> <code>device_hash=TARGET_DEVICE_HWID</code></li>
<li><strong>Optional parameters:</strong> <code>reason=REASON</code></li>
</ul>
</div>
<div class="doc-block reveal" id="crypto">
<h2>AES-256-GCM Response Decryption</h2>
<p>When API encryption is enabled in the dashboard and the server is given a valid AppKey while building the response, the outer response contains <code>encrypted_data</code>. Base64-decode this value, then split the payload in the order used by the server.</p>
<div class="inline-code">{ "encrypted_data": "Base64(IV + Tag + Ciphertext)" }</div>
<ul>
<li><strong>Key:</strong> The current server hex-decodes the 64-character hexadecimal <code>app_key</code> into a 32-byte AES-256 key. It does not use <code>api_secret</code>.</li>
<li><strong>First 12 bytes:</strong> IV (initialization vector).</li>
<li><strong>Next 16 bytes:</strong> GCM tag (authentication tag).</li>
<li><strong>Remaining bytes:</strong> Ciphertext. Some language-specific crypto libraries require the tag to follow the ciphertext, so the examples rearrange the buffer as required by each library.</li>
<li><strong>Authentication:</strong> Always verify the GCM tag. Reject the response if decryption or authentication fails; do not proceed.</li>
<li><strong>Handling Error Responses:</strong> Some current error paths build a response without an AppKey and therefore return plain-text JSON in the form <code>{code, msg, data}</code>. Clients must support both response formats.</li>
</ul>
<p><strong>Security Note:</strong> The AppKey serves as both a client-visible identifier and a symmetric decryption key. If embedded in a desktop or mobile application, it may be extracted through reverse engineering; obfuscation cannot guarantee secrecy. Never put the admin <code>api_token</code> in a client.</p>
</div>
<div class="doc-block reveal" id="examples">
<h2>Client Integration Examples in 8 Languages</h2>
<p>The examples below reflect the request fields, response structure, and AES-GCM byte layout in the current repository. Replace the API URL, AppKey, license key, and stable device identifier, then install the dependencies required for your language.</p>
<p>Read “Client Access Restrictions” above first. The current server may require the license key’s browser whitelist to be enabled; otherwise, even a correctly formatted request from a generic SDK may be rejected.</p>
</div>
<div class="doc-block reveal" id="error-codes">
<h2>Global Status Codes</h2>
<div class="table-wrapper glass-shine">
<table>
<thead><tr><th>Business Code</th><th>Meaning</th><th>Recommended Client Handling</th></tr></thead>
<tbody>
<tr><td><code>200</code></td><td>Verification or request succeeded</td><td>Proceed only after decryption and parsing complete and the business code is 200.</td></tr>
<tr><td><code>400</code></td><td>A required parameter is missing, no license key was supplied, or an action parameter is invalid</td><td>Check the required fields and parameter names.</td></tr>
<tr><td><code>403</code></td><td>The AppKey is incorrect, the application is unavailable, the license key is invalid or banned, the device conflicts with an existing binding, or a client policy was triggered</td><td>Display the server’s <code>msg</code> and deny access. Do not treat an error response as success.</td></tr>
<tr><td><code>404</code></td><td>The specified license-key record does not exist for some administrative operations</td><td>Check the target license key and application.</td></tr>
<tr><td><code>429</code></td><td>The per-IP request rate limit was exceeded</td><td>Reduce the request rate and retry after a short delay.</td></tr>
<tr><td><code>500</code></td><td>Internal server error</td><td>Check the server logs and database connection.</td></tr>
</tbody>
</table>
</div>
<p>Note: <code>code</code> is the business code in the JSON response and does not necessarily match the HTTP status code. Parse the response safely before checking the business code, and log transport-level statuses such as HTTP 429 separately.</p>
</div>
</article>
<div class="code-panel glass-shine reveal" id="code-panel">
<div class="code-panel-header"><div class="lang-list" id="lang-list"></div></div>
<div class="code-panel-body" id="code-body"><button class="copy-btn-abs" onclick="copyCurrentCode()"><i class="fas fa-copy"></i> Copy Code</button></div>
</div>
</div>
</section>
</main>
<footer>
<div class="f-grid">
<div><div style="color:#fff;font-size:18px;margin-bottom:12px;font-weight:bold;">GuYi Access Official Project</div><p style="color:rgba(255,255,255,.45);font-size:13px;line-height:1.6;">Providing easy-to-deploy software licensing and online verification components for the open-source community.</p></div>
<div class="f-links"><div class="f-title">Site Navigation</div><a href="index.html">Home</a><a href="https://github.com/GuYiovo/GuYi-Access" target="_blank">Open-Source Code on GitHub</a></div>
<div class="f-links"><div class="f-title">Contact and Support</div><a href="https://qm.qq.com/q/X3suYdjWAA" target="_blank">Community Group: 1077643184</a><a href="https://xn--jpr071e.top/" target="_blank">Author Website</a></div>
</div>
<div class="f-bottom"><span>© 2024-2026 GuYi Access. Released under the MIT License.</span><span>Built for Developers</span></div>
</footer>
<div class="toast" id="toast"><i class="fas fa-check-circle"></i> Code copied to the clipboard!</div>
`;
    document.body.innerHTML = bodyContent;

    // ==========================================
    // 3. Execution Logic (Enhanced)
    // ==========================================
    function initApp() {
        // ==========================================
        // Background Music
        // ==========================================
        const bgMusic = new Audio('mp3/Music.mp3');
        bgMusic.volume = 0.4;
        bgMusic.loop = true;
        let musicStarted = false;
        function startMusic() {
            if (!musicStarted) {
                musicStarted = true;
                bgMusic.play().catch(() => {});
                document.removeEventListener('click', startMusic);
                document.removeEventListener('touchstart', startMusic);
                document.removeEventListener('keydown', startMusic);
            }
        }
        document.addEventListener('click', startMusic);
        document.addEventListener('touchstart', startMusic);
        document.addEventListener('keydown', startMusic);

        // ==========================================
        // Custom Glow Cursor
        // ==========================================
        const cursorGlow = document.getElementById('cursor-glow');
        if (cursorGlow && !window.matchMedia('(max-width:1024px)').matches) {
            let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
            document.addEventListener('mousemove', e => {
                mouseX = e.clientX; mouseY = e.clientY;
                cursorGlow.style.opacity = '1';
            });
            document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
            
            function animateCursor() {
                glowX += (mouseX - glowX) * 0.08;
                glowY += (mouseY - glowY) * 0.08;
                cursorGlow.style.left = glowX + 'px';
                cursorGlow.style.top = glowY + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
        }

        // ==========================================
        // Magnetic Effect
        // ==========================================
        function initMagnetic(selector, strength = 0.2) {
            if (window.matchMedia('(max-width:768px)').matches) return;
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener('mousemove', e => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
                    el.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'translate(0, 0)';
                    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                });
            });
        }
        initMagnetic('.qq-btn, .copy-btn-abs, .nav-links a', 0.2);

        // ==========================================
        // Ripple Effect
        // ==========================================
        function createRipple(e) {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: rgba(255,255,255,0.25); border-radius: 50%;
                transform: scale(0); opacity: 1; pointer-events: none;
                animation: rippleEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                z-index: 10;
            `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
        document.querySelectorAll('.lang-btn, .qq-btn, .copy-btn-abs, .nav-links a, .docs-nav a').forEach(btn => {
            btn.addEventListener('click', createRipple);
        });

        // ==========================================
        // Background Video Logic
        // ==========================================
        const bgVideo = document.getElementById('anime-bg');
        if (bgVideo) {
            const isMobile = window.matchMedia('(max-width:768px)').matches;
            
            // Cloud random pool for Mobile
            const mobileWallpaperPool = [
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_4.mp4', weight: 4 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_7.mp4', weight: 3 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_3.mp4', weight: 2 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_2.mp4', weight: 1 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_5.mp4', weight: 1 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpapermodCloud_6.mp4', weight: 1 }
            ];

            // Cloud random pool for PC
            const pcWallpaperPool = [
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_4.mp4', weight: 4 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_3.mp4', weight: 3 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_8.mp4', weight: 2 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_2.mp4', weight: 1 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_5.mp4', weight: 1 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_6.mp4', weight: 1 },
                { src: 'https://pub-f96a0dcbf19949a9a70e2d01b1808bd7.r2.dev/wallpaperPCCloud_9.mp4', weight: 1 }
            ];

            function pickWeightedRandom(pool) {
                const total = pool.reduce((sum, item) => sum + item.weight, 0);
                let roll = Math.random() * total;
                for (let i = 0; i < pool.length; i++) {
                    if (roll < pool[i].weight) {
                        return pool[i].src;
                    }
                    roll -= pool[i].weight;
                }
                return pool[pool.length - 1].src;
            }

            bgVideo.src = isMobile ? pickWeightedRandom(mobileWallpaperPool) : pickWeightedRandom(pcWallpaperPool);
        }

        // ==========================================
        // Navbar Scroll Enhancement
        // ==========================================
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                if (window.scrollY > lastScroll && window.scrollY > 200) {
                    navbar.style.transform = 'translateX(-50%) translateY(-120%)';
                } else {
                    navbar.style.transform = 'translateX(-50%) translateY(0)';
                }
            }
            lastScroll = window.scrollY;
        });

        // ==========================================
        // Scroll Reveal Animation (Blur Dissipation)
        // ==========================================
        const observer = new IntersectionObserver(entries => {
            entries.forEach((e, idx) => { 
                if (e.isIntersecting) { 
                    setTimeout(() => e.target.classList.add('active'), idx * 50);
                    observer.unobserve(e.target); 
                } 
            });
        }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // ==========================================
        // Document Sidebar Highlight Sync
        // ==========================================
        const docBlocks = document.querySelectorAll('.doc-block[id], .qq-banner[id]');
        const docLinks = document.querySelectorAll('.docs-nav a[href^="#"]');
        if(docBlocks.length > 0 && docLinks.length > 0) {
            window.addEventListener('scroll', () => {
                let cur = '';
                docBlocks.forEach(b => { if (b.getBoundingClientRect().top < 300) cur = b.id; });
                docLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
            });
        }

        // ==========================================
        // Download Dropdown Toggle
        // ==========================================
        const wrap = document.getElementById('dlWrap');
        const btn = document.getElementById('dlBtn');
        if(btn && wrap) {
            btn.addEventListener('click', e => { 
                e.stopPropagation(); 
                wrap.classList.toggle('open'); 
            });
            document.addEventListener('click', e => { 
                if (!wrap.contains(e.target)) wrap.classList.remove('open'); 
            });
        }

        // ====================================================
        // Code Presentation Snippets
        // ====================================================
        const codeData = [
            {
                        "id": "python",
                        "name": "Python 3",
                        "code": "import base64\nimport json\nimport re\nimport requests\nfrom cryptography.hazmat.primitives.ciphers.aead import AESGCM\n\n# Replace this with the actual PHP API URL provided by the application dashboard, not the static website URL.\nAPI_URL = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\"\nAPP_KEY = \"YOUR_64_HEX_APP_KEY\"  # 64-character hexadecimal representation of a random 32-byte key\nCARD_CODE = \"YOUR_CARD_CODE\"\nDEVICE_HASH = \"YOUR_STABLE_DEVICE_HASH\"  # Persist this identifier locally; do not generate a new one on every run\nUSER_AGENT = \"GuYiAccess-SDK/1.0\"\n\n\ndef decrypt_response(encoded: str, app_key: str) -> dict:\n    if not re.fullmatch(r\"[0-9a-fA-F]{64}\", app_key):\n        raise ValueError(\"APP_KEY must be a 64-character hexadecimal string\")\n    packet = base64.b64decode(encoded, validate=True)\n    if len(packet) < 28:\n        raise ValueError(\"encrypted_data is too short\")\n    key = bytes.fromhex(app_key)\n    iv, tag, ciphertext = packet[:12], packet[12:28], packet[28:]\n    # Python AESGCM expects the authentication tag after the ciphertext; the server format is IV + Tag + Ciphertext.\n    plaintext = AESGCM(key).decrypt(iv, ciphertext + tag, None)\n    return json.loads(plaintext.decode(\"utf-8\"))\n\n\ndef parse_response(body: str) -> dict:\n    envelope = json.loads(body)\n    if \"encrypted_data\" in envelope:\n        return decrypt_response(envelope[\"encrypted_data\"], APP_KEY)\n    # Some error responses from the current server are unencrypted JSON.\n    return envelope\n\n\ndef main() -> None:\n    payload = {\n        \"app_key\": APP_KEY,\n        \"card_code\": CARD_CODE,\n        \"device_hash\": DEVICE_HASH,\n        # \"custom_data\": json.dumps({\"settings\": \"example\"}, ensure_ascii=False),\n    }\n    response = requests.post(\n        API_URL,\n        json=payload,\n        headers={\"User-Agent\": USER_AGENT},\n        timeout=(5, 15),\n    )\n    result = parse_response(response.text)\n    if result.get(\"code\") != 200:\n        raise RuntimeError(f\"Verification failed: {result.get('msg', 'Unknown error')} (code={result.get('code')})\")\n    data = result.get(\"data\") or {}\n    print(\"Verification successful\")\n    print(\"Expiration time: \", data.get(\"expire_time\"))\n    print(\"Cloud variables: \", data.get(\"variables\"))\n\n\nif __name__ == \"__main__\":\n    main()"
            },
            {
                        "id": "nodejs",
                        "name": "JavaScript / Node.js",
                        "code": "const crypto = require('node:crypto');\n\n// Node.js 18+; uses the built-in fetch and crypto modules.\nconst API_URL = 'https://YOUR_API_DOMAIN/Verifyfile/api.php';\nconst APP_KEY = 'YOUR_64_HEX_APP_KEY';\nconst CARD_CODE = 'YOUR_CARD_CODE';\nconst DEVICE_HASH = 'YOUR_STABLE_DEVICE_HASH'; // A stable device identifier persisted across runs\n\nfunction decryptResponse(encoded, appKey) {\n  if (!/^[0-9a-f]{64}$/i.test(appKey)) throw new Error('APP_KEY must be a 64-character hexadecimal string');\n  const key = Buffer.from(appKey, 'hex');\n  const packet = Buffer.from(encoded, 'base64');\n  if (packet.length < 28) throw new Error('encrypted_data is too short');\n  const iv = packet.subarray(0, 12);\n  const tag = packet.subarray(12, 28);\n  const ciphertext = packet.subarray(28);\n  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength: 16 });\n  decipher.setAuthTag(tag);\n  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');\n  return JSON.parse(plaintext);\n}\n\nasync function main() {\n  const response = await fetch(API_URL, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json', 'User-Agent': 'GuYiAccess-SDK/1.0' },\n    body: JSON.stringify({ app_key: APP_KEY, card_code: CARD_CODE, device_hash: DEVICE_HASH }),\n    signal: AbortSignal.timeout(15000),\n  });\n  const body = await response.text();\n  let result = JSON.parse(body);\n  if (typeof result.encrypted_data === 'string') result = decryptResponse(result.encrypted_data, APP_KEY);\n  if (result.code !== 200) throw new Error(`Verification failed: ${result.msg || 'Unknown error'} (code=${result.code})`);\n  console.log('Verification successful');\n  console.log('Expiration time: ', result.data?.expire_time ?? null);\n  console.log('Cloud variables: ', result.data?.variables ?? null);\n}\n\nmain().catch(err => { console.error(err.message); process.exitCode = 1; });"
            },
            {
                        "id": "php",
                        "name": "PHP",
                        "code": "<?php\ndeclare(strict_types=1);\n\nconst API_URL = 'https://YOUR_API_DOMAIN/Verifyfile/api.php';\nconst APP_KEY = 'YOUR_64_HEX_APP_KEY';\nconst CARD_CODE = 'YOUR_CARD_CODE';\nconst DEVICE_HASH = 'YOUR_STABLE_DEVICE_HASH'; // A stable device identifier persisted across runs\n\nfunction decryptResponse(string $encoded, string $appKey): array {\n    if (!preg_match('/\\A[0-9a-fA-F]{64}\\z/', $appKey)) {\n        throw new RuntimeException('APP_KEY must be a 64-character hexadecimal string');\n    }\n    $packet = base64_decode($encoded, true);\n    if ($packet === false || strlen($packet) < 28) {\n        throw new RuntimeException('Invalid encrypted_data format');\n    }\n    $key = hex2bin($appKey);\n    $iv = substr($packet, 0, 12);\n    $tag = substr($packet, 12, 16);\n    $ciphertext = substr($packet, 28);\n    $plaintext = openssl_decrypt($ciphertext, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag, '');\n    if ($plaintext === false) throw new RuntimeException('AES-256-GCM decryption or authentication failed');\n    return json_decode($plaintext, true, 512, JSON_THROW_ON_ERROR);\n}\n\nfunction parseResponse(string $body): array {\n    $envelope = json_decode($body, true, 512, JSON_THROW_ON_ERROR);\n    if (isset($envelope['encrypted_data'])) {\n        return decryptResponse((string)$envelope['encrypted_data'], APP_KEY);\n    }\n    return $envelope; // Some error responses from the current server are unencrypted JSON\n}\n\n$payload = [\n    'app_key' => APP_KEY,\n    'card_code' => CARD_CODE,\n    'device_hash' => DEVICE_HASH,\n    // 'custom_data' => json_encode(['settings' => 'example'], JSON_THROW_ON_ERROR),\n];\n$ch = curl_init(API_URL);\ncurl_setopt_array($ch, [\n    CURLOPT_POST => true,\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_POSTFIELDS => json_encode($payload, JSON_THROW_ON_ERROR),\n    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],\n    CURLOPT_USERAGENT => 'GuYiAccess-SDK/1.0',\n    CURLOPT_CONNECTTIMEOUT => 5,\n    CURLOPT_TIMEOUT => 15,\n]);\n$body = curl_exec($ch);\nif ($body === false) {\n    $message = curl_error($ch);\n    curl_close($ch);\n    throw new RuntimeException('Request failed: ' . $message);\n}\n$httpStatus = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);\ncurl_close($ch);\n$result = parseResponse($body);\nif (($result['code'] ?? null) !== 200) {\n    throw new RuntimeException('Verification failed: ' . ($result['msg'] ?? 'Unknown error') . ' (code=' . ($result['code'] ?? 'N/A') . ', HTTP=' . $httpStatus . ')');\n}\n$data = $result['data'] ?? [];\necho \"Verification successful\\n\";\necho 'Expiration time: ' . ($data['expire_time'] ?? 'N/A') . \"\\n\";\necho 'Cloud variables: ' . json_encode($data['variables'] ?? null, JSON_UNESCAPED_UNICODE) . \"\\n\";"
            },
            {
                        "id": "csharp",
                        "name": "C# / .NET 8",
                        "code": "// .NET 8 console application; uses only built-in .NET libraries.\nusing System.Net.Http;\nusing System.Security.Cryptography;\nusing System.Text;\nusing System.Text.Json;\n\nconst string ApiUrl = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\";\nconst string AppKey = \"YOUR_64_HEX_APP_KEY\";\nconst string CardCode = \"YOUR_CARD_CODE\";\nconst string DeviceHash = \"YOUR_STABLE_DEVICE_HASH\"; // A stable device identifier persisted across runs\n\nstatic byte[] DecryptResponse(string encoded, string appKey)\n{\n    if (appKey.Length != 64) throw new ArgumentException(\"APP_KEY must be a 64-character hexadecimal string\");\n    byte[] key = Convert.FromHexString(appKey);\n    byte[] packet = Convert.FromBase64String(encoded);\n    if (packet.Length < 28) throw new ArgumentException(\"encrypted_data is too short\");\n    byte[] iv = packet[..12];\n    byte[] tag = packet[12..28];\n    byte[] ciphertext = packet[28..];\n    byte[] plaintext = new byte[ciphertext.Length];\n    using var aes = new AesGcm(key, 16);\n    aes.Decrypt(iv, ciphertext, tag, plaintext); // An authentication failure throws an exception\n    return plaintext;\n}\n\nstatic JsonDocument ParseResponse(string body, string appKey)\n{\n    using var envelope = JsonDocument.Parse(body);\n    if (envelope.RootElement.TryGetProperty(\"encrypted_data\", out var encrypted))\n    {\n        string plain = Encoding.UTF8.GetString(DecryptResponse(encrypted.GetString()!, appKey));\n        return JsonDocument.Parse(plain);\n    }\n    return JsonDocument.Parse(body); // Some error responses are plain-text JSON\n}\n\nusing var client = new HttpClient { Timeout = TimeSpan.FromSeconds(15) };\nusing var request = new HttpRequestMessage(HttpMethod.Post, ApiUrl);\nrequest.Headers.UserAgent.ParseAdd(\"GuYiAccess-SDK/1.0\");\nrequest.Content = new StringContent(JsonSerializer.Serialize(new {\n    app_key = AppKey, card_code = CardCode, device_hash = DeviceHash\n}), Encoding.UTF8, \"application/json\");\nusing var response = await client.SendAsync(request);\nstring body = await response.Content.ReadAsStringAsync();\nusing var result = ParseResponse(body, AppKey);\nvar root = result.RootElement;\nint code = root.TryGetProperty(\"code\", out var codeNode) ? codeNode.GetInt32() : -1;\nif (code != 200) throw new Exception($\"Verification failed: {(root.TryGetProperty(\"msg\", out var msg) ? msg.GetString() : \"Unknown error\")} (code={code}, HTTP={(int)response.StatusCode})\");\nvar data = root.TryGetProperty(\"data\", out var d) ? d : default;\nConsole.WriteLine(\"Verification successful\");\nConsole.WriteLine($\"Expiration time: {(data.ValueKind == JsonValueKind.Object && data.TryGetProperty(\"expire_time\", out var exp) ? exp.ToString() : \"N/A\")}\");\nConsole.WriteLine($\"Cloud variables: {(data.ValueKind == JsonValueKind.Object && data.TryGetProperty(\"variables\", out var vars) ? vars.ToString() : \"N/A\")}\");"
            },
            {
                        "id": "java",
                        "name": "Java 17",
                        "code": "// Java 17; JSON parsing uses Jackson: com.fasterxml.jackson.core:jackson-databind.\nimport com.fasterxml.jackson.databind.JsonNode;\nimport com.fasterxml.jackson.databind.ObjectMapper;\nimport javax.crypto.Cipher;\nimport javax.crypto.spec.GCMParameterSpec;\nimport javax.crypto.spec.SecretKeySpec;\nimport java.net.URI;\nimport java.net.http.HttpClient;\nimport java.net.http.HttpRequest;\nimport java.net.http.HttpResponse;\nimport java.nio.charset.StandardCharsets;\nimport java.time.Duration;\nimport java.util.Arrays;\nimport java.util.HexFormat;\nimport java.util.Map;\nimport java.util.Base64;\n\npublic class GuYiAccessExample {\n    static final String API_URL = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\";\n    static final String APP_KEY = \"YOUR_64_HEX_APP_KEY\";\n    static final String CARD_CODE = \"YOUR_CARD_CODE\";\n    static final String DEVICE_HASH = \"YOUR_STABLE_DEVICE_HASH\"; // A stable device identifier persisted across runs\n    static final ObjectMapper JSON = new ObjectMapper();\n\n    static String decryptResponse(String encoded, String appKey) throws Exception {\n        if (!appKey.matches(\"(?i)[0-9a-f]{64}\")) throw new IllegalArgumentException(\"APP_KEY must be a 64-character hexadecimal string\");\n        byte[] packet = Base64.getDecoder().decode(encoded);\n        if (packet.length < 28) throw new IllegalArgumentException(\"encrypted_data is too short\");\n        byte[] iv = Arrays.copyOfRange(packet, 0, 12);\n        byte[] tag = Arrays.copyOfRange(packet, 12, 28);\n        byte[] ciphertext = Arrays.copyOfRange(packet, 28, packet.length);\n        byte[] ciphertextAndTag = new byte[ciphertext.length + tag.length];\n        System.arraycopy(ciphertext, 0, ciphertextAndTag, 0, ciphertext.length);\n        System.arraycopy(tag, 0, ciphertextAndTag, ciphertext.length, tag.length);\n        Cipher cipher = Cipher.getInstance(\"AES/GCM/NoPadding\");\n        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(HexFormat.of().parseHex(appKey), \"AES\"), new GCMParameterSpec(128, iv));\n        return new String(cipher.doFinal(ciphertextAndTag), StandardCharsets.UTF_8);\n    }\n\n    static JsonNode parseResponse(String body) throws Exception {\n        JsonNode envelope = JSON.readTree(body);\n        if (envelope.hasNonNull(\"encrypted_data\")) {\n            return JSON.readTree(decryptResponse(envelope.get(\"encrypted_data\").asText(), APP_KEY));\n        }\n        return envelope; // Some error responses are plain-text JSON\n    }\n\n    public static void main(String[] args) throws Exception {\n        HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();\n        String requestJson = JSON.writeValueAsString(Map.of(\n            \"app_key\", APP_KEY, \"card_code\", CARD_CODE, \"device_hash\", DEVICE_HASH));\n        HttpRequest request = HttpRequest.newBuilder(URI.create(API_URL))\n            .timeout(Duration.ofSeconds(15))\n            .header(\"Content-Type\", \"application/json\")\n            .header(\"User-Agent\", \"GuYiAccess-SDK/1.0\")\n            .POST(HttpRequest.BodyPublishers.ofString(requestJson))\n            .build();\n        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\n        JsonNode result = parseResponse(response.body());\n        if (result.path(\"code\").asInt(-1) != 200) {\n            throw new IllegalStateException(\"Verification failed: \" + result.path(\"msg\").asText(\"Unknown error\") + \" (code=\" + result.path(\"code\").asInt(-1) + \")\");\n        }\n        JsonNode data = result.path(\"data\");\n        System.out.println(\"Verification successful\");\n        System.out.println(\"Expiration time: \" + data.path(\"expire_time\").asText(\"N/A\"));\n        System.out.println(\"Cloud variables: \" + data.path(\"variables\"));\n    }\n}"
            },
            {
                        "id": "go",
                        "name": "Go",
                        "code": "package main\n\nimport (\n    \"bytes\"\n    \"crypto/aes\"\n    \"crypto/cipher\"\n    \"encoding/base64\"\n    \"encoding/hex\"\n    \"encoding/json\"\n    \"errors\"\n    \"fmt\"\n    \"io\"\n    \"net/http\"\n    \"strings\"\n    \"time\"\n)\n\nconst apiURL = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\"\nconst appKey = \"YOUR_64_HEX_APP_KEY\"\nconst cardCode = \"YOUR_CARD_CODE\"\nconst deviceHash = \"YOUR_STABLE_DEVICE_HASH\" // A stable device identifier persisted across runs\n\ntype apiResponse struct {\n    Code int             `json:\"code\"`\n    Msg  string          `json:\"msg\"`\n    Data json.RawMessage `json:\"data\"`\n}\n\nfunc decryptResponse(encoded, keyHex string) ([]byte, error) {\n    if len(keyHex) != 64 { return nil, errors.New(\"APP_KEY must be a 64-character hexadecimal string\") }\n    key, err := hex.DecodeString(keyHex); if err != nil { return nil, err }\n    packet, err := base64.StdEncoding.DecodeString(encoded); if err != nil { return nil, err }\n    if len(packet) < 28 { return nil, errors.New(\"encrypted_data is too short\") }\n    block, err := aes.NewCipher(key); if err != nil { return nil, err }\n    gcm, err := cipher.NewGCM(block); if err != nil { return nil, err }\n    iv, tag, ciphertext := packet[:12], packet[12:28], packet[28:]\n    ciphertextAndTag := make([]byte, 0, len(ciphertext)+len(tag))\n    ciphertextAndTag = append(ciphertextAndTag, ciphertext...)\n    ciphertextAndTag = append(ciphertextAndTag, tag...)\n    return gcm.Open(nil, iv, ciphertextAndTag, nil)\n}\n\nfunc parseResponse(body []byte) (apiResponse, error) {\n    var envelope map[string]json.RawMessage\n    if err := json.Unmarshal(body, &envelope); err != nil { return apiResponse{}, err }\n    if raw, ok := envelope[\"encrypted_data\"]; ok {\n        var encoded string\n        if err := json.Unmarshal(raw, &encoded); err != nil { return apiResponse{}, err }\n        plain, err := decryptResponse(encoded, appKey); if err != nil { return apiResponse{}, err }\n        body = plain\n    }\n    var result apiResponse\n    err := json.Unmarshal(body, &result)\n    return result, err\n}\n\nfunc main() {\n    payload, err := json.Marshal(map[string]string{\"app_key\": appKey, \"card_code\": cardCode, \"device_hash\": deviceHash})\n    if err != nil { panic(err) }\n    client := &http.Client{Timeout: 15 * time.Second}\n    req, err := http.NewRequest(http.MethodPost, apiURL, bytes.NewReader(payload)); if err != nil { panic(err) }\n    req.Header.Set(\"Content-Type\", \"application/json\")\n    req.Header.Set(\"User-Agent\", \"GuYiAccess-SDK/1.0\")\n    resp, err := client.Do(req); if err != nil { panic(err) }\n    defer resp.Body.Close()\n    body, err := io.ReadAll(io.LimitReader(resp.Body, 1<<20)); if err != nil { panic(err) }\n    result, err := parseResponse(body); if err != nil { panic(err) }\n    if result.Code != 200 { panic(fmt.Sprintf(\"Verification failed: %s (code=%d, HTTP=%d)\", result.Msg, result.Code, resp.StatusCode)) }\n    fmt.Println(\"Verification successful\")\n    fmt.Println(\"Response data:\", strings.TrimSpace(string(result.Data)))\n}"
            },
            {
                        "id": "cpp",
                        "name": "C++17",
                        "code": "// C++17; requires libcurl, OpenSSL (libcrypto), and nlohmann/json.\n#include <curl/curl.h>\n#include <openssl/evp.h>\n#include <openssl/crypto.h>\n#include <nlohmann/json.hpp>\n#include <array>\n#include <iostream>\n#include <stdexcept>\n#include <string>\n#include <vector>\n\nusing nlohmann::json;\nstatic const std::string API_URL = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\";\nstatic const std::string APP_KEY = \"YOUR_64_HEX_APP_KEY\";\nstatic const std::string CARD_CODE = \"YOUR_CARD_CODE\";\nstatic const std::string DEVICE_HASH = \"YOUR_STABLE_DEVICE_HASH\"; // A stable device identifier persisted across runs\n\nstatic size_t writeCallback(char* ptr, size_t size, size_t nmemb, void* userdata) {\n    auto* out = static_cast<std::string*>(userdata);\n    out->append(ptr, size * nmemb);\n    return size * nmemb;\n}\nstatic std::vector<unsigned char> fromHex(const std::string& value) {\n    if (value.size() != 64) throw std::runtime_error(\"APP_KEY must be a 64-character hexadecimal string\");\n    std::vector<unsigned char> out(32);\n    for (size_t i = 0; i < out.size(); ++i) {\n        unsigned int byte = 0;\n        if (sscanf(value.c_str() + i * 2, \"%2x\", &byte) != 1) throw std::runtime_error(\"APP_KEY is not a valid hexadecimal string\");\n        out[i] = static_cast<unsigned char>(byte);\n    }\n    return out;\n}\nstatic std::vector<unsigned char> decodeBase64(const std::string& value) {\n    if (value.empty() || value.size() % 4 != 0) throw std::runtime_error(\"Invalid Base64 format\");\n    std::vector<unsigned char> out(value.size() / 4 * 3 + 3);\n    int n = EVP_DecodeBlock(out.data(), reinterpret_cast<const unsigned char*>(value.data()), static_cast<int>(value.size()));\n    if (n < 0) throw std::runtime_error(\"Base64 decoding failed\");\n    if (!value.empty() && value.back() == '=') --n;\n    if (value.size() > 1 && value[value.size() - 2] == '=') --n;\n    out.resize(static_cast<size_t>(n));\n    return out;\n}\nstatic std::string decryptResponse(const std::string& encoded) {\n    auto key = fromHex(APP_KEY);\n    auto packet = decodeBase64(encoded);\n    if (packet.size() < 28) throw std::runtime_error(\"encrypted_data is too short\");\n    const unsigned char* iv = packet.data();\n    const unsigned char* tag = packet.data() + 12;\n    const unsigned char* ciphertext = packet.data() + 28;\n    int ciphertextLen = static_cast<int>(packet.size() - 28);\n    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();\n    if (!ctx) throw std::runtime_error(\"Unable to create the AES-GCM context\");\n    std::vector<unsigned char> plain(static_cast<size_t>(ciphertextLen) + 16);\n    int outLen = 0, finalLen = 0;\n    bool ok = EVP_DecryptInit_ex(ctx, EVP_aes_256_gcm(), nullptr, nullptr, nullptr) == 1\n        && EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_SET_IVLEN, 12, nullptr) == 1\n        && EVP_DecryptInit_ex(ctx, nullptr, nullptr, key.data(), iv) == 1\n        && EVP_DecryptUpdate(ctx, plain.data(), &outLen, ciphertext, ciphertextLen) == 1\n        && EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_SET_TAG, 16, const_cast<unsigned char*>(tag)) == 1\n        && EVP_DecryptFinal_ex(ctx, plain.data() + outLen, &finalLen) == 1;\n    EVP_CIPHER_CTX_free(ctx);\n    if (!ok) throw std::runtime_error(\"AES-GCM decryption or authentication failed\");\n    plain.resize(static_cast<size_t>(outLen + finalLen));\n    return std::string(plain.begin(), plain.end());\n}\nint main() {\n    CURL* curl = nullptr;\n    curl_global_init(CURL_GLOBAL_DEFAULT);\n    curl = curl_easy_init();\n    if (!curl) { curl_global_cleanup(); throw std::runtime_error(\"Unable to initialize libcurl\"); }\n    std::string responseBody;\n    json requestJson = {{\"app_key\", APP_KEY}, {\"card_code\", CARD_CODE}, {\"device_hash\", DEVICE_HASH}};\n    std::string requestBody = requestJson.dump();\n    curl_slist* headers = nullptr;\n    headers = curl_slist_append(headers, \"Content-Type: application/json\");\n    headers = curl_slist_append(headers, \"User-Agent: GuYiAccess-SDK/1.0\");\n    curl_easy_setopt(curl, CURLOPT_URL, API_URL.c_str());\n    curl_easy_setopt(curl, CURLOPT_POST, 1L);\n    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, requestBody.c_str());\n    curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, static_cast<long>(requestBody.size()));\n    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);\n    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseBody);\n    curl_easy_setopt(curl, CURLOPT_CONNECTTIMEOUT, 5L);\n    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 15L);\n    CURLcode status = curl_easy_perform(curl);\n    long httpStatus = 0;\n    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &httpStatus);\n    curl_slist_free_all(headers);\n    curl_easy_cleanup(curl);\n    curl_global_cleanup();\n    if (status != CURLE_OK) throw std::runtime_error(curl_easy_strerror(status));\n    json envelope = json::parse(responseBody);\n    json result = envelope.contains(\"encrypted_data\") ? json::parse(decryptResponse(envelope.at(\"encrypted_data\").get<std::string>())) : envelope;\n    if (result.value(\"code\", -1) != 200) throw std::runtime_error(\"Verification failed: \" + result.value(\"msg\", std::string(\"Unknown error\")) + \" (HTTP=\" + std::to_string(httpStatus) + \")\");\n    std::cout << \"Verification successful\\n\" << \"data: \" << result.value(\"data\", json(nullptr)).dump(2) << \"\\n\";\n}"
            },
            {
                        "id": "rust",
                        "name": "Rust",
                        "code": "// Rust; see Cargo.toml in the same directory for dependencies.\nuse aes_gcm::{aead::{Aead, KeyInit}, Aes256Gcm, Nonce};\nuse base64::{engine::general_purpose::STANDARD, Engine as _};\nuse serde_json::{json, Value};\nuse std::error::Error;\nuse std::time::Duration;\n\nconst API_URL: &str = \"https://YOUR_API_DOMAIN/Verifyfile/api.php\";\nconst APP_KEY: &str = \"YOUR_64_HEX_APP_KEY\";\nconst CARD_CODE: &str = \"YOUR_CARD_CODE\";\nconst DEVICE_HASH: &str = \"YOUR_STABLE_DEVICE_HASH\"; // A stable device identifier persisted across runs\n\nfn decrypt_response(encoded: &str, app_key: &str) -> Result<String, Box<dyn Error>> {\n    if app_key.len() != 64 { return Err(\"APP_KEY must be a 64-character hexadecimal string\".into()); }\n    let key = hex::decode(app_key)?;\n    let packet = STANDARD.decode(encoded)?;\n    if packet.len() < 28 { return Err(\"encrypted_data is too short\".into()); }\n    let cipher = Aes256Gcm::new_from_slice(&key)?;\n    let iv = &packet[..12];\n    let tag = &packet[12..28];\n    let ciphertext = &packet[28..];\n    // The aes-gcm crate expects the authentication tag after the ciphertext, while the server places the tag before the ciphertext.\n    let mut ciphertext_and_tag = Vec::with_capacity(ciphertext.len() + tag.len());\n    ciphertext_and_tag.extend_from_slice(ciphertext);\n    ciphertext_and_tag.extend_from_slice(tag);\n    let plaintext = cipher.decrypt(Nonce::from_slice(iv), ciphertext_and_tag.as_ref())?;\n    Ok(String::from_utf8(plaintext)?)\n}\n\nfn parse_response(body: &str) -> Result<Value, Box<dyn Error>> {\n    let envelope: Value = serde_json::from_str(body)?;\n    if let Some(encoded) = envelope.get(\"encrypted_data\").and_then(Value::as_str) {\n        Ok(serde_json::from_str(&decrypt_response(encoded, APP_KEY)?)?)\n    } else {\n        Ok(envelope) // Some error responses from the current server are unencrypted JSON\n    }\n}\n\nfn main() -> Result<(), Box<dyn Error>> {\n    let client = reqwest::blocking::Client::builder()\n        .timeout(Duration::from_secs(15))\n        .user_agent(\"GuYiAccess-SDK/1.0\")\n        .build()?;\n    let response = client.post(API_URL)\n        .json(&json!({ \"app_key\": APP_KEY, \"card_code\": CARD_CODE, \"device_hash\": DEVICE_HASH }))\n        .send()?;\n    let http_status = response.status();\n    let body = response.text()?;\n    let result = parse_response(&body)?;\n    if result.get(\"code\").and_then(Value::as_i64) != Some(200) {\n        return Err(format!(\"Verification failed: {} (HTTP {})\", result.get(\"msg\").and_then(Value::as_str).unwrap_or(\"Unknown error\"), http_status).into());\n    }\n    println!(\"Verification successful\");\n    println!(\"Expiration time: {}\", result.pointer(\"/data/expire_time\").unwrap_or(&Value::Null));\n    println!(\"Cloud variables: {}\", result.pointer(\"/data/variables\").unwrap_or(&Value::Null));\n    Ok(())\n}"
            }
];


        // Lightweight syntax coloring: keep the existing code-panel appearance and copyable source.
        function highlightCode(source, language) {
            const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const hashComments = language === 'python' || language === 'php';
            const tokenRegex = hashComments
                ? /(?:#.*|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b)/g
                : /(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b)/g;
            const keywords = new Set("abstract as async await break byte case catch chan char class const continue crate default defer do else enum error export extends false final finally fn for func function go if implements import in interface let map match module mut new nil null nullptr package pass private protected public raise readonly return self static struct super switch synchronized this throw throws true try type typeof undefined unsafe use using var void volatile while yield bool boolean double float int integer long object short string uint ulong dynamic decimal Task HttpClient JsonElement JsonDocument Value Map String Integer System Console Cipher SecretKeySpec GCMParameterSpec ObjectMapper HttpRequest HttpResponse StandardCharsets Base64 Duration Nonce Aes256Gcm AESGCM requests json hashlib md5 time bytes def from with open print except finally lambda and or not is None True False dict list tuple std vector auto include define main size_t unsigned constexpr inline array template typename default append make len panic fmt io errors http aes cipher hex strings Result Ok Err Some Box dyn impl Self pub use crate".split(/\s+/));
            let output = '';
            let cursor = 0;
            let match;
            while ((match = tokenRegex.exec(source)) !== null) {
                output += escapeHtml(source.slice(cursor, match.index));
                const token = match[0];
                let cls = '';
                if (((hashComments && token.startsWith('#')) || token.startsWith('//') || token.startsWith('/*'))) cls = 'c';
                else if (/^(?:"|'|`)/.test(token)) cls = 's';
                else if (/^\d/.test(token)) cls = 't';
                else if (keywords.has(token)) cls = 'k';
                else if (/^[A-Za-z_$][\w$]*$/.test(token) && /^\s*\(/.test(source.slice(match.index + token.length))) cls = 'f';
                output += cls ? `<span class="${cls}">${escapeHtml(token)}</span>` : escapeHtml(token);
                cursor = match.index + token.length;
            }
            output += escapeHtml(source.slice(cursor));
            return output;
        }

        const langList = document.getElementById('lang-list');
        const codeBody = document.getElementById('code-body');
        if (langList && codeBody) {
            codeData.forEach((item, i) => {
                const btn = document.createElement('button');
                btn.className = `lang-btn ${i === 0 ? 'active' : ''}`;
                btn.innerText = item.name;
                btn.onclick = () => switchCode(i);
                langList.appendChild(btn);
                const pane = document.createElement('div');
                pane.className = `code-pane ${i === 0 ? 'active' : ''}`;
                pane.innerHTML = `<pre>${highlightCode(item.code, item.id)}</pre>`;
                codeBody.appendChild(pane);
            });
        }

        window.switchCode = function(i) {
            document.querySelectorAll('.lang-btn').forEach((b, j) => b.classList.toggle('active', j === i));
            document.querySelectorAll('.code-pane').forEach((p, j) => p.classList.toggle('active', j === i));
        };

        window.copyCurrentCode = function() {
            const pre = document.querySelector('.code-pane.active pre');
            if (pre) navigator.clipboard.writeText(pre.innerText).then(() => {
                const t = document.getElementById('toast');
                if(t){
                    t.classList.add('show');
                    setTimeout(() => t.classList.remove('show'), 2000);
                }
            });
        };
    }
    initApp();
});
