# KO Remaster – Command Center // Teknik Dokümantasyon

**Versiyon:** v4.3  
**Tarih:** 12.01.2026  
**Mimari:** Single Page Application (SPA) / Vanilla JS  

Bu doküman, projenin teknik altyapısını, veri akışını ve özellik haritasını içerir.

---

## 1. Genel Mimari

Proje, harici bir derleyiciye (Webpack, React vb.) ihtiyaç duymadan, doğrudan tarayıcıda çalışan modüler bir yapıdan oluşur.

*   **Yapı:** `index.html` (İskelet), `style.css` (Görünüm), `app.js` (Mantık), `supabase.js` (Veritabanı Servisi).
*   **Frontend:** HTML5, CSS3 (Variables + Glassmorphism), Vanilla JS.
*   **State Management:** Merkezi `state` objesi (Reactive olmayan, manuel render tetiklemeli).
*   **Veritabanı (Hibrit):**
    1.  **LocalStorage:** Anlık, senkron veri saklama (Hız için).
    2.  **Supabase:** Bulut tabanlı asenkron yedekleme (Güvenlik ve çoklu cihaz için).
*   **Entegrasyon:** GitHub REST API (Commit geçmişini çekmek için).

---

## 2. Veri Yapısı (Data Schema)

Uygulamanın kalbi `state` objesidir. Yapısı şöyledir:

```json
{
  "meta": { "version": "v4.1", "lastSavedAt": 1700000000 },
  "notes": { "eren": "...", "tayfun": "..." },
  "tasks": [
    {
      "id": 123456789,
      "title": "Task Başlığı",
      "status": "todo | doing | done",
      "priority": "normal | high | blocker",
      "subsystem": "Entity | UI | Network...",
      "owner": "Eren | Tayfun | Client | Server",
      "progress": 0-100,
      "problem": "Sorun tanımı",
      "hypothesis": "Teknik varsayım",
      "solution": "Çözüm planı",
      "debugSteps": [false, false, false, false], // Binary Search Isolation
      "createdAt": Timestamp,
      "updatedAt": Timestamp,
      "doneAt": Timestamp | null
    }
  ],
  "events": [ { "at": Timestamp, "msg": "Log mesajı" } ]
}
```

---

## 3. Özellik Haritası (Feature Map)

### A. Kullanıcı Arayüzü (UI/UX)
*   **Glassmorphism Tasarım:** Yarı saydam paneller, bulanık arka planlar (`backdrop-filter`).
*   **Dark/Light Mode:** `body.light-mode` sınıfı ile CSS değişkenleri (`--bg`, `--txt`) tersine çevrilir.
*   **Kanban Board:** `To Do`, `In Progress`, `Done` sütunları.
*   **Drag & Drop:** HTML5 Drag API kullanılarak kartların sürüklenip durumu değiştirmesi.
*   **Tooltip:** Kart üzerine gelindiğinde (`hover`) detay ve debug durumunu gösteren uçan pencere.
*   **Offline Mode:** İnternet bağlantısı koptuğunda sağ üstte beliren "Offline Mode" uyarısı.
*   **i18n (Çoklu Dil):** Tek tuşla Türkçe/İngilizce geçişi (`TEXTS` objesi üzerinden).

### B. İş Mantığı (Business Logic)
*   **AutoSave:** Her veri değişiminde `localStorage`'a yazar. Supabase'e yazarken `debounce` (gecikmeli yazma) uygulayarak sunucuyu yormaz.
*   **Debug Protocol:** 4 adımlı "Binary Search Isolation" süreci (Disable -> Enable -> Repeat -> Locate).
*   **Filtreleme:** Subsystem, Priority, Owner ve "Hide Done" seçenekleri ile dinamik liste yönetimi.
*   **İstatistikler:**
    *   Velocity (Son 7 günde biten işler).
    *   Subsystem Progress (Modül bazlı ilerleme çubukları).
    *   Compact Metrics (Minimalist ilerleme çubukları).

### C. Entegrasyonlar
*   **GitHub:** LED durum göstergesi ve "Time Ago" (ne kadar önce) sayacı ile commit takibi.
*   **Supabase:** `supabase.js` servisi üzerinden izole edilmiş, hata toleranslı veri senkronizasyonu.

---

## 4. Konfigürasyon Ayarları

`app.js` dosyasının başındaki şu değişkenler ile sistem yönetilir:

| Değişken | Açıklama | Örnek Değer |
| :--- | :--- | :--- |
| `STORAGE_KEY` | LocalStorage'da verinin tutulacağı anahtar adı. | `"ko_remaster_v4"` |
| `GITHUB_REPO` | Commitlerin çekileceği GitHub deposu. | `"erencan/ko-remaster"` |
| `SUPABASE_URL` | Supabase proje adresi. | `"https://xyz.supabase.co"` |
| `SUPABASE_KEY` | Supabase Anon Key (Public). | `"eyJhbGci..."` |

---

## 5. Fonksiyon Haritası (Code Map)

`app.js` içerisindeki ana fonksiyonların görevleri:

*   **`load() / save()`:** LocalStorage okuma/yazma.
*   **`autoSave()`:** Hem local hem bulut kaydını tetikler.
*   **`renderAll()`:** Tüm ekranı (Board, İstatistikler, Loglar) yeniden çizer.
*   **`renderBoard()`:** Filtrelere göre taskları süzer ve sütunlara dağıtır.
*   **`openTask(id)`:** Detay modalını açar ve form alanlarını doldurur.
*   **`saveModal()`:** Modaldaki verileri state'e yazar ve kapatır.
*   **`drag() / drop()`:** Sürükle bırak mantığını yönetir.
*   **`fetchGitCommits()`:** GitHub API'den veri çeker.
*   **`toggleTheme()`:** Gece/Gündüz modunu değiştirir.
*   **`checkNetworkStatus()`:** İnternet bağlantısını izler ve offline uyarısını yönetir.
*   **`setLang(lang)`:** Arayüz dilini değiştirir.

---

## 6. Debug & Bakım

### Acil Durumlar
1.  **Veri Bozulursa:** Üst bardaki `Import` butonu ile daha önce alınan `.json` yedeği geri yüklenebilir.
2.  **Sıfırlama:** `Sıfırla (Hard Reset)` butonu her şeyi siler ve varsayılan (seed) veriye döner.
3.  **Supabase Bağlantısı:** Konsolda `Supabase ❌` hatası varsa, internet bağlantısı veya API Key kontrol edilmelidir.

### Geliştirme İpuçları
*   Yeni bir alan ekleneceği zaman `app.js` içinde `TaskFactory` (create), `supabase.js` içinde mapper fonksiyonlarına eklenmelidir.
*   CSS değişiklikleri `style.css` dosyasında `:root` değişkenleri üzerinden yapılmalıdır.

---

*Bu dosya, projenin teknik hafızasıdır. Büyük değişikliklerde güncellenmelidir.*