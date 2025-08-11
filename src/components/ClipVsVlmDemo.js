import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './ClipVsVlmDemo.module.css';

/**
 * Interactive CLIP vs VLM Visualization
 * -------------------------------------
 * A React component that visually contrasts CLIP (two-tower) and
 * VLM (unified) multimodal processing over a mock PDF containing text and charts.
 */

// ----------------------------- Utilities & Constants -----------------------------
const MODES = { CLIP: "CLIP", VLM: "VLM" };

// Sequence steps (shared labels; actual visuals differ per mode)
const CLIP_STEPS = [
  "Select content in PDF",
  "Encode text in Text Tower",
  "Encode image in Image Tower",
  "Project to separate embedding spaces",
  "Compute similarity (text ↔ image)",
];

const VLM_STEPS = [
  "Select content in PDF",
  "Tokenize text + patchify image",
  "Joint processing with cross-modal attention",
  "Build unified embedding",
  "Answer/query using shared context",
];

const MONGODB_COLORS = {
  green: "#10A34A",
  dark: "#001E2B",
  mist: "#E8F5F0",
  slate: "#2B3A3F",
  lavender: "#D9D6F7",
};

// ----------------------------- Mini Components -----------------------------
function SectionTitle({ children }) {
  return <div className={styles.sectionTitle}>{children}</div>;
}

function Pill({ children }) {
  return <span className={styles.pill}>{children}</span>;
}

function ControlButton({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.controlButton}
    >
      {children}
    </button>
  );
}

// Simple icon buttons (SVG-only for portability)
const IconPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconPause = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);
const IconStep = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 6h2v12H6zm4 0l10 6-10 6z" />
  </svg>
);
const IconReset = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 6V3L8 7l4 4V8c2.8 0 5 2.2 5 5a5 5 0 11-9.9-1H5a7 7 0 1014 0c0-3.9-3.1-7-7-7z" />
  </svg>
);

// ----------------------------- Mock PDF Pane -----------------------------
function MockPDF({ selected, setSelected, highlightColor }) {
  const isSel = (id) => selected === id;

  return (
    <div className={styles.mockPdf}>
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: '0.75rem' }}>
        {/* PDF Heading */}
        <div
          onClick={() => setSelected("title")}
          className={`${styles.pdfBlock} ${isSel("title") ? styles.pdfBlockSelected : ""}`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            ['--selection-color']: highlightColor,
          }}
        >
          Multimodal Report: Q3 Outcomes
        </div>

        {/* Content area: left text column, right figures */}
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '2fr 1fr' : '1fr', gap: '0.75rem' }}>
          {/* Text column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              onClick={() => setSelected("para1")}
              className={`${styles.pdfBlock} ${isSel("para1") ? styles.pdfBlockSelected : ""}`}
              style={{ ['--selection-color']: highlightColor }}
            >
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Executive Summary.</strong> Revenue grew 18% YoY with strong
                contributions from regions A and C. Customer sentiment indicates
                increased adoption of visual search features.
              </p>
              <p style={{ margin: 0 }}>
                Key risks include latency in inference pipelines and the need for
                unified multimodal context to interpret charts alongside
                narrative commentary.
              </p>
            </div>

            <div
              onClick={() => setSelected("para2")}
              className={`${styles.pdfBlock} ${isSel("para2") ? styles.pdfBlockSelected : ""}`}
              style={{ ['--selection-color']: highlightColor }}
            >
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Findings.</strong> The bar chart (Fig. 1) shows Region C
                outperforming projections after launching a vision-based
                onboarding. The line chart (Fig. 2) tracks weekly usage spikes
                aligned with documentation updates.
              </p>
              <p style={{ margin: 0 }}>
                A system that jointly reasons over text and figures improves
                retrieval accuracy for Q&A about trends and anomalies.
              </p>
            </div>
          </div>

          {/* Figures column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <FigureBarChart
              onClick={() => setSelected("chart1")}
              active={isSel("chart1")}
              title="Fig. 1 – Regional Performance"
              accent={highlightColor}
            />
            <FigureLineChart
              onClick={() => setSelected("chart2")}
              active={isSel("chart2")}
              title="Fig. 2 – Weekly Usage"
              accent={highlightColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FigureBarChart({ onClick, active, title, accent }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.pdfBlock} ${active ? styles.pdfBlockSelected : ""}`}
      style={{ ['--selection-color']: accent, padding: '0.75rem' }}
    >
      <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <svg viewBox="0 0 240 110" style={{ width: '100%', height: '7rem' }}>
        <rect x="0" y="0" width="240" height="110" rx="8" fill="var(--ifm-color-emphasis-100)" />
        {[
          { x: 20, h: 50 },
          { x: 60, h: 80 },
          { x: 100, h: 65 },
          { x: 140, h: 95 },
          { x: 180, h: 40 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={100 - b.h}
            width={24}
            height={b.h}
            rx={4}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.05 * i, type: "spring", stiffness: 120 }}
            fill={i === 3 ? accent : "var(--ifm-color-emphasis-400)"}
          />
        ))}
      </svg>
    </div>
  );
}

function FigureLineChart({ onClick, active, title, accent }) {
  const points = [
    [10, 90],
    [40, 80],
    [70, 60],
    [100, 65],
    [130, 40],
    [160, 50],
    [190, 30],
    [220, 35],
  ];
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  return (
    <div
      onClick={onClick}
      className={`${styles.pdfBlock} ${active ? styles.pdfBlockSelected : ""}`}
      style={{ ['--selection-color']: accent, padding: '0.75rem' }}
    >
      <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <svg viewBox="0 0 240 110" style={{ width: '100%', height: '7rem' }}>
        <rect x="0" y="0" width="240" height="110" rx="8" fill="var(--ifm-color-emphasis-100)" />
        <path d={d} fill="none" stroke={accent} strokeWidth="3" />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill={accent} />
        ))}
      </svg>
    </div>
  );
}

// ----------------------------- CLIP View -----------------------------
function ClipView({ selectedId, step, playing }) {
  // Colors for the towers
  const textColor = "#2563EB"; // blue
  const imgColor = "#DB2777"; // pink

  // Embedding dots
  const dotsLeft = useMemo(() => randomDots(24, 80, 80), []);
  const dotsRight = useMemo(() => randomDots(24, 80, 80), []);

  const showLeft = step >= 1; // encoded text
  const showRight = step >= 2; // encoded image
  const showSpaces = step >= 3; // separate spaces
  const showSim = step >= 4; // similarity

  const labelSelected =
    selectedId === "para1" || selectedId === "para2" || selectedId === "title"
      ? "Text"
      : selectedId
      ? "Image"
      : "";

  return (
    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr', gap: '1rem' }}>
      {/* Two towers */}
      <div className={styles.card}>
        <SectionTitle>Two-Tower Encoders</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <Tower
            title="Text Encoder"
            color={textColor}
            active={step >= 1}
            description="Encodes paragraphs/headings into text embeddings."
          />
          <Tower
            title="Image Encoder"
            color={imgColor}
            active={step >= 2}
            description="Encodes charts/figures into image embeddings."
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Pill>Selected: {labelSelected || "(click a region in the PDF)"}</Pill>
        </div>
      </div>

      {/* Embedding spaces + similarity */}
      <div className={styles.card}>
        <SectionTitle>Separate Embedding Spaces & Similarity</SectionTitle>
        <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', gap: '1rem', alignItems: 'center' }}>
          {/* Text space */}
          <div className={styles.embeddingSpace}>
            <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontSize: '0.75rem', fontWeight: '500', color: textColor }}>
              Text space
            </div>
            {showSpaces && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <SvgDots dots={dotsLeft} color={textColor} />
              </motion.g>
            )}
            {showLeft && (
              <FlowDot side="left" color={textColor} playing={playing} />
            )}
          </div>

          {/* Image space */}
          <div className={styles.embeddingSpace}>
            <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontSize: '0.75rem', fontWeight: '500', color: imgColor }}>
              Image space
            </div>
            {showSpaces && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <SvgDots dots={dotsRight} color={imgColor} />
              </motion.g>
            )}
            {showRight && (
              <FlowDot side="right" color={imgColor} playing={playing} />
            )}
          </div>
        </div>

        {/* Similarity line */}
        <div style={{ marginTop: '1rem' }}>
          <AnimatePresence>
            {showSim && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}
              >
                <div style={{ height: '0.5rem', width: '0.5rem', borderRadius: '50%', background: textColor }} />
                <div>cosine similarity</div>
                <div style={{ height: '0.5rem', width: '0.5rem', borderRadius: '50%', background: imgColor }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Tower({ title, color, active, description }) {
  return (
    <div className={styles.tower}>
      <div className={styles.towerTitle} style={{ color }}>{title}</div>
      <div className={styles.towerContent}>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              style={{ textAlign: 'center', padding: '0.5rem' }}
            >
              <span style={{ 
                display: 'inline-block', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.375rem',
                background: `${color}15`, 
                color,
                fontSize: '0.75rem'
              }}>
                tokens / patches
              </span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>→ embedding vector</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--ifm-color-secondary-darkest)' }}>
        {description}
      </div>
    </div>
  );
}

function SvgDots({ dots, color }) {
  return (
    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={color} opacity={0.8} />
      ))}
    </svg>
  );
}

function FlowDot({ side, color, playing }) {
  // Simple orbiting dot to indicate activity
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => (v + 1) % 200), 30);
    return () => clearInterval(id);
  }, [playing]);
  const x = 50 + (side === "left" ? -20 : 20) * Math.cos((Math.PI * 2 * t) / 200);
  const y = 50 + 20 * Math.sin((Math.PI * 2 * t) / 200);
  return (
    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <circle cx={x} cy={y} r={3} fill={color} />
    </svg>
  );
}

// ----------------------------- VLM View -----------------------------
function VlmView({ selectedId, step, playing }) {
  const accent = MONGODB_COLORS.green;

  const labelSelected = selectedId
    ? selectedId === "chart1" || selectedId === "chart2"
      ? "Text + Image (patch tokens)"
      : "Text tokens"
    : "";

  return (
    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr', gap: '1rem' }}>
      {/* Unified model with attention */}
      <div className={styles.card}>
        <SectionTitle>Unified Vision-Language Model</SectionTitle>
        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
          <div className={`${styles.tower} ${styles.cardDark}`}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', color: accent }}>
              Tokenization & Patchification
            </div>
            <TokenRow step={step} accent={accent} playing={playing} />
          </div>

          <div className={`${styles.tower} ${styles.cardDark}`}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', color: accent }}>
              Cross-Modal Attention (co-attention)
            </div>
            <AttentionGrid step={step} accent={accent} playing={playing} />
          </div>

          <div className={`${styles.tower} ${styles.cardDark}`}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', color: accent }}>
              Unified Embedding / Context
            </div>
            <UnifiedSpace step={step} accent={accent} />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Pill>Selected: {labelSelected || "(click a region in the PDF)"}</Pill>
        </div>
      </div>

      {/* Explanations */}
      <div className={styles.card}>
        <SectionTitle>How VLM Differs</SectionTitle>
        <ul className={styles.explanationList}>
          <li>
            <strong>Single backbone:</strong> Text <em>and</em> image patches are processed
            together, enabling shared representations.
          </li>
          <li>
            <strong>Co-attention:</strong> Text attends to visual regions and vice versa—
            grounding words like "Region C spike" in the exact chart segments.
          </li>
          <li>
            <strong>Unified space:</strong> Outputs live in one embedding space/context,
            ideal for Q&A, reasoning, and step-by-step answers.
          </li>
        </ul>
      </div>
    </div>
  );
}

function TokenRow({ step, accent, playing }) {
  // Animated chips representing mixed tokens
  const tokens = useMemo(
    () =>
      new Array(18).fill(0).map((_, i) => ({
        id: i,
        type: i % 3 === 0 ? "img" : "txt",
      })),
    []
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tokens.map((t, i) => (
        <motion.span
          key={t.id}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: step >= 1 ? 0 : 10, opacity: step >= 1 ? 1 : 0 }}
          transition={{ delay: 0.02 * i, type: "spring", stiffness: 120 }}
          className={styles.tokenChip}
          style={{
            borderColor: t.type === "img" ? `${accent}66` : "var(--ifm-color-emphasis-300)",
            background: t.type === "img" ? `${accent}15` : "var(--ifm-background-color)",
          }}
        >
          {t.type === "img" ? "[patch]" : "token"}
        </motion.span>
      ))}
    </div>
  );
}

function AttentionGrid({ step, accent, playing }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((t) => t + 1), 450);
    return () => clearInterval(id);
  }, [playing]);

  // 6x6 grid with animated attention links
  const N = 6;
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      cells.push({ r, c, id: r * N + c });
    }
  }
  const active = (i) => (tick + i) % 7 === 0;

  return (
    <div>
      <div className={styles.attentionGrid}>
        {cells.map((cell, i) => (
          <div
            key={cell.id}
            className={styles.attentionCell}
            style={{
              background:
                step >= 2 && active(i) ? `${accent}33` : step >= 2 ? "var(--ifm-background-color)" : "var(--ifm-color-emphasis-100)",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: '0.625rem', color: 'var(--ifm-color-secondary-darkest)', marginTop: '0.5rem' }}>
        Cells pulse to suggest heads attending across text and image patches.
      </div>
    </div>
  );
}

function UnifiedSpace({ step, accent }) {
  // Compact unified embedding visualization
  const dots = useMemo(() => randomDots(36, 100, 70), []);
  return (
    <div className={styles.embeddingSpace} style={{ height: '10rem' }}>
      <AnimatePresence>
        {step >= 3 && (
          <motion.svg
            viewBox="0 0 120 80"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r}
                fill={i % 3 === 0 ? accent : "var(--ifm-color-emphasis-600)"} opacity={0.9} />
            ))}
          </motion.svg>
        )}
      </AnimatePresence>
      <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', fontSize: '0.625rem', color: 'var(--ifm-color-secondary-darkest)' }}>
        One shared representation → better grounded answers.
      </div>
    </div>
  );
}

// ----------------------------- Shared Helpers -----------------------------
function randomDots(n, w, h) {
  return new Array(n).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1 + Math.random() * 1.5,
  }));
}

// ----------------------------- Main Demo Container -----------------------------
function ClipVsVlmDemo() {
  const [mode, setMode] = useState(MODES.CLIP);
  const [selected, setSelected] = useState("para1");
  const [step, setStep] = useState(0); // index within steps
  const [playing, setPlaying] = useState(false);

  const steps = mode === MODES.CLIP ? CLIP_STEPS : VLM_STEPS;

  // Auto-advance when playing
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  // Reset step when mode changes for clarity
  useEffect(() => {
    setStep(0);
  }, [mode]);

  const highlight = mode === MODES.CLIP ? "#22c55e" : MONGODB_COLORS.lavender;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>
              CLIP vs VLM – Multimodal Processing Demo
            </h1>
            <p className={styles.subtitle}>
              Visual walkthrough of how a PDF with text + charts flows through a two-tower CLIP
              versus a unified Vision-Language Model. Click areas in the mock PDF, then play or
              step the animation to see each architecture in action.
            </p>
          </div>
          <div className={styles.modeButtons}>
            <button
              onClick={() => setMode(MODES.CLIP)}
              className={`${styles.modeButton} ${mode === MODES.CLIP ? styles.modeButtonActive : ''}`}
            >
              CLIP View
            </button>
            <button
              onClick={() => setMode(MODES.VLM)}
              className={`${styles.modeButton} ${mode === MODES.VLM ? styles.modeButtonActive : ''}`}
            >
              VLM View
            </button>
          </div>
        </div>
      </div>

      {/* Layout: PDF left, Visualization right (stack on small screens) */}
      <div className={styles.mainGrid}>
        {/* PDF */}
        <div className={styles.section}>
          <SectionTitle>Mock PDF</SectionTitle>
          <div style={{ marginTop: '0.75rem' }}>
            <MockPDF selected={selected} setSelected={setSelected} highlightColor={highlight} />
          </div>
        </div>

        {/* Visualization */}
        <div className={styles.section}>
          <div className={styles.controlBar}>
            <SectionTitle>{mode === MODES.CLIP ? "CLIP Processing" : "VLM Processing"}</SectionTitle>
            <div className={styles.controls}>
              <ControlButton onClick={() => setPlaying((p) => !p)}>
                {playing ? (
                  <><IconPause /> Pause</>
                ) : (
                  <><IconPlay /> Play</>
                )}
              </ControlButton>
              <ControlButton onClick={() => setStep((s) => (s + 1) % steps.length)}>
                <IconStep /> Step
              </ControlButton>
              <ControlButton
                onClick={() => {
                  setPlaying(false);
                  setStep(0);
                }}
              >
                <IconReset /> Reset
              </ControlButton>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            {mode === MODES.CLIP ? (
              <ClipView selectedId={selected} step={step} playing={playing} />
            ) : (
              <VlmView selectedId={selected} step={step} playing={playing} />
            )}
          </div>

          {/* Step explanation */}
          <div className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <div>
                <div className={styles.stepLabel}>Current step</div>
                <div className={styles.stepTitle}>{steps[step]}</div>
              </div>
              <div>
                <Pill>{mode}</Pill>
              </div>
            </div>
            <div className={styles.stepHelp}>
              <StepHelp mode={mode} step={step} />
            </div>
          </div>
        </div>
      </div>

      {/* Key differences banner */}
      <div className={styles.diffGrid}>
        <DiffCard title="Encoders" clip="Two separate towers" vlm="One shared backbone" />
        <DiffCard title="Embedding Space" clip="Text & image spaces distinct" vlm="Unified space/context" />
        <DiffCard title="Strength" clip="Fast retrieval via similarity" vlm="Grounded reasoning & Q&A" />
      </div>
    </div>
  );
}

function DiffCard({ title, clip, vlm }) {
  return (
    <div className={styles.diffCard}>
      <div className={styles.diffTitle}>{title}</div>
      <div className={styles.diffContent}>
        <div>
          <div className={styles.diffLabel}>CLIP</div>
          <div className={styles.diffValue}>{clip}</div>
        </div>
        <div>
          <div className={styles.diffLabel}>VLM</div>
          <div className={styles.diffValue}>{vlm}</div>
        </div>
      </div>
    </div>
  );
}

function StepHelp({ mode, step }) {
  const isClip = mode === MODES.CLIP;
  const map = isClip ? CLIP_STEPS : VLM_STEPS;
  const key = map[step];

  const help = {
    // CLIP
    "Select content in PDF":
      "Click paragraphs or figures. We'll route text to the text tower and images to the image tower.",
    "Encode text in Text Tower":
      "Tokenize text → pass through transformer → produce a text embedding.",
    "Encode image in Image Tower":
      "Patchify image → pass through vision backbone → produce an image embedding.",
    "Project to separate embedding spaces":
      "Each tower outputs to its own space; you compare across spaces indirectly.",
    "Compute similarity (text ↔ image)":
      "Cosine similarity ranks which image best matches a query caption (or vice versa).",

    // VLM
    "Tokenize text + patchify image":
      "Both modalities are converted to a shared token sequence (words + pixels).",
    "Joint processing with cross-modal attention":
      "Attention layers let words attend to visual regions and images attend to words.",
    "Build unified embedding":
      "The model forms one shared representation grounded in both text and vision.",
    "Answer/query using shared context":
      "Downstream heads (e.g., QA) read the unified context for grounded responses.",
  };

  return <>{help[key] || ""}</>;
}

// Wrap with BrowserOnly to ensure client-side only rendering
export default function ClipVsVlmDemoWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <ClipVsVlmDemo />}
    </BrowserOnly>
  );
}