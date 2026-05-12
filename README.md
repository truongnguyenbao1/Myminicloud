# MyMiniCloud - Hệ Sinh Thái Đám Mây Thu Nhỏ

![MyMiniCloud Banner](https://img.shields.io/badge/Architecture-Cloud--Native-blue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

MyMiniCloud là một dự án mô phỏng hệ sinh thái đám mây hoàn chỉnh, được thiết kế để chạy trên môi trường Docker Compose. Dự án tích hợp đầy đủ các thành phần từ Frontend, Backend, Database cho đến hệ thống Monitoring, Logging và Bảo mật.

---

## 🏗 Kiến Trúc Hệ Thống (Server Mapping)

Hệ thống được chia thành 9 phân vùng dịch vụ (c1 - c9) theo đúng tiêu chuẩn báo cáo:

| ID | Dịch Vụ | Thành Phần Kỹ Thuật | Mô Tả |
| :--- | :--- | :--- | :--- |
| **c1** | **Web Server** | Nginx / React | Giao diện người dùng (Frontend). |
| **c2** | **App Server** | Python / Flask (hoặc NestJS) | Trung tâm xử lý logic nghiệp vụ (Backend). |
| **c3** | **DB Server** | MariaDB / PostgreSQL | Lưu trữ dữ liệu quan hệ. |
| **c4** | **Auth Server** | Keycloak | Quản lý danh tính và định danh (OIDC). |
| **c5** | **Object Storage** | MinIO | Kho lưu trữ dữ liệu không cấu trúc (S3 compatible). |
| **c6** | **DNS Server** | BIND9 | Quản lý tên miền nội bộ (`myminicloud.local`). |
| **c7** | **Monitoring** | Prometheus | Thu thập chỉ số hiệu năng hệ thống. |
| **c8** | **Visualization** | Grafana | Trực quan hóa dữ liệu và Dashboard giám sát. |
| **c9** | **API Gateway** | Nginx Reverse Proxy | Cửa ngõ điều phối Request và bảo mật. |

---

## 🚀 Công Nghệ Sử Dụng

- **Frontend**: HTML5, CSS3, JavaScript (React).
- **Backend**: Python (Flask) / NestJS.
- **Bảo mật**: Keycloak (OAuth2, OpenID Connect).
- **Dữ liệu**: MariaDB, MinIO.
- **Hạ tầng**: Docker, Docker Compose.
- **Giám sát**: Prometheus, Grafana, Node Exporter.
- **Mạng**: BIND9 DNS.

---

## 🛠 Hướng Dẫn Cài Đặt

### 📋 Yêu Cầu Hệ Thống
- Docker & Docker Compose đã được cài đặt.
- Hệ điều hành: Linux (Ubuntu/CentOS), Windows (WSL2), hoặc macOS.

### ⚙️ Các bước triển khai

1. **Clone dự án:**
   ```bash
   git clone https://github.com/truongnguyenbao1/Myminicloud.git
   cd Myminicloud
   ```

2. **Cấu hình DNS (Tùy chọn):**
   Nếu muốn truy cập qua tên miền nội bộ, hãy trỏ DNS của máy bạn về IP của container `c6-sa-dns`.

3. **Khởi chạy hệ thống:**
   ```bash
   docker compose up -d
   ```

4. **Kiểm tra trạng thái:**
   ```bash
   docker compose ps
   ```

---

## 🌐 Danh Sách Truy Cập

- **Frontend**: `http://localhost:8080` (hoặc qua Gateway cổng 80).
- **API Gateway**: `http://localhost:80`
- **Keycloak Console**: `http://localhost:8081`
- **MinIO Console**: `http://localhost:9001`
- **Grafana Dashboard**: `http://localhost:3000`
- **Prometheus**: `http://localhost:9090`
