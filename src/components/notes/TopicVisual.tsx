/* eslint-disable @next/next/no-img-element -- Local educational SVGs retain their original aspect ratios and do not need image optimisation. */

export type TopicVisualLayout = "curve" | "flow" | "tree" | "stack" | "matrix" | "pyramid" | "continuum" | "cell";

export interface TopicVisualNode {
  label: string;
  detail: string;
}

export interface TopicVisualImage {
  src: string;
  alt: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}

export interface TopicVisualSpec {
  subject: string;
  topic: string;
  title: string;
  description: string;
  layout: TopicVisualLayout;
  variant?: "trig" | "derivative" | "integral" | "normal" | "hypothesis" | "energy" | "kinetics" | "spectrum" | "inventory" | "break-even" | "product-life-cycle" | "economies";
  nodes: TopicVisualNode[];
  axes?: {
    horizontal: string;
    horizontalLow: string;
    horizontalHigh: string;
    vertical: string;
    verticalLow: string;
    verticalHigh: string;
  };
  continuum?: {
    start: string;
    label: string;
    end: string;
  };
  image?: TopicVisualImage;
  examLink: string;
}

export const topicVisualCatalog: TopicVisualSpec[] = [
  {
    subject: "9709", topic: "3.3", title: "Reading a trigonometric graph", layout: "curve", variant: "trig",
    description: "Amplitude controls vertical scale, while period controls horizontal repetition. Phase changes move the graph without changing its shape.",
    image: {
      src: "/diagrams/unit-circle.svg",
      alt: "Unit circle showing a radius at angle t and the point with coordinates cosine t and sine t.",
      author: "Gustavb",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Unit_circle.svg",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Unit_circle.svg#Licensing",
    },
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
    image: {
      src: "/diagrams/normal-distribution.svg",
      alt: "Accurate plot of the standard normal probability density function from minus four to four.",
      author: "Geek3",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Normal_distribution.svg",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
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
    image: {
      src: "/diagrams/galvanic-cell.svg",
      alt: "Labelled Daniell galvanic cell with zinc and copper half-cells, salt bridge, ion movement and electron flow.",
      author: "Rehua",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Galvanic_cell_labeled.svg",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
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
    image: {
      src: "/diagrams/packet-switching-330.gif",
      alt: "Animation showing a message divided into packets that travel independently through a network and are reassembled at the destination.",
      author: "Oddbodz",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Packet_Switching.gif",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
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
    image: {
      src: "/diagrams/operating-system-architecture.svg",
      alt: "Operating-system architecture showing applications, utilities, the operating system and hardware layers.",
      author: "Skjackey tse",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Operating_system_architecture.svg",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Operating_system_architecture.svg#Licensing",
    },
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
    subject: "9609", topic: "1.1", title: "From opportunity to a viable enterprise", layout: "flow",
    description: "Enterprise turns an identified customer problem into an organised, financed and tested business proposition.",
    nodes: [
      { label: "Spot an opportunity", detail: "Identify a customer problem, gap or changing trend." },
      { label: "Test the idea", detail: "Research demand, competition and a realistic value proposition." },
      { label: "Plan resources", detail: "Estimate people, operations, start-up finance and working capital." },
      { label: "Launch and review", detail: "Measure demand and cash, then adapt before resources run out." },
    ], examLink: "Apply each stage to the case and trace it to survival, cash flow, sales or profit rather than listing entrepreneurial qualities.",
  },
  {
    subject: "9609", topic: "1.2", title: "Choosing a legal structure", layout: "matrix",
    description: "Ownership structures trade control and simplicity against access to finance, continuity and limited liability.",
    nodes: [
      { label: "Sole trader", detail: "Full control and simple formation; unlimited liability and limited capital." },
      { label: "Partnership", detail: "Shared capital and skills; profit, control and liability may be shared." },
      { label: "Private limited company", detail: "Limited liability and continuity; shares are not offered to the public." },
      { label: "Public limited company", detail: "Potentially wider equity finance; greater disclosure, cost and separation of ownership." },
    ], examLink: "Recommend a structure using the owner's finance need, desired control, risk exposure, growth plan and willingness to disclose information.",
  },
  {
    subject: "9609", topic: "1.3", title: "Four lenses for measuring business size", layout: "matrix",
    description: "No single measure proves that one business is larger; the best indicator depends on industry and the decision being made.",
    nodes: [
      { label: "Employees", detail: "Useful for labour-intensive firms but distorted by automation and outsourcing." },
      { label: "Revenue", detail: "Shows sales value but not output volume, assets or profitability." },
      { label: "Capital employed", detail: "Useful in capital-intensive industries but sensitive to asset valuation." },
      { label: "Market share", detail: "Shows relative position inside a defined market, not absolute scale." },
    ], examLink: "State why the selected measure fits the industry, then use at least one other measure to qualify the conclusion.",
  },
  {
    subject: "9609", topic: "1.4", title: "Objective hierarchy", layout: "tree",
    description: "A mission is translated into measurable corporate objectives and then into coordinated functional and team targets.",
    nodes: [
      { label: "Mission and purpose", detail: "Long-term direction and values communicated to stakeholders." },
      { label: "Corporate objectives", detail: "Measurable priorities such as growth, profit, survival or sustainability." },
      { label: "Functional objectives", detail: "Marketing, operations, HR and finance targets aligned to the corporate aim." },
      { label: "Team and individual targets", detail: "Specific responsibilities, measures and deadlines for implementation." },
    ], examLink: "Evaluate conflict and compatibility: an objective is useful only if resources, time scale and stakeholder reactions make it achievable.",
  },
  {
    subject: "9609", topic: "1.5", title: "Power–interest stakeholder matrix", layout: "matrix",
    description: "Stakeholders require different engagement according to their ability to affect the decision and how strongly the decision affects their interests.",
    axes: {
      horizontal: "Stakeholder interest", horizontalLow: "Low interest", horizontalHigh: "High interest",
      vertical: "Stakeholder power", verticalLow: "Low power", verticalHigh: "High power",
    },
    nodes: [
      { label: "Keep satisfied", detail: "High power, lower interest: protect confidence without creating unnecessary detail." },
      { label: "Manage closely", detail: "High power, high interest: involve in decisions and respond to concerns." },
      { label: "Monitor", detail: "Low power, lower interest: use proportionate communication and watch for change." },
      { label: "Keep informed", detail: "Low power, high interest: explain impacts and maintain feedback channels." },
    ], examLink: "Power and interest can change during a decision; justify the position using case evidence rather than assigning groups permanently.",
  },
  {
    subject: "9609", topic: "2.1", title: "Workforce planning loop", layout: "flow",
    description: "Human-resource planning compares the workforce the business has with the workforce its strategy will require.",
    nodes: [
      { label: "Audit supply", detail: "Measure headcount, skills, productivity, turnover, absence and contract mix." },
      { label: "Forecast demand", detail: "Use objectives, workload, technology and market plans to estimate needs." },
      { label: "Identify the gap", detail: "Locate shortages, surpluses and capability or succession risks." },
      { label: "Act and review", detail: "Recruit, train, redeploy or reduce staff; monitor performance effects." },
    ], examLink: "Link the HR action through ability or motivation to productivity, quality, service, labour cost and the business objective.",
  },
  {
    subject: "9609", topic: "2.2", title: "Maslow's hierarchy of needs", layout: "pyramid",
    description: "The hierarchy is a diagnostic model: managers match rewards or job design to the needs that remain important for this workforce.",
    nodes: [
      { label: "Self-actualisation", detail: "Growth, creativity, meaningful challenge and reaching potential." },
      { label: "Esteem", detail: "Recognition, responsibility, achievement and status." },
      { label: "Social", detail: "Belonging, teamwork and supportive relationships." },
      { label: "Safety", detail: "Security, predictable conditions and protection from harm." },
      { label: "Physiological", detail: "Income and conditions sufficient for basic needs." },
    ], examLink: "Do not assume every employee climbs the same fixed order; apply the likely unsatisfied need and evaluate cultural and individual differences.",
  },
  {
    subject: "9609", topic: "2.2", title: "Herzberg's two-factor theory", layout: "matrix",
    description: "Removing dissatisfaction is not the same as creating lasting motivation: hygiene factors and motivators perform different roles.",
    nodes: [
      { label: "Weak hygiene", detail: "Poor pay fairness, policy, supervision or conditions can create dissatisfaction." },
      { label: "Adequate hygiene", detail: "Reduces dissatisfaction but may only establish a neutral baseline." },
      { label: "Weak motivators", detail: "Routine work with little recognition or responsibility limits satisfaction." },
      { label: "Strong motivators", detail: "Achievement, recognition, responsibility and growth can enrich the job." },
    ], examLink: "Herzberg does not say pay is irrelevant; unfair pay can dissatisfy, while lasting motivation may need enriched work too.",
  },
  {
    subject: "9609", topic: "2.3", title: "Management cycle", layout: "flow",
    description: "Management coordinates resources through connected functions; control provides feedback for the next planning decision.",
    nodes: [
      { label: "Plan", detail: "Set objectives, assumptions, actions, budgets and time scales." },
      { label: "Organise", detail: "Allocate people, authority, finance and physical resources." },
      { label: "Lead", detail: "Communicate, motivate and resolve problems during implementation." },
      { label: "Control", detail: "Compare actual performance with targets and take corrective action." },
    ], examLink: "A strong answer explains how the management function changes a measurable outcome in the specific business.",
  },
  {
    subject: "9609", topic: "3.1", title: "Market-oriented decision cycle", layout: "flow",
    description: "Marketing begins with customer and competitor evidence, not with promotion, and coordinates the whole mix around a chosen position.",
    nodes: [
      { label: "Understand the market", detail: "Measure needs, demand, competitors and external change." },
      { label: "Choose a target", detail: "Segment, select customers and define the desired position or USP." },
      { label: "Build the mix", detail: "Coordinate product, price, promotion and place." },
      { label: "Measure response", detail: "Review sales, share, contribution and customer evidence." },
    ], examLink: "Marketing analysis must connect customer response to revenue, contribution, capacity or long-term objectives.",
  },
  {
    subject: "9609", topic: "3.2", title: "Market-research process", layout: "flow",
    description: "Reliable research starts with a precise decision problem and ends with interpretation, not merely data collection.",
    nodes: [
      { label: "Define the decision", detail: "Specify what management needs to know and the target population." },
      { label: "Design the method", detail: "Choose primary or secondary data, sampling and questions." },
      { label: "Collect and check", detail: "Control bias, response quality, ethics, cost and timing." },
      { label: "Analyse and decide", detail: "Find patterns, limits and implications for the marketing choice." },
    ], examLink: "Evaluate representativeness, wording, sample method, time and whether qualitative evidence is needed to explain behaviour.",
  },
  {
    subject: "9609", topic: "3.3", title: "Product life-cycle curve", layout: "curve", variant: "product-life-cycle",
    description: "Sales and cash-flow patterns often change through development, introduction, growth, maturity and decline, requiring a different marketing response at each stage.",
    nodes: [], examLink: "Use case evidence to locate the stage; the curve is a planning model, not a timetable that every product must follow.",
  },
  {
    subject: "9609", topic: "3.3", title: "The coordinated marketing mix", layout: "matrix",
    description: "The four elements must reinforce the same target market and position; four disconnected definitions do not form a strategy.",
    nodes: [
      { label: "Product", detail: "Features, quality, design, brand, packaging and portfolio decisions." },
      { label: "Price", detail: "Method and level consistent with demand, cost, competition and position." },
      { label: "Promotion", detail: "Message and media suited to the audience, objective and budget." },
      { label: "Place", detail: "Channels, coverage and availability that reach the target efficiently." },
    ], examLink: "Show at least one connection between elements—for example premium quality requires credible branding, selective channels and a supporting price.",
  },
  {
    subject: "9609", topic: "4.1", title: "Operations transformation model", layout: "flow",
    description: "Operations transforms inputs into outputs and uses performance feedback to improve cost, quality, speed, dependability and flexibility.",
    nodes: [
      { label: "Inputs", detail: "Materials, information, customers, labour, capital and facilities." },
      { label: "Transformation", detail: "Job, batch, flow or service processes add value." },
      { label: "Outputs", detail: "Goods or services delivered at a required volume and quality." },
      { label: "Feedback", detail: "Use defects, lead time, productivity and customer evidence to improve." },
    ], examLink: "Name the transformed resource and explain how the process choice affects a performance objective in the case.",
  },
  {
    subject: "9609", topic: "4.2", title: "Inventory-control diagram", layout: "curve", variant: "inventory",
    description: "Inventory falls as production or sales use stock, then rises when a replenishment order arrives. Lead time determines when the reorder signal must be sent.",
    nodes: [], examLink: "Label maximum inventory, reorder level, buffer inventory and lead time; explain how demand or supplier reliability changes the safe levels.",
  },
  {
    subject: "9609", topic: "4.3", title: "Capacity response choices", layout: "matrix",
    description: "When demand and capacity do not match, management can change internal capacity, smooth demand or use external suppliers.",
    nodes: [
      { label: "Raise utilisation", detail: "Use existing resources more fully; unit fixed cost may fall but pressure rises." },
      { label: "Add capacity", detail: "Invest, recruit or add shifts; improves potential output but raises cost and risk." },
      { label: "Manage demand", detail: "Pricing, promotion or appointments can shift demand toward quieter periods." },
      { label: "Outsource", detail: "Access flexible specialist capacity but lose some control and margin." },
    ], examLink: "Calculate utilisation first, then judge spare capacity against forecast demand, quality, flexibility and the reliability of outsourcing.",
  },
  {
    subject: "9609", topic: "5.1", title: "Working-capital cycle", layout: "flow",
    description: "Cash is committed before customer receipts arrive, so a profitable growing business can still face a liquidity shortage.",
    nodes: [
      { label: "Cash", detail: "Pays suppliers, wages and operating expenses." },
      { label: "Inventory and production", detail: "Money is tied up while inputs are held or transformed." },
      { label: "Credit sales", detail: "Revenue may be recognised before the customer pays." },
      { label: "Receipts", detail: "Collected cash restarts the cycle and settles liabilities." },
    ], examLink: "Distinguish profit from cash and explain how inventory days, receivable days and payable timing affect liquidity.",
  },
  {
    subject: "9609", topic: "5.2", title: "Matching finance to the need", layout: "matrix",
    description: "Finance should match the amount, duration, cash-flow pattern, risk and control implications of the purpose being funded.",
    nodes: [
      { label: "Internal and short term", detail: "Working-capital improvements or sale of surplus assets avoid new ownership claims." },
      { label: "External and short term", detail: "Overdraft, trade credit or short loans support temporary needs but may be costly." },
      { label: "Internal and long term", detail: "Retained profit supports investment without repayment but has an opportunity cost." },
      { label: "External and long term", detail: "Loans, shares, leasing or venture capital expand funding but affect gearing or control." },
    ], examLink: "Do not recommend the cheapest source alone; apply security, repayment timing, gearing, ownership and availability.",
  },
  {
    subject: "9609", topic: "5.3", title: "Cash-flow forecast logic", layout: "flow",
    description: "A forecast follows the timing of money rather than accounting profit and carries each closing balance into the next period.",
    nodes: [
      { label: "Opening balance", detail: "Cash available at the start of the period." },
      { label: "Net cash flow", detail: "Cash inflows minus cash outflows for that period." },
      { label: "Closing balance", detail: "Opening balance plus net cash flow." },
      { label: "Management response", detail: "Arrange finance or change timing before a deficit becomes a crisis." },
    ], examLink: "Respect payment and receipt delays, show the negative sign clearly, and distinguish a temporary deficit from a recurring structural gap.",
  },
  {
    subject: "9609", topic: "5.4", title: "Break-even chart", layout: "curve", variant: "break-even",
    description: "Total revenue begins at zero; total cost begins at fixed cost. Their intersection is break-even, with loss before it and profit after it.",
    nodes: [], examLink: "Label both axes, fixed cost, total cost, total revenue, break-even and the margin of safety where the question provides actual output.",
  },
  {
    subject: "9609", topic: "5.5", title: "Budgetary-control cycle", layout: "flow",
    description: "Budgets translate objectives into quantified responsibility, then variance analysis provides feedback for action and future planning.",
    nodes: [
      { label: "Set objectives", detail: "Define priorities, constraints and the planning period." },
      { label: "Prepare budgets", detail: "Coordinate sales, production, staffing, cash and departmental plans." },
      { label: "Compare actuals", detail: "Calculate favourable or adverse variances consistently." },
      { label: "Investigate and respond", detail: "Find controllable causes, act and revise assumptions where justified." },
    ], examLink: "A variance is a signal, not a cause; explain why it occurred and whether the manager could control it.",
  },
  {
    subject: "9609", topic: "6.1", title: "External-influence scan", layout: "matrix",
    description: "External factors interact: one change can alter demand, costs, labour, investment, risk and stakeholder expectations at the same time.",
    nodes: [
      { label: "Political and legal", detail: "Tax, regulation, employment law, trade policy and government priorities." },
      { label: "Economic", detail: "Growth, inflation, interest, exchange rates, unemployment and income." },
      { label: "Social and environmental", detail: "Demographics, values, ethics, sustainability and consumer behaviour." },
      { label: "Technological", detail: "Process innovation, digital markets, data, automation and disruption." },
    ], examLink: "Select the most relevant change, apply evidence and develop the chain to an objective; a generic PEST list earns little analysis.",
  },
  {
    subject: "9609", topic: "6.2", title: "Ansoff growth matrix", layout: "matrix",
    description: "Ansoff combines product and market novelty to classify growth direction; risk generally rises as the business moves away from existing experience.",
    axes: {
      horizontal: "Markets", horizontalLow: "Existing markets", horizontalHigh: "New markets",
      vertical: "Products", verticalLow: "New products", verticalHigh: "Existing products",
    },
    nodes: [
      { label: "Market penetration", detail: "Existing products in existing markets; build share or usage." },
      { label: "Market development", detail: "Existing products in new segments or geographic markets." },
      { label: "Product development", detail: "New products for customers the business already serves." },
      { label: "Diversification", detail: "New products in new markets; highest unfamiliarity and capability risk." },
    ], examLink: "Classify the case correctly, then evaluate resources, competitor response, synergy and whether the market/product is genuinely new to this business.",
  },
  {
    subject: "9609", topic: "6.2", title: "Strategy as a controlled cycle", layout: "flow",
    description: "Strategy links analysis to objectives, choice, implementation and review. Feedback matters because assumptions and the external environment change.",
    image: {
      src: "/diagrams/swot-analysis.svg",
      alt: "SWOT analysis matrix separating internal strengths and weaknesses from external opportunities and threats.",
      author: "Xhienne",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:SWOT_en.svg",
      license: "CC BY-SA 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
    },
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
    image: {
      src: "/diagrams/matrix-organisation.svg",
      alt: "Matrix organisation chart showing employees connected to both functional and project leadership lines.",
      author: "Chery",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Matrix_organisation_scheme.svg",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Matrix_organisation_scheme.svg#Licensing",
    },
    nodes: [
      { label: "Senior leadership", detail: "Sets direction and delegates authority." },
      { label: "Narrow span", detail: "Closer supervision but longer communication chain." },
      { label: "Wide span", detail: "More autonomy but heavier managerial workload." },
    ], examLink: "Do not call a structure ‘better’ without linking it to workforce skill, size, location and leadership style.",
  },
  {
    subject: "9609", topic: "7.2", title: "Communication and feedback loop", layout: "flow",
    description: "Communication succeeds only when the receiver understands the intended meaning and feedback confirms or corrects that understanding.",
    nodes: [
      { label: "Sender encodes", detail: "Choose language, detail and a channel suited to the message and audience." },
      { label: "Message travels", detail: "Formal or informal channels may introduce delay, noise, overload or distortion." },
      { label: "Receiver decodes", detail: "Interpretation depends on language, knowledge, culture, status and attention." },
      { label: "Feedback", detail: "Questions or action confirm understanding and allow correction." },
    ], examLink: "Recommend a method using urgency, complexity, confidentiality, record, audience size and need for two-way feedback.",
  },
  {
    subject: "9609", topic: "7.3", title: "Leadership-style continuum", layout: "continuum",
    description: "Leadership can move from tight manager control toward employee autonomy; the appropriate position depends on the task, people and pressure.",
    continuum: { start: "Manager control", label: "Decision authority", end: "Employee autonomy" },
    nodes: [
      { label: "Autocratic", detail: "Leader decides; fast and controlled, with limited employee input." },
      { label: "Paternalistic", detail: "Leader decides in employees' perceived interests and explains or supports." },
      { label: "Democratic", detail: "Employees contribute to decisions; commitment and ideas may improve." },
      { label: "Laissez-faire", detail: "Skilled employees receive wide autonomy; coordination and control may weaken." },
    ], examLink: "Judge the fit using urgency, risk, workforce competence, culture, information and whether participation is genuine.",
  },
  {
    subject: "9609", topic: "7.4", title: "Hard and soft HRM", layout: "matrix",
    description: "HR strategy may treat labour mainly as a controllable cost or as a capability to develop; real businesses often combine both approaches.",
    nodes: [
      { label: "Hard HRM: workforce planning", detail: "Quantitative staffing, flexible contracts, productivity targets and cost control." },
      { label: "Hard HRM: risk", detail: "Insecurity, turnover, weak trust or service quality may undermine savings." },
      { label: "Soft HRM: development", detail: "Training, participation, security, enrichment and long-term relationships." },
      { label: "Soft HRM: risk", detail: "Higher cost and slower adjustment may be difficult under intense short-term pressure." },
    ], examLink: "Evaluate the mix against skill scarcity, service quality, labour cost, culture, demand volatility and the performance evidence in the case.",
  },
  {
    subject: "9609", topic: "8.1", title: "Boston portfolio matrix", layout: "matrix",
    description: "The Boston matrix compares relative market share with market growth to support product-portfolio and cash-allocation decisions.",
    axes: {
      horizontal: "Relative market share", horizontalLow: "Low share", horizontalHigh: "High share",
      vertical: "Market growth", verticalLow: "Low growth", verticalHigh: "High growth",
    },
    nodes: [
      { label: "Question mark", detail: "High growth, low relative share; may need heavy investment with uncertain return." },
      { label: "Star", detail: "High growth, high relative share; invest to defend position and future cash generation." },
      { label: "Dog", detail: "Low growth, low relative share; harvest, reposition or divest only after wider analysis." },
      { label: "Cash cow", detail: "Low growth, high relative share; may generate cash to support other products." },
    ], examLink: "Market growth and share are incomplete evidence: apply contribution, life-cycle stage, synergy, brand role and forecast quality before recommending action.",
  },
  {
    subject: "9609", topic: "8.2", title: "Marketing strategy alignment", layout: "flow",
    description: "A marketing strategy turns evidence and objectives into a coherent target position, mix, budget and control process.",
    nodes: [
      { label: "Objectives and evidence", detail: "Use research, forecasts, elasticity, portfolio and competitor information." },
      { label: "STP choice", detail: "Segment, target and position with a defensible USP." },
      { label: "Integrated mix", detail: "Coordinate product, price, promotion and place within operational capacity." },
      { label: "Control", detail: "Set budgets, responsibilities, measures and triggers for adjustment." },
    ], examLink: "Judge the whole mix against the same target market and objective; disconnected recommendations cannot form a coherent strategy.",
  },
  {
    subject: "9609", topic: "9.1", title: "Economies and diseconomies of scale", layout: "curve", variant: "economies",
    description: "Average cost may fall as scale creates purchasing, technical, managerial and financial economies, then rise if coordination and control problems dominate.",
    nodes: [], examLink: "Name the specific economy, explain how it lowers average cost and balance it against demand, capacity and possible diseconomies.",
  },
  {
    subject: "9609", topic: "9.2", title: "From inspection to a quality culture", layout: "continuum",
    description: "Quality approaches differ in when problems are addressed and who is responsible for preventing them.",
    continuum: { start: "Detect output defects", label: "Earlier prevention and wider responsibility", end: "Continuous improvement" },
    nodes: [
      { label: "Quality control", detail: "Inspect outputs and detect defects; rework or rejection occurs after resources were used." },
      { label: "Quality assurance", detail: "Design standards and checks into the process to prevent defects." },
      { label: "TQM", detail: "Everyone takes responsibility for customer-focused continuous improvement." },
      { label: "Benchmarking", detail: "Compare performance or practice, identify a gap and adapt improvement." },
    ], examLink: "Trace prevention or detection to defects, waste, rework, reputation and cost, then evaluate training, culture and implementation time.",
  },
  {
    subject: "9609", topic: "9.3", title: "Operations strategy system", layout: "flow",
    description: "Operations strategy aligns resources, process design, technology and improvement methods with the performance priorities valued by customers.",
    nodes: [
      { label: "Performance priority", detail: "Clarify the required cost, quality, speed, dependability or flexibility." },
      { label: "Resource and process choice", detail: "Match capacity, skills, facilities and job/batch/flow methods." },
      { label: "Technology and lean", detail: "Use ERP, automation, JIT, Kaizen or cells where conditions support them." },
      { label: "Plan and improve", detail: "Use CPA and operating evidence to control delivery and remove constraints." },
    ], examLink: "Explain the operational mechanism and integration with HR, marketing and finance; technology labels alone do not earn developed analysis.",
  },
  {
    subject: "9609", topic: "10.1", title: "How the financial statements connect", layout: "tree",
    description: "The statements answer different questions and must be interpreted together: performance over time, financial position at a date and the movement of cash.",
    nodes: [
      { label: "Business transactions", detail: "Sales, purchases, expenses, assets, liabilities, financing and cash movements." },
      { label: "Income statement", detail: "Revenue, cost and profit earned over the accounting period." },
      { label: "Statement of financial position", detail: "Assets, liabilities and equity at the reporting date." },
      { label: "Cash-flow evidence", detail: "Explains liquidity and why cash movement can differ from profit." },
    ], examLink: "Do not treat profit as cash: credit sales, inventory, receivables, payables, depreciation and investment create differences.",
  },
  {
    subject: "9609", topic: "10.2", title: "Ratio-analysis dashboard", layout: "matrix",
    description: "Ratios diagnose different dimensions of performance; trends and valid benchmarks matter more than an isolated number.",
    nodes: [
      { label: "Profitability", detail: "Gross and operating margins, plus ROCE, connect returns to sales or capital." },
      { label: "Liquidity", detail: "Current and acid-test ratios assess short-term payment capacity and working capital." },
      { label: "Efficiency", detail: "Inventory, receivable and payable days reveal how assets and credit are managed." },
      { label: "Investor and risk", detail: "Gearing and shareholder measures support analysis of finance risk and return." },
    ], examLink: "Calculate with correct units, compare consistently, propose a contextual cause and consequence, then evaluate accounting and benchmark limitations.",
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

const visualLookup = new Map<string, TopicVisualSpec[]>();
for (const visual of topicVisualCatalog) {
  const key = `${visual.subject}:${visual.topic}`;
  visualLookup.set(key, [...(visualLookup.get(key) ?? []), visual]);
}

export function getTopicVisuals(subject: string, topic: string) {
  return visualLookup.get(`${subject}:${topic}`) ?? [];
}

export function getTopicVisual(subject: string, topic: string) {
  return getTopicVisuals(subject, topic)[0] ?? null;
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
      {variant === "inventory" ? <>
        <path className="plot-line" d="M52 48L138 137L138 64L224 151L224 72L320 166" />
        <path className="plot-guide" d="M46 48H326M46 116H326M46 158H326M113 116V174M138 64V174" />
        <path className="plot-bracket" d="M113 181V188M113 185H138M138 181V188" />
        <text x="51" y="42">maximum</text><text x="51" y="110">reorder level</text><text x="51" y="153">buffer inventory</text><text x="112" y="199">lead time</text><text x="291" y="194">time</text>
      </> : null}
      {variant === "break-even" ? <>
        <path className="plot-line plot-line--secondary" d="M46 143H330" />
        <path className="plot-line" d="M46 143L330 42" />
        <path className="plot-line plot-line--revenue" d="M46 174L330 30" />
        <circle cx="196" cy="98" r="4" />
        <path className="plot-guide" d="M196 98V174" />
        <text x="52" y="137">fixed cost</text><text x="278" y="56">total cost</text><text x="258" y="30">total revenue</text><text x="175" y="88">break-even</text><text x="88" y="126">loss</text><text x="251" y="87">profit</text><text x="282" y="195">output</text>
      </> : null}
      {variant === "product-life-cycle" ? <>
        <path className="plot-line" d="M48 170C66 169 75 163 91 148C117 122 130 74 167 58C208 41 255 61 278 93C297 119 313 146 332 160" />
        <path className="plot-guide" d="M86 174V149M143 174V72M230 174V59M292 174V113" />
        <text x="48" y="194">development</text><text x="93" y="194">introduction</text><text x="160" y="194">growth</text><text x="229" y="194">maturity</text><text x="294" y="194">decline</text><text x="275" y="64">sales</text>
      </> : null}
      {variant === "economies" ? <>
        <path className="plot-line" d="M53 52C97 85 126 130 190 143C250 153 292 119 328 69" />
        <path className="plot-guide" d="M190 143V174" />
        <text x="65" y="79">economies of scale</text><text x="223" y="119">diseconomies</text><text x="163" y="158">minimum average cost</text><text x="278" y="195">scale/output</text>
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

  const cards = visual.nodes.map((node, index) => (
    <article key={node.label}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{node.label}</strong>
      <p>{node.detail}</p>
    </article>
  ));

  if (visual.layout === "matrix" && visual.axes) {
    return (
      <div className="topic-visual__matrix-frame" role="img" aria-label={visual.description}>
        <div className="topic-visual__vertical-axis" aria-hidden="true">
          <span>{visual.axes.verticalHigh}</span>
          <strong>{visual.axes.vertical}</strong>
          <span>{visual.axes.verticalLow}</span>
        </div>
        <div className="topic-visual__matrix">{cards}</div>
        <div className="topic-visual__horizontal-axis" aria-hidden="true">
          <span>{visual.axes.horizontalLow}</span>
          <strong>{visual.axes.horizontal}</strong>
          <span>{visual.axes.horizontalHigh}</span>
        </div>
      </div>
    );
  }

  if (visual.layout === "continuum") {
    return (
      <div className="topic-visual__continuum-frame" role="img" aria-label={visual.description}>
        <div className="topic-visual__continuum-axis" aria-hidden="true">
          <span>{visual.continuum?.start ?? "Less"}</span>
          <strong>{visual.continuum?.label ?? "Continuum"}</strong>
          <span>{visual.continuum?.end ?? "More"}</span>
        </div>
        <div className="topic-visual__continuum">{cards}</div>
      </div>
    );
  }

  return (
    <div className={`topic-visual__${visual.layout}`} role="img" aria-label={visual.description}>
      {cards}
    </div>
  );
}

function ReferenceImage({ image }: { image: TopicVisualImage }) {
  return (
    <div className="topic-visual__reference-image">
      <img src={image.src} alt={image.alt} width="960" height="640" loading="lazy" decoding="async" />
      <p>
        <span>Reference image</span>
        <a href={image.sourceUrl} target="_blank" rel="noreferrer">{image.author} via Wikimedia Commons</a>
        <span aria-hidden="true">·</span>
        <a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.license}</a>
      </p>
    </div>
  );
}

export function TopicVisual({ visual, anchorId = "visual-explainer" }: { visual: TopicVisualSpec | null; anchorId?: string }) {
  if (!visual) return null;
  const titleId = `${anchorId}-${visual.subject}-${visual.topic.replaceAll(".", "-")}`;
  return (
    <figure className="topic-visual note-block" id={anchorId}>
      <figcaption>
        <span className="section-kicker">Visual explainer</span>
        <h2 id={`${titleId}-heading`}>{visual.title}</h2>
        <p>{visual.description}</p>
      </figcaption>
      {visual.image
        ? <ReferenceImage image={visual.image} />
        : visual.layout === "curve"
          ? <CurveVisual visual={visual} titleId={titleId} />
          : <StructuredVisual visual={visual} />}
      <p className="topic-visual__exam-link"><strong>Exam link</strong>{visual.examLink}</p>
    </figure>
  );
}

export function TopicVisuals({ visuals }: { visuals: TopicVisualSpec[] }) {
  if (!visuals.length) return null;

  return (
    <div className="topic-visuals" id="visual-explainers">
      {visuals.map((visual, index) => (
        <TopicVisual
          visual={visual}
          anchorId={`visual-explainer-${index + 1}`}
          key={`${visual.subject}:${visual.topic}:${visual.title}`}
        />
      ))}
    </div>
  );
}
