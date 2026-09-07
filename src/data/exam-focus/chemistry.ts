import type { ExamFocus, ExamTask } from "@/src/types/content";
import type { ExamFocusMap } from "./types";

const chemistryMethod = [
  "Underline the command word and the chemical evidence supplied: data, observation, structure, equation or conditions.",
  "Write one precise chemical point for each likely mark; use species, particles, bonds, equilibria or electron movement rather than a vague trend.",
  "For calculations, show the symbolic relationship, substitution, units and unrounded value before the final significant figures.",
  "Check atoms, charge, states and conditions; then answer the exact comparison or conclusion requested.",
];

const paper4 = (evidence: string, tasks: ExamTask[], component = "A Level Paper 4 · structured theory and calculations"): ExamFocus => ({
  component,
  evidence,
  answerMethod: chemistryMethod,
  tasks,
});

const task = (title: string, marks: string, prompt: string, markPoints: string[], examinerTrap: string): ExamTask => ({
  title, marks, prompt, markPoints, examinerTrap,
});

export const chemistryExamFocus: ExamFocusMap = {
  "23": paper4(
    "Recent Paper 4 questions mix exact definitions with multi-stage energy cycles and entropy calculations. Marks are attached to named gaseous species, correct arrows/signs and a visible calculation route—not to a memorised equation alone.",
    [
      task("Construct an energy cycle", "typically 4–7 marks", "Find a lattice energy, hydration enthalpy or enthalpy of solution from supplied data.", ["Write the target equation and include states.", "Draw or organise a Hess cycle with gaseous ions as the lattice-energy level.", "Apply every stoichiometric multiplier and keep the published sign convention consistent.", "Substitute into a clearly rearranged expression and give kJ mol⁻¹."], "Do not treat atomisation, ionisation and electron affinity values as unsigned numbers; the sign and number of moles both matter."),
      task("Explain an enthalpy trend", "typically 2–4 marks", "Compare lattice or hydration enthalpies for related ions.", ["Compare ionic charge and ionic radius separately.", "State how these change charge density and electrostatic attraction.", "Link stronger attraction to a more exothermic magnitude.", "If Born–Haber data differ from an ionic model, discuss covalent character/polarisation."], "‘More stable’ does not explain the energetic difference unless it is linked to electrostatic attraction and ion properties."),
      task("Use Gibbs energy and entropy", "typically 2–5 marks", "Calculate ΔS° or decide how temperature affects feasibility.", ["Use ΔG° = ΔH° − TΔS° with temperature in kelvin.", "Convert J and kJ so all terms share units.", "For a sign prediction, compare disorder/number and state of particles.", "State feasibility only for the temperature and conditions considered."], "A negative ΔG° predicts thermodynamic feasibility, not a fast reaction."),
    ],
  ),
  "24": {
    component: "A Level Paper 4 · structured theory and calculations",
    evidence: "Paper 4 mark schemes separate credit for selecting the correct half-equations, showing the direction of electron transfer, calculating with signed reduction potentials, and qualifying a feasibility prediction. A final voltage on its own cannot recover all of those marks.",
    answerMethod: [
      "Write both half-equations as reductions and copy their E° values with signs.",
      "Choose the more positive reduction as the cathode; reverse the other equation for oxidation, but do not reverse the sign inside the subtraction formula twice.",
      "Balance electrons, add the half-equations, and calculate E°cell = E°cathode − E°anode. Never multiply E° by a coefficient.",
      "Conclude in the direction actually written and add the correct limitation: standard conditions, kinetics, passivation or competing reactions.",
    ],
    tasks: [
      {
        title: "Predict a redox reaction from E° data",
        marks: "typically 3–5 marks",
        prompt: "Decide whether two supplied redox couples react and write the overall equation.",
        markPoints: [
          "Identify the species reduced from the more positive reduction potential.",
          "Reverse the other half-equation and balance the electron transfer.",
          "Give E°cell with the correct sign and unit, V.",
          "State that a positive E°cell predicts thermodynamic feasibility under standard conditions.",
        ],
        examinerTrap: "‘The reaction happens because E° is positive’ is incomplete if the calculated E° belongs to the opposite reaction direction.",
      },
      {
        title: "Explain why prediction and observation differ",
        marks: "typically 2–3 marks",
        prompt: "An E° calculation predicts a reaction, but little or no visible change occurs. Explain why.",
        markPoints: [
          "E° values apply to 298 K, 1 mol dm⁻³ solutions and 100 kPa gases.",
          "A feasible reaction may be extremely slow because of a high activation energy.",
          "Electrode surfaces may be passivated, or an alternative reaction may be kinetically favoured.",
          "E° predicts thermodynamic direction, not reaction rate or a guaranteed observation.",
        ],
        examinerTrap: "Do not claim that a catalyst makes E° more positive; a catalyst changes rate, not the equilibrium potential.",
      },
      {
        title: "Solve an electrolysis quantity problem",
        marks: "typically 3–5 marks",
        prompt: "Use current and time to find a deposited mass, gas volume or required electrolysis time.",
        markPoints: [
          "Convert time to seconds and calculate charge using Q = It.",
          "Find electron amount from n(e⁻) = Q/F.",
          "Use the electron coefficient in the electrode equation to obtain moles of product.",
          "Convert to the requested quantity and attach units with sensible significant figures.",
        ],
        examinerTrap: "The most common lost method is using Q/F as moles of product without applying the electron-to-product ratio.",
      },
    ],
  },
  "25": paper4(
    "Paper 4 mark schemes award calculations in stages: identify the equilibrium model, use stoichiometry before equilibrium, substitute the correct equilibrium concentrations or partial pressures, and state a contextual conclusion. pH and buffer questions similarly reward the chemical step before the logarithm.",
    [
      task("Calculate Kc or Kp", "typically 3–5 marks", "Use initial amounts, equilibrium information and a balanced equation to determine an equilibrium constant.", ["Write the K expression without solids or pure liquids.", "Use stoichiometric change to obtain every equilibrium amount/concentration/partial pressure.", "Apply powers from the balanced equation and keep units consistent.", "Quote the final units or state no units if they cancel."], "Do not insert initial concentrations into K unless the question explicitly says they are equilibrium values."),
      task("Solve a weak-acid or buffer pH", "typically 2–5 marks", "Calculate pH before or after adding a strong acid/base to a weak-acid system.", ["Calculate reacting moles first and complete neutralisation stoichiometry.", "Identify whether weak acid alone, buffer, equivalence or excess strong reagent remains.", "Use Ka = [H⁺][A⁻]/[HA] with post-reaction amounts or concentrations.", "Convert [H⁺] to pH and check that the value is chemically plausible."], "The Henderson form is not valid after one buffer component has been completely consumed."),
      task("Explain a position shift", "typically 2–4 marks", "Predict and explain the effect of concentration, pressure or temperature.", ["State the imposed change.", "State which side is favoured to oppose it.", "Link temperature effects to the endothermic/exothermic direction.", "Separate position/yield from rate and from the value of K."], "A catalyst does not change K or equilibrium composition; it shortens the time taken to reach equilibrium."),
    ],
  ),
  "26": paper4(
    "In the sampled 2025 Paper 4, rate-law work earns distinct marks for order, rate-constant units, numerical substitution, half-life reasoning and a catalytic cycle. Examiners reward evidence from data or graphs, not a mechanism asserted from the overall equation.",
    [
      task("Deduce and use a rate equation", "typically 4–7 marks", "Use initial-rate data to find orders, k and a new rate.", ["Compare experiments where only one concentration changes.", "Match the rate factor to the concentration factor to obtain each order.", "Write rate = k[A]ᵐ[B]ⁿ and calculate k from one complete row.", "Derive k units from the overall order before predicting the new rate."], "The coefficients in the overall equation do not automatically equal reaction orders."),
      task("Interpret a concentration–time graph", "typically 2–4 marks", "Use half-life or linear plots to identify order and calculate time or k.", ["Show equal half-life intervals for first-order behaviour.", "Use [A] = [A]₀e⁻ᵏᵗ or t½ = ln2/k when appropriate.", "Count complete half-lives carefully for powers of one half.", "State the pseudo-order assumption if another reactant is in large excess."], "A constant half-life identifies first order in the measured reactant, not necessarily overall first order."),
      task("Explain homogeneous catalysis", "typically 3–5 marks", "Use equations to show how a catalyst changes a reaction pathway.", ["Give at least two elementary steps containing the catalyst.", "Show the catalyst consumed in one step and regenerated later.", "Cancel intermediates to recover the overall equation.", "State that the alternative route has lower activation energy."], "Naming a catalyst without showing regeneration does not demonstrate a catalytic cycle."),
    ],
  ),
  "27": paper4(
    "Group 2 questions routinely combine equations, thermal stability, solubility and particle-level explanations. The 2025 Paper 4 scheme distinguishes the correct trend from the explanation, so both must be stated.",
    [
      task("Explain carbonate/nitrate thermal stability", "typically 2–4 marks", "Compare decomposition temperatures down Group 2.", ["State that cation radius increases down the group.", "Smaller cations have greater charge density/polarising power.", "They distort the anion electron cloud more strongly and weaken bonds within the anion.", "Therefore salts of smaller cations decompose at lower temperature."], "Do not explain the trend using bond strength in the metal oxide alone; the required idea is polarisation of the polyatomic anion."),
      task("Explain a solubility trend", "typically 2–4 marks", "Compare Group 2 hydroxide or sulfate solubilities.", ["Separate lattice enthalpy and hydration enthalpy.", "Explain how each becomes less exothermic as ionic radius increases.", "State which term changes more for the named family.", "Use the balance of the two changes to reach the observed trend."], "‘Lattice gets weaker, so solubility increases’ is incomplete because hydration also becomes less favourable."),
    ],
  ),
  "28": paper4(
    "Paper 4 transition-metal schemes allocate one mark per observation, ionic equation, ligand substitution, oxidation-state or stereochemical detail. Colour alone is rarely enough when a precipitate dissolves or a complex changes coordination number.",
    [
      task("Describe and explain ligand reactions", "typically 4–7 marks", "Predict observations and equations when OH⁻, NH₃ or Cl⁻ is added to an aqueous complex.", ["Name the initial and final colours and whether a precipitate forms/dissolves.", "Write the correct complex-ion formula with charge and coordination number.", "Distinguish ligand exchange from deprotonation/precipitation.", "Balance atoms and overall charge in the ionic equation."], "Do not write NH₃ as OH⁻ in a ligand-exchange equation; small additions may generate OH⁻, but excess NH₃ can replace ligands."),
      task("Explain transition-metal properties", "typically 2–5 marks", "Explain variable oxidation states, colour or catalysis.", ["For oxidation states, compare similar energies of 3d and 4s electrons.", "For colour, describe d-orbital splitting and absorption of a visible-light frequency.", "For ligand changes, link ligand identity/geometry to a different splitting energy.", "For catalysis, show variable oxidation state or adsorption/intermediate formation as relevant."], "Saying ‘d electrons make it coloured’ omits splitting, absorption and the complementary colour observed."),
      task("Deduce complex stereochemistry", "typically 2–4 marks", "Draw cis/trans or optical isomers of a supplied complex.", ["Keep the correct coordination number and geometry.", "Place identical ligands accurately for cis/trans forms.", "Draw non-superimposable mirror images where optical isomerism is required.", "Include brackets and overall charge."], "A mirror image is not an optical isomer if it can be rotated to superimpose on the original."),
    ],
  ),
  "29": paper4(
    "A Level organic mark schemes reward structural precision: displayed formulae, correct reagents and conditions, named mechanisms and curly arrows that start at electrons. General descriptions without structures lose the marks that distinguish A Level from AS recall.",
    [
      task("Identify the reaction type and attacking species", "typically 2–4 marks", "Use bond polarity and reagents to predict an organic mechanism.", ["Identify the electron-rich nucleophile or electrophile.", "Mark δ⁺/δ⁻ where bond polarity initiates attack.", "Name the mechanism at the required level, such as nucleophilic addition–elimination.", "Predict the correct intermediate/product and conserve charge."], "Curly arrows must begin at a lone pair or bond, never at an atom or at a positive charge."),
      task("Use structural evidence", "typically 3–6 marks", "Deduce isomers, functional groups or a reaction route from formulae and observations.", ["Calculate unsaturation or identify the diagnostic functional-group evidence.", "Draw every distinct structure without duplicates.", "Check carbon, hydrogen and heteroatom counts against the formula.", "Use the named test/reaction to eliminate alternatives."], "A correct functional-group name cannot replace a requested structural or displayed formula."),
    ],
  ),
  "30": paper4(
    "Hydrocarbon questions often couple benzene chemistry with route planning and mechanism drawings. Marks are separated across reagent, catalyst, electrophile generation, attack, intermediate and restoration of aromaticity.",
    [
      task("Draw electrophilic substitution", "typically 4–6 marks", "Show nitration, halogenation or Friedel–Crafts substitution of benzene.", ["Generate or state the electrophile with the correct catalyst.", "Draw an arrow from the benzene π system to the electrophile.", "Show the positively charged intermediate with a broken aromatic ring.", "Remove H⁺ with an arrow restoring the ring and regenerate the catalyst where required."], "Drawing a circle inside the ring throughout the mechanism hides the exact π electrons and intermediate needed for credit."),
      task("Compare benzene and alkene reactivity", "typically 3–5 marks", "Explain why benzene substitutes whereas an alkene readily adds.", ["Benzene has delocalised π electrons over the ring.", "Delocalisation stabilises benzene relative to a localised cyclohexatriene.", "Addition would destroy that delocalisation/aromatic stability.", "A stronger electrophile/catalyst is therefore needed and substitution restores the ring."], "Do not say benzene has no π electrons; it has a delocalised π system."),
    ],
  ),
  "31": paper4(
    "Halogen-compound marks depend on distinguishing nucleophilic substitution from elimination, stating solvent and heating conditions, and linking rate to carbon–halogen bond enthalpy rather than halogen electronegativity alone.",
    [
      task("Choose substitution or elimination", "typically 3–6 marks", "Predict products and mechanisms for a halogenoalkane with hydroxide or cyanide.", ["State aqueous conditions for substitution and ethanolic conditions for elimination.", "Identify the nucleophile/base and the carbon bearing the leaving group.", "Draw arrows from the lone pair and from the C–X bond to X.", "For elimination, remove a β-hydrogen and form C=C with correct possible isomers."], "A reagent name without solvent/temperature can be insufficient because the same reagent gives a different pathway under different conditions."),
      task("Explain hydrolysis-rate trends", "typically 2–4 marks", "Compare fluoro-, chloro-, bromo- and iodoalkanes.", ["State that the C–X bond must break.", "Compare C–X bond enthalpies down the group.", "Weaker C–I breaks faster than C–Br and C–Cl.", "Connect this to faster hydrolysis/precipitate formation under identical conditions."], "Bond polarity predicts attack but does not explain the observed down-group hydrolysis rate as well as bond enthalpy."),
    ],
  ),
  "32": paper4(
    "Hydroxy-compound questions test a reaction network: oxidation state, conditions, product identity, phenol acidity and aromatic substitution. Mark schemes require the conjugate-base explanation when comparing acidity.",
    [
      task("Plan alcohol oxidation or dehydration", "typically 3–6 marks", "Convert a primary/secondary alcohol to a specified product and distinguish products experimentally.", ["Choose acidified dichromate(VI) and state distillation for aldehyde or reflux for acid/ketone.", "Give the orange-to-green observation where requested.", "Write a balanced structural equation using [O].", "For dehydration, use concentrated acid/heat and identify all alkene isomers if required."], "Refluxing a primary alcohol with excess oxidant does not selectively produce an aldehyde."),
      task("Explain phenol acidity and substitution", "typically 3–5 marks", "Compare phenol with ethanol or predict bromination/nitration.", ["Phenol loses H⁺ to form phenoxide.", "The negative charge is delocalised into the aromatic ring.", "The conjugate base is more stable than ethoxide, so phenol is more acidic.", "The –OH group activates the ring, allowing substitution under milder conditions."], "Do not claim the O–H bond is simply ‘weaker’; compare the stability of the conjugate bases."),
    ],
  ),
  "33": paper4(
    "Carboxylic-acid and acyl-chloride schemes reward comparisons of conjugate-base stability and complete addition–elimination mechanisms. Reagents, by-products and the second equivalent of ammonia/amine are common mark points.",
    [
      task("Draw acyl addition–elimination", "typically 4–6 marks", "Show an acyl chloride reacting with water, alcohol, ammonia or an amine.", ["Attack the δ⁺ carbonyl carbon from the nucleophile lone pair.", "Move the C=O π pair to oxygen and show the tetrahedral intermediate.", "Re-form C=O while expelling Cl⁻.", "Complete proton transfer and state HCl/ammonium salt by-product."], "Direct substitution of Cl without a tetrahedral intermediate loses the mechanism marks."),
      task("Compare acid strengths", "typically 3–5 marks", "Explain effects of substituents or compare carboxylic acid, phenol and alcohol.", ["Write the deprotonation equilibrium and identify each conjugate base.", "Compare charge delocalisation and electron-withdrawing/donating inductive effects.", "Link greater conjugate-base stability to stronger acid.", "Apply the reasoning to the named substituent and its distance from –COOH."], "An electronegative substituent strengthens an acid by stabilising the anion, not by making H⁺ intrinsically ‘more positive’."),
    ],
  ),
  "34": paper4(
    "Nitrogen chemistry is assessed through synthesis, relative basicity, diazotisation/azo coupling and ionic structures of amino acids. Credit depends on lone-pair availability, temperature and exact structures.",
    [
      task("Explain amine basicity", "typically 3–5 marks", "Compare ammonia, an alkylamine, phenylamine and an amide.", ["State that the nitrogen lone pair accepts H⁺.", "Alkyl groups donate electron density, increasing lone-pair availability.", "In phenylamine the lone pair is delocalised into the benzene ring.", "In an amide it is delocalised toward C=O, making the base much weaker."], "Do not describe phenylamine as having no lone pair; it is present but less available."),
      task("Complete a diazonium/azo route", "typically 4–7 marks", "Convert phenylamine into a diazonium salt and then an azo dye or phenol.", ["Use NaNO₂ and dilute acid below 10 °C.", "Draw the Ar–N₂⁺ diazonium ion with charge.", "For coupling, use an activated aromatic partner and appropriate alkaline conditions.", "Show the –N=N– link and correct substitution position."], "Warm diazotisation conditions decompose the diazonium species; the low temperature is a scoring condition."),
      task("Draw amino-acid ionic forms", "typically 2–4 marks", "Show an amino acid in acid, neutral solution and alkali.", ["In acid, protonate –NH₂ to –NH₃⁺ and keep –COOH.", "Near neutral conditions, show the zwitterion –NH₃⁺/–COO⁻.", "In alkali, show –NH₂ and –COO⁻.", "Keep the side chain unchanged and include overall charges."], "A zwitterion contains both formal charges; writing neutral –NH₂ and –COOH is not the zwitterionic form."),
    ],
  ),
  "35": paper4(
    "Polymer questions give separate marks for monomers, the exact linkage, repeat-unit continuation bonds and hydrolysis products. Environmental evaluation must be linked to chemical structure and disposal conditions.",
    [
      task("Deduce monomers and repeat units", "typically 3–6 marks", "Move between a polyester/polyamide repeat unit and its monomers.", ["Identify the ester or amide link before cutting it.", "Restore –OH/–COOH or –NH₂/–COOH at the cut ends.", "Preserve every carbon and substituent from the repeat unit.", "Draw two continuation bonds through brackets and place n outside."], "Cutting the C–O bond on the wrong side of an ester produces incorrect monomers."),
      task("Evaluate degradability and disposal", "typically 3–5 marks", "Compare addition and condensation polymers in an environmental context.", ["Link hydrolysis to ester/amide groups in the backbone.", "Explain why a C–C addition-polymer backbone resists hydrolysis.", "State relevant conditions: water, acid/base, enzymes, heat or time.", "Balance benefits against energy use, contamination, product toxicity and actual infrastructure."], "‘Biodegradable is always better’ is not an evaluated conclusion without conditions and life-cycle consequences."),
    ],
  ),
  "36": paper4(
    "Organic synthesis mark schemes split credit across each conversion: product structure, reagent, conditions and sometimes mechanism or observation. Multi-step answers are checked for carbon-count changes and compatibility of reagents with every functional group present.",
    [
      task("Plan a multi-step synthesis", "typically 5–10 marks", "Convert a supplied starting structure into a target using syllabus reactions.", ["Work backwards from the target functional group to an immediate precursor.", "Track the carbon skeleton and flag chain extension through CN or acylation.", "Annotate every arrow with reagent and conditions.", "Check chemoselectivity and draw each intermediate unambiguously."], "A named reagent alone cannot earn the product mark if the intermediate structure is missing or has the wrong carbon skeleton."),
      task("Deduce an unknown from reactions", "typically 4–8 marks", "Combine tests, oxidation/reduction products and formula information.", ["Translate each positive and negative observation into a structural constraint.", "Use formula/unsaturation and carbon count before proposing a whole molecule.", "Cross-check every proposed functional group against all reactions.", "Give equations or structures for confirmatory products when asked."], "Do not stop after matching one test; the final structure must explain every item of evidence."),
    ],
  ),
  "37": paper4(
    "Paper 4 structure-deduction marks are awarded one clue at a time, while Paper 5 rewards a reproducible plan, controlled variables, processing of raw data, uncertainty and chemically justified improvements. A label such as ‘NMR’ or ‘repeat the experiment’ is not enough.",
    [
      task("Deduce a structure from spectra", "typically 6–10 marks", "Use mass, IR, ¹³C NMR and ¹H NMR data together.", ["Use molecular ion/formula to constrain mass and unsaturation.", "Assign functional groups from IR and carbon environments from ¹³C shifts.", "Use ¹H chemical shift, integration and splitting to build fragments.", "Join fragments and predict the complete spectrum back from the proposed structure."], "Peak height in routine ¹³C NMR does not count carbon atoms; signal number counts environments, modified by symmetry."),
      task("Plan and evaluate an investigation", "typically 8–15 marks", "Write a Paper 5 method or evaluate supplied experimental data.", ["State the independent/dependent variables and how control variables are held constant.", "Give apparatus, measured quantities, sequence, repeats and a safe/reproducible endpoint.", "Process data with units, graph axes, best-fit treatment and uncertainty where relevant.", "Identify a specific limitation, its effect on the result, and a practical improvement that addresses it."], "‘Use more accurate equipment’ is too vague; name the apparatus and explain which measurement uncertainty it reduces."),
      task("Use chromatography quantitatively", "typically 2–5 marks", "Calculate Rf or explain a separation/purity conclusion.", ["Measure from baseline to spot centre and baseline to solvent front.", "Calculate a unitless Rf less than 1.", "Explain movement using relative affinity for mobile and stationary phases.", "Compare Rf only under identical solvent, phase and temperature conditions."], "One spot does not prove absolute purity because different substances can co-elute."),
    ],
    "A Level Papers 4 and 5 · structure deduction, planning, analysis and evaluation",
  ),
};
