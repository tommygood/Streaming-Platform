## 介紹

- GET `/api/login/sso`

  - 串接 NCU OAuth，並將 OAuth 回傳的 identifier 用 jwt sign 後放到 user cookie

  ```
  直接寫location.href="http://localhost:3000/api/login/sso"
  ```

- GET `/api/user`

  - 拿到所有 User 的資料

  ```
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  ```

- GET `/api/user/self`

  - 驗證 cookie，並回傳使用者的資料

  ```
  fetch('/api/user/self')
  .then(response => response.json())
  .then(data => {
  console.log(data);
  })
  ```

- PUT `/api/user/update`

  - 修改 user 本身的資料

- GET `/api/video/list`

  - 拿到 sql 中所有影片資訊

  ```
  fetch('/api/video/list')
  .then(response => response.json())
  .then(data => {
  console.log(data);
  })
  ```

- GET `/api/video/:vid`

  - 拿到特定影片 sql 資訊

  ```
  const vid = 5 //假設要拿vid為5的影片資訊
  fetch(`/api/video/${vid}`)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
  })
  ```

- GET `/api/video/list/:uid`

  - 拿到特定使用者所發布的影片資訊

  ```
  const uid = 113423004 //假設要拿uid為113423004的影片資料
  fetch(`/api/video/list/${uid}`)
  .then(response => response.json())
  .then(data=>{
    console.log(data);
  })
  ```

- POST `/api/video/upload`

  - 將影片丟到 S3 上(還沒好)

- POST `/api/video`

  - 影片資訊丟上 sql

  ```
  const videoData = {
  videoTitle: "這是影片標題",
  videoDescription: "這是影片描述",
  };

  fetch('/api/video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(videoData)
  })
  .then(response => response.json();
  )
  .then(data => {
    console.log('Video added successfully:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  ```

  - PUT `/api/video/:vid`

    - 更改特定影片的資訊

    ```
    fetch(`/api/video/${vid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(videoData)
    })
    .then(response => response.json() )
    .then(data => {
      console.log(data);
    })
    ```

  - GET `/api/post`

    - 拿到所有 post 的資訊

  - POST `/api/post`

    - 發布 post

  - PUT `/api/post/:postid`

    - 修改 post

  - Delete `api/post/:postid`

    - 刪除特定 post

  - POST `/api/comment`

    - 發佈到特定影片/貼文留言
    - 自己寫要用 vid 還 postid

  - PUT `/api/comment/:cid`

    - 更改特定留言內容

  - GET `/api/comment/video/:vid`

    - 拿到特定影片留言

  - GET `/api/comment/post/:postid`

    - 拿到特定貼文留言

  - Delete `/api/comment/:cid`

    - 刪除特定留言
