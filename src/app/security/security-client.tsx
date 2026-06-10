"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { Lang } from "../_i18n/translations";

type Section = { title: string; body: string[]; bullets?: string[] };
type Doc = { title: string; subtitle: string; effective: string; sections: Section[] };

const CONTENT: Record<Lang, Doc> = {
  en: {
    title: "Security",
    subtitle:
      "This page outlines how Spectrum approaches service protection, access-flow safety, delivery controls, and the shared responsibilities that help keep the platform stable and secure.",
    effective: "Effective April 12, 2026",
    sections: [
      { title: "1. Security Approach", body: [
        "Spectrum Cheat is designed around practical service protection. We work to keep the website, access routes, and connected delivery flows stable, monitored, and resistant to common abuse patterns.",
        "Security is treated as an ongoing process rather than a one-time setup, which means protection measures may evolve over time without separate notice.",
      ] },
      { title: "2. Access and Delivery Protection", body: [
        "We use controlled access routes, active status tracking, and monitored delivery steps to help keep Spectrum distribution cleaner and more reliable.",
      ], bullets: [
        "Key routes may be adjusted, rotated, limited, or replaced when needed.",
        "Some access paths may require third-party verification or checkpoint steps before activation.",
        "Suspicious behavior, repeated abuse, or unusual traffic may result in rate limits, blocks, or additional checks.",
      ] },
      { title: "3. Payment and Checkout Safety", body: [
        "Spectrum Cheat may rely on third-party stores, payment processors, or checkout systems to handle billing. Those providers are responsible for their own payment infrastructure and transaction handling.",
        "We do not publish or intentionally store more payment information than is needed to confirm delivery and support service-related issues.",
      ] },
      { title: "4. Website and Infrastructure Controls", body: [
        "Reasonable security measures may include DNS protection, HTTPS, route isolation, provider-level abuse filtering, platform monitoring, and routine configuration updates when necessary.",
        "Not every protection measure is publicly documented, and some may be changed or tightened without prior notice for security reasons.",
      ] },
      { title: "5. Account, Device, and User Responsibility", body: [
        "Users are responsible for protecting their own Discord account, purchase details, executor environment, browser session, and any device used to access Spectrum services.",
      ], bullets: [
        "Do not share keys, access routes, or protected delivery content.",
        "Do not use unofficial mirrors or copied service pages claiming to represent Spectrum.",
        "Report suspicious links, impersonation, or unexpected checkout behavior through official support channels.",
      ] },
      { title: "6. Incident Response", body: [
        "If a delivery path, route, or service layer becomes unstable, Spectrum may temporarily pause or modify access while the issue is investigated.",
        "Where appropriate, status updates may be reflected on the website, through Discord, or through other official communication routes.",
      ] },
      { title: "7. No Absolute Guarantee", body: [
        "Although we work to keep the service protected, no website, network, provider, or digital delivery system can guarantee complete immunity from outages, attacks, misuse, or platform-level changes.",
        "Users should understand that reasonable safeguards reduce risk but do not eliminate it completely.",
      ] },
      { title: "8. Reporting Security Concerns", body: [
        "If you discover a security issue affecting the website, access routes, or purchase flow, report it through the official Spectrum Discord or any official contact route linked on spectrumcheat.com. Please do not publicly disclose active security issues before giving the service a chance to review them.",
      ] },
    ],
  },
  th: {
    title: "ความปลอดภัย",
    subtitle:
      "หน้านี้อธิบายแนวทางที่ Spectrum ใช้ปกป้องบริการ ความปลอดภัยของ access flow การควบคุมการส่งมอบ และความรับผิดชอบร่วมที่ช่วยให้แพลตฟอร์มเสถียรและปลอดภัย",
    effective: "มีผลบังคับใช้ 12 เมษายน 2026",
    sections: [
      { title: "1. แนวทางด้านความปลอดภัย", body: [
        "Spectrum Cheat ออกแบบโดยเน้นการปกป้องบริการที่ใช้ได้จริง เราพยายามรักษาเว็บไซต์ เส้นทางการเข้าถึง และ flow การส่งมอบที่เชื่อมต่อให้เสถียร มีการเฝ้าระวัง และทนต่อรูปแบบการใช้ในทางที่ผิดทั่วไป",
        "ความปลอดภัยถือเป็นกระบวนการต่อเนื่อง ไม่ใช่การตั้งค่าครั้งเดียว ซึ่งหมายความว่ามาตรการป้องกันอาจพัฒนาเปลี่ยนแปลงไปตามเวลาโดยไม่แจ้งแยกต่างหาก",
      ] },
      { title: "2. การปกป้องการเข้าถึงและการส่งมอบ", body: [
        "เราใช้เส้นทางการเข้าถึงที่ควบคุมได้ การติดตามสถานะแบบเรียลไทม์ และขั้นตอนการส่งมอบที่เฝ้าระวัง เพื่อช่วยให้การกระจาย Spectrum สะอาดและน่าเชื่อถือมากขึ้น",
      ], bullets: [
        "key route อาจถูกปรับ หมุนเวียน จำกัด หรือเปลี่ยนเมื่อจำเป็น",
        "เส้นทางการเข้าถึงบางอย่างอาจต้องมีการยืนยันจากบุคคลที่สามหรือขั้นตอนเช็คพอยต์ก่อนเปิดใช้งาน",
        "พฤติกรรมน่าสงสัย การใช้ในทางที่ผิดซ้ำๆ หรือทราฟฟิกผิดปกติ อาจส่งผลให้มีการจำกัดอัตรา บล็อก หรือการตรวจสอบเพิ่มเติม",
      ] },
      { title: "3. ความปลอดภัยของการชำระเงินและ checkout", body: [
        "Spectrum Cheat อาจใช้ร้านค้า ผู้ประมวลผลการชำระเงิน หรือระบบ checkout ของบุคคลที่สามในการจัดการการเรียกเก็บเงิน ผู้ให้บริการเหล่านั้นรับผิดชอบโครงสร้างการชำระเงินและการจัดการธุรกรรมของตนเอง",
        "เราไม่เผยแพร่หรือจงใจเก็บข้อมูลการชำระเงินมากเกินกว่าที่จำเป็นในการยืนยันการส่งมอบและซัพพอร์ตปัญหาที่เกี่ยวกับบริการ",
      ] },
      { title: "4. การควบคุมเว็บไซต์และโครงสร้างพื้นฐาน", body: [
        "มาตรการความปลอดภัยตามสมควรอาจรวมถึงการป้องกัน DNS, HTTPS, การแยก route, การกรองการใช้ในทางที่ผิดระดับผู้ให้บริการ, การเฝ้าระวังแพลตฟอร์ม และการอัปเดตการตั้งค่าเป็นประจำเมื่อจำเป็น",
        "ไม่ใช่ทุกมาตรการป้องกันที่เปิดเผยต่อสาธารณะ และบางอย่างอาจถูกเปลี่ยนหรือเข้มงวดขึ้นโดยไม่แจ้งล่วงหน้าด้วยเหตุผลด้านความปลอดภัย",
      ] },
      { title: "5. ความรับผิดชอบของบัญชี อุปกรณ์ และผู้ใช้", body: [
        "ผู้ใช้มีหน้าที่ปกป้องบัญชี Discord ของตนเอง ข้อมูลการซื้อ สภาพแวดล้อม executor เซสชันเบราว์เซอร์ และอุปกรณ์ใดๆ ที่ใช้เข้าถึงบริการ Spectrum",
      ], bullets: [
        "ห้ามแชร์คีย์ เส้นทางการเข้าถึง หรือเนื้อหาการส่งมอบที่ได้รับการป้องกัน",
        "ห้ามใช้มิเรอร์ที่ไม่เป็นทางการหรือหน้าบริการที่คัดลอกมาซึ่งอ้างว่าเป็นตัวแทนของ Spectrum",
        "รายงานลิงก์น่าสงสัย การแอบอ้าง หรือพฤติกรรม checkout ที่ผิดปกติ ผ่านช่องทางซัพพอร์ตทางการ",
      ] },
      { title: "6. การรับมือเหตุการณ์", body: [
        "หากเส้นทางการส่งมอบ route หรือชั้นบริการเกิดไม่เสถียร Spectrum อาจหยุดหรือปรับการเข้าถึงชั่วคราวระหว่างตรวจสอบปัญหา",
        "ในกรณีที่เหมาะสม การอัปเดตสถานะอาจแสดงบนเว็บไซต์ ผ่าน Discord หรือช่องทางสื่อสารทางการอื่นๆ",
      ] },
      { title: "7. ไม่มีการรับประกันแบบสมบูรณ์", body: [
        "แม้เราจะพยายามปกป้องบริการ แต่ไม่มีเว็บไซต์ เครือข่าย ผู้ให้บริการ หรือระบบส่งมอบดิจิทัลใดที่รับประกันการปลอดภัยจากการขัดข้อง การโจมตี การใช้ในทางที่ผิด หรือการเปลี่ยนแปลงระดับแพลตฟอร์มได้อย่างสมบูรณ์",
        "ผู้ใช้ควรเข้าใจว่ามาตรการป้องกันตามสมควรช่วยลดความเสี่ยง แต่ไม่ได้กำจัดความเสี่ยงทั้งหมด",
      ] },
      { title: "8. การรายงานปัญหาด้านความปลอดภัย", body: [
        "หากคุณพบปัญหาด้านความปลอดภัยที่ส่งผลต่อเว็บไซต์ เส้นทางการเข้าถึง หรือขั้นตอนการซื้อ โปรดรายงานผ่าน Discord ทางการของ Spectrum หรือช่องทางติดต่อทางการที่ลิงก์ไว้บน spectrumcheat.com โปรดอย่าเปิดเผยปัญหาความปลอดภัยที่ยังใช้งานอยู่ต่อสาธารณะก่อนให้โอกาสทีมงานตรวจสอบ",
      ] },
    ],
  },
  zh: {
    title: "安全",
    subtitle:
      "本页面概述 Spectrum 如何进行服务保护、访问流程安全、交付控制，以及帮助保持平台稳定与安全的共同责任。",
    effective: "生效日期 2026年4月12日",
    sections: [
      { title: "1. 安全方针", body: [
        "Spectrum Cheat 以切实可行的服务保护为核心进行设计。我们努力保持网站、访问途径和关联交付流程稳定、受监控，并能抵御常见的滥用模式。",
        "安全被视为一个持续的过程，而非一次性设置，这意味着保护措施可能随时间演变，且不另行通知。",
      ] },
      { title: "2. 访问与交付保护", body: [
        "我们使用受控的访问途径、实时状态跟踪和受监控的交付步骤，帮助让 Spectrum 的分发更干净、更可靠。",
      ], bullets: [
        "密钥途径可能会在需要时调整、轮换、限制或替换。",
        "某些访问路径在激活前可能需要第三方验证或检查点步骤。",
        "可疑行为、反复滥用或异常流量可能导致速率限制、封锁或额外检查。",
      ] },
      { title: "3. 支付与结账安全", body: [
        "Spectrum Cheat 可能依赖第三方商店、支付处理商或结账系统来处理计费。这些提供商对其自身的支付基础设施和交易处理负责。",
        "我们不会发布或刻意存储超过确认交付和支持服务相关问题所需的支付信息。",
      ] },
      { title: "4. 网站与基础设施控制", body: [
        "合理的安全措施可能包括 DNS 保护、HTTPS、途径隔离、提供商级别的滥用过滤、平台监控，以及必要时的常规配置更新。",
        "并非每项保护措施都公开记录，出于安全原因，部分措施可能在不另行通知的情况下更改或加强。",
      ] },
      { title: "5. 账户、设备与用户责任", body: [
        "用户有责任保护自己的 Discord 账户、购买详情、执行器环境、浏览器会话，以及用于访问 Spectrum 服务的任何设备。",
      ], bullets: [
        "不要分享密钥、访问途径或受保护的交付内容。",
        "不要使用声称代表 Spectrum 的非官方镜像或复制的服务页面。",
        "通过官方支持渠道举报可疑链接、冒充或异常的结账行为。",
      ] },
      { title: "6. 事件响应", body: [
        "如果交付路径、途径或服务层变得不稳定，Spectrum 可能在调查问题期间临时暂停或修改访问。",
        "在适当情况下，状态更新可能会在网站、通过 Discord 或其他官方沟通途径反映出来。",
      ] },
      { title: "7. 无绝对保证", body: [
        "尽管我们努力保护服务，但没有任何网站、网络、提供商或数字交付系统能保证完全免于中断、攻击、滥用或平台级变更。",
        "用户应理解，合理的保护措施可降低风险，但无法完全消除风险。",
      ] },
      { title: "8. 报告安全问题", body: [
        "如果你发现影响网站、访问途径或购买流程的安全问题，请通过 Spectrum 官方 Discord 或 spectrumcheat.com 上链接的任何官方联系途径报告。在给服务方审查机会之前，请勿公开披露仍在生效的安全问题。",
      ] },
    ],
  },
  vi: {
    title: "Bảo mật",
    subtitle:
      "Trang này phác thảo cách Spectrum tiếp cận việc bảo vệ dịch vụ, an toàn của access flow, kiểm soát giao hàng và các trách nhiệm chung giúp giữ nền tảng ổn định và an toàn.",
    effective: "Có hiệu lực ngày 12 tháng 4, 2026",
    sections: [
      { title: "1. Cách tiếp cận bảo mật", body: [
        "Spectrum Cheat được thiết kế xoay quanh việc bảo vệ dịch vụ một cách thực tế. Chúng tôi nỗ lực giữ cho website, các đường truy cập và luồng giao hàng kết nối luôn ổn định, được giám sát và chống lại các kiểu lạm dụng phổ biến.",
        "Bảo mật được xem là một quá trình liên tục chứ không phải thiết lập một lần, nghĩa là các biện pháp bảo vệ có thể thay đổi theo thời gian mà không cần thông báo riêng.",
      ] },
      { title: "2. Bảo vệ truy cập và giao hàng", body: [
        "Chúng tôi dùng các đường truy cập có kiểm soát, theo dõi trạng thái trực tiếp và các bước giao hàng được giám sát để giúp việc phân phối Spectrum sạch hơn và đáng tin cậy hơn.",
      ], bullets: [
        "Key route có thể được điều chỉnh, luân phiên, giới hạn hoặc thay thế khi cần.",
        "Một số đường truy cập có thể yêu cầu xác minh bên thứ ba hoặc các bước checkpoint trước khi kích hoạt.",
        "Hành vi đáng ngờ, lạm dụng lặp lại hoặc lưu lượng bất thường có thể dẫn đến giới hạn tốc độ, chặn hoặc kiểm tra bổ sung.",
      ] },
      { title: "3. An toàn thanh toán và checkout", body: [
        "Spectrum Cheat có thể dựa vào cửa hàng, bộ xử lý thanh toán hoặc hệ thống checkout của bên thứ ba để xử lý hóa đơn. Các nhà cung cấp đó chịu trách nhiệm về hạ tầng thanh toán và xử lý giao dịch của riêng họ.",
        "Chúng tôi không công bố hoặc cố ý lưu trữ nhiều thông tin thanh toán hơn mức cần thiết để xác nhận giao hàng và hỗ trợ các vấn đề liên quan đến dịch vụ.",
      ] },
      { title: "4. Kiểm soát website và hạ tầng", body: [
        "Các biện pháp bảo mật hợp lý có thể bao gồm bảo vệ DNS, HTTPS, cô lập route, lọc lạm dụng ở cấp nhà cung cấp, giám sát nền tảng và cập nhật cấu hình định kỳ khi cần.",
        "Không phải mọi biện pháp bảo vệ đều được ghi nhận công khai, và một số có thể bị thay đổi hoặc siết chặt mà không báo trước vì lý do bảo mật.",
      ] },
      { title: "5. Trách nhiệm của tài khoản, thiết bị và người dùng", body: [
        "Người dùng có trách nhiệm bảo vệ tài khoản Discord của mình, chi tiết mua hàng, môi trường executor, phiên trình duyệt và bất kỳ thiết bị nào dùng để truy cập dịch vụ Spectrum.",
      ], bullets: [
        "Không chia sẻ key, đường truy cập hoặc nội dung giao hàng được bảo vệ.",
        "Không dùng các bản sao không chính thức hoặc trang dịch vụ sao chép tự nhận là đại diện cho Spectrum.",
        "Báo cáo liên kết đáng ngờ, mạo danh hoặc hành vi checkout bất thường qua kênh hỗ trợ chính thức.",
      ] },
      { title: "6. Ứng phó sự cố", body: [
        "Nếu một đường giao hàng, route hoặc lớp dịch vụ trở nên không ổn định, Spectrum có thể tạm dừng hoặc điều chỉnh truy cập trong khi điều tra vấn đề.",
        "Khi thích hợp, các cập nhật trạng thái có thể được phản ánh trên website, qua Discord hoặc các kênh liên lạc chính thức khác.",
      ] },
      { title: "7. Không bảo đảm tuyệt đối", body: [
        "Dù chúng tôi nỗ lực bảo vệ dịch vụ, không website, mạng, nhà cung cấp hay hệ thống giao hàng kỹ thuật số nào có thể đảm bảo hoàn toàn miễn nhiễm với sự cố, tấn công, lạm dụng hoặc thay đổi ở cấp nền tảng.",
        "Người dùng nên hiểu rằng các biện pháp bảo vệ hợp lý làm giảm rủi ro nhưng không loại bỏ hoàn toàn.",
      ] },
      { title: "8. Báo cáo lo ngại bảo mật", body: [
        "Nếu bạn phát hiện vấn đề bảo mật ảnh hưởng đến website, đường truy cập hoặc quy trình mua hàng, hãy báo cáo qua Discord chính thức của Spectrum hoặc bất kỳ kênh liên hệ chính thức nào được liên kết trên spectrumcheat.com. Vui lòng không công khai các vấn đề bảo mật còn hiệu lực trước khi cho đội ngũ cơ hội xem xét.",
      ] },
    ],
  },
  pt: {
    title: "Segurança",
    subtitle:
      "Esta página descreve como o Spectrum aborda a proteção do serviço, a segurança do fluxo de acesso, os controles de entrega e as responsabilidades compartilhadas que ajudam a manter a plataforma estável e segura.",
    effective: "Em vigor 12 de abril de 2026",
    sections: [
      { title: "1. Abordagem de Segurança", body: [
        "O Spectrum Cheat é projetado em torno da proteção prática do serviço. Trabalhamos para manter o site, as rotas de acesso e os fluxos de entrega conectados estáveis, monitorados e resistentes a padrões comuns de abuso.",
        "A segurança é tratada como um processo contínuo, e não como uma configuração única, o que significa que as medidas de proteção podem evoluir com o tempo sem aviso separado.",
      ] },
      { title: "2. Proteção de Acesso e Entrega", body: [
        "Usamos rotas de acesso controladas, acompanhamento de status ao vivo e etapas de entrega monitoradas para ajudar a manter a distribuição do Spectrum mais limpa e confiável.",
      ], bullets: [
        "As rotas de key podem ser ajustadas, rotacionadas, limitadas ou substituídas quando necessário.",
        "Alguns caminhos de acesso podem exigir verificação de terceiros ou etapas de checkpoint antes da ativação.",
        "Comportamento suspeito, abuso repetido ou tráfego incomum podem resultar em limites de taxa, bloqueios ou verificações adicionais.",
      ] },
      { title: "3. Segurança de Pagamento e Checkout", body: [
        "O Spectrum Cheat pode depender de lojas, processadores de pagamento ou sistemas de checkout de terceiros para lidar com a cobrança. Esses provedores são responsáveis por sua própria infraestrutura de pagamento e tratamento de transações.",
        "Não publicamos nem armazenamos intencionalmente mais informações de pagamento do que o necessário para confirmar a entrega e dar suporte a questões relacionadas ao serviço.",
      ] },
      { title: "4. Controles de Site e Infraestrutura", body: [
        "Medidas de segurança razoáveis podem incluir proteção de DNS, HTTPS, isolamento de rotas, filtragem de abuso em nível de provedor, monitoramento da plataforma e atualizações de configuração de rotina quando necessário.",
        "Nem toda medida de proteção é documentada publicamente, e algumas podem ser alteradas ou reforçadas sem aviso prévio por motivos de segurança.",
      ] },
      { title: "5. Responsabilidade da Conta, do Dispositivo e do Usuário", body: [
        "Os usuários são responsáveis por proteger sua própria conta do Discord, detalhes de compra, ambiente do executor, sessão do navegador e qualquer dispositivo usado para acessar os serviços Spectrum.",
      ], bullets: [
        "Não compartilhe keys, rotas de acesso ou conteúdo de entrega protegido.",
        "Não use espelhos não oficiais ou páginas de serviço copiadas que afirmam representar o Spectrum.",
        "Relate links suspeitos, falsificação de identidade ou comportamento inesperado de checkout pelos canais oficiais de suporte.",
      ] },
      { title: "6. Resposta a Incidentes", body: [
        "Se um caminho de entrega, rota ou camada de serviço ficar instável, o Spectrum pode pausar ou modificar temporariamente o acesso enquanto o problema é investigado.",
        "Quando apropriado, atualizações de status podem ser refletidas no site, pelo Discord ou por outras rotas oficiais de comunicação.",
      ] },
      { title: "7. Sem Garantia Absoluta", body: [
        "Embora trabalhemos para manter o serviço protegido, nenhum site, rede, provedor ou sistema de entrega digital pode garantir imunidade completa contra interrupções, ataques, uso indevido ou mudanças em nível de plataforma.",
        "Os usuários devem entender que salvaguardas razoáveis reduzem o risco, mas não o eliminam completamente.",
      ] },
      { title: "8. Relatar Preocupações de Segurança", body: [
        "Se você descobrir um problema de segurança que afete o site, as rotas de acesso ou o fluxo de compra, relate pelo Discord oficial do Spectrum ou por qualquer rota de contato oficial vinculada em spectrumcheat.com. Não divulgue publicamente problemas de segurança ativos antes de dar ao serviço a chance de analisá-los.",
      ] },
    ],
  },
};

export function SecurityClient() {
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
