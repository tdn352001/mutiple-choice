# Docs Frontend

# 1. Cập nhật logo

1. Truy cập vào đường dẫn sau từ root project
    
    ```bash
    src/assets/svgs
    ```
    

1. Thay thế file **logo.svg** thành file logo mong muốn
    
    > Note: Vui lòng giữ nguyên tên file để tránh xảy ra lỗi
    > 

# 2. Build Docker Image

1. Cập nhật Backend Base URL trong file .env

    
    ```xml
    NEXT_PUBLIC_BASE_URL=https://duane1804.info.vn/api
    ```
    
    > *Note: Nếu file .env không tồn tại thì tạo mới và dán dòng code ở phía trên vào.*
    > 
    
2. Truy cập terminal vào root project
3. Thực hiện build image docker
    
    ```bash
    docker build -t mutiple-choice .
    ```
    

1. Chạy container
    
    ```bash
    docker run -p 1234:3000 mutiple-choice
    ```
    
    Sau khi chạy container hoàn tất, có thể truy vào frontend theo 1 số cách dưới đây:
    
    Option 1:
    
    ```bash
    http://localhost:1234
    ```
    
    Option 2:
    
    ```bash
    http://your_ip:1234
    ```
    
    Với Option 2, các thiết bị truy cập cùng 1 mạng lan có thể cùng truy cập được tới frontend.
    
    > Note: có thể thay thế port “1234” thành bất kỳ port nào bạn mong muốn. Trong trường hợp port 1234 đã có người sử dụng thì bắt buộc phải sử dụng một port khác thay thế.
    > 

Có thể thu gọn các bước trên với phần 3 Docker compose.

# 3. Docker compose

Với docker compose, app sẽ được tự động khởi động lại khi Docker trên máy người cài đặt được khởi động lại.

1. Thực hiện như bước 1 phần 2.
2. Thực hiện chạy lệch:
    
    ```bash
    docker compose up -d --build
    ```
    
    Sau khi lệnh hoàn tất, cách truy cập frontend tương tự như phần 2.
    
3. Lưu ý.
- Port: Nếu muốn thay đổi port hoặc port mặc định đã bị chiếm dụng, thay đổi port bằng cách chỉnh sửa file **docker-compose.yml** ở **root project**
    
    ```bash
    version: "3.8"
    
    services:
      frontend:
        build:
          context: .
        image: registry.gitlab.com/aioz-dapps/aioz-drive
        container_name: drive-app
        ports:
          - '1234:3000'
    
    ```
    
    Thay thế port 1234 thành 1 port khác.
    
- Nếu chạy compose nhiều lần, chúng ta nên giải phóng bộ nhớ bằng cách xóa các image với tag là none.

# 4. Lưu ý

Nếu có bất kỳ sự thay đổi nào liên quan tới code, hình ảnh (logo, …), … thì frontend bắt buộc phải được build lại để được cập nhật