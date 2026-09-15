# Coding Standards & Guidelines (Admin CMS)

## 1. Line Limit Constraint (.tsx)

- **Scope**: Admin CMS (`admin-portfolio`).
- **Aturan**: File `.tsx` **TIDAK BOLEH melebihi 300 baris kode**.
- **Refactoring Strategy**:
  - Jika suatu komponen UI atau halaman mendekati atau melebihi batas 300 baris, pecah menjadi subkomponen yang lebih kecil di folder `components/` terdekat.
  - Ekstrak logic state, form handling, atau data fetching ke custom hooks tersendiri (`use*.ts`).
  - Ekstrak static options, konfigurasi data, skema validasi Zod, atau helper constants ke file utility/constants terpisah.

## 2. Format Base Code & Data Fetching (TanStack Query)

- **API Definition**: Definisikan endpoint API di folder `services/core/index.ts` menggunakan instance `Http` (`@/configs/http/http-method`).
- **Query & Mutation Hooks**:
  - Gunakan custom hooks berbasis `@tanstack/react-query` untuk semua interaksi data (lihat pola implementasi di `services/todoService.ts`).
  - **Fetching**: Gunakan `useQuery` (contoh: `useGet*`).
  - **Mutation**: Gunakan `useMutation` (contoh: `useCreate*`, `useUpdate*`, `useDelete*`).
  - **State & Notifikasi Mutation**:
    - Panggil `store().setLoading()` pada `onMutate` dan `store().clearLoading()` pada `onSettled`.
    - Tampilkan notifikasi toast menggunakan `showMsg` (`@/lib/utils`) pada `onSuccess` dan `onError`.
    - Lakukan `queryClient.invalidateQueries` pada query key terkait saat mutasi berhasil.

## 3. Penggunaan Base Komponen yang Disediakan

- **Komponen UI Dasar**: Selalu utamakan menggunakan komponen yang sudah ada di `components/ui/*` (seperti `Button`, `Input`, `Dialog`, `Form`, `Select`, `Table`, `DropdownMenu`, dsb.).
- **Komponen Shared**: Gunakan komponen bersama di `components/shared/*` (seperti `Pagination`, `Loading`, form picker di `components/shared/form/`, layout wrappers, dsb.).
- **Dilarang**: Menulis ulang elemen HTML primitif atau styling mentah secara terpisah jika base component yang sesuai sudah tersedia di `components/ui/` atau `components/shared/`.

## 4. Modularisasi & Komponen Reusable

- Jika suatu potongan antarmuka (UI) dapat digunakan kembali di lebih dari satu tempat:
  - **Lintas Halaman / Modul**: Buatkan file komponen tersendiri di dalam `components/shared/`.
  - **Khusus Satu Modul / Fitur**: Buatkan file komponen di subfolder `components/` lokal modul terkait (misal: `components/module/<fitur>/components/`).
- Jangan menduplikasi kode UI antar-halaman.
- Setiap komponen baru wajib tetap mematuhi batas maksimal 300 baris kode (`.tsx`).

## 5. Overlay & Modal Dialog (useDialog Pattern)

- **Pemanggilan Modal/Dialog**: Gunakan hook `useDialog` dari `@/lib/hooks`.
  - **Bound hook**: `const confirmDialog = useDialog("ov_confirmation"); confirmDialog.open({ ...props });`
  - **Universal hook**: `const { openDialog, closeDialog } = useDialog(); openDialog("ov_confirmation", { ...props });`
- **Menambah Dialog Baru**:
  - Buat komponen konten murni di `components/shared/overlay-wrapper/` (menerima props dinamis dan `onClose`).
  - Daftarkan kode dialog di `components/shared/overlay-wrapper/registry.ts`.
  - Jangan menambahkan `switch-case` di `OverlayWrapper/index.tsx`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
