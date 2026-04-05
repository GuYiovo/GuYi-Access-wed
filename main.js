function initApp() {
    // 替换为本地演示图片池
    const localImages = [
        'img/demo.png',
        'img/demo_2.png',
        'img/demo_3.png',
        'img/demo_4.png',
        'img/demo_5.png',
        'img/demo_6.png'
    ];
    
    const COUNT = 8; 
    const groups = [['col1-g1','col1-g2'],['col2-g1','col2-g2'],['col3-g1','col3-g2'],['col4-g1','col4-g2']];

    // 从本地数组中随机获取一张图片
    function getRandomImg() { 
        return localImages[Math.floor(Math.random() * localImages.length)]; 
    }

    function buildImg() {
        const img = document.createElement('img');
        img.alt = ''; img.width = 400; img.height = 560; img.loading = 'lazy';
        // 使用 cover 保持比例填充
        img.style.objectFit = 'cover'; 
        img.dataset.retries = '0';
        setTimeout(() => { img.src = getRandomImg(); }, Math.random() * 2500);
        img.onload = function() { this.classList.add('loaded'); };
        img.onerror = function () {
            const retries = parseInt(this.dataset.retries, 10);
            if (retries < 3) { 
                this.dataset.retries = retries + 1;
                setTimeout(() => { this.src = getRandomImg(); }, 1000 + Math.random() * 2000);
            } else { this.style.background = 'rgba(255,255,255,0.01)'; }
        };
        return img;
    }

    groups.forEach(([g1id, g2id]) => {
        const g1 = document.getElementById(g1id), g2 = document.getElementById(g2id);
        if (g1 && g2) { for (let i = 0; i < COUNT; i++) { g1.appendChild(buildImg()); g2.appendChild(buildImg()); } }
    });

    if (!window.matchMedia('(max-width:768px)').matches) {
        let raf = 0, last = 0;
        document.addEventListener('mousemove', e => {
            const now = Date.now();
            if (now - last < 50 || raf) return;
            raf = requestAnimationFrame(() => {
                const x = (e.clientX - window.innerWidth / 2) * 0.025;
                const y = (e.clientY - window.innerHeight / 2) * 0.025;
                const bg = document.getElementById('anime-bg');
                if (bg) { bg.style.setProperty('--mouse-x', `${x}px`); bg.style.setProperty('--mouse-y', `${y}px`); }
                last = now; raf = 0;
            });
        }, { passive: true });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const docBlocks = document.querySelectorAll('.doc-block[id], .qq-banner[id]');
    const docLinks = document.querySelectorAll('.docs-nav a[href^="#"]');
    window.addEventListener('scroll', () => {
        let cur = '';
        docBlocks.forEach(b => { if (b.getBoundingClientRect().top < 300) cur = b.id; });
        docLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    });

    // --- 顶级企业级 3D 轮播与鼠标视差逻辑 ---
    const items = document.querySelectorAll('.ent-item');
    const wrapper = document.getElementById('ent-3d-wrapper');
    const visual = document.querySelector('.hero-visual');
    
    if (items.length > 0 && wrapper && visual) {
        let cur = 0;
        const total = items.length;
        
        // 1. 轮播图类名更新逻辑
        function updateGallery() {
            items.forEach((item, i) => {
                item.className = 'ent-item'; // 重置类名
                let diff = i - cur;
                
                // 处理循环计算
                if (diff < -Math.floor(total / 2)) diff += total;
                if (diff > Math.floor(total / 2)) diff -= total;
                
                if (diff === 0) item.classList.add('active');
                else if (diff === -1) item.classList.add('prev-1');
                else if (diff === 1) item.classList.add('next-1');
                else if (diff === -2) item.classList.add('prev-2');
                else if (diff === 2) item.classList.add('next-2');
                else item.classList.add('hidden');
            });
        }
        
        updateGallery();
        setInterval(() => {
            cur = (cur + 1) % total;
            updateGallery();
        }, 4000); // 4秒切换一次，留出欣赏时间

        // 2. 带有物理阻尼感 (Lerp) 的鼠标跟随逻辑
        if (!window.matchMedia('(max-width:768px)').matches) {
            let targetX = 0, targetY = 0;
            let currentX = 0, currentY = 0;
            const ease = 0.08; // 阻尼系数，越小越平滑

            visual.addEventListener('mousemove', e => {
                const rect = visual.getBoundingClientRect();
                // 计算相对中心的百分比位置 (-0.5 到 0.5)
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                // 设定目标旋转角度 (最大倾斜角度)
                targetX = y * 15;   // 鼠标上下移动，绕 X 轴旋转
                targetY = x * -20;  // 鼠标左右移动，绕 Y 轴旋转
            });

            visual.addEventListener('mouseleave', () => {
                targetX = 0;
                targetY = 0;
            });

            // 渲染循环
            function renderParallax() {
                // 线性插值公式：当前值 += (目标值 - 当前值) * 缓动系数
                currentX += (targetX - currentX) * ease;
                currentY += (targetY - currentY) * ease;
                
                // 应用到 3D 包装器上
                wrapper.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
                
                requestAnimationFrame(renderParallax);
            }
            renderParallax(); // 启动循环
        }
    }
    // --- 结束 ---

    const wrap = document.getElementById('dlWrap');
    const btn = document.getElementById('dlBtn');
    if(btn && wrap) {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = wrap.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
        });
        document.addEventListener('click', e => {
            if (!wrap.contains(e.target)) { wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') { wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
        });
    }

    const codeData = [
        { id:'go', name:'Go', code:`\n<span class="k">package</span> main\n\n<span class="k">import</span> (\n    <span class="s">"bytes"</span>; <span class="s">"crypto/aes"</span>; <span class="s">"crypto/cipher"</span>\n    <span class="s">"encoding/base64"</span>; <span class="s">"encoding/hex"</span>; <span class="s">"encoding/json"</span>\n    <span class="s">"fmt"</span>; <span class="s">"io/ioutil"</span>; <span class="s">"net/http"</span>\n)\n\n<span class="k">func</span> <span class="f">DecryptAES256GCM</span>(b64, hexKey <span class="t">string</span>) (<span class="t">string</span>, <span class="t">error</span>) {\n    key, _ := hex.DecodeString(hexKey)\n    raw, _ := base64.StdEncoding.DecodeString(b64)\n    iv, tag, ct := raw[:12], raw[12:28], raw[28:]\n    block, _ := aes.NewCipher(key)\n    gcm, _ := cipher.NewGCM(block)\n    plain, err := gcm.Open(<span class="k">nil</span>, iv, append(ct, tag...), <span class="k">nil</span>)\n    <span class="k">return</span> string(plain), err\n}\n\n<span class="k">func</span> <span class="f">main</span>() {\n    payload, _ := json.Marshal(map[<span class="t">string</span>]<span class="t">string</span>{\n        <span class="s">"app_key"</span>: <span class="s">"YOUR_64_HEX_KEY"</span>, <span class="s">"card_code"</span>: <span class="s">"CARD_XXXX"</span>,\n    })\n    resp, _ := http.Post(<span class="s">"https://your-domain.com/Verifyfile/api.php"</span>,\n        <span class="s">"application/json"</span>, bytes.NewBuffer(payload))\n    body, _ := ioutil.ReadAll(resp.Body)<span class="k">var</span> res map[<span class="t">string</span>]<span class="k">interface</span>{}\n    json.Unmarshal(body, &res)\n    <span class="k">if</span> enc, ok := res[<span class="s">"encrypted_data"</span>].(<span class="t">string</span>); ok {\n        plain, _ := DecryptAES256GCM(enc,<span class="s">"YOUR_64_HEX_KEY"</span>)\n        fmt.Println(plain)\n    }\n}` },
        { id:'rust', name:'Rust', code:`\n<span class="k">use</span> aes_gcm::{aead::{Aead,KeyInit},Aes256Gcm,Nonce};\n<span class="k">use</span> base64::{engine::general_purpose,Engine as _};\n\n<span class="k">fn</span> <span class="f">decrypt</span>(b64:&<span class="t">str</span>, hex_key:&<span class="t">str</span>) -> <span class="t">String</span> {\n    <span class="k">let</span> key = hex::decode(hex_key).unwrap();\n    <span class="k">let</span> raw = general_purpose::STANDARD.decode(b64).unwrap();\n    <span class="k">let</span><span class="k">mut</span> payload = raw[28..].to_vec();\n    payload.extend_from_slice(&raw[12..28]);\n    <span class="k">let</span> plain = Aes256Gcm::new_from_slice(&key).unwrap()\n        .decrypt(Nonce::from_slice(&raw[0..12]), payload.as_ref()).unwrap();\n    String::from_utf8(plain).unwrap()\n}` },
        { id:'cpp', name:'C++', code:`\n<span class="k">#include</span> &lt;openssl/evp.h&gt;\n<span class="k">#include</span> &lt;string&gt;, &lt;vector&gt;\n\n<span class="t">std::string</span> <span class="f">DecryptGCM</span>(<span class="k">const</span> <span class="t">std::vector&lt;uint8_t&gt;</span>& raw, <span class="k">const</span> <span class="t">std::vector&lt;uint8_t&gt;</span>& key) {\n    <span class="k">auto</span>* ctx = EVP_CIPHER_CTX_new();\n    <span class="t">int</span> len, plen;\n    <span class="t">std::vector&lt;uint8_t&gt;</span> plain(raw.size());\n    EVP_DecryptInit_ex(ctx, EVP_aes_256_gcm(), NULL, NULL, NULL);\n    EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_SET_IVLEN, 12, NULL);\n    EVP_DecryptInit_ex(ctx, NULL, NULL, key.data(), raw.data());\n    EVP_DecryptUpdate(ctx, plain.data(), &len, raw.data()+28, raw.size()-28);\n    plen = len;\n    EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_SET_TAG, 16, (<span class="k">void</span>*)(raw.data()+12));\n    EVP_CIPHER_CTX_free(ctx);\n    <span class="k">return</span> {(<span class="k">char</span>*)plain.data(), (<span class="t">size_t</span>)plen};\n}` },
        { id:'csharp', name:'C# / .NET', code:`\n<span class="k">using</span> System; <span class="k">using</span> System.Net.Http; <span class="k">using</span> System.Text;\n<span class="k">using</span> System.Security.Cryptography; <span class="k">using</span> System.Threading.Tasks;\n\n<span class="k">public class</span> <span class="f">GuYiAegis</span> {\n    <span class="k">public static string</span> <span class="f">Decrypt</span>(<span class="k">string</span> b64, <span class="k">string</span> hexKey) {\n        <span class="k">var</span> key  = Convert.FromHexString(hexKey);\n        <span class="k">var</span> raw  = Convert.FromBase64String(b64);\n        <span class="k">var</span> iv   = raw[0..12];\n        <span class="k">var</span> tag  = raw[12..28];\n        <span class="k">var</span> data = raw[28..];\n        <span class="k">var</span> plain = <span class="k">new byte</span>[data.Length];\n        <span class="k">using var</span> aes = <span class="k">new</span> AesGcm(key);\n        aes.Decrypt(iv, data, tag, plain);\n        <span class="k">return</span> Encoding.UTF8.GetString(plain);\n    }<span class="k">public static async</span> Task <span class="f">VerifyAsync</span>() {\n        <span class="k">using var</span> c = <span class="k">new</span> HttpClient();\n        <span class="k">var</span> res = <span class="k">await</span> c.PostAsync(\n            <span class="s">"https://your-domain.com/Verifyfile/api.php"</span>,\n            <span class="k">new</span> StringContent(\n                <span class="s">"{\\"app_key\\":\\"KEY\\",\\"card_code\\":\\"CARD\\"}"</span>,\n                Encoding.UTF8, <span class="s">"application/json"</span>));\n    }\n}` },
        { id:'java', name:'Java / Android', code:`\n<span class="k">import</span> javax.crypto.*; <span class="k">import</span> javax.crypto.spec.*;\n<span class="k">import</span> java.util.*; <span class="k">import</span> java.nio.charset.StandardCharsets;\n\n<span class="k">public class</span> <span class="f">GuYiAegis</span> {\n    <span class="k">public static</span> String <span class="f">decrypt</span>(String b64, String hexKey) <span class="k">throws</span> Exception {\n        <span class="k">byte</span>[] key = hexToBytes(hexKey);\n        <span class="k">byte</span>[] raw = Base64.getDecoder().decode(b64);\n        <span class="k">byte</span>[] iv  = Arrays.copyOfRange(raw, 0, 12);\n        <span class="k">byte</span>[] tag = Arrays.copyOfRange(raw, 12, 28);\n        <span class="k">byte</span>[] ct= Arrays.copyOfRange(raw, 28, raw.length);\n        <span class="k">byte</span>[] buf = <span class="k">new byte</span>[ct.length + 16];\n        System.arraycopy(ct, 0, buf, 0, ct.length);\n        System.arraycopy(tag, 0, buf, ct.length, 16);\n        Cipher c = Cipher.getInstance(<span class="s">"AES/GCM/NoPadding"</span>);\n        c.init(Cipher.DECRYPT_MODE, <span class="k">new</span> SecretKeySpec(key,<span class="s">"AES"</span>), <span class="k">new</span> GCMParameterSpec(128,iv));\n        <span class="k">return new</span> String(c.do(buf), StandardCharsets.UTF_8);\n    }\n    <span class="k">private static byte</span>[] <span class="f">hexToBytes</span>(String s) {\n        <span class="k">byte</span>[] d = <span class="k">new byte</span>[s.length()/2];\n        <span class="k">for</span> (<span class="t">int</span> i = 0; i &lt; d.length; i++)\n            d[i] = (<span class="k">byte</span>) Integer.parseInt(s.substring(i*2, i*2+2), 16);\n        <span class="k">return</span> d;\n    }\n}` },
        { id:'python', name:'Python 3', code:`\n<span class="k">from</span> cryptography.hazmat.primitives.ciphers.aead <span class="k">import</span> AESGCM\n<span class="k">import</span> base64, json, requests\n\n<span class="k">def</span> <span class="f">decrypt</span>(b64: str, hex_key: str) -> dict:\n    key = bytes.fromhex(hex_key)\n    raw = base64.b64decode(b64)\n    iv, tag, ct = raw[:12], raw[12:28], raw[28:]\n    plain = AESGCM(key).decrypt(iv, ct + tag,<span class="k">None</span>)\n    <span class="k">return</span> json.loads(plain)\n\nres = requests.post(<span class="s">"https://your-domain.com/Verifyfile/api.php"</span>, json={\n    <span class="s">"app_key"</span>: <span class="s">"YOUR_64_HEX_KEY"</span>, <span class="s">"card_code"</span>: <span class="s">"VIP-CODE"</span>\n}).json()\n\n<span class="k">if</span> <span class="s">"encrypted_data"</span> <span class="k">in</span> res:\n    <span class="f">print</span>(decrypt(res[<span class="s">"encrypted_data"</span>], <span class="s">"YOUR_64_HEX_KEY"</span>))` },
        { id:'nodejs', name:'Node.js', code:`\n<span class="k">const</span> crypto = require(<span class="s">'crypto'</span>), axios = require(<span class="s">'axios'</span>);\n\n<span class="k">function</span> <span class="f">decrypt</span>(b64, hexKey) {\n    <span class="k">const</span> key = Buffer.from(hexKey, <span class="s">'hex'</span>);\n    <span class="k">const</span> raw = Buffer.from(b64, <span class="s">'base64'</span>);\n    <span class="k">const</span> dec = crypto.createDecipheriv(<span class="s">'aes-256-gcm'</span>, key, raw.subarray(0,12));\n    dec.setAuthTag(raw.subarray(12,28));\n    <span class="k">return</span> JSON.parse(Buffer.concat([dec.update(raw.subarray(28)), dec.final()]));\n}\n\n<span class="k">async function</span> <span class="f">verify</span>() {\n    <span class="k">const</span> { data } = <span class="k">await</span> axios.post(\n        <span class="s">'https://your-domain.com/Verifyfile/api.php'</span>,\n        { app_key: <span class="s">'YOUR_KEY'</span>, card_code: <span class="s">'CARD'</span> }\n    );\n    <span class="k">if</span> (data.encrypted_data) console.log(decrypt(data.encrypted_data, <span class="s">'YOUR_KEY'</span>));\n}` },
        { id:'php', name:'PHP', code:`\n<span class="k">function</span> <span class="f">decryptAegis</span>(<span class="s">$b64</span>, <span class="s">$hexKey</span>) {\n    <span class="s">$key</span>  = hex2bin(<span class="s">$hexKey</span>);\n    <span class="s">$raw</span>  = base64_decode(<span class="s">$b64</span>);\n    <span class="s">$iv</span>   = substr(<span class="s">$raw</span>, 0, 12);\n    <span class="s">$tag</span>  = substr(<span class="s">$raw</span>, 12, 16);\n    <span class="s">$data</span> = substr(<span class="s">$raw</span>, 28);\n    <span class="k">return</span> json_decode(\n        openssl_decrypt(<span class="s">$data</span>, <span class="s">'aes-256-gcm'</span>, <span class="s">$key</span>, OPENSSL_RAW_DATA, <span class="s">$iv</span>, <span class="s">$tag</span>),\n        <span class="k">true</span>\n    );\n}\n\n<span class="s">$ch</span> = curl_init(<span class="s">'https://your-domain.com/Verifyfile/api.php'</span>);\ncurl_setopt_array(<span class="s">$ch</span>, [\n    CURLOPT_RETURNTRANSFER => <span class="k">true</span>,\n    CURLOPT_POSTFIELDS     => json_encode([<span class="s">"app_key"</span>=><span class="s">"KEY"</span>, <span class="s">"card_code"</span>=><span class="s">"CARD"</span>]),\n    CURLOPT_HTTPHEADER     => [<span class="s">'Content-Type: application/json'</span>],\n]);\n<span class="s">$resp</span> = json_decode(curl_exec(<span class="s">$ch</span>), <span class="k">true</span>);\n<span class="k">if</span> (isset(<span class="s">$resp</span>[<span class="s">'encrypted_data'</span>]))\n    print_r(decryptAegis(<span class="s">$resp</span>[<span class="s">'encrypted_data'</span>], <span class="s">"KEY"</span>));` }
    ];

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
            pane.innerHTML = `<pre>${item.code}</pre>`;
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
            t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 2000);
        });
    };
}

initApp();
