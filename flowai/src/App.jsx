import { useEffect, useRef, useState } from "react";
import "./App.css";

const DASHBOARD_DATA = {
  "7D": {
    period: "Past 7 days",
    revenue: "₹18.4K",
    profit: "₹7.2K",
    growth: "+8.4%",
    revenueTrend: "+8.4%",
    profitTrend: "+5.1%",
    growthTrend: "vs. previous period",
    bars: [
      { label: "M1", value: 42 },
      { label: "M2", value: 58 },
      { label: "M3", value: 51 },
      { label: "M4", value: 68 },
      { label: "M5", value: 61 },
      { label: "M6", value: 76 },
      { label: "M7", value: 88 },
    ],
    insight:
      "Revenue accelerated this week, with returning customers contributing strongly to the increase.",
  },
  "30D": {
    period: "Past 30 days",
    revenue: "₹84.2K",
    profit: "₹31.7K",
    growth: "+24.6%",
    revenueTrend: "+12.8%",
    profitTrend: "+8.4%",
    growthTrend: "vs. previous period",
    bars: [
      { label: "W1", value: 42 },
      { label: "W2", value: 55 },
      { label: "W3", value: 49 },
      { label: "W4", value: 67 },
      { label: "W5", value: 61 },
      { label: "W6", value: 78 },
      { label: "W7", value: 73 },
      { label: "W8", value: 91 },
    ],
    insight:
      "Revenue is trending upward. Returning customers are contributing to the strongest growth in this period.",
  },
  "90D": {
    period: "Past quarter",
    revenue: "₹241.0K",
    profit: "₹96.8K",
    growth: "+31.2%",
    revenueTrend: "+31.2%",
    profitTrend: "+12.1%",
    growthTrend: "vs. previous period",
    bars: [
      { label: "M1", value: 55 },
      { label: "M2", value: 78 },
      { label: "M3", value: 94 },
    ],
    insight:
      "Quarterly performance shows sustained growth across the period, with revenue momentum continuing upward.",
  },
};

const FEATURES = [
  {
    icon: "✦",
    title: "AI Insights",
    text: "Find meaningful patterns without digging through endless reports.",
    highlight: "Pattern detection",
  },
  {
    icon: "↗",
    title: "Live Metrics",
    text: "Keep the numbers that matter visible and easy to understand.",
    highlight: "Focused metrics",
  },
  {
    icon: "◈",
    title: "One Workspace",
    text: "Bring performance, growth and revenue into one focused view.",
    highlight: "Unified workspace",
  },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function App() {
  const [range, setRange] = useState("30D");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [queryOpen, setQueryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const dashboard = DASHBOARD_DATA[range];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setQueryOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openDemo = () => {
    setQueryOpen(true);
    setAnalysis("");
    setQuery("");
  };

  const runDemoAnalysis = (event) => {
    event.preventDefault();

    if (!query.trim()) return;

    setAnalyzing(true);
    setAnalysis("");

    window.setTimeout(() => {
      setAnalysis(
        `Demo analysis: based on the ${range.toLowerCase()} view, ${dashboard.insight.toLowerCase()}`
      );
      setAnalyzing(false);
    }, 650);
  };

  return (
    <main className="app-container">
      <div className="navbar-wrapper" ref={navRef}>
        <nav className="navbar">
          <a href="#" className="logo" onClick={closeMenu}>
            Flow<span>AI</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#product" onClick={closeMenu}>Product</a>
            <a href="#features" onClick={closeMenu}>Features</a>
            <a href="#how" onClick={closeMenu}>How it works</a>

            <button
              className="primary-button mobile-only-cta"
              onClick={() => {
                closeMenu();
                openDemo();
              }}
            >
              Try demo →
            </button>
          </div>

          <div className="nav-actions">
            <button
              className="nav-button desktop-only-cta"
              onClick={openDemo}
            >
              Get Started
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      <section className="hero">
        <div className="hero-content reveal">
          <div className="eyebrow-badge">
            <span className="pulse-dot" />
            AI-POWERED BUSINESS INTELLIGENCE
          </div>

          <h1>
            Turn your data
            <br />
            into <span>decisions.</span>
          </h1>

          <p className="hero-text">
            FlowAI unifies fragmented business metrics into clear,
            continuous decision models — eliminating the noise so you
            can execute with certainty.
          </p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={openDemo}>
              Explore FlowAI →
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollToId("how")}
            >
              See how it works
            </button>
          </div>
        </div>

        <Dashboard
          range={range}
          setRange={setRange}
          dashboard={dashboard}
        />
      </section>

      <section className="section product-section reveal" id="product">
        <p className="eyebrow">THE PRODUCT</p>

        <h2>Ask better questions of your data.</h2>

        <p className="section-text">
          Instead of searching through reports, FlowAI surfaces the
          changes that actually deserve your attention.
        </p>

        <div className="insight-demo">
          <div className="demo-icon">✦</div>

          <div className="demo-body">
            <div className="demo-meta">
              <span className="demo-tag">FLOWAI DEMO INSIGHT</span>
              <span className="demo-status">Illustrative</span>
            </div>

            <h3>What&apos;s changing?</h3>

            <p>
              Customer retention increased while acquisition costs remained
              stable. The strongest opportunity is repeat revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" id="features">
        <p className="eyebrow">BUILT FOR CLARITY</p>

        <h2>Less analysis. More action.</h2>

        <div className="feature-grid">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.title}
              className={`feature-card ${
                selectedFeature === index ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedFeature(
                  selectedFeature === index ? null : index
                )
              }
              aria-pressed={selectedFeature === index}
            >
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <div className="feature-footer">
                <span className="feature-highlight">
                  {feature.highlight}
                </span>
                <span className="arrow">
                  {selectedFeature === index ? "Selected ✓" : "Explore →"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section how-section reveal" id="how">
        <div>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Raw data → clear decisions.</h2>
        </div>

        <div className="steps-container">
          <Step
            number="01"
            title="Connect"
            text="Bring your business data into one workspace."
          />
          <Step
            number="02"
            title="Understand"
            text="Surface meaningful changes and patterns."
          />
          <Step
            number="03"
            title="Act"
            text="Use the resulting insights to decide what happens next."
          />
        </div>
      </section>

      <section className="final-cta reveal">
        <p className="eyebrow">SEE WHAT MATTERS</p>

        <h2>Make your data useful.</h2>

        <p>Turn numbers into your next decision.</p>

        <button className="primary-button" onClick={openDemo}>
          Explore FlowAI →
        </button>
      </section>

      <footer>
        <div className="footer-brand">
          <strong>Flow<span>AI</span></strong>
          <p>AI-powered business intelligence demo</p>
        </div>

        <div className="footer-notice">
          Illustrative demo data · No live business data
        </div>
      </footer>

      {queryOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setQueryOpen(false);
          }}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
          >
            <div className="modal-header">
              <h3 id="demo-title">FlowAI Demo Analysis</h3>

              <button
                className="close-modal-btn"
                onClick={() => setQueryOpen(false)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <p className="modal-desc">
              Ask a question about the illustrative dashboard data.
              This is a frontend demo; no real AI request is sent.
            </p>

            <form className="modal-form" onSubmit={runDemoAnalysis}>
              <input
                className="modal-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. What is driving growth?"
                aria-label="Demo analysis question"
              />

              <button
                className="primary-button modal-submit"
                type="submit"
                disabled={analyzing}
              >
                {analyzing ? "Analyzing…" : "Run demo analysis →"}
              </button>
            </form>

            {analysis && (
              <div className="modal-result">
                <div className="result-header">
                  <span>✦</span>
                  <strong>Demo result</strong>
                </div>
                <p>{analysis}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Dashboard({ range, setRange, dashboard }) {
  return (
    <div className="dashboard reveal">
      <div className="dashboard-header">
        <div>
          <div className="dashboard-title-wrap">
            <span className="dashboard-title">Business Overview</span>
            <span className="demo-badge">DEMO DATA</span>
          </div>

          <span className="dashboard-sub">{dashboard.period}</span>
        </div>

        <div className="status-indicator">
          <span className="pulse-dot" />
          Demo Feed
        </div>
      </div>

      <div className="range-buttons" aria-label="Dashboard period">
        {Object.keys(DASHBOARD_DATA).map((item) => (
          <button
            key={item}
            className={range === item ? "active" : ""}
            onClick={() => setRange(item)}
            aria-pressed={range === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="stats-grid">
        <Stat title="Revenue" value={dashboard.revenue} trend={`↑ ${dashboard.revenueTrend}`} />
        <Stat title="Net Profit" value={dashboard.profit} trend={`↑ ${dashboard.profitTrend}`} />
        <Stat title="Growth Rate" value={dashboard.growth} trend={`↑ ${dashboard.growthTrend}`} />
      </div>

      <div className="chart-container">
        <div className="chart-label-row">
          <span>Revenue Volume</span>
          <span className="green-accent">↑ Trending Upward</span>
        </div>

        <div className="bars-track">
          {dashboard.bars.map((bar) => (
            <div
              className="bar-wrapper"
              key={bar.label}
              title={`${bar.label}: ${bar.value}`}
              tabIndex="0"
              aria-label={`${bar.label} revenue value ${bar.value}`}
            >
              <div className="bar-tooltip">{bar.value}</div>
              <div
                className="bar-fill"
                style={{ height: `${bar.value}%` }}
              />
              <span className="bar-label">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-insight-panel">
        <div className="ai-icon">✦</div>

        <div className="insight-content">
          <div className="insight-top">
            <strong>FlowAI Demo Insight</strong>
          </div>

          <p>{dashboard.insight}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, trend }) {
  return (
    <div className="stat-card">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-trend">{trend}</span>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="step-card">
      <span className="step-number">{number}</span>

      <div className="step-details">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default App;