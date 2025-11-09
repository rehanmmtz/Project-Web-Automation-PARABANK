## 🚀 Project Testing Automation Website ParaBank With Selenium

Project ini dibuat buat ngetes website **Parabank** secara automation menggunakan **Selenium WebDriver**, **JavaScript**, dan **Mocha** sebagai test framework-nya. Tujuannya biar proses testing bisa jalan otomatis, hasilnya terdokumentasi rapi, dan gampang dipantau lewat report & screenshot. Selain itu, project ini juga saya **integrasikan dengan CI/CD di GitHub Actions**, jadi setiap kali ada perubahan kode (misalnya push atau pull request), Semua hasil test (termasuk **report** dan **screenshot**) otomatis tersimpan, sehingga mudah dipantau dan dievaluasi. pipeline juga otomatis akan jalan buat ngecek apakah semua test masih aman. Kalau ada test yang gagal, status build langsung kelihatan di GitHub, jadi bisa cepat diperbaiki sebelum di-merge ke branch utama. CI/CD ini juga bantu banget buat memastikan kualitas aplikasi tetap terjaga tanpa perlu jalanin test manual tiap kali ada update kode. Semua serba otomatis 💨  

## 🧰 Tech Stack

| Komponen | Deskripsi |
|-----------|------------|
| **Bahasa** | JavaScript (Node.js) |
| **Framework Testing** | Mocha |
| **Automation Tool** | Selenium WebDriver |
| **Reporter** | Mochawesome |
| **CI/CD** | GitHub Actions |
| **Target Website** | [Parabank Demo Site](https://parabank.parasoft.com/) |

## 💻 Cara Menjalankan Project ini
- Clone Project ini
- jalankan npm install
- jika ingin menjalankan spesifik testcase saja jalankan: ``npm run test_01`` misalnya pada testcase 01
- jika ingin menjalankan seluruh testcase langsung jalankan: ``npm run test_all``
- kemudian setelah selesai dijalakan, report akan otomatis tergenerate dan dapat dilihat melalui mochawesome-report.html nya
- report juga dapat dilihat berupa screnshot pada folder ss_screnshot

⚠️ **Noted:**  
Project ini dibuat hanya untuk **tujuan pembelajaran & latihan buat ngembangin skill 😎**
  
