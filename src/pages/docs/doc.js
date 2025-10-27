const documentationData = [
  {
    question: "What is this platform about?",
    answer:
      "Hey 👋 We're all about understanding and improving your business processes through data. We visualize how your processes really run, highlight bottlenecks, and help you make data-driven improvements.",
    category: "General",
  },
  {
    question: "How is this platform about?",
    answer:
      "Hey 👋 We're all about understanding and improving your business processes through data. We visualize how your processes really run, highlight bottlenecks, and help you make data-driven improvements.",
    category: "General",
  },
  {
    question: "Who is this software for?",
    answer:
      "Our platform is designed for small and medium enterprises (SMEs) that want clear visibility into their operations and KPIs—without needing a big data science team.",
    category: "General",
  },
  {
    question: "Who is this software for?",
    answer:
      "Our platform is designed for small and medium enterprises (SMEs) that want clear visibility into their operations and KPIs—without needing a big data science team.",
    category: "General",
  },
  {
    question: "Why should companies use process visualization?",
    answer:
      "Because it reveals how work actually happens versus how it’s supposed to happen. It’s the easiest way to spot inefficiencies, rework, and lost time.",
    category: "General",
  },
  {
    question: "How come should companies use process visualization?",
    answer:
      "Because it reveals how work actually happens versus how it’s supposed to happen. It’s the easiest way to spot inefficiencies, rework, and lost time.",
    category: "General",
  },
  {
    question: "What makes your software unique?",
    answer:
      "We focus on usability, clarity, and accuracy. Our software shows loops, rework, and real-time process flows while being affordable for SMEs.",
    category: "General",
  },
  {
    question: "How makes your software unique?",
    answer:
      "We focus on usability, clarity, and accuracy. Our software shows loops, rework, and real-time process flows while being affordable for SMEs.",
    category: "General",
  },
  {
    question: "Can I try the software for free?",
    answer:
      "Yes! You can start with a demo workspace and upload sample CSV data to explore how your processes are visualized.",
    category: "General",
  },
  {
    question: "Is it possible to I try the software for free?",
    answer:
      "Yes! You can start with a demo workspace and upload sample CSV data to explore how your processes are visualized.",
    category: "General",
  },
  {
    question: "Do I need technical skills to use it?",
    answer:
      "Not at all. We designed the platform so that business users can explore data intuitively, while still offering depth for technical users.",
    category: "General",
  },
  {
    question: "Does it work for any industry?",
    answer:
      "Yes! Manufacturing, logistics, finance, services—you name it. If your process can be logged, we can visualize it.",
    category: "General",
  },
  {
    question: "What is process mining?",
    answer:
      "Process mining is a method that reconstructs and visualizes how your workflows actually happen based on real data from your systems.",
    category: "Process",
  },
  {
    question: "What is the difference between as-is and to-be processes?",
    answer:
      "‘As-is’ shows how your process actually runs. ‘To-be’ is your ideal or target version. Our platform lets you compare both side by side.",
    category: "Process",
  },
  {
    question: "How is the difference between as-is and to-be processes?",
    answer:
      "‘As-is’ shows how your process actually runs. ‘To-be’ is your ideal or target version. Our platform lets you compare both side by side.",
    category: "Process",
  },
  {
    question: "Can I simulate processes?",
    answer:
      "Yes, you can create simulations to see how changes—like removing a step or reducing wait time—might improve your KPIs.",
    category: "Process",
  },
  {
    question: "Is it possible to I simulate processes?",
    answer:
      "Yes, you can create simulations to see how changes—like removing a step or reducing wait time—might improve your KPIs.",
    category: "Process",
  },
  {
    question: "What are loops?",
    answer:
      "Loops are repetitions in a process—like when an item is sent back for rework. They often signal inefficiencies or quality issues.",
    category: "Process",
  },
  {
    question: "Can your software detect rework?",
    answer:
      "Absolutely. We highlight repeated or reversed steps and measure how often they happen and how much time they add.",
    category: "Process",
  },
  {
    question: "Is it possible to your software detect rework?",
    answer:
      "Absolutely. We highlight repeated or reversed steps and measure how often they happen and how much time they add.",
    category: "Process",
  },
  {
    question: "What are dropouts?",
    answer:
      "Dropouts happen when a case stops before completion. Our system tracks them so you can understand where and why they occur.",
    category: "Process",
  },
  {
    question: "Can I compare two process versions?",
    answer:
      "Yes! You can load two CSVs—say, from two plants or months—and compare flows, KPIs, and performance side by side.",
    category: "Process",
  },
  {
    question: "Is it possible to I compare two process versions?",
    answer:
      "Yes! You can load two CSVs—say, from two plants or months—and compare flows, KPIs, and performance side by side.",
    category: "Process",
  },
  {
    question: "What are KPIs?",
    answer:
      "KPIs, or Key Performance Indicators, are measurable values that show how effectively a process is performing.",
    category: "KPI",
  },
  {
    question: "How are KPIs?",
    answer:
      "KPIs, or Key Performance Indicators, are measurable values that show how effectively a process is performing.",
    category: "KPI",
  },
  {
    question: "Which KPIs do you track?",
    answer:
      "We currently track 27 KPIs, including cycle time, throughput, wait time, first pass yield, backlog, and on-time rate.",
    category: "KPI",
  },
  {
    question: "Which KPIs do you track?",
    answer:
      "We currently track 27 KPIs, including cycle time, throughput, wait time, first pass yield, backlog, and on-time rate.",
    category: "KPI",
  },
  {
    question: "How are KPIs calculated?",
    answer:
      "KPIs are computed directly from your event log timestamps and attributes, ensuring accuracy and transparency.",
    category: "KPI",
  },
  {
    question: "How are KPIs calculated?",
    answer:
      "KPIs are computed directly from your event log timestamps and attributes, ensuring accuracy and transparency.",
    category: "KPI",
  },
  {
    question: "Can I customize KPIs?",
    answer:
      "Yes, you can add calculated fields or filter KPIs by team, site, or time period to create your own performance views.",
    category: "KPI",
  },
  {
    question: "Is it possible to I customize KPIs?",
    answer:
      "Yes, you can add calculated fields or filter KPIs by team, site, or time period to create your own performance views.",
    category: "KPI",
  },
  {
    question: "Can KPIs be benchmarked?",
    answer:
      "Definitely! You can benchmark performance between teams, sites, or time periods for fair comparisons.",
    category: "KPI",
  },
  {
    question: "Is it possible to KPIs be benchmarked?",
    answer:
      "Definitely! You can benchmark performance between teams, sites, or time periods for fair comparisons.",
    category: "KPI",
  },
  {
    question: "Why are my KPIs different from last week?",
    answer:
      "Great question! Differences may come from loops, rework, resource shortages, or seasonality. You can drill down to find out.",
    category: "KPI",
  },
  {
    question: "What does process simulation do?",
    answer:
      "It lets you test how your process might behave if you change parameters—like reducing waiting time or improving quality checks.",
    category: "Simulation",
  },
  {
    question: "Can the AI run simulations automatically?",
    answer:
      "Not yet. The AI helps you set up simulation scenarios; the system then calculates outcomes.",
    category: "Simulation",
  },
  {
    question: "Is it possible to the AI run simulations automatically?",
    answer:
      "Not yet. The AI helps you set up simulation scenarios; the system then calculates outcomes.",
    category: "Simulation",
  },
  {
    question: "What is a scenario?",
    answer:
      "A scenario is a 'what if' setup—like 'What if we add another approval step?'—so you can see the effect before implementing changes.",
    category: "Simulation",
  },
  {
    question: "How accurate are simulations?",
    answer:
      "They’re based on your historical data and probabilities, giving realistic insights for decision-making.",
    category: "Simulation",
  },
  {
    question: "How accurate are simulations?",
    answer:
      "They’re based on your historical data and probabilities, giving realistic insights for decision-making.",
    category: "Simulation",
  },
  {
    question: "Can I save simulation results?",
    answer: "Yes, you can save and compare simulation outputs over time.",
    category: "Simulation",
  },
  {
    question: "What data do I need?",
    answer:
      "You’ll need an event log—basically a CSV file with case_id, activity, timestamp_start, and timestamp_end columns.",
    category: "Data",
  },
  {
    question: "What is a case ID?",
    answer:
      "It’s a unique identifier for each process instance—like an order number or production batch.",
    category: "Data",
  },
  {
    question: "Why do I need two timestamps?",
    answer:
      "Using start and end timestamps gives more precise duration and overlap insights.",
    category: "Data",
  },
  {
    question: "How come do I need two timestamps?",
    answer:
      "Using start and end timestamps gives more precise duration and overlap insights.",
    category: "Data",
  },
  {
    question: "How do I upload data?",
    answer:
      "Simply drag and drop your CSV file into the uploader. The platform will check format and preview it before importing.",
    category: "Data",
  },
  {
    question: "How do I upload data?",
    answer:
      "Simply drag and drop your CSV file into the uploader. The platform will check format and preview it before importing.",
    category: "Data",
  },
  {
    question: "What happens after upload?",
    answer:
      "We automatically generate the as-is process map and calculate KPIs right away.",
    category: "Data",
  },
  {
    question: "How happens after upload?",
    answer:
      "We automatically generate the as-is process map and calculate KPIs right away.",
    category: "Data",
  },
  {
    question: "Can I store multiple datasets?",
    answer:
      "Yes. You can keep older CSVs to compare processes across time or sites.",
    category: "Data",
  },
  {
    question: "Is it possible to I store multiple datasets?",
    answer:
      "Yes. You can keep older CSVs to compare processes across time or sites.",
    category: "Data",
  },
  {
    question: "Do you validate my data?",
    answer:
      "Yes. We check timestamps, duplicate events, and missing case IDs to ensure accuracy.",
    category: "Data",
  },
  {
    question: "Does you validate my data?",
    answer:
      "Yes. We check timestamps, duplicate events, and missing case IDs to ensure accuracy.",
    category: "Data",
  },
  {
    question: "What if my CSV doesn’t load?",
    answer:
      "Make sure it’s UTF-8 encoded, with commas or semicolons as separators, and includes the required columns.",
    category: "Data",
  },
  {
    question: "Can I use APIs?",
    answer:
      "Yes. We provide REST endpoints for importing data and exporting process results.",
    category: "Technical",
  },
  {
    question: "Is it possible to I use APIs?",
    answer:
      "Yes. We provide REST endpoints for importing data and exporting process results.",
    category: "Technical",
  },
  {
    question: "Do you integrate with ERP systems?",
    answer:
      "We support data from systems like SAP, Microsoft Dynamics, and Oracle via CSV exports or APIs.",
    category: "Technical",
  },
  {
    question: "Does you integrate with ERP systems?",
    answer:
      "We support data from systems like SAP, Microsoft Dynamics, and Oracle via CSV exports or APIs.",
    category: "Technical",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. All data is encrypted in transit and at rest with strict access controls.",
    category: "Technical",
  },
  {
    question: "Do you comply with GDPR?",
    answer:
      "Yes, we follow GDPR guidelines and offer on-premise options if you prefer full control.",
    category: "Technical",
  },
  {
    question: "Does you comply with GDPR?",
    answer:
      "Yes, we follow GDPR guidelines and offer on-premise options if you prefer full control.",
    category: "Technical",
  },
  {
    question: "Can I deploy it on-prem?",
    answer:
      "Yes, on-premise and private cloud options are available for enterprises with strict IT policies.",
    category: "Technical",
  },
  {
    question: "Is it possible to I deploy it on-prem?",
    answer:
      "Yes, on-premise and private cloud options are available for enterprises with strict IT policies.",
    category: "Technical",
  },
  {
    question: "How scalable is it?",
    answer:
      "You can start small and scale up. The system supports millions of events depending on your setup.",
    category: "Technical",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer flexible pricing depending on users and data size. SMEs can start with affordable monthly plans.",
    category: "Pricing",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes, there’s a free demo plan to explore the features before committing.",
    category: "Pricing",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes, there’s a free demo plan to explore the features before committing.",
    category: "Pricing",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "You can upgrade directly in the dashboard or contact support for help.",
    category: "Pricing",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "You can upgrade directly in the dashboard or contact support for help.",
    category: "Pricing",
  },
  {
    question: "Do you offer discounts for startups or education?",
    answer:
      "Yes, we have special programs for startups, non-profits, and educational use.",
    category: "Pricing",
  },
  {
    question: "Does you offer discounts for startups or education?",
    answer:
      "Yes, we have special programs for startups, non-profits, and educational use.",
    category: "Pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, and bank transfers for enterprise accounts.",
    category: "Pricing",
  },
  {
    question: "Who are you?",
    answer:
      "We’re a team passionate about making process insights accessible to every business, especially SMEs.",
    category: "Company",
  },
  {
    question: "Why focus on SMEs?",
    answer:
      "Because SMEs often lack tools that are simple, affordable, and insightful. We’re bridging that gap.",
    category: "Company",
  },
  {
    question: "How come focus on SMEs?",
    answer:
      "Because SMEs often lack tools that are simple, affordable, and insightful. We’re bridging that gap.",
    category: "Company",
  },
  {
    question: "What value does your platform add?",
    answer:
      "It saves time, reduces rework, and helps teams make better decisions based on data, not guesswork.",
    category: "Company",
  },
  {
    question: "How fast can I see results?",
    answer:
      "Most users visualize their first process within minutes of uploading a CSV.",
    category: "Company",
  },
  {
    question: "How fast can I see results?",
    answer:
      "Most users visualize their first process within minutes of uploading a CSV.",
    category: "Company",
  },
  {
    question: "What’s your vision?",
    answer:
      "To make operational intelligence easy and available to every organization in the world.",
    category: "Company",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us via in-app chat or email. Our team is quick and friendly!",
    category: "Support",
  },
  {
    question: "Is onboarding available?",
    answer: "Yes, we offer guided onboarding and video tutorials.",
    category: "Support",
  },
  {
    question: "Do you have documentation?",
    answer:
      "Yes, full documentation is available online, including FAQs, guides, and CSV examples.",
    category: "Support",
  },
  {
    question: "Does you have documentation?",
    answer:
      "Yes, full documentation is available online, including FAQs, guides, and CSV examples.",
    category: "Support",
  },
  {
    question: "Where can I send feedback?",
    answer: "We love feedback! Send it via the app or email us anytime.",
    category: "Support",
  },
  {
    question: "How do I report a bug?",
    answer:
      "Use the 'Report Issue' button in the app. We’ll fix it as quickly as possible.",
    category: "Support",
  },
  {
    question: "What is a loop in process mining?",
    answer:
      "A loop is when a process repeats certain steps, like a rework or backtrack. It helps you identify inefficiencies.",
    category: "Glossary",
  },
  {
    question: "What is a variant?",
    answer:
      "A variant is a unique sequence of activities within a process. We can show the most common variants and their performance.",
    category: "Glossary",
  },
  {
    question: "What is throughput time?",
    answer:
      "It’s the total time from the first to the last event of a case—covering all waiting and working time.",
    category: "Glossary",
  },
  {
    question: "What is touch time?",
    answer:
      "Touch time is the active working time when a case is being processed, excluding waiting or idle periods.",
    category: "Glossary",
  },
  {
    question: "What is conformance checking?",
    answer:
      "It’s comparing your as-is process with a target to-be process to find deviations or missing steps.",
    category: "Glossary",
  },
];

export default documentationData;
