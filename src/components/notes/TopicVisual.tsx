export type TopicVisualLayout = "curve" | "flow" | "tree" | "stack" | "matrix" | "cell";

export interface TopicVisualNode {
  label: string;
  detail: string;
}

export interface TopicVisualSpec {
  subject: string;
  topic: string;
  title: string;
  description: string;
  layout: TopicVisualLayout;
  variant?: "trig" | "derivative" | "integral" | "normal" | "hypothesis" | "energy" | "kinetics" | "spectrum";
  nodes: TopicVisualNode[];
  examLink: string;
}

export const topicVisualCatalog: TopicVisualSpec[] = [
  {
    subject: "9709", topic: "3.3", title: "Reading a trigonometric graph", layout: "curve", variant: "trig",
    description: "Amplitude controls vertical scale, while period controls horizontal repetition. Phase changes move the graph without changing its shape.",
    nodes: [], examLink: "Mark one complete cycle first; transformed intercepts and turning points then follow from the period and phase shift.",
  },
  {
    subject: "9709", topic: "3.4", title: "Derivative as the changing gradient", layout: "curve", variant: "derivative",
    description: "The tangent gradient is positive while the curve rises, zero at a stationary point and negative while the curve falls.",
    nodes: [], examLink: "Classify a stationary point using the sign change of dy/dx or the value of d²y/dx².",
  },
  {
    subject: "9709", topic: "3.5", title: "Definite integration as signed area", layout: "curve", variant: "integral",
    description: "A definite integral adds thin signed strips. Area above the axis is positive; area below it is negative unless geometric area is requested.",
    nodes: [], examLink: "Split the integral at every axis crossing when the question asks for total area.",
  },
  {
    subject: "9709", topic: "4.1", title: "Resolving a force", layout: "tree",
    description: "Choose perpendicular axes, resolve every force once, then apply equilibrium separately in each direction.",
    nodes: [
      { label: "Force F at angle θ", detail: "Start from the labelled direction of θ." },
      { label: "Parallel component", detail: "F cos θ when adjacent to θ." },
      { label: "Perpendicular component", detail: "F sin θ when opposite θ." },
    ], examLink: "Draw the force diagram before writing ΣF = 0; an incorrect component direction usually causes every later line to fail.",
  },
  {
    subject: "9709", topic: "4.3", title: "Momentum before and after interaction", layout: "flow",
    description: "For an isolated system, total signed momentum immediately before an interaction equals total signed momentum immediately after it.",
    nodes: [
      { label: "Choose positive direction", detail: "Give every velocity a consistent sign." },
      { label: "Before", detail: "Calculate Σmv for all bodies." },
      { label: "Conservation", detail: "Set Σmv before = Σmv after." },
      { label: "After", detail: "Solve, then interpret the sign of velocity." },
    ], examLink: "A negative answer is a direction, not automatically an error.",
  },
  {
    subject: "9709", topic: "5.3", title: "Conditional probability tree", layout: "tree",
    description: "Branch probabilities are conditional on the route already taken. Multiply along one route and add mutually exclusive complete routes.",
    nodes: [
      { label: "First event", detail: "Branches A and A′ sum to 1." },
      { label: "After A", detail: "Use P(B|A) and P(B′|A)." },
      { label: "After A′", detail: "Use P(B|A′) and P(B′|A′)." },
    ], examLink: "The denominator in P(A|B) is the condition B—the reduced sample space.",
  },
  {
    subject: "9709", topic: "5.5", title: "Standardising a normal variable", layout: "curve", variant: "normal",
    description: "The standard score measures displacement from the mean in standard deviations: z = (x − μ)/σ.",
    nodes: [], examLink: "Sketch and shade the required tail before using tables or a calculator; this prevents complement errors.",
  },
  {
    subject: "9709", topic: "6.5", title: "Critical region and significance", layout: "curve", variant: "hypothesis",
    description: "The rejection region is chosen under H₀ so that its probability is no greater than the significance level α.",
    nodes: [], examLink: "Conclude in context: state whether there is sufficient evidence for the claim, not that H₀ has been proved.",
  },
  {
    subject: "9701", topic: "23", title: "Activation energy on an enthalpy profile", layout: "curve", variant: "energy",
    description: "The peak represents the transition state. A catalyst lowers the activation energy but does not change ΔH or the reactant/product energy levels.",
    nodes: [], examLink: "Use vertical energy differences for Eₐ and ΔH; do not measure along the curved pathway.",
  },
  {
    subject: "9701", topic: "24", title: "Electrochemical cell map", layout: "cell",
    description: "Oxidation releases electrons at the negative electrode; reduction consumes them at the positive electrode. The salt bridge preserves charge balance.",
    nodes: [
      { label: "Negative electrode", detail: "Oxidation: Red → Ox + e⁻" },
      { label: "Positive electrode", detail: "Reduction: Ox + e⁻ → Red" },
    ], examLink: "E°cell = E°(right-hand reduction) − E°(left-hand reduction) when the cell diagram is written left to right.",
  },
  {
    subject: "9701", topic: "25", title: "How equilibrium responds", layout: "flow",
    description: "A system at equilibrium shifts only when concentration, pressure or temperature changes; a catalyst changes neither position nor K.",
    nodes: [
      { label: "Apply a change", detail: "Identify exactly what increased or decreased." },
      { label: "Compare Q with K", detail: "The current composition is no longer at equilibrium." },
      { label: "Shift", detail: "Net reaction opposes the imposed change." },
      { label: "New equilibrium", detail: "Forward and reverse rates become equal again." },
    ], examLink: "Only temperature changes the value of K for a specified reaction.",
  },
  {
    subject: "9701", topic: "26", title: "Concentration–time evidence", layout: "curve", variant: "kinetics",
    description: "The tangent gradient gives instantaneous rate. As reactants are consumed, successful collisions become less frequent and the curve flattens.",
    nodes: [], examLink: "When comparing experiments, use the same concentration interval or construct tangents at the stated time.",
  },
  {
    subject: "9701", topic: "28", title: "Building a transition-metal complex", layout: "tree",
    description: "The metal ion accepts lone pairs from ligands. Coordination number, ligand denticity and oxidation state together determine formula and geometry.",
    nodes: [
      { label: "Central Mⁿ⁺ ion", detail: "Provides vacant orbitals and carries the oxidation state." },
      { label: "Monodentate ligands", detail: "One coordinate bond per ligand, such as H₂O or NH₃." },
      { label: "Multidentate ligands", detail: "Two or more donor atoms form chelate rings." },
    ], examLink: "Include square brackets and the overall charge when writing a complex ion formula.",
  },
  {
    subject: "9701", topic: "29", title: "Reading an organic mechanism", layout: "flow",
    description: "A mechanism tracks electron-pair movement, not atom movement. Curly arrows start at a bond or lone pair and finish where the pair forms a bond.",
    nodes: [
      { label: "Locate electron-rich site", detail: "Bond or lone pair is the arrow tail." },
      { label: "Locate electron-poor site", detail: "δ⁺ centre or positive ion is attacked." },
      { label: "Move an electron pair", detail: "Use a full curly arrow with correct direction." },
      { label: "Check charges", detail: "Atoms, charge and lone pairs must balance." },
    ], examLink: "Never start a curly arrow in empty space or point it vaguely at an atom.",
  },
  {
    subject: "9701", topic: "36", title: "Planning a multi-step synthesis", layout: "flow",
    description: "Work backwards from the target functional group, choosing reactions whose reagents, conditions and products you can state precisely.",
    nodes: [
      { label: "Target molecule", detail: "Identify the final functional group and carbon skeleton." },
      { label: "Immediate precursor", detail: "Reverse one known functional-group conversion." },
      { label: "Earlier precursor", detail: "Preserve the required carbon count or add carbon deliberately." },
      { label: "Starting material", detail: "Write the forward route with reagents and conditions." },
    ], examLink: "Check selectivity: a reagent may react with more than one functional group in the molecule.",
  },
  {
    subject: "9701", topic: "37", title: "Combining analytical evidence", layout: "curve", variant: "spectrum",
    description: "Chromatography separates components, mass spectrometry constrains formula and fragments, and NMR reveals chemical environments. A secure structure must satisfy all evidence.",
    nodes: [], examLink: "Treat each peak as a constraint; verify molecular mass, integration, splitting and chemical shift together.",
  },
  {
    subject: "9618", topic: "14.2", title: "Packet switching across a network", layout: "flow",
    description: "A message is divided into addressed packets that may take different routes before being checked, reordered and reassembled.",
    nodes: [
      { label: "Segment", detail: "Split data and add sequence information." },
      { label: "Route", detail: "Routers forward packets using destination addresses." },
      { label: "Check", detail: "Detect corruption or missing packets." },
      { label: "Reassemble", detail: "Restore the original order at the destination." },
    ], examLink: "Explain both the efficiency benefit and the overhead of headers, routing and reassembly.",
  },
  {
    subject: "9618", topic: "15.1", title: "Instruction pipeline", layout: "flow",
    description: "Pipelining overlaps stages from different instructions. Throughput improves after the pipeline fills, but one instruction does not necessarily finish faster.",
    nodes: [
      { label: "Fetch", detail: "Read the next instruction from memory." },
      { label: "Decode", detail: "Interpret opcode and operands." },
      { label: "Execute", detail: "Perform the operation in the appropriate unit." },
      { label: "Write back", detail: "Store the result and update state." },
    ], examLink: "Branches and data dependencies can stall or flush a pipeline, reducing the theoretical speed-up.",
  },
  {
    subject: "9618", topic: "15.2", title: "From Boolean expression to circuit", layout: "flow",
    description: "Translate one logical operation at a time, preserve brackets, then verify the completed circuit against a truth table.",
    nodes: [
      { label: "Expression", detail: "Identify NOT, AND and OR operations in precedence order." },
      { label: "Sub-expressions", detail: "Draw and label each intermediate output." },
      { label: "Circuit", detail: "Connect gates without changing logical grouping." },
      { label: "Truth table", detail: "Test all 2ⁿ input combinations." },
    ], examLink: "De Morgan’s laws change both the operator and every complemented term.",
  },
  {
    subject: "9618", topic: "16.1", title: "Operating-system layers", layout: "stack",
    description: "Applications request services through the operating system; the kernel manages protected access to processor time, memory, files and devices.",
    nodes: [
      { label: "Applications", detail: "Use APIs and system calls rather than controlling hardware directly." },
      { label: "User interface and utilities", detail: "Provide interaction and maintenance tools." },
      { label: "Kernel", detail: "Schedules processes and manages memory, files and security." },
      { label: "Drivers and hardware", detail: "Translate generic requests into device-specific operations." },
    ], examLink: "Distinguish resource management by the kernel from convenience software supplied with an OS.",
  },
  {
    subject: "9618", topic: "17.1", title: "Hybrid encryption in secure communication", layout: "flow",
    description: "Public-key cryptography authenticates or exchanges a temporary key; efficient symmetric encryption then protects the bulk data.",
    nodes: [
      { label: "Verify certificate", detail: "Trust the public key only after validating its signed identity." },
      { label: "Agree session key", detail: "Protect a fresh symmetric key using asymmetric methods." },
      { label: "Encrypt data", detail: "Use the session key for fast confidential transfer." },
      { label: "Authenticate", detail: "Integrity checks expose modification in transit." },
    ], examLink: "Encryption provides confidentiality; a digital signature provides origin authentication and integrity.",
  },
  {
    subject: "9618", topic: "19.2", title: "Recursive call stack", layout: "stack",
    description: "Each recursive call receives its own parameters and local variables. Base cases stop new frames; returns then unwind in reverse order.",
    nodes: [
      { label: "factorial(4)", detail: "Waits for 4 × factorial(3)." },
      { label: "factorial(3)", detail: "Waits for 3 × factorial(2)." },
      { label: "factorial(2)", detail: "Waits for 2 × factorial(1)." },
      { label: "factorial(1)", detail: "Base case returns 1; stack unwinds." },
    ], examLink: "A recursive solution must make progress toward a reachable base case or stack space will be exhausted.",
  },
  {
    subject: "9609", topic: "6.2", title: "Strategy as a controlled cycle", layout: "flow",
    description: "Strategy links analysis to objectives, choice, implementation and review. Feedback matters because assumptions and the external environment change.",
    nodes: [
      { label: "Analyse", detail: "Assess internal capability and external opportunities or threats." },
      { label: "Choose", detail: "Compare strategic options against objectives and risk." },
      { label: "Implement", detail: "Allocate people, finance, time and responsibility." },
      { label: "Review", detail: "Measure outcomes and adjust the plan." },
    ], examLink: "Evaluation should explain why the best strategy depends on objectives, resources, time and uncertainty.",
  },
  {
    subject: "9609", topic: "7.1", title: "Span of control and hierarchy", layout: "tree",
    description: "A tall structure has more hierarchical levels and often narrower spans; a flat structure delegates across fewer levels and wider spans.",
    nodes: [
      { label: "Senior leadership", detail: "Sets direction and delegates authority." },
      { label: "Narrow span", detail: "Closer supervision but longer communication chain." },
      { label: "Wide span", detail: "More autonomy but heavier managerial workload." },
    ], examLink: "Do not call a structure ‘better’ without linking it to workforce skill, size, location and leadership style.",
  },
  {
    subject: "9609", topic: "8.1", title: "Market-position matrix", layout: "matrix",
    description: "Plot relative competitive strength against market attractiveness to compare priorities rather than relying on one sales figure.",
    nodes: [
      { label: "Invest", detail: "Strong position in an attractive market." },
      { label: "Build selectively", detail: "Attractive market but weaker position." },
      { label: "Defend or harvest", detail: "Strong position in a less attractive market." },
      { label: "Divest", detail: "Weak position with limited market potential." },
    ], examLink: "The position of a product depends on data quality and chosen measures; the matrix supports rather than replaces judgement.",
  },
  {
    subject: "9609", topic: "9.3", title: "Decision-tree logic", layout: "tree",
    description: "Decision nodes represent choices; chance nodes represent uncertain outcomes. Expected monetary values combine payoff and probability, but qualitative risk still matters.",
    nodes: [
      { label: "Decision", detail: "Choose between strategic alternatives." },
      { label: "Option A outcomes", detail: "Multiply each payoff by its probability, then add." },
      { label: "Option B outcomes", detail: "Calculate EMV on the same basis before comparing." },
    ], examLink: "Subtract the initial cost only once and discuss limitations such as estimated probabilities and non-financial consequences.",
  },
  {
    subject: "9609", topic: "10.3", title: "Discounted cash-flow sequence", layout: "flow",
    description: "Money received later is worth less today. Discount each year’s net cash flow before adding values and subtracting the initial investment.",
    nodes: [
      { label: "Year 0", detail: "Record the initial cash outflow." },
      { label: "Future cash flows", detail: "Estimate net inflows by year." },
      { label: "Discount", detail: "Multiply by the correct discount factor." },
      { label: "NPV", detail: "Sum present values and compare alternatives." },
    ], examLink: "A positive NPV supports investment at the chosen discount rate, but forecasts and strategic fit still need evaluation.",
  },
  {
    subject: "9609", topic: "10.4", title: "Finance strategy chain", layout: "flow",
    description: "Funding choice changes liquidity, gearing, control, risk and the ability to pursue the business strategy.",
    nodes: [
      { label: "Funding need", detail: "Match amount and duration to the intended use." },
      { label: "Source", detail: "Compare retained profit, debt, equity and other finance." },
      { label: "Financial effect", detail: "Assess cash flow, gearing, cost and ownership." },
      { label: "Strategic outcome", detail: "Test flexibility under optimistic and adverse scenarios." },
    ], examLink: "The cheapest source is not automatically best if repayment timing or loss of control conflicts with objectives.",
  },
];

const visualLookup = new Map(topicVisualCatalog.map((visual) => [`${visual.subject}:${visual.topic}`, visual]));

export function getTopicVisual(subject: string, topic: string) {
  return visualLookup.get(`${subject}:${topic}`) ?? null;
}

function CurveVisual({ visual, titleId }: { visual: TopicVisualSpec; titleId: string }) {
  const variant = visual.variant;
  return (
    <svg className="topic-visual__plot" viewBox="0 0 360 210" role="img" aria-labelledby={titleId}>
      <title id={titleId}>{visual.title}</title>
      <desc>{visual.description}</desc>
      <path className="plot-axis" d="M34 174H334M46 190V24" />
      {variant === "trig" ? <>
        <path className="plot-line" d="M46 104 C70 48 94 48 118 104 S166 160 190 104 S238 48 262 104 S310 160 334 104" />
        <path className="plot-line plot-line--secondary" d="M46 54 C70 54 94 104 118 154 S166 154 190 104 S238 54 262 54 S310 104 334 154" />
        <text x="278" y="51">sin x</text><text x="282" y="151">cos x</text><text x="190" y="195">period</text>
      </> : null}
      {variant === "derivative" ? <>
        <path className="plot-line" d="M50 155 C88 142 105 48 160 62 C214 77 222 166 325 44" />
        <path className="plot-guide" d="M94 151L177 47M160 62V174M226 142L286 92" />
        <circle cx="160" cy="62" r="4" /><text x="167" y="50">dy/dx = 0</text><text x="57" y="127">positive</text><text x="239" y="153">negative</text>
      </> : null}
      {variant === "integral" ? <>
        <path className="plot-area" d="M70 174L70 143 C112 61 184 51 258 126 L258 174Z" />
        <path className="plot-line" d="M52 163 C105 42 196 42 300 162" />
        <path className="plot-guide" d="M70 174V143M258 174V126" /><text x="64" y="193">a</text><text x="253" y="193">b</text><text x="139" y="118">∫ₐᵇ f(x) dx</text>
      </> : null}
      {variant === "normal" ? <>
        <path className="plot-area" d="M46 174 C126 174 127 50 190 50 C253 50 254 174 334 174Z" />
        <path className="plot-line" d="M46 174 C126 174 127 50 190 50 C253 50 254 174 334 174" />
        <path className="plot-guide" d="M126 174V127M190 174V50M254 174V127" /><text x="113" y="193">μ−σ</text><text x="185" y="193">μ</text><text x="244" y="193">μ+σ</text>
      </> : null}
      {variant === "hypothesis" ? <>
        <path className="plot-reject" d="M46 174 C74 174 94 162 111 141 L111 174Z" />
        <path className="plot-line" d="M46 174 C126 174 127 50 190 50 C253 50 254 174 334 174" />
        <path className="plot-guide" d="M111 174V141" /><text x="51" y="151">reject H₀</text><text x="117" y="193">critical value</text><text x="210" y="90">do not reject H₀</text>
      </> : null}
      {variant === "energy" ? <>
        <path className="plot-line" d="M48 148H93 C126 148 127 48 190 48 C251 48 248 107 291 107H329" />
        <path className="plot-guide" d="M80 148V48M301 148V107" /><text x="54" y="166">reactants</text><text x="275" y="99">products</text><text x="86" y="91">Eₐ</text><text x="306" y="132">ΔH</text>
      </> : null}
      {variant === "kinetics" ? <>
        <path className="plot-line" d="M46 45 C91 102 152 145 330 164" />
        <path className="plot-guide" d="M62 43L128 120M138 120L238 158" /><text x="69" y="59">steep tangent</text><text x="212" y="145">rate slows</text><text x="266" y="193">time</text>
      </> : null}
      {variant === "spectrum" ? <>
        <path className="plot-line" d="M46 174H334M70 174V128M109 174V78M151 174V148M207 174V51M252 174V112M308 174V92" />
        <text x="58" y="122">fragment</text><text x="188" y="44">base peak</text><text x="286" y="85">M⁺</text><text x="286" y="195">m/z or shift</text>
      </> : null}
    </svg>
  );
}

function StructuredVisual({ visual }: { visual: TopicVisualSpec }) {
  if (visual.layout === "cell") {
    return (
      <div className="topic-visual__cell" role="img" aria-label={visual.description}>
        <article><span>ANODE</span><strong>{visual.nodes[0]?.label}</strong><p>{visual.nodes[0]?.detail}</p></article>
        <div className="topic-visual__cell-link"><span>e⁻ flow →</span><strong>salt bridge</strong><span>ions maintain neutrality</span></div>
        <article><span>CATHODE</span><strong>{visual.nodes[1]?.label}</strong><p>{visual.nodes[1]?.detail}</p></article>
      </div>
    );
  }

  return (
    <div className={`topic-visual__${visual.layout}`} role="img" aria-label={visual.description}>
      {visual.nodes.map((node, index) => (
        <article key={node.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{node.label}</strong>
          <p>{node.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function TopicVisual({ visual }: { visual: TopicVisualSpec | null }) {
  if (!visual) return null;
  const titleId = `topic-visual-${visual.subject}-${visual.topic.replaceAll(".", "-")}`;
  return (
    <figure className="topic-visual note-block" id="visual-explainer">
      <figcaption>
        <span className="section-kicker">Visual explainer</span>
        <h2 id={`${titleId}-heading`}>{visual.title}</h2>
        <p>{visual.description}</p>
      </figcaption>
      {visual.layout === "curve" ? <CurveVisual visual={visual} titleId={titleId} /> : <StructuredVisual visual={visual} />}
      <p className="topic-visual__exam-link"><strong>Exam link</strong>{visual.examLink}</p>
    </figure>
  );
}
