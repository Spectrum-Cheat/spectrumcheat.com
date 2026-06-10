"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { Lang } from "../_i18n/translations";

type Section = { title: string; body: string[]; bullets?: string[] };
type Doc = { title: string; subtitle: string; effective: string; sections: Section[] };

const CONTENT: Record<Lang, Doc> = {
  en: {
    title: "Refund Policy",
    subtitle:
      "This policy explains how Spectrum handles refund requests, which cases may be reviewed, and why most delivered digital access purchases are treated as final.",
    effective: "Effective April 12, 2026",
    sections: [
      { title: "1. Digital Product Policy", body: [
        "Spectrum Cheat sells digital access, plans, keys, and related service routes. Because these are digital goods and are typically delivered quickly after purchase, all sales are generally treated as final once delivery or activation has started.",
      ] },
      { title: "2. Cases Where a Refund May Be Considered", body: [
        "Refunds are not guaranteed, but Spectrum may review refund requests in limited situations where a purchase clearly failed in a way that could not reasonably be corrected.",
      ], bullets: [
        "Duplicate charges for the same purchase.",
        "A successful payment with no delivered access and no workable replacement route.",
        "A billing error clearly caused by the service or checkout flow.",
      ] },
      { title: "3. Cases That Normally Do Not Qualify", body: [
        "The following situations normally do not qualify for a refund once access has been delivered, activated, or made available:",
      ], bullets: [
        "You changed your mind after purchase.",
        "You failed to use the service during the active access period.",
        "A game later moved into Waiting for Update or Discontinued status after your purchase.",
        "Your executor, device, Discord account, or local environment prevented proper use.",
        "You were removed or limited due to abuse, redistribution, fraud, or a violation of the Terms of Service.",
        "You did not read the plan description, duration, or listed requirements before checkout.",
      ] },
      { title: "4. Subscription and Time-Based Access", body: [
        "Weekly, monthly, quarterly, and other time-based plans begin when access is delivered or activated. Unused time is not refundable simply because the service was not used during that period.",
        "Temporary maintenance, short downtime, patch work, or route changes do not automatically qualify a purchase for refund treatment.",
      ] },
      { title: "5. Third-Party Providers", body: [
        "Some purchases, unlock routes, or billing actions may involve third-party systems. Those services may apply their own payment, dispute, or review rules in addition to this policy.",
        "Spectrum Cheat is not responsible for delays or limitations created by external providers once a transaction has left the website and entered a third-party system.",
      ] },
      { title: "6. Chargebacks and Payment Disputes", body: [
        "Filing a false or abusive chargeback after successful delivery may result in permanent loss of access, denial of future purchases, and removal from related service channels.",
        "If there is a real issue with a purchase, contact support first and allow a reasonable review period before opening a formal dispute.",
      ] },
      { title: "7. How to Request Review", body: [
        "If you believe your purchase qualifies for review, contact Spectrum through the official Discord or official website routes and include enough information to identify the order and issue.",
      ], bullets: [
        "Purchase date and plan name.",
        "Transaction reference or payment proof when available.",
        "A short explanation of what happened.",
        "Any relevant screenshots showing the failed delivery or billing problem.",
      ] },
      { title: "8. Policy Changes", body: [
        "This Refund Policy may be updated from time to time. The version published on this page will control future review requests unless stated otherwise.",
      ] },
    ],
  },
  th: {
    title: "นโยบายคืนเงิน",
    subtitle:
      "นโยบายนี้อธิบายว่า Spectrum จัดการคำขอคืนเงินอย่างไร กรณีใดที่อาจได้รับการพิจารณา และทำไมการซื้อสิทธิ์เข้าถึงดิจิทัลที่ส่งมอบแล้วส่วนใหญ่จึงถือเป็นที่สิ้นสุด",
    effective: "มีผลบังคับใช้ 12 เมษายน 2026",
    sections: [
      { title: "1. นโยบายสินค้าดิจิทัล", body: [
        "Spectrum Cheat ขายสิทธิ์เข้าถึงดิจิทัล แพ็กเกจ คีย์ และเส้นทางบริการที่เกี่ยวข้อง เนื่องจากเป็นสินค้าดิจิทัลและมักส่งมอบอย่างรวดเร็วหลังการซื้อ การขายทั้งหมดจึงถือเป็นที่สิ้นสุดเมื่อการส่งมอบหรือการเปิดใช้งานเริ่มขึ้นแล้ว",
      ] },
      { title: "2. กรณีที่อาจพิจารณาคืนเงิน", body: [
        "การคืนเงินไม่ได้รับประกัน แต่ Spectrum อาจพิจารณาคำขอคืนเงินในสถานการณ์จำกัดที่การซื้อล้มเหลวอย่างชัดเจนในแบบที่ไม่สามารถแก้ไขได้ตามสมควร",
      ], bullets: [
        "ถูกเรียกเก็บเงินซ้ำสำหรับการซื้อเดียวกัน",
        "ชำระเงินสำเร็จแต่ไม่ได้รับสิทธิ์เข้าถึง และไม่มี route ทดแทนที่ใช้งานได้",
        "ข้อผิดพลาดด้านการเรียกเก็บเงินที่เกิดจากบริการหรือขั้นตอน checkout อย่างชัดเจน",
      ] },
      { title: "3. กรณีที่ปกติไม่เข้าเงื่อนไข", body: [
        "สถานการณ์ต่อไปนี้ปกติไม่เข้าเงื่อนไขการคืนเงิน เมื่อสิทธิ์เข้าถึงถูกส่งมอบ เปิดใช้งาน หรือพร้อมให้ใช้แล้ว:",
      ], bullets: [
        "คุณเปลี่ยนใจหลังการซื้อ",
        "คุณไม่ได้ใช้บริการในช่วงเวลาที่เปิดใช้งานอยู่",
        "เกมเปลี่ยนสถานะเป็น รอการอัปเดต หรือ ยกเลิกการรองรับ ภายหลังการซื้อของคุณ",
        "executor อุปกรณ์ บัญชี Discord หรือสภาพแวดล้อมในเครื่องของคุณทำให้ใช้งานไม่ได้ตามปกติ",
        "คุณถูกถอดหรือจำกัดเนื่องจากการใช้ในทางที่ผิด การแจกจ่ายซ้ำ การฉ้อโกง หรือการละเมิดข้อกำหนดการใช้งาน",
        "คุณไม่ได้อ่านรายละเอียดแพ็กเกจ ระยะเวลา หรือข้อกำหนดที่ระบุไว้ก่อน checkout",
      ] },
      { title: "4. การสมัครสมาชิกและการเข้าถึงตามเวลา", body: [
        "แพ็กเกจรายสัปดาห์ รายเดือน รายไตรมาส และแบบอิงเวลาอื่นๆ เริ่มนับเมื่อสิทธิ์เข้าถึงถูกส่งมอบหรือเปิดใช้งาน เวลาที่ไม่ได้ใช้ไม่สามารถขอคืนเงินได้เพียงเพราะไม่ได้ใช้บริการในช่วงนั้น",
        "การบำรุงรักษาชั่วคราว การหยุดทำงานช่วงสั้น การแพตช์ หรือการเปลี่ยน route ไม่ได้ทำให้การซื้อเข้าเงื่อนไขการคืนเงินโดยอัตโนมัติ",
      ] },
      { title: "5. ผู้ให้บริการบุคคลที่สาม", body: [
        "การซื้อ เส้นทางปลดล็อก หรือการเรียกเก็บเงินบางอย่างอาจเกี่ยวข้องกับระบบของบุคคลที่สาม บริการเหล่านั้นอาจใช้กฎด้านการชำระเงิน การโต้แย้ง หรือการพิจารณาของตนเองเพิ่มเติมจากนโยบายนี้",
        "Spectrum Cheat ไม่รับผิดชอบต่อความล่าช้าหรือข้อจำกัดที่เกิดจากผู้ให้บริการภายนอก เมื่อธุรกรรมออกจากเว็บไซต์และเข้าสู่ระบบของบุคคลที่สามแล้ว",
      ] },
      { title: "6. Chargeback และการโต้แย้งการชำระเงิน", body: [
        "การยื่น chargeback ที่เป็นเท็จหรือในทางที่ผิดหลังการส่งมอบสำเร็จ อาจส่งผลให้สูญเสียสิทธิ์เข้าถึงถาวร ถูกปฏิเสธการซื้อในอนาคต และถูกถอดออกจากช่องทางบริการที่เกี่ยวข้อง",
        "หากมีปัญหาจริงกับการซื้อ ให้ติดต่อซัพพอร์ตก่อนและให้เวลาพิจารณาตามสมควรก่อนเปิดการโต้แย้งอย่างเป็นทางการ",
      ] },
      { title: "7. วิธีขอการพิจารณา", body: [
        "หากคุณเชื่อว่าการซื้อของคุณเข้าเงื่อนไขการพิจารณา ติดต่อ Spectrum ผ่าน Discord ทางการหรือช่องทางทางการบนเว็บไซต์ พร้อมแนบข้อมูลที่เพียงพอในการระบุคำสั่งซื้อและปัญหา",
      ], bullets: [
        "วันที่ซื้อและชื่อแพ็กเกจ",
        "รหัสอ้างอิงธุรกรรมหรือหลักฐานการชำระเงินหากมี",
        "คำอธิบายสั้นๆ ว่าเกิดอะไรขึ้น",
        "ภาพหน้าจอที่เกี่ยวข้องซึ่งแสดงการส่งมอบที่ล้มเหลวหรือปัญหาการเรียกเก็บเงิน",
      ] },
      { title: "8. การเปลี่ยนแปลงนโยบาย", body: [
        "นโยบายคืนเงินนี้อาจมีการอัปเดตเป็นครั้งคราว เวอร์ชันที่เผยแพร่บนหน้านี้จะมีผลต่อคำขอพิจารณาในอนาคต เว้นแต่จะระบุไว้เป็นอย่างอื่น",
      ] },
    ],
  },
  zh: {
    title: "退款政策",
    subtitle:
      "本政策说明 Spectrum 如何处理退款请求、哪些情况可能被审查，以及为什么大多数已交付的数字访问购买被视为最终交易。",
    effective: "生效日期 2026年4月12日",
    sections: [
      { title: "1. 数字产品政策", body: [
        "Spectrum Cheat 销售数字访问权限、套餐、密钥及相关服务途径。由于这些是数字商品且通常在购买后迅速交付，因此一旦交付或激活开始，所有销售通常被视为最终交易。",
      ] },
      { title: "2. 可能考虑退款的情况", body: [
        "退款不被保证，但在购买明显失败且无法合理纠正的有限情况下，Spectrum 可能会审查退款请求。",
      ], bullets: [
        "同一笔购买被重复扣款。",
        "付款成功但未交付访问权限，且没有可用的替代途径。",
        "明显由服务或结账流程导致的计费错误。",
      ] },
      { title: "3. 通常不符合条件的情况", body: [
        "一旦访问权限已交付、激活或提供，以下情况通常不符合退款条件：",
      ], bullets: [
        "你在购买后改变了主意。",
        "你在有效访问期内未使用服务。",
        "某游戏在你购买后转为“等待更新”或“已停止支持”状态。",
        "你的执行器、设备、Discord 账户或本地环境导致无法正常使用。",
        "你因滥用、再分发、欺诈或违反服务条款而被移除或限制。",
        "你在结账前未阅读套餐说明、时长或所列要求。",
      ] },
      { title: "4. 订阅与基于时间的访问", body: [
        "周、月、季度及其他基于时间的套餐自访问交付或激活时开始。仅因在该期间未使用服务，未使用的时间不可退款。",
        "临时维护、短暂停机、补丁工作或途径变更不会自动使购买符合退款处理条件。",
      ] },
      { title: "5. 第三方提供商", body: [
        "某些购买、解锁途径或计费操作可能涉及第三方系统。这些服务可能在本政策之外另行适用其自身的支付、争议或审查规则。",
        "一旦交易离开网站并进入第三方系统，Spectrum Cheat 对外部提供商造成的延迟或限制不承担责任。",
      ] },
      { title: "6. 拒付与支付争议", body: [
        "在成功交付后提交虚假或滥用性的拒付，可能导致永久丧失访问权限、拒绝未来购买，以及被移出相关服务渠道。",
        "如果购买确实存在问题，请先联系支持并给予合理的审查期，再提起正式争议。",
      ] },
      { title: "7. 如何申请审查", body: [
        "如果你认为你的购买符合审查条件，请通过官方 Discord 或网站官方途径联系 Spectrum，并提供足以识别订单和问题的信息。",
      ], bullets: [
        "购买日期和套餐名称。",
        "交易凭证或付款证明（如有）。",
        "简短说明发生了什么。",
        "显示交付失败或计费问题的相关截图。",
      ] },
      { title: "8. 政策变更", body: [
        "本退款政策可能会不时更新。除非另有说明，本页面发布的版本将适用于今后的审查请求。",
      ] },
    ],
  },
  vi: {
    title: "Chính sách hoàn tiền",
    subtitle:
      "Chính sách này giải thích cách Spectrum xử lý yêu cầu hoàn tiền, những trường hợp có thể được xem xét, và vì sao hầu hết các giao dịch mua quyền truy cập kỹ thuật số đã giao được coi là cuối cùng.",
    effective: "Có hiệu lực ngày 12 tháng 4, 2026",
    sections: [
      { title: "1. Chính sách sản phẩm kỹ thuật số", body: [
        "Spectrum Cheat bán quyền truy cập kỹ thuật số, gói, key và các route dịch vụ liên quan. Vì đây là hàng kỹ thuật số và thường được giao nhanh sau khi mua, mọi giao dịch nhìn chung được coi là cuối cùng một khi việc giao hoặc kích hoạt đã bắt đầu.",
      ] },
      { title: "2. Trường hợp có thể được xem xét hoàn tiền", body: [
        "Hoàn tiền không được đảm bảo, nhưng Spectrum có thể xem xét yêu cầu hoàn tiền trong những tình huống hạn chế khi giao dịch mua rõ ràng thất bại theo cách không thể khắc phục hợp lý.",
      ], bullets: [
        "Bị tính phí trùng cho cùng một giao dịch mua.",
        "Thanh toán thành công nhưng không được giao quyền truy cập và không có route thay thế khả dụng.",
        "Lỗi tính phí rõ ràng do dịch vụ hoặc quy trình checkout gây ra.",
      ] },
      { title: "3. Trường hợp thường không đủ điều kiện", body: [
        "Các tình huống sau thường không đủ điều kiện hoàn tiền khi quyền truy cập đã được giao, kích hoạt hoặc cung cấp:",
      ], bullets: [
        "Bạn đổi ý sau khi mua.",
        "Bạn không sử dụng dịch vụ trong thời hạn truy cập đang hoạt động.",
        "Một game chuyển sang trạng thái Chờ cập nhật hoặc Ngừng hỗ trợ sau khi bạn mua.",
        "Executor, thiết bị, tài khoản Discord hoặc môi trường cục bộ của bạn khiến không dùng được đúng cách.",
        "Bạn bị xóa hoặc giới hạn do lạm dụng, tái phân phối, gian lận hoặc vi phạm Điều khoản dịch vụ.",
        "Bạn không đọc mô tả gói, thời hạn hoặc các yêu cầu được liệt kê trước khi checkout.",
      ] },
      { title: "4. Đăng ký và truy cập theo thời gian", body: [
        "Các gói theo tuần, tháng, quý và theo thời gian khác bắt đầu khi quyền truy cập được giao hoặc kích hoạt. Thời gian chưa dùng không được hoàn tiền chỉ vì dịch vụ không được sử dụng trong giai đoạn đó.",
        "Bảo trì tạm thời, ngừng ngắn, công việc vá lỗi hoặc thay đổi route không tự động khiến một giao dịch mua đủ điều kiện hoàn tiền.",
      ] },
      { title: "5. Nhà cung cấp bên thứ ba", body: [
        "Một số giao dịch mua, route mở khóa hoặc thao tác tính phí có thể liên quan đến hệ thống bên thứ ba. Các dịch vụ đó có thể áp dụng quy tắc thanh toán, tranh chấp hoặc xem xét riêng bổ sung cho chính sách này.",
        "Spectrum Cheat không chịu trách nhiệm về sự chậm trễ hoặc giới hạn do nhà cung cấp bên ngoài tạo ra một khi giao dịch đã rời website và vào hệ thống bên thứ ba.",
      ] },
      { title: "6. Chargeback và tranh chấp thanh toán", body: [
        "Việc nộp chargeback sai sự thật hoặc mang tính lạm dụng sau khi giao hàng thành công có thể dẫn đến mất quyền truy cập vĩnh viễn, bị từ chối mua hàng trong tương lai và bị xóa khỏi các kênh dịch vụ liên quan.",
        "Nếu có vấn đề thực sự với giao dịch mua, hãy liên hệ hỗ trợ trước và cho một khoảng thời gian xem xét hợp lý trước khi mở tranh chấp chính thức.",
      ] },
      { title: "7. Cách yêu cầu xem xét", body: [
        "Nếu bạn tin rằng giao dịch mua của mình đủ điều kiện xem xét, hãy liên hệ Spectrum qua Discord chính thức hoặc các kênh chính thức trên website và kèm đủ thông tin để xác định đơn hàng và vấn đề.",
      ], bullets: [
        "Ngày mua và tên gói.",
        "Mã giao dịch hoặc bằng chứng thanh toán nếu có.",
        "Giải thích ngắn gọn về điều đã xảy ra.",
        "Bất kỳ ảnh chụp màn hình liên quan nào cho thấy giao hàng thất bại hoặc vấn đề tính phí.",
      ] },
      { title: "8. Thay đổi chính sách", body: [
        "Chính sách hoàn tiền này có thể được cập nhật theo thời gian. Phiên bản được đăng trên trang này sẽ điều chỉnh các yêu cầu xem xét trong tương lai trừ khi có quy định khác.",
      ] },
    ],
  },
  pt: {
    title: "Política de Reembolso",
    subtitle:
      "Esta política explica como o Spectrum trata os pedidos de reembolso, quais casos podem ser analisados e por que a maioria das compras de acesso digital já entregues é tratada como final.",
    effective: "Em vigor 12 de abril de 2026",
    sections: [
      { title: "1. Política de Produto Digital", body: [
        "O Spectrum Cheat vende acesso digital, planos, keys e rotas de serviço relacionadas. Como são bens digitais e normalmente entregues rapidamente após a compra, todas as vendas são geralmente tratadas como finais assim que a entrega ou ativação começa.",
      ] },
      { title: "2. Casos em que um Reembolso Pode Ser Considerado", body: [
        "Reembolsos não são garantidos, mas o Spectrum pode analisar pedidos de reembolso em situações limitadas em que uma compra claramente falhou de uma forma que não poderia ser razoavelmente corrigida.",
      ], bullets: [
        "Cobranças duplicadas pela mesma compra.",
        "Um pagamento bem-sucedido sem acesso entregue e sem rota de substituição viável.",
        "Um erro de cobrança claramente causado pelo serviço ou pelo fluxo de checkout.",
      ] },
      { title: "3. Casos que Normalmente Não se Qualificam", body: [
        "As situações a seguir normalmente não se qualificam para reembolso depois que o acesso foi entregue, ativado ou disponibilizado:",
      ], bullets: [
        "Você mudou de ideia após a compra.",
        "Você não usou o serviço durante o período de acesso ativo.",
        "Um jogo passou para o status Aguardando Atualização ou Descontinuado após a sua compra.",
        "Seu executor, dispositivo, conta do Discord ou ambiente local impediu o uso adequado.",
        "Você foi removido ou limitado por abuso, redistribuição, fraude ou violação dos Termos de Serviço.",
        "Você não leu a descrição do plano, a duração ou os requisitos listados antes do checkout.",
      ] },
      { title: "4. Assinatura e Acesso por Tempo", body: [
        "Planos semanais, mensais, trimestrais e outros baseados em tempo começam quando o acesso é entregue ou ativado. O tempo não utilizado não é reembolsável apenas porque o serviço não foi usado durante esse período.",
        "Manutenção temporária, breve indisponibilidade, trabalho de patch ou mudanças de rota não qualificam automaticamente uma compra para reembolso.",
      ] },
      { title: "5. Provedores de Terceiros", body: [
        "Algumas compras, rotas de desbloqueio ou ações de cobrança podem envolver sistemas de terceiros. Esses serviços podem aplicar suas próprias regras de pagamento, disputa ou análise além desta política.",
        "O Spectrum Cheat não é responsável por atrasos ou limitações criados por provedores externos depois que uma transação sai do site e entra em um sistema de terceiros.",
      ] },
      { title: "6. Chargebacks e Disputas de Pagamento", body: [
        "Abrir um chargeback falso ou abusivo após a entrega bem-sucedida pode resultar em perda permanente de acesso, recusa de compras futuras e remoção dos canais de serviço relacionados.",
        "Se houver um problema real com uma compra, contate o suporte primeiro e permita um período razoável de análise antes de abrir uma disputa formal.",
      ] },
      { title: "7. Como Solicitar Análise", body: [
        "Se você acredita que sua compra se qualifica para análise, contate o Spectrum pelo Discord oficial ou pelas rotas oficiais do site e inclua informações suficientes para identificar o pedido e o problema.",
      ], bullets: [
        "Data da compra e nome do plano.",
        "Referência da transação ou comprovante de pagamento, quando disponível.",
        "Uma breve explicação do que aconteceu.",
        "Quaisquer capturas de tela relevantes mostrando a falha na entrega ou o problema de cobrança.",
      ] },
      { title: "8. Alterações na Política", body: [
        "Esta Política de Reembolso pode ser atualizada periodicamente. A versão publicada nesta página regerá os futuros pedidos de análise, salvo indicação em contrário.",
      ] },
    ],
  },
};

export function RefundClient() {
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
