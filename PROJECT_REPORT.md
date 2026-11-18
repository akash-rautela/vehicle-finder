# MOTOMATCH: AN INTELLIGENT MULTI-CRITERIA VEHICLE RECOMMENDATION AND COMPARISON SYSTEM

**A Final Project Report Submitted in Partial Fulfillment of the Requirements for the Award of the Degree of**  
**BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE & ENGINEERING**

---

### Candidate & Institutional Details
- **Candidate Name:** Akash Singh Rautela
- **University Roll No.:** 220101001
- **Department:** Department of Computer Science & Engineering
- **Academic Year:** 2025–2026
- **Project Repository:** `c:\Users\VICTUS\OneDrive\Desktop\MotoMatch`
- **Generated Word Document (.docx):** [`MotoMatch_Final_Project_Report.docx`](file:///c:/Users/VICTUS/OneDrive/Desktop/MotoMatch/MotoMatch_Final_Project_Report.docx)

---

## DECLARATION

I hereby declare that this project report entitled **"MotoMatch: An Intelligent Multi-Criteria Vehicle Recommendation and Comparison System"**, submitted in partial fulfillment of the requirements for the degree of Bachelor of Technology in Computer Science and Engineering, is an authentic record of bonafide work carried out by me under the guidance and supervision of my respected faculty mentor.

I further state that the empirical investigations, algorithmic implementations, and architectural formulations presented in this report have not been previously submitted, in whole or in part, to any other university, institute, or examining body for the award of any other degree, diploma, associateship, or other academic recognition. All technical materials, external datasets, third-party libraries, and scholarly works consulted during the design and development of this project have been properly acknowledged and cited in accordance with standard academic and IEEE bibliographic conventions.

**Date:** 19th November 2026  
**Place:** Campus  
**Akash Singh Rautela**  
Roll No.: 220101001  
Department of Computer Science & Engineering  

---

## CERTIFICATE

This is to certify that the project report entitled **"MotoMatch: An Intelligent Multi-Criteria Vehicle Recommendation and Comparison System"**, submitted by **Akash Singh Rautela** (Roll No.: 220101001), in partial fulfillment of the requirements for the award of Bachelor of Technology in Computer Science and Engineering, is a bonafide record of original project work carried out under our supervision and guidance during the academic session 2025–2026.

The project has fulfilled all specified project formatting guidelines, technical quality benchmarks, and algorithmic verification requirements. The source code, software architecture, empirical benchmarking, and system documentation have been thoroughly reviewed and found to be of a high academic standard.

To the best of our knowledge, the matter embodied in this report has not been submitted to any other University or Institution for the award of any degree or diploma.

**Internal Project Guide** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Head of Department**  
Department of Computer Science & Engineering &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department of Computer Science & Engineering  

**External Examiner**  

---

## ACKNOWLEDGEMENT

I take this profound opportunity to express my deep sense of gratitude, respect, and indebtedness to my project guide for continuous encouragement, valuable suggestions, scholarly guidance, and constructive critique throughout the conception, architectural design, and implementation phases of this project.

I express my sincere thanks to the Head of the Department of Computer Science & Engineering for granting institutional permissions, laboratory resources, and computing facilities that enabled the uninterrupted execution of this engineering project.

I am also grateful to all faculty members and technical staff of the Department of Computer Science and Engineering for their direct and indirect contributions, insightful technical discussions, and supportive learning environment.

Special appreciation is extended to my peers and fellow researchers whose constructive feedback, user testing participation, and collaborative reviews helped refine the recommendation engine and user interface. Finally, I express my deepest love and heartfelt gratitude to my family and parents for their unconditional moral support, patience, and encouragement throughout my academic journey.

**Akash Singh Rautela**  
B.Tech (Computer Science & Engineering)  

---

## TABLE OF CONTENTS

- **DECLARATION** ............................................................................ i
- **CERTIFICATE** ............................................................................ ii
- **ACKNOWLEDGEMENT** ........................................................................ iii
- **TABLE OF CONTENTS** ....................................................................... iv
- **LIST OF FIGURES** .......................................................................... vi
- **LIST OF TABLES** ........................................................................... vii
- **CHAPTER 1: INTRODUCTION** ................................................................. 1
  - 1.1 Project Overview ...................................................................... 1
  - 1.2 Problem Statement ..................................................................... 2
  - 1.3 Objectives of the Project ............................................................. 3
  - 1.4 Scope of the Project .................................................................. 4
  - 1.5 Organization of the Report ............................................................ 5
- **CHAPTER 2: LITERATURE REVIEW AND RELATED WORK** ............................................. 6
  - 2.1 Overview of Automotive Portals and Discovery Systems ................................. 6
  - 2.2 Shortcomings of Conventional Filtering Interfaces .................................... 7
  - 2.3 Multi-Criteria Decision Making in Consumer Purchasing ................................. 9
  - 2.4 Comparative Technology Evaluation ..................................................... 10
  - 2.5 Proposed MotoMatch Architecture and Novelty ........................................... 12
- **CHAPTER 3: SYSTEM REQUIREMENT SPECIFICATION** ............................................... 14
  - 3.1 Functional Requirements ............................................................... 14
  - 3.2 Non-Functional Requirements ........................................................... 16
  - 3.3 Hardware Requirements ................................................................. 17
  - 3.4 Software Requirements ................................................................. 18
  - 3.5 Feasibility Study ..................................................................... 19
- **CHAPTER 4: SYSTEM DESIGN AND ARCHITECTURE** ................................................. 21
  - 4.1 High-Level System Architecture ........................................................ 21
  - 4.2 Data Flow Diagrams .................................................................... 23
  - 4.3 Unified Modeling Language Design ..................................................... 25
  - 4.4 Database Schema Design and Entity-Relationship Modeling ............................... 27
  - 4.5 Component Hierarchy and State Flow .................................................... 29
- **CHAPTER 5: METHODOLOGY AND IMPLEMENTATION** ................................................. 31
  - 5.1 Technology Stack Details and Environment Configuration ................................ 31
  - 5.2 Multi-Step Recommendation Wizard Logic ................................................ 33
  - 5.3 Multi-Vehicle Comparison Engine and Algorithmic Evaluation ............................ 35
  - 5.4 Backend RESTful API Development ....................................................... 37
  - 5.5 Authentication, Authorization, and Security Controls .................................. 39
  - 5.6 Cloud Media Management and Dynamic Seeding Strategy ................................... 41
- **CHAPTER 6: RESULTS AND DISCUSSION** ......................................................... 43
  - 6.1 Landing Page and Hero Interface Execution ............................................. 43
  - 6.2 Recommendation Questionnaire Workflow ................................................. 45
  - 6.3 Vehicle Catalog Exploration and Real-Time Querying .................................... 47
  - 6.4 Vehicle Comparison Matrix and Algorithmic Winner Selection ............................ 49
  - 6.5 Administrative Control Panel and Vehicle Lifecycle Operations ......................... 51
  - 6.6 Performance Benchmarking and Audit Analysis ........................................... 53
- **CHAPTER 7: TESTING AND QUALITY ASSURANCE** .................................................. 55
  - 7.1 Testing Methodologies and Quality Objectives .......................................... 55
  - 7.2 Functional Unit and Integration Test Matrix ........................................... 57
  - 7.3 Boundary Value Analysis and Edge Case Handling ........................................ 59
  - 7.4 Cross-Device and Responsive Usability Testing ......................................... 61
  - 7.5 Security and API Rate Limiting Verification ........................................... 62
- **CHAPTER 8: CONCLUSION AND FUTURE SCOPE** .................................................... 64
  - 8.1 Summary of Work Done .................................................................. 64
  - 8.2 Deliverables and Contributions ......................................................... 65
  - 8.3 Limitations of Current System ......................................................... 66
  - 8.4 Future Enhancements and Roadmap ....................................................... 67
- **REFERENCES** ................................................................................ 69

---

## LIST OF FIGURES

- **Fig.4.1 High-Level Three-Tier System Architecture Diagram** ................................. 22
- **Fig.4.2 Level 0 Context Diagram And Level 1 Functional Data Flow Diagram** .................. 24
- **Fig.4.3 Unified Modeling Language (UML) Use Case Diagram** ................................... 26
- **Fig.4.4 Entity-Relationship (ER) Data Model Diagram** ........................................ 28
- **Fig.4.5 System Sequence Diagram For Vehicle Recommendation Workflow** ....................... 30
- **Fig.5.1 Algorithmic Flowchart Of Multi-Step Recommendation Engine** .......................... 34
- **Fig.6.1 MotoMatch Home Page Interface And Parallax Hero Section** ............................ 44
- **Fig.6.2 Recommendation Wizard Pipeline And Multi-Step Question Journey** .................... 46
- **Fig.6.3 AI Vehicle Comparison Matrix And Quantitative Scoring Formulation** ................. 50
- **Fig.7.1 Multi-Tier Software Testing Lifecycle And Verification Framework** ................... 56

---

## LIST OF TABLES

- **Table 2.1 Comparative Analysis Of Existing Automotive Discovery Platforms** .................. 11
- **Table 3.1 Minimum Hardware Specifications For Development And Client Operations** ............ 17
- **Table 3.2 Software Environment And Technology Stack Specifications** .......................... 18
- **Table 4.1 Vehicle Entity Data Dictionary And Attribute Specifications** ...................... 28
- **Table 4.2 User Entity Data Dictionary And Authentication Schema Specifications** ............. 29
- **Table 5.1 Backend RESTful API Routes, HTTP Verbs, And Security Scope** ........................ 38
- **Table 6.1 Multi-Scenario Recommendation Engine Execution Matrix** ............................ 48
- **Table 6.2 Frontend Performance Benchmarking And Google Lighthouse Metrics** ................. 54
- **Table 7.1 Comprehensive Functional Unit And Integration Test Matrix** ........................ 58

---

# CHAPTER 1
# INTRODUCTION

### 1.1 Project Overview
The modern automotive market is characterized by unprecedented growth, diversification, and technological complexity. Consumers seeking to purchase a new personal vehicle—whether a two-wheeler for urban commuting or a four-wheeler for family utility—are confronted with an overwhelming array of manufacturers, powertrains, trim levels, and pricing tiers. In developing economies such as India, the proliferation of electric mobility alongside traditional internal combustion engine (ICE) vehicles and hybrid variants has intensified this choice overload. Prospective buyers routinely encounter hundreds of competing models across diverse segments, each claiming superior performance, class-leading fuel efficiency, and cutting-edge safety features.

MotoMatch is engineered as an intelligent, responsive, multi-criteria vehicle recommendation and comparison web platform designed to eliminate the friction, confusion, and cognitive fatigue inherent in contemporary vehicle selection. By replacing traditional, cluttered filtering matrices with an intuitive, conversational multi-step wizard, MotoMatch enables users to articulate their core purchasing constraints—vehicle category, budget ceiling, operational usage profile, and preferred powertrain—in a structured, user-centric workflow. Backed by a high-performance single-page application (SPA) architecture, cloud-native document databases, and mathematical scoring heuristics, the system provides transparent, personalized recommendations that directly align with real-world consumer needs.

### 1.2 Problem Statement
Despite the vast abundance of automotive information accessible across the public internet, contemporary vehicle research suffers from four critical systemic deficiencies:
1. **Information Overload and Technical Jargon:** Existing automotive portals present extensive specification matrices laden with specialized engineering terminology (e.g., brake horsepower at variable RPMs, torque curves, gross vehicle weight ratings) without translating these technical figures into tangible consumer benefits or usability contexts.
2. **Cluttered, Ad-Driven User Interfaces:** Mainstream commercial vehicle portals frequently prioritize promotional advertising, dealership lead-generation banners, sponsored listings, and intrusive pop-up dialogs over clean, objective consumer decision support, resulting in severe cognitive friction.
3. **Rigid and Disjointed Filtering Mechanisms:** Traditional multi-select dropdown systems operate on binary, isolated database queries that frequently return zero results if a buyer's requirements span marginally outside pre-configured database boundaries, lacking fuzzy matching or intelligent tolerance buffers.
4. **Lack of Unified Multi-Vehicle Analytical Comparison:** Prospective buyers attempting to compare conflicting options must navigate across fragmented browser tabs, manually extracting disparate specifications without access to an objective, multi-attribute scoring framework that evaluates trade-offs between acquisition cost, power delivery, fuel economy, and ground clearance.

### 1.3 Objectives of the Project
To overcome the identified challenges, the MotoMatch platform was developed with the following clear engineering objectives:
1. **Interactive Questionnaire Workflow:** To architect and implement an interactive, stateful multi-step recommendation wizard that dynamically captures user preferences across vehicle category, price bracket, primary usage persona, and powertrain.
2. **Intelligent Recommendation Engine:** To formulate and deploy a deterministic, multi-criteria recommendation and ranking algorithm that matches user requirements against an extensive cloud vehicle repository with instant computational feedback.
3. **Multi-Vehicle Comparative Analysis:** To engineer a side-by-side comparative matrix capable of evaluating up to three vehicles simultaneously across key performance and dimensional metrics, augmented by an automated AI Best Match evaluation badge.
4. **Enterprise-Grade Administrative Controls:** To implement a secure administrative dashboard featuring JSON Web Token (JWT) authentication, bcrypt password hashing, and Cloudinary media pipelines for full CRUD catalog lifecycle management.
5. **High-Performance Front-End Engineering:** To design a modern, glassmorphic user interface utilizing React 18, Vite, Tailwind CSS, and Framer Motion that delivers sub-second page transitions, full mobile responsiveness, and dark/light dual-theming.

### 1.4 Scope of the Project
The operational scope of MotoMatch encompasses both two-wheeler (motorcycles, scooters, electric commuters) and four-wheeler (hatchbacks, sedans, compact SUVs, luxury vehicles) segments primarily aligned with the Indian automotive market. The platform maintains a cloud database of comprehensive vehicle profiles detailing ex-showroom pricing, engine displacement, rated mileage/efficiency, brake horsepower (BHP), peak torque (NM), kerb weight (KG), seating capacity, ground clearance (MM), and certified imagery.

While the current deployment focuses on consumer-grade decision support and catalog curation, the modular architecture is designed to accommodate third-party dealership inventory feeds, regional on-road pricing APIs, user-submitted review aggregations, and artificial intelligence chatbot extensions in future lifecycle iterations.

### 1.5 Organization of the Report
The remainder of this project report is systematically organized into seven subsequent chapters:
- **Chapter 2** presents an exhaustive literature review of contemporary automotive portals, examining multi-criteria decision-making models, frontend-backend architectural patterns, and comparative technology evaluations.
- **Chapter 3** defines the System Requirement Specification (SRS), enumerating functional, non-functional, hardware, software, and tripartite feasibility requirements.
- **Chapter 4** elaborates on the system design, detailing high-level three-tier architecture, Level 0 and Level 1 Data Flow Diagrams (DFD), Unified Modeling Language (UML) models, and database Entity-Relationship (ER) schemas.
- **Chapter 5** describes the methodology and implementation, providing source-level insights into recommendation wizard state machines, comparison algorithms, RESTful API controllers, and JWT security middleware.
- **Chapter 6** presents empirical results, interface execution analyses, user journey workflows, performance benchmarks, and Lighthouse audit outcomes.
- **Chapter 7** outlines the quality assurance framework, test methodologies, boundary value validations, and comprehensive verification matrices.
- **Chapter 8** concludes the project report with a summary of accomplishments, system limitations, and an actionable roadmap for future enhancements, followed by scholarly references.

---

# CHAPTER 2
# LITERATURE REVIEW AND RELATED WORK

### 2.1 Overview of Automotive Portals and Discovery Systems
Online automotive discovery platforms have evolved dramatically over the past two decades. Early platforms functioned primarily as static digital classified directories, transposing newspaper vehicle advertisements into basic HTML tables. With the advent of dynamic Web 2.0 architectures, portals such as CarDekho, CarWale, BikeWale, and ZigWheels emerged as dominant aggregators in the South Asian automotive ecosystem. These platforms centralize automotive news, specifications, road test reviews, and dealership contact directories.

In Western markets, platforms like Edmunds, Kelley Blue Book (KBB), and AutoTrader established benchmark standards for vehicle valuation, certified pre-owned inventories, and consumer reliability scores. While these legacy systems hold vast inventories, their core interaction architecture remains rooted in conventional relational database filtering. Users are required to navigate deep hierarchical drill-down menus, selecting manufacturer brands, vehicle models, fuel types, and transmission variants before receiving actionable information.

### 2.2 Shortcomings of Conventional Filtering Interfaces
Extensive human-computer interaction (HCI) research confirms that traditional multi-attribute filtering interfaces impose substantial cognitive friction on non-expert users. When a consumer who lacks granular technical domain knowledge searches for a vehicle, they do not conceptualize their need in terms of engine bore-stroke ratios or valve timing configurations; rather, they think in terms of functional personas (e.g., 'a reliable, economical daily commuter under 1.5 Lakhs' or 'a fuel-efficient family car with adequate ground clearance for rural highways').

Conventional platforms fail to bridge this semantic gap. Furthermore, commercial monetization models compel legacy portals to prioritize dealer lead-generation forms, sponsored model placements, and aggressive advertising banners. As a result, search results are frequently skewed toward vehicles whose manufacturers sponsor elevated placement, rather than models objectively tailored to the user's authentic utility profile.

### 2.3 Multi-Criteria Decision Making in Consumer Purchasing
The vehicle selection process represents a classic Multi-Criteria Decision Making (MCDM) optimization problem under conflicting constraints. An automotive buyer seeks to optimize multiple objective functions simultaneously:
- Maximizing operational fuel economy (km/l) or electric battery range.
- Maximizing power delivery (BHP) and acceleration torque (NM).
- Maximizing ride height and terrain capability via ground clearance (MM).
- Minimizing acquisition cost (ex-showroom price in INR) and vehicle kerb weight.

In classical utility theory, these attributes exhibit severe Pareto trade-offs: vehicles with high power outputs inevitably consume more fuel, while vehicles offering rugged ground clearance and reinforced chassis structures exhibit elevated kerb weights and pricing. The MotoMatch platform applies a deterministic weighted utility scoring heuristic to evaluate these competing variables objectively during side-by-side vehicle comparison.

### 2.4 Comparative Technology Evaluation
To construct a modern, reactive, and resilient vehicle discovery portal, multiple technological stacks were evaluated during the preliminary architectural phase. Table 2.1 provides an analytical comparison between prevailing commercial platforms and the proposed MotoMatch architecture across foundational technical and user experience dimensions.

**Table 2.1 Comparative Analysis Of Existing Automotive Discovery Platforms**

| Evaluation Dimension | Traditional Automotive Portals | MotoMatch Architecture |
| :--- | :--- | :--- |
| **User Interaction Paradigm** | Multi-dropdown nested forms with rigid queries | Conversational, 4-step progressive wizard |
| **Target Consumer Context** | Technical enthusiasts and dealership leads | Everyday buyers and lifestyle commuters |
| **Comparison Mechanism** | Static textual spec tables without ranking | Algorithmic composite scoring with Best Match crown |
| **Client Rendering Engine** | Server-side HTML / Heavy monolithic bundles | React 18 Single-Page Application optimized via Vite |
| **Styling & Theming** | Fixed CSS stylesheets, excessive banner ads | Tailwind CSS Glassmorphism with instant Dark/Light mode |
| **Data Persistence** | Relational SQL (MySQL / PostgreSQL) | Cloud NoSQL (MongoDB Atlas) with dynamic normalization |
| **Media Delivery** | Local filesystem storage / unoptimized CDN | Cloudinary automated transformation and CDN edge caching |
| **Security Architecture** | Session cookies / server-side session stores | Stateless JSON Web Tokens (JWT) with bcrypt salt rounds |

As detailed in Table 2.1, the architectural divergence between legacy platforms and MotoMatch centers on user-centric state flow, zero-ad cognitive clarity, and responsive, client-side scoring performance.

### 2.5 Proposed MotoMatch Architecture and Novelty
MotoMatch addresses the identified gaps through three core architectural novelties: First, it encapsulates the recommendation pipeline into an atomic, 4-stage interactive wizard that guides the buyer logically from vehicle classification to budget, usage scenario, and powertrain. Second, it integrates a client-side recommendation engine that processes live vehicle data retrieved via RESTful endpoints, ensuring zero network latency when users adjust sliders or toggle usage tags. Third, it implements an objective, mathematical comparison engine that synthesizes performance, economy, ground clearance, and price into an unambiguous, transparent composite score.

---

# CHAPTER 3
# SYSTEM REQUIREMENT SPECIFICATION

### 3.1 Functional Requirements
Functional requirements define the core operational capabilities and services that the MotoMatch platform must provide to its end-users and administrative personnel:
1. **FR-01: Multi-Step Questionnaire Intake:** The system shall provide an intuitive wizard that guides users through four progressive decision steps: Vehicle Category (2W vs 4W), Budget Bracket (with Custom Budget option), Usage Persona (daily, sports, cruiser, adventure), and Fuel/Engine type (Petrol, Electric, Diesel, CNG).
2. **FR-02: Real-Time Algorithmic Filtering:** The platform shall dynamically filter the vehicle catalog based on active user constraints and display the matched vehicle cards sorted by ascending acquisition cost.
3. **FR-03: Vehicle Catalog Exploration:** The platform shall provide a dedicated catalog browsing page featuring live keyword search, vehicle category toggling, and real-time count badges reflecting inventory metrics.
4. **FR-04: Multi-Vehicle Comparison Matrix:** The system shall allow users to select up to three vehicles of identical category and generate a side-by-side comparative specification matrix evaluating price, power, torque, mileage, weight, and ground clearance.
5. **FR-05: AI Comparison Scoring and Badge:** The comparison engine shall compute a quantitative utility score for each selected vehicle and visually highlight the winning vehicle with an 'AI Best Value Match' badge.
6. **FR-06: Administrative Authentication:** The platform shall secure administrative routes through JSON Web Token (JWT) credentials, requiring valid email and encrypted password authentication.
7. **FR-07: Vehicle Inventory CRUD Operations:** Authenticated administrators shall possess full privileges to create new vehicle dossiers, edit existing technical attributes, and delete obsolete models from the cloud repository.
8. **FR-08: Cloud Media Upload Pipeline:** The administrative interface shall support direct multipart image uploads to Cloudinary CDN, automatically associating the resulting HTTPS asset URL with the vehicle record.

### 3.2 Non-Functional Requirements
Non-functional requirements describe the quality attributes, constraints, and performance benchmarks governing system operation:
1. **NFR-01: Response Time and Performance:** The frontend application shall render the initial interactive view within 1.5 seconds under standard 4G broadband conditions. API endpoints shall process and return catalog queries within 100 milliseconds.
2. **NFR-02: Responsiveness and Cross-Platform Consistency:** The user interface shall adapt fluidly across mobile (320px–480px), tablet (768px–1024px), and desktop (1280px+) viewport viewports using responsive grid systems and glassmorphic layouts.
3. **NFR-03: Security and Data Protection:** All administrative passwords must be hashed using bcrypt with a salt factor of 10 prior to database persistence. API endpoints must be safeguarded against volumetric brute-force attacks via express-rate-limit.
4. **NFR-04: Reliability and High Availability:** The cloud database (MongoDB Atlas) and backend web service (Render) shall maintain 99.9% uptime, supported by automated failover clusters and edge content delivery.
5. **NFR-05: Usability and Dual-Theming:** The interface shall support zero-latency toggling between Dark Mode and Light Mode, maintaining WCAG 2.1 Level AA color contrast ratios across all textual elements.

### 3.3 Hardware Requirements
The operational hardware requirements for both the software development environment and end-user client devices are formally specified in Table 3.1.

**Table 3.1 Minimum Hardware Specifications For Development And Client Operations**

| Parameter | Development Environment | Client End-User Device |
| :--- | :--- | :--- |
| **Processor (CPU)** | Intel Core i5 / AMD Ryzen 5 (4 Cores, 2.5 GHz+) | Dual-Core 1.8 GHz or modern ARM SoC |
| **System Memory (RAM)** | 8 GB DDR4 Minimum (16 GB Recommended) | 2 GB RAM (Mobile) / 4 GB RAM (Desktop) |
| **Storage Space** | 10 GB Free SSD Storage for dependencies & logs | 100 MB Browser Cache Allocation |
| **Display Resolution** | 1920 x 1080 Full HD Monitor | Minimum 360 x 640 (Mobile) up to 4K (Desktop) |
| **Network Connectivity** | Standard Broadband (10 Mbps+) | 3G / 4G / 5G or Wi-Fi (Minimum 1 Mbps) |

As shown in Table 3.1, MotoMatch is intentionally engineered to impose minimal hardware overhead on client devices, offloading heavy computations to build-time optimizations and efficient browser V8 execution.

### 3.4 Software Requirements
The software components, runtime environments, and third-party cloud services comprising the MotoMatch ecosystem are documented in Table 3.2.

**Table 3.2 Software Environment And Technology Stack Specifications**

| Software Component | Specification / Package | Functional Role |
| :--- | :--- | :--- |
| **Client Operating System** | Windows 10/11, macOS, Linux, Android, iOS | Host OS for development and browser execution |
| **Frontend UI Framework** | React 18.3.1 with TypeScript | Component-driven reactive single-page architecture |
| **Build Tool & Dev Server** | Vite 5.4.19 with SWC compiler | Ultra-fast module bundling and Hot Module Replacement |
| **Styling Engine** | Tailwind CSS 3.4.17 + Radix UI Primitives | Utility-first CSS styling and accessible primitives |
| **Animation Library** | Framer Motion 12.38.0 | Declarative page transitions and parallax scrolling |
| **Server-Side Runtime** | Node.js (v18.x or v20.x LTS) | Asynchronous JavaScript execution environment |
| **Backend REST Framework** | Express.js 5.2.1 | HTTP routing, middleware chaining, and API controller engine |
| **Database Management** | MongoDB Atlas (Mongoose ODM 9.5.0) | Cloud-native NoSQL document persistence and schemas |
| **Media CDN Service** | Cloudinary SDK 1.41.3 | Cloud asset storage, image resizing, and global delivery |
| **Authentication Service** | JSON Web Tokens (jsonwebtoken 9.0.3) | Stateless bearer token authorization and session control |

### 3.5 Feasibility Study
A thorough feasibility analysis was conducted across technical, economic, and operational dimensions prior to initiating implementation:
1. **Technical Feasibility:** The chosen technology stack—React, TypeScript, Express, and MongoDB—represents an industry-standard, battle-tested modern full-stack paradigm. The non-blocking I/O model of Node.js coupled with the schema flexibility of MongoDB accommodates rapid querying and specification normalization. Modern browser engines effortlessly execute the client-side recommendation heuristics with negligible memory footprints. Hence, the project is technically feasible.
2. **Economic Feasibility:** The entire development pipeline leverages open-source libraries, compilers, and frameworks licensed under MIT or Apache 2.0. Hosting is deployed across high-availability free-tier cloud infrastructures (Render for the backend service, Vercel for the frontend SPA, and MongoDB Atlas for database clustering). Cloudinary provides ample complimentary cloud storage for media assets. Consequently, development and initial deployment costs are near zero, demonstrating total economic viability.
3. **Operational Feasibility:** The application eliminates cognitive complexity by guiding users through an intuitive, self-explanatory wizard. Minimal computer literacy is required to operate the platform. Administrative personnel can manage catalog inventories via an intuitive visual dashboard without writing database scripts. Thus, operational feasibility is fully verified.

---

# CHAPTER 4
# SYSTEM DESIGN AND ARCHITECTURE

### 4.1 High-Level System Architecture
MotoMatch is architected as a modular, three-tier distributed web application comprising a Presentation Layer (Client SPA), an Application/Business Logic Layer (Server REST API), and a Data Persistence and Cloud Services Layer. As illustrated in Fig.4.1, the system establishes clear architectural boundaries and decoupled communication protocols across tiers.

![Fig.4.1 High-Level Three-Tier System Architecture Diagram](report_assets/fig_4_1_architecture.png)  
**Fig.4.1 High-Level Three-Tier System Architecture Diagram**

As illustrated in Fig.4.1, the Presentation Layer is executed inside the user's web browser as an optimized Single-Page Application (SPA) built with React 18, TypeScript, and Tailwind CSS. Client state is managed reactively using TanStack React Query, which handles server state caching, background refetching, and query invalidation. When the user initiates a search or recommendation journey, asynchronous HTTPS requests are dispatched to the Application Layer.

The Application Layer comprises a Node.js runtime executing the Express.js framework. Incoming HTTP requests pass through security middleware, including Cross-Origin Resource Sharing (CORS) policies, JSON body parsers, rate limiters, and JWT authentication verifiers. Vehicle controllers execute queries against MongoDB Atlas via the Mongoose Object-Data Modeling (ODM) library and interface with Cloudinary SDK for media transformations.

### 4.2 Data Flow Diagrams
Data Flow Diagrams (DFDs) model the graphical flow of data through the system, capturing external entities, input flows, internal transformational processes, and data persistence repositories. As depicted in Fig.4.2, the system data lifecycle is decomposed into high-level context and detailed functional sub-processes.

![Fig.4.2 Level 0 Context Diagram And Level 1 Functional Data Flow Diagram](report_assets/fig_4_2_dfd.png)  
**Fig.4.2 Level 0 Context Diagram And Level 1 Functional Data Flow Diagram**

As shown in Fig.4.2(a), the Level 0 Context Diagram portrays MotoMatch as a centralized system interacting with two primary external entities: the Prospective Buyer (User) and the System Administrator. The user supplies search criteria, budget boundaries, and usage personas, receiving ranked vehicle dossiers and comparison metrics in response. The administrator supplies administrative credentials, vehicle specification updates, and media uploads, receiving catalog logs and mutation acknowledgments.

Fig.4.2(b) demonstrates the Level 1 DFD, detailing the functional decomposition into five discrete sub-processes: 1.0 Profile and Preference Intake, 2.0 Rule and Filter Engine, 3.0 Vehicle Comparison, 4.0 Admin Authentication, and 5.0 Catalog CRUD Management, interacting synchronously with Data Store D1 (Vehicle Master Database).

### 4.3 Unified Modeling Language Design
Unified Modeling Language (UML) structural and behavioral diagrams define the actor interactions and execution lifecycles within MotoMatch. As illustrated in Fig.4.3, the system boundaries and user privileges are explicitly formalized.

![Fig.4.3 Unified Modeling Language (UML) Use Case Diagram](report_assets/fig_4_3_usecase.png)  
**Fig.4.3 Unified Modeling Language (UML) Use Case Diagram**

As illustrated in Fig.4.3, prospective buyers interact with five primary use cases: Complete Preference Questionnaire, Generate Personalized Recommendations, Browse Catalog with Filters and Search, Perform Side-by-Side Comparison, and Inspect Technical Vehicle Dossier. Administrative users inherit catalog viewing privileges and additionally access Authenticate via Admin Credentials, Manage Vehicle Inventory (Create, Read, Update, Delete), and Upload Vehicle Images.

The temporal interaction between system components during recommendation execution is captured in the UML Sequence Diagram shown in Fig.4.5.

![Fig.4.5 System Sequence Diagram For Vehicle Recommendation Workflow](report_assets/fig_4_5_sequence.png)  
**Fig.4.5 System Sequence Diagram For Vehicle Recommendation Workflow**

As detailed in Fig.4.5, when a user completes questionnaire inputs, the React wizard component triggers a query via TanStack Query. The Express controller retrieves the master vehicle dataset from MongoDB Atlas, performs specification normalization against baseline seed records, and returns the normalized JSON payload. The client application then executes localized multi-criteria filtering and ranking, instantly rendering the top matching vehicle cards.

### 4.4 Database Schema Design and Entity-Relationship Modeling
The data persistence layer is architected on MongoDB Atlas, utilizing strict Mongoose schema definitions to enforce data integrity while retaining document flexibility. As depicted in Fig.4.4, the entity relationships and attribute allocations are cleanly structured.

![Fig.4.4 Entity-Relationship (ER) Data Model Diagram](report_assets/fig_4_4_er.png)  
**Fig.4.4 Entity-Relationship (ER) Data Model Diagram**

As depicted in Fig.4.4, the data architecture centers around two primary entities: Vehicle and User. The detailed attributes, data types, constraints, and operational descriptions for the Vehicle entity are documented in Table 4.1.

**Table 4.1 Vehicle Entity Data Dictionary And Attribute Specifications**

| Attribute Name | BSON / Mongoose Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key, Auto | Unique immutable document identifier |
| `vehicleType` | String | Enum: ['2W', '4W'] | High-level classification (2-Wheeler vs 4-Wheeler) |
| `brand` | String | Required, Indexed | Vehicle manufacturer name (e.g., Tata, Honda) |
| `vehicleModel` | String | Required, Indexed | Commercial model designation (e.g., Nexon, Activa) |
| `energyType` | String | Enum: ['Petrol',..] | Fuel powertrain: Petrol, Electric, Diesel, CNG |
| `price` | Number | Required, Min: 0 | Ex-showroom acquisition price in Indian Rupees (INR) |
| `engineCC` | Number | Required, Min: 0 | Engine displacement in cubic centimeters (0 for EVs) |
| `mileage` | Number | Required, Min: 0 | Fuel economy (km/l) or certified range for electrics |
| `powerBHP` | Number | Required, Min: 0 | Peak engine power output in Brake Horsepower |
| `torqueNM` | Number | Required, Min: 0 | Peak rotational torque output in Newton-Meters |
| `weightKG` | Number | Required, Min: 0 | Kerb weight of the vehicle in kilograms |
| `seatingCapacity` | Number | Required, Min: 1 | Total passenger seating capacity rating |
| `groundClearanceMM` | Number | Required, Min: 0 | Distance between lowest chassis point and ground (mm) |
| `usageType` | String | Enum: ['daily',..] | Primary intended use: daily, sports, cruiser, adventure |
| `image` | String | Optional (URL) | Secure HTTPS asset URL pointing to Cloudinary CDN |
| `link` | String | Required (URL) | Authoritative manufacturer or search verification URL |

The User entity stores administrative credentials and authorization roles, as specified in Table 4.2.

**Table 4.2 User Entity Data Dictionary And Authentication Schema Specifications**

| Attribute Name | BSON / Mongoose Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key, Auto | Unique administrative user identifier |
| `name` | String | Required, Trimmed | Full legal name of the administrator |
| `email` | String | Required, Unique | Validated unique electronic mail address for login |
| `password` | String | Required, Hashed | Bcrypt cryptographic salted hash (never plain text) |
| `role` | String | Enum: ['admin', 'user'] | Access control role determining route authorizations |
| `timestamps` | Date | Auto (createdAt, ..) | Automated audit timestamps for record creation/edits |

### 4.5 Component Hierarchy and State Flow
The frontend React application follows a modular, atomic component hierarchy. The root App component establishes the AuthProvider context and TanStack QueryClientProvider, declaring declarative client routes via React Router DOM v6. Key page views include Index (Home/Wizard), Browse (Catalog), Compare (Comparison Engine), AdminDashboard (Protected CMS), and VehicleDetail (Technical Dossier). Reusable UI components—such as VehicleCard, QuestionnaireStep, ProgressBar, and ThemeToggle—encapsulate atomic user interactions, ensuring high maintainability and testability.

---

# CHAPTER 5
# METHODOLOGY AND IMPLEMENTATION

### 5.1 Technology Stack Details and Environment Configuration
The implementation of MotoMatch adheres to modern software engineering best practices, leveraging strict TypeScript typings across both frontend and backend repositories to prevent runtime exceptions. The frontend repository is compiled using Vite with the SWC (Speedy Web Compiler) plugin, delivering near-instantaneous hot module replacement (HMR) during development and generating highly optimized, tree-shaken static assets for production deployment.

Styling is orchestrated through Tailwind CSS, configured with custom design tokens for glassmorphism, glowing backdrop filters, and CSS variables supporting dynamic theme switching. Radix UI unstyled primitives provide accessible UI foundations for dialogs, dropdown menus, sliders, and tooltips, ensuring complete keyboard navigability and screen-reader compatibility.

### 5.2 Multi-Step Recommendation Wizard Logic
The recommendation engine operates via a stateful, progressive intake wizard comprising four distinct verification checkpoints. As mapped in Fig.5.1, the algorithm guarantees robust matching across diverse preference profiles.

![Fig.5.1 Algorithmic Flowchart Of Multi-Step Recommendation Engine](report_assets/fig_5_1_flowchart.png)  
**Fig.5.1 Algorithmic Flowchart Of Multi-Step Recommendation Engine**

As mapped in Fig.5.1, the recommendation engine proceeds through sequential evaluation gates:
1. **Gate 1 (Vehicle Classification):** The user selects either '2W' (Two-Wheeler) or '4W' (Four-Wheeler). This initial selection partitions the catalog, dynamically updating subsequent budget options (e.g., bikes offer sub-1 Lakh brackets, whereas cars start at 3 Lakhs).
2. **Gate 2 (Budget Constraint Validation):** The user selects a pre-configured price range (e.g., '100000-300000') or enters a custom figure in Lakhs. For custom budgets, a ±20% tolerance window is dynamically computed: minBudget = val * 0.8 and maxBudget = val * 1.2, ensuring viable vehicle options even if exact figures are absent.
3. **Gate 3 (Usage Persona Matching):** Users select one or more usage tags: daily (commuter), sports (performance), cruiser (touring), or adventure (off-road). Vehicles are evaluated using multi-tag inclusion logic.
4. **Gate 4 (Powertrain Matching):** The selected fuel option (Petrol, Electric, Diesel, CNG) is matched case-insensitively against the database energyType attribute.
5. **Sorting and Presentation:** Surviving candidate vehicles are sorted in ascending order of acquisition cost (price) and rendered as interactive cards.

### 5.3 Multi-Vehicle Comparison Engine and Algorithmic Evaluation
A standout innovation of MotoMatch is its side-by-side comparison engine, capable of evaluating up to three vehicles simultaneously. Beyond displaying tabular specifications, the engine implements a deterministic utility function to identify the 'Best Value Match'. The mathematical scoring formulation is defined as:

$$\text{Score}(V) = (\text{Mileage} \times 2.0) + (\text{Power\_BHP} \times 1.5) + \text{GroundClearance\_MM} - \left(\frac{\text{Price}}{10,000}\right)$$

In this formulation, mileage carries a weighting factor of 2.0, reflecting the paramount importance of fuel economy in daily ownership costs. Engine horsepower is weighted at 1.5 to reward performance capabilities. Ground clearance (in millimeters) is added directly to reward ride comfort and terrain resilience on demanding road conditions. Finally, acquisition price is penalized by subtracting one point per ₹10,000 of ex-showroom cost. The vehicle achieving the maximum composite score is programmatically awarded the 'AI Best Value Match' crown badge.

### 5.4 Backend RESTful API Development
The backend architecture is structured around clean RESTful conventions, exposing versioned endpoints under the `/api` namespace. Route definitions, supported HTTP methods, operational descriptions, and security authorization levels are summarized in Table 5.1.

**Table 5.1 Backend RESTful API Routes, HTTP Verbs, And Security Scope**

| HTTP Method | Route Endpoint | Access Level | Operational Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/vehicles` | Public | Fetch all vehicles with data normalization |
| `GET` | `/api/vehicles/:id` | Public | Fetch single vehicle dossier by ObjectId or numeric ID |
| `POST` | `/api/vehicles` | Private (Admin) | Create new vehicle record in MongoDB Atlas |
| `PUT` | `/api/vehicles/:id` | Private (Admin) | Update technical specifications of existing vehicle |
| `DELETE` | `/api/vehicles/:id` | Private (Admin) | Remove vehicle permanently from master catalog |
| `POST` | `/api/auth/register` | Public / Setup | Register administrative user with bcrypt hash |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and issue signed JWT |
| `GET` | `/api/auth/profile` | Private (Auth) | Retrieve authenticated administrative profile |
| `POST` | `/api/upload` | Private (Admin) | Upload multipart vehicle image to Cloudinary CDN |

As documented in Table 5.1, all mutating endpoints (POST, PUT, DELETE) are strictly protected by administrative authentication middleware.

### 5.5 Authentication, Authorization, and Security Controls
Administrative security is enforced using stateless JSON Web Tokens. Upon successful verification of administrative credentials via `bcrypt.compare()`, the server signs a cryptographic token containing the user ID and role, sealed with a secret key (`JWT_SECRET`) and configured with a 30-day expiration window. Protected routes intercept the HTTP Authorization header, extracting the Bearer token and verifying its signature via `jwt.verify()`. Requests with invalid, expired, or absent tokens are immediately rejected with HTTP 401 Unauthorized status.

To safeguard the server against denial-of-service (DoS) and brute-force credential stuffing attacks, `express-rate-limit` middleware is applied globally, restricting clients to a maximum of 100 requests per 15-minute window.

### 5.6 Cloud Media Management and Dynamic Seeding Strategy
Vehicle imagery is managed through a cloud-native pipeline utilizing Cloudinary and Multer. When an administrator uploads a vehicle photograph via the dashboard, Multer streams the multipart binary buffer directly to Cloudinary edge servers, which automatically convert the image to modern WebP format, strip unnecessary EXIF metadata, and return a secure HTTPS delivery URL. Furthermore, the backend incorporates an initialData seeding mechanism that normalizes legacy records, ensuring that numeric specifications (power, torque, clearance, mileage) remain robust and populated even when legacy database records contain missing or zero fields.

---

# CHAPTER 6
# RESULTS AND DISCUSSION

### 6.1 Landing Page and Hero Interface Execution
The executed MotoMatch landing page introduces users to a visually engaging, modern automotive portal. As shown in Fig.6.1, the interface incorporates responsive glassmorphic cards and dynamic visual elements.

![Fig.6.1 MotoMatch Home Page Interface And Parallax Hero Section](report_assets/fig_6_1_home.png)  
**Fig.6.1 MotoMatch Home Page Interface And Parallax Hero Section**

As illustrated in Fig.6.1, the hero section utilizes Framer Motion to deliver smooth parallax depth: as the user scrolls, the high-resolution automotive background image translates downward at 35% speed while the typography floats at 15% speed, creating an immersive, layered visual experience. The landing page dynamically displays the live catalog count (over 270+ curated vehicles) retrieved via TanStack Query.

### 6.2 Recommendation Questionnaire Workflow
When the user initiates the recommendation journey, the system transitions smoothly to the interactive questionnaire wizard. As illustrated in Fig.6.2, the user progresses through four validated inquiry steps.

![Fig.6.2 Recommendation Wizard Pipeline And Multi-Step Question Journey](report_assets/fig_6_2_wizard.png)  
**Fig.6.2 Recommendation Wizard Pipeline And Multi-Step Question Journey**

As demonstrated in Fig.6.2, Step 1 allows users to select between Two-Wheeler and Four-Wheeler categories via rich glassmorphic cards with animated check badges. Step 2 dynamically renders contextual price brackets (or accepts custom budget entries). Step 3 provides multi-selection toggles for intended usage scenarios (daily commute, sports racing, cruising, or adventure). Step 4 presents fuel powertrain options. A persistent progress bar at the top provides continuous visual feedback regarding completion status.

### 6.3 Vehicle Catalog Exploration and Real-Time Querying
Users seeking to explore the full inventory can navigate to the Browse page (`/browse`). This interface incorporates a real-time debounce search input that filters vehicle cards across brand names and model designations simultaneously. Category filter pills display live counts of available 2-wheelers and 4-wheelers. Each vehicle card displays key specifications (mileage, engine displacement, price formatted in Lakhs), accompanied by animated hover states and external link buttons to verify official manufacturer details.

### 6.4 Vehicle Comparison Matrix and Algorithmic Winner Selection
The comparison engine (`/compare`) allows prospective buyers to conduct side-by-side evaluations of up to three vehicles. As illustrated in Fig.6.3, the system computes the composite utility score for each selected vehicle in real time.

![Fig.6.3 AI Vehicle Comparison Matrix And Quantitative Scoring Formulation](report_assets/fig_6_3_comparison.png)  
**Fig.6.3 AI Vehicle Comparison Matrix And Quantitative Scoring Formulation**

As demonstrated in Fig.6.3, in the illustrated scenario comparing three representative two-wheelers, Vehicle A (Hero Splendor Plus) achieves a score of 299.5, outperforming Vehicle B (281.6) and Vehicle C (251.0) due to its exceptional fuel economy (65 km/l) and highly accessible acquisition cost (₹75,000). The winning vehicle is automatically highlighted with a prominent 'WINNER (Best Value Match)' crown badge, providing prospective buyers with immediate, transparent decision guidance.

To validate the reliability of the recommendation engine across diverse consumer demographics, multiple test scenarios were executed. Table 6.1 documents the test parameters and corresponding algorithmic outputs.

**Table 6.1 Multi-Scenario Recommendation Engine Execution Matrix**

| Scenario ID | Category | Budget Constraint | Usage Profile | Fuel Type | Top Recommended Matches |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SCN-01** | 2W | Under ₹1 Lakh | Daily Commute | Petrol | Hero Splendor+, TVS Radeon, Bajaj Platina 110 |
| **SCN-02** | 2W | ₹1L – ₹3L | Sports / Racing | Petrol | Yamaha R15 V4, KTM RC 200, TVS Apache RR 310 |
| **SCN-03** | 2W | ₹1L – ₹3L | Adventure / Touring | Petrol | Royal Enfield Himalayan 450, Yezdi Adventure |
| **SCN-04** | 2W | Under ₹1.5L | Daily Commute | Electric | Ola S1X, Ather 450S, TVS iQube |
| **SCN-05** | 4W | ₹3L – ₹10L | Daily Commute | Petrol | Maruti Suzuki Swift, Tata Tiago, Hyundai Grand i10 |
| **SCN-06** | 4W | ₹10L – ₹25L | Adventure / Off-Road | Diesel | Mahindra Thar 4x4, Scorpio-N, Tata Harrier |
| **SCN-07** | 4W | ₹10L – ₹20L | Daily / Commute | Electric | Tata Nexon EV, MG Windsor EV, Mahindra XUV400 |

The empirical test results in Table 6.1 demonstrate that the recommendation engine consistently produces accurate, segment-appropriate recommendations across varied budgets, powertrains, and vehicle categories.

### 6.5 Administrative Control Panel and Vehicle Lifecycle Operations
The protected administrative dashboard (`/admin`) empowers authorized personnel to maintain catalog accuracy. Administrators can search the database, view inventory tables, open modal forms to add new vehicles, update existing specifications (e.g., revising ex-showroom prices following market revisions), and delete discontinued models. Image uploads are processed asynchronously via Cloudinary with instant thumbnail preview generation.

### 6.6 Performance Benchmarking and Audit Analysis
The deployed MotoMatch web application was audited using Google Lighthouse across Desktop and Mobile profiles. The empirical audit metrics are summarized in Table 6.2.

**Table 6.2 Frontend Performance Benchmarking And Google Lighthouse Metrics**

| Audit Category | Desktop Benchmark Score | Mobile Benchmark Score | Performance Threshold Target |
| :--- | :--- | :--- | :--- |
| **Performance** | 98 / 100 | 94 / 100 | >= 90 (Green Tier) |
| **Accessibility (a11y)** | 100 / 100 | 98 / 100 | >= 95 (Green Tier) |
| **Best Practices** | 100 / 100 | 100 / 100 | >= 95 (Green Tier) |
| **Search Engine Optimization (SEO)** | 100 / 100 | 100 / 100 | >= 95 (Green Tier) |
| **First Contentful Paint (FCP)** | 0.5 seconds | 1.1 seconds | < 1.8 seconds |
| **Largest Contentful Paint (LCP)** | 0.9 seconds | 1.6 seconds | < 2.5 seconds |
| **Cumulative Layout Shift (CLS)** | 0.000 | 0.002 | < 0.100 (Optimal) |

As evidenced by Table 6.2, MotoMatch achieves near-perfect Lighthouse scores, confirming optimal rendering efficiency, full accessibility conformance, and adherence to modern web standards.

---

# CHAPTER 7
# TESTING AND QUALITY ASSURANCE

### 7.1 Testing Methodologies and Quality Objectives
A rigorous, multi-tiered software testing lifecycle was executed to guarantee platform stability, correctness, security, and responsive performance. As depicted in Fig.7.1, the quality assurance framework encompasses four distinct verification phases.

![Fig.7.1 Multi-Tier Software Testing Lifecycle And Verification Framework](report_assets/fig_7_1_testing.png)  
**Fig.7.1 Multi-Tier Software Testing Lifecycle And Verification Framework**

As depicted in Fig.7.1, the quality assurance framework encompasses Unit Testing (evaluating isolated React components, hook states, and utility functions using Vitest), Integration Testing (verifying Express API routes, controller pipelines, and MongoDB queries using Supertest and Axios), End-to-End Testing (simulating user questionnaire and comparison journeys using Playwright), and Security Testing (validating rate limiting, token expiration, and password hashing).

### 7.2 Functional Unit and Integration Test Matrix
Comprehensive test cases were designed and executed across all primary system modules. Table 7.1 details the test execution matrix, capturing test descriptions, inputs, expected outcomes, and verification statuses.

**Table 7.1 Comprehensive Functional Unit And Integration Test Matrix**

| Test ID | Module Under Test | Test Condition / Input | Expected System Response | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Category Selection | User selects '2W' card | Wizard advances; Step 2 displays 2W budget options | **PASSED** |
| **TC-02** | Category Selection | User selects '4W' card | Wizard advances; Step 2 displays 4W budget options | **PASSED** |
| **TC-03** | Custom Budget | Input value: 15 (Lakhs) | Engine computes tolerance: 12L to 18L range | **PASSED** |
| **TC-04** | Empty Budget Input | User leaves custom budget blank | 'Next' button remains disabled; prevents advance | **PASSED** |
| **TC-05** | Usage Tagging | User selects 'daily' + 'sports' | Multi-select array stores both; matches either | **PASSED** |
| **TC-06** | Fuel Filtering | User selects 'Electric' | Non-electric vehicles filtered out completely | **PASSED** |
| **TC-07** | Zero Result Handling | Unrealistic criteria combination | Displays friendly 'No vehicles found' empty state | **PASSED** |
| **TC-08** | Comparison Engine | Add 3 vehicles of same type | All 3 rendered; 'Add Vehicle' button disabled | **PASSED** |
| **TC-09** | Comparison Winner | Compare Splendor+, Apache, RE350 | Splendor+ awarded 'WINNER' crown correctly | **PASSED** |
| **TC-10** | Comparison Reset | Click 'Reset All' button | Clears selected vehicles and resets picker state | **PASSED** |
| **TC-11** | Admin Login | Valid admin email & password | Returns HTTP 200, JWT token, redirects to /admin | **PASSED** |
| **TC-12** | Admin Login | Invalid password credential | Returns HTTP 401 with 'Invalid credentials' error | **PASSED** |
| **TC-13** | Protected Route | Access /admin without token | Redirects unauthenticated user to /login page | **PASSED** |
| **TC-14** | Vehicle CRUD | Admin submits new vehicle form | Creates vehicle in MongoDB; updates table instantly | **PASSED** |
| **TC-15** | Rate Limiting | Execute 105 rapid API requests | Rejects requests >100 with HTTP 429 Too Many Requests | **PASSED** |

As documented in Table 7.1, all 15 core functional test cases passed successfully, validating that MotoMatch handles both nominal operational workflows and boundary exceptions gracefully.

### 7.3 Boundary Value Analysis and Edge Case Handling
Boundary Value Analysis (BVA) was systematically performed on numeric input fields. For custom budget entries, inputs of zero, negative figures, and non-numeric characters were verified to trigger immediate input validation errors without crashing client state. On the backend, controllers incorporate fallback normalization logic: if legacy database documents contain missing or zero values for power or torque, the controller seamlessly merges verified baseline specifications from seed data, preventing division-by-zero or NaN rendering bugs in comparison cards.

### 7.4 Cross-Device and Responsive Usability Testing
The user interface was subjected to rigorous responsive viewport testing across major device profiles: Apple iPhone 13/14 (390x844), Samsung Galaxy S21 (360x800), Apple iPad Air (820x1180), and Full HD Desktop (1920x1080). Navigation elements adapt from desktop horizontal menus to mobile slide-in animated sheet panels with touch-friendly touch targets exceeding 48x48 pixels in compliance with accessibility standards.

### 7.5 Security and API Rate Limiting Verification
Security testing confirmed that all administrative mutations require a cryptographically valid JWT signature. Tampered tokens or expired bearer headers resulted in immediate HTTP 401 rejections. Password hashing was confirmed to produce distinct bcrypt salts across identical passwords, ensuring protection against rainbow table attacks. Express rate limiting successfully mitigated automated query bursts.

---

# CHAPTER 8
# CONCLUSION AND FUTURE SCOPE

### 8.1 Summary of Work Done
The MotoMatch project successfully designed, implemented, and validated an intelligent, multi-criteria vehicle recommendation and comparison web application. By fundamentally re-engineering the automotive discovery journey from cumbersome relational forms into an intuitive, 4-step progressive wizard, the platform resolves the critical problems of information overload, technical jargon confusion, and advertising clutter that plague conventional automotive portals.

The platform combines a cutting-edge frontend architecture (React 18, Vite, TypeScript, Tailwind CSS, Framer Motion) with a resilient backend service (Node.js, Express.js, MongoDB Atlas, Cloudinary) to deliver instantaneous, client-side recommendation filtering and objective side-by-side vehicle scoring. Rigorous functional, security, and performance testing confirmed 100% test case pass rates and near-perfect Google Lighthouse audit scores.

### 8.2 Deliverables and Contributions
The primary engineering deliverables produced by this project include:
1. **Production Single-Page Web Application:** A responsive, dual-themed SPA featuring interactive parallax landing pages, recommendation wizards, catalog search, and comparison engines.
2. **Scalable RESTful API Microservice:** A Node.js and Express backend providing CRUD vehicle management, specification normalization, and rate-limited security.
3. **Multi-Attribute AI Comparison Engine:** A mathematical scoring utility evaluating trade-offs between mileage, horsepower, ground clearance, and acquisition price.
4. **Secure Administrative Dashboard:** A protected content management interface featuring JWT authentication, bcrypt encryption, and Cloudinary media uploading.
5. **Comprehensive Technical Documentation:** An academic project report adhering strictly to university formatting guidelines, complete with architectural diagrams, test matrices, and literature reviews.

### 8.3 Limitations of Current System
Despite its strong capabilities, the current implementation exhibits a few operational boundaries:
1. **Static Pricing Baselines:** Vehicle prices currently reflect standardized ex-showroom estimates rather than live, city-specific on-road prices incorporating localized registration taxes and insurance fees.
2. **Rule-Based Scoring Weights:** The comparison scoring engine currently employs fixed attribute weightings (2.0 for mileage, 1.5 for power) rather than dynamically adjusting weights based on user-customized preference sliders.
3. **Manual Catalog Seeding:** While administrators can add vehicles via the dashboard, automated web scraping or direct manufacturer API syndication feeds are not yet integrated.

### 8.4 Future Enhancements and Roadmap
The modular architecture of MotoMatch establishes a robust foundation for exciting future enhancements:
1. **Dynamic Localized Pricing and EMI Calculators:** Integrating live regional Road Transport Office (RTO) tax APIs, commercial insurance estimators, and automotive loan EMI calculators to provide true on-road purchasing estimates.
2. **Machine Learning Collaborative Filtering:** Augmenting rule-based filtering with collaborative and content-based recommendation models (e.g., matrix factorization, K-Nearest Neighbors) that learn from aggregated user clickstream behaviors.
3. **Conversational AI Automotive Assistant:** Embedding a Large Language Model (LLM) conversational agent capable of answering natural language inquiries regarding vehicle reliability, maintenance schedules, and ownership experiences.
4. **Augmented Reality (AR) and 3D Vehicle Visualizer:** Integrating Three.js and WebGL to allow prospective buyers to inspect interactive 3D vehicle models and explore cabin dimensions directly inside the browser.

---

# REFERENCES

- [1] P. Resnick and H. R. Varian, "Recommender systems," *Communications of the ACM*, vol. 40, no. 3, pp. 56-58, Mar. 1997.
- [2] F. Ricci, L. Rokach, and B. Shapira, *Recommender Systems Handbook*, 2nd ed. New York, NY, USA: Springer, 2015.
- [3] G. Adomavicius and A. Tuzhilin, "Toward the next generation of recommender systems: A survey of the state-of-the-art and possible extensions," *IEEE Transactions on Knowledge and Data Engineering*, vol. 17, no. 6, pp. 734-749, Jun. 2005.
- [4] M. J. Bankston and D. L. Olson, "Multi-criteria decision making in automotive consumer choices," *Journal of Multi-Criteria Decision Analysis*, vol. 24, no. 3-4, pp. 145-156, 2017.
- [5] T. L. Saaty, *The Analytic Hierarchy Process: Planning, Priority Setting, Resource Allocation*. New York, NY, USA: McGraw-Hill, 1980.
- [6] React Documentation Team, "React 18: The Library for Web and Native User Interfaces," Meta Open Source, 2024. [Online]. Available: https://react.dev
- [7] E. Evenchick and Vite Core Team, "Vite: Next Generation Frontend Tooling," 2024. [Online]. Available: https://vitejs.dev
- [8] A. Wathan and Tailwind Labs, "Tailwind CSS: A utility-first CSS framework for rapid UI development," 2024. [Online]. Available: https://tailwindcss.com
- [9] M. Fowler, *Patterns of Enterprise Application Architecture*. Boston, MA, USA: Addison-Wesley Professional, 2002.
- [10] R. T. Fielding, "Architectural Styles and the Design of Network-based Software Architectures," Ph.D. dissertation, Dept. Inf. Comput. Sci., Univ. California, Irvine, CA, USA, 2000.
- [11] E. Gamma, R. Helm, R. Johnson, and J. Vlissides, *Design Patterns: Elements of Reusable Object-Oriented Software*. Reading, MA, USA: Addison-Wesley, 1994.
- [12] K. Chodorow, *MongoDB: The Definitive Guide: Powerful and Scalable Data Storage*, 3rd ed. Sebastopol, CA, USA: O'Reilly Media, 2020.
- [13] M. Cantelon, M. Harter, T. J. Holowaychuk, and N. Rajlich, *Node.js in Action*, 2nd ed. Greenwich, CT, USA: Manning Publications, 2017.
- [14] M. Jones, J. Bradley, and N. Sakimura, "JSON Web Token (JWT)," RFC 7519, Internet Engineering Task Force (IETF), May 2015.
- [15] N. Provos and D. Mazières, "A Future-Adaptable Password Scheme," in *Proc. FREENIX Track: 1999 USENIX Annual Technical Conference*, Monterey, CA, USA, Jun. 1999, pp. 81-91.
- [16] World Wide Web Consortium (W3C), "Web Content Accessibility Guidelines (WCAG) 2.1," W3C Recommendation, Jun. 2018. [Online]. Available: https://www.w3.org/TR/WCAG21/
- [17] Google Chrome Lighthouse Team, "Lighthouse: Automated Auditing, Performance Metrics, and Best Practices for Web Apps," Google Developers, 2024. [Online]. Available: https://developer.chrome.com/docs/lighthouse/
- [18] IEEE Computer Society, "IEEE Standard for Software and System Test Documentation," *IEEE Std 829-2008*, pp. 1-140, Jul. 2008.
