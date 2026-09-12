# Spesifikasi Fitur: Menu Command & Interactive Project Buttons pada Telegram Bot

Memperbarui bot Telegram AI EPUB Translator agar memiliki daftar menu command bawaan Telegram (`setMyCommands`), mengubah tampilan daftar proyek menjadi tombol interaktif (_Inline Keyboard Buttons_), dan saat tombol ditekan, pesan yang sama secara dinamis berubah (_editMessageText_) menjadi tampilan detail proyek lengkap dengan tombol aksi lanjutan.

---

## User Review Required

> [!IMPORTANT] > **1. Menu Command Bawaan Telegram (`setMyCommands`):**
> Bot akan otomatis mendaftarkan daftar command resmi ke Telegram API pada saat startup (`start_polling` / inisialisasi). Pengguna Telegram akan melihat tombol menu di pojok kiri bawah kolom chat dengan pilihan:
>
> - `/projects` — 📚 Daftar buku & pilih proyek
> - `/progress` — 📊 Ringkasan progres seluruh proyek
> - `/help` — ℹ️ Panduan & daftar perintah

> [!IMPORTANT] > **2. Tampilan List Proyek Berbasis Tombol (_Inline Keyboard_):**
> Saat menjalankan `/projects`, bot tidak hanya mengirim teks, melainkan menyertakan tombol untuk masing-masing buku:
>
> - Format tombol: `[ {status_emoji} {title} ({progress}%) ]`
> - `callback_data`: `proj:<project_id>`
> - Tombol kontrol bawah: `[ 🔄 Refresh ]` dan `[ 📊 Semua Progres ]`

> [!IMPORTANT] > **3. Transformasi Pesan Menjadi Detail Proyek (_Message Morphing_):**
> Saat salah satu tombol buku ditekan:
>
> - Bot menjawab callback query (`answerCallbackQuery`) agar indikator loading berhenti.
> - Pesan yang sama di-edit langsung (`editMessageText`) menampilkan detail progres, chapter aktif, token, dan durasi.
> - Di bawah detail buku, tersedia tombol interaktif:
>   - `[ 🔄 Refresh Progres ]`
>   - `[ ⚡ Retry Gagal ]` (jika ada chapter gagal/buku belum selesai)
>   - `[ ⬅️ Kembali ke Daftar Proyek ]` (mengembalikan pesan ke daftar tombol semula tanpa spam pesan baru)

---

## Proposed Changes

```mermaid
flowchart TD
    User([User di Telegram]) --> OpenMenu[Tekan Menu Bot / Ketik /projects]
    OpenMenu --> BotSends[Bot Kirim Pesan Ringkas + Inline Keyboard Daftar Buku]
    BotSends --> UserClicks[User Klik Tombol Buku: '📖 Solo Leveling (45%)']
    UserClicks --> CallbackUpdate[Telegram Kirim Update: callback_query]
    CallbackUpdate --> AnswerSpinner[TelegramNotifier.answer_callback_query]
    AnswerSpinner --> MorphMessage[TelegramNotifier.edit_message_text]
    MorphMessage --> DetailView[Pesan Berubah Jadi Detail Buku + Tombol Aksi: Refresh, Retry, Kembali]
    DetailView -- "Klik '⬅️ Kembali'" --> EditBack[Edit Pesan Kembali ke Daftar Buku]
    DetailView -- "Klik '⚡ Retry Gagal'" --> ExecRetry[Jalankan Retry di Background + Tampilkan Status Terbaru]
```

---

### Component 1: Telegram API Integration Enhancement

#### [MODIFY] [backend/app/notifications/telegram.py](file:///home/salman/Dokumen/Projects/epub-translator-project/backend/app/notifications/telegram.py)

- Update `TelegramNotifier.send_direct_message()` agar menerima parameter opsional `reply_markup: dict[str, Any] | None = None`.
- Tambahkan method `TelegramNotifier.edit_message_text(chat_id, message_id, text, reply_markup=None, parse_mode="HTML")`:
  - Memanggil Telegram Bot API `POST /editMessageText` untuk mengubah pesan yang ada secara in-place.
- Tambahkan method `TelegramNotifier.answer_callback_query(callback_query_id, text=None, show_alert=False)`:
  - Memanggil `POST /answerCallbackQuery` untuk memberitahu Telegram bahwa klik tombol telah diterima.
- Tambahkan method `TelegramNotifier.set_bot_commands(bot_token=None)`:
  - Memanggil `POST /setMyCommands` untuk mendaftarkan menu commands bawaan Telegram (`projects`, `progress`, `help`).
- Buat helper function tingkat modul:
  - `send_telegram_message(chat_id, text, bot_token=None, parse_mode="HTML", reply_markup=None)`
  - `edit_telegram_message(chat_id, message_id, text, bot_token=None, parse_mode="HTML", reply_markup=None)`
  - `answer_telegram_callback(callback_query_id, text=None, show_alert=False, bot_token=None)`
  - `set_telegram_commands(bot_token=None)`

---

### Component 2: Inline Keyboard Generation & Templates

#### [MODIFY] [backend/app/notifications/templates.py](file:///home/salman/Dokumen/Projects/epub-translator-project/backend/app/notifications/templates.py)

- Buat fungsi generator tombol inline keyboard:
  - `render_projects_keyboard(projects_data: list[dict[str, Any]]) -> dict[str, Any]`:
    - Membuat baris tombol untuk setiap proyek: `text=f"{status_emoji} {short_title} ({pct:.0f}%)"`, `callback_data=f"proj:{p['id']}"`.
    - Menambahkan baris utilitas: `[ 🔄 Refresh List ]` (`callback_data="cmd:projects"`) dan `[ 📊 Ringkasan Semua ]` (`callback_data="cmd:all_progress"`).
  - `render_project_detail_keyboard(p_data: dict[str, Any]) -> dict[str, Any]`:
    - Tombol refresh: `[ 🔄 Refresh ]` (`callback_data=f"proj:{p_data['id']}"`).
    - Tombol retry (jika gagal atau belum selesai): `[ ⚡ Retry Gagal ]` (`callback_data=f"retry:{p_data['id']}"`).
    - Tombol kembali: `[ ⬅️ Kembali ke Daftar Proyek ]` (`callback_data="cmd:projects"`).
  - `render_all_progress_keyboard() -> dict[str, Any]`:
    - Tombol `[ ⬅️ Kembali ke Daftar Proyek ]` (`callback_data="cmd:projects"`).

---

### Component 3: Bot Update Handler & Startup Lifecycle

#### [MODIFY] [backend/app/services/telegram_bot_service.py](file:///home/salman/Dokumen/Projects/epub-translator-project/backend/app/services/telegram_bot_service.py)

- Panggil `set_telegram_commands(bot_token)` saat worker `start_polling()` dimulai.
- Pada `handle_update()`:
  - Tambahkan cabang penanganan `update.get("callback_query")`:
    1. Ekstrak `callback_id`, `chat_id`, `message_id`, dan `data`.
    2. Panggil `answer_telegram_callback(callback_id)`.
    3. Jika `data.startswith("proj:")`:
       - Ambil detail proyek berdasarkan UUID.
       - Panggil `edit_telegram_message()` dengan teks `render_single_project_progress()` dan markup `render_project_detail_keyboard()`.
    4. Jika `data.startswith("retry:")`:
       - Trigger `job_service.enqueue_retry_failed()` / `start_job()`.
       - Berikan toast respon: "Memulai retry translasi...".
       - Edit pesan dengan data status terbaru.
    5. Jika `data == "cmd:projects"`:
       - Edit pesan kembali menjadi list buku beserta `render_projects_keyboard()`.
    6. Jika `data == "cmd:all_progress"`:
       - Edit pesan menjadi `render_all_projects_progress()` beserta tombol kembali.
- Pada command `/projects` biasa:
  - Kirim pesan teks pengantar beserta `reply_markup=render_projects_keyboard(projects_data)`.

---

## Verification Plan

### Automated Tests

Jalankan pengujian unit test telegram bot:

```bash
cd backend
PYTHONPATH=. ../.venv/bin/pytest tests/unit/test_telegram_bot.py -v
```

Pengujian baru yang akan ditambahkan ke `tests/unit/test_telegram_bot.py`:

1. **`test_set_telegram_commands`**: Verifikasi payload JSON yang dikirimkan ke `/setMyCommands`.
2. **`test_render_projects_keyboard`**: Verifikasi format tombol inline keyboard untuk daftar proyek.
3. **`test_render_project_detail_keyboard`**: Verifikasi tombol Refresh, Retry, dan Kembali.
4. **`test_handle_callback_query_project_detail`**: Simulasikan `callback_query` dengan data `proj:<id>`, verifikasi pemanggilan `answer_callback_query` dan `edit_message_text` dengan tampilan detail.
5. **`test_handle_callback_query_back_to_projects`**: Simulasikan `callback_query` dengan data `cmd:projects`, verifikasi pemanggilan `edit_message_text` kembali ke daftar tombol.
6. **`test_handle_callback_query_retry`**: Simulasikan `callback_query` dengan data `retry:<id>`, verifikasi aksi retry dieksekusi dan pesan diperbarui.

### Manual Verification

1. Verifikasi menu list command muncul di Telegram client saat bot aktif.
2. Ketik `/projects`, pastikan setiap buku muncul sebagai tombol inline.
3. Klik tombol buku, pastikan pesan langsung berubah menjadi detail buku tanpa membuat pesan baru.
4. Klik tombol "⬅️ Kembali ke Daftar Proyek", pastikan pesan kembali ke daftar tombol buku.
