document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Dynamic CSS Injection
    // ==========================================
    const styleElement = document.createElement("style");
    styleElement.textContent = `
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
    
    /* Typewriter Cursor */
    .typing-cursor { 
        display: inline-block; width: 3px; height: 0.9em; 
        background: var(--brand-cyan); margin-left: 4px;
        vertical-align: text-bottom; animation: blink 0.8s infinite;
        box-shadow: 0 0 10px var(--brand-cyan);
    }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    
    /* Glass Sweep Effect */
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
    .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(0,136,255,.55), 0 0 40px rgba(0,240,255,0.2); }
    .btn-outline { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.35); backdrop-filter: blur(10px); }
    .btn-outline:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.5); transform: translateY(-2px); }
    
    .hero { min-height: 85dvh; display: flex; align-items: center; padding-top: 120px; padding-bottom: 60px; position: relative; z-index: 50; }
    .hero-grid { display: grid; grid-template-columns: .95fr 1.15fr; gap: 60px; align-items: center; width: 100%; }
    .hero-actions { display: flex; gap: 12px; margin-bottom: 40px; flex-wrap: wrap; justify-content: flex-start; align-items: center; z-index: 200; position: relative;}
    .lang-matrix { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 10px; max-width: 100%; }
    .lang-tag { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); backdrop-filter: blur(8px); font-size: 12px; color: rgba(255,255,255,.9); font-family: var(--font-mono); transition: all .4s var(--ease-spring); cursor: default; }
    .lang-tag:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.4); transform: translateY(-2px); }
    
    .btn-download-wrap { position: relative; display: inline-flex; flex-direction: column; align-items: stretch; z-index: 100; }
    .btn-download { background: rgba(10, 15, 26, 0.25); color: #fff; border: 1px solid rgba(255, 255, 255, 0.25); backdrop-filter: var(--glass-blur); border-radius: 12px; padding: 12px 22px; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .4s var(--ease-spring); position: relative; overflow: hidden; }
    .btn-download:hover { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.45); transform: translateY(-2px); box-shadow: var(--glass-shadow); }
    .btn-download .chevron { font-size: 11px; transition: transform .4s var(--ease-spring); margin-left: 2px; }
    .btn-download-wrap.open .btn-download .chevron { transform: rotate(180deg); }
    .btn-download-wrap.open .btn-download { border-radius: 12px; background: rgba(255, 255, 255, 0.18); }
    .download-dropdown { position: absolute; top: calc(100% - 1px); left: 0; right: 0; background: rgba(15, 21, 36, 0.35); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,.25); border-top: none; border-radius: 0 0 12px 12px; overflow: hidden; max-height: 0; opacity: 0; pointer-events: none; transition: all .4s var(--ease-spring); box-shadow: var(--glass-shadow); min-width: 250px; }
    .btn-download-wrap.open .download-dropdown { max-height: 400px; opacity: 1; pointer-events: auto; }
    .dd-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.5); text-transform: uppercase; padding: 10px 16px 4px; }
    .dd-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: rgba(255,255,255,.9); text-decoration: none; font-size: 13.5px; transition: .25s var(--ease-spring); position: relative; overflow: hidden; }
    .dd-item i { width: 16px; text-align: center; }
    .dd-item:hover { background: rgba(255,255,255,.15); color: #fff; }
    .dd-divider { height: 1px; background: rgba(255,255,255,.1); margin: 4px 0; }
    
    /* ========================================================
       Premium 3D device mockup showcase (MacBook + floating iPhone)
       ======================================================== */
    .hero-visual {
        position: relative;
        width: 100%;
        perspective: 1400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mockup-stage {
        position: relative;
        width: 100%;
        max-width: 780px;
        transform-style: preserve-3d;
        transition: transform 0.12s ease-out;
    }
    .mockup-glow {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 90%;
        height: 80%;
        transform: translate(-50%, -50%) translateZ(-80px);
        background: radial-gradient(circle, rgba(0, 136, 255, 0.28) 0%, rgba(255, 46, 147, 0.12) 40%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        filter: blur(40px);
    }
    .mockup-macbook-wrap {
        position: relative;
        z-index: 2;
        transform-style: preserve-3d;
        animation: floatPc 6s ease-in-out infinite;
    }
    .mockup-macbook {
        width: 100%;
        height: auto;
        display: block;
        filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7));
    }
    .mockup-iphone-wrap {
        position: absolute;
        right: -3%;
        bottom: -10%;
        width: 27%;
        z-index: 10;
        transform-style: preserve-3d;
        transform: translateZ(60px);
        animation: floatMobile 7s ease-in-out infinite 0.8s;
    }
    .mockup-iphone {
        width: 100%;
        height: auto;
        display: block;
        filter: drop-shadow(-15px 30px 50px rgba(0, 0, 0, 0.85));
    }
    @keyframes floatPc {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    @keyframes floatMobile {
        0%, 100% { transform: translateZ(60px) translateY(0px); }
        50% { transform: translateZ(60px) translateY(-16px); }
    }
    
    .partners-section { padding: 40px 0; border-top: 1px solid rgba(255,255,255,.15); border-bottom: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.02); backdrop-filter: blur(10px); text-align: center; position: relative; z-index: 2; overflow: hidden; }
    .partners-title { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px; display: block; }
    
    /* ======== Partners Fade Carousel ======== */
    .partner-carousel { position: relative; height: 60px; display: flex; justify-content: center; align-items: center; width: 100%; margin: 0 auto; }
    .partner-group { position: absolute; display: flex; justify-content: center; flex-wrap: wrap; gap: 60px; opacity: 0; visibility: hidden; transform: translateY(15px); transition: all 0.8s var(--ease-spring); pointer-events: none; width: 100%; }
    .partner-group.active { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
    
    .partner-logo { display: flex; align-items: center; gap: 10px; font-size: 18px; color: rgba(255,255,255,.55); font-weight: 700; transition: all .4s var(--ease-spring); cursor: pointer; white-space: nowrap; }
    .partner-logo i { font-size: 22px; }
    .partner-logo:hover { color: #fff; transform: translateY(-3px); text-shadow: 0 0 20px rgba(255,255,255,.4); }
    
    .code-panel { position: sticky; top: 100px; height: calc(100vh - 140px); background: rgba(15, 21, 36, 0.01); border: 1px solid var(--glass-border); border-radius: var(--radius-md); display: flex; flex-direction: column; overflow: hidden; backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); }
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
    .copy-btn-abs { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 11px; cursor: pointer; transition: all .3s var(--ease-spring); }
    .copy-btn-abs:hover { background: rgba(255,255,255,.25); transform: translateY(-1px); }
    
    /* Enhanced Reveal with Blur Dissipation */
    .reveal { opacity: 0; transform: translateY(30px); filter: blur(12px); transition: all 0.9s var(--ease-spring); }
    .reveal.active { opacity: 1; transform: translateY(0); filter: blur(0); }
    
    footer { border-top: 1px solid rgba(255,255,255,.1); padding: 60px 0 40px; margin-top: 60px; background: rgba(0,0,0,.3); }
    .f-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 40px; padding: 0 40px; }
    .f-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 20px; }
    .f-links a { display: block; color: var(--text-secondary); text-decoration: none; font-size: 14px; margin-bottom: 12px; transition: .25s var(--ease-spring); }
    .f-links a:hover { color: var(--brand-cyan); transform: translateX(4px); }
    .f-bottom { max-width: 1400px; margin: 40px auto 0; padding: 20px 40px 0; border-top: 1px solid rgba(255,255,255,.1); display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); }
    
    .toast { position: fixed; bottom: 40px; left: 50%; transform: translate(-50%,20px) scale(0.95); background: rgba(0,230,118,.2); border: 1px solid rgba(0,230,118,.45); color: #00FF88; padding: 12px 24px; border-radius: 100px; font-size: 13px; font-weight: 600; z-index: 9999; opacity: 0; pointer-events: none; transition: all .4s var(--ease-spring); backdrop-filter: blur(12px); }
    .toast.show { opacity: 1; transform: translate(-50%,0) scale(1); }
    
    /* ======== Mobile & Adaptive Optimization ======== */
    @media(max-width:1199px){ .code-panel{position:static;height:600px;margin-top:40px;} }
    @media(max-width:1024px){ 
        .hero-grid{grid-template-columns:1fr;gap:50px;} 
        .hero-visual{max-width:90%;margin:0 auto;}
        .cursor-glow { display: none; }
    }
    @media(max-width:768px){ 
        .navbar { top: 12px; width: calc(100% - 24px); height: 56px; }
        .nav-brand span { display: none; }
        .nav-links a:not(:last-child) { display: none; }
        .hero { display: flex; align-items: flex-start; padding-top: 110px; padding-bottom: 30px; }
        .title-lg { font-size: 34px; margin-bottom: 12px; line-height: 1.25; } 
        .subtitle { font-size: 14px; margin-bottom: 24px; width: 100%; max-width: 100%; line-height: 1.6; } 
        
        .hero-actions { display: flex; flex-direction: column; gap: 14px; width: 100%; align-items: stretch; }
        .hero-actions > .btn { width: 100%; padding: 14px 16px; font-size: 15px; justify-content: center; }
        .hero-actions > .btn-download-wrap { width: 100%; }
        .btn-download { width: 100%; justify-content: center; padding: 14px 16px; font-size: 15px; }
        .download-dropdown { width: 100%; min-width: unset; }
        
        .lang-matrix { gap: 8px; }
        .lang-tag { padding: 6px 10px; font-size: 11.5px; }
        
        .hero-visual { margin-top: 20px; max-width: 100%; }
        .mockup-iphone-wrap { width: 30%; right: -1%; bottom: -6%; }

        .section{padding:50px 0;} 
        .partner-group { gap: 16px 24px; padding: 0 20px; }
        .partner-carousel { height: 80px; }
        .code-panel{height:500px;margin:0 -20px;border-radius:0;} 
        .f-bottom{flex-direction:column;align-items:flex-start;gap:12px;}
    }
    `;
    document.head.appendChild(styleElement);

    // ==========================================
    // 2. Dynamic Main HTML Injection
    // ==========================================
    const appHTML = `
    <div class="cursor-glow" id="cursor-glow"></div>
    <video class="anime-bg" id="anime-bg" autoplay loop muted playsinline aria-hidden="true"></video>
    <header class="navbar glass-shine" id="navbar">
        <nav class="nav-container">
            <a href="index.html" class="nav-brand"><img src="http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg" alt="GuYi Access logo">GuYi Access</a>
            <div class="nav-links">
                <a href="docs.html">Developer Docs</a>
                <a href="https://github.com/GuYiovo/GuYi-Access" target="_blank"><i class="fab fa-github"></i> Open-Source Repository</a>
                <a href="https://qm.qq.com/q/X3suYdjWAA" target="_blank"><i class="fab fa-qq"></i> Developer Community</a>
            </div>
        </nav>
    </header>
    <main>
        <section class="section hero">
            <div class="container hero-grid">
                <div class="hero-text">
                    <h1 class="title-lg" id="dynamic-title" style="min-height: 2.3em;"></h1>
                    <p class="subtitle reveal" style="transition-delay:.2s; font-family: var(--font-mono); color: var(--text-muted); font-size: 14px;"><span style="color: var(--brand-cyan);">//</span> Uses strong AES-256-GCM encryption and replay protection.<br>Provides multilingual SDKs and lightweight integration for reliable software license verification.</p>
                    <div class="hero-actions reveal" style="transition-delay:.3s;">
                        <a href="docs.html" class="btn btn-glow"><i class="fas fa-book"></i> Read the Full Developer Documentation</a>
                        <a href="https://qm.qq.com/q/X3suYdjWAA" target="_blank" class="btn btn-outline"><i class="fab fa-qq"></i> Join the Developer Community</a>
                        <div class="btn-download-wrap" id="dlWrap">
                            <button class="btn-download" id="dlBtn">
                                <i class="fas fa-download"></i> Download and Deploy <i class="fas fa-chevron-down chevron"></i>
                            </button>
                            <div class="download-dropdown" id="dlDropdown">
                                <div class="dd-label">Official Download (v2026.10.6)</div>
                                <a class="dd-item" href="https://github.com/GuYiovo/GuYi-Access/archive/refs/heads/main.zip" target="_blank"><i class="fas fa-file-zipper"></i>Download the Latest ZIP</a>
                                <a class="dd-item" href="https://github.com/GuYiovo/GuYi-Access" target="_blank"><i class="fab fa-github"></i>Visit the GitHub Repository</a>
                                <div class="dd-divider"></div>
                                <div class="dd-label">Alternative High-Speed Mirror</div>
                                <a class="dd-item" href="https://www.123684.com/s/EmjGjv-P7CsH?pwd=DMJz#" target="_blank"><i class="fas fa-cloud-arrow-down"></i>Download from 123 Cloud Drive</a>
                            </div>
                        </div>
                    </div>
                    <div class="lang-matrix reveal" style="transition-delay:.4s;">
                        <span class="lang-tag"><i class="fab fa-python" style="color:#3776AB"></i> Python</span>
                        <span class="lang-tag"><i class="fab fa-windows" style="color:#239120"></i> C# / .NET</span>
                        <span class="lang-tag"><i class="fab fa-golang" style="color:#00ADD8"></i> Go</span>
                        <span class="lang-tag"><i class="fab fa-rust" style="color:#dea584"></i> Rust</span>
                        <span class="lang-tag"><i class="fas fa-c" style="color:#00599C"></i> C++</span>
                        <span class="lang-tag"><i class="fab fa-java" style="color:#b07219"></i> Java</span>
                        <span class="lang-tag"><i class="fas fa-tools" style="color:#FF4500"></i> EPL (Easy Programming Language)</span>
                        <span class="lang-tag">More languages supported...</span>
                    </div>
                </div>
                
                <!-- Premium MacBook + iPhone parallax mockup showcase -->
                <div class="hero-visual reveal" style="transition-delay:.5s;">
                    <div class="mockup-stage" id="mockup-stage">
                        <div class="mockup-glow"></div>
                        <div class="mockup-macbook-wrap">
                            <img src="img/mockup-pc.png" alt="GuYi Access desktop interface preview" class="mockup-macbook">
                        </div>
                        <div class="mockup-iphone-wrap">
                            <img src="img/mockup-mobile.png" alt="GuYi Access mobile interface preview" class="mockup-iphone">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="partners-section reveal">
            <h2 class="partners-title">A Developer Project for Multiple Technology Ecosystems</h2>
            <div class="partner-carousel" id="partner-carousel">
                <div class="partner-group active">
                    <div class="partner-logo"><i class="fab fa-aws" style="color:#FF9900"></i> AWS</div>
                    <div class="partner-logo"><i class="fab fa-cloudflare" style="color:#F38020"></i> Cloudflare</div>
                    <div class="partner-logo"><i class="fab fa-github" style="color:#fff"></i> GitHub</div>
                    <div class="partner-logo"><i class="fab fa-docker" style="color:#2496ED"></i> Docker</div>
                    <div class="partner-logo"><i class="fab fa-linux" style="color:#FCC624"></i> Linux Foundation</div>
                </div>
                <div class="partner-group">
                    <div class="partner-logo"><i class="fab fa-microsoft" style="color:#00A4EF"></i> Microsoft Azure</div>
                    <div class="partner-logo"><i class="fab fa-google" style="color:#4285F4"></i> Google Cloud</div>
                    <div class="partner-logo"><i class="fab fa-apple" style="color:#999999"></i> Apple Ecosystem</div>
                    <div class="partner-logo"><i class="fab fa-meta" style="color:#0668E1"></i> Meta Open-Source Ecosystem</div>
                </div>
                <div class="partner-group">
                    <div class="partner-logo"><i class="fab fa-redhat" style="color:#EE0000"></i> Red Hat</div>
                    <div class="partner-logo"><i class="fa-solid fa-shield-halved" style="color:#00A4FF"></i> Tencent Cloud</div>
                    <div class="partner-logo"><i class="fa-solid fa-cloud" style="color:#FF6A00"></i> Alibaba Cloud</div>
                    <div class="partner-logo"><i class="fa-solid fa-network-wired" style="color:#C7000B"></i> Huawei Cloud</div>
                </div>
            </div>
        </section>
        
    </main>
    <footer>
        <div class="f-grid">
            <div><div style="color:#fff;font-size:18px;margin-bottom:12px;font-weight:bold;">GuYi Access Official Project</div><p style="color:rgba(255,255,255,.45);font-size:13px;line-height:1.6;">Providing easy-to-deploy software licensing and online verification components for the open-source community.</p></div>
            <div class="f-links"><div class="f-title">Site Navigation</div><a href="docs.html">API Integration Guide</a><a href="https://github.com/GuYiovo/GuYi-Access" target="_blank">Open-Source Code on GitHub</a></div>
            <div class="f-links"><div class="f-title">Contact and Support</div><a href="https://qm.qq.com/q/X3suYdjWAA" target="_blank">Community Group: 1077643184</a><a href="https://xn--jpr071e.top/" target="_blank">Author Website</a></div>
        </div>
        <div class="f-bottom"><span>&copy; 2024-2026 GuYi Access. Released under the MIT License.</span><span>Built for Developers</span></div>
    </footer>
    
    <div id="toast" class="toast"><i class="fas fa-check-circle"></i>Code copied to the clipboard!</div>
    `;
    const appWrapper = document.createElement("div");
    appWrapper.innerHTML = appHTML;
    document.body.appendChild(appWrapper);

    // ==========================================
    // 3. Execution Logic (Enhanced)
    // ==========================================
    initApp();
});

function initApp() {
    // ==========================================
    // Custom Cursor Glow
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
    function initMagnetic(selector, strength = 0.25) {
        if (window.matchMedia('(max-width:768px)').matches) return;
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px) translateY(-2px)`;
                el.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    }
    initMagnetic('.btn, .btn-download, .lang-tag, .partner-logo, .nav-links a', 0.25);

    // ==========================================
    // Click Ripple Effect
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
            background: rgba(255,255,255,0.3); border-radius: 50%;
            transform: scale(0); opacity: 1; pointer-events: none;
            animation: rippleEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            z-index: 10;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
    document.querySelectorAll('.btn, .btn-download, .lang-btn, .dd-item, .nav-links a').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // ==========================================
    // Typewriter headline effect with blinking cursor
    // ==========================================
    const dynamicTitle = document.getElementById('dynamic-title');
    if (dynamicTitle) {
        const line1 = "Open-source license verification, ";
        const line2 = "for more secure software licensing.";
        let i = 0, j = 0;
        
        function typeWriter() {
            if (i <= line1.length) {
                dynamicTitle.innerHTML = line1.substring(0, i) + '<span class="typing-cursor"></span>';
                i++;
                setTimeout(typeWriter, 60);
            } else if (j <= line2.length) {
                dynamicTitle.innerHTML = line1 + '<br><span class="text-gradient">' + line2.substring(0, j) + '</span><span class="typing-cursor"></span>';
                j++;
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(() => {
                    const cursor = dynamicTitle.querySelector('.typing-cursor');
                    if (cursor) cursor.style.display = 'none';
                }, 3000);
            }
        }
        typeWriter();
    }

    // ==========================================
    // Partner Crossfade Carousel
    // ==========================================
    const partnerGroups = document.querySelectorAll('.partner-group');
    if (partnerGroups.length > 0) {
        let currentGroup = 0;
        setInterval(() => {
            partnerGroups[currentGroup].classList.remove('active');
            currentGroup = (currentGroup + 1) % partnerGroups.length;
            partnerGroups[currentGroup].classList.add('active');
        }, 4000);
    }

    // ==========================================
    // Background Video
    // ==========================================
    const bgVideo = document.getElementById('anime-bg');
    if (bgVideo) {
        const isMobile = window.matchMedia('(max-width:768px)').matches;
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

        function pickWeightedRandom(pool) {
            const total = pool.reduce((sum, item) => sum + item.weight, 0);
            let roll = Math.random() * total;
            for (let i = 0; i < pool.length; i++) {
                if (roll < pool[i].weight) return pool[i].src;
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
    // Scroll Reveal (Blur Dissipation)
    // ==========================================
    const observer = new IntersectionObserver(entries => {
        entries.forEach((e, idx) => { 
            if (e.isIntersecting) { 
                setTimeout(() => e.target.classList.add('active'), idx * 60);
                observer.unobserve(e.target); 
            } 
        });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ==========================================
    // 3D Mockup Parallax Physics Engine
    // ==========================================
    const mockupStage = document.getElementById('mockup-stage');
    const heroVisual = document.querySelector('.hero-visual');
    if (mockupStage && heroVisual && !window.matchMedia('(max-width:768px)').matches) {
        let targetRotateX = 0, targetRotateY = 0;
        let currentRotateX = 0, currentRotateY = 0;
        const ease = 0.08;

        window.addEventListener('mousemove', e => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
            const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
            targetRotateX = y * -12;
            targetRotateY = x * 16;
        });

        function renderMockup3D() {
            currentRotateX += (targetRotateX - currentRotateX) * ease;
            currentRotateY += (targetRotateY - currentRotateY) * ease;
            mockupStage.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
            requestAnimationFrame(renderMockup3D);
        }
        renderMockup3D();
    }

    // ==========================================
    // Download Dropdown
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
