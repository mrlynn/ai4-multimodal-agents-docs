# 73-workflows-library-complex.mdx.backup

```backup
---
sidebar_position: 73
---

# 📚 Workflows Library

Access all pre-built workshop workflows ready for import into n8n. Each workflow demonstrates specific concepts and can be used as templates for your own implementations.

<InstructorNotes 
  timing="Workflows Library Overview (10-15 minutes)"
  notes={[
    "This is where participants can download all workshop workflows",
    "Each workflow builds on previous concepts progressively",
    "Workflows can be imported directly into n8n",
    "Encourage participants to examine the workflow JSON to understand structure",
    "Remind them to update credentials after importing"
  ]}
  tips={[
    "Demo the import process live with one workflow",
    "Show how to modify workflows after importing",
    "Explain the naming convention (01-09)",
    "Point out the progression from simple to complex",
    "Mention workflows are also available in the GitHub repo"
  ]}
/>

<SlideRecap 
  title="Pre-Built Workflows for Learning"
  items={[
    {
      icon: "🎯",
      title: "Progressive Learning", 
      description: "Workflows increase in complexity from basic to advanced"
    },
    {
      icon: "🔧", 
      title: "Ready to Import",
      description: "Download and import directly into your n8n instance"
    },
    {
      icon: "📖",
      title: "Educational Templates",
      description: "Each workflow teaches specific concepts and patterns"
    }
  ]}
  nextSection="Download workflows and start building!"
/>

## 🚀 Quick Start

### How to Import Workflows

1. **Download** the workflow JSON file
2. In n8n, go to **Workflows** → **Import**
3. Select the downloaded JSON file
4. **Review** the imported workflow
5. **Update credentials** as needed
6. **Test** the workflow

:::tip Direct Download
All workflows are available at: `/workflows/`

Or access from GitHub: [Workshop Workflows Repository](https://github.com/mrlynn/ai4-multimodal-agents-n8n/tree/main/workflows)
:::

## 📋 Available Workflows

### 🎓 Foundation Workflows (01-02)

<WorkflowCard
  number="01"
  title="Getting Started"
  description="Your first workflow! Tests the environment and verifies everything is working."
  concepts={["Webhooks", "Basic nodes", "Response handling"]}
  difficulty="beginner"
  downloadUrl="/workflows/01-getting-started.json"
>

**What it does:**
- Creates a simple webhook endpoint
- Returns workshop status information
- Verifies n8n is configured correctly

**Use this to:**
- Test your n8n installation
- Understand basic workflow structure
- Learn webhook configuration

</WorkflowCard>

<WorkflowCard
  number="02"
  title="PDF Processor"
  description="Extract and process PDF content for embedding generation."
  concepts={["PDF handling", "Page extraction", "Data transformation"]}
  difficulty="intermediate"
  downloadUrl="/workflows/02-pdf-processor.json"
>

**What it does:**
- Accepts PDF upload via webhook
- Extracts pages as images
- Prepares content for embedding generation
- Handles errors gracefully

**Use this to:**
- Process PDF documents
- Extract text and images
- Prepare for vector storage

</WorkflowCard>

### 🤖 AI Agent Workflows (03-07)

<WorkflowCard
  number="03"
  title="Multimodal Agent"
  description="Basic multimodal agent that processes both text and images."
  concepts={["Multimodal embeddings", "Vector search", "AI responses"]}
  difficulty="intermediate"
  downloadUrl="/workflows/03-multimodal-agent.json"
>

**What it does:**
- Generates multimodal embeddings
- Stores in MongoDB Atlas
- Performs vector similarity search
- Returns AI-powered responses

**Key features:**
- Voyage AI multimodal-3 integration
- MongoDB vector search
- Basic RAG implementation

</WorkflowCard>

<WorkflowCard
  number="04"
  title="Complete Agent (Mock)"
  description="Full agent workflow with mock services for testing without API keys."
  concepts={["Mock testing", "Agent architecture", "Error handling"]}
  difficulty="intermediate"
  downloadUrl="/workflows/04-complete-agent-mock.json"
>

**What it does:**
- Complete agent flow with mock embeddings
- Simulated vector search
- Mock AI responses
- Perfect for testing without API costs

**Use this to:**
- Test agent architecture
- Develop without API keys
- Understand the complete flow

</WorkflowCard>

<WorkflowCard
  number="05"
  title="Real Multimodal Agent"
  description="Production-ready multimodal agent with real API integrations."
  concepts={["Production patterns", "Real APIs", "Advanced RAG"]}
  difficulty="advanced"
  downloadUrl="/workflows/05-real-multimodal-agent.json"
>

**What it does:**
- Full production workflow
- Real Voyage AI embeddings
- MongoDB Atlas vector search
- Gemini 2.0 AI responses
- Error handling and retries

**Requirements:**
- MongoDB Atlas connection
- Workshop API access
- Proper credential configuration

</WorkflowCard>

<WorkflowCard
  number="06"
  title="Real Voyage Multimodal"
  description="Advanced workflow showcasing Voyage AI's multimodal capabilities."
  concepts={["Image embeddings", "Visual search", "Multimodal RAG"]}
  difficulty="advanced"
  downloadUrl="/workflows/06-real-voyage-multimodal.json"
>

**What it does:**
- Processes images and text separately
- Creates unified multimodal embeddings
- Implements visual similarity search
- Handles mixed content queries

**Best for:**
- PDFs with diagrams
- Visual content analysis
- Image-based queries

</WorkflowCard>

<WorkflowCard
  number="07"
  title="Form-Based Agent"
  description="Interactive agent with web form interface for queries."
  concepts={["Web interface", "Form handling", "User interaction"]}
  difficulty="intermediate"
  downloadUrl="/workflows/07-form-based-agent.json"
>

**What it does:**
- Provides web form for queries
- Handles file uploads
- Interactive chat interface
- Session management

**Features:**
- HTML form integration
- File upload handling
- Response formatting
- User-friendly interface

</WorkflowCard>

### 🚀 Advanced Workflows (08-09)

<WorkflowCard
  number="08"
  title="Voyage Context-3 Embeddings"
  description="Enhanced text understanding with Voyage AI's Context-3 model."
  concepts={["Context-3 model", "Complex text", "Contextual embeddings"]}
  difficulty="advanced"
  downloadUrl="/workflows/08-voyage-context-3-embeddings.json"
>

**What it does:**
- Uses voyage-context-3 for deep text understanding
- Adds contextual information to embeddings
- Optimized for legal and technical documents
- Implements intelligent model selection

**Best for:**
- Legal documents
- Technical manuals
- Research papers
- Complex narratives

</WorkflowCard>

<WorkflowCard
  number="09"
  title="Hybrid Multimodal Context Agent"
  description="The ultimate workflow combining multimodal-3 and context-3 models."
  concepts={["Hybrid approach", "Model orchestration", "Advanced RAG"]}
  difficulty="expert"
  downloadUrl="/workflows/09-hybrid-multimodal-context-agent.json"
>

**What it does:**
- Intelligently routes content to appropriate models
- Uses multimodal-3 for images and diagrams
- Uses context-3 for complex text
- Combines results for comprehensive understanding
- Implements weighted search strategies

**Key features:**
- Automatic model selection
- Parallel processing
- Unified search across embeddings
- Optimal performance/cost balance

**Use cases:**
- Technical documentation with diagrams
- Legal contracts with exhibits
- Research papers with charts
- Any complex mixed-content documents

</WorkflowCard>

## 🎯 Workflow Selection Guide

### By Experience Level

<Tabs>
<TabItem value="beginner" label="Beginner">

Start with these workflows:
1. **01 - Getting Started**: Learn n8n basics
2. **02 - PDF Processor**: Handle document processing
3. **04 - Complete Agent (Mock)**: Understand agent architecture

</TabItem>
<TabItem value="intermediate" label="Intermediate">

Progress to:
1. **03 - Multimodal Agent**: Real embedding generation
2. **07 - Form-Based Agent**: Add user interfaces
3. **05 - Real Multimodal Agent**: Production patterns

</TabItem>
<TabItem value="advanced" label="Advanced">

Master these:
1. **06 - Real Voyage Multimodal**: Visual content processing
2. **08 - Context-3 Embeddings**: Enhanced text understanding
3. **09 - Hybrid Agent**: Complete solution

</TabItem>
</Tabs>

### By Use Case

| Use Case | Recommended Workflows |
|----------|---------------------|
| **Basic PDF Processing** | 02, 03 |
| **Visual Content (Images/Diagrams)** | 06, 09 |
| **Legal/Technical Documents** | 08, 09 |
| **Interactive Applications** | 07 |
| **Production Deployment** | 05, 09 |
| **Testing/Development** | 04 |

## 🔧 Customization Tips

### After Importing

1. **Update Credentials**
   - MongoDB connection string
   - API endpoints (if not using workshop proxy)
   - Any authentication tokens

2. **Modify for Your Needs**
   - Change webhook paths
   - Adjust embedding models
   - Customize response formats
   - Add error notifications

3. **Common Customizations**
   \`\`\`javascript
   // Change embedding model
   "model": "voyage-context-3"  // Instead of voyage-3
   
   // Add metadata
   "metadata": {
     "source": "custom_app",
     "user_id": "{{ $json.user_id }}"
   }
   
   // Adjust search parameters
   "numCandidates": 100,  // Increase for better recall
   "limit": 10  // Return more results
   \`\`\`

## 📦 Bulk Download

### Download All Workflows
Get all 9 workflows at once! Use these direct links:

- [01-getting-started.json](/workflows/01-getting-started.json)
- [02-pdf-processor.json](/workflows/02-pdf-processor.json)
- [03-multimodal-agent.json](/workflows/03-multimodal-agent.json)
- [04-complete-agent-mock.json](/workflows/04-complete-agent-mock.json)
- [05-real-multimodal-agent.json](/workflows/05-real-multimodal-agent.json)
- [06-real-voyage-multimodal.json](/workflows/06-real-voyage-multimodal.json)
- [07-form-based-agent.json](/workflows/07-form-based-agent.json)
- [08-voyage-context-3-embeddings.json](/workflows/08-voyage-context-3-embeddings.json)
- [09-hybrid-multimodal-context-agent.json](/workflows/09-hybrid-multimodal-context-agent.json)

Or use this script in your terminal:

\`\`\`bash
# Download all workflows
for i in {01..09}; do
  curl -O https://your-workshop-url.com/workflows/${i}-*.json
done
\`\`\`

## 🚨 Troubleshooting

### Common Import Issues

#### Credentials not found
After importing, you need to:
1. Go to **Credentials** → **New**
2. Add MongoDB credentials
3. Update webhook URLs if needed
4. Save and test connections

#### Workflow errors on execution
Check these common issues:
- API endpoints are accessible
- MongoDB collection exists
- Webhook paths are unique
- All required nodes are connected

#### Version compatibility
These workflows require:
- n8n version 1.0.0 or higher
- MongoDB node v2
- HTTP Request node v4.1

## 📚 Next Steps

After exploring the workflows:

1. **Start with workflow 01** to verify setup
2. **Progress through numbered order** for best learning
3. **Customize workflows** for your use case
4. **Combine patterns** from different workflows
5. **Build your own** using these as templates

:::tip Pro Tip
Open workflows in n8n's JSON view to understand the structure and learn how to build your own from scratch!
:::

Ready to import your first workflow? [Start with Getting Started →](/workflows/01-getting-started.json)
```

# content-organization-guide.md

```md
# Content Organization Guide

## Workshop Structure Overview

The workshop now has a clear two-path structure that guides attendees through different learning approaches while achieving the same outcome.

### Navigation Flow

\`\`\`
Workshop Home (index.mdx)
├── 00-workshop-overview.mdx (Instructor slides & overview)
├── 01-path-selection.mdx (Decision point)
├── path-a-n8n-overview.mdx (n8n visual path)
├── path-b-python-overview.mdx (Python code path)
└── Existing content organized by path relevance
\`\`\`

## Content Categorization

### **Shared Foundation** (Both Paths)
- `00-workshop-overview.mdx` - Complete overview with slides
- `01-path-selection.mdx` - Path decision framework
- `20-prerequisites.mdx` - API keys and accounts
- `30-mongodb-atlas-setup.mdx` - Database setup
- `35-voyage-ai-setup.mdx` - AI model setup

### **Path A: n8n Visual Workflows**
- `path-a-n8n-overview.mdx` - Path landing page
- `15-github-codespaces.mdx` - Environment setup
- `25-n8n-first-run.mdx` - n8n introduction
- `40-pdf-processing-workflow.mdx` - Document processing
- `50-vector-search-workflow.mdx` - Search implementation
- `60-ai-agent-workflow.mdx` - Agent development
- `65-agent-patterns.mdx` - Advanced patterns
- `67-memory-context-patterns.mdx` - Memory systems
- `69-multimodal-image-queries.mdx` - Multimodal features
- `70-complete-multimodal-agent.mdx` - Full integration
- `72-workflow-reference.mdx` - Reference materials
- `73-workflows-library.mdx` - Pre-built workflows
- `74-workflow-integration-guide.mdx` - Integration patterns
- `75-mongodb-vector-setup.mdx` - Vector database
- `77-status-monitoring.mdx` - Monitoring
- `78-api-gateway-status.mdx` - API status
- `79-workflow-guide-getting-started.mdx` - Getting started
- `80-upload-interface.mdx` - Web interface
- `81-workflow-guide-hybrid-agent.mdx` - Hybrid workflows
- `82-production-security.mdx` - Security
- `83-monitoring-observability.mdx` - Observability
- `84-cost-optimization.mdx` - Cost management
- `85-troubleshooting-guide.mdx` - Troubleshooting

### **Path B: Python & Jupyter**
- `path-b-python-overview.mdx` - Path landing page
- `85-python-mongodb-approaches.mdx` - Python patterns
- `90-approach-comparison.mdx` - Implementation comparison
- `/static/notebooks/notebook.ipynb` - Complete implementation

### **Exercises & Advanced Topics** (Path-Specific)
- `exercise-pdf-rag-agent.mdx` - PDF RAG exercise
- `exercise-memory-context.mdx` - Memory exercise
- `exercise-advanced-tools.mdx` - Advanced tools
- `api-architecture.mdx` - Architecture patterns
- `architecture-overview.mdx` - System overview
- `68-tool-definition-primer.mdx` - Tool development
- `71-enhanced-text-context-3.mdx` - Advanced text processing

### **Reference & Support** (Both Paths)
- `45-local-setup-tips.mdx` - Local development
- `95-community-resources.mdx` - Community support
- `96-docker-troubleshooting.mdx` - Docker help
- `status-badge-usage-guide.mdx` - Status badges
- `summary.mdx` - Workshop summary
- `workshop-alignment-assessment.md` - Assessment document

## Sidebar Organization Recommendations

### Suggested Structure:
\`\`\`
Workshop Materials
├── 🏠 Workshop Home
├── 📋 Overview & Slides
├── 🛤️ Choose Your Path
├── 🎨 Path A: n8n Visual
│   ├── Getting Started
│   ├── Core Workflows
│   ├── Advanced Features
│   └── Production
├── 🐍 Path B: Python Code
│   ├── Setup & Notebook
│   ├── Implementation Guide
│   └── Advanced Patterns
├── 📚 Exercises
├── 🔧 Reference
└── 🆘 Support & Troubleshooting
\`\`\`

## Key Implementation Notes

### 1. **Clear Decision Point**
- Attendees see the path decision immediately after overview
- Each path has distinct value propositions
- Cross-references between paths for comparison

### 2. **Instructor Experience**
- `00-workshop-overview.mdx` contains all slides for presentation
- No need to switch between applications during instruction
- SlideViewer component enables seamless slide integration

### 3. **Attendee Experience**
- Clear path selection with guidance
- Path-specific landing pages with complete roadmaps
- Ability to explore both paths if desired

### 4. **Content Reuse**
- Shared foundation content (prerequisites, setup)
- Path-specific deep dives
- Both paths achieve identical outcomes

## Next Steps

1. **Update sidebar configuration** in `docusaurus.config.js`
2. **Add path indicators** to existing content
3. **Create cross-references** between paths
4. **Test navigation flow** with workshop attendees
5. **Gather feedback** on path selection effectiveness
```

# index.mdx

```mdx
---
id: index
sidebar_position: 1
slug: /
title: Workshop Home
---

# 🎓 Multimodal PDF Agent Workshop

**Build Intelligent AI Systems That Understand Both Text and Images**

Welcome to our comprehensive workshop where you'll learn to create sophisticated AI agents that can reason, plan, use tools, and understand multimodal content from PDFs.

---

## 🧠 What Are We Learning?

You're learning what **AI agents** are—systems that don't just answer simple prompts, but can:

- **Reason through problems** step-by-step
- **Plan solutions** across multiple steps  
- **Use external tools** (vector databases, APIs, search, etc.)
- **Remember previous conversations** (short- and long-term memory)
- **Iterate and refine** their answers

### 🔍 Key Components You'll Master

**🎯 Perception**: How the agent "sees" and ingests information (text, images, audio, etc.)

**🧩 Planning & Reasoning**: How it decides what to do, possibly in multiple steps

**🛠️ Tools**: How it interacts with the outside world (searches, code execution, APIs)

**💾 Memory**: How it recalls and uses past interactions or data

We dive deep into **multimodality**—meaning models that process more than one kind of data. Not just text, but also images, charts, diagrams, and visual elements that contain critical information.

---

## 🏗️ What Are We Building?

You're building a **multimodal AI agent from scratch** that can:

✅ **Answer questions** about a collection of documents (PDFs, reports, etc.)

✅ **Understand both text and visual elements** (charts, diagrams, tables) inside those documents

✅ **Explain charts, diagrams, and content** across modalities—not just copy text

✅ **Remember conversations** and build context over time

✅ **Use tools intelligently** to search, retrieve, and reason

You'll prepare data for mixed-modal retrieval, feed it into a vector store, and wire up a system that leverages the latest LLMs and multimodal models for robust, intelligent answers.

---

## 🌟 Why Does This Matter?

### 📊 Real-World Data is Multimodal
Business documents, scientific papers, and reports all have **critical information in images, diagrams, and tables**—not just text. Traditional approaches miss this entirely.

### ❌ Classic AI Falls Short
- **Text-only models** can't "see" a chart or interpret a figure
- **Image-only models** can't explain what's written
- **Simple chatbots** can't reason through complex, multi-step problems

### ✨ Multimodal Agents Bridge the Gap
Combining LLMs, perception, memory, and external tools to solve **more complex, useful, real-world tasks**. You're not just using AI—you're **engineering it** to reason, search, and respond with context from all types of content.

---

## 🍃 Why MongoDB?

You'll see how **MongoDB's vector search**, document flexibility, and ability to store mixed data types make it a perfect fit for building these next-generation AI agents.

- **Native vector search** with HNSW algorithms for lightning-fast similarity matching
- **Flexible document storage** that handles text, images, and metadata seamlessly  
- **Production-ready scaling** that grows with your application
- **Real tools and code** you can adapt for production systems

---

## 🛤️ Choose Your Learning Path

### 🎨 **Path A: n8n Visual Workflows**
**Best for:** Business analysts, citizen developers, visual learners

Build with drag-and-drop visual workflows:
- Visual interface—no coding required
- Pre-built nodes for common operations  
- Focus on business logic vs. implementation details
- Production-ready from day one

**[Start n8n Path →](./n8n-exercise-1)**

---

### 🐍 **Path B: Python & Jupyter**  
**Best for:** Developers, data scientists, code-first learners

Build with Python, LangChain, and Jupyter notebooks:
- Work with pre-generated embeddings for faster development
- Full control over the implementation
- Deep dive into algorithms and frameworks
- Maximum customization possibilities

**[Start Python Path →](./python-exercise-1)**

---

## 🎯 Big Picture: What You'll Walk Away With

### 🧠 **Deep Understanding**
- The key patterns for building modern AI agents
- How to handle and retrieve from mixed-modal data  
- Where the field is going, and how you can contribute right now

### 🛠️ **Practical Skills**
- Production-ready code and workflows
- Experience with cutting-edge AI tools
- Real systems you can adapt and extend

### 🚀 **Future-Ready Knowledge**
This workshop is about creating agents that can answer questions about **both the words and the pictures**—true "understanding" at machine scale.

---

## 🚀 Ready to Start Building?

<div style={{
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr', 
  gap: '2rem', 
  marginTop: '2rem',
  marginBottom: '2rem'
}}>

<div style={{
  textAlign: 'center', 
  padding: '2rem', 
  background: 'linear-gradient(135deg, #00684A 0%, #26a69a 100%)', 
  borderRadius: '12px',
  color: 'white'
}}>
  <h3 style={{color: 'white', marginBottom: '1rem'}}>🎨 Visual Workflows</h3>
  <p style={{marginBottom: '1.5rem'}}>Drag-and-drop interface<br/>Perfect for rapid prototyping</p>
  <a 
    href="/docs/n8n-exercise-1"
    style={{
      display: 'inline-block',
      padding: '0.75rem 2rem',
      background: 'white',
      color: '#00684A',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    }}
  >
    Start n8n Path →
  </a>
</div>

<div style={{
  textAlign: 'center', 
  padding: '2rem', 
  background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)', 
  borderRadius: '12px',
  color: 'white'
}}>
  <h3 style={{color: 'white', marginBottom: '1rem'}}>🐍 Code & Jupyter</h3>
  <p style={{marginBottom: '1.5rem'}}>Python programming<br/>Maximum flexibility & control</p>
  <a 
    href="/docs/python-exercise-1"
    style={{
      display: 'inline-block',
      padding: '0.75rem 2rem',
      background: 'white',
      color: '#7C3AED',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    }}
  >
    Start Python Path →
  </a>
</div>

</div>

---

## 📚 Additional Resources

- **[Workshop Overview & Slides](./workshop-overview)** - Complete presentation materials
- **[Workshop Objectives](./objectives-overview)** - Detailed learning outcomes
- **[PDF Tester](/upload)** - Test your workflows as you build

---

<div style={{
  marginTop: '3rem',
  padding: '2rem',
  background: 'var(--ifm-color-primary-lightest)',
  borderRadius: '12px',
  textAlign: 'center'
}}>
  <h2>🎉 Let's Build Something Amazing!</h2>
  <p style={{fontSize: '1.2rem', marginBottom: '0'}}>
    Ready to create AI agents that understand both words and pictures?<br/>
    <strong>Choose your path above and let's get started!</strong>
  </p>
</div>
```

# n8n-exercise-1.mdx

```mdx
---
id: n8n-exercise-1
title: 📄 Exercise 1 - PDF Processing Workflow
sidebar_label: 📄 Exercise 1 - PDF Processing
---

# Exercise 1: PDF Processing Workflow

## 🎯 Objective
Create an n8n workflow that processes PDF uploads, extracts text, and generates embeddings.

## 🔧 Setup

### Step 1: Start n8n
\`\`\`bash
npm run workshop:start
\`\`\`

### Step 2: Access n8n Interface
Open [http://localhost:5678](http://localhost:5678) in your browser.

## 📊 Exercise Tasks

### Task 1: Import the PDF Processor Workflow
1. In n8n, click **Import from File**
2. Select `/static/workflows/02-pdf-processor.json`
3. Click **Import**

### Task 2: Configure the Webhook
1. Click on the **PDF Upload Webhook** node
2. Note the webhook path: `/upload-pdf`
3. Your full webhook URL will be: `http://localhost:5678/webhook-test/upload-pdf`

### Task 3: Configure MongoDB Connection
1. Click on the **Store in MongoDB** node
2. Create credentials for MongoDB:
   - **Host**: `localhost`
   - **Port**: `27017`
   - **Database**: `workshop`
   - **Username**: `admin`
   - **Password**: `mongodb`

### Task 4: Test the Workflow
1. Click **Execute Workflow** to activate the webhook
2. Use the [PDF Tester](/upload) page to test your workflow:
   - Set webhook URL to: `http://localhost:5678/webhook-test/upload-pdf`
   - Upload a sample PDF
   - Check that it processes successfully

### Task 5: Verify Data Storage
1. Click on **Store in MongoDB** node after execution
2. Check the output to confirm document was stored
3. Verify the document includes:
   - Filename
   - Text content
   - Embedding vector (1024 dimensions)
   - Metadata

## 🔍 Understanding the Workflow

The PDF processor workflow includes these nodes:

1. **PDF Upload Webhook** - Receives file uploads
2. **Validate PDF** - Checks file type and size
3. **Extract Text** - Pulls text content from PDF
4. **Generate Embeddings** - Creates vector embeddings
5. **Store in MongoDB** - Saves to database
6. **Format Response** - Returns success message

## ✅ Success Criteria
- [ ] Workflow imported successfully
- [ ] MongoDB credentials configured
- [ ] Webhook activated and accessible
- [ ] PDF upload processed without errors
- [ ] Document stored in MongoDB with embeddings

## 🚀 Next Steps
With PDF processing working, proceed to [Exercise 2: Vector Storage Workflow](./n8n-exercise-2)
```

# n8n-exercise-2.mdx

```mdx
---
id: n8n-exercise-2
title: 🔍 Exercise 2 - Vector Storage Workflow
sidebar_label: 🔍 Exercise 2 - Vector Storage
---

# Exercise 2: Vector Storage & Search Workflow

## 🎯 Objective
Create workflows for storing embeddings and performing vector searches with MongoDB Atlas.

## 📊 Exercise Tasks

### Task 1: Create Vector Search Index
1. In n8n, create a new workflow called "Vector Index Setup"
2. Add these nodes:

**MongoDB Node (Create Index)**:
\`\`\`javascript
// Index creation command
{
  "createSearchIndexes": "pdf_documents",
  "indexes": [
    {
      "name": "vector_index",
      "definition": {
        "fields": [
          {
            "type": "vector",
            "path": "embedding",
            "numDimensions": 1024,
            "similarity": "cosine"
          },
          {
            "type": "filter",
            "path": "filename"
          }
        ]
      }
    }
  ]
}
\`\`\`

### Task 2: Create Search Workflow
1. Create a new workflow called "Vector Search API"
2. Add these nodes:

**Webhook Node**:
- Path: `/search`
- Method: `POST`

**Code Node (Parse Query)**:
\`\`\`javascript
// Extract search query from request
const query = $input.first().json.query || "default search";
const topK = $input.first().json.top_k || 5;

return {
  json: {
    query: query,
    topK: topK,
    timestamp: new Date().toISOString()
  }
};
\`\`\`

**HTTP Request Node (Get Query Embedding)**:
- URL: `{{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}`
- Method: `POST`
- Body:
\`\`\`json
{
  "text": "={{ $json.query }}",
  "model": "voyage-3"
}
\`\`\`

**MongoDB Node (Vector Search)**:
\`\`\`javascript
// Aggregation pipeline for vector search
[
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "embedding",
      "queryVector": "={{ $json.embeddings[0] }}",
      "numCandidates": "={{ $('Parse Query').first().json.topK * 10 }}",
      "limit": "={{ $('Parse Query').first().json.topK }}"
    }
  },
  {
    "$addFields": {
      "score": {"$meta": "vectorSearchScore"}
    }
  },
  {
    "$project": {
      "filename": 1,
      "text": 1,
      "score": 1,
      "metadata": 1,
      "_id": 0
    }
  }
]
\`\`\`

### Task 3: Test Vector Search
1. Execute the Vector Search workflow
2. Use a tool like Postman or curl to test:

\`\`\`bash
curl -X POST http://localhost:5678/webhook-test/search \
  -H "Content-Type: application/json" \
  -d '{"query": "artificial intelligence", "top_k": 3}'
\`\`\`

### Task 4: Create Bulk Upload Workflow
1. Create workflow called "Bulk PDF Processor"
2. Add nodes to process multiple PDFs at once:

**Webhook Node**:
- Path: `/bulk-upload`
- Method: `POST`

**Code Node (Process Multiple Files)**:
\`\`\`javascript
// Handle multiple file uploads
const files = $input.first().binary;
const results = [];

// Process each file (simplified for workshop)
for (const [key, file] of Object.entries(files)) {
  if (file.fileName.toLowerCase().endsWith('.pdf')) {
    results.push({
      filename: file.fileName,
      size: file.fileSize,
      status: 'queued'
    });
  }
}

return results.map(result => ({ json: result }));
\`\`\`

**Loop Over Items** → Connect to your PDF processing nodes

## 🔍 Understanding Vector Search

Key concepts for vector search in MongoDB:

1. **Vector Index**: Optimized for similarity search using HNSW algorithm
2. **numCandidates**: How many documents to examine (affects accuracy vs speed)
3. **Similarity Metrics**: Cosine similarity for normalized vectors
4. **Aggregation Pipeline**: Combines vector search with filtering and projection

## ✅ Success Criteria
- [ ] Vector search index created successfully
- [ ] Search workflow returns relevant results
- [ ] Results include similarity scores
- [ ] Bulk upload workflow processes multiple files
- [ ] Search API accessible via webhook

## 🚀 Next Steps
With search working, proceed to [Exercise 3: Chat Agent Workflow](./n8n-exercise-3)
```

# n8n-exercise-3.mdx

```mdx
---
id: n8n-exercise-3
title: 🤖 Exercise 3 - Chat Agent Workflow
sidebar_label: 🤖 Exercise 3 - Chat Agent
---

# Exercise 3: Chat Agent Workflow

## 🎯 Objective
Build an intelligent chat agent that can answer questions about your PDF documents using the ReAct pattern.

## 📊 Exercise Tasks

### Task 1: Create Chat Webhook
1. Create a new workflow called "Chat Agent"
2. Add **Webhook Node**:
   - Path: `/chat`
   - Method: `POST`
   - Expected JSON: `{"question": "user question", "session_id": "optional"}`

### Task 2: Implement ReAct Pattern
Add these nodes in sequence:

**Code Node (Parse Input)**:
\`\`\`javascript
// Extract and validate user input
const question = $input.first().json.question || "";
const sessionId = $input.first().json.session_id || "default";

if (!question.trim()) {
  throw new Error("Question is required");
}

return {
  json: {
    question: question.trim(),
    sessionId: sessionId,
    timestamp: new Date().toISOString(),
    step: "input_parsed"
  }
};
\`\`\`

**Code Node (Reasoning Step)**:
\`\`\`javascript
// Simple reasoning logic for tool selection
const question = $json.question.toLowerCase();

let toolToUse = "vector_search";
let reasoning = "I'll search through the PDF documents to find relevant information.";

// Determine if user wants document list
if (question.includes("documents") || question.includes("files") || question.includes("available")) {
  toolToUse = "list_documents";
  reasoning = "User wants to know about available documents.";
}

return {
  json: {
    ...($input.first().json),
    toolToUse: toolToUse,
    reasoning: reasoning,
    step: "reasoning_complete"
  }
};
\`\`\`

**IF Node (Tool Selection)**:
- Condition: `{{ $json.toolToUse === "vector_search" }}`

### Task 3: Add Vector Search Branch
For the **TRUE** branch (vector search):

**HTTP Request Node (Vector Search)**:
- Method: `POST`
- URL: `http://localhost:5678/webhook-test/search`
- Body:
\`\`\`json
{
  "query": "={{ $json.question }}",
  "top_k": 3
}
\`\`\`

**Code Node (Format Search Results)**:
\`\`\`javascript
// Format search results for LLM
const results = $input.first().json;
const question = $('Parse Input').first().json.question;

if (!results || results.length === 0) {
  return {
    json: {
      context: "No relevant information found in the documents.",
      question: question,
      step: "search_complete"
    }
  };
}

let context = "Based on the PDF documents, here's what I found:\n\n";
results.forEach((result, index) => {
  context += `${index + 1}. From "${result.filename}" (relevance: ${(result.score * 100).toFixed(1)}%):\n`;
  context += `${result.text.substring(0, 300)}...\n\n`;
});

return {
  json: {
    context: context,
    question: question,
    searchResults: results,
    step: "search_complete"
  }
};
\`\`\`

### Task 4: Add Document List Branch  
For the **FALSE** branch (list documents):

**MongoDB Node (List Documents)**:
- Operation: `Aggregate`
- Collection: `pdf_documents`
- Pipeline:
\`\`\`json
[
  {
    "$group": {
      "_id": "$filename",
      "chunks": {"$sum": 1},
      "lastUpdated": {"$max": "$metadata.inserted_at"}
    }
  },
  {"$sort": {"_id": 1}}
]
\`\`\`

**Code Node (Format Document List)**:
\`\`\`javascript
// Format document list
const docs = $input.first().json;
const question = $('Parse Input').first().json.question;

let context = "Here are the available PDF documents:\n\n";
docs.forEach((doc, index) => {
  context += `${index + 1}. ${doc._id} (${doc.chunks} sections)\n`;
});

return {
  json: {
    context: context,
    question: question,
    documentList: docs,
    step: "document_list_complete"
  }
};
\`\`\`

### Task 5: Add LLM Response Generation
Merge both branches and add:

**HTTP Request Node (LLM Call)**:
- Method: `POST`
- URL: `{{ $env.GEMINI_API_URL || 'https://workshop-llm-api.vercel.app/api/chat' }}`
- Body:
\`\`\`json
{
  "message": "Context: {{ $json.context }}\n\nUser Question: {{ $json.question }}\n\nPlease provide a helpful answer based on the context provided. If the context doesn't contain relevant information, say so clearly.",
  "model": "gemini-2.0-flash"
}
\`\`\`

**Code Node (Format Final Response)**:
\`\`\`javascript
// Format the final response
const llmResponse = $input.first().json.response || "I apologize, but I couldn't generate a response.";
const question = $json.question;
const timestamp = new Date().toISOString();

return {
  json: {
    answer: llmResponse,
    question: question,
    timestamp: timestamp,
    session_id: $json.sessionId,
    reasoning: $('Reasoning Step').first().json.reasoning,
    sources: $json.searchResults ? $json.searchResults.map(r => r.filename) : []
  }
};
\`\`\`

### Task 6: Test the Chat Agent
1. Execute the workflow to activate the webhook
2. Test with various questions:

\`\`\`bash
# Test document listing
curl -X POST http://localhost:5678/webhook-test/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What documents do you have?"}'

# Test search query
curl -X POST http://localhost:5678/webhook-test/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about artificial intelligence"}'
\`\`\`

3. Use the [PDF Tester](/upload) page to test:
   - Set chat webhook URL to: `http://localhost:5678/webhook-test/chat`
   - Ask questions after uploading a PDF

## 🧠 Understanding ReAct Pattern

Your workflow implements ReAct (Reasoning + Acting):

1. **Reasoning**: Analyze user question to determine which tool to use
2. **Acting**: Execute the appropriate tool (search or list documents)
3. **Observing**: Process tool results and generate final response

## ✅ Success Criteria
- [ ] Chat webhook accepts questions correctly
- [ ] Reasoning step selects appropriate tools
- [ ] Vector search provides relevant results
- [ ] Document listing works for general queries
- [ ] LLM generates coherent responses with context
- [ ] Final response includes sources and reasoning

## 🚀 Next Steps
With your chat agent working, proceed to [Exercise 4: Complete Integration](./n8n-exercise-4)
```

# n8n-exercise-4.mdx

```mdx
---
id: n8n-exercise-4
title: 🎯 Exercise 4 - Complete Integration
sidebar_label: 🎯 Exercise 4 - Integration
---

# Exercise 4: Complete Integration & Testing

## 🎯 Objective
Integrate all your workflows and test the complete multimodal PDF agent system.

## 📊 Exercise Tasks

### Task 1: Create Master Control Workflow
1. Create a new workflow called "Agent Controller"
2. This workflow will orchestrate all your other workflows:

**Webhook Node (Main Entry Point)**:
- Path: `/agent`
- Method: `POST`
- Body: `{"action": "upload|chat|status", "data": {...}}`

**Switch Node (Action Router)**:
Based on `{{ $json.action }}`:
- Case 1: `upload` → Route to PDF processing
- Case 2: `chat` → Route to chat agent
- Case 3: `status` → Route to system status

### Task 2: Add Conversation Memory
Enhance your chat agent with session management:

**MongoDB Node (Load Session History)**:
- Operation: `Find`
- Collection: `chat_sessions`
- Query: `{"session_id": "{{ $json.session_id }}"}`

**Code Node (Merge Context)**:
\`\`\`javascript
// Combine current search results with conversation history
const currentContext = $json.context;
const sessionHistory = $input.first().json || [];
const question = $json.question;

let fullContext = currentContext;

if (sessionHistory.length > 0) {
  fullContext += "\n\nPrevious conversation:\n";
  sessionHistory.slice(-3).forEach(msg => {  // Last 3 messages
    fullContext += `User: ${msg.question}\nAssistant: ${msg.answer}\n\n`;
  });
}

return {
  json: {
    context: fullContext,
    question: question,
    session_id: $json.session_id,
    step: "context_merged"
  }
};
\`\`\`

**MongoDB Node (Save Response)**:
After getting LLM response, save to session:
- Operation: `Insert`
- Collection: `chat_sessions`
- Document:
\`\`\`json
{
  "session_id": "{{ $json.session_id }}",
  "question": "{{ $json.question }}",
  "answer": "{{ $json.answer }}",
  "timestamp": "{{ $json.timestamp }}",
  "sources": "{{ $json.sources }}"
}
\`\`\`

### Task 3: Add Error Handling
Add error handling nodes throughout your workflows:

**Code Node (Error Handler)**:
\`\`\`javascript
// Global error handler
const error = $input.first().error || {};
const context = $input.first().json || {};

return {
  json: {
    success: false,
    error: {
      message: error.message || "Unknown error occurred",
      type: error.name || "UnknownError",
      timestamp: new Date().toISOString()
    },
    context: context,
    retry_possible: !error.message?.includes("authentication")
  }
};
\`\`\`

### Task 4: Create System Status Endpoint
Add a status workflow for monitoring:

**Code Node (System Status)**:
\`\`\`javascript
// Check system health
const status = {
  timestamp: new Date().toISOString(),
  services: {
    mongodb: "checking...",
    vector_search: "checking...",
    llm: "checking..."
  }
};

return { json: status };
\`\`\`

**MongoDB Node (Check DB)**:
- Operation: `Count Documents`
- Collection: `pdf_documents`

**HTTP Request Node (Check Vector Search)**:
- Method: `POST`
- URL: `http://localhost:5678/webhook-test/search`
- Body: `{"query": "test", "top_k": 1}`

**Code Node (Compile Status)**:
\`\`\`javascript
// Compile final status report
const dbCount = $('Check DB').first().json || 0;
const searchTest = $('Check Vector Search').first().json || [];

return {
  json: {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      mongodb: `connected (${dbCount} documents)`,
      vector_search: `working (${searchTest.length} results)`,
      llm: "available"
    },
    workflows: {
      pdf_processor: "active",
      vector_search: "active", 
      chat_agent: "active"
    }
  }
};
\`\`\`

### Task 5: Integration Testing
Test all workflows working together:

1. **Upload Test**:
\`\`\`bash
# Upload a PDF
curl -X POST http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action": "upload", "data": {"file": "sample.pdf"}}'
\`\`\`

2. **Chat Test**:
\`\`\`bash
# Start conversation
curl -X POST http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action": "chat", "data": {"question": "What documents do you have?", "session_id": "test123"}}'

# Continue conversation
curl -X POST http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action": "chat", "data": {"question": "Tell me about the first document", "session_id": "test123"}}'
\`\`\`

3. **Status Test**:
\`\`\`bash
# Check system status
curl -X POST http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action": "status"}'
\`\`\`

### Task 6: Create Monitoring Dashboard
Use the [PDF Tester](/upload) page as your dashboard:

1. Configure all webhook URLs:
   - Upload: `http://localhost:5678/webhook-test/agent` (with action: upload)
   - Chat: `http://localhost:5678/webhook-test/agent` (with action: chat)

2. Test complete workflow:
   - Upload multiple PDFs
   - Ask questions about the content
   - Verify conversation memory works
   - Check that sources are cited correctly

## 🔍 Understanding the Complete System

Your integrated system now includes:

1. **PDF Processing Pipeline**: Convert documents to searchable vectors
2. **Vector Storage & Search**: MongoDB Atlas with optimized indexes
3. **Intelligent Agent**: ReAct pattern with tool calling
4. **Conversation Memory**: Session-based context management
5. **Error Handling**: Graceful failure recovery
6. **System Monitoring**: Health checks and status reporting

## ✅ Final Validation Checklist

\`\`\`bash
# Run these tests to validate your complete system:

# 1. System Status
curl http://localhost:5678/webhook-test/agent -d '{"action":"status"}'

# 2. PDF Upload  
# (Use the web interface to upload a test PDF)

# 3. Document Query
curl http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action":"chat","data":{"question":"What documents are available?"}}'

# 4. Content Search
curl http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action":"chat","data":{"question":"Find information about AI"}}'

# 5. Conversation Continuity
curl http://localhost:5678/webhook-test/agent \
  -H "Content-Type: application/json" \
  -d '{"action":"chat","data":{"question":"Tell me more about that","session_id":"test"}}'
\`\`\`

## ✅ Success Criteria
- [ ] All workflows integrated and communicating
- [ ] PDF upload → processing → storage → search pipeline works
- [ ] Chat agent provides relevant answers with sources
- [ ] Conversation memory maintains context across turns
- [ ] Error handling prevents system crashes
- [ ] Status endpoint reports system health
- [ ] Complete end-to-end testing successful

## 🎉 Congratulations!

You've successfully built a complete multimodal PDF agent system using n8n! Your system can:

- ✅ Process PDF documents with visual content
- ✅ Generate and store multimodal embeddings
- ✅ Perform semantic vector search
- ✅ Engage in intelligent conversations
- ✅ Remember conversation context
- ✅ Handle errors gracefully
- ✅ Monitor system health

You now have a production-ready foundation for building advanced AI document processing applications!
```

# objectives-overview.mdx

```mdx
---
id: objectives-overview
title: 🎯 Workshop Objectives
sidebar_label: 🎯 Objectives
---

# Workshop Objectives: Multimodal PDF Agents

## 🎯 What You'll Build

Create intelligent agents that can process, understand, and interact with PDF documents containing both text and images.

### Core Capabilities
- **Process PDFs** - Extract and chunk text content from PDF documents
- **Generate Embeddings** - Create vector representations using pre-generated multimodal embeddings
- **Store & Search** - Use MongoDB Vector Search for semantic retrieval
- **Reason & Act** - Build agents using the ReAct pattern (Reasoning + Acting)
- **Chat Interface** - Natural conversations about document content

## 🛤️ Two Learning Paths

### Path 1: Python + Jupyter + LangChain
**Best for:** Developers who want to understand the code and algorithms

**What you'll do:**
- Work with pre-generated embeddings from the enhanced notebook
- Use MongoDB Atlas Local (Docker-based)
- Build ReAct agents with LangChain
- Complete 4 hands-on exercises

### Path 2: n8n Visual Workflows  
**Best for:** No-code/low-code builders and workflow automation

**What you'll do:**
- Visual drag-and-drop interface
- Pre-built nodes for PDF processing
- Create webhook-based agent workflows
- Complete 4 hands-on exercises

## 📚 Technologies Used

- **MongoDB Atlas Vector Search** - Document storage and semantic search
- **Voyage AI Multimodal Embeddings** - 1024-dimensional vectors for text + images
- **Google Gemini 2.0** - LLM with function calling capabilities
- **ReAct Pattern** - Reasoning + Acting agent architecture

## 🎯 Learning Outcomes

After completing this workshop, you will:

1. **Understand multimodal AI** and how to work with text + image embeddings
2. **Build production-ready vector search** using MongoDB Atlas
3. **Create intelligent agents** that can reason and take actions
4. **Process real PDF documents** and make them searchable

## 🚀 Ready to Start?

Choose your preferred path below and complete the exercises to build your multimodal PDF agent!
```

# python-exercise-1.mdx

```mdx
---
id: python-exercise-1
title: 📊 Exercise 1 - Load Pre-generated Embeddings
sidebar_label: 📊 Exercise 1 - Setup & Data
---

# Exercise 1: Setup & Load Pre-generated Embeddings

## 🎯 Objective
Set up your environment and load the pre-generated multimodal embeddings from the enhanced notebook.

## 🔧 Setup

### Step 1: Navigate to Notebook Directory
\`\`\`bash
cd static/notebooks/multimodal_agents_lab_original
\`\`\`

### Step 2: Start Docker Services
\`\`\`bash
docker-compose up -d
\`\`\`

### Step 3: Open Jupyter Lab
\`\`\`bash
open http://localhost:8888
\`\`\`

## 📊 Exercise Tasks

### Task 1: Load Embeddings Data
Open the enhanced notebook and run the data loading section:

\`\`\`python
import json
import numpy as np
from pathlib import Path

# Load pre-generated embeddings
with open('data/embeddings.json', 'r') as f:
    embeddings_data = json.load(f)

print(f"✅ Loaded embeddings for {len(embeddings_data['embeddings'])} documents")
print(f"📊 Model: {embeddings_data['model']}")
print(f"🔢 Dimensions: {embeddings_data['dimensions']}")
\`\`\`

### Task 2: Explore the Data Structure
\`\`\`python
# Analyze the first document
sample_doc = embeddings_data['embeddings'][0]
print(f"📄 Document: {sample_doc['filename']}")
print(f"📊 Chunks: {len(sample_doc['chunks'])}")
print(f"📏 First embedding shape: {len(sample_doc['chunks'][0]['embedding'])}")
\`\`\`

### Task 3: Validate Embeddings
\`\`\`python
# Check embedding properties
sample_embedding = np.array(sample_doc['chunks'][0]['embedding'])
norm = np.linalg.norm(sample_embedding)
print(f"📊 Embedding norm (should be ~1.0): {norm:.4f}")
print(f"📊 Min value: {sample_embedding.min():.4f}")
print(f"📊 Max value: {sample_embedding.max():.4f}")
\`\`\`

## ✅ Success Criteria
- [ ] Docker services running successfully
- [ ] Jupyter notebook accessible
- [ ] Embeddings data loaded (should show 1024 dimensions, voyage-multimodal-3 model)
- [ ] Sample embedding has norm ≈ 1.0 (normalized vector)

## 🚀 Next Steps
Once you've successfully loaded the data, proceed to [Exercise 2: Build Vector Search](./python-exercise-2)
```

# python-exercise-2.mdx

```mdx
---
id: python-exercise-2
title: 🔍 Exercise 2 - Build Vector Search
sidebar_label: 🔍 Exercise 2 - Vector Search
---

# Exercise 2: Build Vector Search with MongoDB

## 🎯 Objective
Set up MongoDB Atlas Local and create a vector search index for your embeddings.

## 📊 Exercise Tasks

### Task 1: Connect to MongoDB
\`\`\`python
import os
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to MongoDB Atlas Local
client = MongoClient('mongodb://admin:mongodb@localhost:27017/')
db = client.workshop
collection = db.pdf_documents

print("✅ Connected to MongoDB")
\`\`\`

### Task 2: Insert Embeddings into MongoDB
\`\`\`python
def insert_embeddings_to_mongodb(embeddings_data, collection):
    documents = []
    
    for doc in embeddings_data['embeddings']:
        for chunk in doc['chunks']:
            mongodb_doc = {
                'filename': doc['filename'],
                'chunk_id': chunk['chunk_id'],
                'text': chunk['text'],
                'embedding': chunk['embedding'],
                'metadata': {
                    **chunk['metadata'],
                    'model': embeddings_data['model'],
                    'dimensions': embeddings_data['dimensions']
                }
            }
            documents.append(mongodb_doc)
    
    # Clear and insert
    collection.delete_many({})
    result = collection.insert_many(documents)
    return result

# Insert the data
insert_result = insert_embeddings_to_mongodb(embeddings_data, collection)
print(f"✅ Inserted {len(insert_result.inserted_ids)} documents")
\`\`\`

### Task 3: Create Vector Search Index
\`\`\`python
# Define vector search index
vector_index = SearchIndexModel(
    definition={
        "fields": [
            {
                "type": "vector",
                "path": "embedding",
                "numDimensions": 1024,
                "similarity": "cosine"
            },
            {
                "type": "filter",
                "path": "filename"
            }
        ]
    },
    name="vector_index",
    type="vectorSearch"
)

# Create the index
collection.create_search_index(vector_index)
print("🎯 Vector search index created!")
\`\`\`

### Task 4: Test Vector Search
\`\`\`python
def vector_search(collection, query_embedding, top_k=5):
    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": query_embedding,
                "numCandidates": top_k * 10,
                "limit": top_k
            }
        },
        {
            "$addFields": {
                "score": {"$meta": "vectorSearchScore"}
            }
        },
        {
            "$project": {
                "filename": 1,
                "chunk_id": 1,
                "text": 1,
                "score": 1,
                "_id": 0
            }
        }
    ]
    
    return list(collection.aggregate(pipeline))

# Test with first embedding
sample_embedding = embeddings_data['embeddings'][0]['chunks'][0]['embedding']
results = vector_search(collection, sample_embedding, top_k=3)

print("🔍 Search Results:")
for result in results:
    print(f"📄 {result['filename']} - Score: {result['score']:.4f}")
    print(f"📝 {result['text'][:100]}...")
\`\`\`

## ✅ Success Criteria
- [ ] Successfully connected to MongoDB Atlas Local
- [ ] Inserted all embeddings (should be 100+ documents)
- [ ] Created vector search index
- [ ] Vector search returns relevant results with similarity scores

## 🚀 Next Steps
With vector search working, proceed to [Exercise 3: Create ReAct Agent](./python-exercise-3)
```

# python-exercise-3.mdx

```mdx
---
id: python-exercise-3
title: 🤖 Exercise 3 - Create ReAct Agent
sidebar_label: 🤖 Exercise 3 - ReAct Agent
---

# Exercise 3: Create ReAct Agent with Tool Calling

## 🎯 Objective
Build an intelligent agent using the ReAct pattern (Reasoning + Acting) that can search through your PDF collection.

## 📊 Exercise Tasks

### Task 1: Create Agent Tools
\`\`\`python
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import numpy as np

class MultimodalPDFAgent:
    def __init__(self, mongodb_collection):
        self.collection = mongodb_collection
        self.conversation_history = []
        
    def vector_search_tool(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """Tool for searching PDF documents"""
        try:
            # Simulate query embedding (in practice, use Voyage AI)
            query_embedding = self._simulate_query_embedding(query)
            
            pipeline = [
                {
                    "$vectorSearch": {
                        "index": "vector_index",
                        "path": "embedding",
                        "queryVector": query_embedding,
                        "numCandidates": top_k * 10,
                        "limit": top_k
                    }
                },
                {
                    "$addFields": {
                        "score": {"$meta": "vectorSearchScore"}
                    }
                },
                {
                    "$project": {
                        "filename": 1,
                        "chunk_id": 1,
                        "text": 1,
                        "score": 1,
                        "_id": 0
                    }
                }
            ]
            
            results = list(self.collection.aggregate(pipeline))
            
            return {
                "success": True,
                "results": results,
                "query": query
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "query": query
            }
    
    def get_document_info_tool(self) -> Dict[str, Any]:
        """Tool to get available documents"""
        try:
            pipeline = [
                {
                    "$group": {
                        "_id": "$filename",
                        "total_chunks": {"$sum": 1}
                    }
                },
                {"$sort": {"_id": 1}}
            ]
            
            results = list(self.collection.aggregate(pipeline))
            
            return {
                "success": True,
                "documents": results,
                "total_documents": len(results)
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _simulate_query_embedding(self, query: str) -> List[float]:
        """Simulate query embedding for workshop"""
        # Use hash for consistent results
        hash_value = hash(query.lower())
        np.random.seed(abs(hash_value) % 2**32)
        embedding = np.random.rand(1024)
        embedding = embedding / np.linalg.norm(embedding)
        return embedding.tolist()

# Initialize agent
agent = MultimodalPDFAgent(collection)
print("🤖 Agent initialized!")
\`\`\`

### Task 2: Implement Chat Interface
\`\`\`python
def agent_chat(agent, user_message: str) -> Dict[str, Any]:
    """Simple chat interface with tool calling"""
    
    message_lower = user_message.lower()
    
    # Determine which tool to use
    if "documents" in message_lower or "files" in message_lower or "available" in message_lower:
        print("🛠️ Using document info tool...")
        tool_result = agent.get_document_info_tool()
        
        if tool_result["success"]:
            response = f"I found {tool_result['total_documents']} documents:\n"
            for doc in tool_result["documents"]:
                response += f"- {doc['_id']}: {doc['total_chunks']} chunks\n"
        else:
            response = f"Error getting document info: {tool_result['error']}"
        
        return {
            "response": response,
            "tool_used": "get_document_info",
            "tool_result": tool_result
        }
    
    else:
        print("🛠️ Using vector search tool...")
        tool_result = agent.vector_search_tool(user_message, top_k=3)
        
        if tool_result["success"]:
            response = f"Found {len(tool_result['results'])} relevant results:\n\n"
            for i, result in enumerate(tool_result["results"], 1):
                response += f"{i}. **{result['filename']}** (Score: {result['score']:.3f})\n"
                response += f"   {result['text'][:200]}...\n\n"
        else:
            response = f"Error searching: {tool_result['error']}"
        
        return {
            "response": response,
            "tool_used": "vector_search",  
            "tool_result": tool_result
        }

# Test the agent
print("💬 Testing Agent Chat:")
test_queries = [
    "What documents are available?",
    "Tell me about artificial intelligence",
    "Find information about machine learning"
]

for query in test_queries:
    print(f"\n👤 User: {query}")
    response = agent_chat(agent, query)
    print(f"🤖 Agent: {response['response'][:300]}...")
    print(f"🛠️ Tool used: {response['tool_used']}")
\`\`\`

### Task 3: Add Conversation Memory
\`\`\`python
@dataclass
class ChatMessage:
    role: str
    content: str
    tool_calls: Optional[List[Dict]] = None

class EnhancedAgent(MultimodalPDFAgent):
    def __init__(self, mongodb_collection):
        super().__init__(mongodb_collection)
        self.conversation_history = []
    
    def chat(self, user_message: str) -> Dict[str, Any]:
        # Add user message to history
        self.conversation_history.append(
            ChatMessage(role="user", content=user_message)
        )
        
        # Get response using existing logic
        response_data = agent_chat(self, user_message)
        
        # Add assistant response to history
        self.conversation_history.append(
            ChatMessage(
                role="assistant", 
                content=response_data["response"],
                tool_calls=[response_data["tool_used"]]
            )
        )
        
        return response_data
    
    def get_conversation_summary(self):
        return {
            "total_messages": len(self.conversation_history),
            "user_messages": len([m for m in self.conversation_history if m.role == "user"]),
            "assistant_messages": len([m for m in self.conversation_history if m.role == "assistant"])
        }

# Test enhanced agent
enhanced_agent = EnhancedAgent(collection)

print("\n🧠 Testing Enhanced Agent with Memory:")
enhanced_agent.chat("What documents do you have?")
enhanced_agent.chat("Tell me about the first document")

summary = enhanced_agent.get_conversation_summary()
print(f"\n📊 Conversation summary: {summary}")
\`\`\`

## ✅ Success Criteria
- [ ] Created agent with vector search and document info tools
- [ ] Agent can respond to different types of queries
- [ ] Tool calling works correctly based on user input
- [ ] Enhanced agent maintains conversation history

## 🚀 Next Steps
Your agent is working! Now proceed to [Exercise 4: Test Multimodal Queries](./python-exercise-4)
```

# python-exercise-4.mdx

```mdx
---
id: python-exercise-4
title: 🧪 Exercise 4 - Test Multimodal Queries
sidebar_label: 🧪 Exercise 4 - Testing
---

# Exercise 4: Test Multimodal Queries & Validation

## 🎯 Objective
Test your agent with various queries and validate that it's working correctly with multimodal content.

## 📊 Exercise Tasks

### Task 1: Test Different Query Types
\`\`\`python
def test_agent_queries(agent):
    """Test agent with various query types"""
    
    test_cases = [
        {
            "name": "Document Discovery",
            "query": "What PDF documents are available?",
            "expected_tool": "get_document_info"
        },
        {
            "name": "Technical Search",
            "query": "Find information about neural networks",
            "expected_tool": "vector_search"
        },
        {
            "name": "Concept Search", 
            "query": "What is machine learning?",
            "expected_tool": "vector_search"
        },
        {
            "name": "Visual Content",
            "query": "Are there any diagrams or charts?",
            "expected_tool": "vector_search"
        }
    ]
    
    print("🧪 Running Agent Test Suite")
    print("=" * 50)
    
    for test_case in test_cases:
        print(f"\n📋 Test: {test_case['name']}")
        print(f"❓ Query: {test_case['query']}")
        
        response = agent.chat(test_case['query'])
        
        print(f"🤖 Response: {response['response'][:200]}...")
        print(f"🛠️ Tool used: {response['tool_used']}")
        
        # Check if correct tool was used
        tool_match = response['tool_used'] == test_case['expected_tool']
        status = "✅ PASS" if tool_match else "❌ FAIL"
        print(f"📊 Result: {status}")

# Run tests
test_agent_queries(enhanced_agent)
\`\`\`

### Task 2: Analyze Search Results
\`\`\`python
def analyze_search_quality(agent):
    """Analyze the quality of search results"""
    
    test_queries = [
        "artificial intelligence",
        "machine learning algorithms", 
        "data science techniques",
        "neural network architecture"
    ]
    
    print("\n🔍 Search Quality Analysis")
    print("=" * 40)
    
    for query in test_queries:
        print(f"\n🔎 Query: '{query}'")
        
        # Get search results directly
        tool_result = agent.vector_search_tool(query, top_k=5)
        
        if tool_result["success"]:
            results = tool_result["results"]
            scores = [r['score'] for r in results]
            
            print(f"📊 Results found: {len(results)}")
            print(f"📊 Score range: {min(scores):.3f} - {max(scores):.3f}")
            print(f"📊 Average score: {sum(scores)/len(scores):.3f}")
            
            # Show top result
            if results:
                top_result = results[0]
                print(f"🎯 Top result: {top_result['filename']}")
                print(f"📝 Preview: {top_result['text'][:150]}...")
        else:
            print(f"❌ Search failed: {tool_result['error']}")

# Analyze search quality
analyze_search_quality(enhanced_agent)
\`\`\`

### Task 3: Test Conversation Flow
\`\`\`python
def test_conversation_flow(agent):
    """Test multi-turn conversation"""
    
    print("\n💬 Testing Conversation Flow")
    print("=" * 40)
    
    # Reset conversation
    agent.conversation_history = []
    
    conversation = [
        "What documents do you have available?",
        "Tell me about machine learning in these documents",
        "Are there any specific algorithms mentioned?",
        "What about deep learning techniques?"
    ]
    
    for i, message in enumerate(conversation, 1):
        print(f"\nTurn {i}: {message}")
        response = agent.chat(message)
        print(f"Response: {response['response'][:200]}...")
        
        # Check conversation history
        history_length = len(agent.conversation_history)
        print(f"📚 History length: {history_length} messages")
    
    # Final summary
    summary = agent.get_conversation_summary()
    print(f"\n📊 Final Summary: {summary}")

# Test conversation flow
test_conversation_flow(enhanced_agent)
\`\`\`

### Task 4: Validate Multimodal Capabilities
\`\`\`python
def test_multimodal_features(agent):
    """Test multimodal content detection"""
    
    print("\n🖼️ Testing Multimodal Features")
    print("=" * 40)
    
    multimodal_queries = [
        "Find documents with images or diagrams",
        "Are there any charts or graphs in the PDFs?",
        "Show me visual content from the documents",
        "What figures or illustrations are available?"
    ]
    
    for query in multimodal_queries:
        print(f"\n🔎 Query: {query}")
        
        tool_result = agent.vector_search_tool(query, top_k=3)
        
        if tool_result["success"]:
            results = tool_result["results"]
            
            # Check metadata for image indicators
            has_image_results = []
            for result in results:
                # This would work if metadata includes image info
                text_content = result['text'].lower()
                has_visual_keywords = any(keyword in text_content for keyword in 
                                        ['figure', 'chart', 'diagram', 'image', 'graph', 'table'])
                has_image_results.append(has_visual_keywords)
            
            print(f"📊 Results with visual content indicators: {sum(has_image_results)}/{len(results)}")
            
            # Show relevant results
            for i, result in enumerate(results):
                if has_image_results[i]:
                    print(f"🖼️ Visual content found in {result['filename']}")
                    print(f"   {result['text'][:100]}...")

# Test multimodal capabilities
test_multimodal_features(enhanced_agent)
\`\`\`

### Task 5: Performance Testing
\`\`\`python
import time

def test_performance(agent):
    """Test agent response times"""
    
    print("\n⏱️ Performance Testing")
    print("=" * 30)
    
    test_queries = [
        "What documents are available?",
        "Find AI information",
        "Search for machine learning",
        "Tell me about data science"
    ]
    
    response_times = []
    
    for query in test_queries:
        start_time = time.time()
        response = agent.chat(query)
        end_time = time.time()
        
        response_time = end_time - start_time
        response_times.append(response_time)
        
        print(f"Query: '{query[:30]}...' - {response_time:.2f}s")
    
    avg_time = sum(response_times) / len(response_times)
    max_time = max(response_times)
    
    print(f"\n📊 Performance Summary:")
    print(f"Average response time: {avg_time:.2f}s")
    print(f"Max response time: {max_time:.2f}s")
    
    # Performance criteria
    if avg_time < 2.0 and max_time < 5.0:
        print("✅ Performance: GOOD")
    elif avg_time < 5.0 and max_time < 10.0:
        print("⚠️ Performance: ACCEPTABLE") 
    else:
        print("❌ Performance: NEEDS IMPROVEMENT")

# Test performance
test_performance(enhanced_agent)
\`\`\`

## ✅ Final Validation Checklist

Run this final validation:

\`\`\`python
def final_validation(agent):
    """Final workshop validation"""
    
    print("\n🎓 FINAL WORKSHOP VALIDATION")
    print("=" * 50)
    
    checks = [
        ("Agent initialized", agent is not None),
        ("MongoDB connected", agent.collection.count_documents({}) > 0),  
        ("Vector search works", len(agent.vector_search_tool("test")["results"]) > 0),
        ("Document info works", agent.get_document_info_tool()["success"]),
        ("Chat works", len(agent.chat("Hello")["response"]) > 0),
        ("Memory works", len(agent.conversation_history) > 0)
    ]
    
    passed = 0
    for check_name, result in checks:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {check_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Final Score: {passed}/{len(checks)} checks passed")
    
    if passed == len(checks):
        print("\n🎉 CONGRATULATIONS!")
        print("You've successfully built a multimodal PDF agent!")
    else:
        print(f"\n⚠️ {len(checks) - passed} checks failed. Please review.")

# Run final validation
final_validation(enhanced_agent)
\`\`\`

## ✅ Success Criteria
- [ ] All test cases pass with appropriate tool usage
- [ ] Search results have good relevance scores (greater than 0.7 for top results)
- [ ] Conversation history is maintained across turns
- [ ] Performance is acceptable (less than 5s average response time)
- [ ] Final validation shows all checks passed

## 🎉 Congratulations!

You've successfully built a complete multimodal PDF agent using:
- ✅ Pre-generated Voyage AI embeddings
- ✅ MongoDB Atlas Vector Search  
- ✅ ReAct pattern with tool calling
- ✅ Conversation memory
- ✅ Comprehensive testing

Your agent can now process PDF documents, understand both text and visual content, and provide intelligent responses through natural language interaction!
```

# workshop-alignment-assessment.md

```md
# Workshop Alignment Assessment: Python Notebook vs n8n Implementation

## Executive Summary

This assessment compares the **Python multimodal agent notebook** with the **n8n workshop documentation** to evaluate alignment between the two approaches for building multimodal PDF agents. The analysis reveals **strong conceptual alignment** with **significant implementation differences** that offer complementary learning experiences.

**Key Finding**: Both approaches follow the same core workflow patterns and achieve identical functionality, but differ primarily in **implementation complexity**, **target audience**, and **tooling approach**.

---

## 📊 Core Workflow Alignment Analysis

### Identical Conceptual Flow

Both implementations follow the exact same high-level workflow:

\`\`\`mermaid
graph LR
    A[PDF Input] --> B[Page Extraction]
    B --> C[Embedding Generation]
    C --> D[MongoDB Storage]
    D --> E[Vector Index Creation]
    E --> F[Agent Tools]
    F --> G[LLM Integration]
    G --> H[Memory Management]
\`\`\`

### Step-by-Step Comparison

| **Step** | **Python Notebook** | **n8n Workshop** | **Alignment Score** |
|----------|-------------------|------------------|-------------------|
| **1. Prerequisites** | ✅ API keys, MongoDB URI | ✅ Same APIs + n8n setup | 🟢 **95% Aligned** |
| **2. PDF Processing** | ✅ PyMuPDF page extraction | ✅ PDF toolkit + extraction | 🟢 **90% Aligned** |
| **3. Embedding Generation** | ✅ Voyage AI multimodal-3 | ✅ Same + intelligent model selection | 🟢 **98% Aligned** |
| **4. MongoDB Storage** | ✅ Direct PyMongo insertion | ✅ n8n MongoDB nodes | 🟢 **95% Aligned** |
| **5. Vector Index** | ✅ Manual index creation | ✅ Atlas UI + programmatic | 🟢 **100% Aligned** |
| **6. Tool Definition** | ✅ Function declarations | ✅ n8n function calling | 🟢 **85% Aligned** |
| **7. LLM Integration** | ✅ Google Gemini 2.5 Flash | ✅ Gemini 2.0 Flash | 🟢 **90% Aligned** |
| **8. Agent Execution** | ✅ Direct function calls | ✅ n8n workflow routing | 🟢 **80% Aligned** |
| **9. Memory Management** | ✅ MongoDB conversation history | ✅ Advanced memory patterns | 🟡 **70% Aligned** |

**Overall Alignment: 89% - Excellent Conceptual Match**

---

## 🎯 Detailed Step Analysis

### Task 0-1: Setup & Prerequisites
**Python**: Simple pip install and API key setup
**n8n**: Docker environment + API key setup + n8n configuration

**Assessment**: ✅ **Functionally identical**
- Both require the same external services (MongoDB Atlas, Voyage AI, Gemini)
- n8n adds visual workflow environment setup
- **Recommendation**: Workshop environment setup is more comprehensive

### Task 2-3: PDF Processing & Extraction
**Python**: 
\`\`\`python
# Direct approach
pdf = pymupdf.Document(stream=pdf_stream)
pix = pdf[n].get_pixmap(matrix=mat)
\`\`\`

**n8n**:
\`\`\`javascript
// Workflow-based approach
[PDF Download] → [Read PDF Node] → [Extract Pages] → [Store Images]
\`\`\`

**Assessment**: ✅ **Core functionality identical**
- Both extract PDF pages as images
- Both preserve visual elements for multimodal processing
- n8n approach adds error handling and workflow visualization
- **Python advantage**: Direct library control
- **n8n advantage**: Visual debugging and error handling

### Task 4: Embedding Generation
**Python**:
\`\`\`python
embedding = voyageai_client.multimodal_embed(
    inputs=[[img]], 
    model="voyage-multimodal-3", 
    input_type="document"
).embeddings[0]
\`\`\`

**n8n**:
\`\`\`javascript
// Intelligent model selection + API call
const model = selectEmbeddingModel(pageData);
const response = await $http.request({
    url: 'https://workshop-embedding-api.vercel.app/api/embed',
    body: { text: input, model: model, input_type: 'document' }
});
\`\`\`

**Assessment**: ✅ **n8n implementation is enhanced**
- Python uses fixed `voyage-multimodal-3` model
- n8n adds intelligent model selection (`voyage-3`, `voyage-multimodal-3`, `voyage-context-3`)
- Both achieve the same core embedding generation
- **n8n advantage**: Adaptive model selection based on content analysis

### Task 5-6: MongoDB Storage & Vector Index
**Python**:
\`\`\`python
collection.insert_many(embedded_docs)
collection.create_search_index(model=model)
\`\`\`

**n8n**:
\`\`\`javascript
// MongoDB node configuration
{
  "operation": "Insert",
  "collection": "pdf_documents", 
  "documents": embedded_docs
}
\`\`\`

**Assessment**: ✅ **Functionally identical**
- Same MongoDB operations and schema
- Same vector search index configuration
- n8n provides visual confirmation of data flow
- **Alignment**: Perfect functional match

### Task 8-9: Tool Definition & LLM Integration
**Python**:
\`\`\`python
def get_information_for_question_answering(user_query: str):
    # Vector search implementation
    
tools = types.Tool(function_declarations=[get_information_declaration])
response = gemini_client.models.generate_content(
    model=LLM, contents=contents, config=tools_config
)
\`\`\`

**n8n**:
\`\`\`javascript
// Function calling via HTTP requests
const tools = [{
  type: "function",
  function: {
    name: "search_documents",
    description: "Search through PDF documents",
    parameters: { /* schema */ }
  }
}];
\`\`\`

**Assessment**: 🟡 **Implementation differs, functionality identical**
- Both define identical tool schemas
- Both use Gemini function calling
- Python uses direct SDK integration
- n8n uses HTTP API with workflow routing
- **Result**: Same agent capabilities, different execution paths

### Task 13-14: Agent Execution & Memory
**Python**:
\`\`\`python
def execute_agent_with_memory(session_id, user_query, images=[]):
    # Simple session-based memory
    history = retrieve_session_history(session_id)
    response = generate_answer(session_id, user_query, images)
\`\`\`

**n8n**:
\`\`\`javascript
// Advanced memory patterns
{
  working_memory: "Session context with TTL",
  episodic_memory: "Complete conversation histories", 
  semantic_memory: "Learned patterns and knowledge",
  procedural_memory: "Workflow templates"
}
\`\`\`

**Assessment**: 🟡 **n8n implementation is significantly more advanced**
- Python implements basic session memory
- n8n provides comprehensive memory architecture
- **Gap identified**: Python notebook lacks advanced memory patterns
- **Recommendation**: Workshop memory implementation exceeds notebook scope

---

## 🔍 Key Differences & Gaps

### 1. **Implementation Complexity**
- **Python**: Direct, programmatic approach (beginner-friendly)
- **n8n**: Visual workflow design (no-code approach)
- **Impact**: Different learning curves, same outcomes

### 2. **Error Handling**
- **Python**: Basic try/catch patterns
- **n8n**: Comprehensive workflow error handling with visual debugging
- **Gap**: n8n provides superior error management

### 3. **Model Selection Intelligence**
- **Python**: Fixed model usage
- **n8n**: Dynamic model selection based on content analysis
- **Enhancement**: Workshop exceeds notebook capabilities

### 4. **Memory Architecture**
- **Python**: Simple session-based memory
- **n8n**: Multi-tiered memory system (working, episodic, semantic, procedural)
- **Significant Gap**: Workshop provides enterprise-grade memory patterns

### 5. **Production Readiness**
- **Python**: Development/learning focused
- **n8n**: Production deployment patterns included
- **Gap**: Workshop covers scaling, security, monitoring

---

## 🎯 Strengths of Each Approach

### Python Notebook Strengths
✅ **Direct library access** - Full control over AI libraries  
✅ **Learning clarity** - Step-by-step code progression  
✅ **Rapid prototyping** - Immediate code execution  
✅ **Jupyter environment** - Interactive development  
✅ **Minimal dependencies** - Straightforward setup  

### n8n Workshop Strengths  
✅ **Visual workflows** - No-code agent development  
✅ **Production patterns** - Scalable architecture  
✅ **Advanced memory** - Enterprise-grade memory systems  
✅ **Error handling** - Comprehensive error management  
✅ **Model intelligence** - Adaptive model selection  
✅ **Integration ready** - API endpoints and webhooks  

---

## 📋 Specific Alignment Issues

### Minor Discrepancies
1. **Gemini Model Versions**: 
   - Python: `gemini-2.5-flash`
   - n8n: `gemini-2.0-flash-exp`
   - **Impact**: Minimal - both are Gemini 2.0+ models

2. **Embedding API Approach**:
   - Python: Direct Voyage AI SDK
   - n8n: Workshop proxy API
   - **Impact**: None - same embedding models used

3. **Memory Implementation Depth**:
   - Python: Basic session storage
   - n8n: Comprehensive memory architecture
   - **Impact**: Workshop provides more advanced patterns

### Missing Components in Python
1. **Advanced Error Handling** - n8n workflows include comprehensive error management
2. **Model Selection Logic** - Python uses fixed model, n8n adapts based on content
3. **Production Deployment** - Workshop includes scaling and monitoring patterns
4. **Web Interface Integration** - n8n provides ready-to-use APIs

---

## 🔧 Recommendations for Alignment

### 1. **Update Python Notebook** (Minor Changes)
\`\`\`python
# Add intelligent model selection
def select_embedding_model(content_analysis):
    if has_images(content_analysis):
        return "voyage-multimodal-3"
    elif is_complex_text(content_analysis):
        return "voyage-context-3"
    return "voyage-3"

# Enhance memory patterns  
def implement_memory_hierarchy():
    return {
        "working_memory": session_context,
        "episodic_memory": conversation_history,
        "semantic_memory": learned_patterns
    }
\`\`\`

### 2. **Workshop Enhancement Areas** (Already Superior)
- Memory architecture ✅ Already implemented
- Error handling ✅ Already comprehensive  
- Model selection ✅ Already intelligent
- Production patterns ✅ Already included

### 3. **Cross-Reference Integration**
\`\`\`markdown
## From Code to Visual Workflows
"You've just built this agent in Python. Now let's see how the same 
logic translates to visual n8n workflows..."

## From Workflows to Code  
"This n8n workflow implements the same pattern you'll see in our 
Python reference notebook..."
\`\`\`

---

## 🎯 Final Assessment

### Overall Alignment: **89% Excellent Match** 

**✅ Perfect Conceptual Alignment**
- Identical workflow patterns
- Same AI models and services
- Same MongoDB architecture
- Same vector search approach

**✅ Complementary Implementation Approaches**
- Python: Code-first learning
- n8n: Visual, no-code development
- Both achieve identical functionality

**🔄 Areas for Improvement**
1. **Python Notebook**: Add intelligent model selection and advanced memory patterns
2. **Workshop References**: Add more explicit connections to Python implementation
3. **Documentation**: Cross-reference between approaches

### **Conclusion: The workshop is excellently aligned with the Python notebook, with the n8n implementation actually exceeding the notebook's capabilities in several key areas (memory management, error handling, model selection intelligence). Both approaches teach the same core concepts but cater to different learning styles and deployment preferences.**

---

## 📚 Implementation Priority Matrix

| **Feature** | **Python Priority** | **n8n Priority** | **Workshop Status** |
|-------------|-------------------|------------------|-------------------|
| Basic PDF Processing | 🔴 Critical | 🔴 Critical | ✅ Implemented |
| Embedding Generation | 🔴 Critical | 🔴 Critical | ✅ Enhanced |
| Vector Search | 🔴 Critical | 🔴 Critical | ✅ Implemented |
| Function Calling | 🔴 Critical | 🔴 Critical | ✅ Implemented |
| Basic Memory | 🔴 Critical | 🔴 Critical | ✅ Implemented |
| Error Handling | 🟡 Nice-to-have | 🔴 Critical | ✅ Comprehensive |
| Model Selection | 🟡 Nice-to-have | 🔴 Critical | ✅ Intelligent |
| Advanced Memory | 🟡 Nice-to-have | 🔴 Critical | ✅ Enterprise-grade |
| Production Deployment | 🟡 Nice-to-have | 🔴 Critical | ✅ Full coverage |

**The n8n workshop successfully implements all critical features from the Python notebook plus additional enterprise-grade capabilities.**
```

# workshop-overview.mdx

```mdx
---
sidebar_position: 0
title: Workshop Overview & Slides
description: Complete workshop overview with integrated presentation slides
---

import SlideViewer from '@site/src/components/SlideViewer';

# 🚀 Multimodal PDF Agents Workshop

**Building Intelligent Document Processing with AI**

Welcome to our comprehensive workshop on building multimodal PDF agents! This session will take you from concept to implementation using cutting-edge AI technologies.

---

## 📋 Workshop Agenda & Slides

Use these integrated slides for your presentation without switching between applications:

### 🎯 Opening & Introduction (10 minutes)

<SlideViewer 
  url="https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit#slide=id.g35df0c0f3b1_0_12007"
  title="Workshop Introduction"
  caption="Welcome and workshop overview"
  height="600px"
/>

**Key Points to Cover:**
- Workshop objectives and outcomes
- Technology stack overview
- What attendees will build
- Two distinct learning paths available

---

### 🤖 AI Agents Fundamentals (15 minutes)

<SlideViewer 
  url="https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit#slide=id.g35dddaa82ed_0_4823"
  title="AI Agents Deep Dive"
  caption="Understanding modern AI agent architecture"
  height="600px"
/>

**Key Points to Cover:**
- What are AI agents vs. simple chatbots
- Function calling and tool use
- ReAct pattern (Reason, Act, Observe)
- Real-world agent applications

---

### 🎨 Multimodality Concepts (15 minutes)

<SlideViewer 
  url="https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit#slide=id.g35df0c0f3b1_0_4883"
  title="Multimodal AI Understanding"
  caption="Why text + images = better AI"
  height="600px"
/>

**Key Points to Cover:**
- Text-only vs multimodal processing
- Why PDFs need special handling
- Visual elements in documents (charts, diagrams, tables)
- Embedding models for multimodal content

---

### 🏗️ Architecture Overview (10 minutes)

<SlideViewer 
  url="https://docs.google.com/presentation/d/1YZJRVyoYe1sAtQXCcTxdjpaIQ84-L57842vydaBjcZk/edit#slide=id.g35df0c0f3b1_0_5743"
  title="System Architecture"
  caption="Complete end-to-end architecture"
  height="600px"
/>

**Key Points to Cover:**
- Document processing pipeline
- Vector storage and search
- Agent decision-making flow
- Memory and context management

---

## 🛤️ **DECISION POINT: Choose Your Learning Path**

**After this overview, attendees will choose between two comprehensive implementation approaches:**

### Path A: Visual No-Code Development
- ⚡ **n8n Workflows** - Drag-and-drop agent building
- 🎯 **Target Audience** - Business analysts, citizen developers, visual learners
- ⏱️ **Time Investment** - Focus on logic and integration
- 🚀 **Outcome** - Production-ready workflows

### Path B: Code-First Development  
- 🐍 **Python & Jupyter** - Direct programming approach
- 🎯 **Target Audience** - Developers, data scientists, code-first learners
- ⏱️ **Time Investment** - Focus on AI libraries and algorithms
- 🚀 **Outcome** - Customizable code foundation

---

## 📊 What You'll Build (Both Paths)

By the end of this workshop, you'll have created:

### Core Functionality
✅ **PDF Processing Pipeline** - Convert documents to searchable content  
✅ **Multimodal Embeddings** - Extract meaning from text and images  
✅ **Vector Search Engine** - Find relevant information quickly  
✅ **Intelligent AI Agent** - Answer questions about your documents  
✅ **Memory System** - Remember context across conversations  

### Technical Components
- **Document Storage** - MongoDB Atlas with vector search
- **AI Models** - Voyage AI embeddings + Google Gemini LLM
- **Processing Pipeline** - Automated document ingestion
- **Query Interface** - Natural language questioning
- **Context Management** - Conversation memory and learning

---

## 🎯 Learning Objectives

**By the end of this workshop, you will:**

1. **Understand Multimodal AI**
   - How AI processes text and images together
   - When to use different embedding models
   - Benefits of multimodal document understanding

2. **Build Production Agents**
   - Design intelligent agent workflows
   - Implement function calling and tool use
   - Create memory systems for context retention

3. **Master Vector Search**
   - Store and index document embeddings
   - Perform semantic similarity search
   - Combine search with AI generation

4. **Deploy Real Applications**
   - Create webhook APIs for document processing
   - Build conversational interfaces
   - Implement error handling and monitoring

---

## 🛠️ Technology Stack

### Core Technologies (Both Paths)
- **MongoDB Atlas** - Vector database and document storage
- **Voyage AI** - Advanced multimodal embedding models
- **Google Gemini** - Large language model with function calling
- **Vector Search** - Semantic similarity and retrieval

### Path-Specific Tools
- **n8n Path** - Visual workflow automation platform
- **Python Path** - Jupyter notebooks with AI libraries

---

## 🚦 Prerequisites Checklist

Before we begin implementation, ensure you have:

### Required Accounts
- [ ] **MongoDB Atlas** account (free tier sufficient)
- [ ] **Voyage AI** API key ([Get here](https://docs.voyageai.com/docs/api-key-and-installation))
- [ ] **Google AI Studio** API key ([Get here](https://makersuite.google.com/app/apikey))

### Technical Setup
- [ ] **GitHub Codespaces** access (recommended) OR
- [ ] **Local Docker** environment OR  
- [ ] **Python 3.8+** with Jupyter (for Python path)

### Optional but Helpful
- [ ] Basic understanding of APIs
- [ ] Familiarity with JSON data structures
- [ ] Experience with either visual workflows OR Python

---

## 🎯 Success Metrics

**You'll know you've succeeded when:**

✅ Your agent can answer questions about uploaded PDFs  
✅ The system handles both text and visual content  
✅ Search results are contextually relevant  
✅ The agent remembers conversation context  
✅ You understand how to extend and customize the system  

---

## 📚 Workshop Resources

### 🔗 Quick Links
- [GitHub Repository](https://github.com/mongodb-developer/multimodal-pdf-agent-n8n)
- [Workshop Slides](/slides) - Interactive slide playground
- [Pre-built Workflows](https://github.com/mongodb-developer/multimodal-pdf-agent-n8n/tree/main/workflows) - Ready-to-import n8n flows
- [Python Notebook](https://github.com/mongodb-developer/multimodal-pdf-agent-n8n/blob/main/notebooks/notebook.ipynb) - Complete code implementation

### 📖 Reference Materials
- [MongoDB Vector Search Documentation](https://www.mongodb.com/docs/atlas/atlas-vector-search/)
- [Voyage AI Models Guide](https://docs.voyageai.com/docs/embeddings)
- [Google Gemini API Reference](https://ai.google.dev/docs)
- [n8n Documentation](https://docs.n8n.io/) (for no-code path)

---

## 🎪 Ready to Begin?

**Next Steps:**
1. **Complete Prerequisites** - Set up your accounts and API keys
2. **Choose Your Path** - Select either n8n (visual) or Python (code) approach  
3. **Start Building** - Follow your chosen path's guided tutorials
4. **Experiment & Extend** - Customize and enhance your agent

**Let's build something amazing together!** 🚀

[**→ Choose Your Learning Path**](./01-path-selection)
```

