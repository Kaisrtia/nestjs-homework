# Task Sharing Nestjs

## Tổng quan

- Mục tiêu: Xây dựng module tasks hỗ trợ quản lý danh sách công việc cá nhân.

## Mô hình dữ liệu

- `id`: Chuỗi UUID (hoặc number auto-increment).
- `title`: string, bắt buộc, độ dài 1 - 255 ký tự.
- `category`: string, (Chủ đề của việc đó)
- `description`: string, tùy chọn.
- `isCompleted`: boolean, mặc định false.
- `createdAt`: Date, timestamp tạo bản ghi.
- `updatedAt`: Date, timestamp cập nhật bản ghi.

## Danh sách Endpoint

| Method | Endpoint            | Mô tả                        |
| :----- | :------------------ | :--------------------------- |
| POST   | `/api/v1/tasks`     | Tạo mới một công việc        |
| GET    | `/api/v1/tasks`     | Lấy danh sách công việc      |
| GET    | `/api/v1/tasks/:id` | Lấy chi tiết một công việc   |
| PATCH  | `/api/v1/tasks/:id` | Cập nhật thông tin công việc |
| DELETE | `/api/v1/tasks/:id` | Xóa một công việc            |

### 3.1. Tạo mới công việc (Create task)

- Endpoint: POST `/api/v1/tasks`

**Request**

```json
{
  "title": "Học NestJS cơ bản",
  "category": "Backend",
  "description": "Tìm hiểu về DTO, Controller, Service và Module"
}
```

**Response**
Status: `201 Created`

```json
{
  "id": "a3b2c1d0-1234-4567-89ab-cdef01234567",
  "title": "Học NestJS cơ bản",
  "category": "Backend",
  "description": "Tìm hiểu về DTO, Controller, Service và Module",
  "isCompleted": false,
  "createdAt": "2026-10-27T08:30:00.000Z",
  "updatedAt": "2026-10-27T08:30:00.000Z"
}
```

### 3.2. Lấy danh sách công việc (Get tasks)

- Endpoint: GET `/api/v1/tasks`
- Query Params (Tùy chọn):
  - `isCompleted: boolean` (Lọc các task hoàn thành hoặc chưa)
  - `category: string` (Lọc các nội dung côgn việc)

**Response**

- Status: `200 OK`
- Body:

```json
[
  {
    "id": "a3b2c1d0-1234-4567-89ab-cdef01234567",
    "title": "Học NestJS cơ bản",
    "category": "Backend",
    "description": "Tìm hiểu về DTO, Controller, Service và Module",
    "isCompleted": false,
    "createdAt": "2026-10-27T08:30:00.000Z",
    "updatedAt": "2026-10-27T08:30:00.000Z"
  }
]
```

### 3.3. Xem chi tiết công việc (Get Task by ID)

- Endpoint: GET `/api/v1/tasks/:id`
- Params: id (UUID hoặc int tùy cấu hình)
- Response:
  - Status: `200 OK`
  - Body: Trả về object `Task` tương ứng.

### 3.4. Cập nhật công việc (Update Tasks)

- Endpoint: `PATCH /api/v1/tasks/:id`

**Request** Body (Tất cả fields đều là optional):

```json
{
  "title": "Học NestJS nâng cao",
  "isCompleted": true
}
```

**Response**

- Status: `200 ok`

```json
{
  "id": "a3b2c1d0-1234-4567-89ab-cdef01234567",
  "title": "Học NestJS nâng cao",
  "description": "Tìm hiểu về DTO, Controller, Service và Module",
  "isCompleted": true,
  "createdAt": "2026-10-27T08:30:00.000Z",
  "updatedAt": "2026-10-27T08:35:00.000Z"
}
```

### 3.5. Xóa công việc (Delete Tasks)

- Endpoint: DELETE `/api/v1/tasks/:id`
  **Response**
- Status: `200 OK` hoặc `204 No Content`
- Body (nếu trả 200 OK)

### 4. Xử lý Exception & Mã lỗi

| Trường hợp                                                      | HTTP Status                 | Mã lỗi / Exception trả về                            |
| :-------------------------------------------------------------- | :-------------------------- | :--------------------------------------------------- |
| Validation thất bại (thiếu title, title rỗng, sai kiểu dữ liệu) | `/400 Bad Request`          | `BadRequestException` từ `ValidationPipe` của NestJS |
| Không tìm thấy bản ghi khi GET, PATCH, DELETE theo :id          | `404 Not Found`             | `NotFoundException('Tasks with ID ${id} not found')` |
| Lỗi hệ thống / DB connection                                    | `500 Internal Server Error` | NestJS `default HttpExceptionFilter`                 |
