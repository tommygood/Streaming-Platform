## 介紹

- GET `/api/login/sso`

  - 串接 NCU OAuth，並將 OAuth 回傳的 identifier 用 jwt sign 後放到 user cookie

- GET `/api/user`

  - 拿到所有 User 的資料

- GET `/api/user/self`

  - 驗證 cookie，並回傳使用者的資料

  ```
  >>> r = requests.get('http://localhost:3000/api/user/self', cookies=cookies)
  ```

- GET `/api/video`

  - 拿到 sql 中所有影片資訊

- GET `/api/video/:vid`

  - 拿到特定影片 sql 資訊

- POST `/api/video/upload`
  - 將影片丟到 S3 上
