export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  questions: Question[];
}

export const haccpLevels: Level[] = [
  {
    id: 1,
    title: "Level 1 - HACCP Awareness",
    description: "Introduction to food safety and basic HACCP principles. This level covers the fundamentals of food safety management and why HACCP is important in the food industry.",
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Food Safety",
        content: `**What is Food Safety?**

Food safety is a scientific discipline describing handling, preparation, and storage of food in ways that prevent foodborne illness. It encompasses a number of routines that should be followed to avoid potential severe health hazards.

**Why is Food Safety Important?**

- Foodborne diseases affect millions of people worldwide each year
- Proper food safety practices prevent illness and save lives
- It protects the reputation of food businesses
- Legal compliance is mandatory for food businesses
- Economic losses from food recalls can be devastating

**Key Food Safety Hazards:**

1. **Biological Hazards** - Bacteria, viruses, parasites, and fungi
2. **Chemical Hazards** - Cleaning agents, pesticides, allergens
3. **Physical Hazards** - Glass, metal, plastic, stones

**The Food Safety Chain:**

Food safety is everyone's responsibility - from farmers and producers to processors, retailers, and consumers. Each link in the chain must maintain proper food safety practices.`
      },
      {
        id: "1-2",
        title: "What is HACCP?",
        content: `**HACCP - Hazard Analysis and Critical Control Points**

HACCP is a systematic preventive approach to food safety that addresses biological, chemical, and physical hazards in production processes that can cause the finished product to be unsafe.

**History of HACCP:**

- Developed in the 1960s by NASA, Pillsbury Company, and US Army Laboratories
- Originally designed to ensure food safety for space missions
- Now adopted worldwide as the standard for food safety management
- Codified in international standards by Codex Alimentarius

**Key Concepts:**

1. **Preventive System** - HACCP focuses on preventing hazards rather than inspecting finished products
2. **Science-Based** - Decisions are based on scientific evidence and data
3. **Systematic** - Follows a structured, logical approach
4. **Flexible** - Can be applied to any food business regardless of size

**Benefits of HACCP:**

- Reduces food safety risks
- Improves product quality
- Increases customer confidence
- Meets legal requirements
- Reduces waste and recalls
- Provides documentation for traceability

**Who Needs HACCP?**

All food businesses must implement HACCP-based food safety management systems, including:
- Restaurants and catering
- Food manufacturing
- Food retail
- Food transport and storage
- Primary production (farming)`
      },
      {
        id: "1-3",
        title: "The 7 Principles of HACCP",
        content: `**The Seven Principles of HACCP**

The HACCP system is built upon seven fundamental principles:

**Principle 1: Conduct a Hazard Analysis**
- Identify potential hazards associated with food production
- Determine the measures needed to control these hazards
- Consider biological, chemical, and physical hazards

**Principle 2: Determine Critical Control Points (CCPs)**
- Identify points in the process where control can be applied
- A CCP is a step where control can be applied to prevent, eliminate, or reduce a hazard to an acceptable level
- Use a CCP decision tree to identify these points

**Principle 3: Establish Critical Limits**
- Set maximum or minimum values for each CCP
- Critical limits separate safe from unsafe conditions
- Examples: temperature, time, pH, moisture level

**Principle 4: Establish Monitoring Procedures**
- Plan a sequence of observations or measurements
- Monitoring must detect loss of control at a CCP
- Define who monitors, how, when, and what to record

**Principle 5: Establish Corrective Actions**
- Define actions to take when monitoring indicates a deviation
- Corrective actions must address both the cause and the affected product
- Document all corrective actions taken

**Principle 6: Establish Verification Procedures**
- Confirm that the HACCP plan is working effectively
- Include review of records, calibration of instruments, and testing
- Verification is different from monitoring

**Principle 7: Establish Record-Keeping and Documentation**
- Maintain accurate records of all HACCP activities
- Include monitoring records, corrective action records, and verification records
- Records provide evidence of food safety compliance`
      }
    ],
    questions: [
      { id: "1-q1", question: "What does HACCP stand for?", options: ["Hazard Analysis and Critical Control Points", "Health And Consumer Care Program", "Hazard Assessment and Control Compliance Plan", "Hygiene And Catering Control Protocol"], correctAnswer: 0 },
      { id: "1-q2", question: "In which decade was HACCP originally developed?", options: ["1940s", "1950s", "1960s", "1970s"], correctAnswer: 2 },
      { id: "1-q3", question: "Which of the following is NOT a type of food safety hazard?", options: ["Biological", "Chemical", "Emotional", "Physical"], correctAnswer: 2 },
      { id: "1-q4", question: "How many principles does HACCP have?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
      { id: "1-q5", question: "What is the first principle of HACCP?", options: ["Establish Critical Limits", "Conduct a Hazard Analysis", "Determine CCPs", "Establish Monitoring"], correctAnswer: 1 },
      { id: "1-q6", question: "HACCP is primarily a _____ approach to food safety.", options: ["Reactive", "Preventive", "Corrective", "Inspection-based"], correctAnswer: 1 },
      { id: "1-q7", question: "Which organization helped develop HACCP for space missions?", options: ["WHO", "NASA", "FDA", "USDA"], correctAnswer: 1 },
      { id: "1-q8", question: "What is a CCP?", options: ["Critical Cooking Point", "Consumer Control Point", "Critical Control Point", "Central Compliance Point"], correctAnswer: 2 },
      { id: "1-q9", question: "Who is responsible for food safety in the food chain?", options: ["Only food manufacturers", "Only government agencies", "Everyone in the food chain", "Only consumers"], correctAnswer: 2 },
      { id: "1-q10", question: "What is the purpose of HACCP Principle 7?", options: ["Monitoring", "Verification", "Record-keeping and Documentation", "Corrective Actions"], correctAnswer: 2 }
    ]
  },
  {
    id: 2,
    title: "Level 2 - HACCP Fundamentals",
    description: "Deep dive into hazard analysis, critical control points, and prerequisite programs. Learn how to identify and assess food safety hazards in your operations.",
    lessons: [
      {
        id: "2-1",
        title: "Hazard Analysis in Detail",
        content: `**Understanding Hazard Analysis**

Hazard analysis is the cornerstone of HACCP. It involves identifying and evaluating potential hazards that may be present in food products and processes.

**Types of Hazards:**

**1. Biological Hazards:**
- Pathogenic bacteria (Salmonella, E. coli, Listeria, Campylobacter)
- Viruses (Norovirus, Hepatitis A)
- Parasites (Toxoplasma, Trichinella)
- Fungi and molds (producing mycotoxins)

**2. Chemical Hazards:**
- Natural toxins (mycotoxins, marine biotoxins)
- Allergens (milk, eggs, peanuts, tree nuts, wheat, soy, fish, shellfish)
- Pesticide residues
- Veterinary drug residues
- Cleaning chemical residues
- Food additives (excessive amounts)
- Heavy metals (lead, mercury, cadmium)

**3. Physical Hazards:**
- Glass fragments
- Metal pieces
- Stones
- Wood splinters
- Plastic pieces
- Bone fragments
- Personal items (jewelry, buttons)

**Conducting a Hazard Analysis:**

Step 1: List all ingredients and raw materials
Step 2: Identify each process step
Step 3: Identify potential hazards at each step
Step 4: Assess the severity and likelihood of each hazard
Step 5: Determine control measures
Step 6: Document the analysis

**Risk Assessment Matrix:**

Risk = Severity × Likelihood

- High Risk: Severe consequences with high probability
- Medium Risk: Moderate consequences or moderate probability
- Low Risk: Minor consequences with low probability`
      },
      {
        id: "2-2",
        title: "Critical Control Points (CCPs)",
        content: `**Identifying Critical Control Points**

A Critical Control Point (CCP) is a step at which control can be applied and is essential to prevent or eliminate a food safety hazard or reduce it to an acceptable level.

**CCP Decision Tree:**

The CCP decision tree helps determine whether a step is a CCP:

**Question 1:** Do control measures exist for the identified hazard?
- No → Modify process/product → Is the hazard significant? → STOP (Not a CCP)
- Yes → Go to Question 2

**Question 2:** Is the step specifically designed to eliminate or reduce the likely occurrence of the hazard to an acceptable level?
- Yes → CCP
- No → Go to Question 3

**Question 3:** Could contamination with the identified hazard occur in excess of acceptable levels or could these increase to unacceptable levels?
- No → Not a CCP
- Yes → Go to Question 4

**Question 4:** Will a subsequent step eliminate the identified hazard or reduce it to an acceptable level?
- Yes → Not a CCP
- No → CCP

**Examples of Common CCPs:**

1. **Thermal processing** (cooking, pasteurization, sterilization)
2. **Chilling/Cooling** (rapid cooling to prevent bacterial growth)
3. **Metal detection** (removing metal contaminants)
4. **pH control** (acidification to prevent pathogen growth)
5. **Moisture control** (drying to prevent microbial growth)
6. **Chemical preservation** (adding preservatives at correct levels)

**CCP vs. Control Point (CP):**

- A CCP is essential for food safety - loss of control could result in illness
- A CP is important for quality but not essential for safety
- CCPs require critical limits; CPs may have target levels`
      },
      {
        id: "2-3",
        title: "Prerequisite Programs (PRPs)",
        content: `**Prerequisite Programs (PRPs)**

PRPs are the basic conditions and activities necessary to maintain a hygienic environment throughout the food chain. They provide the foundation for an effective HACCP system.

**Essential Prerequisite Programs:**

**1. Good Manufacturing Practices (GMP):**
- Proper facility design and construction
- Equipment maintenance and calibration
- Personnel hygiene practices
- Sanitation procedures
- Pest control programs

**2. Good Hygiene Practices (GHP):**
- Personal hygiene requirements
- Handwashing protocols
- Clean clothing and protective equipment
- Health status monitoring
- Training programs

**3. Standard Operating Procedures (SOPs):**
- Cleaning and sanitizing procedures
- Receiving and storage procedures
- Processing procedures
- Packaging and labeling procedures
- Waste management procedures

**4. Supplier Management:**
- Supplier approval and verification
- Incoming material inspection
- Supplier audits
- Certificate of analysis review

**5. Traceability and Recall:**
- Product identification and tracking
- Lot coding systems
- Recall procedures
- Mock recall exercises

**6. Allergen Management:**
- Allergen identification
- Segregation and storage
- Production scheduling
- Labeling verification
- Staff training

**7. Water Quality Management:**
- Water testing programs
- Water treatment systems
- Ice quality control
- Backflow prevention

**Why PRPs Matter:**

Without effective PRPs, the HACCP plan becomes overly complex with too many CCPs. PRPs control general hazards, allowing CCPs to focus on significant hazards specific to the process.`
      },
      {
        id: "2-4",
        title: "Critical Limits and Monitoring",
        content: `**Establishing Critical Limits**

Critical limits are the maximum and/or minimum values to which a biological, chemical, or physical parameter must be controlled at a CCP to prevent, eliminate, or reduce a food safety hazard to an acceptable level.

**Characteristics of Critical Limits:**
- Must be measurable and observable
- Must be scientifically based
- Must be practical to monitor
- Must clearly separate safe from unsafe conditions

**Common Critical Limit Parameters:**
- Temperature (e.g., minimum 72°C for pasteurization)
- Time (e.g., minimum 15 seconds at pasteurization temperature)
- pH (e.g., maximum pH 4.6 for acid foods)
- Water activity (e.g., maximum aw 0.85)
- Concentration (e.g., minimum 50ppm chlorine)
- Physical dimensions (e.g., minimum metal detector sensitivity)

**Monitoring Procedures:**

Monitoring is a planned sequence of observations or measurements to assess whether a CCP is under control and to produce an accurate record for future use in verification.

**Four Questions for Monitoring:**
1. WHAT will be monitored? (The parameter)
2. HOW will it be monitored? (The method/equipment)
3. WHEN will it be monitored? (The frequency)
4. WHO will monitor? (The responsible person)

**Types of Monitoring:**
- Continuous monitoring (automated temperature recording)
- Intermittent monitoring (periodic checks)
- Visual inspection (color, appearance)

**Monitoring Records Must Include:**
- Date and time of monitoring
- Actual values measured
- Identity of the product
- Name/initials of the monitor
- Any deviations noted`
      }
    ],
    questions: [
      { id: "2-q1", question: "What is the correct formula for risk assessment?", options: ["Risk = Severity + Likelihood", "Risk = Severity × Likelihood", "Risk = Severity ÷ Likelihood", "Risk = Severity - Likelihood"], correctAnswer: 1 },
      { id: "2-q2", question: "Which of the following is a biological hazard?", options: ["Glass fragments", "Pesticide residues", "Salmonella", "Metal pieces"], correctAnswer: 2 },
      { id: "2-q3", question: "What does a CCP decision tree help determine?", options: ["Product quality", "Whether a step is a CCP", "Employee performance", "Cost analysis"], correctAnswer: 1 },
      { id: "2-q4", question: "Which of these is a common CCP?", options: ["Employee break times", "Thermal processing", "Office cleaning", "Marketing activities"], correctAnswer: 1 },
      { id: "2-q5", question: "What are Prerequisite Programs (PRPs)?", options: ["Advanced HACCP techniques", "Basic conditions for hygienic environment", "Marketing strategies", "Financial controls"], correctAnswer: 1 },
      { id: "2-q6", question: "What is the minimum temperature for pasteurization (HTST)?", options: ["50°C", "63°C", "72°C", "100°C"], correctAnswer: 2 },
      { id: "2-q7", question: "Which is NOT one of the four monitoring questions?", options: ["WHAT will be monitored?", "HOW will it be monitored?", "WHY monitor?", "WHO will monitor?"], correctAnswer: 2 },
      { id: "2-q8", question: "What is the maximum pH for acid foods to prevent botulism?", options: ["3.5", "4.0", "4.6", "5.5"], correctAnswer: 2 },
      { id: "2-q9", question: "What is the difference between a CCP and a CP?", options: ["CCP is for quality, CP is for safety", "CCP is essential for safety, CP is for quality", "There is no difference", "CP is more important than CCP"], correctAnswer: 1 },
      { id: "2-q10", question: "Which allergen is NOT part of the major 8 allergens?", options: ["Milk", "Chicken", "Peanuts", "Soy"], correctAnswer: 1 }
    ]
  },
  {
    id: 3,
    title: "Level 3 - HACCP Implementation",
    description: "Learn how to develop, implement, and maintain a HACCP plan. This level covers verification, validation, corrective actions, and documentation in detail.",
    lessons: [
      {
        id: "3-1",
        title: "Developing a HACCP Plan",
        content: `**Creating Your HACCP Plan**

A HACCP plan is a written document that delineates the formal procedures for following the seven principles of HACCP. It is the blueprint for your food safety management system.

**Steps to Develop a HACCP Plan:**

**Preliminary Steps:**
1. Assemble the HACCP team (multidisciplinary)
2. Describe the product and its intended use
3. Identify the intended use and consumers
4. Construct a flow diagram of the process
5. Verify the flow diagram on-site

**The HACCP Team:**
- Should include members from different departments
- Must have knowledge of the product and process
- May include external experts
- Team leader should be trained in HACCP
- Members should include: production, quality, engineering, maintenance

**Product Description Should Include:**
- Product name and composition
- Physical/chemical characteristics
- Processing methods
- Packaging type
- Shelf life and storage conditions
- Distribution methods
- Labeling instructions
- Intended consumer (general public or vulnerable groups)

**Flow Diagram Components:**
- All steps in the process from raw materials to finished product
- Include delays between steps
- Show rework and recycling points
- Include utilities (water, steam, air)
- Show waste removal points

**Verification of Flow Diagram:**
- Walk through the entire process
- Compare actual practice with the diagram
- Update the diagram if differences are found
- Have the team confirm accuracy
- Date and sign the verified diagram`
      },
      {
        id: "3-2",
        title: "Verification and Validation",
        content: `**Verification vs. Validation**

These two terms are often confused but have distinct meanings in HACCP:

**Validation:**
- "Are we doing the right thing?"
- Obtaining evidence that control measures are capable of being effective
- Done initially and when changes occur
- Scientific and technical assessment
- Examples: scientific studies, regulatory guidance, challenge studies

**Verification:**
- "Are we doing what we said we would do?"
- Applying methods, procedures, and tests to determine if the HACCP plan is in compliance
- Done regularly according to schedule
- Ongoing activity
- Examples: record review, calibration checks, sampling

**Validation Activities:**
- Scientific/technical review of hazard analysis
- Review of critical limits (scientific basis)
- Challenge testing or inoculated pack studies
- Review by qualified experts
- Regulatory guidance compliance
- Mathematical modeling

**Verification Activities:**
- Review of HACCP plan and records
- Review of deviations and product dispositions
- Calibration of monitoring instruments
- Targeted sampling and analysis
- Review of consumer complaints
- Internal audits
- External audits
- Review of prerequisite programs

**Frequency of Verification:**
- Initial: Before implementation
- Ongoing: According to verification schedule
- When changes occur: Process, ingredients, equipment
- When deviations occur: Repeated deviations at a CCP
- Annual: Complete reassessment at minimum

**Who Performs Verification?**
- Qualified individuals (not the person doing the monitoring)
- Internal trained auditors
- External third-party auditors
- Regulatory inspectors`
      },
      {
        id: "3-3",
        title: "Corrective Actions",
        content: `**Corrective Action Procedures**

When monitoring indicates a deviation from a critical limit, immediate corrective actions must be taken. This is Principle 5 of HACCP.

**Two Components of Corrective Actions:**

**1. Correcting the Deviation:**
- Bring the CCP back under control
- Identify the cause of deviation
- Prevent recurrence
- Adjust the process or equipment

**2. Disposition of Affected Product:**
- Determine what happened to product produced during the deviation
- Options: hold, reprocess, divert, or destroy
- Must be done by qualified personnel
- Document all decisions and actions

**Corrective Action Procedure Template:**

1. **Immediate Action:** Stop the process if necessary
2. **Segregate:** Hold all affected product
3. **Identify Cause:** Investigate why the deviation occurred
4. **Correct:** Fix the problem and bring CCP back under control
5. **Evaluate Product:** Determine safety of affected product
6. **Dispose:** Take appropriate action on affected product
7. **Record:** Document everything
8. **Prevent:** Implement measures to prevent recurrence

**Common Corrective Actions by CCP:**

**Temperature CCP:**
- Continue cooking until target temperature reached
- Recompute process time/temperature
- Reject product if safety cannot be assured

**Metal Detection CCP:**
- Re-run product through detector
- Investigate source of metal
- Check equipment for damage
- Quarantine product from last good check

**pH CCP:**
- Add acid to reach target pH
- Blend with compliant product
- Reject batch if cannot be corrected

**Documentation Requirements:**
- Description of the deviation
- Affected product identification (lot codes, times)
- Corrective actions taken
- Disposition of affected product
- Name of person taking corrective action
- Preventive measures implemented
- Verification of effectiveness`
      },
      {
        id: "3-4",
        title: "Documentation and Record Keeping",
        content: `**HACCP Documentation System**

Proper documentation is essential for an effective HACCP system. It provides evidence that the system is working and supports traceability.

**Types of HACCP Documents:**

**1. HACCP Plan Documents:**
- Hazard analysis worksheets
- CCP determination records
- Critical limit documentation
- HACCP plan summary
- Flow diagrams
- Product descriptions

**2. Monitoring Records:**
- CCP monitoring logs
- Temperature records
- Time records
- pH records
- Visual inspection records

**3. Corrective Action Records:**
- Deviation reports
- Corrective action forms
- Product disposition records
- Root cause analysis

**4. Verification Records:**
- Audit reports
- Calibration records
- Testing results
- Review sign-offs

**5. Supporting Documents:**
- Training records
- Supplier approvals
- Sanitation records
- Pest control records
- Maintenance logs

**Record Keeping Best Practices:**
- Records should be accurate and complete
- Entries made at time of activity
- Records signed/initialized by responsible person
- Records reviewed and verified
- Records stored securely
- Records retained for specified period
- Electronic records backed up regularly

**Record Retention Periods:**
- Monitoring records: Minimum 1 year or product shelf life + 6 months
- Corrective action records: Minimum 1 year
- Verification records: Minimum 2 years
- Training records: Duration of employment + 2 years

**Electronic Record Systems:**
- Automated data collection
- Real-time monitoring
- Trend analysis capabilities
- Alert systems for deviations
- Easy retrieval and reporting
- Data integrity and security measures`
      }
    ],
    questions: [
      { id: "3-q1", question: "What is the first preliminary step in developing a HACCP plan?", options: ["Create flow diagram", "Assemble the HACCP team", "Identify CCPs", "Set critical limits"], correctAnswer: 1 },
      { id: "3-q2", question: "Validation asks the question:", options: ["Are we doing what we said?", "Are we doing the right thing?", "How much does it cost?", "Who is responsible?"], correctAnswer: 1 },
      { id: "3-q3", question: "Verification is performed by:", options: ["The same person doing monitoring", "Anyone in the company", "Qualified individuals other than the monitor", "Only external auditors"], correctAnswer: 2 },
      { id: "3-q4", question: "What are the two components of corrective actions?", options: ["Planning and execution", "Correcting deviation and product disposition", "Documentation and training", "Monitoring and verification"], correctAnswer: 1 },
      { id: "3-q5", question: "When should validation be performed?", options: ["Daily", "Weekly", "Initially and when changes occur", "Only during audits"], correctAnswer: 2 },
      { id: "3-q6", question: "What should be included in a product description?", options: ["Only the product name", "Marketing information", "Composition, processing, storage conditions", "Only the price"], correctAnswer: 2 },
      { id: "3-q7", question: "How long should monitoring records typically be retained?", options: ["1 month", "6 months", "Minimum 1 year or shelf life + 6 months", "Forever"], correctAnswer: 2 },
      { id: "3-q8", question: "What is the purpose of verifying a flow diagram?", options: ["To make it look professional", "To compare actual practice with the diagram", "To reduce the number of steps", "To add more CCPs"], correctAnswer: 1 },
      { id: "3-q9", question: "Who should be on the HACCP team?", options: ["Only quality department", "Only management", "Multidisciplinary members from different departments", "External consultants only"], correctAnswer: 2 },
      { id: "3-q10", question: "What should happen to product produced during a CCP deviation?", options: ["Automatically destroy it", "It should be evaluated and properly disposed", "Ignore it", "Sell it at discount"], correctAnswer: 1 }
    ]
  },
  {
    id: 4,
    title: "Level 4 - HACCP Advanced",
    description: "Advanced topics including HACCP system management, auditing, integration with food safety standards, continuous improvement, and industry-specific applications.",
    lessons: [
      {
        id: "4-1",
        title: "HACCP System Management & Leadership",
        content: `**Managing Your HACCP System**

Effective management of a HACCP system requires leadership commitment, clear roles, and a culture of food safety throughout the organization.

**Management Commitment:**
- Top management must demonstrate commitment to food safety
- Provide adequate resources (people, equipment, training)
- Establish a food safety policy
- Conduct management reviews
- Support continuous improvement

**Food Safety Culture:**
- Leadership by example
- Open communication about food safety issues
- Employee empowerment to report concerns
- Recognition of good food safety practices
- Zero tolerance for food safety compromises

**Roles and Responsibilities:**
- **HACCP Team Leader:** Overall coordination, plan maintenance
- **CCP Monitors:** Day-to-day monitoring activities
- **Quality Manager:** Verification and validation oversight
- **Production Manager:** Ensuring processes follow the plan
- **All Employees:** Following procedures and reporting issues

**Management Review:**
- Conducted at planned intervals (typically annually)
- Review of HACCP system performance
- Input from: audits, customer feedback, corrective actions, changes
- Output: decisions for improvement, resource needs
- Documented and tracked

**Continuous Improvement:**
- Use data and trends to identify improvement opportunities
- Root cause analysis for recurring issues
- Benchmark against industry best practices
- Stay updated with regulatory changes
- Invest in technology and training
- Set measurable food safety objectives

**Change Management:**
- Assess food safety impact of any changes
- Update hazard analysis when needed
- Revalidate control measures
- Train staff on changes
- Update documentation
- Communicate changes to all affected parties`
      },
      {
        id: "4-2",
        title: "HACCP Auditing and Inspection",
        content: `**HACCP System Auditing**

Auditing is a systematic, independent examination to determine whether HACCP activities and related results comply with planned arrangements and whether the system is effectively implemented.

**Types of Audits:**

**1. Internal Audits (First Party):**
- Conducted by trained internal auditors
- Self-assessment of the HACCP system
- Identifies areas for improvement
- Prepares for external audits
- Should be scheduled regularly

**2. Supplier Audits (Second Party):**
- Conducted by the customer on suppliers
- Verifies supplier food safety capabilities
- Part of supplier approval process
- May include on-site inspection

**3. Third-Party Audits:**
- Conducted by independent certification bodies
- Required for certification schemes (FSSC 22000, BRC, SQF)
- Unannounced or announced
- Results in certification or non-conformances

**Audit Process:**
1. **Planning:** Define scope, criteria, and schedule
2. **Opening Meeting:** Introduce audit team, confirm plan
3. **Document Review:** Examine HACCP plan and records
4. **On-site Assessment:** Observe practices, interview staff
5. **Findings:** Identify conformities and non-conformances
6. **Closing Meeting:** Present findings, agree on actions
7. **Report:** Document all findings and conclusions
8. **Follow-up:** Verify corrective actions

**Common Non-Conformances:**
- Incomplete hazard analysis
- Missing or inadequate CCP monitoring records
- Critical limits not scientifically validated
- Corrective actions not documented
- Verification activities not performed as scheduled
- Training records incomplete
- PRPs not effectively implemented

**Audit Checklist Areas:**
- HACCP plan completeness and accuracy
- CCP monitoring effectiveness
- Corrective action implementation
- Verification and validation activities
- Record keeping and documentation
- Training adequacy
- PRP implementation
- Management review evidence`
      },
      {
        id: "4-3",
        title: "Integration with Food Safety Standards",
        content: `**HACCP in the Context of Food Safety Standards**

HACCP is the foundation of most modern food safety management systems and certification schemes worldwide.

**Major Food Safety Standards:**

**1. ISO 22000 - Food Safety Management Systems:**
- International standard for food safety management
- Integrates HACCP with management system requirements
- Applicable to all organizations in the food chain
- Requires prerequisite programs, HACCP, and management system
- Certification available through accredited bodies

**2. FSSC 22000 - Food Safety System Certification:**
- Based on ISO 22000 with additional requirements
- Recognized by GFSI (Global Food Safety Initiative)
- Sector-specific prerequisite program requirements
- Widely accepted by global retailers and manufacturers

**3. BRCGS - British Retail Consortium Global Standards:**
- Required by many UK and European retailers
- Covers food safety, quality, and operational criteria
- Includes HACCP requirements
- Graded audit system (AA, A, B, C, D)

**4. SQF - Safe Quality Food:**
- GFSI-recognized certification program
- Comprehensive food safety and quality system
- Multiple levels of certification
- Popular in North America and Australia

**5. Codex Alimentarius:**
- International food standards
- HACCP principles and guidelines
- Basis for national food regulations
- Provides the framework for HACCP implementation

**Integration Benefits:**
- Single system addressing multiple requirements
- Reduced audit burden
- Improved efficiency
- Global market access
- Consistent food safety approach
- Better risk management

**Key Integration Points:**
- HACCP principles embedded in all standards
- Prerequisite programs aligned with standard requirements
- Documentation systems serve multiple purposes
- Management review satisfies all standards
- Internal audit program covers all requirements`
      },
      {
        id: "4-4",
        title: "Industry-Specific HACCP Applications",
        content: `**HACCP Across Different Food Industries**

While HACCP principles are universal, their application varies significantly across different food industry sectors.

**1. Meat and Poultry Processing:**
- Key hazards: Salmonella, Campylobacter, E. coli O157:H7
- Critical CCPs: Cooking temperature, chilling rate, metal detection
- Specific concerns: Cross-contamination, antimicrobial treatments
- Regulatory oversight: USDA FSIS (in USA), FSSAI (in India)

**2. Dairy Industry:**
- Key hazards: Listeria, Salmonella, antibiotic residues
- Critical CCPs: Pasteurization, homogenization, storage temperature
- Specific concerns: Allergen control, milk quality
- Standards: PMO (Pasteurized Milk Ordinance)

**3. Seafood Processing:**
- Key hazards: Histamine, parasites, biotoxins, Vibrio
- Critical CCPs: Receiving temperature, cooking, freezing
- Specific concerns: Time-temperature abuse, species identification
- Regulations: HACCP mandatory for seafood since 1995 (USA)

**4. Bakery and Cereal Products:**
- Key hazards: Allergens, mycotoxins, physical contaminants
- Critical CCPs: Baking temperature/time, metal detection
- Specific concerns: Allergen management, moisture control
- Challenges: Diverse product range, seasonal variations

**5. Fresh Produce:**
- Key hazards: E. coli, Salmonella, Listeria, pesticides
- Critical CCPs: Water quality, washing/sanitizing, cooling
- Specific concerns: Agricultural water, worker hygiene, wildlife
- Standards: GAP (Good Agricultural Practices), FSMA Produce Rule

**6. Ready-to-Eat Foods:**
- Key hazards: Listeria monocytogenes, allergens
- Critical CCPs: Thermal processing, packaging integrity, storage
- Specific concerns: Post-processing contamination, shelf life
- High risk: No kill step before consumption

**Emerging Trends in HACCP:**
- Digital monitoring and IoT sensors
- Predictive analytics for hazard prediction
- Blockchain for traceability
- Rapid testing technologies
- Risk-based inspection models
- Food safety culture assessment tools
- Sustainability integration with food safety`
      }
    ],
    questions: [
      { id: "4-q1", question: "What type of audit is conducted by an independent certification body?", options: ["First party", "Second party", "Third party", "Internal"], correctAnswer: 2 },
      { id: "4-q2", question: "Which standard is the foundation for most food safety certification schemes?", options: ["ISO 9001", "ISO 22000", "ISO 14001", "ISO 45001"], correctAnswer: 1 },
      { id: "4-q3", question: "What does GFSI stand for?", options: ["Global Food Safety Initiative", "General Food Standards Index", "Government Food Safety Institute", "Global Food Standards Integration"], correctAnswer: 0 },
      { id: "4-q4", question: "In meat processing, which pathogen is a key concern?", options: ["Listeria only", "E. coli O157:H7", "Hepatitis A", "Norovirus"], correctAnswer: 1 },
      { id: "4-q5", question: "What is the first step in an audit process?", options: ["On-site assessment", "Opening meeting", "Planning", "Report writing"], correctAnswer: 2 },
      { id: "4-q6", question: "Which food safety scheme is required by many UK retailers?", options: ["SQF", "BRCGS", "FSSC 22000", "ISO 22000"], correctAnswer: 1 },
      { id: "4-q7", question: "What is a key hazard specific to seafood?", options: ["Allergens only", "Histamine and biotoxins", "Mycotoxins", "Acrylamide"], correctAnswer: 1 },
      { id: "4-q8", question: "What does management review provide as output?", options: ["Employee salaries", "Decisions for improvement and resource needs", "Product recipes", "Marketing plans"], correctAnswer: 1 },
      { id: "4-q9", question: "Which is an emerging trend in HACCP?", options: ["Paper-based records", "IoT sensors for digital monitoring", "Manual temperature checks", "Verbal communication only"], correctAnswer: 1 },
      { id: "4-q10", question: "What is the Codex Alimentarius?", options: ["A national food law", "International food standards providing HACCP framework", "A company policy", "A testing method"], correctAnswer: 1 }
    ]
  }
];
