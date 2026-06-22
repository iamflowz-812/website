// 1. CSS Styles dynamisch in den Head einfügen
const cookieStyles = `
  .cookie-overlay {
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); z-index: 2000; display: none; justify-content: center; align-items: center; padding: 1.5rem;
  }
  .cookie-overlay.show { display: flex; }
  .cookie-modal {
    background: #ffffff; color: #1a1a1a; width: 100%; max-width: 520px; padding: 2.25rem 2rem; font-family: 'Inter', sans-serif; box-shadow: 0 20px 40px rgba(0,0,0,0.4); box-sizing: border-box;
  }
  .cookie-modal * { box-sizing: border-box; }
  .cookie-screen { display: none; }
  .cookie-screen.active { display: block; }
  .cookie-modal h2 {
    font-family: 'Inter', sans-serif; font-size: 1.4rem; font-weight: 600; color: #000; margin-bottom: 1.25rem; text-align: center; text-transform: none; letter-spacing: normal; margin-top: 0;
  }
  .cookie-modal-text { font-size: 0.75rem; line-height: 1.6; color: #4a4a4a; text-align: justify; margin-bottom: 1.5rem; }
  .cookie-modal-text a { color: #0044cc; text-decoration: underline; }
  .cookie-checkboxes { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1.5rem; font-size: 0.8rem; font-weight: 500; }
  .cookie-checkboxes label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: #1a1a1a; }
  .cookie-checkboxes input[type="checkbox"] { accent-color: #000; width: 15px; height: 15px; }
  .cookie-modal-btns { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .btn-cookie-modal {
    background: #000000; color: #ffffff; border: none; width: 100%; padding: 0.85rem; font-size: 0.8rem; font-weight: 500; font-family: 'Inter', sans-serif; cursor: pointer; transition: background 0.2s;
  }
  .btn-cookie-modal:hover { background: #222222; }
  .cookie-detail-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .cookie-detail-header-row .cookie-modal-btns-row { display: flex; gap: 0.5rem; }
  .cookie-detail-header-row .cookie-modal-btns-row .btn-cookie-modal { width: auto; padding: 0.6rem 1.2rem; }
  .btn-back { font-size: 0.8rem; color: #666; cursor: pointer; }
  .btn-back:hover { color: #000; text-decoration: underline; }
  .cookie-category-box { background: #f7f7f7; padding: 1.25rem; margin-bottom: 1rem; text-align: left; border-radius: 4px; }
  .cookie-cat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
  .cookie-cat-title { font-size: 0.9rem; font-weight: 600; color: #000; }
  .cookie-cat-desc { font-size: 0.75rem; line-height: 1.5; color: #555; margin-bottom: 0.5rem; }
  .cookie-cat-toggle-link { font-size: 0.75rem; color: #0044cc; text-decoration: none; cursor: pointer; display: inline-block; margin-top: 0.25rem; }
  .cookie-cat-toggle-link:hover { text-decoration: underline; }
  .cookie-cat-details-content { display: none; font-size: 0.7rem; color: #666; background: #eee; padding: 0.75rem; margin-top: 0.5rem; border-left: 2px solid #000; line-height: 1.4; }
  .cookie-cat-details-content.open { display: block; }
  .cookie-cat-details-content a { color: #0044cc; text-decoration: underline; }
  .switch-wrapper { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #666; }
  .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .3s; border-radius: 22px; }
  .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
  input:checked + .slider { background-color: #000; }
  input:checked + .slider:before { transform: translateX(18px); }
  .switch input:disabled + .slider { background-color: #e0e0e0; cursor: not-allowed; }
  .cookie-modal-footer { display: flex; justify-content: center; gap: 0.5rem; font-size: 0.65rem; color: #888; }
  .cookie-modal-footer button, .cookie-modal-footer a { background: none; border: none; color: #888; font-size: 0.65rem; cursor: pointer; text-decoration: none; font-family: inherit; padding: 0; }
  .cookie-modal-footer button:hover, .cookie-modal-footer a:hover { text-decoration: underline; color: #000; }
`;

const styleEl = document.createElement('style');
styleEl.innerHTML = cookieStyles;
document.head.appendChild(styleEl);

// 2. HTML Struktur des Banners dynamisch in den Body einfügen
const bannerHTML = `
  <div class="cookie-overlay" id="cookieBanner">
    <div class="cookie-modal">
      <div class="cookie-screen active" id="screenMain">
        <h2>Datenschutzeinstellungen</h2>
        <div class="cookie-modal-text">
          Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Wenn Sie unter 16 Jahre alt sind und Ihre Zustimmung zu freiwilligen Diensten geben möchten, müssen Sie Ihre Erziehungsberechtigten um Erlaubnis bitten. Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer <a href="datenschutz">Datenschutzerklärung</a>. Sie können Ihre Auswahl jederzeit unter Einstellungen widerrufen oder anpassen.
        </div>
        <div class="cookie-checkboxes">
          <label><input type="checkbox" checked disabled> Essenziell</label>
          <label><input type="checkbox" id="mainExternalCheckbox"> Externe Medien</label>
        </div>
        <div class="cookie-modal-btns">
          <button class="btn-cookie-modal" id="btnMainAcceptAll">Alle akzeptieren</button>
          <button class="btn-cookie-modal" id="btnMainSave">Speichern</button>
          <button class="btn-cookie-modal id-settings-trigger">Individuelle Datenschutzeinstellungen</button>
        </div>
        <div class="cookie-modal-footer">
          <button class="id-settings-trigger">Cookie Details</button> | 
          <a href="datenschutz">Datenschutzerklärung</a> | 
          <a href="impressum">Impressum</a>
        </div>
      </div>

      <div class="cookie-screen" id="screenDetails">
        <h2>Datenschutzeinstellungen</h2>
        <div class="cookie-detail-header-row">
          <div class="cookie-modal-btns-row">
            <button class="btn-cookie-modal" id="btnDetailAcceptAll">Alle akzeptieren</button>
            <button class="btn-cookie-modal" id="btnDetailSave">Speichern</button>
          </div>
          <span class="btn-back" id="btnBackToMain">Zurück</span>
        </div>
        <div class="cookie-category-box">
          <div class="cookie-cat-top">
            <span class="cookie-cat-title">Essenziell (1)</span>
            <div class="switch-wrapper">
              <span>Immer aktiv</span>
              <label class="switch">
                <input type="checkbox" checked disabled>
                <span class="slider"></span>
              </label>
            </div>
          </div>
          <p class="cookie-cat-desc">Essenzielle Cookies ermöglichen grundlegende Funktionen und sind für die einwandfreie Funktion der Website erforderlich.</p>
          <span class="cookie-cat-toggle-link" data-target="detailsEssential">Cookie-Informationen anzeigen</span>
          <div class="cookie-cat-details-content" id="detailsEssential">
            <strong>Cookie Name:</strong> flowz_session, cookie_essential<br>
            <strong>Zweck:</strong> Speichert die getroffenen Auswahlen der Privatsphäre-Einstellungen.<br>
            <strong>Rechtliche Infos:</strong> Sie finden alle Angaben zu verantwortlichen Stellen und Betreibern im <a href="impressum">Impressum</a> unserer Webseite.
          </div>
        </div>
        <div class="cookie-category-box">
          <div class="cookie-cat-top">
            <span class="cookie-cat-title">Externe Medien (2)</span>
            <div class="switch-wrapper">
              <span id="toggleStatusText">Aus</span>
              <label class="switch">
                <input type="checkbox" id="detailExternalSwitch">
                <span class="slider"></span>
              </label>
            </div>
          </div>
          <p class="cookie-cat-desc">Inhalte von Videoplattformen und Social-Media-Plattformen werden standardmäßig blockiert. Wenn Cookies von externen Medien akzeptiert werden, bedarf der Zugriff auf diese Inhalte keiner manuellen Einwilligung mehr.</p>
          <span class="cookie-cat-toggle-link" data-target="detailsExternal">Cookie-Informationen anzeigen</span>
          <div class="cookie-cat-details-content" id="detailsExternal">
            Hierbei werden Daten an externe Plattformen übermittelt. Die Datenschutzerklärungen der genutzten Dienste finden Sie hier:<br>
            • <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">YouTube (Google) Privacy Policy</a><br>
            • <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener">SoundCloud Privacy Policy</a><br>
            • <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener">Spotify Privacy Policy</a>
          </div>
        </div>
        <div class="cookie-modal-footer" style="margin-top: 1.5rem;">
          <a href="datenschutz">Datenschutzerklärung</a> | <a href="impressum">Impressum</a>
        </div>
      </div>
    </div>
  </div>
`;

// Sobald der DOM bereit ist, initialisieren wir das Banner
document.addEventListener('DOMContentLoaded', () => {
  const div = document.createElement('div');
  div.innerHTML = bannerHTML;
  document.body.appendChild(div);

  // Elemente holen
  const cookieBanner = document.getElementById('cookieBanner');
  const screenMain = document.getElementById('screenMain');
  const screenDetails = document.getElementById('screenDetails');
  const settingsTriggers = document.querySelectorAll('.id-settings-trigger');
  const btnBackToMain = document.getElementById('btnBackToMain');
  const mainExternalCheckbox = document.getElementById('mainExternalCheckbox');
  const detailExternalSwitch = document.getElementById('detailExternalSwitch');
  const toggleStatusText = document.getElementById('toggleStatusText');

  // Logik zur Prüfung und Status-Erkennung
  window.checkCookieConsent = function() {
    const consent = localStorage.getItem('cookie_external');
    if (consent === 'true') {
      loadExternalContent();
    } else {
      restrictExternalContent();
      // Wenn noch überhaupt nicht entschieden wurde, zeige den Banner auf jeder Unterseite!
      if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => { cookieBanner.classList.add('show'); }, 500);
      }
    }
  };

  // Akkordeon Umschalter
  document.querySelectorAll('.cookie-cat-toggle-link').forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      document.getElementById(targetId).classList.toggle('open');
    });
  });

  // Navigation innerhalb des Banners
  settingsTriggers.forEach(t => t.addEventListener('click', (e) => { 
    e.preventDefault();
    screenMain.classList.remove('active'); 
    screenDetails.classList.add('active'); 
  }));
  btnBackToMain.addEventListener('click', () => { 
    screenDetails.classList.remove('active'); 
    screenMain.classList.add('active'); 
  });

  // Synchronisation der Schalter
  mainExternalCheckbox.addEventListener('change', (e) => { 
    detailExternalSwitch.checked = e.target.checked; 
    toggleStatusText.textContent = e.target.checked ? "An" : "Aus"; 
  });
  detailExternalSwitch.addEventListener('change', (e) => { 
    mainExternalCheckbox.checked = e.target.checked; 
    toggleStatusText.textContent = e.target.checked ? "An" : "Aus"; 
  });

  // Externe Inhalte freigeben
  function loadExternalContent() {
    document.querySelectorAll('.cookie-blocked-placeholder').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.cookie-lazy-iframe').forEach(iframe => {
      if(iframe.getAttribute('data-src')) {
        iframe.src = iframe.getAttribute('data-src');
      }
    });

    // DSGVO-Konform: Google reCAPTCHA v2 erst nachladen, wenn externe Medien erlaubt sind
    if (!document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  // Externe Inhalte blockieren
  function restrictExternalContent() {
    document.querySelectorAll('.cookie-blocked-placeholder').forEach(p => p.style.display = 'flex');
    document.querySelectorAll('.cookie-lazy-iframe').forEach(iframe => { iframe.removeAttribute('src'); });
    
    // Falls das Script existiert, entfernen wir es wieder (für Opt-Out)
    const script = document.getElementById('recaptcha-script');
    if (script) script.remove();
  }

  // Speicherfunktion
  window.savePreferences = function(allAccepted, externalAccepted) {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookie_essential', 'true');
    localStorage.setItem('cookie_external', (allAccepted || externalAccepted) ? 'true' : 'false');
    cookieBanner.classList.remove('show');
    window.checkCookieConsent();
  };

  window.enableExternalCookiesViaButton = function() {
    window.savePreferences(true, true);
  };

  // Click-Events registrieren
  document.getElementById('btnMainAcceptAll').addEventListener('click', () => window.savePreferences(true, true));
  document.getElementById('btnMainSave').addEventListener('click', () => window.savePreferences(false, mainExternalCheckbox.checked));
  document.getElementById('btnDetailAcceptAll').addEventListener('click', () => window.savePreferences(true, true));
  document.getElementById('btnDetailSave').addEventListener('click', () => window.savePreferences(false, detailExternalSwitch.checked));

  // Globaler Reopen-Trigger für den Footer
  window.reopenCookieBanner = function() {
    const isExternalAllowed = localStorage.getItem('cookie_external') === 'true';
    mainExternalCheckbox.checked = isExternalAllowed;
    detailExternalSwitch.checked = isExternalAllowed;
    toggleStatusText.textContent = isExternalAllowed ? "An" : "Aus";
    screenMain.classList.remove('active'); 
    screenDetails.classList.add('active'); 
    cookieBanner.classList.add('show');
  };

  // Consent beim Laden ausführen
  window.checkCookieConsent();
});