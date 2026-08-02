# Trước khi bắt tay vào việc

Quy tắc quy trình cho dự án này — áp dụng cho mọi task, không chỉ riêng code.

## 1. Hỏi rõ yêu cầu trước khi làm, đặc biệt với việc mang tính sáng tạo/mơ hồ

Trước khi bắt đầu một task có nhiều lựa chọn thiết kế, cảm xúc, hoặc nội dung
(ví dụ: thêm một trang mới, đổi phong cách, viết lời chúc/lời nhắn), hãy dừng
lại và hỏi người dùng khoảng **~10 câu hỏi làm rõ** trước khi code — càng rõ
yêu cầu, càng ít phải sửa đi sửa lại. Ưu tiên hỏi về:

- Hướng cảm xúc/thông điệp chính muốn truyền tải
- Các chi tiết cụ thể (tên riêng, ngày tháng, sự kiện) cần chính xác
- Phong cách hình ảnh mong muốn (nếu có nhiều hướng hợp lý)
- Có tài nguyên có sẵn (ảnh, font, nội dung) cần dùng không
- Có ràng buộc nào cần tuân thủ không (xem [[design-style]])

**Không cần hỏi** những gì đã rõ từ ngữ cảnh, đã có tiền lệ trong dự án, hoặc
là quyết định kỹ thuật thuần túy (không ảnh hưởng tới trải nghiệm/nội dung).
Dùng phán đoán: hỏi khi câu trả lời thực sự ảnh hưởng đến kết quả cuối, không
hỏi cho có.

**Why:** Đây là yêu cầu trực tiếp từ người dùng (2026-08-02) sau khi một trang
thiệp được làm gần đúng ý nhưng cần sửa lại nhiều lần vì thiếu số vòng hỏi
đáp ban đầu.

## 2. KHÔNG được xoá, cắt, ghép, hay chỉnh sửa file media gốc mà chưa xin phép

Nếu một task cần chỉnh sửa ảnh/file trong `public/` hoặc `src/assets/` theo
kiểu: cắt (crop), ghép, đổi định dạng, hoặc **xoá file gốc** — phải hỏi và
được người dùng đồng ý trước khi thực hiện, kể cả khi file đó "có vẻ" không
còn cần thiết sau khi đã tạo ra bản dẫn xuất (derivative).

Được phép tự do, không cần hỏi:
- Tạo bản crop/resize mới và lưu thành **file mới** (không đụng vào file gốc)
- Đọc/xem ảnh để tham khảo

**Why:** Trong phiên làm trang `/congrats-aug-2026` (lúc đó còn gọi là `/thiep`), một ảnh poster gốc
(`global_fashion_week_allstars_aug2026.jpg`) đã bị xoá bằng `rm` sau khi cắt
ra ảnh chân dung cần dùng — file đó không có trong git, không có bản sao ở
Thùng rác hay snapshot hệ thống, nên không thể khôi phục. Đây là tài sản do
người dùng cung cấp, không phải file do agent tạo ra trong phiên làm việc,
nên lẽ ra phải hỏi trước khi xoá (đúng theo nguyên tắc chung: "chỉ tự ý dọn
dẹp file mình tạo ra trong phiên, không đụng vào file có sẵn mà không hỏi").

**How to apply:** Trước khi chạy bất kỳ lệnh xoá/ghi đè nào lên file trong
`public/` hoặc `src/assets/` không phải do chính agent tạo ra trong phiên
hiện tại, dừng lại và hỏi người dùng bằng AskUserQuestion hoặc xác nhận qua
tin nhắn thường.
