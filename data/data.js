/* ============================================================
   SYLLABUS STRUCTURE — mirrors current CAIE specifications
   ============================================================ */
const SUBJECTS = {
  math: { code:"9709", title:"Mathematics", years:"2026–2027", color:"var(--math)", soft:"var(--math-soft)",
    units:[
      {id:"P1", title:"Pure Mathematics 1", topics:[
        {id:"1.1", title:"Quadratics", level:"AS", points:["completing the square","discriminant and roots","quadratic equations/inequalities"]},
        {id:"1.2", title:"Functions", level:"AS", points:["domain/range","composite and inverse functions","graph transformations"]},
        {id:"1.3", title:"Coordinate geometry", level:"AS", points:["straight lines","distance/midpoint","circles"], blurb:"Find equations of lines and circles, and use gradients, midpoints and distances to solve geometric problems."},
        {id:"1.4", title:"Circular measure", level:"AS", points:["radians","arc length","sector area"], blurb:"Work in radians rather than degrees to find arc lengths and sector areas — and to keep calculus with trig functions valid later on."},
        {id:"1.5", title:"Trigonometry", level:"AS", points:["graphs","identities","equations"]},
        {id:"1.6", title:"Series", level:"AS", points:["AP/GP","sum to infinity","binomial expansion"], blurb:"Recognise and sum arithmetic and geometric sequences, including sums to infinity, and expand (1+x)ⁿ using the binomial theorem."},
        {id:"1.7", title:"Differentiation", level:"AS", points:["derivatives","tangents/normals","stationary points and optimisation"]},
        {id:"1.8", title:"Integration", level:"AS", points:["indefinite/definite integration","areas","volumes of revolution"]},
      ]},
      {id:"P2", title:"Pure Mathematics 2", topics:[
        {id:"2.1", title:"Algebra", level:"AS-only", points:["modulus","polynomials","partial fractions","general binomial"], blurb:"Handle modulus functions, divide and factorise polynomials, and split algebraic fractions into partial fractions."},
        {id:"2.2", title:"Logarithmic and exponential functions", level:"AS-only", points:["log laws","exponentials","equations"], blurb:"Use the laws of logarithms and exponentials to solve equations and model exponential growth or decay."},
        {id:"2.3", title:"Trigonometry", level:"AS-only", points:["further identities","equations","inverse trig"], blurb:"Extend trig identities and equation-solving, and work with inverse trig functions (arcsin, arccos, arctan)."},
        {id:"2.4", title:"Differentiation", level:"AS-only", points:["product/quotient/chain rules","advanced derivatives"], blurb:"Apply the product, quotient and chain rules to differentiate more complex combinations of functions."},
        {id:"2.5", title:"Integration", level:"AS-only", points:["substitution","standard forms","areas"], blurb:"Integrate using substitution and standard forms, and use integration to find areas under more complex curves."},
        {id:"2.6", title:"Numerical solution of equations", level:"AS-only", points:["iteration","convergence","accuracy"], blurb:"Locate roots of equations you can't solve algebraically using iteration, and justify how accurate your answer is."},
      ]},
      {id:"P3", title:"Pure Mathematics 3", topics:[
        {id:"3.1", title:"Algebra", level:"A2", points:["polynomials","partial fractions","modulus/general binomial"], blurb:"Extend algebraic technique to harder polynomials, partial fractions with repeated or quadratic factors, and the general binomial expansion for any rational n."},
        {id:"3.2", title:"Logarithmic and exponential functions", level:"A2", points:["ln/e","equations","modelling"], blurb:"Use natural logarithms and e to solve equations and model real-world growth/decay contexts."},
        {id:"3.3", title:"Trigonometry", level:"A2", points:["compound/double-angle identities","R-form","equations"], blurb:"Use compound and double-angle identities and the R sin(x+α) form to solve harder trig equations and find max/min values."},
        {id:"3.4", title:"Differentiation", level:"A2", points:["product/quotient/chain","implicit/parametric"], blurb:"Differentiate implicitly and parametrically, on top of product/quotient/chain rules, for curves not given simply as y = f(x)."},
        {id:"3.5", title:"Integration", level:"A2", points:["parts","substitution","partial fractions","trig integrals"], blurb:"Use integration by parts, substitution and partial fractions to integrate a wider range of functions, including trig integrals."},
        {id:"3.6", title:"Numerical solution of equations", level:"A2", points:["iteration","convergence","accuracy"], blurb:"Apply iterative methods to harder equations, justifying convergence and the accuracy of your final answer."},
        {id:"3.7", title:"Vectors", level:"A2", points:["3D lines","dot product","angles/intersections"]},
        {id:"3.8", title:"Differential equations", level:"A2", points:["separation of variables","initial conditions","modelling"], blurb:"Form and solve first-order differential equations by separating variables, using given initial conditions to find a particular solution."},
        {id:"3.9", title:"Complex numbers", level:"A2", points:["Argand diagrams","modulus/argument","polar form"]},
      ]},
      {id:"M1", title:"Mechanics", topics:[
        {id:"4.1", title:"Forces and equilibrium", level:"AS/A Level", points:["force diagrams","resolving forces","friction/equilibrium"], blurb:"Draw force diagrams, resolve forces into components, and apply equilibrium conditions including friction."},
        {id:"4.2", title:"Kinematics of motion in a straight line", level:"AS/A Level", points:["SUVAT","motion graphs","calculus and gravity"], blurb:"Use SUVAT equations, motion graphs and calculus to describe motion in a straight line, including under gravity."},
        {id:"4.3", title:"Momentum", level:"AS/A Level", points:["impulse","conservation of momentum","collisions"], blurb:"Apply conservation of momentum and impulse to collisions between particles."},
        {id:"4.4", title:"Newton's laws of motion", level:"AS/A Level", points:["F=ma","connected particles","pulleys/inclines"], blurb:"Apply F = ma to connected particles, pulleys and inclined planes."},
        {id:"4.5", title:"Energy, work and power", level:"AS/A Level", points:["work","KE/GPE","power"], blurb:"Calculate work done, kinetic/gravitational potential energy, and power in mechanical systems."},
      ]},
      {id:"S1", title:"Probability & Statistics 1", topics:[
        {id:"5.1", title:"Representation of data", level:"AS/A Level", points:["histograms","cumulative frequency","mean/variance/SD"], blurb:"Summarise and display data using histograms and cumulative frequency diagrams, and calculate mean, variance and standard deviation."},
        {id:"5.2", title:"Permutations and combinations", level:"AS/A Level", points:["factorials","arrangements","selections"], blurb:"Count arrangements (order matters) and selections (order doesn't) using factorials, permutations and combinations."},
        {id:"5.3", title:"Probability", level:"AS/A Level", points:["conditional probability","independence","tree/Venn methods"], blurb:"Use tree diagrams and Venn diagrams to handle conditional probability and test for independence."},
        {id:"5.4", title:"Discrete random variables", level:"AS/A Level", points:["probability distributions","expectation/variance","binomial distribution"], blurb:"Build probability distributions, calculate expectation and variance, and apply the binomial distribution."},
        {id:"5.5", title:"The normal distribution", level:"AS/A Level", points:["standardisation","probabilities","inverse normal"], blurb:"Standardise normal variables to find probabilities, and use the inverse normal to find an unknown value or parameter."},
      ]},
      {id:"S2", title:"Probability & Statistics 2", topics:[
        {id:"6.1", title:"The Poisson distribution", level:"A2", points:["Poisson probabilities","parameter λ","modelling"], blurb:"Model random events over a fixed time/space interval with the Poisson distribution, and know when it approximates the binomial."},
        {id:"6.2", title:"Linear combinations of random variables", level:"A2", points:["expectation","variance","independent sums"], blurb:"Find the expectation and variance of sums and differences of independent random variables."},
        {id:"6.3", title:"Continuous random variables", level:"A2", points:["PDFs","integration","expectation/variance"], blurb:"Use probability density functions and integration to find probabilities, expectation and variance for continuous variables."},
        {id:"6.4", title:"Sampling and estimation", level:"A2", points:["sampling distributions","confidence intervals","estimation"], blurb:"Understand sampling distributions and construct confidence intervals to estimate an unknown population parameter."},
        {id:"6.5", title:"Hypothesis tests", level:"A2", points:["H0/H1","critical regions/p-values","significance and conclusions"], blurb:"Set up null and alternative hypotheses, use a critical region or p-value, and draw a conclusion in the context of the question."},
      ]},
    ],
    resources:[
      {src:"Cambridge Int'l", ttl:"Official syllabus (2026–2027)", desc:"9709 syllabus document, direct PDF", url:"https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf"},
      {src:"PapaCambridge", ttl:"Full past papers + mark schemes", desc:"Every session, all components", url:"https://pastpapers.papacambridge.com/papers/caie/as-and-a-level-mathematics-9709"},
      {src:"PapaCambridge", ttl:"Topical past papers", desc:"Questions grouped by syllabus topic", url:"https://pastpapers.papacambridge.com/papers/caie/as-and-a-level-mathematics-9709-topical-past-papers"},
      {src:"Save My Exams", ttl:"Revision notes — Pure 1", desc:"Written notes + exam-style questions", url:"https://www.savemyexams.com/a-level/maths/cie/20/pure-1/revision-notes/"},
      {src:"ZNotes", ttl:"Condensed topic notes", desc:"Quick-reference syllabus notes", url:"https://znotes.org/caie/a-level/mathematics-9709/"},
      {src:"RocketRevise", ttl:"Topical workbooks", desc:"Topic-sorted question packs for 9709", url:"https://rocketrevise.com/a-level-cambridge/cie-a-level-maths-9709/"},
    ]
  },

  cs: { code:"9618", title:"Computer Science", years:"2026", color:"var(--cs)", soft:"var(--cs-soft)",
    units:[
      {id:"AS-T", title:"AS Theory", topics:[
        {id:"1.1", title:"Data Representation", level:"AS", points:["binary/denary/hex","BCD and complements","ASCII/Unicode","binary arithmetic/overflow"], blurb:"Convert between binary, denary and hexadecimal, use two's complement and BCD, and perform binary addition/shifts while spotting overflow."},
        {id:"1.2", title:"Multimedia", level:"AS", points:["bitmap/vector graphics","sound sampling","file-size calculations"], blurb:"Understand how bitmap and vector images and sampled sound are represented digitally, and calculate resulting file sizes."},
        {id:"1.3", title:"Compression", level:"AS", points:["lossless/lossy","compression trade-offs"], blurb:"Compare lossy and lossless compression and the trade-off each makes between file size and quality."},
        {id:"2.1", title:"Networks including the internet", level:"AS", points:["LAN/WAN","devices/media","IP/MAC/DNS/URLs","Ethernet"], blurb:"Distinguish LANs from WANs, know the hardware/media involved, and understand IP addresses, MAC addresses, DNS and URLs."},
        {id:"3.1", title:"Computers and their components", level:"AS", points:["system components","embedded systems","memory/storage/I-O"], blurb:"Identify the core hardware components of a computer system, including embedded systems and memory/storage/input-output devices."},
        {id:"3.2", title:"Logic Gates and Logic Circuits", level:"AS", points:["truth tables","logic expressions","circuit design"]},
        {id:"4.1", title:"Central Processing Unit (CPU) Architecture", level:"AS", points:["ALU/CU/registers","buses","fetch-decode-execute","interrupts/performance"]},
        {id:"4.2", title:"Assembly Language", level:"AS", points:["opcodes/operands","addressing","assembler","tracing"], blurb:"Read and trace simple assembly language programs, understanding opcodes, operands and addressing modes."},
        {id:"4.3", title:"Bit manipulation", level:"AS", points:["shifts","masks","bitwise logic"], blurb:"Use logical shifts, masks and bitwise operators to manipulate individual bits within a byte."},
        {id:"5.1", title:"Operating Systems", level:"AS", points:["process/memory/file management","UI","security"], blurb:"Understand the OS's role in managing processes, memory, files, the user interface and security."},
        {id:"5.2", title:"Language Translators", level:"AS", points:["compiler/interpreter/assembler","translation stages","errors"], blurb:"Compare compilers, interpreters and assemblers, and understand the stages of translating source code."},
        {id:"6.1", title:"Data Security", level:"AS", points:["threats","authentication/access control","firewalls/backups"], blurb:"Identify common security threats and the defences (authentication, access control, firewalls, backups) used against them."},
        {id:"6.2", title:"Data Integrity", level:"AS", points:["validation/verification","parity/checksums/check digits"], blurb:"Use validation and verification methods, plus parity checks and check digits, to catch data errors."},
        {id:"7.1", title:"Ethics and Ownership", level:"AS", points:["privacy","copyright/licensing","ethical impacts"], blurb:"Consider privacy, copyright/licensing and the wider ethical impact of computing on society."},
        {id:"8.1", title:"Database Concepts", level:"AS", points:["tables/records/fields","keys/relationships","normalisation ideas"], blurb:"Understand tables, records, fields, keys and relationships, and the basic idea behind normalisation."},
        {id:"8.2", title:"Database Management Systems (DBMS)", level:"AS", points:["data dictionary","access rights","backup/recovery","concurrency"], blurb:"Understand the DBMS's role in managing the data dictionary, access rights, backup/recovery and concurrent access."},
        {id:"8.3", title:"DDL and DML", level:"AS", points:["definition/manipulation","SQL-style SELECT/INSERT/UPDATE/DELETE"]},
      ]},
      {id:"AS-P", title:"AS Problem-solving & Programming", topics:[
        {id:"9.1", title:"Computational Thinking Skills", level:"AS", points:["decomposition","abstraction","pattern recognition","algorithmic thinking"], blurb:"Apply decomposition, abstraction and pattern recognition to break down and design solutions to a problem."},
        {id:"9.2", title:"Algorithms", level:"AS", points:["pseudocode/flowcharts","searching/sorting","trace tables"]},
        {id:"10.1", title:"Data Types and Records", level:"AS", points:["primitive types","records","type selection"], blurb:"Choose appropriate primitive data types and group related data together using records."},
        {id:"10.2", title:"Arrays", level:"AS", points:["1D/2D arrays","indexing/traversal"], blurb:"Declare, index and traverse one- and two-dimensional arrays."},
        {id:"10.3", title:"Files", level:"AS", points:["open/read/write/close","EOF","sequential processing"], blurb:"Open, read from, write to and close files, processing records sequentially while checking for end-of-file."},
        {id:"10.4", title:"Introduction to Abstract Data Types (ADT)", level:"AS", points:["stacks","queues","linked-list concepts"]},
        {id:"11.1", title:"Programming Basics", level:"AS", points:["variables/constants","operators","input/output"], blurb:"Use variables, constants, operators and input/output statements — the building blocks of any program."},
        {id:"11.2", title:"Constructs", level:"AS", points:["selection","FOR/WHILE/REPEAT","nesting"], blurb:"Use selection (IF) and iteration (FOR/WHILE/REPEAT) constructs, including nested constructs, to control program flow."},
        {id:"11.3", title:"Structured Programming", level:"AS", points:["procedures/functions","parameters","scope/modularity"], blurb:"Break programs into procedures and functions with parameters, improving modularity and controlling variable scope."},
        {id:"12.1", title:"Program Development Life Cycle", level:"AS", points:["analysis","design","coding","testing","maintenance"], blurb:"Follow the stages of analysis, design, coding, testing and maintenance when developing software."},
        {id:"12.2", title:"Program Design", level:"AS", points:["structure charts","pseudocode","data structures"], blurb:"Use structure charts and pseudocode to design a program's structure and data before coding it."},
        {id:"12.3", title:"Program Testing and Maintenance", level:"AS", points:["normal/boundary/invalid tests","debugging","maintenance types"], blurb:"Design normal, boundary and erroneous test data, and know the different types of maintenance (corrective, adaptive, perfective)."},
      ]},
      {id:"A2", title:"A2 Level", topics:[
        {id:"13.1", title:"User-defined data types", level:"A2", points:["enumerated/user-defined types","appropriate type design"], blurb:"Define your own enumerated and composite data types where the built-in primitive types aren't specific enough."},
        {id:"13.2", title:"File organisation and access", level:"A2", points:["serial/sequential/direct access","indexes","hashing/collisions"], blurb:"Compare serial, sequential and direct (random) file access, and understand indexing and hashing for fast lookup."},
        {id:"13.3", title:"Floating-point numbers, representation and manipulation", level:"A2", points:["mantissa/exponent","normalisation","precision/range"], blurb:"Represent real numbers using a mantissa and exponent, understand normalisation, and the trade-off between precision and range."},
        {id:"14.1", title:"Protocols", level:"A2", points:["protocol purpose","network/application protocols","flow/error control"], blurb:"Understand why network protocols exist and compare examples that handle addressing, transport and application-level communication."},
        {id:"14.2", title:"Circuit switching, packet switching", level:"A2", points:["circuits vs packets","routing","trade-offs"], blurb:"Compare how circuit switching and packet switching route data across a network, and the trade-offs of each."},
        {id:"15.1", title:"Processors, Parallel Processing and Virtual Machines", level:"A2", points:["multi-core/parallelism","pipelining","virtualisation"], blurb:"Understand multi-core processors, pipelining, and how virtual machines abstract away physical hardware."},
        {id:"15.2", title:"Boolean Algebra and Logic Circuits", level:"A2", points:["Boolean laws","De Morgan","simplification"]},
        {id:"16.1", title:"Purposes of an Operating System (OS)", level:"A2", points:["process scheduling","memory management","interrupts"], blurb:"Understand how the OS schedules processes, manages memory and handles interrupts."},
        {id:"16.2", title:"Translation Software", level:"A2", points:["compiler stages","linker/loader","libraries"], blurb:"Understand the stages of compilation in more depth, including the role of linkers, loaders and libraries."},
        {id:"17.1", title:"Encryption, Encryption Protocols and Digital Certificates", level:"A2", points:["symmetric/asymmetric encryption","digital signatures","certificates"], blurb:"Compare symmetric and asymmetric encryption, and understand how digital signatures and certificates verify identity."},
        {id:"18.1", title:"Artificial Intelligence", level:"A2", points:["ML/expert systems","neural-network ideas","robotics/ethics"], blurb:"Understand the basic ideas behind machine learning, expert systems and neural networks, and the ethical questions AI raises."},
        {id:"19.1", title:"Algorithms", level:"A2", points:["advanced algorithms","efficiency","data structures"], blurb:"Extend algorithm knowledge to more advanced examples, and compare efficiency using Big O."},
        {id:"19.2", title:"Recursion", level:"A2", points:["base/recursive cases","call stack","trace recursion"], blurb:"Write and trace recursive algorithms, understanding base cases, recursive cases, and how the call stack behaves."},
        {id:"20.1", title:"Programming Paradigms", level:"A2", points:["procedural","OOP","declarative"]},
        {id:"20.2", title:"File Processing and Exception Handling", level:"A2", points:["robust file processing","exceptions","recovery"], blurb:"Write robust file-processing code using exception handling to recover gracefully from errors."},
      ]},
    ],
    resources:[
      {src:"Cambridge Int'l", ttl:"Official syllabus (2026)", desc:"9618 syllabus document, direct PDF", url:"https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf"},
      {src:"PapaCambridge", ttl:"Full past papers + mark schemes", desc:"Paper 1–4, every session", url:"https://pastpapers.papacambridge.com/papers/caie/as-and-a-level-computer-science-9618"},
      {src:"Save My Exams", ttl:"Revision notes", desc:"Written notes + exam-style questions", url:"https://www.savemyexams.com/a-level/computer-science/cie/19/revision-notes/"},
      {src:"ZNotes", ttl:"Condensed topic notes", desc:"Quick-reference syllabus notes", url:"https://znotes.org/caie/a2-level/computer-science-9618"},
      {src:"RocketRevise", ttl:"Topical workbooks", desc:"Topic-sorted question packs for 9618", url:"https://rocketrevise.com/a-level-cambridge/cie-a-level-computer-science/"},
    ]
  },

  biz: { code:"9609", title:"Business", years:"2026–2028", color:"var(--biz)", soft:"var(--biz-soft)",
    units:[
      {id:"AS", title:"AS Level", topics:[
        {id:"1.1", title:"Enterprise", level:"AS", points:["business activity/factors of production","added value/opportunity cost","entrepreneurs/intrapreneurs","risk and business plans"], blurb:"Understand business activity, added value and opportunity cost, and the role entrepreneurs and intrapreneurs play in taking risks."},
        {id:"1.2", title:"Business structure", level:"AS", points:["economic sectors","ownership forms","private/public/social enterprise"], blurb:"Compare economic sectors and forms of business ownership, from sole traders to public limited companies and social enterprises."},
        {id:"1.3", title:"Size of business", level:"AS", points:["measures of size","growth","small vs large firms"], blurb:"Compare ways to measure business size, and the different advantages small and large firms have."},
        {id:"1.4", title:"Business objectives", level:"AS", points:["objectives","CSR/triple bottom line","SMART targets"], blurb:"Set business objectives, including SMART targets, and consider corporate social responsibility."},
        {id:"1.5", title:"Stakeholders in a business", level:"AS", points:["stakeholders","conflict/influence","accountability"], blurb:"Identify stakeholder groups, understand how their interests can conflict, and who a business is really accountable to."},
        {id:"2.1", title:"Human resource management", level:"AS", points:["workforce planning","recruitment/selection","training/redundancy"], blurb:"Plan workforce needs, and understand the recruitment, selection, training and redundancy process."},
        {id:"2.2", title:"Motivation", level:"AS", points:["motivation theories","financial methods","non-financial methods"]},
        {id:"2.3", title:"Management", level:"AS", points:["management functions","decision-making","manager effectiveness"], blurb:"Understand the core functions of management and how they shape decision-making and manager effectiveness."},
        {id:"3.1", title:"The nature of marketing", level:"AS", points:["marketing objectives","market orientation","demand/supply","segmentation"], blurb:"Understand marketing objectives, market vs product orientation, and how demand and supply interact."},
        {id:"3.2", title:"Market research", level:"AS", points:["primary/secondary research","sampling","reliability/bias"], blurb:"Compare primary and secondary market research methods, sampling techniques, and issues of reliability and bias."},
        {id:"3.3", title:"The marketing mix", level:"AS", points:["product","price","promotion","place"]},
        {id:"4.1", title:"The nature of operations", level:"AS", points:["transformation process","productivity","job/batch/flow production"]},
        {id:"4.2", title:"Inventory management", level:"AS", points:["buffer inventory","reorder/lead time","JIT"], blurb:"Balance buffer inventory against reorder levels and lead times, including the just-in-time approach."},
        {id:"4.3", title:"Capacity utilisation and outsourcing", level:"AS", points:["capacity utilisation","over/under-capacity","outsourcing"], blurb:"Calculate capacity utilisation, and weigh the costs/benefits of outsourcing against over- or under-capacity."},
        {id:"5.1", title:"Business finance", level:"AS", points:["need for finance","cash vs profit","working capital"], blurb:"Understand why businesses need finance, the difference between cash and profit, and the idea of working capital."},
        {id:"5.2", title:"Sources of finance", level:"AS", points:["internal sources","external sources","matching finance to context"]},
        {id:"5.3", title:"Forecasting and managing cash flows", level:"AS", points:["cash-flow forecasts","net cash flow","cash shortages"], blurb:"Construct cash-flow forecasts, calculate net cash flow, and identify ways to manage a cash shortage."},
        {id:"5.4", title:"Costs", level:"AS", points:["cost classifications","contribution","break-even/margin of safety"], blurb:"Classify costs as fixed or variable, calculate contribution, and use break-even analysis including margin of safety."},
        {id:"5.5", title:"Budgets", level:"AS", points:["budget purposes/types","variance analysis"], blurb:"Understand the purpose of different budget types and how to interpret variances between budgeted and actual figures."},
      ]},
      {id:"A2", title:"A Level", topics:[
        {id:"6.1", title:"External influences on business activity", level:"A2", points:["political/legal/economic/social/tech factors","international trade","sustainability"]},
        {id:"6.2", title:"Business strategy", level:"A2", points:["SWOT/PEST","Porter five forces","Ansoff","decision trees/force-field/scenario planning"]},
        {id:"7.1", title:"Organisational structure", level:"A2", points:["hierarchical/flat/matrix","delegation/accountability","centralisation"], blurb:"Compare hierarchical, flat and matrix structures, and understand delegation, accountability and centralisation."},
        {id:"7.2", title:"Business communication", level:"A2", points:["methods","barriers","communication effectiveness"], blurb:"Compare communication methods and identify barriers that reduce how effective communication is."},
        {id:"7.3", title:"Leadership", level:"A2", points:["leadership styles","situational choice","effectiveness"], blurb:"Compare leadership styles and judge which suits a given business situation best."},
        {id:"7.4", title:"Human resource management strategy", level:"A2", points:["HR strategy","employee performance","flexibility/change"], blurb:"Link HR strategy to employee performance and a business's ability to respond flexibly to change."},
        {id:"8.1", title:"Marketing analysis", level:"A2", points:["market size/share/growth","elasticity/forecasting","customer/competitor analysis"], blurb:"Analyse market size, share and growth, use elasticity and forecasting, and assess customers and competitors."},
        {id:"8.2", title:"Marketing strategy", level:"A2", points:["segmentation/targeting/positioning","integrated mix","international marketing"], blurb:"Apply segmentation, targeting and positioning, build an integrated marketing mix, and consider international marketing."},
        {id:"9.1", title:"Location and scale", level:"A2", points:["location factors","economies/diseconomies of scale"], blurb:"Weigh up location factors for a business, and understand economies and diseconomies of scale."},
        {id:"9.2", title:"Quality management", level:"A2", points:["quality control/assurance","TQM","benchmarking"], blurb:"Compare quality control, quality assurance and total quality management, and understand benchmarking."},
        {id:"9.3", title:"Operations strategy", level:"A2", points:["lean operations","technology","supply chain","capacity/quality trade-offs"], blurb:"Understand lean operations, the role of technology, and supply-chain decisions and trade-offs between capacity, cost and quality."},
        {id:"10.1", title:"Financial statements", level:"A2", points:["income statement","statement of financial position","cash-flow statement"], blurb:"Read an income statement, statement of financial position, and cash-flow statement."},
        {id:"10.2", title:"Analysis of published accounts", level:"A2", points:["profitability/liquidity ratios","trend/competitor comparison","limitations"], blurb:"Calculate and interpret profitability and liquidity ratios, and understand their limits when comparing over time or between firms."},
        {id:"10.3", title:"Investment appraisal", level:"A2", points:["payback","ARR","NPV","qualitative factors"], blurb:"Use payback period, average rate of return (ARR) and net present value (NPV) — alongside qualitative factors — to judge an investment."},
        {id:"10.4", title:"Finance and accounting strategy", level:"A2", points:["accounting data in strategy","annual reports","ratio trends/risk"], blurb:"Use financial data and annual reports strategically, tracking ratio trends and financial risk."},
      ]},
    ],
    resources:[
      {src:"Cambridge Int'l", ttl:"Official syllabus (2026–2028)", desc:"9609 syllabus document, direct PDF", url:"https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf"},
      {src:"PapaCambridge", ttl:"Full past papers + mark schemes", desc:"Every session, all components", url:"https://pastpapers.papacambridge.com/papers/caie/cambridge-advanced-as-and-a-level-business-9609"},
      {src:"Save My Exams", ttl:"Revision notes", desc:"Written notes + exam-style questions", url:"https://www.savemyexams.com/a-level/business/cie/23/revision-notes/"},
      {src:"ZNotes", ttl:"Condensed topic notes", desc:"Quick-reference syllabus notes", url:"https://znotes.org/caie/a2-level/business-9609/"},
    ]
  },

  chem: { code:"9701", title:"Chemistry", years:"2025–2027", color:"var(--chem)", soft:"var(--chem-soft)",
    units:[
      {id:"AS", title:"AS Level", topics:[
        {id:"1", title:"Atomic structure", level:"AS", points:["particles/isotopes","electron configuration","ionisation energy"]},
        {id:"2", title:"Atoms, molecules and stoichiometry", level:"AS", points:["moles","formulae/equations","gas/solution calculations"], blurb:"Use moles to balance equations and calculate reacting masses, gas volumes and solution concentrations."},
        {id:"3", title:"Chemical bonding", level:"AS", points:["ionic/covalent/metallic","shape/polarity","intermolecular forces"]},
        {id:"4", title:"States of matter", level:"AS", points:["particle model","ideal gas equation","solid structures"], blurb:"Use the particle model and the ideal gas equation, and understand the structures of solids."},
        {id:"5", title:"Chemical energetics", level:"AS", points:["enthalpy changes","Hess cycles","bond energies"]},
        {id:"6", title:"Electrochemistry", level:"AS", points:["oxidation states","redox","electrolysis"], blurb:"Assign oxidation states, balance redox equations, and understand the process of electrolysis."},
        {id:"7", title:"Equilibria", level:"AS", points:["dynamic equilibrium","Kc","Le Chatelier"]},
        {id:"8", title:"Reaction kinetics", level:"AS", points:["rate","collision theory","activation energy/catalysts"]},
        {id:"9", title:"The Periodic Table: chemical periodicity", level:"AS", points:["Period 3 trends","oxides/chlorides","structure/property trends"], blurb:"Explain trends across Period 3 in structure, bonding and the properties of oxides and chlorides."},
        {id:"10", title:"Group 2", level:"AS", points:["reactivity","solubility/thermal stability","compound uses"], blurb:"Explain trends in reactivity, solubility and thermal stability down Group 2, and know some uses of Group 2 compounds."},
        {id:"11", title:"Group 17", level:"AS", points:["halogen trends","oxidising power","halide tests"], blurb:"Explain trends in oxidising power down Group 17, and use halide ion tests to identify halogens."},
        {id:"12", title:"Nitrogen and sulfur", level:"AS", points:["ammonia/nitrogen compounds","sulfur dioxide","environmental chemistry"], blurb:"Understand the chemistry of ammonia and nitrogen compounds, sulfur dioxide, and their environmental impact."},
        {id:"13", title:"An introduction to AS Level organic chemistry", level:"AS", points:["nomenclature","isomerism","mechanisms"]},
        {id:"14", title:"Hydrocarbons", level:"AS", points:["alkanes","alkenes","substitution/addition"], blurb:"Understand the reactions of alkanes (free-radical substitution) and alkenes (electrophilic addition)."},
        {id:"15", title:"Halogen compounds", level:"AS", points:["haloalkane reactions","substitution/elimination","reactivity"], blurb:"Understand nucleophilic substitution and elimination reactions of haloalkanes, and the factors affecting their reactivity."},
        {id:"16", title:"Hydroxy compounds", level:"AS", points:["alcohol reactions","oxidation","dehydration"], blurb:"Understand the reactions of alcohols, including oxidation and dehydration."},
        {id:"17", title:"Carbonyl compounds", level:"AS", points:["aldehydes/ketones","tests","addition/reduction"], blurb:"Distinguish aldehydes from ketones using chemical tests, and understand their addition/reduction reactions."},
        {id:"18", title:"Carboxylic acids and derivatives", level:"AS", points:["acids","esters","derivatives"], blurb:"Understand the reactions of carboxylic acids and the formation of esters and other derivatives."},
        {id:"19", title:"Nitrogen compounds", level:"AS", points:["amines/nitrogen compounds","amino acids","peptide links"], blurb:"Understand the basicity of amines, and the structure of amino acids and the peptide link."},
        {id:"20", title:"Polymerisation", level:"AS", points:["addition/condensation","monomers/repeat units"], blurb:"Distinguish addition and condensation polymerisation, and identify monomers from a given repeat unit."},
        {id:"21", title:"Organic synthesis", level:"AS", points:["reaction pathways","reagents/conditions","multi-step synthesis"], blurb:"Plan multi-step synthetic routes between organic compounds, choosing the correct reagents and conditions."},
        {id:"22", title:"Analytical techniques", level:"AS", points:["mass spectra","IR","chromatography basics"], blurb:"Interpret mass spectra and infrared spectra, and use chromatography to identify compounds."},
      ]},
      {id:"A2", title:"A Level", topics:[
        {id:"23", title:"Chemical energetics", level:"A2", points:["lattice energy/Born-Haber","entropy","Gibbs free energy"], blurb:"Use Born-Haber cycles and lattice energy, and consider entropy and Gibbs free energy to judge whether a reaction is feasible."},
        {id:"24", title:"Electrochemistry", level:"A2", points:["electrode potentials","cell potentials","redox feasibility"], blurb:"Use standard electrode potentials to calculate cell potentials and predict whether a redox reaction is feasible."},
        {id:"25", title:"Equilibria", level:"A2", points:["Ka/Kw/pH","buffers","Ksp/partition"], blurb:"Work with Ka, Kw and pH for acids and bases, understand how buffers resist pH change, and use Ksp and partition coefficients."},
        {id:"26", title:"Reaction kinetics", level:"A2", points:["rate equations/orders","mechanisms","catalysis"], blurb:"Determine rate equations and orders of reaction from experimental data, and link mechanisms and catalysis to kinetics in more depth."},
        {id:"27", title:"Group 2", level:"A2", points:["advanced trends","thermal stability/solubility"], blurb:"Extend Group 2 trends to explain thermal stability and solubility patterns in more quantitative detail."},
        {id:"28", title:"Chemistry of transition elements", level:"A2", points:["complexes/ligands","colour/redox","catalysis/stability constants"], blurb:"Understand transition metal complexes and ligands, the origin of colour, and their role as catalysts."},
        {id:"29", title:"An introduction to A Level organic chemistry", level:"A2", points:["advanced nomenclature","aromatic bonding","optical isomerism"], blurb:"Extend organic nomenclature to more complex molecules, understand aromatic (benzene) bonding, and optical isomerism."},
        {id:"30", title:"Hydrocarbons", level:"A2", points:["arenes","electrophilic substitution","benzene chemistry"], blurb:"Understand the structure of benzene and its characteristic electrophilic substitution reactions."},
        {id:"31", title:"Halogen compounds", level:"A2", points:["advanced halogen chemistry","mechanisms/reactivity"], blurb:"Extend halogen compound chemistry to more complex mechanisms and reactivity patterns."},
        {id:"32", title:"Hydroxy compounds", level:"A2", points:["alcohols","phenol","synthesis"], blurb:"Understand the chemistry of phenol alongside alcohols, and further synthetic routes between them."},
        {id:"33", title:"Carboxylic acids and derivatives", level:"A2", points:["esters","acyl chlorides","acyl substitution"], blurb:"Understand the reactions of acyl chlorides and acyl substitution reactions in more depth."},
        {id:"34", title:"Nitrogen compounds", level:"A2", points:["amines","phenylamine/azo","amides/amino acids"], blurb:"Understand phenylamine, azo dye formation, and the structure of amides and amino acids."},
        {id:"35", title:"Polymerisation", level:"A2", points:["condensation polymers","monomer prediction","degradability"], blurb:"Understand condensation polymers in depth, predict monomers from a repeat unit, and consider polymer degradability."},
        {id:"36", title:"Organic synthesis", level:"A2", points:["complete reaction map","multi-step routes","structure deduction"], blurb:"Build a complete organic reaction map, plan multi-step synthetic routes, and deduce structures from given information."},
        {id:"37", title:"Analytical techniques", level:"A2", points:["chromatography","1H NMR","13C NMR","combined spectra"], blurb:"Interpret chromatography, ¹H NMR and ¹³C NMR spectra, combining evidence from several techniques to identify structures."},
      ]},
    ],
    resources:[
      {src:"Cambridge Int'l", ttl:"Official syllabus (2025–2027)", desc:"9701 syllabus document, direct PDF", url:"https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf"},
      {src:"PapaCambridge", ttl:"Full past papers + mark schemes", desc:"Every session, all components", url:"https://pastpapers.papacambridge.com/papers/caie/as-and-a-level-chemistry-9701"},
      {src:"PapaCambridge", ttl:"Topical past papers", desc:"Questions grouped by syllabus topic", url:"https://pastpapers.papacambridge.com/papers/caie/as-and-a-level-chemistry-9701-topical-past-papers"},
      {src:"Save My Exams", ttl:"Revision notes", desc:"Written notes + exam-style questions", url:"https://www.savemyexams.com/a-level/chemistry/cie/25/revision-notes/"},
      {src:"ZNotes", ttl:"Condensed topic notes", desc:"Quick-reference syllabus notes", url:"https://znotes.org/caie/as-level/chemistry-9701"},
      {src:"RocketRevise", ttl:"Topical workbooks", desc:"Topic-sorted question packs for 9701", url:"https://rocketrevise.com/a-level-cambridge/cie-a-level-biology-9700/cie-9701-a-level-chemistry-as-notes-2025/"},
    ]
  },
};

/* ============================================================
   IN-DEPTH NOTES — keyed "subject:topicId"
   ============================================================ */
const DEEP = {
  "math:1.1": `
    <h4>Solving quadratics</h4>
    <p>Quadratic formula: <span class="formula">x = (−b ± √(b²−4ac)) / 2a</span> The discriminant b²−4ac tells you the root type: <b>&gt;0</b> two real roots, <b>=0</b> one repeated root, <b>&lt;0</b> no real roots.</p>
    <h4>Completing the square</h4>
    <p>Write a(x + p)² + q. The turning point is at (−p, q) — the fastest way to find a min/max without calculus, and how you justify "always positive" arguments.</p>
    <div class="tip"><b>Exam tip:</b> "Show that a quadratic has no real roots" questions want the discriminant evaluated and compared to 0 explicitly — a numeric answer alone without the comparison loses the conclusion mark.</div>
  `,
  "math:1.2": `
    <h4>Functions</h4>
    <ul>
      <li>Domain = valid inputs, range = resulting outputs — state both when asked to "describe" a function.</li>
      <li>Composite function fg(x) means "do g first, then f" — work inside-out.</li>
      <li>Inverse f⁻¹(x): swap x and y, rearrange. Only exists properly if f is one-to-one over the given domain — you may need to restrict the domain first.</li>
      <li>Graph transformations: f(x)+a shifts up, f(x+a) shifts left, af(x) stretches vertically, f(ax) squashes horizontally.</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> When a domain is restricted before asking for an inverse, give the range of f as the domain of f⁻¹ — a commonly lost mark.</div>
  `,
  "math:1.5": `
    <h4>Exact values</h4>
    <p>Know sin/cos/tan for 0°, 30°, 45°, 60°, 90° without a calculator.</p>
    <h4>Key identities</h4>
    <ul>
      <li>sin²θ + cos²θ = 1, and tanθ = sinθ/cosθ</li>
      <li>Graphs of sin, cos and tan — know period, amplitude and key features</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> When solving "for 0 ≤ x ≤ 360°", find <em>all</em> solutions in range — sketch the graph or use a CAST diagram to check you haven't missed one.</div>
  `,
  "math:1.7": `
    <h4>Core rules</h4>
    <p>Standard derivatives: <span class="formula">d/dx(xⁿ)=nxⁿ⁻¹</span> Chain, product and quotient rules extend this to combinations of functions (developed further in P2/P3).</p>
    <h4>Stationary points</h4>
    <p>Set dy/dx = 0 and solve. Use the second derivative: d²y/dx² &gt; 0 → minimum, &lt; 0 → maximum.</p>
    <h4>Tangents and normals</h4>
    <p>Gradient of tangent = dy/dx at that point; gradient of normal = −1/(dy/dx).</p>
    <div class="tip"><b>Exam tip:</b> Double-check whether the question wants the tangent or the normal — mixing these up is one of the most common errors.</div>
  `,
  "math:1.8": `
    <h4>Standard integrals</h4>
    <p><span class="formula">∫xⁿ dx = xⁿ⁺¹/(n+1) + c</span> Never forget "+c" for indefinite integrals.</p>
    <h4>Definite integrals & area</h4>
    <p>∫ₐᵇ f(x) dx gives the signed area under the curve between x=a and x=b. For area <em>between</em> a curve and a line, integrate (top function − bottom function).</p>
    <div class="tip"><b>Exam tip:</b> If a region dips below the x-axis, the definite integral there is negative — take the modulus before adding areas, or you'll under-count.</div>
  `,
  "math:3.7": `
    <h4>Basics</h4>
    <p>Magnitude of a = (a₁,a₂,a₃) is |a| = √(a₁²+a₂²+a₃²). A unit vector in the direction of a is a/|a|.</p>
    <h4>Scalar (dot) product</h4>
    <p><span class="formula">a·b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b| cosθ</span> Set a·b = 0 to test perpendicularity; rearrange for cosθ to find the angle between two lines.</p>
    <h4>Vector equation of a line</h4>
    <p>r = a + tb, where a is a position vector on the line and b is the direction. To find intersections, solve two component equations for the parameters, then check the third is also satisfied.</p>
    <div class="tip"><b>Exam tip:</b> Always substitute back into the third equation to confirm the lines actually intersect — skew lines don't, and this check is often worth its own mark.</div>
  `,
  "math:3.9": `
    <h4>Basics</h4>
    <p>i² = −1. z = a + bi has real part a, imaginary part b. Conjugate z* = a − bi; z·z* = a²+b² (always real).</p>
    <h4>Modulus-argument form</h4>
    <p><span class="formula">z = r(cosθ + i sinθ), r = |z| = √(a²+b²), θ = arg(z)</span> Take care with the quadrant when finding θ.</p>
    <h4>Loci on the Argand diagram</h4>
    <ul>
      <li>|z − a| = r → circle, centre a, radius r</li>
      <li>|z − a| = |z − b| → perpendicular bisector of a and b</li>
      <li>arg(z − a) = θ → half-line from a at angle θ</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> Sketch loci questions first — most marks come from a correctly labelled diagram.</div>
  `,

  "cs:3.2": `
    <h4>Basic gates</h4>
    <p>Know the truth tables for <b>AND</b>, <b>OR</b>, <b>NOT</b>, <b>NAND</b>, <b>NOR</b>, <b>XOR</b> cold — these underpin every logic circuit question.</p>
    <h4>Circuits ↔ expressions</h4>
    <p>Be able to convert fluently both ways: write the Boolean expression from a given circuit diagram, and describe/draw a circuit from an expression such as Q = (A·B) + (¬C).</p>
    <div class="tip"><b>Exam tip:</b> Build a truth table for your derived expression and compare it against the circuit's own truth table as a fast self-check.</div>
  `,
  "cs:4.1": `
    <h4>Von Neumann architecture</h4>
    <p>A single memory stores both data and instructions. Key buses: <b>address bus</b> (memory locations, one-directional), <b>data bus</b> (data/instructions, bi-directional), <b>control bus</b> (control signals).</p>
    <h4>Fetch–decode–execute cycle</h4>
    <p>1. Address in the <b>PC</b> copies to the <b>MAR</b>; PC increments. 2. Instruction at that address fetched into the <b>MDR</b>, then copied to the <b>CIR</b>. 3. Decoded and executed, using the <b>ACC</b> for arithmetic where needed.</p>
    <div class="tip"><b>Exam tip:</b> Register-transfer notation questions want exact register abbreviations (PC, MAR, MDR, CIR, ACC) in the correct order — learn the cycle as a numbered sequence.</div>
  `,
  "cs:8.3": `
    <h4>Key SQL statements</h4>
    <span class="formula">SELECT column1, column2 FROM table WHERE condition ORDER BY column1;</span>
    <span class="formula">SELECT a.name, b.total FROM CustomersA a JOIN OrdersB b ON a.id = b.cust_id;</span>
    <span class="formula">INSERT INTO table (col1, col2) VALUES (val1, val2);
UPDATE table SET col1 = val WHERE condition;
DELETE FROM table WHERE condition;</span>
    <p>GROUP BY groups rows for aggregate functions (COUNT, SUM, AVG) — any non-aggregated column in SELECT must also appear in GROUP BY.</p>
    <div class="tip"><b>Exam tip:</b> Write SQL keywords in capitals and end statements with a semicolon — the mark scheme checks syntax, not just the right idea.</div>
  `,
  "cs:9.2": `
    <h4>Searching</h4>
    <p><b>Linear search:</b> checks every item, works unsorted, O(n). <b>Binary search:</b> halves the search space each time, needs sorted data, O(log n).</p>
    <h4>Sorting</h4>
    <p><b>Bubble sort:</b> swaps adjacent out-of-order pairs repeatedly, O(n²). <b>Insertion sort:</b> builds a sorted section by inserting each item into place. Be ready to trace either step-by-step.</p>
    <div class="tip"><b>Exam tip:</b> When comparing algorithms, state both the Big O <em>and</em> a practical reason — e.g. "binary search is O(log n) so it scales far better than linear search's O(n)".</div>
  `,
  "cs:10.4": `
    <h4>Stacks (LIFO)</h4>
    <p>Add/remove only from the top — push() to add, pop() to remove. Used for undo functions and managing recursive calls.</p>
    <h4>Queues (FIFO)</h4>
    <p>Add at the rear (enqueue), remove from the front (dequeue). A circular queue reuses freed space at the front rather than shifting all elements.</p>
    <h4>Linked lists</h4>
    <p>Each node stores data plus a pointer to the next node — insertion/deletion just changes pointers, no shifting like an array.</p>
    <div class="tip"><b>Exam tip:</b> Pseudocode for push/pop or enqueue/dequeue should always include an overflow/underflow check — frequently a separate mark.</div>
  `,
  "cs:15.2": `
    <h4>Boolean algebra & simplification</h4>
    <p>Key laws: De Morgan's — ¬(A·B) = ¬A + ¬B and ¬(A+B) = ¬A · ¬B; distribution — A·(B+C) = A·B + A·C. Use these (or a Karnaugh map) to simplify an expression before drawing the final circuit.</p>
    <div class="tip"><b>Exam tip:</b> A simplified answer picks up extra marks even if your unsimplified expression was already correct — always simplify as a final step.</div>
  `,
  "cs:20.1": `
    <h4>Paradigms</h4>
    <p><b>Procedural</b> — a sequence of instructions/procedures operating on data. <b>Object-oriented</b> — bundles data and behaviour into objects. <b>Declarative</b> — describes <em>what</em> the outcome should be, not the steps to get there (e.g. Prolog, SQL).</p>
    <h4>OOP core vocabulary</h4>
    <ul>
      <li><b>Encapsulation</b> — hides internal detail behind private attributes accessed via public methods</li>
      <li><b>Inheritance</b> — a subclass takes on attributes/methods of a superclass, and can override or extend them</li>
      <li><b>Polymorphism</b> — different classes respond to the same method call in their own way</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> When asked "why use OOP", link each pillar to a concrete benefit — encapsulation → fewer errors from accidental data changes; inheritance → less duplicated code; polymorphism → more flexible, extensible code.</div>
  `,

  "biz:2.2": `
    <h4>Motivation theories</h4>
    <ul>
      <li><b>Taylor</b> — workers are motivated mainly by money (piece-rate pay)</li>
      <li><b>Maslow</b> — hierarchy of needs (physiological → safety → social → esteem → self-actualisation); a satisfied need stops motivating</li>
      <li><b>Herzberg</b> — hygiene factors (pay, conditions) prevent dissatisfaction but don't motivate; motivators (recognition, responsibility) actually drive performance</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> Apply a named theory directly to the scenario rather than describing it in the abstract — examiners reward application over pure recall.</div>
  `,
  "biz:3.3": `
    <h4>The marketing mix</h4>
    <p>The 4 Ps: <b>Product</b> (features, quality, branding), <b>Price</b> (penetration, skimming, competitive, cost-plus), <b>Place</b> (distribution channels), <b>Promotion</b> (advertising, sales promotion, PR).</p>
    <div class="tip"><b>Exam tip:</b> For "recommend a pricing strategy", link back to the specific business's context in the case study — generic definitions alone won't reach top-band marks.</div>
  `,
  "biz:4.1": `
    <h4>Production methods</h4>
    <p><b>Job production</b> — one-off, highly customised, high skill/cost. <b>Batch production</b> — groups of identical items, flexible but needs changeover time. <b>Flow production</b> — continuous, standardised, high volume, low unit cost but inflexible.</p>
    <div class="tip"><b>Exam tip:</b> Always weigh cost against benefit when recommending a production method — "flow production is best" without discussing capital cost and flexibility trade-offs won't get top marks.</div>
  `,
  "biz:5.2": `
    <h4>Sources of finance</h4>
    <p><b>Internal</b>: retained profit, sale of assets. <b>External</b>: bank loans, share issues, trade credit, leasing. <b>Short-term</b> (overdraft, trade credit) funds day-to-day working capital; <b>long-term</b> (loans, share capital) funds major investment.</p>
    <h4>Break-even</h4>
    <p><span class="formula">Break-even output = Fixed Costs / (Selling Price − Variable Cost per unit)</span> Margin of safety = actual output − break-even output.</p>
    <div class="tip"><b>Exam tip:</b> When calculating break-even, state the formula, show substitution, and include units — method marks are awarded even if the final figure is wrong.</div>
  `,
  "biz:6.1": `
    <h4>PESTEL analysis</h4>
    <p><b>P</b>olitical, <b>E</b>conomic, <b>S</b>ocial, <b>T</b>echnological, <b>E</b>nvironmental, <b>L</b>egal — a framework for the external factors a business can't control but must respond to.</p>
    <div class="tip"><b>Exam tip:</b> Don't just list PESTEL factors — explain the specific <em>impact</em> on the named business in the case study for full marks.</div>
  `,
  "biz:6.2": `
    <h4>SWOT analysis</h4>
    <p>Internal: <b>S</b>trengths, <b>W</b>eaknesses. External: <b>O</b>pportunities, <b>T</b>hreats.</p>
    <h4>Ansoff's matrix</h4>
    <p>Four growth strategies based on product (existing/new) vs market (existing/new): market penetration (lowest risk), product development, market development, diversification (highest risk).</p>
    <div class="tip"><b>Exam tip:</b> When recommending an Ansoff strategy, justify it against the specific risk appetite and resources described in the case — don't just define the matrix.</div>
  `,

  "chem:1": `
    <h4>Subatomic particles</h4>
    <p>Protons (+1), neutrons (0), electrons (−1, negligible mass). Atomic number = protons; mass number = protons + neutrons. <b>Isotopes</b> share atomic number but differ in neutron count.</p>
    <h4>Ionisation energy trends</h4>
    <p>Increases across a period (more protons, same shell); decreases down a group (extra shielding shells, greater distance).</p>
    <div class="tip"><b>Exam tip:</b> Explain trends with all three factors — nuclear charge, shielding, atomic radius — even if one dominates; the mark scheme usually credits the full explanation.</div>
  `,
  "chem:3": `
    <h4>Bond types</h4>
    <p><b>Ionic</b> — electrostatic attraction between oppositely charged ions. <b>Covalent</b> — shared electron pair(s). <b>Metallic</b> — delocalised electrons attracted to a lattice of positive ions.</p>
    <h4>Intermolecular forces</h4>
    <p>Weakest to strongest: <b>van der Waals</b> &lt; <b>permanent dipole-dipole</b> &lt; <b>hydrogen bonding</b> (needs H bonded directly to N, O or F).</p>
    <div class="tip"><b>Exam tip:</b> When explaining boiling points, remember intermolecular forces (between molecules) are broken on boiling — not the covalent bonds within the molecule.</div>
  `,
  "chem:5": `
    <h4>Enthalpy change ΔH</h4>
    <p><b>Exothermic</b> releases energy (ΔH negative); <b>endothermic</b> absorbs energy (ΔH positive).</p>
    <h4>Hess's law</h4>
    <p>Enthalpy change is independent of route. Draw a cycle via a common intermediate and add/subtract arrows to find the unknown ΔH.</p>
    <h4>Bond energies</h4>
    <p><span class="formula">ΔH = Σ(bonds broken) − Σ(bonds formed)</span></p>
    <div class="tip"><b>Exam tip:</b> Keep Hess cycle arrow directions consistent with the given definitions — an inconsistent cycle is the most common source of sign errors.</div>
  `,
  "chem:7": `
    <h4>Dynamic equilibrium & Le Chatelier</h4>
    <p>Forward/reverse rates become equal at equilibrium. A disturbance shifts equilibrium to partially oppose the change — more reactant → shifts to products; more pressure → shifts to fewer gas moles; more heat → shifts endothermic direction.</p>
    <h4>Kc</h4>
    <p><span class="formula">Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</span> A catalyst speeds up reaching equilibrium but does <b>not</b> change its position or Kc.</p>
    <div class="tip"><b>Exam tip:</b> Be precise between "position shifts" (concentrations change) and "Kc changes" (only true if temperature changes).</div>
  `,
  "chem:8": `
    <h4>Collision theory</h4>
    <p>A reaction occurs only when particles collide with energy ≥ <b>activation energy</b> (Ea) and correct orientation.</p>
    <h4>Factors affecting rate</h4>
    <ul>
      <li><b>Temperature</b> — shifts the Maxwell-Boltzmann distribution so more particles exceed Ea</li>
      <li><b>Concentration/pressure</b> — increases collision frequency</li>
      <li><b>Surface area</b> — more exposed particles for solids</li>
      <li><b>Catalyst</b> — provides a lower-Ea pathway without being used up</li>
    </ul>
    <div class="tip"><b>Exam tip:</b> Reference the Maxwell-Boltzmann curve for temperature/catalyst explanations — "the proportion of molecules with E ≥ Ea increases" is what's actually marked.</div>
  `,
  "chem:13": `
    <h4>Naming & functional groups</h4>
    <p>Homologous series share a general formula and functional group. Suffixes: -ane (alkane), -ene (alkene), -ol (alcohol), -oic acid (carboxylic acid), -one (ketone).</p>
    <h4>Isomerism</h4>
    <p><b>Structural isomers</b> — same molecular formula, different arrangement. <b>Stereoisomers</b> — same structural formula, different spatial arrangement (E/Z around a C=C).</p>
    <h4>Mechanisms</h4>
    <p>Curly arrows must start from a bond or lone pair and point to where the new bond/charge forms.</p>
    <div class="tip"><b>Exam tip:</b> Precise curly-arrow placement — not just the right product — is what's actually marked in mechanism questions.</div>
  `,
};
