---
name: design-style
description: Tailwind + typography, icon, decoration, and responsive conventions for this project's "milestone" pages (love + fashion aesthetic).
---

# Phong cách thiết kế cho các trang "cột mốc"

Mỗi trang trong dự án này (`/`, `/congrats-aug-2026`, và các trang tương lai) là một
**cột mốc kỷ niệm độc lập** — một trang lưu giữ một khoảnh khắc, không phải
một phần của một website nhiều trang liên kết với nhau. Vì vậy:

- **Không thêm nút "về trang chính" / breadcrumb / nav.** Mỗi trang đứng một
  mình, người xem đến từ một link riêng cho cột mốc đó.
- Trang dùng state/animation (client component) thì tách `layout.tsx` riêng
  trong thư mục trang đó chỉ để export `metadata` (page.tsx là `"use client"`
  nên không tự export metadata được) — xem `src/app/congrats-aug-2026/layout.tsx`.

Ví dụ tham chiếu chuẩn cho mọi quy tắc dưới đây: `src/app/congrats-aug-2026/page.tsx` +
`src/app/globals.css`.

## Tailwind là cách viết style mặc định (2026-08-02)

Dự án dùng Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` trong
`globals.css`, không có `tailwind.config.js`). Quy tắc chia việc:

- **Phần tĩnh** (layout, spacing, flex/grid, kích thước, font, màu chữ đơn
  giản, border/radius đơn giản, opacity, hover/focus state đơn giản) →
  **viết class Tailwind thẳng trong JSX** (kể cả arbitrary value dạng
  `text-[clamp(1rem,4vw,1.5rem)]`, `bg-[#a3234f]`). **Không tạo file
  `*.module.css` mới cho từng trang** — đây là thay đổi so với quy ước cũ,
  giờ mọi style sống chung trong `globals.css` + class Tailwind trong JSX.
- **Phần phức tạp** (gradient nhiều lớp, `clip-path`, `backdrop-filter`,
  box-shadow nhiều lớp, `::before`/`::after`, và mọi `@keyframes`) → viết
  thành **class dùng chung trong `globals.css`**, đặt trong `@layer
components`, đặt tên có tiền tố theo trang để tránh đụng nhau:
  - `home-*` cho `/`, `congrats-*` cho `/congrats-aug-2026`, trang mới thì thêm tiền tố mới.
  - `particle-*` (không tiền tố trang) cho hiệu ứng hạt dùng chung nhiều
    trang — xem phần "Icon & trang trí" bên dưới.
- **Animation** đăng ký qua `@theme` bằng token `--animate-<ten>: <keyframe>
<timing>;` để sinh ra class Tailwind `animate-<ten>` dùng được trực tiếp
  trong JSX; bản thân `@keyframes` vẫn viết thường trong `globals.css`. Ví
  dụ có sẵn: `animate-heart-beat`, `animate-card-reveal`, `animate-foil-sweep`...
  Xem đầu `globals.css`.
- Animation có **timing khác nhau theo từng instance** (hạt rơi ngẫu nhiên
  duration/delay, burst bay theo góc ngẫu nhiên...) thì KHÔNG đăng ký qua
  `--animate-*` (giá trị cố định) — giữ dạng class thường (`.particle-petal`
  v.v.) tham chiếu `var(--duration)`/`var(--delay)` v.v., các biến này được
  component truyền vào qua `style={{ "--duration": ... } as React.CSSProperties}`.

## Font tokens — dùng qua class Tailwind, không viết `font-family` tay

Bốn font khai báo ở `src/app/layout.tsx` (3 Google Font qua `next/font/google`,
1 local font qua `next/font/local`), rồi map thành token Tailwind trong
`@theme inline` ở `globals.css`:

| Class Tailwind | Font thật                                                     | Vai trò                                                                                                                                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font-hand`    | Brother Signature (local, `src/assets/Brother Signature.otf`) | **Chỉ** dùng cho tên riêng nổi bật (tên người) và chữ ký cuối thư. Đây là điểm nhấn thị giác — kích thước phải LỚN hơn hẳn văn bản xung quanh (tối thiểu gấp 2 lần cỡ chữ thân bài), không dùng cho nhãn nhỏ/uppercase/eyebrow text vì chữ viết tay khó đọc ở cỡ nhỏ.                                                               |
| `font-script`  | Dancing Script (Google Font)                                  | Tiêu đề lớn, câu văn phong thư/lời nhắn tình cảm (heading, lời chúc, mở đầu "Yêu em,"...). Chữ "trang trọng nhẹ nhàng", không phải chữ ký cá nhân. Cũng dùng cho các dòng ngắn kiểu "Congratulations" — nhẹ nhàng hơn `font-hand`, dễ đọc ở cỡ vừa.                                                                                 |
| `font-serif`   | Cormorant Garamond (Google Font, có italic)                   | Thân thư kiểu "luxury stationery": đoạn văn dài dùng _italic thường_, nhãn nhấn mạnh dùng **caps + letter-spacing rộng** (không dùng weight/size lớn). Xem `src/app/congrats-aug-2026/page.tsx` — đoạn thư dùng `font-serif italic`, dòng nhấn "EM ĐÃ LÀM ĐƯỢC RỒI..." dùng `font-serif uppercase tracking-[0.14em] font-semibold`. |
| `font-sans`    | Quicksand (Google Font)                                       | Văn bản đọc bình thường: đoạn văn thường, danh sách, label, nút bấm, ngày tháng, caption nhỏ. Mặc định của toàn trang (`body` đã set sẵn).                                                                                                                                                                                          |

Quy tắc chọn font cho các khối "trang trọng/quốc tế" (certificate, thiệp từ
tổ chức...): **tên người và chữ ký cá nhân → `font-hand`; câu mở đầu/tiêu đề
cảm xúc ngắn → `font-script`; thân thư dài + nhãn nhấn mạnh kiểu khắc chữ →
`font-serif`** (italic cho văn xuôi, caps+tracking cho nhãn) — không dùng
`font-sans` cho phần "thư" nữa vì serif mới tạo đúng cảm giác thiệp giấy cao
cấp; `font-sans` chỉ còn dùng cho UI phụ (nút bấm, caption cực nhỏ).

Ví dụ áp dụng đúng (từ `src/app/congrats-aug-2026/page.tsx`):

```tsx
<p className="font-script text-[clamp(1.05rem,4.5vw,1.3rem)] text-[#8a2e40]">
  Congratulations
</p>
<h2 className="congrats-card-title font-hand text-[clamp(2.3rem,11vw,3rem)] leading-none">
  Bảo Trân
</h2>
<p className="font-serif text-[0.78rem] font-semibold tracking-[0.14em] uppercase">
  Em đã làm được rồi, và làm rất đẹp
</p>
<p className="font-serif text-[1.05rem] leading-[1.7] italic">
  Từ những bước catwalk đầu tiên đến lúc cúi chào khán giả...
</p>
```

## Icon & trang trí

- **Emoji** cho các điểm nhấn ấm áp, thân mật, rải trong văn bản (💌🌸👗💐🎀✨💕🌿).
  Emoji là ngôn ngữ "nói chuyện", dùng tự do trong câu chữ.
- **SVG tự vẽ nhỏ gọn** cho motif trang trí lặp lại nhiều lần (hoa, trái tim)
  — xem `Flower()` trong `congrats-aug-2026/page.tsx`: SVG đơn giản (vài `<ellipse>`
  xoay quanh tâm), nhận `color`/`size` làm prop để tái dùng cho nhiều mục đích
  (hoa rơi nền, hoa trang trí tĩnh, hoa văng ra lúc mở thiệp).
- **Particle nền (ambient)**: hoa rơi, tim rơi, lấp lánh chạy liên tục — dùng
  class dùng chung trong `globals.css`: `particle-heart`, `particle-petal`,
  `particle-spark` (kèm biến thể màu `particle-spark--white` /
  `particle-spark--gold`), `particle-burst`. KHÔNG được generate vị trí
  `Math.random()` trực tiếp trong render — phải generate trong `useEffect`
  (chạy client-only) rồi `setState`, để tránh hydration mismatch giữa server
  và client. Xem `generatePetals`/`generateSparkles` + `useEffect` đầu file.
- **Particle một lần (burst)**: hiệu ứng bung ra đúng khoảnh khắc tương tác
  (vd. lúc mở thiệp) — generate trong event handler (`onClick`), không phải
  `useEffect`, và chỉ render khi đang ở đúng state để tự dọn dẹp khi unmount.
  Xem `generateBurst` trong `congrats-aug-2026/page.tsx`.

## Bảng "điểm nhấn" (wow-factor) đã dùng — tái sử dụng khi cần

Mỗi trang không bắt buộc dùng hết, nhưng đây là bộ kỹ thuật đã kiểm chứng để
tạo cảm giác "sang, ấn tượng" mà không cần thêm asset mới:

1. **Tên to bằng `font-hand`** làm tâm điểm thị giác.
2. **Wax seal (con dấu sáp)** — `<div>` tròn `radial-gradient` màu đậm (đỏ
   mận/vàng đồng...) + `box-shadow` inset nhiều lớp để tạo cảm giác nổi khối
   như sáp thật, có chữ lồng/monogram bằng `font-hand` ở giữa. Dùng lại được
   ở nhiều nơi: trên nắp phong bì lúc đóng, và trên chính lá thư lúc mở ra.
   Xem component `WaxSeal()` + class `congrats-wax-seal` trong
   `congrats-aug-2026/page.tsx`/`globals.css`.
3. **Book-cover flip (lật bìa như sách)** — cách "mở thiệp" mặc định hiện
   tại, thay cho kiểu phong bì 4 lớp phức tạp trước đây. Chỉ cần **2 lớp**:
   một `.congrats-book-page` (nội dung, luôn nằm sẵn trong DOM, không cần
   animate rise/reveal riêng) và một `.congrats-book-cover` phủ `absolute
inset-0` lên trên, `transform-origin: left center`, `transform-style:
preserve-3d`, `transition: transform`. Bên trong cover có 2 mặt
   (`-face` mặt trước, `-back` mặt sau) mỗi mặt `backface-visibility:
hidden`, mặt sau xoay tĩnh sẵn `rotateY(180deg)` — khi cover xoay từ
   `rotateY(0)` sang `rotateY(-155deg)`, mặt trước biến mất và mặt sau hiện
   ra đúng lúc, giống hệt lật bìa sách thật. Đơn giản hơn NHIỀU so với kiểu
   phong bì (không cần state machine 3 trạng thái, không cần tính toán
   translateY để "thư trồi ra khỏi phong bì") — xem `congrats-aug-2026/page.tsx`.
   State chỉ cần 1 boolean (`isOpen`), có thể đóng lại (lật ngược) bằng
   link nhỏ trong nội dung — không cần nút "xem lại" tách biệt.
4. **Wax seal (con dấu sáp)** — `<div>`/ảnh tròn (hiện dùng ảnh emblem có
   sẵn qua `next/image`, xem `WaxSeal()`) đặt giữa bìa đóng và/hoặc cuối lá
   thư, có `filter: drop-shadow` cho cảm giác nổi khối.
5. **Foil shimmer** — dải sáng lướt qua tiêu đề một lần khi trang/thiệp mở ra,
   bằng `background-clip: text` + animation `background-position` (class
   `congrats-card-title`, dùng `--animate-foil-sweep`).
6. **Burst hạt nhỏ** bung ra đúng lúc tương tác (vd. lúc mở bìa) — xem
   particle một lần ở trên; dùng hạt nhỏ/trung tính (chấm tròn màu, không
   nhất thiết phải là hoa) để giữ cảm giác tinh tế thay vì confetti rực rỡ.
7. **Paper grain + grounded shadow + nghiêng nhẹ** — bộ ba làm một hình khối
   phẳng (card/bìa) trông như vật thể thật thay vì clipart: texture giấy
   tinh tế (class `paper-grain`, SVG `feTurbulence` noise, blend multiply
   opacity ~0.05), bóng đổ mờ rộng bên dưới thay vì box-shadow sát viền
   (class kiểu `*-ground-shadow`, `radial-gradient` + `blur()`), và
   `rotate(-1..-3deg)` tĩnh để không bị đối xứng cứng nhắc. Với các cạnh
   gấp/crease (như bìa gập), dùng `filter: drop-shadow()` thay vì
   `box-shadow` — drop-shadow bám theo đúng hình dạng thật (kể cả
   `clip-path`), còn box-shadow luôn là hình chữ nhật.
   ⚠️ Lưu ý kỹ thuật chung khi định vị phần tử `absolute` lệch góc: đặt nó
   làm **con trực tiếp của container `position: relative` duy nhất** —
   không lồng qua một wrapper trung gian có class transform tĩnh (vd.
   `translate-y-[...]`), vì BẤT KỲ `transform` nào (kể cả giá trị identity
   như `translateY(0)`) cũng tạo ra containing block mới cho phần tử
   `absolute`, khiến nó định vị sai chỗ (đã xảy ra thật, xem lịch sử
   `congrats-aug-2026`).

Khi thiết kế nội dung mang tính trang trọng/công nhận (giải thưởng, chứng
nhận, lời cảm ơn từ một tổ chức...), ưu tiên kết hợp kỹ thuật #1+#3+#4 — một
tấm thiệp có bìa lật + con dấu sáp luôn thuyết phục hơn nhiều so với chỉ
phóng to một cái tên.

## Màu sắc

**Không có bộ màu bắt buộc dùng chung cho mọi trang** — mỗi trang được tự do
chọn tông màu theo cảm xúc riêng của cột mốc đó (quyết định của người dùng,
2026-08-02). Dùng arbitrary value Tailwind (`text-[#7a1628]`, `bg-[#f3e3c8]`)
thay vì đăng ký thành `@theme` color token dùng chung. Hai bộ màu đã dùng chỉ
là **ví dụ tham khảo**, không phải chuẩn bắt buộc:

- _Fashion-week vàng đồng_ (bản đầu của `/congrats-aug-2026`): `#f0c987`
  `#d4af7a` `#b5793a` (vàng đồng) · `#a3234f` `#ff2d6b` `#ff6b9d` (đỏ mận/hồng)
  · `#fffaf3` `#fdf0e2` (kem giấy).
- _Luxury stationery đỏ mận_ (bản hiện tại, dựa theo `public/references/*.JPG`):
  `#4a1120`–`#641a2a` (nền đỏ mận đậm) · `#faf3e6`–`#fffdf8` (giấy/phong bì
  kem ngà) · `#7a1628`/`#9c2438`/`#5c0f1f` (con dấu sáp) · `#3d1420` (mực đọc
  đậm, có sắc riêng thay vì nâu/xám phẳng) · `#c9a86a` (kẹp giấy vàng).

Tránh để toàn bộ text trong một khối nội dung dùng chung một màu — phối ít
nhất 2-3 sắc độ (nhãn/label một màu, tiêu đề đậm nổi bật một màu khác, phần
thân đọc dùng mực trung tính có sắc riêng) để tạo nhịp điệu thị giác thay vì
phẳng lì.

## Responsive — mobile-first bắt buộc, dùng breakpoint mặc định của Tailwind

Viết class Tailwind theo thứ tự: **không prefix = mobile** trước, rồi thêm
`sm:`/`lg:`/`xl:` cho các tầng lớn hơn. Không viết base cho desktop rồi thu
nhỏ bằng `max-width`.

Bộ breakpoint chuẩn dùng xuyên suốt dự án — trùng khớp breakpoint mặc định
của Tailwind nên **không cần khai báo breakpoint tùy chỉnh**:

| Tầng          | Tailwind prefix  | min-width                                                                                                          |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Mobile (base) | _(không prefix)_ | — Ưu tiên số 1, thiết kế cho ~360–430px trước tiên                                                                 |
| Tablet        | `sm:`            | `640px`                                                                                                            |
| Laptop nhỏ    | `lg:`            | `1024px`                                                                                                           |
| Desktop lớn   | `xl:`            | `1280px` — không phóng to vô hạn, cap `max-width`/kích thước bằng `xl:max-w-[...]` để nội dung không "trôi" quá to |

Ưu tiên `text-[clamp(...)]` cho font-size để tự fluid-scale trong một khoảng
hợp lý; chỉ thêm `sm:`/`lg:`/`xl:` khi cần đổi _layout_ (padding, kích thước
ảnh/khung, max-width) chứ không phải mọi giá trị số. Với style phức tạp cần
đổi theo breakpoint (filter, gradient nhiều lớp...) viết `@media` ngay trong
class `@layer components` tương ứng ở `globals.css` (xem `.home-heart-svg`
override ở `1024px` làm ví dụ) thay vì cố nhồi vào arbitrary value Tailwind.
