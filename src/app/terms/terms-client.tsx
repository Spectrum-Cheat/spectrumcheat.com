"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { Lang } from "../_i18n/translations";

type Section = { title: string; body: string[]; bullets?: string[] };
type Doc = { title: string; subtitle: string; effective: string; sections: Section[] };

const CONTENT: Record<Lang, Doc> = {
  en: {
    title: "Terms of Service",
    subtitle:
      "These terms explain how Spectrum access works, what users can expect from the service, and the rules that apply when using the website, key routes, and related purchase flows.",
    effective: "Effective April 12, 2026",
    sections: [
      { title: "1. Acceptance of Terms", body: [
        "By accessing spectrumcheat.com, purchasing any Spectrum Cheat plan, using any Spectrum loader or key route, or joining any official support channel connected to the service, you agree to be bound by these Terms of Service.",
        "If you do not agree with these terms, you must stop using the website, any related download or access route, and any connected service immediately.",
      ] },
      { title: "2. Service Description", body: [
        "Spectrum Cheat provides digital access to scripts, loaders, status information, key routes, community resources, and related content made available through the website and official channels.",
        "All products sold through Spectrum Cheat are digital services. Access may be provided through third-party checkout systems, key services, external payment pages, Discord, or similar delivery methods connected to the Spectrum platform.",
      ] },
      { title: "3. Eligibility and Account Responsibility", body: [
        "You are responsible for making sure you are legally allowed to access and use the service in your location and under the rules that apply to you.",
        "You are also responsible for maintaining control over your device, executor, Discord account, purchase information, and any other credentials or tools used to access Spectrum services.",
      ], bullets: [
        "You may not share purchased access unless a plan explicitly allows it.",
        "You may not resell, mirror, or redistribute Spectrum files, keys, loaders, or protected materials.",
        "You may not impersonate the service, its staff, or its official community channels.",
      ] },
      { title: "4. Purchases, Billing, and Plan Access", body: [
        "All prices, plans, durations, and included benefits are shown at the time of checkout. Plan names, pricing, and available access periods may change at any time without prior notice.",
        "Once payment is successfully completed, access is generally delivered through the active Spectrum flow as shown on the website or through the linked purchase system.",
      ], bullets: [
        "Weekly, monthly, quarterly, or other access periods begin at the time the service is delivered or activated.",
        "Failure to use the service during an active access period does not pause, extend, or preserve that access period.",
        "Third-party checkout, key, and link systems may apply their own terms in addition to these terms.",
      ] },
      { title: "5. Keys, Delivery, and Third-Party Services", body: [
        "Spectrum Cheat may rely on third-party services for checkout, payment processing, key generation, traffic routing, link checkpoints, hosting, analytics, or community support.",
        "We are not responsible for outages, delays, platform changes, or account actions caused by third-party providers outside our direct control.",
      ], bullets: [
        "A key route being temporarily unavailable does not guarantee a refund if the purchased product itself remains deliverable through a working route.",
        "Third-party providers may request additional steps, checkpoints, or verification before granting access.",
        "You are responsible for following the active instructions shown on the website at the time of use.",
      ] },
      { title: "6. Status, Updates, and Availability", body: [
        "Spectrum Cheat regularly updates supported titles, key routes, and public status information. Some games may be marked as Working, Waiting for Update, or Discontinued at any time.",
        "A listed game, feature, or integration may change status without notice due to compatibility shifts, platform changes, security considerations, or maintenance decisions.",
      ], bullets: [
        "No game, feature, or route is guaranteed to remain active forever.",
        "Temporary downtime, maintenance, and patch delays are part of normal digital service operation.",
        "Public roadmap signals, status pages, and Discord announcements are informational and may change as work progresses.",
      ] },
      { title: "7. Acceptable Use", body: [
        "You agree not to use the website or service in any way that damages the platform, harms other users, disrupts infrastructure, abuses support, or attempts to bypass purchase and access controls.",
      ], bullets: [
        "Do not reverse engineer, leak, or repackage protected Spectrum materials.",
        "Do not abuse refund systems, payment disputes, or chargeback tools after successful delivery.",
        "Do not attack, flood, scrape, or intentionally degrade the website or connected services.",
        "Do not harass staff, moderators, partners, or community members through support or Discord channels.",
      ] },
      { title: "8. No Warranty", body: [
        "Spectrum Cheat is provided on an 'as available' and 'as is' basis. While we work to keep the service stable, updated, and accessible, we do not guarantee uninterrupted operation, permanent compatibility, or error-free availability.",
        "We do not guarantee that any specific script, route, plan, or game will remain available for any particular length of time.",
      ] },
      { title: "9. Limitation of Liability", body: [
        "To the fullest extent allowed by applicable law, Spectrum Cheat and its operators are not liable for any indirect, incidental, special, or consequential damages arising from use of the website, the purchase flow, the key system, third-party providers, or the service itself.",
        "If liability is ever established, it will be limited to the amount paid by you for the specific product or service directly related to the claim.",
      ] },
      { title: "10. Suspension and Termination", body: [
        "We reserve the right to suspend, restrict, or terminate access to the website, any plan, any key route, or any connected service at our discretion when abuse, fraud, evasion, redistribution, or harmful behavior is detected.",
        "Serious violations may result in permanent loss of access without notice.",
      ] },
      { title: "11. Changes to These Terms", body: [
        "These terms may be updated from time to time. Updated terms become effective once published on this page unless stated otherwise.",
        "By continuing to use the website or service after changes are posted, you agree to the revised version.",
      ] },
      { title: "12. Contact", body: [
        "If you need help with service-related questions, purchase issues, or legal page clarification, contact Spectrum Cheat through the official website routes or the official Discord server linked on spectrumcheat.com.",
      ] },
    ],
  },
  th: {
    title: "ข้อกำหนดการใช้งาน",
    subtitle:
      "ข้อกำหนดเหล่านี้อธิบายว่าการเข้าถึง Spectrum ทำงานอย่างไร ผู้ใช้คาดหวังอะไรได้จากบริการ และกฎที่ใช้เมื่อใช้งานเว็บไซต์ key route และขั้นตอนการซื้อที่เกี่ยวข้อง",
    effective: "มีผลบังคับใช้ 12 เมษายน 2026",
    sections: [
      { title: "1. การยอมรับข้อกำหนด", body: [
        "การเข้าใช้ spectrumcheat.com, ซื้อแพ็กเกจ Spectrum Cheat ใดๆ, ใช้ loader หรือ key route ของ Spectrum, หรือเข้าร่วมช่องทางซัพพอร์ตอย่างเป็นทางการที่เชื่อมต่อกับบริการ ถือว่าคุณยอมรับและผูกพันตามข้อกำหนดการใช้งานนี้",
        "หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ คุณต้องหยุดใช้งานเว็บไซต์ การดาวน์โหลดหรือช่องทางเข้าถึงที่เกี่ยวข้อง และบริการที่เชื่อมต่อทั้งหมดทันที",
      ] },
      { title: "2. รายละเอียดบริการ", body: [
        "Spectrum Cheat ให้บริการเข้าถึงสคริปต์ loader ข้อมูลสถานะ key route ทรัพยากรชุมชน และเนื้อหาที่เกี่ยวข้องผ่านเว็บไซต์และช่องทางทางการ",
        "สินค้าทั้งหมดที่ขายผ่าน Spectrum Cheat เป็นบริการดิจิทัล การเข้าถึงอาจให้ผ่านระบบ checkout ของบุคคลที่สาม บริการคีย์ หน้าชำระเงินภายนอก Discord หรือวิธีจัดส่งอื่นที่เชื่อมต่อกับแพลตฟอร์ม Spectrum",
      ] },
      { title: "3. คุณสมบัติและความรับผิดชอบของบัญชี", body: [
        "คุณมีหน้าที่ตรวจสอบว่าคุณได้รับอนุญาตตามกฎหมายให้เข้าถึงและใช้บริการในพื้นที่ของคุณและภายใต้กฎที่ใช้บังคับกับคุณ",
        "คุณยังมีหน้าที่ดูแลควบคุมอุปกรณ์ executor บัญชี Discord ข้อมูลการซื้อ และข้อมูลรับรองหรือเครื่องมืออื่นๆ ที่ใช้เข้าถึงบริการ Spectrum",
      ], bullets: [
        "ห้ามแชร์สิทธิ์การเข้าถึงที่ซื้อมา เว้นแต่แพ็กเกจจะอนุญาตไว้ชัดเจน",
        "ห้ามขายต่อ ทำซ้ำ หรือแจกจ่ายไฟล์ คีย์ loader หรือสื่อที่ได้รับการป้องกันของ Spectrum",
        "ห้ามแอบอ้างเป็นบริการ ทีมงาน หรือช่องทางชุมชนทางการ",
      ] },
      { title: "4. การซื้อ การเรียกเก็บเงิน และการเข้าถึงแพ็กเกจ", body: [
        "ราคา แพ็กเกจ ระยะเวลา และสิทธิประโยชน์ทั้งหมดจะแสดงในขั้นตอน checkout ชื่อแพ็กเกจ ราคา และระยะเวลาการเข้าถึงอาจเปลี่ยนแปลงได้ทุกเมื่อโดยไม่ต้องแจ้งล่วงหน้า",
        "เมื่อชำระเงินสำเร็จ การเข้าถึงจะถูกส่งมอบผ่าน flow ที่ใช้งานอยู่ของ Spectrum ตามที่แสดงบนเว็บไซต์หรือผ่านระบบการซื้อที่เชื่อมโยง",
      ], bullets: [
        "ระยะเวลาการเข้าถึงรายสัปดาห์ รายเดือน รายไตรมาส หรืออื่นๆ เริ่มนับตั้งแต่เวลาที่ส่งมอบหรือเปิดใช้งานบริการ",
        "การไม่ได้ใช้บริการในช่วงที่เปิดใช้งานอยู่ ไม่ทำให้ระยะเวลาหยุด ขยาย หรือสงวนไว้",
        "ระบบ checkout คีย์ และลิงก์ของบุคคลที่สามอาจมีข้อกำหนดของตนเองเพิ่มเติมจากข้อกำหนดนี้",
      ] },
      { title: "5. คีย์ การส่งมอบ และบริการบุคคลที่สาม", body: [
        "Spectrum Cheat อาจใช้บริการบุคคลที่สามสำหรับ checkout การประมวลผลการชำระเงิน การสร้างคีย์ การจัดการทราฟฟิก ลิงก์เช็คพอยต์ โฮสติ้ง การวิเคราะห์ หรือการซัพพอร์ตชุมชน",
        "เราไม่รับผิดชอบต่อการขัดข้อง ความล่าช้า การเปลี่ยนแปลงของแพลตฟอร์ม หรือการดำเนินการกับบัญชีที่เกิดจากผู้ให้บริการบุคคลที่สามซึ่งอยู่นอกเหนือการควบคุมโดยตรงของเรา",
      ], bullets: [
        "การที่ key route ใช้ไม่ได้ชั่วคราว ไม่รับประกันการคืนเงิน หากตัวสินค้าที่ซื้อยังส่งมอบได้ผ่าน route ที่ใช้งานได้",
        "ผู้ให้บริการบุคคลที่สามอาจขอขั้นตอน เช็คพอยต์ หรือการยืนยันเพิ่มเติมก่อนให้สิทธิ์เข้าถึง",
        "คุณมีหน้าที่ทำตามคำแนะนำที่แสดงบนเว็บไซต์ ณ เวลาที่ใช้งาน",
      ] },
      { title: "6. สถานะ การอัปเดต และความพร้อมใช้งาน", body: [
        "Spectrum Cheat อัปเดตเกมที่รองรับ key route และข้อมูลสถานะสาธารณะอยู่เสมอ บางเกมอาจถูกระบุว่า ใช้งานได้ รอการอัปเดต หรือยกเลิกการรองรับ ได้ทุกเมื่อ",
        "เกม ฟีเจอร์ หรือการเชื่อมต่อที่ระบุไว้อาจเปลี่ยนสถานะโดยไม่แจ้งล่วงหน้า เนื่องจากความเข้ากันได้ที่เปลี่ยนไป การเปลี่ยนแปลงของแพลตฟอร์ม ความปลอดภัย หรือการตัดสินใจด้านการบำรุงรักษา",
      ], bullets: [
        "ไม่มีเกม ฟีเจอร์ หรือ route ใดที่รับประกันว่าจะใช้งานได้ตลอดไป",
        "การหยุดทำงานชั่วคราว การบำรุงรักษา และความล่าช้าของแพตช์เป็นเรื่องปกติของบริการดิจิทัล",
        "สัญญาณ roadmap หน้าสถานะ และประกาศใน Discord เป็นข้อมูลประกอบและอาจเปลี่ยนแปลงตามความคืบหน้า",
      ] },
      { title: "7. การใช้งานที่ยอมรับได้", body: [
        "คุณตกลงที่จะไม่ใช้เว็บไซต์หรือบริการในทางที่ทำลายแพลตฟอร์ม ทำร้ายผู้ใช้อื่น รบกวนโครงสร้างพื้นฐาน ใช้ซัพพอร์ตในทางที่ผิด หรือพยายามหลบเลี่ยงการควบคุมการซื้อและการเข้าถึง",
      ], bullets: [
        "ห้าม reverse engineer ปล่อย หรือ repackage สื่อที่ได้รับการป้องกันของ Spectrum",
        "ห้ามใช้ระบบคืนเงิน การโต้แย้งการชำระเงิน หรือ chargeback ในทางที่ผิดหลังได้รับสินค้าแล้ว",
        "ห้ามโจมตี ถล่ม ขูดข้อมูล หรือจงใจทำให้เว็บไซต์หรือบริการที่เชื่อมต่อทำงานแย่ลง",
        "ห้ามคุกคามทีมงาน ผู้ดูแล พาร์ทเนอร์ หรือสมาชิกชุมชนผ่านช่องทางซัพพอร์ตหรือ Discord",
      ] },
      { title: "8. ไม่มีการรับประกัน", body: [
        "Spectrum Cheat ให้บริการในแบบ 'ตามที่มี' และ 'ตามสภาพ' แม้เราจะพยายามรักษาบริการให้เสถียร อัปเดต และเข้าถึงได้ แต่เราไม่รับประกันการทำงานต่อเนื่องไม่สะดุด ความเข้ากันได้ถาวร หรือความพร้อมใช้งานที่ปราศจากข้อผิดพลาด",
        "เราไม่รับประกันว่าสคริปต์ route แพ็กเกจ หรือเกมใดๆ จะยังใช้งานได้ตลอดช่วงเวลาที่กำหนด",
      ] },
      { title: "9. การจำกัดความรับผิด", body: [
        "เท่าที่กฎหมายที่ใช้บังคับอนุญาต Spectrum Cheat และผู้ดำเนินการไม่รับผิดต่อความเสียหายทางอ้อม โดยบังเอิญ พิเศษ หรือที่เป็นผลสืบเนื่องใดๆ ที่เกิดจากการใช้เว็บไซต์ ขั้นตอนการซื้อ ระบบคีย์ ผู้ให้บริการบุคคลที่สาม หรือตัวบริการเอง",
        "หากมีการกำหนดความรับผิดขึ้น จะจำกัดอยู่ที่จำนวนเงินที่คุณชำระสำหรับสินค้าหรือบริการที่เกี่ยวข้องโดยตรงกับข้อเรียกร้องนั้น",
      ] },
      { title: "10. การระงับและการยกเลิก", body: [
        "เราขอสงวนสิทธิ์ในการระงับ จำกัด หรือยกเลิกการเข้าถึงเว็บไซต์ แพ็กเกจ key route หรือบริการที่เชื่อมต่อ ตามดุลยพินิจของเรา เมื่อพบการใช้ในทางที่ผิด การฉ้อโกง การหลบเลี่ยง การแจกจ่ายซ้ำ หรือพฤติกรรมที่เป็นอันตราย",
        "การละเมิดร้ายแรงอาจส่งผลให้สูญเสียสิทธิ์การเข้าถึงถาวรโดยไม่แจ้งล่วงหน้า",
      ] },
      { title: "11. การเปลี่ยนแปลงข้อกำหนด", body: [
        "ข้อกำหนดเหล่านี้อาจมีการอัปเดตเป็นครั้งคราว ข้อกำหนดที่อัปเดตจะมีผลเมื่อเผยแพร่บนหน้านี้ เว้นแต่จะระบุไว้เป็นอย่างอื่น",
        "การใช้เว็บไซต์หรือบริการต่อหลังจากมีการประกาศการเปลี่ยนแปลง ถือว่าคุณยอมรับเวอร์ชันที่แก้ไขแล้ว",
      ] },
      { title: "12. ติดต่อ", body: [
        "หากต้องการความช่วยเหลือเกี่ยวกับคำถามด้านบริการ ปัญหาการซื้อ หรือคำชี้แจงหน้ากฎหมาย ติดต่อ Spectrum Cheat ผ่านช่องทางทางการบนเว็บไซต์ หรือเซิร์ฟเวอร์ Discord ทางการที่ลิงก์ไว้บน spectrumcheat.com",
      ] },
    ],
  },
  zh: {
    title: "服务条款",
    subtitle:
      "本条款说明 Spectrum 的访问方式、用户可从服务中获得什么，以及使用网站、密钥流程和相关购买流程时适用的规则。",
    effective: "生效日期 2026年4月12日",
    sections: [
      { title: "1. 条款的接受", body: [
        "访问 spectrumcheat.com、购买任何 Spectrum Cheat 套餐、使用任何 Spectrum 加载器或密钥流程，或加入与服务相关的任何官方支持频道，即表示你同意受本服务条款约束。",
        "如果你不同意这些条款，必须立即停止使用本网站、任何相关下载或访问途径以及任何关联服务。",
      ] },
      { title: "2. 服务说明", body: [
        "Spectrum Cheat 通过网站和官方渠道提供对脚本、加载器、状态信息、密钥流程、社区资源及相关内容的数字访问。",
        "通过 Spectrum Cheat 销售的所有产品均为数字服务。访问权限可能通过第三方结账系统、密钥服务、外部支付页面、Discord 或与 Spectrum 平台关联的类似交付方式提供。",
      ] },
      { title: "3. 资格与账户责任", body: [
        "你有责任确保你在所在地区并根据适用于你的规则，合法地访问和使用本服务。",
        "你还有责任妥善控制自己的设备、执行器、Discord 账户、购买信息以及用于访问 Spectrum 服务的任何其他凭证或工具。",
      ], bullets: [
        "除非套餐明确允许，否则不得分享已购买的访问权限。",
        "不得转售、镜像或重新分发 Spectrum 的文件、密钥、加载器或受保护材料。",
        "不得冒充本服务、其工作人员或其官方社区频道。",
      ] },
      { title: "4. 购买、计费与套餐访问", body: [
        "所有价格、套餐、时长及包含的权益均在结账时显示。套餐名称、价格和可用访问期限可能随时更改，恕不另行通知。",
        "付款成功后，访问权限通常会按照网站显示或通过关联购买系统的当前 Spectrum 流程进行交付。",
      ], bullets: [
        "周、月、季度或其他访问期限自服务交付或激活之时开始计算。",
        "在有效访问期内未使用服务不会暂停、延长或保留该访问期。",
        "第三方结账、密钥和链接系统可能在本条款之外另行适用其自身条款。",
      ] },
      { title: "5. 密钥、交付与第三方服务", body: [
        "Spectrum Cheat 可能依赖第三方服务进行结账、支付处理、密钥生成、流量路由、链接检查点、托管、分析或社区支持。",
        "对于超出我们直接控制范围的第三方提供商造成的中断、延迟、平台变更或账户操作，我们概不负责。",
      ], bullets: [
        "如果所购产品本身仍可通过有效途径交付，则密钥途径临时不可用并不保证退款。",
        "第三方提供商可能在授予访问权限前要求额外步骤、检查点或验证。",
        "你有责任遵循使用时网站上显示的当前说明。",
      ] },
      { title: "6. 状态、更新与可用性", body: [
        "Spectrum Cheat 会定期更新支持的游戏、密钥途径和公开状态信息。某些游戏可能随时被标记为“可用”“等待更新”或“已停止支持”。",
        "由于兼容性变化、平台更改、安全考量或维护决定，所列游戏、功能或集成可能在不另行通知的情况下更改状态。",
      ], bullets: [
        "没有任何游戏、功能或途径保证永远有效。",
        "临时停机、维护和补丁延迟是数字服务正常运营的一部分。",
        "公开的路线图信号、状态页面和 Discord 公告仅供参考，可能随工作进展而变化。",
      ] },
      { title: "7. 可接受的使用", body: [
        "你同意不以任何方式使用本网站或服务来损害平台、伤害其他用户、扰乱基础设施、滥用支持，或试图绕过购买和访问控制。",
      ], bullets: [
        "不得对受保护的 Spectrum 材料进行逆向工程、泄露或重新打包。",
        "不得在成功交付后滥用退款系统、支付争议或拒付工具。",
        "不得攻击、洪泛、抓取或故意降低网站或关联服务的性能。",
        "不得通过支持或 Discord 渠道骚扰工作人员、管理员、合作伙伴或社区成员。",
      ] },
      { title: "8. 不提供保证", body: [
        "Spectrum Cheat 按“现有”和“现状”基础提供。尽管我们努力保持服务稳定、更新并可访问，但我们不保证不间断运行、永久兼容或无错误的可用性。",
        "我们不保证任何特定脚本、途径、套餐或游戏会在任何特定时间段内保持可用。",
      ] },
      { title: "9. 责任限制", body: [
        "在适用法律允许的最大范围内，Spectrum Cheat 及其运营者对因使用网站、购买流程、密钥系统、第三方提供商或服务本身而产生的任何间接、附带、特殊或后果性损害不承担责任。",
        "若责任确实成立，将以你就与该索赔直接相关的特定产品或服务所支付的金额为限。",
      ] },
      { title: "10. 暂停与终止", body: [
        "当检测到滥用、欺诈、规避、再分发或有害行为时，我们保留自行决定暂停、限制或终止对网站、任何套餐、任何密钥途径或任何关联服务访问的权利。",
        "严重违规可能导致在不另行通知的情况下永久丧失访问权限。",
      ] },
      { title: "11. 条款变更", body: [
        "本条款可能会不时更新。除非另有说明，更新后的条款一经在本页面发布即生效。",
        "在变更发布后继续使用网站或服务，即表示你同意修订后的版本。",
      ] },
      { title: "12. 联系方式", body: [
        "如需有关服务问题、购买问题或法律页面说明的帮助，请通过网站上的官方途径或 spectrumcheat.com 上链接的官方 Discord 服务器联系 Spectrum Cheat。",
      ] },
    ],
  },
  vi: {
    title: "Điều khoản dịch vụ",
    subtitle:
      "Các điều khoản này giải thích cách truy cập Spectrum hoạt động, người dùng có thể mong đợi gì từ dịch vụ, và các quy tắc áp dụng khi sử dụng website, key route và các quy trình mua hàng liên quan.",
    effective: "Có hiệu lực ngày 12 tháng 4, 2026",
    sections: [
      { title: "1. Chấp nhận điều khoản", body: [
        "Khi truy cập spectrumcheat.com, mua bất kỳ gói Spectrum Cheat nào, sử dụng bất kỳ loader hoặc key route nào của Spectrum, hoặc tham gia bất kỳ kênh hỗ trợ chính thức nào liên quan đến dịch vụ, bạn đồng ý bị ràng buộc bởi các Điều khoản dịch vụ này.",
        "Nếu bạn không đồng ý với các điều khoản này, bạn phải ngừng sử dụng website, mọi bản tải xuống hoặc đường truy cập liên quan, và mọi dịch vụ kết nối ngay lập tức.",
      ] },
      { title: "2. Mô tả dịch vụ", body: [
        "Spectrum Cheat cung cấp quyền truy cập kỹ thuật số tới script, loader, thông tin trạng thái, key route, tài nguyên cộng đồng và nội dung liên quan thông qua website và các kênh chính thức.",
        "Tất cả sản phẩm bán qua Spectrum Cheat đều là dịch vụ kỹ thuật số. Quyền truy cập có thể được cung cấp qua hệ thống thanh toán bên thứ ba, dịch vụ key, trang thanh toán bên ngoài, Discord, hoặc các phương thức giao tương tự liên kết với nền tảng Spectrum.",
      ] },
      { title: "3. Điều kiện và trách nhiệm tài khoản", body: [
        "Bạn có trách nhiệm đảm bảo mình được phép hợp pháp truy cập và sử dụng dịch vụ tại khu vực của bạn và theo các quy tắc áp dụng cho bạn.",
        "Bạn cũng có trách nhiệm kiểm soát thiết bị, executor, tài khoản Discord, thông tin mua hàng, và mọi thông tin đăng nhập hoặc công cụ khác dùng để truy cập dịch vụ Spectrum.",
      ], bullets: [
        "Bạn không được chia sẻ quyền truy cập đã mua trừ khi gói cho phép rõ ràng.",
        "Bạn không được bán lại, sao chép hoặc phân phối lại các tệp, key, loader hoặc tài liệu được bảo vệ của Spectrum.",
        "Bạn không được mạo danh dịch vụ, nhân viên hoặc các kênh cộng đồng chính thức.",
      ] },
      { title: "4. Mua hàng, thanh toán và quyền truy cập gói", body: [
        "Mọi giá, gói, thời hạn và quyền lợi đi kèm được hiển thị tại thời điểm thanh toán. Tên gói, giá và thời hạn truy cập có thể thay đổi bất cứ lúc nào mà không cần báo trước.",
        "Sau khi thanh toán thành công, quyền truy cập thường được giao qua quy trình Spectrum đang hoạt động như hiển thị trên website hoặc qua hệ thống mua hàng liên kết.",
      ], bullets: [
        "Thời hạn truy cập theo tuần, tháng, quý hoặc khác bắt đầu tính từ khi dịch vụ được giao hoặc kích hoạt.",
        "Việc không sử dụng dịch vụ trong thời hạn đang hoạt động không tạm dừng, gia hạn hay bảo lưu thời hạn đó.",
        "Hệ thống thanh toán, key và liên kết của bên thứ ba có thể áp dụng điều khoản riêng bổ sung cho các điều khoản này.",
      ] },
      { title: "5. Key, giao hàng và dịch vụ bên thứ ba", body: [
        "Spectrum Cheat có thể dựa vào dịch vụ bên thứ ba cho thanh toán, xử lý chi trả, tạo key, định tuyến lưu lượng, checkpoint liên kết, lưu trữ, phân tích hoặc hỗ trợ cộng đồng.",
        "Chúng tôi không chịu trách nhiệm về sự cố, chậm trễ, thay đổi nền tảng hoặc hành động tài khoản do các nhà cung cấp bên thứ ba nằm ngoài tầm kiểm soát trực tiếp của chúng tôi gây ra.",
      ], bullets: [
        "Việc một key route tạm thời không khả dụng không đảm bảo hoàn tiền nếu sản phẩm đã mua vẫn có thể giao qua một route hoạt động.",
        "Nhà cung cấp bên thứ ba có thể yêu cầu thêm bước, checkpoint hoặc xác minh trước khi cấp quyền truy cập.",
        "Bạn có trách nhiệm làm theo hướng dẫn hiện hành hiển thị trên website tại thời điểm sử dụng.",
      ] },
      { title: "6. Trạng thái, cập nhật và khả dụng", body: [
        "Spectrum Cheat thường xuyên cập nhật các tựa game được hỗ trợ, key route và thông tin trạng thái công khai. Một số game có thể được đánh dấu là Đang hoạt động, Chờ cập nhật hoặc Ngừng hỗ trợ bất cứ lúc nào.",
        "Một game, tính năng hoặc tích hợp được liệt kê có thể đổi trạng thái mà không báo trước do thay đổi tương thích, thay đổi nền tảng, lý do bảo mật hoặc quyết định bảo trì.",
      ], bullets: [
        "Không game, tính năng hoặc route nào được đảm bảo hoạt động mãi mãi.",
        "Thời gian ngừng tạm thời, bảo trì và chậm trễ bản vá là một phần bình thường của vận hành dịch vụ kỹ thuật số.",
        "Tín hiệu lộ trình, trang trạng thái và thông báo Discord chỉ mang tính thông tin và có thể thay đổi theo tiến độ.",
      ] },
      { title: "7. Sử dụng được chấp nhận", body: [
        "Bạn đồng ý không sử dụng website hoặc dịch vụ theo bất kỳ cách nào gây hại cho nền tảng, gây hại cho người dùng khác, làm gián đoạn hạ tầng, lạm dụng hỗ trợ, hoặc cố vượt qua kiểm soát mua hàng và truy cập.",
      ], bullets: [
        "Không reverse engineer, làm rò rỉ hoặc đóng gói lại tài liệu được bảo vệ của Spectrum.",
        "Không lạm dụng hệ thống hoàn tiền, tranh chấp thanh toán hoặc công cụ chargeback sau khi đã giao hàng thành công.",
        "Không tấn công, làm tràn, thu thập dữ liệu hoặc cố ý làm giảm hiệu năng website hay dịch vụ kết nối.",
        "Không quấy rối nhân viên, quản trị viên, đối tác hoặc thành viên cộng đồng qua kênh hỗ trợ hoặc Discord.",
      ] },
      { title: "8. Không bảo hành", body: [
        "Spectrum Cheat được cung cấp trên cơ sở 'theo khả năng' và 'nguyên trạng'. Dù chúng tôi nỗ lực giữ dịch vụ ổn định, cập nhật và truy cập được, chúng tôi không đảm bảo hoạt động liên tục, tương thích vĩnh viễn hoặc khả dụng không lỗi.",
        "Chúng tôi không đảm bảo bất kỳ script, route, gói hoặc game cụ thể nào sẽ còn khả dụng trong một khoảng thời gian cụ thể.",
      ] },
      { title: "9. Giới hạn trách nhiệm", body: [
        "Trong phạm vi tối đa luật áp dụng cho phép, Spectrum Cheat và những người vận hành không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hệ quả nào phát sinh từ việc sử dụng website, quy trình mua hàng, hệ thống key, nhà cung cấp bên thứ ba hoặc chính dịch vụ.",
        "Nếu trách nhiệm được xác lập, nó sẽ giới hạn ở số tiền bạn đã trả cho sản phẩm hoặc dịch vụ cụ thể liên quan trực tiếp đến khiếu nại đó.",
      ] },
      { title: "10. Tạm ngừng và chấm dứt", body: [
        "Chúng tôi có quyền tạm ngừng, hạn chế hoặc chấm dứt quyền truy cập website, bất kỳ gói nào, bất kỳ key route nào hoặc bất kỳ dịch vụ kết nối nào theo quyết định của chúng tôi khi phát hiện lạm dụng, gian lận, lẩn tránh, tái phân phối hoặc hành vi gây hại.",
        "Vi phạm nghiêm trọng có thể dẫn đến mất quyền truy cập vĩnh viễn mà không báo trước.",
      ] },
      { title: "11. Thay đổi điều khoản", body: [
        "Các điều khoản này có thể được cập nhật theo thời gian. Điều khoản cập nhật có hiệu lực ngay khi được đăng trên trang này trừ khi có quy định khác.",
        "Bằng việc tiếp tục sử dụng website hoặc dịch vụ sau khi thay đổi được đăng, bạn đồng ý với phiên bản đã sửa đổi.",
      ] },
      { title: "12. Liên hệ", body: [
        "Nếu cần trợ giúp về câu hỏi liên quan dịch vụ, vấn đề mua hàng hoặc làm rõ trang pháp lý, hãy liên hệ Spectrum Cheat qua các kênh chính thức trên website hoặc máy chủ Discord chính thức được liên kết trên spectrumcheat.com.",
      ] },
    ],
  },
  pt: {
    title: "Termos de Serviço",
    subtitle:
      "Estes termos explicam como o acesso ao Spectrum funciona, o que os usuários podem esperar do serviço e as regras que se aplicam ao usar o site, as rotas de key e os fluxos de compra relacionados.",
    effective: "Em vigor 12 de abril de 2026",
    sections: [
      { title: "1. Aceitação dos Termos", body: [
        "Ao acessar spectrumcheat.com, comprar qualquer plano Spectrum Cheat, usar qualquer loader ou rota de key do Spectrum, ou entrar em qualquer canal de suporte oficial ligado ao serviço, você concorda em ficar vinculado a estes Termos de Serviço.",
        "Se você não concordar com estes termos, deve parar de usar imediatamente o site, qualquer download ou rota de acesso relacionada e qualquer serviço conectado.",
      ] },
      { title: "2. Descrição do Serviço", body: [
        "O Spectrum Cheat fornece acesso digital a scripts, loaders, informações de status, rotas de key, recursos da comunidade e conteúdo relacionado disponibilizados pelo site e canais oficiais.",
        "Todos os produtos vendidos pelo Spectrum Cheat são serviços digitais. O acesso pode ser fornecido por sistemas de checkout de terceiros, serviços de key, páginas de pagamento externas, Discord ou métodos de entrega semelhantes ligados à plataforma Spectrum.",
      ] },
      { title: "3. Elegibilidade e Responsabilidade da Conta", body: [
        "Você é responsável por garantir que tem permissão legal para acessar e usar o serviço na sua localização e sob as regras que se aplicam a você.",
        "Você também é responsável por manter o controle do seu dispositivo, executor, conta do Discord, informações de compra e quaisquer outras credenciais ou ferramentas usadas para acessar os serviços Spectrum.",
      ], bullets: [
        "Você não pode compartilhar o acesso comprado, a menos que um plano permita explicitamente.",
        "Você não pode revender, espelhar ou redistribuir arquivos, keys, loaders ou materiais protegidos do Spectrum.",
        "Você não pode se passar pelo serviço, sua equipe ou seus canais oficiais da comunidade.",
      ] },
      { title: "4. Compras, Cobrança e Acesso ao Plano", body: [
        "Todos os preços, planos, durações e benefícios incluídos são mostrados no momento do checkout. Nomes de planos, preços e períodos de acesso disponíveis podem mudar a qualquer momento sem aviso prévio.",
        "Após a conclusão do pagamento, o acesso geralmente é entregue pelo fluxo Spectrum ativo, conforme mostrado no site ou pelo sistema de compra vinculado.",
      ], bullets: [
        "Períodos de acesso semanais, mensais, trimestrais ou outros começam no momento em que o serviço é entregue ou ativado.",
        "Não usar o serviço durante um período de acesso ativo não pausa, estende ou preserva esse período.",
        "Sistemas de checkout, key e link de terceiros podem aplicar seus próprios termos além destes.",
      ] },
      { title: "5. Keys, Entrega e Serviços de Terceiros", body: [
        "O Spectrum Cheat pode depender de serviços de terceiros para checkout, processamento de pagamento, geração de key, roteamento de tráfego, checkpoints de link, hospedagem, análise ou suporte da comunidade.",
        "Não somos responsáveis por interrupções, atrasos, mudanças de plataforma ou ações de conta causadas por provedores terceiros fora do nosso controle direto.",
      ], bullets: [
        "Uma rota de key temporariamente indisponível não garante reembolso se o produto comprado ainda puder ser entregue por uma rota funcional.",
        "Provedores terceiros podem solicitar etapas adicionais, checkpoints ou verificação antes de conceder acesso.",
        "Você é responsável por seguir as instruções ativas mostradas no site no momento do uso.",
      ] },
      { title: "6. Status, Atualizações e Disponibilidade", body: [
        "O Spectrum Cheat atualiza regularmente os títulos suportados, rotas de key e informações públicas de status. Alguns jogos podem ser marcados como Funcionando, Aguardando Atualização ou Descontinuado a qualquer momento.",
        "Um jogo, recurso ou integração listado pode mudar de status sem aviso devido a mudanças de compatibilidade, mudanças de plataforma, considerações de segurança ou decisões de manutenção.",
      ], bullets: [
        "Nenhum jogo, recurso ou rota tem garantia de permanecer ativo para sempre.",
        "Indisponibilidade temporária, manutenção e atrasos de patch fazem parte da operação normal de um serviço digital.",
        "Sinais de roadmap, páginas de status e anúncios no Discord são informativos e podem mudar conforme o trabalho avança.",
      ] },
      { title: "7. Uso Aceitável", body: [
        "Você concorda em não usar o site ou serviço de qualquer forma que danifique a plataforma, prejudique outros usuários, interrompa a infraestrutura, abuse do suporte ou tente burlar os controles de compra e acesso.",
      ], bullets: [
        "Não faça engenharia reversa, vaze ou reempacote materiais protegidos do Spectrum.",
        "Não abuse de sistemas de reembolso, disputas de pagamento ou ferramentas de chargeback após a entrega bem-sucedida.",
        "Não ataque, sobrecarregue, faça scraping ou degrade intencionalmente o site ou serviços conectados.",
        "Não assedie equipe, moderadores, parceiros ou membros da comunidade pelos canais de suporte ou Discord.",
      ] },
      { title: "8. Sem Garantia", body: [
        "O Spectrum Cheat é fornecido 'conforme disponível' e 'no estado em que se encontra'. Embora trabalhemos para manter o serviço estável, atualizado e acessível, não garantimos operação ininterrupta, compatibilidade permanente ou disponibilidade sem erros.",
        "Não garantimos que qualquer script, rota, plano ou jogo específico permanecerá disponível por qualquer período específico.",
      ] },
      { title: "9. Limitação de Responsabilidade", body: [
        "Na extensão máxima permitida pela lei aplicável, o Spectrum Cheat e seus operadores não são responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso do site, do fluxo de compra, do sistema de key, de provedores terceiros ou do próprio serviço.",
        "Se a responsabilidade for estabelecida, ela se limitará ao valor pago por você pelo produto ou serviço específico diretamente relacionado à reclamação.",
      ] },
      { title: "10. Suspensão e Rescisão", body: [
        "Reservamo-nos o direito de suspender, restringir ou encerrar o acesso ao site, a qualquer plano, qualquer rota de key ou qualquer serviço conectado, a nosso critério, quando for detectado abuso, fraude, evasão, redistribuição ou comportamento prejudicial.",
        "Violações graves podem resultar em perda permanente de acesso sem aviso.",
      ] },
      { title: "11. Alterações nestes Termos", body: [
        "Estes termos podem ser atualizados periodicamente. Os termos atualizados entram em vigor assim que publicados nesta página, salvo indicação em contrário.",
        "Ao continuar a usar o site ou serviço após a publicação das mudanças, você concorda com a versão revisada.",
      ] },
      { title: "12. Contato", body: [
        "Se precisar de ajuda com questões relacionadas ao serviço, problemas de compra ou esclarecimento da página legal, entre em contato com o Spectrum Cheat pelas rotas oficiais do site ou pelo servidor oficial do Discord vinculado em spectrumcheat.com.",
      ] },
    ],
  },
};

export function TermsClient() {
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
