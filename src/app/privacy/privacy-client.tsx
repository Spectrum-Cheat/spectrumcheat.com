"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { Lang } from "../_i18n/translations";

type Section = { title: string; body: string[]; bullets?: string[] };
type Doc = { title: string; subtitle: string; effective: string; sections: Section[] };

const CONTENT: Record<Lang, Doc> = {
  en: {
    title: "Privacy Policy",
    subtitle:
      "This policy explains what information Spectrum Cheat may collect, how it is used to operate the service, and the practical steps taken to protect access, support, and delivery flows.",
    effective: "Effective April 12, 2026",
    sections: [
      { title: "1. Overview", body: [
        "This Privacy Policy explains how Spectrum Cheat may collect, use, store, and protect information when you visit spectrumcheat.com, use related purchase flows, access key routes, or interact with official service channels.",
        "By using the website or connected services, you agree to the data practices described in this policy.",
      ] },
      { title: "2. Information We May Collect", body: [
        "Depending on how you use the service, Spectrum Cheat may collect information directly from you or through connected third-party platforms.",
      ], bullets: [
        "Basic contact or support information you provide through Discord or other support channels.",
        "Purchase-related information such as plan selection, transaction references, delivery status, or access timing.",
        "Technical information such as browser type, device type, IP address, referral path, timestamps, or pages visited.",
        "Key-route and access-flow information needed to verify eligibility or reduce abuse.",
      ] },
      { title: "3. How Information Is Used", body: [
        "Spectrum Cheat uses collected information only for legitimate service operation, support, security, and improvement purposes.",
      ], bullets: [
        "To provide access to purchased plans or digital services.",
        "To respond to support questions and user requests.",
        "To detect abuse, fraud, duplicate access, chargeback misuse, or suspicious behavior.",
        "To monitor website performance, route health, and service reliability.",
        "To improve the overall user experience across the site and connected access flows.",
      ] },
      { title: "4. Third-Party Services", body: [
        "Spectrum Cheat may use third-party providers for hosting, checkout, payment processing, key delivery, shortlink routing, analytics, communication, and community management.",
        "Those providers may collect and process information under their own terms and privacy policies. Spectrum Cheat does not control every data practice used by third-party services.",
      ] },
      { title: "5. Cookies and Technical Signals", body: [
        "The website and connected services may use cookies, browser storage, referral data, and similar technical signals to keep sessions stable, improve delivery flows, measure traffic, and reduce abusive behavior.",
        "If your browser blocks some of these tools, certain areas of the service may not work as expected.",
      ] },
      { title: "6. Data Retention", body: [
        "Information is retained only for as long as reasonably necessary to operate the service, investigate abuse, resolve disputes, maintain logs, or comply with legal and operational requirements.",
        "Some data may remain in backups, logs, or third-party provider systems for a limited period even after active use ends.",
      ] },
      { title: "7. Data Sharing", body: [
        "Spectrum Cheat does not sell your personal information as a standalone business product.",
        "Information may still be shared when required to process payments, deliver service access, protect the platform, enforce terms, investigate abuse, or comply with legal obligations.",
      ] },
      { title: "8. Security", body: [
        "We use reasonable technical and operational steps to reduce unauthorized access, abuse, and accidental exposure. No internet-based service can guarantee absolute security, but Spectrum Cheat works to protect service-related information with practical safeguards.",
      ] },
      { title: "9. Your Choices", body: [
        "You may limit some browser-based tracking through your own browser settings and may stop using the site at any time.",
        "If you have questions about information connected to a purchase, support request, or access event, contact Spectrum through the official website routes or Discord server.",
      ] },
      { title: "10. Policy Updates", body: [
        "This Privacy Policy may be updated from time to time. The latest version published on this page will control future use of the website and related services unless stated otherwise.",
      ] },
    ],
  },
  th: {
    title: "นโยบายความเป็นส่วนตัว",
    subtitle:
      "นโยบายนี้อธิบายว่า Spectrum Cheat อาจเก็บข้อมูลอะไรบ้าง นำไปใช้ในการดำเนินบริการอย่างไร และมาตรการที่ใช้ปกป้องการเข้าถึง การซัพพอร์ต และการส่งมอบ",
    effective: "มีผลบังคับใช้ 12 เมษายน 2026",
    sections: [
      { title: "1. ภาพรวม", body: [
        "นโยบายความเป็นส่วนตัวนี้อธิบายว่า Spectrum Cheat อาจเก็บ ใช้ จัดเก็บ และปกป้องข้อมูลอย่างไร เมื่อคุณเข้าชม spectrumcheat.com ใช้ขั้นตอนการซื้อที่เกี่ยวข้อง เข้าถึง key route หรือมีปฏิสัมพันธ์กับช่องทางบริการทางการ",
        "การใช้เว็บไซต์หรือบริการที่เชื่อมต่อ ถือว่าคุณยอมรับแนวปฏิบัติด้านข้อมูลที่อธิบายไว้ในนโยบายนี้",
      ] },
      { title: "2. ข้อมูลที่เราอาจเก็บ", body: [
        "ขึ้นอยู่กับวิธีที่คุณใช้บริการ Spectrum Cheat อาจเก็บข้อมูลจากคุณโดยตรงหรือผ่านแพลตฟอร์มบุคคลที่สามที่เชื่อมต่อ",
      ], bullets: [
        "ข้อมูลติดต่อหรือซัพพอร์ตพื้นฐานที่คุณให้ผ่าน Discord หรือช่องทางซัพพอร์ตอื่นๆ",
        "ข้อมูลเกี่ยวกับการซื้อ เช่น แพ็กเกจที่เลือก รหัสอ้างอิงธุรกรรม สถานะการส่งมอบ หรือช่วงเวลาการเข้าถึง",
        "ข้อมูลทางเทคนิค เช่น ชนิดเบราว์เซอร์ ชนิดอุปกรณ์ IP address เส้นทางที่อ้างถึง เวลาที่บันทึก หรือหน้าที่เข้าชม",
        "ข้อมูล key route และ access flow ที่จำเป็นต่อการยืนยันสิทธิ์หรือลดการใช้ในทางที่ผิด",
      ] },
      { title: "3. วิธีการใช้ข้อมูล", body: [
        "Spectrum Cheat ใช้ข้อมูลที่เก็บไว้เพื่อการดำเนินบริการที่ถูกต้อง การซัพพอร์ต ความปลอดภัย และการปรับปรุงเท่านั้น",
      ], bullets: [
        "เพื่อให้สิทธิ์เข้าถึงแพ็กเกจที่ซื้อหรือบริการดิจิทัล",
        "เพื่อตอบคำถามซัพพอร์ตและคำขอของผู้ใช้",
        "เพื่อตรวจจับการใช้ในทางที่ผิด การฉ้อโกง การเข้าถึงซ้ำ การใช้ chargeback ในทางที่ผิด หรือพฤติกรรมน่าสงสัย",
        "เพื่อติดตามประสิทธิภาพเว็บไซต์ สุขภาพของ route และความน่าเชื่อถือของบริการ",
        "เพื่อปรับปรุงประสบการณ์ผู้ใช้โดยรวมทั้งเว็บไซต์และ access flow ที่เชื่อมต่อ",
      ] },
      { title: "4. บริการบุคคลที่สาม", body: [
        "Spectrum Cheat อาจใช้ผู้ให้บริการบุคคลที่สามสำหรับโฮสติ้ง checkout การประมวลผลการชำระเงิน การส่งมอบคีย์ การจัดการ shortlink การวิเคราะห์ การสื่อสาร และการจัดการชุมชน",
        "ผู้ให้บริการเหล่านั้นอาจเก็บและประมวลผลข้อมูลภายใต้ข้อกำหนดและนโยบายความเป็นส่วนตัวของตนเอง Spectrum Cheat ไม่ได้ควบคุมทุกแนวปฏิบัติด้านข้อมูลที่บริการบุคคลที่สามใช้",
      ] },
      { title: "5. คุกกี้และสัญญาณทางเทคนิค", body: [
        "เว็บไซต์และบริการที่เชื่อมต่ออาจใช้คุกกี้ พื้นที่จัดเก็บในเบราว์เซอร์ ข้อมูลการอ้างถึง และสัญญาณทางเทคนิคที่คล้ายกัน เพื่อรักษาเซสชันให้เสถียร ปรับปรุง flow การส่งมอบ วัดทราฟฟิก และลดพฤติกรรมที่ไม่เหมาะสม",
        "หากเบราว์เซอร์ของคุณบล็อกเครื่องมือบางอย่าง บางส่วนของบริการอาจทำงานไม่เป็นไปตามที่คาด",
      ] },
      { title: "6. การเก็บรักษาข้อมูล", body: [
        "ข้อมูลจะถูกเก็บไว้เท่าที่จำเป็นตามสมควรเพื่อดำเนินบริการ ตรวจสอบการใช้ในทางที่ผิด แก้ไขข้อพิพาท เก็บ log หรือปฏิบัติตามข้อกำหนดทางกฎหมายและการดำเนินงาน",
        "ข้อมูลบางส่วนอาจยังคงอยู่ในการสำรองข้อมูล log หรือระบบของผู้ให้บริการบุคคลที่สามในช่วงเวลาจำกัด แม้หลังจากเลิกใช้งานแล้ว",
      ] },
      { title: "7. การแบ่งปันข้อมูล", body: [
        "Spectrum Cheat ไม่ขายข้อมูลส่วนบุคคลของคุณในฐานะผลิตภัณฑ์ทางธุรกิจแบบเอกเทศ",
        "ข้อมูลอาจยังถูกแบ่งปันเมื่อจำเป็นต่อการประมวลผลการชำระเงิน การส่งมอบสิทธิ์เข้าถึง การปกป้องแพลตฟอร์ม การบังคับใช้ข้อกำหนด การตรวจสอบการใช้ในทางที่ผิด หรือการปฏิบัติตามภาระผูกพันทางกฎหมาย",
      ] },
      { title: "8. ความปลอดภัย", body: [
        "เราใช้มาตรการทางเทคนิคและการดำเนินงานตามสมควรเพื่อลดการเข้าถึงโดยไม่ได้รับอนุญาต การใช้ในทางที่ผิด และการเปิดเผยโดยบังเอิญ ไม่มีบริการบนอินเทอร์เน็ตใดรับประกันความปลอดภัยได้อย่างสมบูรณ์ แต่ Spectrum Cheat พยายามปกป้องข้อมูลที่เกี่ยวกับบริการด้วยมาตรการที่ใช้ได้จริง",
      ] },
      { title: "9. ทางเลือกของคุณ", body: [
        "คุณสามารถจำกัดการติดตามบางอย่างผ่านการตั้งค่าเบราว์เซอร์ของคุณเอง และสามารถหยุดใช้เว็บไซต์ได้ทุกเมื่อ",
        "หากมีคำถามเกี่ยวกับข้อมูลที่เชื่อมโยงกับการซื้อ คำขอซัพพอร์ต หรือเหตุการณ์การเข้าถึง ติดต่อ Spectrum ผ่านช่องทางทางการบนเว็บไซต์หรือเซิร์ฟเวอร์ Discord",
      ] },
      { title: "10. การอัปเดตนโยบาย", body: [
        "นโยบายความเป็นส่วนตัวนี้อาจมีการอัปเดตเป็นครั้งคราว เวอร์ชันล่าสุดที่เผยแพร่บนหน้านี้จะมีผลต่อการใช้เว็บไซต์และบริการที่เกี่ยวข้องในอนาคต เว้นแต่จะระบุไว้เป็นอย่างอื่น",
      ] },
    ],
  },
  zh: {
    title: "隐私政策",
    subtitle:
      "本政策说明 Spectrum Cheat 可能收集哪些信息、如何用于运营服务，以及为保护访问、支持和交付流程所采取的实际措施。",
    effective: "生效日期 2026年4月12日",
    sections: [
      { title: "1. 概述", body: [
        "本隐私政策说明当你访问 spectrumcheat.com、使用相关购买流程、访问密钥途径或与官方服务渠道互动时，Spectrum Cheat 可能如何收集、使用、存储和保护信息。",
        "使用本网站或关联服务即表示你同意本政策所述的数据处理方式。",
      ] },
      { title: "2. 我们可能收集的信息", body: [
        "根据你使用服务的方式，Spectrum Cheat 可能直接向你收集信息，或通过关联的第三方平台收集。",
      ], bullets: [
        "你通过 Discord 或其他支持渠道提供的基本联系或支持信息。",
        "与购买相关的信息，如套餐选择、交易凭证、交付状态或访问时间。",
        "技术信息，如浏览器类型、设备类型、IP 地址、来源路径、时间戳或访问的页面。",
        "用于验证资格或减少滥用所需的密钥途径和访问流程信息。",
      ] },
      { title: "3. 信息的使用方式", body: [
        "Spectrum Cheat 仅将收集的信息用于合法的服务运营、支持、安全和改进目的。",
      ], bullets: [
        "提供对已购套餐或数字服务的访问。",
        "回应支持问题和用户请求。",
        "检测滥用、欺诈、重复访问、拒付滥用或可疑行为。",
        "监控网站性能、途径健康状况和服务可靠性。",
        "改善整个网站及关联访问流程的整体用户体验。",
      ] },
      { title: "4. 第三方服务", body: [
        "Spectrum Cheat 可能使用第三方提供商进行托管、结账、支付处理、密钥交付、短链路由、分析、通信和社区管理。",
        "这些提供商可能依据其自身条款和隐私政策收集和处理信息。Spectrum Cheat 无法控制第三方服务的每一项数据处理行为。",
      ] },
      { title: "5. Cookie 与技术信号", body: [
        "网站和关联服务可能使用 cookie、浏览器存储、来源数据及类似技术信号，以保持会话稳定、改进交付流程、衡量流量并减少滥用行为。",
        "如果你的浏览器屏蔽了其中某些工具，服务的某些区域可能无法按预期工作。",
      ] },
      { title: "6. 数据保留", body: [
        "信息仅在为运营服务、调查滥用、解决争议、维护日志或遵守法律和运营要求所合理需要的期限内保留。",
        "即使在停止使用后，某些数据仍可能在备份、日志或第三方提供商系统中保留一段有限的时间。",
      ] },
      { title: "7. 数据共享", body: [
        "Spectrum Cheat 不会将你的个人信息作为独立的商业产品出售。",
        "在为处理付款、交付服务访问、保护平台、执行条款、调查滥用或遵守法律义务所需时，信息仍可能被共享。",
      ] },
      { title: "8. 安全", body: [
        "我们采取合理的技术和运营措施来减少未经授权的访问、滥用和意外泄露。没有任何基于互联网的服务能保证绝对安全，但 Spectrum Cheat 会以切实可行的保护措施来保护与服务相关的信息。",
      ] },
      { title: "9. 你的选择", body: [
        "你可以通过自己的浏览器设置限制部分基于浏览器的跟踪，并可随时停止使用本网站。",
        "如果你对与购买、支持请求或访问事件相关的信息有疑问，请通过网站官方途径或 Discord 服务器联系 Spectrum。",
      ] },
      { title: "10. 政策更新", body: [
        "本隐私政策可能会不时更新。除非另有说明，本页面发布的最新版本将适用于今后对网站及相关服务的使用。",
      ] },
    ],
  },
  vi: {
    title: "Chính sách bảo mật",
    subtitle:
      "Chính sách này giải thích Spectrum Cheat có thể thu thập thông tin gì, được dùng ra sao để vận hành dịch vụ, và các bước thực tế để bảo vệ truy cập, hỗ trợ và giao hàng.",
    effective: "Có hiệu lực ngày 12 tháng 4, 2026",
    sections: [
      { title: "1. Tổng quan", body: [
        "Chính sách bảo mật này giải thích cách Spectrum Cheat có thể thu thập, sử dụng, lưu trữ và bảo vệ thông tin khi bạn truy cập spectrumcheat.com, dùng các quy trình mua hàng liên quan, truy cập key route hoặc tương tác với các kênh dịch vụ chính thức.",
        "Khi sử dụng website hoặc dịch vụ kết nối, bạn đồng ý với các cách xử lý dữ liệu được mô tả trong chính sách này.",
      ] },
      { title: "2. Thông tin chúng tôi có thể thu thập", body: [
        "Tùy vào cách bạn sử dụng dịch vụ, Spectrum Cheat có thể thu thập thông tin trực tiếp từ bạn hoặc qua các nền tảng bên thứ ba được kết nối.",
      ], bullets: [
        "Thông tin liên hệ hoặc hỗ trợ cơ bản bạn cung cấp qua Discord hoặc các kênh hỗ trợ khác.",
        "Thông tin liên quan đến mua hàng như lựa chọn gói, mã giao dịch, trạng thái giao hàng hoặc thời điểm truy cập.",
        "Thông tin kỹ thuật như loại trình duyệt, loại thiết bị, địa chỉ IP, đường dẫn giới thiệu, dấu thời gian hoặc các trang đã xem.",
        "Thông tin key route và access flow cần thiết để xác minh điều kiện hoặc giảm lạm dụng.",
      ] },
      { title: "3. Cách sử dụng thông tin", body: [
        "Spectrum Cheat chỉ dùng thông tin thu thập cho mục đích vận hành dịch vụ hợp pháp, hỗ trợ, bảo mật và cải thiện.",
      ], bullets: [
        "Cấp quyền truy cập gói đã mua hoặc dịch vụ kỹ thuật số.",
        "Phản hồi các câu hỏi hỗ trợ và yêu cầu của người dùng.",
        "Phát hiện lạm dụng, gian lận, truy cập trùng lặp, lạm dụng chargeback hoặc hành vi đáng ngờ.",
        "Theo dõi hiệu năng website, tình trạng route và độ tin cậy của dịch vụ.",
        "Cải thiện trải nghiệm người dùng tổng thể trên toàn site và các access flow kết nối.",
      ] },
      { title: "4. Dịch vụ bên thứ ba", body: [
        "Spectrum Cheat có thể dùng nhà cung cấp bên thứ ba cho lưu trữ, thanh toán, xử lý chi trả, giao key, định tuyến shortlink, phân tích, liên lạc và quản lý cộng đồng.",
        "Các nhà cung cấp đó có thể thu thập và xử lý thông tin theo điều khoản và chính sách bảo mật riêng của họ. Spectrum Cheat không kiểm soát mọi cách xử lý dữ liệu mà dịch vụ bên thứ ba sử dụng.",
      ] },
      { title: "5. Cookie và tín hiệu kỹ thuật", body: [
        "Website và dịch vụ kết nối có thể dùng cookie, bộ nhớ trình duyệt, dữ liệu giới thiệu và các tín hiệu kỹ thuật tương tự để giữ phiên ổn định, cải thiện luồng giao hàng, đo lưu lượng và giảm hành vi lạm dụng.",
        "Nếu trình duyệt của bạn chặn một số công cụ này, một số khu vực của dịch vụ có thể không hoạt động như mong đợi.",
      ] },
      { title: "6. Lưu trữ dữ liệu", body: [
        "Thông tin chỉ được lưu trong thời gian hợp lý cần thiết để vận hành dịch vụ, điều tra lạm dụng, giải quyết tranh chấp, duy trì nhật ký hoặc tuân thủ yêu cầu pháp lý và vận hành.",
        "Một số dữ liệu có thể vẫn còn trong bản sao lưu, nhật ký hoặc hệ thống nhà cung cấp bên thứ ba trong thời gian giới hạn ngay cả sau khi ngừng sử dụng.",
      ] },
      { title: "7. Chia sẻ dữ liệu", body: [
        "Spectrum Cheat không bán thông tin cá nhân của bạn như một sản phẩm kinh doanh độc lập.",
        "Thông tin vẫn có thể được chia sẻ khi cần để xử lý thanh toán, cấp quyền truy cập dịch vụ, bảo vệ nền tảng, thực thi điều khoản, điều tra lạm dụng hoặc tuân thủ nghĩa vụ pháp lý.",
      ] },
      { title: "8. Bảo mật", body: [
        "Chúng tôi áp dụng các bước kỹ thuật và vận hành hợp lý để giảm truy cập trái phép, lạm dụng và lộ lọt ngoài ý muốn. Không dịch vụ trực tuyến nào có thể đảm bảo an toàn tuyệt đối, nhưng Spectrum Cheat nỗ lực bảo vệ thông tin liên quan đến dịch vụ bằng các biện pháp thiết thực.",
      ] },
      { title: "9. Lựa chọn của bạn", body: [
        "Bạn có thể hạn chế một số theo dõi dựa trên trình duyệt qua cài đặt trình duyệt của mình và có thể ngừng dùng site bất cứ lúc nào.",
        "Nếu có thắc mắc về thông tin liên quan đến một giao dịch mua, yêu cầu hỗ trợ hoặc sự kiện truy cập, hãy liên hệ Spectrum qua các kênh chính thức trên website hoặc máy chủ Discord.",
      ] },
      { title: "10. Cập nhật chính sách", body: [
        "Chính sách bảo mật này có thể được cập nhật theo thời gian. Phiên bản mới nhất được đăng trên trang này sẽ điều chỉnh việc sử dụng website và dịch vụ liên quan trong tương lai trừ khi có quy định khác.",
      ] },
    ],
  },
  pt: {
    title: "Política de Privacidade",
    subtitle:
      "Esta política explica quais informações o Spectrum Cheat pode coletar, como são usadas para operar o serviço e as medidas práticas adotadas para proteger acesso, suporte e entrega.",
    effective: "Em vigor 12 de abril de 2026",
    sections: [
      { title: "1. Visão Geral", body: [
        "Esta Política de Privacidade explica como o Spectrum Cheat pode coletar, usar, armazenar e proteger informações quando você visita spectrumcheat.com, usa fluxos de compra relacionados, acessa rotas de key ou interage com canais oficiais do serviço.",
        "Ao usar o site ou os serviços conectados, você concorda com as práticas de dados descritas nesta política.",
      ] },
      { title: "2. Informações que Podemos Coletar", body: [
        "Dependendo de como você usa o serviço, o Spectrum Cheat pode coletar informações diretamente de você ou por meio de plataformas terceiras conectadas.",
      ], bullets: [
        "Informações básicas de contato ou suporte que você fornece pelo Discord ou outros canais de suporte.",
        "Informações relacionadas à compra, como seleção de plano, referências de transação, status de entrega ou horário de acesso.",
        "Informações técnicas, como tipo de navegador, tipo de dispositivo, endereço IP, caminho de referência, carimbos de data/hora ou páginas visitadas.",
        "Informações de rota de key e fluxo de acesso necessárias para verificar elegibilidade ou reduzir abuso.",
      ] },
      { title: "3. Como as Informações São Usadas", body: [
        "O Spectrum Cheat usa as informações coletadas apenas para fins legítimos de operação do serviço, suporte, segurança e melhoria.",
      ], bullets: [
        "Fornecer acesso a planos comprados ou serviços digitais.",
        "Responder a dúvidas de suporte e solicitações de usuários.",
        "Detectar abuso, fraude, acesso duplicado, mau uso de chargeback ou comportamento suspeito.",
        "Monitorar o desempenho do site, a saúde das rotas e a confiabilidade do serviço.",
        "Melhorar a experiência geral do usuário no site e nos fluxos de acesso conectados.",
      ] },
      { title: "4. Serviços de Terceiros", body: [
        "O Spectrum Cheat pode usar provedores terceiros para hospedagem, checkout, processamento de pagamento, entrega de key, roteamento de shortlink, análise, comunicação e gestão da comunidade.",
        "Esses provedores podem coletar e processar informações sob seus próprios termos e políticas de privacidade. O Spectrum Cheat não controla todas as práticas de dados usadas por serviços terceiros.",
      ] },
      { title: "5. Cookies e Sinais Técnicos", body: [
        "O site e os serviços conectados podem usar cookies, armazenamento do navegador, dados de referência e sinais técnicos semelhantes para manter sessões estáveis, melhorar fluxos de entrega, medir tráfego e reduzir comportamento abusivo.",
        "Se o seu navegador bloquear algumas dessas ferramentas, certas áreas do serviço podem não funcionar como esperado.",
      ] },
      { title: "6. Retenção de Dados", body: [
        "As informações são retidas apenas pelo tempo razoavelmente necessário para operar o serviço, investigar abuso, resolver disputas, manter registros ou cumprir requisitos legais e operacionais.",
        "Alguns dados podem permanecer em backups, registros ou sistemas de provedores terceiros por um período limitado mesmo após o fim do uso ativo.",
      ] },
      { title: "7. Compartilhamento de Dados", body: [
        "O Spectrum Cheat não vende suas informações pessoais como um produto comercial independente.",
        "As informações ainda podem ser compartilhadas quando necessário para processar pagamentos, entregar acesso ao serviço, proteger a plataforma, aplicar os termos, investigar abuso ou cumprir obrigações legais.",
      ] },
      { title: "8. Segurança", body: [
        "Usamos medidas técnicas e operacionais razoáveis para reduzir acesso não autorizado, abuso e exposição acidental. Nenhum serviço baseado na internet pode garantir segurança absoluta, mas o Spectrum Cheat trabalha para proteger as informações relacionadas ao serviço com salvaguardas práticas.",
      ] },
      { title: "9. Suas Escolhas", body: [
        "Você pode limitar parte do rastreamento baseado no navegador por meio das próprias configurações do navegador e pode parar de usar o site a qualquer momento.",
        "Se tiver dúvidas sobre informações ligadas a uma compra, solicitação de suporte ou evento de acesso, entre em contato com o Spectrum pelas rotas oficiais do site ou pelo servidor do Discord.",
      ] },
      { title: "10. Atualizações da Política", body: [
        "Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente publicada nesta página regerá o uso futuro do site e dos serviços relacionados, salvo indicação em contrário.",
      ] },
    ],
  },
};

export function PrivacyClient() {
  const { lang } = useLang();
  const doc = CONTENT[lang] ?? CONTENT.en;
  return (
    <SubpageShell badge="Spectrum Cheat // Legal" title={doc.title} subtitle={doc.subtitle}>
      <div className="legal-meta">
        <span className="subpage-chip">{doc.effective}</span>
        <span className="subpage-chip">Spectrum Cheat</span>
      </div>
      <div className="legal-stack">
        {doc.sections.map((section) => (
          <section key={section.title} className="subpage-card legal-card">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="legal-list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </SubpageShell>
  );
}
