# Flip

Flip là dự án ứng dụng di động hướng tới việc giúp người dùng chia sẻ khoảnh khắc có xác minh vị trí, khám phá, ghép đôi và trò chuyện. Dự án đang ở giai đoạn khởi tạo. 

## Công nghệ sử dụng

| Phần | Công nghệ |
| --- | --- | 
| Frontend | Expo SDK 58, React Native 0.88, React 19 | 
| Backend | Node.js, Next.js 16 | 
| Cơ sở dữ liệu | PostgreSQL 17 |
| Ngôn ngữ | TypeScript 6 (frontend), TypeScript 5 (backend) |

## Cấu trúc dự án

```text
flip/
├── compose.yaml             # PostgreSQL cho môi trường phát triển
├── backend/                 
│   └── src/
│       ├── app/api/health/  # Endpoint kiểm tra trạng thái
│       ├── features/        # Khung xử lý theo tính năng
│       └── lib/             # Khung cấu hình, cơ sở dữ liệu và lưu trữ
├── frontend/                # Ứng dụng Expo / React Native
│   ├── App.tsx              # Màn hình khởi động hiện tại
│   ├── assets/              # Biểu tượng và tài nguyên hình ảnh
│   └── src/
│       ├── components/      # Thành phần giao diện dùng chung
│       ├── features/        # Màn hình theo tính năng
│       ├── navigation/      # Điều hướng
│       └── services/        # Lớp giao tiếp với API
└── docs/                    # Thư mục dành cho tài liệu dự án
```

## Tải mã nguồn

Cài Git, Node.js và npm. Để dùng cùng phiên bản với môi trường đã kiểm tra, chọn Node.js 24.

Khi repository được đưa lên máy chủ Git, sao chép URL clone trên trang repository và thay `URL_REPOSITORY` trong lệnh sau.

```bash
git clone URL_REPOSITORY flip
cd flip
```

Repository trong workspace hiện chưa có remote. Nếu bạn đã có bản sao mã nguồn, hãy mở terminal tại thư mục `flip` và tiếp tục với các bước bên dưới.

## Hướng dẫn chạy trên local

### Khởi tạo PostgreSQL

#### 1. Tạo cơ sở dữ liệu bằng Docker Compose

Mở Docker Desktop. Nếu chưa có file `.env` ở thư mục gốc `flip`, sao chép `.env.example` thành `.env` rồi đặt `POSTGRES_PASSWORD` cho PostgreSQL local. Với database đã chạy trước đó, dùng mật khẩu hiện tại của tài khoản `flip`, vì PostgreSQL chỉ dùng biến này để khởi tạo tài khoản khi volume còn trống.

Từ thư mục gốc, chạy:

```bash
docker compose up -d --wait postgres
docker compose ps postgres
```

Ở lần khởi động đầu tiên, PostgreSQL tạo database `flip` và tài khoản `flip`. Khi container hiển thị trạng thái `healthy`, PostgreSQL sẵn sàng nhận kết nối tại `127.0.0.1:15432`. Docker lưu dữ liệu trong volume `postgres-data`.

#### 2. Cấu hình kết nối cho backend

Nếu chưa có `backend/.env.local`, chạy lệnh sau từ thư mục gốc trong PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env.local
```

Mở `backend/.env.local` và thay `YOUR_PASSWORD` trong `DATABASE_URL` bằng mật khẩu đã đặt trong file `.env` ở thư mục gốc. Nếu mật khẩu chứa ký tự đặc biệt, hãy mã hóa URL cho phần mật khẩu trong `DATABASE_URL`. Git bỏ qua cả `.env` ở thư mục gốc và `backend/.env.local`.

Nếu dùng PostgreSQL cài sẵn, hãy tạo database `flip` và đặt `DATABASE_URL` theo máy chủ, cổng và tài khoản của bạn.

#### 3. Kiểm tra kết nối

Chạy backend theo hướng dẫn bên dưới, rồi mở [endpoint kiểm tra PostgreSQL](http://localhost:3000/api/health/database). HTTP 200 với `{"status":"ok"}` xác nhận backend đã truy vấn được cơ sở dữ liệu. Nếu nhận HTTP 503, kiểm tra trạng thái container và giá trị `DATABASE_URL`, sau đó khởi động lại backend nếu vừa sửa file cấu hình.

Để tạm dừng PostgreSQL, chạy `docker compose stop postgres`. Dữ liệu vẫn nằm trong volume và được dùng lại khi khởi động lần sau.


### Backend

Từ thư mục gốc, mở một terminal và chạy:

```bash
cd backend
npm ci
npm run dev
```

Mở [endpoint kiểm tra trạng thái](http://localhost:3000/api/health) để kiểm tra máy chủ. Phản hồi dự kiến chứa `"status": "ok"`.

### Frontend

Từ thư mục gốc, mở một terminal khác và chạy:

```bash
cd frontend
npm ci
npm start
```

Quét mã QR hiện trong terminal bằng Expo Go trên điện thoại, hoặc nhấn `a` để mở trình giả lập Android đã cài đặt. Trên macOS có Xcode, nhấn `i` để mở trình mô phỏng iOS.
