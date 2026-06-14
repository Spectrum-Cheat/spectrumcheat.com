"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";

type Method = "envelope" | "slip" | "promptpay" | "crypto" | "voucher" | null;
type CryptoNet = "binance" | "usdt" | "litecoin" | "bitcoin";

export default function TopupClient() {
  const { t } = useLang();
  const [method, setMethod] = useState<Method>(null);
  const [link, setLink] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [amount, setAmount] = useState("");
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipDrag, setSlipDrag] = useState(false);
  const [agreedSlip, setAgreedSlip] = useState(false);
  const [ppFile, setPpFile] = useState<File | null>(null);
  const [ppDrag, setPpDrag] = useState(false);
  const [agreedPp, setAgreedPp] = useState(false);
  const [code, setCode] = useState("");
  const [cryptoNet, setCryptoNet] = useState<CryptoNet>("binance");
  const [cryptoAmount, setCryptoAmount] = useState("1");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ppFileInputRef = useRef<HTMLInputElement>(null);

  const CRYPTO_CURRENCY: Record<CryptoNet, string> = { binance: "BNB", usdt: "USDT", litecoin: "LTC", bitcoin: "BTC" };
  const [thbPrices, setThbPrices] = useState<Record<CryptoNet, number>>({ binance: 0, usdt: 32.73, litecoin: 0, bitcoin: 0 });
  const [rateLoading, setRateLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,binancecoin,tether&vs_currencies=thb"
        );
        const data = await res.json();
        setThbPrices({
          usdt:     data.tether?.thb      ?? 32.73,
          bitcoin:  data.bitcoin?.thb     ?? 0,
          litecoin: data.litecoin?.thb    ?? 0,
          binance:  data.binancecoin?.thb ?? 0,
        });
      } catch { /* keep last known */ }
      finally { setRateLoading(false); }
    };
    fetchRates();
    const id = setInterval(fetchRates, 60_000);
    return () => clearInterval(id);
  }, []);

  const coinThb = thbPrices[cryptoNet];
  const bahtAmt = parseFloat(cryptoAmount) || 0;
  const cryptoToPay = coinThb > 0 ? bahtAmt / coinThb : 0;

  const handleSlipDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setSlipDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) setSlipFile(file);
  };

  const handlePpDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setPpDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) setPpFile(file);
  };

  return (
    <SubpageShell
      badge={t("topupBadge")}
      title={t("topupTitle")}
      subtitle={t("topupSub")}
      ctaLabel={t("navOrderHistory")}
      ctaHref="/history"
    >
      {/* ── Step 1: choose method ── */}
      {method === null && (
        <div className="topup-section">
          <h2 className="topup-choose-title">{t("topupChooseMethod")}</h2>
          <div className="topup-methods-grid">

            {/* Envelope */}
            <button className="topup-method-card" onClick={() => setMethod("envelope")}>
              <div className="topup-method-icon topup-icon-envelope">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pinimg.com/736x/cc/f7/3b/ccf73b7e9130e64af8355b8d24032704.jpg" alt="TrueMoney" style={{width:40,height:40,borderRadius:10,objectFit:"cover"}} />
              </div>
              <div className="topup-method-info">
                <span className="topup-method-name">{t("topupMethodEnvelope")}</span>
                <span className="topup-method-sub">{t("topupMethodEnvelopeSub")}</span>
              </div>
              <span className="topup-method-fee topup-fee-red">{t("topupMethodEnvelopeFee")}</span>
            </button>

            {/* Slip */}
            <button className="topup-method-card" onClick={() => setMethod("slip")}>
              <div className="topup-method-icon topup-icon-slip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pinimg.com/564x/66/3b/5e/663b5ede3b55beaee63bf3100db21f25.jpg" alt="K Plus" style={{width:40,height:40,borderRadius:10,objectFit:"cover"}} />
              </div>
              <div className="topup-method-info">
                <span className="topup-method-name">{t("topupMethodSlip")}</span>
                <span className="topup-method-sub">{t("topupMethodSlipSub")}</span>
              </div>
              <span className="topup-method-fee topup-fee-green">{t("topupMethodSlipFee")}</span>
            </button>

            {/* PromptPay */}
            <button className="topup-method-card" onClick={() => setMethod("promptpay")}>
              <div className="topup-method-icon topup-icon-promptpay">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.weprimelive.com/QR.png" alt="PromptPay" style={{width:40,height:40,borderRadius:10,objectFit:"cover"}} />
              </div>
              <div className="topup-method-info">
                <span className="topup-method-name">{t("topupMethodPromptPay")}</span>
                <span className="topup-method-sub">{t("topupMethodPromptPaySub")}</span>
              </div>
              <span className="topup-method-fee topup-fee-green">{t("topupMethodPromptPayFee")}</span>
            </button>

            {/* Crypto */}
            <button className="topup-method-card" onClick={() => setMethod("crypto")}>
              <div className="topup-method-icon topup-icon-crypto">
                <div className="topup-crypto-stack">
                  <div className="topup-crypto-stack-row">
                    <svg width="32" height="32" viewBox="0 0 32 32" className="topup-coin-stack-item" style={{zIndex:2}}>
                      <circle cx="16" cy="16" r="16" fill="#F7931A"/>
                      <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">₿</text>
                    </svg>
                    <svg width="32" height="32" viewBox="0 0 32 32" className="topup-coin-stack-item" style={{zIndex:1}}>
                      <circle cx="16" cy="16" r="16" fill="#26A17B"/>
                      <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">₮</text>
                    </svg>
                  </div>
                  <div className="topup-crypto-stack-row" style={{marginTop:-8}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://cdn-icons-png.freepik.com/512/12114/12114208.png" alt="BNB" width={32} height={32} className="topup-coin-stack-item" style={{zIndex:2,borderRadius:"50%",objectFit:"cover"}} />
                    <svg width="32" height="32" viewBox="0 0 32 32" className="topup-coin-stack-item" style={{zIndex:1}}>
                      <circle cx="16" cy="16" r="16" fill="#A6A9AA"/>
                      <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">Ł</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="topup-method-info">
                <span className="topup-method-name">{t("topupMethodCrypto")}</span>
                <span className="topup-method-sub">{t("topupMethodCryptoSub")}</span>
              </div>
              <span className="topup-method-fee topup-fee-yellow">{t("topupMethodCryptoFee")}</span>
            </button>

            {/* Voucher — coming soon */}
            <div className="topup-method-card topup-method-disabled">
              <div className="topup-method-icon topup-icon-voucher">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>
                  <path d="M20 12h-5a2 2 0 0 0 0 4h5"/>
                  <circle cx="17.5" cy="14" r=".5" fill="currentColor"/>
                </svg>
              </div>
              <div className="topup-method-info">
                <span className="topup-method-name">{t("topupMethodVoucher")}</span>
                <span className="topup-method-sub">{t("topupMethodVoucherSub")}</span>
              </div>
              <span className="topup-method-fee topup-fee-purple">{t("topupComingSoon")}</span>
            </div>

          </div>

          <div className="topup-test-warning">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>{t("topupTestWarning")}<a href="https://spectrumcheat.rexzy.xyz/" target="_blank" rel="noreferrer" className="topup-warning-link">{t("topupTestWarningLink")}</a></span>
          </div>
        </div>
      )}

      {/* ── Step 2: Crypto ── */}
      {method === "crypto" && (
        <div className="topup-form-section">
          <button className="topup-back-btn" onClick={() => setMethod(null)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t("topupBack")}
          </button>

          <div className="topup-form-card">
            <div className="topup-form-header">
              <div className="topup-form-header-icon topup-icon-crypto">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h3 className="topup-form-title">{t("topupCryptoTitle")}</h3>
                <p className="topup-form-sub">{t("topupCryptoSub")}</p>
              </div>
            </div>

            {/* Network selector */}
            <div className="topup-field">
              <label className="topup-label">{t("topupCryptoNetwork")}</label>
              <div className="topup-crypto-nets">
                {(["binance","usdt","litecoin","bitcoin"] as CryptoNet[]).map(net => (
                  <button
                    key={net}
                    className={`topup-crypto-net-btn${cryptoNet === net ? " active" : ""}`}
                    onClick={() => setCryptoNet(net)}
                  >
                    {net === "binance" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png" alt="Binance" width={14} height={14} style={{objectFit:"contain"}} />
                    )}
                    {net === "usdt" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#26A17B"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">₮</text></svg>
                    )}
                    {net === "litecoin" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#A6A9AA"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Ł</text></svg>
                    )}
                    {net === "bitcoin" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7931A"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">₿</text></svg>
                    )}
                    {net === "binance" ? "Binance Pay" : net === "usdt" ? "USDT (BEP20)" : net === "litecoin" ? "Litecoin" : "Bitcoin"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="topup-field">
              <label className="topup-label">{t("topupCryptoAmount")}</label>
              <div className="topup-crypto-amount-row">
                <div className="topup-input-wrap" style={{flex:1}}>
                  <input
                    className="topup-input"
                    type="number"
                    min="1"
                    step="0.01"
                    value={cryptoAmount}
                    onChange={e => setCryptoAmount(e.target.value)}
                  />
                </div>
                <span className="topup-crypto-currency">฿</span>
              </div>
              <div className="topup-crypto-presets">
                {[100,300,500,1000,1500,3000].map(n => (
                  <button key={n} className="topup-crypto-preset" onClick={() => setCryptoAmount(String(n))}>฿{n}</button>
                ))}
              </div>
            </div>

            {/* Rate info */}
            <div className="topup-crypto-info">
              {rateLoading ? (
                <span className="topup-crypto-rate">กำลังโหลดราคา...</span>
              ) : (
                <>
                  <span>{t("topupCryptoAmountToPay")} <strong>{cryptoToPay.toLocaleString("en-US", { minimumFractionDigits: 6, maximumFractionDigits: 6 })} {CRYPTO_CURRENCY[cryptoNet]}</strong></span>
                  <span className="topup-crypto-rate">· 1 {CRYPTO_CURRENCY[cryptoNet]} = {coinThb.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</span>
                </>
              )}
            </div>

            <button className="topup-submit-btn topup-crypto-order-btn" disabled={!cryptoAmount || parseFloat(cryptoAmount) <= 0}>
              {t("topupCryptoCreateOrder")}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2a: TrueMoney envelope ── */}
      {method === "envelope" && (
        <div className="topup-form-section">
          <button className="topup-back-btn" onClick={() => setMethod(null)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t("topupBack")}
          </button>

          <div className="topup-form-card">
            <div className="topup-form-header">
              <div className="topup-form-header-icon topup-icon-envelope">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <polyline points="2,5 12,13 22,5"/>
                </svg>
              </div>
              <div>
                <h3 className="topup-form-title">{t("topupEnvelopeTitle")}</h3>
                <p className="topup-form-sub">{t("topupEnvelopeSub")}</p>
              </div>
            </div>

            <div className="topup-truemoney-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pinimg.com/736x/cc/f7/3b/ccf73b7e9130e64af8355b8d24032704.jpg" alt="TrueMoney" style={{width:24,height:24,borderRadius:6,objectFit:"cover",flexShrink:0}} />
              <span>True<b>Money</b> Wallet</span>
              <span className="topup-truemoney-fee">2.9% fee</span>
            </div>

            <div className="topup-field">
              <label className="topup-label">ลิงก์ซองอังเปา</label>
              <div className="topup-input-wrap">
                <svg className="topup-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <input
                  className="topup-input"
                  type="url"
                  placeholder={t("topupEnvelopePlaceholder")}
                  value={link}
                  onChange={e => setLink(e.target.value)}
                />
              </div>
            </div>

            <label className="topup-checkbox-label">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="topup-checkbox" />
              <span>{t("topupEnvelopeTerms")}<Link href="/refund-policy" className="topup-terms-link" onClick={e => e.stopPropagation()}>{t("topupEnvelopeTermsLink")}</Link></span>
            </label>

            <button
              className="topup-submit-btn"
              disabled={!link.trim() || !agreed}
            >
              {t("topupBtnConfirm")}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2b: PromptPay ── */}
      {method === "promptpay" && (
        <div className="topup-form-section">
          <button className="topup-back-btn" onClick={() => setMethod(null)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t("topupBack")}
          </button>

          <div className="topup-form-card">
            <div className="topup-form-header">
              <div className="topup-form-header-icon topup-icon-promptpay">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="5" y="5" width="3" height="3" fill="currentColor" rx=".5"/><rect x="16" y="5" width="3" height="3" fill="currentColor" rx=".5"/><rect x="5" y="16" width="3" height="3" fill="currentColor" rx=".5"/>
                </svg>
              </div>
              <div>
                <h3 className="topup-form-title">{t("topupPromptPayTitle")}</h3>
                <p className="topup-form-sub">{t("topupPromptPaySub")}</p>
              </div>
            </div>

            {/* QR placeholder */}
            <div className="topup-qr-wrap">
              <div className="topup-qr-box">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.2}}>
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="3" height="3" rx=".5"/><rect x="18" y="14" width="3" height="3" rx=".5"/><rect x="14" y="18" width="3" height="3" rx=".5"/><rect x="18" y="18" width="3" height="3" rx=".5"/>
                  <rect x="5" y="5" width="3" height="3" fill="currentColor" rx=".5"/><rect x="16" y="5" width="3" height="3" fill="currentColor" rx=".5"/><rect x="5" y="16" width="3" height="3" fill="currentColor" rx=".5"/>
                </svg>
                <span className="topup-qr-label">QR Code</span>
              </div>
            </div>

            <div className="topup-field">
              <label className="topup-label">{t("topupSlipAmount")}</label>
              <div className="topup-input-wrap">
                <svg className="topup-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <input
                  className="topup-input"
                  type="number"
                  min="1"
                  placeholder={t("topupSlipAmountPlaceholder")}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="topup-field">
              <label className="topup-label">{t("topupSlipUpload")}</label>
              <div
                className={`topup-dropzone${ppDrag ? " drag" : ""}${ppFile ? " has-file" : ""}`}
                onDragOver={e => { e.preventDefault(); setPpDrag(true); }}
                onDragLeave={() => setPpDrag(false)}
                onDrop={handlePpDrop}
                onClick={() => ppFileInputRef.current?.click()}
              >
                <input
                  ref={ppFileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                  onChange={e => setPpFile(e.target.files?.[0] ?? null)}
                />
                {ppFile ? (
                  <div className="topup-dropzone-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(ppFile)} alt="preview" className="topup-dropzone-img" />
                    <span className="topup-dropzone-preview-name">{ppFile.name}</span>
                  </div>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.4}}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="topup-dropzone-label">{t("topupSlipDragDrop")}</span>
                    <span className="topup-dropzone-note">{t("topupSlipNote")}</span>
                  </>
                )}
              </div>
            </div>

            <label className="topup-checkbox-label">
              <input type="checkbox" checked={agreedPp} onChange={e => setAgreedPp(e.target.checked)} className="topup-checkbox" />
              <span>{t("topupEnvelopeTerms")}<Link href="/refund-policy" className="topup-terms-link" onClick={e => e.stopPropagation()}>{t("topupEnvelopeTermsLink")}</Link></span>
            </label>

            <button
              className="topup-submit-btn"
              disabled={!amount || !ppFile || !agreedPp}
            >
              {t("topupBtnSubmit")}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2c: Bank slip ── */}
      {method === "slip" && (
        <div className="topup-form-section">
          <button className="topup-back-btn" onClick={() => setMethod(null)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t("topupBack")}
          </button>

          <div className="topup-form-card">
            <div className="topup-form-header">
              <div className="topup-form-header-icon topup-icon-slip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div>
                <h3 className="topup-form-title">{t("topupSlipTitle")}</h3>
                <p className="topup-form-sub">{t("topupSlipSub")}</p>
              </div>
            </div>

            {/* Bank account info */}
            <div className="topup-bank-info">
              <div className="topup-bank-row">
                <span className="topup-bank-label">ธนาคาร</span>
                <span className="topup-bank-value topup-bank-name-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pinimg.com/564x/66/3b/5e/663b5ede3b55beaee63bf3100db21f25.jpg" alt="K Plus" className="topup-bank-logo" />
                  กสิกรไทย (KBank)
                </span>
              </div>
              <div className="topup-bank-row">
                <span className="topup-bank-label">ชื่อบัญชี</span>
                <span className="topup-bank-value">นาย หล่อรวย สุดโหด</span>
              </div>
              <div className="topup-bank-row">
                <span className="topup-bank-label">เลขบัญชี</span>
                <span className="topup-bank-value topup-bank-account">xxx-x-xxxxx-x</span>
              </div>
            </div>

            <div className="topup-field">
              <label className="topup-label">{t("topupSlipAmount")}</label>
              <div className="topup-input-wrap">
                <svg className="topup-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <input
                  className="topup-input"
                  type="number"
                  min="1"
                  placeholder={t("topupSlipAmountPlaceholder")}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="topup-field">
              <label className="topup-label">{t("topupSlipUpload")}</label>
              <div
                className={`topup-dropzone${slipDrag ? " drag" : ""}${slipFile ? " has-file" : ""}`}
                onDragOver={e => { e.preventDefault(); setSlipDrag(true); }}
                onDragLeave={() => setSlipDrag(false)}
                onDrop={handleSlipDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                  onChange={e => setSlipFile(e.target.files?.[0] ?? null)}
                />
                {slipFile ? (
                  <div className="topup-dropzone-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(slipFile)} alt="preview" className="topup-dropzone-img" />
                    <span className="topup-dropzone-preview-name">{slipFile.name}</span>
                  </div>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.4}}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="topup-dropzone-label">{t("topupSlipDragDrop")}</span>
                    <span className="topup-dropzone-note">{t("topupSlipNote")}</span>
                  </>
                )}
              </div>
            </div>

            <label className="topup-checkbox-label">
              <input type="checkbox" checked={agreedSlip} onChange={e => setAgreedSlip(e.target.checked)} className="topup-checkbox" />
              <span>{t("topupEnvelopeTerms")}<Link href="/refund-policy" className="topup-terms-link" onClick={e => e.stopPropagation()}>{t("topupEnvelopeTermsLink")}</Link></span>
            </label>

            <button
              className="topup-submit-btn"
              disabled={!amount || !slipFile || !agreedSlip}
            >
              {t("topupBtnSubmit")}
            </button>
          </div>
        </div>
      )}
    </SubpageShell>
  );
}
