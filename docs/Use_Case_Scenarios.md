# 5. Đặc tả Scenario, nghiệp vụ

## 5.1. Quy tắc nghiệp vụ

### A. Địa điểm, check-in và Moment

1. Mở app, Flip lấy vị trí khi có quyền để xác định địa điểm; không theo dõi GPS liên tục và không tự tạo check-in.
2. Geofence được cấu hình riêng cho từng địa điểm. Phạm vi 150 m chỉ dùng gợi ý địa điểm, không thay thế geofence. Nếu nhiều geofence chồng lấn, người dùng chọn địa điểm và hệ thống xác minh địa điểm đó khi đăng.
3. Chọn địa điểm chưa tạo check-in. Chỉ khi upload và đăng Moment thành công mới ghi nhận check-in tại địa điểm đã xác minh.
4. Mỗi Moment có hạn riêng: 2 giờ từ thời điểm hệ thống xác nhận đăng thành công. Đăng thêm không thay thế, gia hạn hoặc xóa Moment cũ.
5. Một tài khoản có một địa điểm check-in hiện tại. Check-in tại địa điểm đó hợp lệ khi chưa bị hủy và còn ít nhất một Moment hợp lệ. Không có thời điểm hết hạn chung cho tất cả ảnh.
6. Cùng địa điểm: đăng thêm vào check-in hiện tại; giữ mốc bắt đầu từ lần đăng đầu và các tương tác đã ghi nhận. Từng Moment vẫn dùng thời hạn riêng. Nếu đã không còn Moment hợp lệ, lần đăng thành công tiếp theo bắt đầu check-in mới.
7. Khác địa điểm: chỉ gợi ý/chọn địa điểm mới khi phát hiện ở ngoài geofence. Trước khi chuyển, cảnh báo kết thúc check-in và gỡ Moment ở địa điểm cũ. Chỉ thực hiện chuyển khi đăng tại địa điểm mới thành công; thất bại hoặc hủy thì không tự kết thúc check-in cũ.
8. Hủy check-in chủ động: gỡ toàn bộ Moment còn hiển thị của check-in đó. Xóa hoặc hết hạn một Moment riêng lẻ không ảnh hưởng Moment khác.
9. Ra ngoài geofence không tự xóa ảnh hoặc kết thúc check-in. Việc định vị chỉ hỗ trợ chọn địa điểm; không chứng minh người đăng vẫn đang hiện diện trong suốt thời hạn Moment.

### B. Discovery và tương tác

1. Để Discovery tại địa điểm, người dùng phải có check-in hợp lệ tại đó và không bị hạn chế. Không cho Discovery tại địa điểm mới chỉ bằng cách chọn trên bản đồ.
2. Chỉ hiển thị Moment còn hạn của người khác tại cùng địa điểm; loại nội dung đã xóa/ẩn, đã xử lý và tài khoản có quan hệ Block. Trước khi tương tác, kiểm tra lại quyền truy cập.
3. Nhiều Moment của một người có thể cùng xuất hiện. Pass áp dụng cho từng Moment; Moment khác của cùng người vẫn có thể xuất hiện.
4. Like hướng tới tài khoản tại địa điểm trong cặp check-in hiện tại của hai bên; Moment là nội dung khởi phát Like.
5. Like đang chờ tồn tại khi cả hai check-in liên quan còn hợp lệ. Một ảnh hết hạn không làm mất Like nếu tài khoản vẫn còn Moment hợp lệ khác trong cùng check-in. Check-in kết thúc thì Like chưa thành Match liên quan hết hiệu lực.
6. Match hình thành khi có hai Like đối ứng hợp lệ. Mỗi cặp tài khoản chỉ có một kết nối đang hoạt động. Match và Chat đã tạo không phụ thuộc thời hạn Moment/check-in; chỉ kết thúc bởi Unmatch hoặc Block.
7. Thông báo không vượt qua quyền truy cập. Không mở lại Moment đã Pass/Report. Với thông báo Like, có thể mở một Moment khác còn khả dụng của người gửi trong đúng check-in liên quan; nếu không có thì báo không khả dụng.
8. Report thành công loại Moment khỏi deck của người báo cáo. Một Report chưa đủ ngưỡng không ẩn ảnh với người khác.

### C. An toàn và dữ liệu

1. Hai người khác nhau có check-in hợp lệ tại cùng địa điểm, mỗi người Report một lần, làm Moment bị ẩn. Mỗi Moment bị ẩn do đủ ngưỡng chỉ tính một vi phạm.
2. Đủ ba Moment bị ẩn do Report: kết thúc check-in hiện tại, gỡ Moment đang hiển thị và vô hiệu Like đang chờ; không được check-in, đăng Moment hoặc Discovery đến hết pilot. Match/Chat hiện có không tự bị khóa bởi ngưỡng này. Report trong Chat không tự cộng vào số Moment vi phạm.
3. Block áp dụng giữa hai tài khoản: đóng kết nối, ngăn xem hồ sơ qua kết nối cũ, Discovery, Like, Match và Chat giữa hai bên; có hiệu lực qua các check-in mới. Luồng bỏ Block chưa thuộc MVP.
4. Unmatch đóng kết nối và quyền Chat/xem hồ sơ qua kết nối đó; không cho tạo lại kết nối trong cùng cặp check-in. Hai bên có thể được khám phá lại khi cả hai đã có check-in mới, nếu không Block.
5. Chỉ báo thành công sau khi hệ thống xác nhận. Gửi lại cùng một yêu cầu không tạo dữ liệu trùng. Lỗi tải deck khác với deck rỗng.
6. Trước Match không công khai tên, avatar, hồ sơ hoặc vị trí chi tiết của đối phương. Ảnh do người dùng tự đăng có thể chứa thông tin nhận diện; ẩn danh không bảo đảm nội dung ảnh không tiết lộ danh tính.

## 5.2. Các Use Case

## 5.2. Các Use Case

### UC-01 — Đăng ký tài khoản

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-01 |
| **Use-case name** | Đăng ký tài khoản |
| **Actor** | Khách. |
| **Description** | Tạo tài khoản Flip và phiên đăng nhập. |
| **Trigger** | Chọn Bắt đầu/Đăng ký. |
| **Precondition** | Chưa đăng nhập. |
| **Postcondition** | Thành công thì tạo tài khoản, đăng nhập và mở UC-16; thất bại thì không tạo tài khoản mới. |
| **Normal flow** | 1. Khách chọn tiếp tục bằng số điện thoại.<br>2. Nhập số điện thoại và tên hiển thị.<br>3. Flip kiểm tra dữ liệu và gửi OTP.<br>4. Khách nhập OTP; Flip xác minh và tạo tài khoản.<br>5. Flip mở UC-16. |
| **Alternative flows** | - Chọn Apple, Google hoặc Facebook: hoàn tất xác thực; nếu là tài khoản mới thì tạo tài khoản và mở UC-16.<br>- Phương thức đã gắn với tài khoản có sẵn: chuyển sang đăng nhập tài khoản đó, không tạo bản sao. |
| **Exception flows** | - Dữ liệu không hợp lệ: báo trường cần sửa, chưa gửi OTP.<br>- OTP sai/hết hạn: cho nhập lại hoặc gửi lại khi nút khả dụng.<br>- Hủy xác thực hoặc dịch vụ lỗi: giữ/quay về màn trước đó, không báo thành công. |

### UC-02 — Cấp quyền Camera và Vị trí

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-02 |
| **Use-case name** | Cấp quyền Camera và Vị trí |
| **Actor** | Người dùng; hệ điều hành hỗ trợ. |
| **Description** | Yêu cầu quyền phục vụ chụp ảnh và định vị. |
| **Trigger** | Hoàn tất/bỏ qua UC-16 hoặc sử dụng chức năng cần quyền. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Quyền theo lựa chọn trên thiết bị; ứng dụng tiếp tục tới màn phù hợp. |
| **Normal flow** | 1. Flip giải thích quyền cần sử dụng.<br>2. Người dùng chọn Cho phép.<br>3. Hệ điều hành hiển thị yêu cầu chưa được cấp; người dùng phản hồi.<br>4. Flip cập nhật trạng thái và tiếp tục luồng. |
| **Alternative/Exception flows** | - Chọn Để sau hoặc từ chối: vẫn vào ứng dụng, nhưng chức năng cần quyền chưa thực hiện được.<br>- Quyền đã cấp: không yêu cầu lại.<br>- Không thể yêu cầu lại qua hộp thoại hệ điều hành: hướng dẫn mở Cài đặt.<br>- Cấp quyền Vị trí. |

### UC-03 — Chọn địa điểm và xác định vị trí

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-03 |
| **Use-case name** | Chọn địa điểm và xác định vị trí |
| **Actor** | Người dùng. |
| **Description** | Xác định/chọn địa điểm, chưa ghi nhận check-in. |
| **Trigger** | Mở app hoặc chọn Tìm địa điểm check-in/Chọn địa điểm gần bạn. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Hiển thị trạng thái địa điểm hoặc chọn được địa điểm để đăng; check-in cũ chưa bị thay đổi. |
| **Normal flow** | 1. Flip lấy vị trí khi có quyền.<br>2. Nếu vẫn trong geofence địa điểm hiện tại, giữ địa điểm; nếu ngoài thì gợi ý chọn địa điểm mới.<br>3. Flip hiển thị bản đồ và địa điểm gợi ý trong 150 m.<br>4. Người dùng chọn địa điểm hoặc giữ địa điểm hiện tại.<br>5. Flip hiển thị trạng thái: có thể vào Discovery nếu đủ điều kiện, hoặc chọn Đăng khoảnh khắc để mở UC-05. |
| **Alternative flows** | - Tìm địa điểm thủ công không thay thế việc xác minh GPS khi đăng.<br>- Chọn địa điểm khác khi đang có check-in: hiển thị cảnh báo phiên/check-in cũ và ảnh cũ sẽ bị gỡ khi đăng ở nơi mới thành công. Xác nhận thì tiếp tục UC-05; hủy thì giữ lựa chọn cũ.<br>- Mở app không bắt buộc mở camera hoặc đăng thêm ảnh. |
| **Exception flows** | - Thiếu quyền, tắt định vị, GPS lỗi hoặc chưa đủ chính xác: hướng dẫn khắc phục/thử lại.<br>- Tài khoản bị hạn chế: được xem trạng thái nhưng không thể đăng/check-in hoặc Discovery. |

### UC-04 — Hủy check-in hiện tại

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-04 |
| **Use-case name** | Hủy check-in hiện tại |
| **Actor** | Người dùng. |
| **Description** | Kết thúc check-in và gỡ các Moment liên quan. |
| **Trigger** | Chọn Hủy check-in trong Hồ sơ. |
| **Precondition** | Đã đăng nhập và có check-in hiện tại hợp lệ. |
| **Postcondition** | Check-in kết thúc; toàn bộ Moment còn hiển thị của check-in đó rời Discovery và Like đang chờ liên quan hết hiệu lực. Match/Chat đã tạo được giữ. |
| **Normal flow** | 1. Flip hiển thị hộp thoại cảnh báo hậu quả; chưa thay đổi dữ liệu.<br>2. Người dùng xác nhận Hủy check-in.<br>3. Flip kết thúc check-in, gỡ Moment liên quan và mở màn chọn địa điểm. |
| **Alternative/Exception flows** | - Chọn Tiếp tục khám phá/đóng hộp thoại: giữ nguyên check-in.<br>- Check-in đã kết thúc: cập nhật trạng thái hiện tại.<br>- Yêu cầu thất bại: không báo đã hủy, cho thử lại. |

### UC-05 — Đăng Moment

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-05 |
| **Use-case name** | Đăng Moment |
| **Actor** | Người dùng. |
| **Description** | Đăng ảnh và ghi nhận check-in sau khi thành công. |
| **Trigger** | Chọn Đăng khoảnh khắc. |
| **Precondition** | Đã đăng nhập và đã chọn địa điểm. |
| **Postcondition** | Thành công thì công bố Moment có hạn riêng 2 giờ và ghi nhận check-in; thất bại/hủy thì không công bố Moment hoặc tạo check-in mới. |
| **Normal flow** | 1. Flip kiểm tra quyền Camera; người dùng chụp ảnh.<br>2. Flip mở ảnh xem lại; người dùng nhập caption tùy chọn, tối đa 50 ký tự.<br>3. Người dùng bấm Gửi; Flip hiển thị đang gửi và ngăn gửi lặp.<br>4. Flip lấy vị trí hiện tại, kiểm tra geofence và tài khoản có được phép đăng hay không.<br>5. Flip upload ảnh và kiểm tra điều kiện đăng vẫn hợp lệ trước khi công bố.<br>6. Flip công bố Moment, ghi thời điểm thành công và hết hạn sau 2 giờ; cập nhật check-in cùng lúc.<br>7. |
| **Alternative flows** | - Chụp lại hoặc để trống caption.<br>- Cùng địa điểm, check-in còn hợp lệ: thêm ảnh, giữ check-in và tương tác cũ; không đổi hạn ảnh trước.<br>- Check-in cũ đã kết thúc: tạo check-in mới khi đăng thành công.<br>- Khác địa điểm: nếu chưa xác nhận cảnh báo chuyển địa điểm thì yêu cầu xác nhận. Khi đăng thành công, kết thúc check-in cũ, gỡ ảnh cũ và ghi nhận check-in mới. Không thực hiện nếu người dùng hủy. |
| **Exception flows** | - Thiếu ảnh/quyền Camera: chưa gửi, hướng dẫn bổ sung. Chặn ký tự caption thứ 51.<br>- Không xác minh được GPS/geofence hoặc tài khoản bị hạn chế: không công bố ảnh, không tạo check-in mới.<br>- Upload/ghi nhận thất bại: giữ ảnh xem lại để thử lại; không tác động check-in và ảnh cũ. Thử lại không tạo ảnh trùng.<br>- Hủy trước khi gửi: bỏ ảnh nháp. Nếu đang gửi, chỉ báo hủy thành công khi hệ thống xác nhận chưa công bố; nếu đã công bố thì hiển thị kết quả và cho xóa qua UC-06.<br>- Rời luồng sau khi hủy: xóa dữ liệu nháp/tạm; không lưu ảnh nháp lâu dài. |

### UC-06 — Xóa Moment đã đăng

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-06 |
| **Use-case name** | Xóa Moment đã đăng |
| **Actor** | Người dùng. |
| **Description** | Xóa riêng một Moment; không bắt buộc xóa ảnh để đăng thêm. |
| **Trigger** | Chọn Xóa trên Moment của mình. |
| **Precondition** | Đã đăng nhập và sở hữu Moment. |
| **Postcondition** | Moment được chọn rời Discovery; các ảnh khác không đổi. Nếu không còn Moment hợp lệ thì check-in kết thúc và mất quyền Discovery tại đó. |
| **Normal flow** | 1. Người dùng chọn Moment trong màn quản lý ảnh của mình.<br>2. Flip hiển thị xác nhận xóa ảnh đó.<br>3. Người dùng xác nhận; Flip gỡ ảnh và cập nhật trạng thái check-in. |
| **Alternative/Exception flows** | - Hủy/giữ ảnh: không thay đổi.<br>- Muốn đăng thêm: mở UC-05, không cần xóa ảnh cũ.<br>- Ảnh đã bị gỡ/hết hạn: cập nhật trạng thái.<br>- Xóa thất bại: không báo thành công, cho thử lại. |

### UC-07 — Khám phá Moment

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-07 |
| **Use-case name** | Khám phá Moment |
| **Actor** | Người dùng. |
| **Description** | Xem Moment ẩn danh tại cùng địa điểm. |
| **Trigger** | Mở Khám phá/ Chọn thẻ hiện có trên bản đồ đã check-in. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Hiển thị thẻ, deck rỗng hoặc hướng dẫn đáp ứng điều kiện truy cập. |
| **Normal flow** | 1. Flip kiểm tra check-in và quyền Discovery tại địa điểm.<br>2. Flip tải thẻ hợp lệ theo bộ lọc ở quy tắc chung.<br>3. Người dùng chạm để lật thẻ; Flip hiện ảnh, caption và địa điểm chung, giữ riêng tư danh tính/vị trí chi tiết.<br>4. Người dùng chọn Like (UC-09), Report (UC-08) hoặc sang thẻ tiếp theo (UC-21).<br>5. Flip hiển thị thẻ tiếp theo hoặc trạng thái đã xem hết. |
| **Alternative/Exception flows** | - Không có Moment hợp lệ của mình: hướng dẫn đăng ảnh tại địa điểm, không tự tạo check-in.<br>- Một ảnh của mình hết hạn nhưng còn ảnh hợp lệ khác: vẫn được Discovery.<br>- Deck rỗng: hiển thị chưa có khoảnh khắc phù hợp và cho Thử lại.<br>- Thẻ không còn hợp lệ: bỏ thẻ, tìm thẻ tiếp theo.<br>- Tải lỗi: hiển thị lỗi và thử lại; không coi là deck rỗng.<br>- Bị hạn chế: từ chối Discovery. |

### UC-08 — Báo cáo Moment

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-08 |
| **Use-case name** | Báo cáo Moment |
| **Actor** | Người dùng. |
| **Description** | Báo cáo nội dung và áp dụng ngưỡng xử lý. |
| **Trigger** | Chọn Báo cáo khoảnh khắc. |
| **Precondition** | Đã đăng nhập và đang xem Moment của người khác. |
| **Postcondition** | Report thành công được ghi nhận một lần; thẻ rời deck của người báo cáo. Đủ ngưỡng thì áp dụng quy tắc ẩn ảnh/hạn chế tài khoản. |
| **Normal flow** | 1. Flip mở danh sách lý do.<br>2. Người dùng chọn nội dung không phù hợp, quấy rối/thiếu tôn trọng hoặc spam/quảng cáo.<br>3. Người dùng chọn Gửi báo cáo.<br>4. Flip kiểm tra người báo cáo vẫn đủ quyền Discovery tại cùng địa điểm, Moment còn khả dụng và chưa Report trùng.<br>5. Flip ghi nhận, xác nhận và loại thẻ khỏi deck của người báo cáo.<br>6. Nếu đủ hai người Report hợp lệ, ẩn ảnh và tính một vi phạm. Đủ ba ảnh vi phạm thì áp dụng hạn chế đến hết pilot. |
| **Alternative/Exception flows** | - Hủy trước khi gửi: không tạo Report.<br>- Chưa chọn lý do: yêu cầu chọn.<br>- Report trùng: không tăng số đếm.<br>- Chỉ một Report: ảnh còn có thể hiển thị với người khác.<br>- Mất điều kiện hoặc ghi nhận thất bại: không báo thành công/tăng số đếm; cập nhật trạng thái hoặc cho thử lại. |

### UC-09 — Like và tạo Mutual Match

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-09 |
| **Use-case name** | Like và tạo Mutual Match |
| **Actor** | Người dùng A; người dùng B là bên nhận. |
| **Description** | Ghi Like hướng tới tài khoản; tạo Match khi có Like đối ứng hợp lệ. |
| **Trigger** | A Like trên Moment của B. |
| **Precondition** | Đã đăng nhập và mở được Moment đích. |
| **Postcondition** | Ghi nhận một Like hoặc tạo một Match duy nhất; Match mở quyền xem hồ sơ và Chat. |
| **Normal flow** | 1. Flip kiểm tra Moment đích, check-in hai bên, cùng địa điểm, quan hệ Block và trạng thái kết nối.<br>2. Flip ghi nhận Like A → B trong cặp check-in hiện tại.<br>3. Nếu chưa có Like đối ứng, hiển thị trạng thái chờ và tạo thông báo trong ứng dụng cho B.<br>4. Kết thúc lượt gửi Like; A có thể tiếp tục khám phá. |
| **Alternative flows** | - Đã có Like B → A hợp lệ: tạo Match tại lượt Like thứ hai; hiển thị Đã kết nối và cho Chat, xem hồ sơ hoặc tiếp tục khám phá.<br>- B đáp lại sau: B thực hiện UC này trên một Moment hợp lệ của A hoặc từ UC-10; không bắt buộc phản hồi trong lượt thao tác của A.<br>- Đã có Like cùng chiều: giữ trạng thái hiện có, không tạo Like/thông báo trùng.<br>- Đã Match: mở kết nối hiện có, không tạo Match mới. |
| **Exception flows** | - Moment hết hạn/xóa/ẩn, check-in mất hiệu lực hoặc có Block: không ghi Like/tạo Match.<br>- Gửi thất bại: cho thử lại, không báo thành công hoặc tạo bản sao.<br>- Hai bên Like đồng thời: vẫn chỉ tạo một Match. |

### UC-10 — Xem thông báo trong ứng dụng

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-10 |
| **Use-case name** | Xem thông báo trong ứng dụng |
| **Actor** | Người dùng. |
| **Description** | Xem và mở nội dung từ tab Thông báo; không phải Push Notification. |
| **Trigger** | Chọn tab Thông báo. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Hiển thị danh sách, nội dung đích hoặc trạng thái không khả dụng. |
| **Normal flow** | 1. Flip tải danh sách thông báo.<br>2. Người dùng chọn một mục.<br>3. Flip kiểm tra lại nội dung đích và quyền truy cập.<br>4. Flip mở màn tương ứng. |
| **Alternative flows** | - Like: mở Moment khả dụng của người gửi trong check-in liên quan; áp dụng đầy đủ bộ lọc, không mở lại ảnh đã Pass/Report.<br>- Match: mở kết nối còn hoạt động. Tin nhắn: mở Chat còn hoạt động.<br>- Moment mới: mở Discovery nếu đủ điều kiện.<br>- Moment hết hạn: hiển thị ảnh đã hết hạn; nếu còn ảnh hợp lệ của mình thì cho tiếp tục Discovery, nếu không thì hướng dẫn đăng mới.<br>- Không có thông báo: hiển thị trạng thái rỗng. |
| **Exception flows** | - Không còn nội dung phù hợp, check-in đích đã kết thúc hoặc có Block: báo không khả dụng.<br>- Chưa đủ quyền Discovery: hướng dẫn đáp ứng điều kiện; không tự khôi phục Like hết hiệu lực.<br>- Kết nối đã kết thúc: không mở lại Chat/hồ sơ cũ.<br>- Tải thất bại: báo lỗi và cho thử lại. |

### UC-11 — Nhắn tin riêng sau Match

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-11 |
| **Use-case name** | Nhắn tin riêng sau Match |
| **Actor** | Hai người dùng đã Match. |
| **Description** | Gửi tin trong kết nối đang hoạt động. |
| **Trigger** | Mở Chat từ Match, hộp thư hoặc thông báo. |
| **Precondition** | Đã đăng nhập và chọn kết nối cần mở. |
| **Postcondition** | Tin thành công được ghi nhận một lần trong đúng cuộc trò chuyện; tin lỗi có trạng thái rõ. |
| **Normal flow** | 1. Flip kiểm tra kết nối còn hoạt động và không có Block.<br>2. Flip mở Chat cùng nội dung hiện có.<br>3. Người dùng nhập tin và chọn Gửi.<br>4. Flip hiển thị đang gửi; khi được xác nhận thì chuyển sang đã gửi. Đối phương nhận cùng nội dung khi đồng bộ. |
| **Alternative/Exception flows** | - Menu ⋯ mở Report (UC-12), Block (UC-13) hoặc Unmatch (UC-18).<br>- Tin rỗng: không gửi.<br>- Chưa Match, Block hoặc Unmatch trước khi gửi: từ chối mở/gửi.<br>- Lỗi gửi: hiển thị thất bại và cho thử lại; không tạo tin trùng.<br>- Moment/check-in hết hạn không tự kết thúc Chat đã tạo. |

### UC-12 — Báo cáo người dùng trong Chat

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-12 |
| **Use-case name** | Báo cáo người dùng trong Chat |
| **Actor** | Người dùng. |
| **Description** | Ghi nhận Report đối phương trong Chat. |
| **Trigger** | Chọn ⋯ → Báo cáo người dùng. |
| **Precondition** | Đã đăng nhập và mở được kết nối liên quan. |
| **Postcondition** | Report được ghi nhận; không tự Block/Unmatch và không tự tính thành vi phạm Moment. |
| **Normal flow** | 1. Flip mở danh sách lý do.<br>2. Người dùng chọn quấy rối, nội dung không phù hợp hoặc giả mạo/spam.<br>3. Người dùng gửi Report.<br>4. Flip ghi nhận, báo thành công và cho về danh sách kết nối. |
| **Alternative/Exception flows** | - Hủy: không gửi Report.<br>- Chưa chọn lý do: yêu cầu chọn.<br>- Ghi nhận thất bại: không báo thành công, cho thử lại.<br>- Quy trình xét duyệt Report Chat ngoài việc tiếp nhận không nằm trong bộ UC này. |

### UC-13 — Chặn người dùng

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-13 |
| **Use-case name** | Chặn người dùng |
| **Actor** | Người dùng. |
| **Description** | Ngăn tương tác với một tài khoản qua Flip. |
| **Trigger** | Chọn Chặn người dùng trong menu ⋯. |
| **Precondition** | Đã đăng nhập và đã xác định đối phương từ kết nối của mình. |
| **Postcondition** | Áp dụng Block theo quy tắc chung; kết nối và Like đang chờ giữa hai bên bị vô hiệu. Các kết nối với người khác không bị ảnh hưởng. |
| **Normal flow** | 1. Flip hiển thị xác nhận cùng phạm vi chặn.<br>2. Người dùng xác nhận.<br>3. Flip ghi nhận Block, đóng kết nối, báo thành công và về danh sách kết nối. |
| **Alternative/Exception flows** | - Chọn Giữ cuộc trò chuyện: không chặn.<br>- Kết nối kết thúc sau khi mở hộp thoại: vẫn cho chặn tài khoản đã xác định.<br>- Đã Block: giữ trạng thái, không tạo dữ liệu trùng.<br>- Ghi nhận thất bại: không báo thành công, cho thử lại. |

### UC-14 — Chỉnh sửa hồ sơ

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-14 |
| **Use-case name** | Chỉnh sửa hồ sơ |
| **Actor** | Người dùng. |
| **Description** | Cập nhật hồ sơ cá nhân. |
| **Trigger** | Mở Hồ sơ và chọn Sửa. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Lưu thành công thì cập nhật hồ sơ; hủy/thất bại giữ dữ liệu đã lưu trước đó. |
| **Normal flow** | 1. Flip hiển thị dữ liệu hồ sơ hiện có.<br>2. Người dùng sửa avatar, biệt danh, giới thiệu hoặc sở thích theo các trường trên UI.<br>3. Người dùng chọn Lưu hồ sơ.<br>4. Flip kiểm tra các trường theo quy tắc dữ liệu của UI, ghi nhận và hiển thị hồ sơ đã cập nhật. |
| **Alternative/Exception flows** | - Hủy thay đổi: bỏ bản sửa, giữ dữ liệu đã lưu.<br>- Dữ liệu không hợp lệ: chỉ rõ trường cần sửa, chưa lưu.<br>- Upload avatar/lưu thất bại: giữ bản nhập để thử lại; không báo thành công hoặc ghi đè một phần hồ sơ.<br>- Giới hạn cụ thể từng trường cần lấy từ UI/đặc tả dữ liệu; tài liệu này không tự đặt số ký tự mới. |

### UC-15 — Đăng nhập

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-15 |
| **Use-case name** | Đăng nhập |
| **Actor** | Người dùng có tài khoản. |
| **Description** | Xác thực để truy cập tài khoản đã có. |
| **Trigger** | Chọn Đăng nhập hoặc mở lại app. |
| **Precondition** | Có tài khoản Flip. |
| **Postcondition** | Truy cập đúng tài khoản bằng phiên đăng nhập hợp lệ. |
| **Normal flow** | 1. Người dùng chọn số điện thoại, nhập số đã đăng ký.<br>2. Flip gửi OTP.<br>3. Người dùng nhập OTP; Flip xác minh.<br>4. Flip mở tài khoản và xác định địa điểm theo UC-03 khi có quyền; không tự tạo check-in. |
| **Alternative/Exception flows** | - Apple/Google/Facebook: xác thực và mở tài khoản đã liên kết.<br>- Phiên đăng nhập còn hợp lệ: mở thẳng tài khoản. Cài lại app: yêu cầu xác thực lại.<br>- Chưa có tài khoản: chuyển UC-01.<br>- OTP sai/hết hạn, chưa nhận được OTP hoặc xác thực lỗi: thông báo và cho thử lại/gửi lại khi khả dụng.<br>- Hủy xác thực: quay về màn chọn phương thức. |

### UC-16 — Thiết lập hồ sơ ban đầu

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-16 |
| **Use-case name** | Thiết lập hồ sơ ban đầu |
| **Actor** | Người dùng mới. |
| **Description** | Bổ sung hồ sơ sau đăng ký. |
| **Trigger** | Hoàn tất UC-01. |
| **Precondition** | Tài khoản đã tạo và đăng nhập. |
| **Postcondition** | Lưu hồ sơ nếu người dùng chọn Lưu; sau lưu/bỏ qua thì chuyển UC-02. |
| **Normal flow** | 1. Flip mở Thiết lập hồ sơ.<br>2. Người dùng bổ sung các trường theo UI và chọn Lưu.<br>3. Flip kiểm tra và lưu thành công, chuyển UC-02. |
| **Alternative/Exception flows** | - Bỏ qua: giữ thông tin tài khoản đã có và chuyển UC-02.<br>- Dữ liệu sai: hiển thị trường cần sửa.<br>- Lưu thất bại: giữ nội dung nhập để thử lại; không báo đã lưu. Người dùng vẫn có thể chọn Bỏ qua. |

### UC-17 — Xem hướng dẫn sử dụng

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-17 |
| **Use-case name** | Xem hướng dẫn sử dụng |
| **Actor** | Người dùng. |
| **Description** | Xem hướng dẫn check-in, đăng Moment và kết nối. |
| **Trigger** | Chọn Xem hướng dẫn trên màn chào. |
| **Precondition** | Đã vào màn chào sau đăng nhập. |
| **Postcondition** | Hướng dẫn đã được hiển thị. |
| **Normal flow** | 1. Flip hiển thị hướng dẫn ba bước theo UI.<br>2. Người dùng chọn Bắt đầu check-in để mở UC-03; chưa tạo check-in tại bước này. |
| **Alternative flows** | - Chọn Quay lại để về màn chào. |

### UC-18 — Kết thúc kết nối

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-18 |
| **Use-case name** | Kết thúc kết nối |
| **Actor** | Người dùng. |
| **Description** | Unmatch, kết thúc kết nối hiện tại cho cả hai bên. |
| **Trigger** | Chọn Kết thúc kết nối trong menu ⋯. |
| **Precondition** | Đã đăng nhập và có kết nối đang hoạt động. |
| **Postcondition** | Hai bên không thể dùng Chat hoặc xem hồ sơ qua kết nối cũ; áp dụng quy tắc tái kết nối ở phần chung. Không tự tạo Block. |
| **Normal flow** | 1. Flip hiển thị hộp thoại xác nhận.<br>2. Người dùng xác nhận Kết thúc kết nối.<br>3. Flip đóng kết nối cho hai bên, báo thành công và về danh sách kết nối. |
| **Alternative/Exception flows** | - Giữ cuộc trò chuyện: không thay đổi.<br>- Kết nối đã kết thúc: cập nhật trạng thái, không tạo lại kết nối.<br>- Thất bại: không báo thành công, cho thử lại. |

### UC-19 — Xem quyền riêng tư và an toàn

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-19 |
| **Use-case name** | Xem quyền riêng tư và an toàn |
| **Actor** | Người dùng. |
| **Description** | Xem quy tắc ẩn danh, vị trí, Report và Block. |
| **Trigger** | Chọn Quyền riêng tư & An toàn trong Hồ sơ. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Hiển thị nội dung chính sách nhất quán với quy tắc nghiệp vụ. |
| **Normal flow** | 1. Người dùng mở mục Quyền riêng tư & An toàn.<br>2. Flip hiển thị nội dung, gồm thời hạn Moment, thời điểm lấy vị trí, giới hạn ẩn danh và các cơ chế bảo vệ.<br>3. Người dùng quay lại Hồ sơ. |

### UC-20 — Đăng xuất

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-20 |
| **Use-case name** | Đăng xuất |
| **Actor** | Người dùng. |
| **Description** | Kết thúc phiên đăng nhập trên thiết bị. |
| **Trigger** | Chọn Đăng xuất trong Hồ sơ. |
| **Precondition** | Đã đăng nhập. |
| **Postcondition** | Không truy cập được dữ liệu riêng trên thiết bị nếu chưa xác thực lại; mở Welcome. Không tự hủy check-in hoặc xóa Moment đã đăng. |
| **Normal flow** | 1. Người dùng chọn Đăng xuất.<br>2. Flip kết thúc phiên đăng nhập trên thiết bị và ngừng hiển thị dữ liệu riêng của tài khoản.<br>3. Flip mở Welcome. |
| **Alternative/Exception flows** | - Mất mạng: vẫn xóa phiên đăng nhập cục bộ và đóng quyền truy cập trên thiết bị; việc vô hiệu phiên từ xa cần được xử lý khi kết nối lại.<br>- Moment vẫn hết hạn theo thời điểm riêng; đăng xuất không gia hạn hoặc reset tương tác. |

### UC-21 — Bỏ qua Moment

| Thuộc tính | Nội dung |
|---|---|
| **Use-case ID** | UC-21 |
| **Use-case name** | Bỏ qua Moment |
| **Actor** | Người dùng. |
| **Description** | Pass một Moment, không phải toàn bộ tài khoản. |
| **Trigger** | Chạm sang thẻ tiếp theo khi chưa Like hoặc Report thành công thẻ hiện tại. |
| **Precondition** | Đã đăng nhập và đang xem một thẻ. |
| **Postcondition** | Pass thành công thì Moment đó không hiện lại với người xem; không gửi thông báo từ chối. Moment khác của người đăng vẫn có thể xuất hiện. |
| **Normal flow** | 1. Người dùng chạm sang thẻ tiếp theo.<br>2. Flip kiểm tra quyền Discovery và thẻ còn khả dụng.<br>3. Flip ghi nhận Pass và loại thẻ khỏi deck của người xem.<br>4. Flip hiển thị thẻ tiếp theo hoặc báo đã xem hết khoảnh khắc. |
| **Alternative/Exception flows** | - Đã Like hoặc Report thành công: chỉ chuyển thẻ, không ghi thêm Pass.<br>- Pass thất bại: cho thử lại, không thông báo đã ghi nhận.<br>- Thẻ đã hết hạn/xóa/ẩn: bỏ thẻ mà không cần ghi Pass.<br>- Mất điều kiện Discovery: xử lý theo UC-07. |