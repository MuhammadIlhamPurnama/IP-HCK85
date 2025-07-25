Berikut contoh **API Docs** untuk server Silver Frame
---

## **POST /register**

**Deskripsi:**  
Register user baru.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
- **201 Created**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "username": "yourname",
      "email": "your@email.com"
    }
  }
  ```

**Error:**
- **400 Bad Request**  
  Jika field kurang/invalid/duplikat email:
  ```json
  { "message": "Email must be unique" }
  ```
  Atau:
  ```json
  { "message": "Username is required" }
  ```
  Atau:
  ```json
  { "message": "Email is required" }
  ```
  Atau:
  ```json
  { "message": "Password is required" }
  ```
- **500 Internal Server Error**  
   ```json
  { "message": "Internal Server Error" }
  ```

---

## **POST /login**

**Deskripsi:**  
Login user dengan email dan password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- **200 OK**
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

**Error:**
- **400 Bad Request**  
  Jika email/password kosong:
  ```json
  { "message": "Email is required" }
  ```
  ```json
  { "message": "Password is required" }
  ```
- **401 Unauthorized**  
  Jika email/password salah:
  ```json
  { "message": "Invalid Email or Password" }
  ```
- **500 Internal Server Error**  
  ```json
  { "message": "Internal Server Error" }
  ```

---

## **POST /google-login**

**Deskripsi:**  
Login/register user dengan Google OAuth.

**Request Body:**
```json
{
  "googleToken": "string"
}
```

**Response:**
- **200 OK** atau **201 Created**
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

**Error:**
- **400 Bad Request**  
  Jika token tidak dikirim:
  ```json
  { "message": "Google Token is required" }
  ```
- **401 Unauthorized**  
  Jika token Google tidak valid:
  ```json
  { "message": "Invalid Token" }
  ```
- **500 Internal Server Error**  
  ```json
  { "message": "Internal Server Error" }
  ```

---

---

## **GET /movies**

**Deskripsi:**  
Ambil semua movies dengan fitur pagination, sorting, filter by genre, dan search.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Halaman (default: 1)
- `limit` (optional): Jumlah per halaman (default: 12)
- `sort` (optional): Sorting field, tambah `-` untuk DESC (contoh: `-popularity`)
- `genreId` (optional): Filter by genre ID, bisa multiple (contoh: `1,2,3`)
- `search` (optional): Search by title

**Response:**
- **200 OK**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Movie Title",
        "overview": "Movie description",
        "poster_path": "https://image.url",
        "popularity": 100,
        "release_date": "2025-01-01"
      }
    ],
    "totalItems": 50,
    "totalPages": 5,
    "currentPage": 1
  }
  ```

**Error:**
- **401 Unauthorized** -
```json
  { "message": "Invalid Token" }
  ```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```
---

## **GET /movies/popular**

**Deskripsi:**  
Ambil movies berdasarkan popularity (DESC) dengan pagination.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Halaman (default: 1)
- `limit` (optional): Jumlah per halaman (default: 12)

**Response:**
- **200 OK**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Popular Movie",
        "popularity": 500
      }
    ],
    "totalItems": 30,
    "totalPages": 3,
    "currentPage": 1
  }
  ```

**Error:**
- **401 Unauthorized** -
```json
  { "message": "Invalid Token" }
  ```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```
---

## **GET /movies/newest**

**Deskripsi:**  
Ambil movies berdasarkan release_date (DESC) dengan pagination.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Halaman (default: 1)
- `limit` (optional): Jumlah per halaman (default: 12)

**Response:**
- **200 OK**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Newest Movie",
        "release_date": "2025-07-24"
      }
    ],
    "totalItems": 25,
    "totalPages": 3,
    "currentPage": 1
  }
  ```

**Error:**
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
  ```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```

---

## **GET /movies/:id**

**Deskripsi:**  
Ambil detail movie berdasarkan ID, termasuk genres.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `id`: Movie ID

**Response:**
- **200 OK**
  ```json
  {
    "id": 1,
    "title": "Movie Title",
    "overview": "Movie description",
    "poster_path": "https://image.url",
    "backdrop_path": "https://backdrop.url",
    "release_date": "2025-01-01",
    "popularity": 100,
    "vote_average": 8.5,
    "vote_count": 1000,
    "Genres": [
      {
        "id": 1,
        "name": "Action"
      }
    ]
  }
  ```

**Error:**
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **404 Not Found** - 
```json
  { "message": "Movie not found" }
```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```
---

## **POST /movies/ai-assistant**

**Deskripsi:**  
Minta rekomendasi movies dari AI berdasarkan query.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "query": "action movie with superhero"
}
```

**Response:**
- **200 OK**
  ```json
  {
    "answer": "<html>AI recommendation response in HTML format</html>"
  }
  ```

**Error:**
- **400 Bad Request** - Query kosong:
  ```json
  { "message": "Query is required" }
  ```
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **500 Internal Server Error** - Error AI atau server
```json
  { "message": "Internal Server Error" }
```
---
Berikut **API Docs** untuk endpoint threads berdasarkan router, controller, dan middleware yang kamu berikan:

---

## **GET /threads**

**Deskripsi:**  
Ambil semua threads dengan pagination, diurutkan berdasarkan createdAt DESC.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Halaman (default: 1)
- `limit` (optional): Jumlah per halaman (default: 10)

**Response:**
- **200 OK**
  ```json
  {
    "data": [
      {
        "id": 1,
        "content": "Thread content",
        "UserId": 1,
        "createdAt": "2025-07-24T10:00:00.000Z",
        "updatedAt": "2025-07-24T10:00:00.000Z",
        "User": {
          "id": 1,
          "username": "user1",
          "email": "user1@email.com"
        }
      }
    ],
    "total": 25,
    "page": 1,
    "totalPages": 3,
    "userId": 1
  }
  ```

**Error:**
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```

---

## **POST /threads/add**

**Deskripsi:**  
Buat thread baru.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "content": "Thread content here"
}
```

**Response:**
- **201 Created**
  ```json
  {
    "id": 1,
    "content": "Thread content here",
    "UserId": 1,
    "createdAt": "2025-07-24T10:00:00.000Z",
    "updatedAt": "2025-07-24T10:00:00.000Z"
  }
  ```

**Error:**
- **400 Bad Request** - Validation error:
  ```json
  { "message": "Content is required" }
  ```
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```
---

## **PUT /threads/:id**

**Deskripsi:**  
Edit thread milik sendiri.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `id`: Thread ID

**Request Body:**
```json
{
  "content": "Updated thread content"
}
```

**Response:**
- **200 OK**
  ```json
  {
    "id": 1,
    "content": "Updated thread content",
    "UserId": 1,
    "createdAt": "2025-07-24T10:00:00.000Z",
    "updatedAt": "2025-07-24T10:30:00.000Z"
  }
  ```

**Error:**
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **403 Forbidden** - Bukan pemilik thread:
  ```json
  { "message": "You are not the owner" }
  ```
- **404 Not Found** - Thread tidak ditemukan:
  ```json
  { "message": "Thread not found" }
  ```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```

---

## **DELETE /threads/:id**

**Deskripsi:**  
Hapus thread milik sendiri.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `id`: Thread ID

**Response:**
- **200 OK**
  ```json
  {
    "message": "Thread deleted successfully"
  }
  ```

**Error:**
- **401 Unauthorized** - 
```json
  { "message": "Invalid Token" }
```
- **403 Forbidden** - Bukan pemilik thread:
  ```json
  { "message": "You are not the owner" }
  ```
- **404 Not Found** - Thread tidak ditemukan:
  ```json
  { "message": "Thread not found" }
  ```
- **500 Internal Server Error**
```json
  { "message": "Internal Server Error" }
```
---



