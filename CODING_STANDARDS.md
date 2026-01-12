# Engineering Standards & Protocols

## 🐞 Debug Protocol: Binary Search Isolation

Hata ayıklama sürecinde "tahmin yürütmek" yasaktır. Aşağıdaki algoritma adım adım uygulanmalıdır:

1.  **Disable all suspect code:** Şüpheli tüm sistemleri/kod bloklarını devre dışı bırak (comment out).
2.  **Enable piece by piece:** Parçaları tek tek açarak hatanın başladığı anı bul (Find what breaks).
3.  **Go inside that piece, repeat:** Sorunlu parçanın içine gir ve süreci tekrarla (Narrow down).
4.  **Find exact line:** Hatanın olduğu tek satırı tespit et (Root cause).

---

## 💎 Code Quality: Absolute Perfection

Yazılan her satır kod aşağıdaki "Mutlak Mükemmellik" seviyesini hedeflemelidir:

### 1. Temel Nitelikler
*   **Correct (Doğru):** Kod, beklenen işi hatasız ve yan etkisiz yapmalıdır.
*   **Readable (Okunabilir):** Kod kendini anlatmalıdır. Yorum satırı "ne" yaptığını değil, "neden" yaptığını açıklamalıdır.
*   **Modular (Modüler):** Her fonksiyon/sınıf tek bir sorumluluğa (SRP) sahip olmalıdır.

### 2. Mimari Standartlar
*   **Extensible (Genişletilebilir):** Yeni özellik eklerken mevcut kodu bozmamalıdır.
*   **Reusable (Yeniden Kullanılabilir):** Hard-coded değerler yerine parametrik yapılar kullanılmalıdır.
*   **Testable (Test Edilebilir):** İş mantığı (Business Logic) UI'dan ayrıştırılmalıdır.

### 3. Prensipler
*   **SOLID:** Nesne yönelimli tasarım prensiplerine sadık kalınmalıdır.
*   **DRY (Don't Repeat Yourself):** Kod tekrarı kesinlikle yasaktır.
*   **KISS (Keep It Simple, Stupid):** Karmaşıklıktan kaçınılmalı, en basit çözüm uygulanmalıdır.

### 4. Operasyonel Gereksinimler
*   **Secure (Güvenli):** Veri bütünlüğü ve yetkilendirme kontrolü esastır.
*   **Performant (Performanslı):** Gereksiz döngüler, bellek kaçakları ve ağır işlemler engellenmelidir.