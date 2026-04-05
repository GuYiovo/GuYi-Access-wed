function initApp() {
    const BASE_URL = 'https://www.loliapi.com/acg/pe/?id=';
    const MAX_ID = 2875;
    const COUNT = 8; 
    const groups = [['col1-g1','col1-g2'],['col2-g1','col2-g2'],['col3-g1','col3-g2'],['col4-g1','col4-g2']];

    function getRandomId() { return Math.floor(Math.random() * MAX_ID) + 1; }
    function buildImg() {
        const img = document.createElement('img');
        img.alt = ''; img.width = 400; img.height = 560; img.loading = 'lazy';
        img.dataset.retries = '0';
        setTimeout(() => { img.src = BASE_URL + getRandomId(); }, Math.random() * 2500);
        img.onload = function() { this.classList.add('loaded'); };
        img.onerror = function () {
            const retries = parseInt(this.dataset.retries, 10);
            if (retries < 3) { 
                this.dataset.retries = retries + 1;
                setTimeout(() => { this.src = BASE_URL + getRandomId(); }, 1000 + Math.random() * 2000);
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

    const slides = document.querySelectorAll('#demo-slider .slide');
    if (slides.length > 0) {
        let cur = 0;
        setInterval(() => {
            slides[cur].classList.remove('active');
            cur = (cur + 1) % slides.length;
            slides[cur].classList.add('active');
        }, 3500);
    }

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
