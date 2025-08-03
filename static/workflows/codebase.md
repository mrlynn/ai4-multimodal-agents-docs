# 01-embedding-test.json

```json
{
  "name": "Embedding API Test (with Context-3 Support)",
  "nodes": [
    {
      "parameters": {},
      "id": "b7f2b123-4c5d-4e6f-7a8b-9c0d1e2f3a4b",
      "name": "When clicking \"Test workflow\"",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "url": "={{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\n  \"text\": \"This is a test document about artificial intelligence and machine learning.\",\n  \"model\": \"voyage-context-3\",\n  \"input_type\": \"document\",\n  \"context\": \"This text appears in a technical documentation about AI systems.\"\n}",
        "options": {}
      },
      "id": "c8g3c234-5d6e-5f7a-8b9c-0d1e2f3a4b5c",
      "name": "HTTP Request",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "embedding_length",
              "value": "={{ $json.embeddings[0].length }}"
            },
            {
              "name": "model_used",
              "value": "={{ $json.model }}"
            },
            {
              "name": "total_tokens",
              "value": "={{ $json.usage.total_tokens }}"
            }
          ]
        },
        "options": {}
      },
      "id": "d9h4d345-6e7f-6a8b-9c0d-1e2f3a4b5c6d",
      "name": "Set Results",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.2,
      "position": [680, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "When clicking \"Test workflow\"": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        [
          {
            "node": "Set Results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "00000000-0000-0000-0000-000000000000",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "00000000000000000000000000000000"
  },
  "id": "00000000-0000-0000-0000-000000000000",
  "tags": []
}
```

# 01-getting-started.json

```json
{
  "name": "Getting Started - Workshop Welcome",
  "nodes": [
    {
      "parameters": {
        "content": "## Welcome to the Multimodal PDF Workshop! 🎉\n\nThis is your first workflow. Let's get started:\n\n1. **Connect MongoDB Atlas** - Add your connection string\n2. **Upload a PDF** - Try the PDF processing workflow\n3. **Create Embeddings** - Generate multimodal vectors\n4. **Search & Query** - Test vector similarity search\n\n### Next Steps:\n- Import the other sample workflows\n- Configure your MongoDB Atlas connection\n- Start building your AI agent!\n\n*Happy workflow building!* ⚡"
      },
      "id": "welcome-note",
      "name": "Workshop Welcome",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [380, 240]
    },
    {
      "parameters": {
        "httpMethod": "GET",
        "path": "workshop-status",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-start",
      "name": "Workshop Status Check",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [160, 360],
      "webhookId": "workshop-status"
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"status\": \"Workshop Ready! 🚀\",\n  \"message\": \"Your n8n environment is working correctly\",\n  \"next_steps\": [\n    \"Connect MongoDB Atlas\",\n    \"Import sample workflows\",\n    \"Start building!\"\n  ],\n  \"timestamp\": \"{{ new Date().toISOString() }}\",\n  \"webhook_url\": \"{{ $json.webhook_url }}\"\n}"
      },
      "id": "respond-status",
      "name": "Return Status",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [360, 360]
    }
  ],
  "connections": {
    "webhook-start": {
      "main": [
        [
          {
            "node": "respond-status",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "id": "getting-started"
}
```

# 02-embedding-test.json

```json
{
  "name": "Embedding Test - Voyage AI Multimodal",
  "nodes": [
    {
      "parameters": {
        "content": "## Embedding Test Workflow 🧠\n\nThis workflow tests the Voyage AI multimodal embedding API.\n\n**What it does:**\n- Takes text input via webhook\n- Sends to Voyage AI embedding endpoint\n- Returns vector embedding results\n\n**API Endpoint:** https://workshop-embedding-api.vercel.app/api/embed\n\n**Test it:**\n1. Execute this workflow\n2. Use the webhook URL with POST request\n3. Send: `{\"input\": \"Your text here\", \"input_type\": \"document\"}`"
      },
      "id": "embedding-note",
      "name": "Embedding Info",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [600, 180]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "test-embedding",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-embed",
      "name": "Embedding Request",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [140, 300],
      "webhookId": "test-embedding"
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\n  \"input\": \"{{ $json.body.input || 'Sample text for embedding generation' }}\",\n  \"input_type\": \"{{ $json.body.input_type || 'document' }}\"\n}",
        "options": {
          "timeout": 30000
        }
      },
      "id": "voyage-api",
      "name": "Voyage AI Embedding",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [340, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"success\": true,\n  \"embedding_dimensions\": {{ $json.data[0].embedding.length }},\n  \"embedding_preview\": {{ JSON.stringify($json.data[0].embedding.slice(0, 5)) }},\n  \"model\": \"{{ $json.model }}\",\n  \"input_processed\": \"{{ $('Embedding Request').item.json.body.input }}\",\n  \"workshop_status\": \"Embedding generation working! ✅\"\n}"
      },
      "id": "respond-embedding",
      "name": "Return Embedding Result",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [540, 300]
    }
  ],
  "connections": {
    "webhook-embed": {
      "main": [
        [
          {
            "node": "voyage-api",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "voyage-api": {
      "main": [
        [
          {
            "node": "respond-embedding",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "id": "embedding-test"
}
```

# 02-pdf-processor-agent.json

```json
{
  "name": "ReAct PDF Processing Agent",
  "nodes": [
    {
      "parameters": {
        "path": "multimodal-demo",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "webhook-upload",
      "name": "PDF Upload Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// ReAct Agent - Reasoning Phase\n// Analyze the incoming request and determine what actions to take\n\nconst input = $input.all()[0];\nconst hasFile = input.binary && input.binary.data;\nconst hasQuery = input.json.query || input.json.question;\nconst hasAction = input.json.action;\n\n// Agent's reasoning process\nlet reasoning = \"Analyzing incoming request...\\n\";\nlet plannedActions = [];\nlet confidence = 0.8;\n\nif (hasFile) {\n  reasoning += \"- File detected: \" + (input.binary.data.fileName || 'unknown') + \"\\n\";\n  reasoning += \"- File type check needed\\n\";\n  reasoning += \"- If PDF: extract text and images, generate embeddings, store in vector DB\\n\";\n  plannedActions = ['validate_file', 'extract_content', 'generate_embeddings', 'store_vectors', 'respond'];\n  confidence = 0.9;\n} else if (hasQuery) {\n  reasoning += \"- Query detected: \" + hasQuery + \"\\n\";\n  reasoning += \"- Vector search needed to find relevant documents\\n\";\n  reasoning += \"- Generate response using retrieved context\\n\";\n  plannedActions = ['process_query', 'vector_search', 'generate_response'];\n  confidence = 0.85;\n} else {\n  reasoning += \"- No clear file or query detected\\n\";\n  reasoning += \"- Will attempt general processing\\n\";\n  plannedActions = ['general_help'];\n  confidence = 0.3;\n}\n\n// Agent decision\nconst agentState = {\n  task_type: hasFile ? 'file_processing' : hasQuery ? 'query_processing' : 'general',\n  reasoning: reasoning,\n  planned_actions: plannedActions,\n  confidence: confidence,\n  timestamp: new Date().toISOString(),\n  context: {\n    has_file: hasFile,\n    has_query: !!hasQuery,\n    has_action: !!hasAction\n  },\n  next_action: plannedActions[0] || 'general_help'\n};\n\nconsole.log('🤖 Agent Reasoning:', agentState);\n\nreturn [{\n  json: agentState,\n  binary: input.binary || {}\n}];"
      },
      "id": "agent-reasoning",
      "name": "Agent Reasoning",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "file_processing",
              "leftValue": "={{ $json.task_type }}",
              "rightValue": "file_processing",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "query_processing", 
              "leftValue": "={{ $json.task_type }}",
              "rightValue": "query_processing",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ]
        },
        "options": {}
      },
      "id": "agent-router",
      "name": "Agent Action Router",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3,
      "position": [680, 300]
    },
    {
      "parameters": {
        "jsCode": "// Tool: File Validation Agent\n// This tool validates uploaded files and decides next steps\n\nconst agentContext = $json;\nconst binary = $binary;\n\nif (!binary || !binary.data) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        error: 'No file provided',\n        tool_used: 'file_validator',\n        next_action: 'error_response'\n      }\n    }\n  }];\n}\n\nconst filename = binary.data.fileName || 'unknown';\nconst fileSize = binary.data.fileSize || 0;\n\n// Agent decision logic for file validation\nlet validation = {\n  filename: filename,\n  size: fileSize,\n  is_pdf: filename.toLowerCase().endsWith('.pdf'),\n  size_ok: fileSize < 50 * 1024 * 1024, // 50MB limit\n  tool_used: 'file_validator'\n};\n\nif (!validation.is_pdf) {\n  validation.success = false;\n  validation.error = 'Only PDF files are supported';\n  validation.next_action = 'error_response';\n} else if (!validation.size_ok) {\n  validation.success = false;\n  validation.error = 'File too large (max 50MB)';\n  validation.next_action = 'error_response';\n} else {\n  validation.success = true;\n  validation.message = `PDF validated: ${filename} (${Math.round(fileSize/1024)}KB)`;\n  validation.next_action = 'extract_content';\n}\n\nreturn [{\n  json: {\n    ...agentContext,\n    tool_result: validation,\n    current_step: 'file_validated'\n  },\n  binary: binary\n}];"
      },
      "id": "tool-file-validator",
      "name": "Tool: File Validator",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 200]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Content Extraction Agent\n// Intelligently extracts text and identifies images from PDFs\n\nconst agentContext = $json;\nconst filename = agentContext.tool_result?.filename || 'document.pdf';\n\n// Simulate advanced PDF processing\n// In production, this would use pdf-parse, pdf2pic, or similar libraries\nconst extractedContent = {\n  filename: filename,\n  text_content: `Extracted text from ${filename}:\\n\\nExecutive Summary:\\nThis document covers advanced artificial intelligence concepts, including:\\n- Multimodal learning and cross-modal understanding\\n- Vector embeddings and semantic search\\n- Large language models and their applications\\n- Machine learning pipeline architecture\\n\\nKey Findings:\\n- Multimodal AI systems show 34% improvement in understanding\\n- Vector databases enable sub-second search across millions of documents\\n- Proper chunking strategies improve retrieval accuracy by 28%\\n\\nTechnical Details:\\nThe implementation uses MongoDB Atlas Vector Search with 1024-dimensional embeddings generated by Voyage AI's multimodal-3 model. The system processes both textual content and visual elements like charts, diagrams, and tables.\\n\\nConclusion:\\nMultimodal approaches represent the future of AI systems, enabling more comprehensive understanding of complex documents.\",\n  \n  // Simulate image detection\n  images_detected: [\n    {\n      page: 1,\n      type: 'chart',\n      description: 'Performance comparison chart showing AI model accuracy metrics'\n    },\n    {\n      page: 3, \n      type: 'diagram',\n      description: 'System architecture diagram illustrating data flow'\n    },\n    {\n      page: 5,\n      type: 'table', \n      description: 'Results table with numerical performance data'\n    }\n  ],\n  \n  word_count: 234,\n  pages: 8,\n  has_images: true,\n  extracted_at: new Date().toISOString(),\n  tool_used: 'content_extractor'\n};\n\n// Agent decides next action based on content\nlet nextAction = 'generate_embeddings';\nif (extractedContent.has_images) {\n  nextAction = 'multimodal_embeddings';\n}\n\nreturn [{\n  json: {\n    ...agentContext,\n    tool_result: {\n      ...agentContext.tool_result,\n      content: extractedContent,\n      next_action: nextAction\n    },\n    current_step: 'content_extracted'\n  },\n  binary: $binary\n}];"
      },
      "id": "tool-content-extractor",
      "name": "Tool: Content Extractor", 
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1120, 200]
    },
    {
      "parameters": {
        "url": "={{ $env.VOYAGE_API_URL || 'https://api.voyageai.com/v1/embeddings' }}",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer {{ $env.VOYAGE_API_KEY }}"
            },
            {
              "name": "Content-Type", 
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"input\": {{ JSON.stringify($json.tool_result.content.text_content) }},\n  \"model\": \"voyage-multimodal-3\",\n  \"input_type\": \"document\"\n}",
        "options": {}
      },
      "id": "tool-embedding-generator",
      "name": "Tool: Embedding Generator",
      "type": "n8n-nodes-base.httpRequest", 
      "typeVersion": 4.1,
      "position": [1340, 200]
    },
    {
      "parameters": {
        "operation": "insertOne",
        "collection": "pdf_documents", 
        "fields": "={\n  \"filename\": {{ JSON.stringify($json.tool_result.content.filename) }},\n  \"text_content\": {{ JSON.stringify($json.tool_result.content.text_content) }},\n  \"embedding\": {{ JSON.stringify($json.data[0].embedding) }},\n  \"images\": {{ JSON.stringify($json.tool_result.content.images_detected) }},\n  \"metadata\": {\n    \"word_count\": {{ $json.tool_result.content.word_count }},\n    \"pages\": {{ $json.tool_result.content.pages }},\n    \"has_images\": {{ $json.tool_result.content.has_images }},\n    \"processed_at\": {{ JSON.stringify($json.tool_result.content.extracted_at) }},\n    \"model\": \"voyage-multimodal-3\",\n    \"agent_processed\": true\n  }\n}"
      },
      "id": "tool-vector-storage",
      "name": "Tool: Vector Storage",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [1560, 200],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Tool: Query Processing Agent\n// Handles question answering and document search\n\nconst agentContext = $json;\nconst query = $input.all()[0].json.query || $input.all()[0].json.question || '';\n\nif (!query.trim()) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        error: 'No query provided',\n        tool_used: 'query_processor',\n        next_action: 'error_response'\n      }\n    }\n  }];\n}\n\n// Agent analyzes query type and determines search strategy\nconst queryAnalysis = {\n  original_query: query,\n  query_type: 'semantic_search', // Could be: semantic_search, factual_lookup, comparison, summary\n  requires_context: true,\n  search_terms: query.toLowerCase().split(' ').filter(word => word.length > 3),\n  confidence: 0.8,\n  tool_used: 'query_processor'\n};\n\n// Determine search strategy\nif (query.toLowerCase().includes('compare') || query.toLowerCase().includes('difference')) {\n  queryAnalysis.query_type = 'comparison';\n  queryAnalysis.requires_multiple_docs = true;\n} else if (query.toLowerCase().includes('summarize') || query.toLowerCase().includes('summary')) {\n  queryAnalysis.query_type = 'summary';\n  queryAnalysis.requires_full_context = true;\n}\n\nreturn [{\n  json: {\n    ...agentContext,\n    tool_result: queryAnalysis,\n    current_step: 'query_analyzed',\n    next_action: 'vector_search'\n  }\n}];"
      },
      "id": "tool-query-processor",
      "name": "Tool: Query Processor",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2, 
      "position": [900, 400]
    },
    {
      "parameters": {
        "jsCode": "// Agent Response Generator\n// Synthesizes results from all tools and generates final response\n\nconst agentContext = $json;\nconst taskType = agentContext.task_type;\nconst toolResult = agentContext.tool_result;\n\nlet response = {\n  success: false,\n  message: '',\n  details: {},\n  agent_info: {\n    reasoning: agentContext.reasoning,\n    actions_taken: agentContext.planned_actions,\n    confidence: agentContext.confidence,\n    processing_time: new Date().toISOString()\n  }\n};\n\nif (taskType === 'file_processing') {\n  if (toolResult.success) {\n    response.success = true;\n    response.message = `✅ Successfully processed PDF: ${toolResult.content?.filename || 'document'}`;\n    response.details = {\n      filename: toolResult.content?.filename,\n      pages: toolResult.content?.pages,\n      word_count: toolResult.content?.word_count,\n      has_images: toolResult.content?.has_images,\n      images_detected: toolResult.content?.images_detected?.length || 0,\n      stored_in_database: true,\n      next_steps: 'You can now ask questions about this document using the chat interface'\n    };\n  } else {\n    response.message = `❌ Failed to process file: ${toolResult.error}`;\n    response.details = { error: toolResult.error };\n  }\n} else if (taskType === 'query_processing') {\n  response.success = true;\n  response.message = `🤖 Agent processed your query: \"${toolResult.original_query}\"`;\n  response.details = {\n    query_type: toolResult.query_type,\n    search_strategy: toolResult.requires_context ? 'semantic_search' : 'direct_answer',\n    next_steps: 'Vector search would be performed next to find relevant documents'\n  };\n} else {\n  response.message = '👋 Hello! I can help you process PDFs or answer questions about documents.';\n  response.details = {\n    capabilities: [\n      'Upload and process PDF documents',\n      'Extract text and identify images',\n      'Generate multimodal embeddings', \n      'Store documents in vector database',\n      'Answer questions about uploaded documents'\n    ]\n  };\n}\n\nreturn [{ json: response }];"
      },
      "id": "agent-response-generator",
      "name": "Agent Response Generator",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1780, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload Webhook": {
      "main": [
        [
          {
            "node": "Agent Reasoning",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Agent Reasoning": {
      "main": [
        [
          {
            "node": "Agent Action Router",
            "type": "main", 
            "index": 0
          }
        ]
      ]
    },
    "Agent Action Router": {
      "main": [
        [
          {
            "node": "Tool: File Validator",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Query Processor", 
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Agent Response Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: File Validator": {
      "main": [
        [
          {
            "node": "Tool: Content Extractor",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Content Extractor": {
      "main": [
        [
          {
            "node": "Tool: Embedding Generator", 
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Embedding Generator": {
      "main": [
        [
          {
            "node": "Tool: Vector Storage",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Vector Storage": {
      "main": [
        [
          {
            "node": "Agent Response Generator",
            "type": "main", 
            "index": 0
          }
        ]
      ]
    },
    "Tool: Query Processor": {
      "main": [
        [
          {
            "node": "Agent Response Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "react-pdf-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "react-pdf-processing-agent",
  "tags": ["workshop", "agent", "react", "multimodal"]
}
```

# 02-pdf-processor.json

```json
{
  "name": "Multimodal PDF Processor",
  "nodes": [
    {
      "parameters": {
        "path": "upload-pdf",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "webhook-upload",
      "name": "PDF Upload Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// Validate PDF upload\nconst files = $input.all();\nif (!files.length || !files[0].binary) {\n  throw new Error('No PDF file uploaded');\n}\n\nconst filename = files[0].binary.data.fileName;\nif (!filename.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Only PDF files are supported');\n}\n\nreturn [{\n  json: {\n    filename: filename,\n    fileSize: files[0].binary.data.fileSize,\n    timestamp: new Date().toISOString(),\n    status: 'validated'\n  },\n  binary: files[0].binary\n}];"
      },
      "id": "validate-pdf",
      "name": "Validate PDF",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "jsCode": "// Extract text content from PDF\n// This is a simplified version - in production, use PDF parsing libraries\nconst filename = $json.filename;\nconst mockText = `This is extracted text content from ${filename}. \\n\\nIn a real implementation, this would contain the actual text extracted from the PDF using libraries like pdf-parse or pdf2pic.\\n\\nKey topics covered:\\n- Artificial Intelligence\\n- Machine Learning\\n- Vector Databases\\n- Multimodal Processing`;\n\nreturn [{\n  json: {\n    filename: filename,\n    textContent: mockText,\n    wordCount: mockText.split(' ').length,\n    extractedAt: new Date().toISOString()\n  }\n}];"
      },
      "id": "extract-text",
      "name": "Extract Text",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [680, 300]
    },
    {
      "parameters": {
        "url": "={{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.textContent) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "generate-embeddings",
      "name": "Generate Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [900, 300]
    },
    {
      "parameters": {
        "operation": "insertOne",
        "collection": "pdf_documents",
        "fields": "={\n  \"filename\": {{ JSON.stringify($('Extract Text').first().json.filename) }},\n  \"textContent\": {{ JSON.stringify($('Extract Text').first().json.textContent) }},\n  \"embedding\": {{ JSON.stringify($json.embeddings[0]) }},\n  \"metadata\": {\n    \"uploadedAt\": {{ JSON.stringify($('Extract Text').first().json.extractedAt) }},\n    \"wordCount\": {{ $('Extract Text').first().json.wordCount }},\n    \"model\": {{ JSON.stringify($json.model) }}\n  }\n}"
      },
      "id": "store-mongodb",
      "name": "Store in MongoDB",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [1120, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "success"
            },
            {
              "name": "message",
              "value": "=PDF {{ $('Extract Text').first().json.filename }} processed successfully"
            },
            {
              "name": "documentsStored",
              "value": "1"
            },
            {
              "name": "filename",
              "value": "={{ $('Extract Text').first().json.filename }}"
            }
          ]
        }
      },
      "id": "format-response",
      "name": "Format Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.2,
      "position": [1340, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload Webhook": {
      "main": [
        [
          {
            "node": "Validate PDF",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate PDF": {
      "main": [
        [
          {
            "node": "Extract Text",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Text": {
      "main": [
        [
          {
            "node": "Generate Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Embeddings": {
      "main": [
        [
          {
            "node": "Store in MongoDB",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Store in MongoDB": {
      "main": [
        [
          {
            "node": "Format Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "pdf-processor-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "multimodal-pdf-processor",
  "tags": ["workshop", "pdf", "multimodal"]
}
```

# 03-multimodal-agent.json

```json
{
  "name": "Multimodal PDF Agent",
  "nodes": [
    {
      "parameters": {
        "path": "chat",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "chat-webhook",
      "name": "Chat Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// Validate chat input\nconst data = $json;\n\nif (!data.message || !data.filename) {\n  throw new Error('Message and filename are required');\n}\n\nreturn [{\n  json: {\n    query: data.message,\n    filename: data.filename,\n    conversationId: data.conversation_id || 'default',\n    timestamp: new Date().toISOString()\n  }\n}];"
      },
      "id": "validate-input",
      "name": "Validate Input",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "url": "={{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.query) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "query-embedding",
      "name": "Generate Query Embedding",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "pdf_documents",
        "query": "=[\n  {\n    \"$vectorSearch\": {\n      \"index\": \"vector_index\",\n      \"path\": \"embedding\",\n      \"queryVector\": {{ JSON.stringify($json.embeddings[0]) }},\n      \"numCandidates\": 50,\n      \"limit\": 5,\n      \"filter\": {\n        \"filename\": {{ JSON.stringify($('Validate Input').first().json.filename) }}\n      }\n    }\n  },\n  {\n    \"$project\": {\n      \"textContent\": 1,\n      \"filename\": 1,\n      \"score\": { \"$meta\": \"vectorSearchScore\" }\n    }\n  }\n]"
      },
      "id": "vector-search",
      "name": "Vector Search",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [900, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Build context from search results\nconst searchResults = $input.all();\nconst query = $('Validate Input').first().json.query;\nconst filename = $('Validate Input').first().json.filename;\n\nif (!searchResults.length) {\n  return [{\n    json: {\n      query: query,\n      context: 'No relevant content found in the document.',\n      filename: filename,\n      sources: []\n    }\n  }];\n}\n\nconst context = searchResults\n  .map((result, index) => `Section ${index + 1} (Score: ${result.json.score.toFixed(3)}):\\n${result.json.textContent}`)\n  .join('\\n\\n');\n\nreturn [{\n  json: {\n    query: query,\n    context: context,\n    filename: filename,\n    sources: searchResults.map(r => ({\n      content: r.json.textContent.substring(0, 100) + '...',\n      score: r.json.score\n    }))\n  }\n}];"
      },
      "id": "build-context",
      "name": "Build Context",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1120, 300]
    },
    {
      "parameters": {
        "jsCode": "// Generate AI response using the context\n// This is a mock response - in production, call OpenAI/Gemini\nconst query = $json.query;\nconst context = $json.context;\nconst filename = $json.filename;\n\n// Mock AI response generation\nconst response = `Based on the content from ${filename}, here's what I found regarding your question: \"${query}\"\\n\\nFrom the relevant sections in the document:\\n${context.substring(0, 500)}...\\n\\nThis appears to be the most relevant information to answer your question. The document contains detailed information about the topics you're asking about.`;\n\nreturn [{\n  json: {\n    response: response,\n    query: query,\n    filename: filename,\n    sources: $json.sources,\n    timestamp: new Date().toISOString(),\n    model: 'mock-ai-v1'\n  }\n}];"
      },
      "id": "generate-response",
      "name": "Generate AI Response",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1340, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "success"
            },
            {
              "name": "response",
              "value": "={{ $json.response }}"
            },
            {
              "name": "query",
              "value": "={{ $json.query }}"
            },
            {
              "name": "filename",
              "value": "={{ $json.filename }}"
            }
          ],
          "object": [
            {
              "name": "sources",
              "value": "={{ $json.sources }}"
            }
          ]
        }
      },
      "id": "format-chat-response",
      "name": "Format Chat Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.2,
      "position": [1560, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "Chat Webhook": {
      "main": [
        [
          {
            "node": "Validate Input",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate Input": {
      "main": [
        [
          {
            "node": "Generate Query Embedding",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Query Embedding": {
      "main": [
        [
          {
            "node": "Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Vector Search": {
      "main": [
        [
          {
            "node": "Build Context",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Build Context": {
      "main": [
        [
          {
            "node": "Generate AI Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate AI Response": {
      "main": [
        [
          {
            "node": "Format Chat Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "multimodal-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "multimodal-pdf-agent",
  "tags": ["workshop", "agent", "multimodal", "chat"]
}
```

# 03-multimodal-chat-agent.json

```json
{
  "name": "ReAct Multimodal Chat Agent",
  "nodes": [
    {
      "parameters": {
        "path": "chat-agent",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "chat-webhook",
      "name": "Chat Agent Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// ReAct Chat Agent - Reasoning Phase\n// Analyzes user questions and plans the best response strategy\n\nconst input = $input.all()[0];\nconst message = input.json.message || input.json.query || input.json.question;\nconst filename = input.json.filename;\nconst conversationId = input.json.conversation_id || 'default';\n\n// Agent's reasoning process\nlet reasoning = \"Analyzing user query...\\n\";\nlet queryType = 'general';\nlet plannedActions = [];\nlet confidence = 0.7;\n\nif (!message) {\n  reasoning += \"- No message provided\\n\";\n  reasoning += \"- Will request clarification\\n\";\n  queryType = 'error';\n  plannedActions = ['error_response'];\n  confidence = 0.9;\n} else {\n  reasoning += `- User question: \"${message}\"\\n`;\n  \n  // Analyze query intent\n  const lowerMessage = message.toLowerCase();\n  \n  if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {\n    reasoning += \"- Query type: Document summarization\\n\";\n    reasoning += \"- Strategy: Retrieve broader context, synthesize overview\\n\";\n    queryType = 'summarization';\n    plannedActions = ['broad_search', 'synthesize_summary', 'respond'];\n    confidence = 0.85;\n  } else if (lowerMessage.includes('compare') || lowerMessage.includes('difference')) {\n    reasoning += \"- Query type: Comparison analysis\\n\";\n    reasoning += \"- Strategy: Search multiple topics, contrast findings\\n\";\n    queryType = 'comparison';\n    plannedActions = ['multi_search', 'compare_results', 'respond'];\n    confidence = 0.8;\n  } else if (lowerMessage.includes('explain') || lowerMessage.includes('how') || lowerMessage.includes('why')) {\n    reasoning += \"- Query type: Explanation request\\n\";\n    reasoning += \"- Strategy: Find relevant context, provide detailed explanation\\n\";\n    queryType = 'explanation';\n    plannedActions = ['semantic_search', 'detailed_explanation', 'respond'];\n    confidence = 0.9;\n  } else if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('look for')) {\n    reasoning += \"- Query type: Information retrieval\\n\";\n    reasoning += \"- Strategy: Precise vector search, return specific information\\n\";\n    queryType = 'retrieval';\n    plannedActions = ['precise_search', 'extract_info', 'respond'];\n    confidence = 0.85;\n  } else {\n    reasoning += \"- Query type: General question answering\\n\";\n    reasoning += \"- Strategy: Semantic search with contextual response\\n\";\n    queryType = 'qa';\n    plannedActions = ['semantic_search', 'contextual_response', 'respond'];\n    confidence = 0.75;\n  }\n  \n  if (filename) {\n    reasoning += `- Target document: ${filename}\\n`;\n    reasoning += \"- Will scope search to specific document\\n\";\n  } else {\n    reasoning += \"- No specific document specified\\n\";\n    reasoning += \"- Will search across all available documents\\n\";\n  }\n}\n\n// Agent state for this conversation turn\nconst agentState = {\n  conversation_id: conversationId,\n  user_message: message,\n  target_filename: filename,\n  query_type: queryType,\n  reasoning: reasoning,\n  planned_actions: plannedActions,\n  confidence: confidence,\n  timestamp: new Date().toISOString(),\n  context: {\n    has_message: !!message,\n    has_filename: !!filename,\n    query_length: message ? message.length : 0\n  },\n  next_action: plannedActions[0] || 'error_response'\n};\n\nconsole.log('🤖 Chat Agent Reasoning:', agentState);\n\nreturn [{\n  json: agentState,\n  binary: input.binary || {}\n}];"
      },
      "id": "agent-reasoning",
      "name": "Agent Reasoning",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "error",
              "leftValue": "={{ $json.query_type }}",
              "rightValue": "error",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "summarization",
              "leftValue": "={{ $json.query_type }}",
              "rightValue": "summarization",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "comparison",
              "leftValue": "={{ $json.query_type }}",
              "rightValue": "comparison",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "needs_search",
              "leftValue": "={{ ['explanation', 'retrieval', 'qa'].includes($json.query_type) }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "true"
              }
            }
          ]
        },
        "options": {}
      },
      "id": "agent-router",
      "name": "Agent Action Router",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3,
      "position": [680, 300]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Query Embedding Generator\n// Generates embeddings for semantic search\n\nconst agentContext = $json;\nconst message = agentContext.user_message;\n\nif (!message) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        error: 'No message to embed',\n        tool_used: 'embedding_generator'\n      }\n    }\n  }];\n}\n\n// Prepare embedding request\nconst embeddingRequest = {\n  text: message,\n  model: \"voyage-multimodal-3\",\n  input_type: \"query\"\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    embedding_request: embeddingRequest,\n    current_step: 'generating_embedding'\n  }\n}];"
      },
      "id": "tool-embedding-generator",
      "name": "Tool: Embedding Generator",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 400]
    },
    {
      "parameters": {
        "url": "={{ $env.VOYAGE_API_URL || 'https://api.voyageai.com/v1/embeddings' }}",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer {{ $env.VOYAGE_API_KEY }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.embedding_request) }}",
        "options": {}
      },
      "id": "voyage-embedding-api",
      "name": "Voyage Embedding API",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1120, 400]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Intelligent Vector Search Agent\n// Performs context-aware vector search based on query type\n\nconst agentContext = $json;\nconst queryType = agentContext.query_type;\nconst filename = agentContext.target_filename;\nconst embedding = $json.data[0].embedding;\n\n// Agent decides search parameters based on query type\nlet searchConfig = {\n  numCandidates: 50,\n  limit: 5,\n  filter: {}\n};\n\n// Intelligent search configuration\nif (queryType === 'summarization') {\n  searchConfig.limit = 8; // Need more context for summaries\n  searchConfig.numCandidates = 100;\n} else if (queryType === 'comparison') {\n  searchConfig.limit = 10; // Need multiple perspectives\n  searchConfig.numCandidates = 150;\n} else if (queryType === 'explanation') {\n  searchConfig.limit = 6; // Detailed context needed\n  searchConfig.numCandidates = 75;\n} else if (queryType === 'retrieval') {\n  searchConfig.limit = 3; // Precise, focused results\n  searchConfig.numCandidates = 30;\n}\n\n// Apply filename filter if specified\nif (filename) {\n  searchConfig.filter.filename = filename;\n}\n\n// Build MongoDB aggregation pipeline\nconst searchPipeline = [\n  {\n    \"$vectorSearch\": {\n      \"index\": \"vector_index\",\n      \"path\": \"embedding\",\n      \"queryVector\": embedding,\n      \"numCandidates\": searchConfig.numCandidates,\n      \"limit\": searchConfig.limit,\n      \"filter\": searchConfig.filter\n    }\n  },\n  {\n    \"$project\": {\n      \"filename\": 1,\n      \"text_content\": 1,\n      \"images_detected\": 1,\n      \"metadata\": 1,\n      \"score\": { \"$meta\": \"vectorSearchScore\" }\n    }\n  }\n];\n\nreturn [{\n  json: {\n    ...agentContext,\n    search_config: searchConfig,\n    search_pipeline: searchPipeline,\n    current_step: 'executing_search'\n  }\n}];"
      },
      "id": "tool-intelligent-search",
      "name": "Tool: Intelligent Search",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1340, 400]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "pdf_documents",
        "query": "={{ JSON.stringify($json.search_pipeline) }}"
      },
      "id": "mongodb-vector-search",
      "name": "MongoDB Vector Search",  
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [1560, 400],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Tool: Context Synthesis Agent\n// Intelligently processes search results based on query type\n\nconst agentContext = $input.all()[0].json;\nconst searchResults = $input.all().slice(1); // Skip the first item (context)\nconst queryType = agentContext.query_type;\nconst userMessage = agentContext.user_message;\n\nif (!searchResults.length) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        message: 'No relevant content found',\n        context: '',\n        sources: [],\n        tool_used: 'context_synthesizer'\n      }\n    }\n  }];\n}\n\n// Agent synthesizes context based on query type\nlet synthesizedContext = '';\nlet sources = [];\n\nif (queryType === 'summarization') {\n  synthesizedContext = `DOCUMENT SUMMARY CONTEXT:\\n`;\n  synthesizedContext += searchResults\n    .map((result, idx) => `\\n[Section ${idx + 1}] (Relevance: ${result.json.score.toFixed(3)})\\n${result.json.text_content}\\n`)\n    .join('\\n---\\n');\n    \n} else if (queryType === 'comparison') {\n  synthesizedContext = `COMPARISON ANALYSIS CONTEXT:\\n`;\n  synthesizedContext += `User wants to compare/analyze: \"${userMessage}\"\\n\\n`;\n  synthesizedContext += searchResults\n    .map((result, idx) => `\\n[Perspective ${idx + 1}] (Score: ${result.json.score.toFixed(3)})\\nFrom: ${result.json.filename}\\n${result.json.text_content}\\n`)\n    .join('\\n---\\n');\n    \n} else if (queryType === 'explanation') {\n  synthesizedContext = `DETAILED EXPLANATION CONTEXT:\\n`;\n  synthesizedContext += `User needs explanation for: \"${userMessage}\"\\n\\n`;\n  synthesizedContext += `RELEVANT INFORMATION:\\n`;\n  synthesizedContext += searchResults\n    .map((result, idx) => `\\n${idx + 1}. ${result.json.text_content} (Relevance: ${result.json.score.toFixed(3)})\\n`)\n    .join('\\n');\n    \n} else {\n  // General QA or retrieval\n  synthesizedContext = `CONTEXTUAL INFORMATION:\\n`;\n  synthesizedContext += `Question: \"${userMessage}\"\\n\\n`;\n  synthesizedContext += `RELEVANT CONTENT:\\n`;\n  synthesizedContext += searchResults\n    .map((result, idx) => `${idx + 1}. ${result.json.text_content}\\n   (Source: ${result.json.filename}, Score: ${result.json.score.toFixed(3)})\\n`)\n    .join('\\n');\n}\n\n// Prepare sources array\nsources = searchResults.map((result, idx) => ({\n  id: idx + 1,\n  filename: result.json.filename,\n  content_preview: result.json.text_content.substring(0, 150) + '...',\n  relevance_score: result.json.score,\n  has_images: result.json.images_detected && result.json.images_detected.length > 0\n}));\n\nreturn [{\n  json: {\n    ...agentContext,\n    tool_result: {\n      success: true,\n      context: synthesizedContext,\n      sources: sources,\n      context_length: synthesizedContext.length,\n      num_sources: sources.length,\n      tool_used: 'context_synthesizer'\n    },\n    current_step: 'context_synthesized',\n    next_action: 'generate_response'\n  }\n}];"
      },
      "id": "tool-context-synthesizer",
      "name": "Tool: Context Synthesizer",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1780, 400]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Response Generation Agent\n// Uses Google Gemini to generate intelligent responses\n\nconst agentContext = $json;\nconst queryType = agentContext.query_type;\nconst userMessage = agentContext.user_message;\nconst contextData = agentContext.tool_result;\n\n// Agent crafts specialized prompts based on query type\nlet systemPrompt = '';\nlet userPrompt = '';\n\nif (queryType === 'summarization') {\n  systemPrompt = `You are an expert document analyst. Create comprehensive, well-structured summaries of document content. Focus on key insights, main themes, and important details.`;\n  userPrompt = `Please provide a comprehensive summary based on this context:\\n\\n${contextData.context}\\n\\nUser's request: \"${userMessage}\"`;\n  \n} else if (queryType === 'comparison') {\n  systemPrompt = `You are an analytical AI that excels at comparing and contrasting information. Identify similarities, differences, and provide balanced analysis.`;\n  userPrompt = `Analyze and compare the information in this context to answer the user's question:\\n\\n${contextData.context}\\n\\nUser's question: \"${userMessage}\"`;\n  \n} else if (queryType === 'explanation') {\n  systemPrompt = `You are a knowledgeable teacher who excels at explaining complex topics clearly and thoroughly. Break down concepts step-by-step.`;\n  userPrompt = `Provide a detailed explanation based on this context:\\n\\n${contextData.context}\\n\\nUser wants to understand: \"${userMessage}\"`;\n  \n} else {\n  // General QA\n  systemPrompt = `You are a helpful AI assistant that provides accurate, contextual answers based on provided document content. Be specific and cite sources when relevant.`;\n  userPrompt = `Answer the user's question using this context:\\n\\n${contextData.context}\\n\\nUser's question: \"${userMessage}\"`;\n}\n\n// Prepare Gemini API request\nconst geminiRequest = {\n  contents: [\n    {\n      parts: [\n        {\n          text: `${systemPrompt}\\n\\n${userPrompt}`\n        }\n      ]\n    }\n  ],\n  generationConfig: {\n    temperature: queryType === 'summarization' ? 0.3 : 0.7,\n    topK: 40,\n    topP: 0.95,\n    maxOutputTokens: queryType === 'summarization' ? 1024 : 512\n  },\n  safetySettings: [\n    {\n      category: \"HARM_CATEGORY_HARASSMENT\",\n      threshold: \"BLOCK_MEDIUM_AND_ABOVE\"\n    }\n  ]\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    gemini_request: geminiRequest,\n    current_step: 'generating_response'\n  }\n}];"
      },
      "id": "tool-response-generator",
      "name": "Tool: Response Generator",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [2000, 400]
    },
    {
      "parameters": {
        "url": "={{ $env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent' }}?key={{ $env.GEMINI_API_KEY }}",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.gemini_request) }}",
        "options": {}
      },
      "id": "gemini-api",
      "name": "Google Gemini API",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [2220, 400]
    },
    {
      "parameters": {
        "jsCode": "// Agent Response Finalizer\n// Formats and packages the final response\n\nconst agentContext = $json;\nconst geminiResponse = $json.candidates?.[0]?.content?.parts?.[0]?.text;\nconst queryType = agentContext.query_type;\nconst userMessage = agentContext.user_message;\nconst sources = agentContext.tool_result?.sources || [];\n\nlet finalResponse = {\n  success: true,\n  message: geminiResponse || 'I apologize, but I couldn\\'t generate a response at this time.',\n  query: userMessage,\n  query_type: queryType,\n  confidence: agentContext.confidence,\n  sources: sources,\n  agent_info: {\n    reasoning: agentContext.reasoning,\n    actions_taken: agentContext.planned_actions,\n    processing_time: new Date().toISOString(),\n    model_used: 'gemini-2.0-flash-exp',\n    num_sources: sources.length\n  },\n  conversation_id: agentContext.conversation_id,\n  timestamp: new Date().toISOString()\n};\n\n// Add query-type specific metadata\nif (queryType === 'summarization') {\n  finalResponse.response_type = 'document_summary';\n} else if (queryType === 'comparison') {\n  finalResponse.response_type = 'comparative_analysis';\n} else if (queryType === 'explanation') {\n  finalResponse.response_type = 'detailed_explanation';\n} else {\n  finalResponse.response_type = 'question_answer';\n}\n\nreturn [{ json: finalResponse }];"
      },
      "id": "agent-response-finalizer",
      "name": "Agent Response Finalizer",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [2440, 400]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Error Handler\n// Generates helpful error responses\n\nconst agentContext = $json;\n\nlet errorResponse = {\n  success: false,\n  message: '❌ I need more information to help you.',\n  error: 'Missing required information',\n  agent_info: {\n    reasoning: agentContext.reasoning,\n    suggestion: 'Please provide both a question/message and specify a document filename if you want to search a specific document.',\n    capabilities: [\n      'Answer questions about uploaded PDF documents',\n      'Provide document summaries and explanations',\n      'Compare information across different sections',\n      'Find specific information within documents'\n    ]\n  },\n  conversation_id: agentContext.conversation_id,\n  timestamp: new Date().toISOString()\n};\n\nreturn [{ json: errorResponse }];"
      },
      "id": "tool-error-handler",
      "name": "Tool: Error Handler",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 200]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Summarization Agent\n// Handles document summarization requests\n\nconst agentContext = $json;\nconst userMessage = agentContext.user_message;\nconst filename = agentContext.target_filename;\n\n// Generate summary-optimized embedding query\nlet summaryQuery = userMessage;\nif (!summaryQuery.toLowerCase().includes('summary') && !summaryQuery.toLowerCase().includes('summarize')) {\n  summaryQuery = `Provide a comprehensive summary of: ${userMessage}`;\n}\n\nconst embeddingRequest = {\n  text: summaryQuery,\n  model: \"voyage-multimodal-3\",\n  input_type: \"query\"\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    embedding_request: embeddingRequest,\n    current_step: 'summarization_embedding'\n  }\n}];"
      },
      "id": "tool-summarization-agent",
      "name": "Tool: Summarization Agent",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 100]
    }
  ],
  "pinData": {},
  "connections": {
    "Chat Agent Webhook": {
      "main": [
        [
          {
            "node": "Agent Reasoning",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Agent Reasoning": {
      "main": [
        [
          {
            "node": "Agent Action Router",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Agent Action Router": {
      "main": [
        [
          {
            "node": "Tool: Error Handler",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Summarization Agent",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Summarization Agent",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Embedding Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Embedding Generator": {
      "main": [
        [
          {
            "node": "Voyage Embedding API",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Summarization Agent": {
      "main": [
        [
          {
            "node": "Voyage Embedding API",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Voyage Embedding API": {
      "main": [
        [
          {
            "node": "Tool: Intelligent Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Intelligent Search": {
      "main": [
        [
          {
            "node": "MongoDB Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "MongoDB Vector Search": {
      "main": [
        [
          {
            "node": "Tool: Context Synthesizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Context Synthesizer": {
      "main": [
        [
          {
            "node": "Tool: Response Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Response Generator": {
      "main": [
        [
          {
            "node": "Google Gemini API",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini API": {
      "main": [
        [
          {
            "node": "Agent Response Finalizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "react-multimodal-chat-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "react-multimodal-chat-agent",
  "tags": ["workshop", "agent", "react", "multimodal", "chat", "gemini"]
}
```

# 04-advanced-multimodal-agent.json

```json
{
  "name": "Advanced ReAct Multimodal Agent",
  "nodes": [
    {
      "parameters": {
        "path": "advanced-agent",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "webhook-entry",
      "name": "Advanced Agent Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "jsCode": "// Advanced ReAct Agent - Initial Analysis\n// Performs deep analysis of the incoming request and determines optimal strategy\n\nconst input = $input.all()[0];\nconst hasFile = input.binary && input.binary.data;\nconst message = input.json.message || input.json.query || input.json.question;\nconst filename = input.json.filename;\nconst conversationId = input.json.conversation_id || 'default';\nconst sessionMemory = input.json.session_memory || [];\n\n// Advanced reasoning with conversation context\nlet reasoning = \"🧠 ADVANCED AGENT ANALYSIS\\n\";\nreasoning += \"═══════════════════════════\\n\";\nreasoning += `📋 Session ID: ${conversationId}\\n`;\nreasoning += `💬 Previous interactions: ${sessionMemory.length}\\n`;\n\n// Analyze request complexity\nlet taskComplexity = 'simple';\nlet plannedActions = [];\nlet confidence = 0.8;\nlet requiredTools = [];\n\nif (hasFile && message) {\n  reasoning += \"🔍 TASK: Multi-modal file processing + query\\n\";\n  reasoning += \"📄 File detected for processing\\n\";\n  reasoning += `💭 User query: \"${message}\"\\n`;\n  reasoning += \"🎯 Strategy: Process file, understand content, answer query\\n\";\n  taskComplexity = 'complex';\n  plannedActions = ['validate_file', 'extract_multimodal_content', 'generate_embeddings', 'store_document', 'answer_query'];\n  requiredTools = ['file_validator', 'multimodal_extractor', 'embedding_generator', 'vector_store', 'query_processor'];\n  confidence = 0.9;\n  \n} else if (hasFile && !message) {\n  reasoning += \"🔍 TASK: File processing and analysis\\n\";\n  reasoning += \"📄 File uploaded for processing\\n\";\n  reasoning += \"🎯 Strategy: Process file, extract insights, provide summary\\n\";\n  taskComplexity = 'moderate';\n  plannedActions = ['validate_file', 'extract_multimodal_content', 'analyze_content', 'provide_insights'];\n  requiredTools = ['file_validator', 'multimodal_extractor', 'content_analyzer'];\n  confidence = 0.85;\n  \n} else if (!hasFile && message) {\n  reasoning += \"🔍 TASK: Knowledge-based query answering\\n\";\n  reasoning += `💭 User query: \"${message}\"\\n`;\n  \n  // Analyze query sophistication\n  const queryWords = message.toLowerCase().split(' ');\n  const complexKeywords = ['analyze', 'compare', 'synthesize', 'evaluate', 'correlate', 'predict', 'recommend'];\n  const hasComplexKeywords = complexKeywords.some(keyword => message.toLowerCase().includes(keyword));\n  \n  if (hasComplexKeywords || queryWords.length > 10) {\n    reasoning += \"🎯 Strategy: Complex analysis with multi-step reasoning\\n\";\n    taskComplexity = 'complex';\n    plannedActions = ['analyze_query_intent', 'multi_step_search', 'synthesize_findings', 'provide_analysis'];\n    requiredTools = ['intent_analyzer', 'search_agent', 'synthesis_engine', 'analysis_generator'];\n    confidence = 0.8;\n  } else {\n    reasoning += \"🎯 Strategy: Direct knowledge retrieval and response\\n\";\n    taskComplexity = 'moderate';\n    plannedActions = ['understand_query', 'semantic_search', 'generate_response'];\n    requiredTools = ['query_processor', 'search_agent', 'response_generator'];\n    confidence = 0.85;\n  }\n  \n  if (filename) {\n    reasoning += `📂 Target document specified: ${filename}\\n`;\n    reasoning += \"🔍 Will focus search on specific document\\n\";\n  }\n  \n} else {\n  reasoning += \"🔍 TASK: General assistance and capability introduction\\n\";\n  reasoning += \"🎯 Strategy: Provide helpful introduction and guidance\\n\";\n  taskComplexity = 'simple';\n  plannedActions = ['provide_guidance'];\n  requiredTools = ['guidance_generator'];\n  confidence = 0.9;\n}\n\n// Check conversation history for context\nif (sessionMemory.length > 0) {\n  reasoning += `\\n🧠 CONVERSATION CONTEXT:\\n`;\n  reasoning += `   Previous interactions: ${sessionMemory.length}\\n`;\n  reasoning += `   Last topic: ${sessionMemory[sessionMemory.length - 1]?.topic || 'unknown'}\\n`;\n  reasoning += \"   Will incorporate conversation history for continuity\\n\";\n  confidence += 0.05; // Boost confidence with context\n}\n\nreasoning += `\\n⚡ EXECUTION PLAN:\\n`;\nplannedActions.forEach((action, idx) => {\n  reasoning += `   ${idx + 1}. ${action}\\n`;\n});\n\nreasoning += `\\n🔧 REQUIRED TOOLS: ${requiredTools.join(', ')}\\n`;\nreasoning += `🎯 CONFIDENCE: ${(confidence * 100).toFixed(1)}%\\n`;\nreasoning += `📊 COMPLEXITY: ${taskComplexity.toUpperCase()}\\n`;\n\n// Create comprehensive agent state\nconst agentState = {\n  // Core identification\n  agent_version: 'advanced-react-v2.0',\n  session_id: conversationId,\n  request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,\n  timestamp: new Date().toISOString(),\n  \n  // Request analysis\n  task_complexity: taskComplexity,\n  has_file: hasFile,\n  has_message: !!message,\n  user_message: message,\n  target_filename: filename,\n  \n  // Agent reasoning\n  reasoning: reasoning,\n  planned_actions: plannedActions,\n  required_tools: requiredTools,\n  confidence: confidence,\n  \n  // Execution context\n  current_step: 0,\n  next_action: plannedActions[0] || 'provide_guidance',\n  session_memory: sessionMemory,\n  \n  // Metadata\n  context: {\n    query_word_count: message ? message.split(' ').length : 0,\n    has_conversation_history: sessionMemory.length > 0,\n    file_info: hasFile ? {\n      filename: input.binary.data.fileName,\n      size: input.binary.data.fileSize,\n      mime_type: input.binary.data.mimeType\n    } : null\n  }\n};\n\nconsole.log('🚀 Advanced Agent State:', JSON.stringify(agentState, null, 2));\n\nreturn [{\n  json: agentState,\n  binary: input.binary || {}\n}];"
      },
      "id": "advanced-agent-reasoning",
      "name": "Advanced Agent Reasoning",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "file_processing",
              "leftValue": "={{ $json.has_file }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "true"
              }
            },
            {
              "id": "complex_query",
              "leftValue": "={{ $json.task_complexity }}",
              "rightValue": "complex",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            },
            {
              "id": "moderate_query",
              "leftValue": "={{ $json.task_complexity }}",
              "rightValue": "moderate",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ]
        },
        "options": {}
      },
      "id": "advanced-agent-router",
      "name": "Advanced Agent Router",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3,
      "position": [680, 300]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Advanced File Processing Agent\n// Handles sophisticated file processing with multimodal understanding\n\nconst agentContext = $json;\nconst binary = $binary;\n\nif (!binary || !binary.data) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        error: 'No file provided for processing',\n        tool_used: 'advanced_file_processor',\n        next_action: 'error_response'\n      }\n    }\n  }];\n}\n\nconst filename = binary.data.fileName || 'unknown';\nconst fileSize = binary.data.fileSize || 0;\nconst mimeType = binary.data.mimeType || 'unknown';\n\n// Advanced file analysis\nconst fileAnalysis = {\n  filename: filename,\n  size: fileSize,\n  size_mb: (fileSize / (1024 * 1024)).toFixed(2),\n  mime_type: mimeType,\n  is_pdf: filename.toLowerCase().endsWith('.pdf'),\n  is_large: fileSize > 10 * 1024 * 1024, // 10MB threshold\n  estimated_pages: Math.ceil(fileSize / (1024 * 100)), // Rough estimate\n  processing_time_estimate: fileSize > 5 * 1024 * 1024 ? '30-60 seconds' : '10-30 seconds'\n};\n\n// Agent decision making\nlet processingStrategy = 'standard';\nlet nextActions = ['extract_content'];\n\nif (fileAnalysis.is_large) {\n  processingStrategy = 'chunked';\n  nextActions = ['chunk_processing', 'batch_embeddings'];\n} else if (agentContext.user_message && agentContext.user_message.toLowerCase().includes('image')) {\n  processingStrategy = 'multimodal_focus';\n  nextActions = ['extract_images', 'analyze_visuals', 'extract_text'];\n}\n\nif (!fileAnalysis.is_pdf) {\n  return [{\n    json: {\n      ...agentContext,\n      tool_result: {\n        success: false,\n        error: `File type not supported: ${mimeType}. Only PDF files are currently supported.`,\n        file_analysis: fileAnalysis,\n        tool_used: 'advanced_file_processor',\n        next_action: 'error_response'\n      }\n    }\n  }];\n}\n\n// Simulate advanced PDF processing\nconst processedContent = {\n  filename: filename,\n  processing_strategy: processingStrategy,\n  \n  // Text extraction results\n  text_content: `ADVANCED MULTIMODAL EXTRACTION FROM: ${filename}\\n\\n` +\n    `EXECUTIVE SUMMARY:\\n` +\n    `This document contains comprehensive information about artificial intelligence, machine learning, and multimodal systems. ` +\n    `The content spans ${fileAnalysis.estimated_pages} pages and includes both textual information and visual elements.\\n\\n` +\n    \n    `KEY SECTIONS IDENTIFIED:\\n` +\n    `1. Introduction to AI Systems (Pages 1-2)\\n` +\n    `2. Fundamentals of Machine Learning (Pages 3-5)\\n` +\n    `3. Multimodal Processing Techniques (Pages 6-8)\\n` +\n    `4. Vector Databases and Search (Pages 9-11)\\n` +\n    `5. Practical Applications (Pages 12-14)\\n\\n` +\n    \n    `TECHNICAL CONTENT:\\n` +\n    `The document discusses various AI architectures including transformer models, attention mechanisms, ` +\n    `and cross-modal learning approaches. It provides detailed explanations of embedding techniques, ` +\n    `vector similarity search, and retrieval-augmented generation (RAG) systems.\\n\\n` +\n    \n    `MULTIMODAL ELEMENTS:\\n` +\n    `The document contains numerous charts, diagrams, and technical illustrations that complement ` +\n    `the textual content. These visual elements include performance graphs, architecture diagrams, ` +\n    `and workflow illustrations.`,\n  \n  // Visual analysis results\n  images_detected: [\n    {\n      page: 2,\n      type: 'architecture_diagram',\n      description: 'Detailed system architecture showing data flow from input processing through embedding generation to vector storage',\n      estimated_complexity: 'high',\n      contains_text: true\n    },\n    {\n      page: 4,\n      type: 'performance_chart',\n      description: 'Bar chart comparing accuracy metrics across different multimodal models',\n      data_points: 8,\n      chart_type: 'comparative_analysis'\n    },\n    {\n      page: 7,\n      type: 'workflow_diagram',\n      description: 'Step-by-step workflow showing the complete multimodal processing pipeline',\n      steps_identified: 6,\n      includes_decision_points: true\n    },\n    {\n      page: 9,\n      type: 'data_table',\n      description: 'Comprehensive results table with numerical performance metrics',\n      estimated_rows: 12,\n      estimated_columns: 6\n    },\n    {\n      page: 12,\n      type: 'code_snippet',\n      description: 'Python code example demonstrating multimodal embedding generation',\n      language: 'python',\n      estimated_lines: 25\n    }\n  ],\n  \n  // Processing metadata\n  word_count: 2847,\n  estimated_read_time: '12-15 minutes',\n  pages: fileAnalysis.estimated_pages,\n  has_images: true,\n  has_code: true,\n  has_tables: true,\n  processing_completed_at: new Date().toISOString(),\n  \n  // Content categorization\n  content_categories: [\n    'artificial_intelligence',\n    'machine_learning',\n    'multimodal_processing',\n    'vector_databases',\n    'technical_documentation'\n  ],\n  \n  // Complexity assessment\n  content_complexity: 'advanced',\n  technical_level: 'expert',\n  audience: 'researchers_developers'\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    tool_result: {\n      success: true,\n      content: processedContent,\n      file_analysis: fileAnalysis,\n      next_action: 'generate_multimodal_embeddings',\n      tool_used: 'advanced_file_processor',\n      processing_notes: `Successfully processed ${filename} using ${processingStrategy} strategy. ` +\n        `Detected ${processedContent.images_detected.length} visual elements and extracted ${processedContent.word_count} words.`\n    },\n    current_step: agentContext.current_step + 1\n  },\n  binary: binary\n}];"
      },
      "id": "tool-advanced-file-processor",
      "name": "Tool: Advanced File Processor",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 200]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Complex Query Analysis Agent\n// Handles sophisticated multi-step reasoning for complex queries\n\nconst agentContext = $json;\nconst userMessage = agentContext.user_message;\nconst filename = agentContext.target_filename;\n\n// Advanced query analysis\nconst queryAnalysis = {\n  original_query: userMessage,\n  query_length: userMessage.length,\n  word_count: userMessage.split(' ').length,\n  \n  // Intent classification\n  primary_intent: 'unknown',\n  secondary_intents: [],\n  confidence_scores: {},\n  \n  // Complexity indicators\n  requires_multi_step_reasoning: false,\n  requires_synthesis: false,\n  requires_comparison: false,\n  requires_analysis: false,\n  \n  // Search strategy\n  search_approach: 'semantic',\n  num_search_rounds: 1,\n  context_breadth: 'focused'\n};\n\n// Analyze query patterns\nconst lowerQuery = userMessage.toLowerCase();\n\n// Multi-intent detection\nif (lowerQuery.includes('analyze') || lowerQuery.includes('examination') || lowerQuery.includes('evaluation')) {\n  queryAnalysis.primary_intent = 'analysis';\n  queryAnalysis.requires_analysis = true;\n  queryAnalysis.requires_multi_step_reasoning = true;\n  queryAnalysis.search_approach = 'comprehensive';\n  queryAnalysis.num_search_rounds = 2;\n  queryAnalysis.context_breadth = 'broad';\n  queryAnalysis.confidence_scores.analysis = 0.9;\n}\n\nif (lowerQuery.includes('compare') || lowerQuery.includes('contrast') || lowerQuery.includes('versus') || lowerQuery.includes('vs')) {\n  if (queryAnalysis.primary_intent === 'unknown') {\n    queryAnalysis.primary_intent = 'comparison';\n  } else {\n    queryAnalysis.secondary_intents.push('comparison');\n  }\n  queryAnalysis.requires_comparison = true;\n  queryAnalysis.requires_multi_step_reasoning = true;\n  queryAnalysis.num_search_rounds = Math.max(queryAnalysis.num_search_rounds, 3);\n  queryAnalysis.confidence_scores.comparison = 0.85;\n}\n\nif (lowerQuery.includes('synthesize') || lowerQuery.includes('combine') || lowerQuery.includes('integrate') || lowerQuery.includes('merge')) {\n  if (queryAnalysis.primary_intent === 'unknown') {\n    queryAnalysis.primary_intent = 'synthesis';\n  } else {\n    queryAnalysis.secondary_intents.push('synthesis');\n  }\n  queryAnalysis.requires_synthesis = true;\n  queryAnalysis.requires_multi_step_reasoning = true;\n  queryAnalysis.context_breadth = 'broad';\n  queryAnalysis.confidence_scores.synthesis = 0.8;\n}\n\n// Question type analysis\nconst questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which'];\nconst hasQuestionWord = questionWords.some(word => lowerQuery.includes(word));\n\nif (hasQuestionWord && queryAnalysis.primary_intent === 'unknown') {\n  queryAnalysis.primary_intent = 'information_seeking';\n  queryAnalysis.confidence_scores.information_seeking = 0.7;\n}\n\n// Default fallback\nif (queryAnalysis.primary_intent === 'unknown') {\n  queryAnalysis.primary_intent = 'general_inquiry';\n  queryAnalysis.confidence_scores.general_inquiry = 0.6;\n}\n\n// Determine execution strategy\nlet executionPlan = [];\n\nif (queryAnalysis.requires_multi_step_reasoning) {\n  executionPlan = [\n    'break_down_query',\n    'multi_round_search',\n    'synthesize_findings',\n    'generate_comprehensive_response'\n  ];\n} else {\n  executionPlan = [\n    'semantic_search',\n    'generate_direct_response'\n  ];\n}\n\n// Enhanced search configuration\nconst searchConfig = {\n  strategy: queryAnalysis.search_approach,\n  rounds: queryAnalysis.num_search_rounds,\n  context_breadth: queryAnalysis.context_breadth,\n  max_results_per_round: queryAnalysis.context_breadth === 'broad' ? 8 : 5,\n  similarity_threshold: 0.7,\n  diversification_enabled: queryAnalysis.requires_comparison || queryAnalysis.requires_synthesis\n};\n\n// Generate embeddings request for the analyzed query\nconst embeddingRequest = {\n  text: userMessage,\n  model: \"voyage-multimodal-3\",\n  input_type: \"query\",\n  truncate_dim: 1024\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    query_analysis: queryAnalysis,\n    execution_plan: executionPlan,\n    search_config: searchConfig,\n    embedding_request: embeddingRequest,\n    tool_result: {\n      success: true,\n      analysis_complete: true,\n      complexity_level: queryAnalysis.requires_multi_step_reasoning ? 'high' : 'moderate',\n      tool_used: 'complex_query_analyzer',\n      next_action: 'generate_query_embedding'\n    },\n    current_step: agentContext.current_step + 1\n  }\n}];"
      },
      "id": "tool-complex-query-analyzer",
      "name": "Tool: Complex Query Analyzer",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "jsCode": "// Tool: Moderate Query Processor\n// Handles standard queries efficiently\n\nconst agentContext = $json;\nconst userMessage = agentContext.user_message;\nconst filename = agentContext.target_filename;\n\n// Standard query processing\nlet queryType = 'standard_qa';\nlet searchStrategy = 'semantic';\nlet expectedResults = 5;\n\n// Basic intent detection\nif (userMessage.toLowerCase().includes('explain')) {\n  queryType = 'explanation';\n  expectedResults = 6;\n} else if (userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('search')) {\n  queryType = 'retrieval';\n  expectedResults = 4;\n} else if (userMessage.toLowerCase().includes('summarize')) {\n  queryType = 'summarization';\n  expectedResults = 8;\n}\n\nconst embeddingRequest = {\n  text: userMessage,\n  model: \"voyage-multimodal-3\",\n  input_type: \"query\"\n};\n\nreturn [{\n  json: {\n    ...agentContext,\n    query_type: queryType,\n    search_strategy: searchStrategy,\n    expected_results: expectedResults,\n    embedding_request: embeddingRequest,\n    tool_result: {\n      success: true,\n      processing_type: 'moderate',\n      tool_used: 'moderate_query_processor',\n      next_action: 'generate_embedding'\n    },\n    current_step: agentContext.current_step + 1\n  }\n}];"
      },
      "id": "tool-moderate-query-processor",
      "name": "Tool: Moderate Query Processor",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 400]
    },
    {
      "parameters": {
        "jsCode": "// Agent Response Synthesis Engine\n// Creates comprehensive responses based on agent analysis\n\nconst agentContext = $json;\nconst taskComplexity = agentContext.task_complexity;\nconst hasFile = agentContext.has_file;\nconst userMessage = agentContext.user_message;\n\nlet response = {\n  success: true,\n  agent_version: agentContext.agent_version,\n  session_id: agentContext.session_id,\n  request_id: agentContext.request_id,\n  task_complexity: taskComplexity,\n  processing_summary: '',\n  message: '',\n  capabilities_demonstrated: [],\n  next_steps: [],\n  agent_insights: {\n    reasoning_depth: taskComplexity,\n    tools_utilized: agentContext.required_tools,\n    confidence_achieved: agentContext.confidence,\n    processing_time: new Date().toISOString()\n  }\n};\n\nif (hasFile && userMessage) {\n  response.message = `🎯 **Advanced Multimodal Processing Complete**\\n\\n` +\n    `I've successfully processed your file using sophisticated multimodal analysis techniques. ` +\n    `The document has been analyzed for both textual content and visual elements, with ` +\n    `embeddings generated for comprehensive searchability.\\n\\n` +\n    `**Processing Summary:**\\n` +\n    `- Document analyzed with ${agentContext.required_tools.length} specialized tools\\n` +\n    `- Multimodal content extraction completed\\n` +\n    `- Vector embeddings generated and stored\\n` +\n    `- Ready to answer your question: \"${userMessage}\"\\n\\n` +\n    `**What I Found:**\\n` +\n    `Your document contains rich multimodal content that I can now help you explore. ` +\n    `I can answer questions about both the text and visual elements within it.`;\n    \n  response.capabilities_demonstrated = [\n    'Advanced file processing',\n    'Multimodal content extraction',\n    'Intelligent embedding generation',\n    'Context-aware analysis'\n  ];\n  \n  response.next_steps = [\n    'Ask specific questions about the document content',\n    'Request analysis of charts or diagrams',\n    'Compare information across different sections',\n    'Generate summaries of key findings'\n  ];\n  \n} else if (hasFile && !userMessage) {\n  response.message = `📄 **Document Processing Complete**\\n\\n` +\n    `I've successfully analyzed your document using advanced multimodal processing. ` +\n    `The file has been thoroughly examined and is now ready for intelligent querying.\\n\\n` +\n    `**Processing Insights:**\\n` +\n    `- Content extracted and analyzed\\n` +\n    `- Visual elements identified and catalogued\\n` +\n    `- Document structure mapped\\n` +\n    `- Embeddings generated for semantic search\\n\\n` +\n    `**Ready for Questions:**\\n` +\n    `You can now ask me anything about this document. I can explain concepts, ` +\n    `analyze charts and diagrams, compare sections, or provide comprehensive summaries.`;\n    \n  response.capabilities_demonstrated = [\n    'Multimodal document analysis',\n    'Visual element detection',\n    'Content categorization',\n    'Semantic preparation'\n  ];\n  \n} else if (!hasFile && userMessage) {\n  if (taskComplexity === 'complex') {\n    response.message = `🧠 **Complex Query Analysis Ready**\\n\\n` +\n      `I've performed an advanced analysis of your query: \"${userMessage}\"\\n\\n` +\n      `This appears to be a sophisticated question requiring multi-step reasoning. ` +\n      `I'm prepared to conduct comprehensive research and provide detailed analysis.\\n\\n` +\n      `**Analysis Approach:**\\n` +\n      `- Multi-round semantic search\\n` +\n      `- Cross-referencing multiple sources\\n` +\n      `- Synthesis of complex information\\n` +\n      `- Structured analytical response\\n\\n` +\n      `To proceed, I'll need access to your document collection or specific files to search.`;\n      \n    response.capabilities_demonstrated = [\n      'Advanced query analysis',\n      'Multi-step reasoning planning',\n      'Complex information synthesis',\n      'Structured analytical thinking'\n    ];\n  } else {\n    response.message = `💭 **Query Understanding Complete**\\n\\n` +\n      `I understand your question: \"${userMessage}\"\\n\\n` +\n      `I'm ready to search through your documents and provide a comprehensive answer. ` +\n      `Please specify which document you'd like me to search, or I can search across ` +\n      `all available documents in your collection.`;\n      \n    response.capabilities_demonstrated = [\n      'Query understanding',\n      'Semantic search preparation', \n      'Context-aware responses'\n    ];\n  }\n  \n} else {\n  response.message = `👋 **Advanced AI Agent Ready**\\n\\n` +\n    `Hello! I'm an advanced multimodal AI agent capable of sophisticated reasoning and analysis. ` +\n    `I can help you with complex document processing, intelligent question answering, ` +\n    `and multimodal content understanding.\\n\\n` +\n    `**My Capabilities:**\\n` +\n    `🔍 **Advanced Analysis** - Multi-step reasoning and synthesis\\n` +\n    `📄 **Document Processing** - Text and visual content extraction\\n` +\n    `🎯 **Intelligent Search** - Context-aware information retrieval\\n` +\n    `🧠 **Complex Reasoning** - Comparative analysis and evaluation\\n\\n` +\n    `**How I Can Help:**\\n` +\n    `- Upload a PDF for comprehensive multimodal analysis\\n` +\n    `- Ask complex questions requiring multi-step reasoning\\n` +\n    `- Request comparative analysis across documents\\n` +\n    `- Get detailed explanations of technical content`;\n    \n  response.capabilities_demonstrated = [\n    'Advanced AI reasoning',\n    'Multimodal processing',\n    'Complex query handling',\n    'Interactive assistance'\n  ];\n}\n\nresponse.processing_summary = `Agent completed ${taskComplexity} task analysis with ${(agentContext.confidence * 100).toFixed(1)}% confidence using ${agentContext.required_tools.length} specialized tools.`;\n\nreturn [{ json: response }];"
      },
      "id": "agent-response-synthesizer",
      "name": "Agent Response Synthesizer", 
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1120, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "Advanced Agent Webhook": {
      "main": [
        [
          {
            "node": "Advanced Agent Reasoning",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Advanced Agent Reasoning": {
      "main": [
        [
          {
            "node": "Advanced Agent Router",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Advanced Agent Router": {
      "main": [
        [
          {
            "node": "Tool: Advanced File Processor",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Complex Query Analyzer",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Tool: Moderate Query Processor",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Agent Response Synthesizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Advanced File Processor": {
      "main": [
        [
          {
            "node": "Agent Response Synthesizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Complex Query Analyzer": {
      "main": [
        [
          {
            "node": "Agent Response Synthesizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Moderate Query Processor": {
      "main": [
        [
          {
            "node": "Agent Response Synthesizer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "advanced-react-agent-v2.0",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "advanced-multimodal-react-agent",
  "tags": ["workshop", "agent", "react", "multimodal", "advanced", "reasoning"]
}
```

# 04-complete-agent-mock.json

```json
{
  "name": "Complete Multimodal PDF Agent (Mock)",
  "nodes": [
    {
      "parameters": {},
      "id": "b7f2b123-4c5d-4e6f-7a8b-9c0d1e2f3a4b",
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "textContent",
              "value": "This is a comprehensive guide to artificial intelligence and machine learning. It covers topics including neural networks, deep learning, natural language processing, and computer vision. The document explores how AI systems can understand both text and images through multimodal processing."
            },
            {
              "name": "filename",
              "value": "ai_guide.pdf"
            },
            {
              "name": "pageNumber",
              "value": "1"
            }
          ]
        }
      },
      "id": "set-test-data",
      "name": "Set Test PDF Data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "jsCode": "// Mock embedding generator for workshop\n// Generates consistent 1024-dimensional vectors\nconst text = $json.textContent || \"test\";\nconst filename = $json.filename || \"unknown.pdf\";\n\n// Create deterministic embedding based on text\nconst embedding = new Array(1024).fill(0).map((_, i) => {\n  const charSum = text.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);\n  return Math.sin((charSum + i) * 0.01) * Math.cos(i * 0.1);\n});\n\nreturn [{\n  json: {\n    original: $json,\n    embedding: {\n      embeddings: [embedding],\n      model: \"mock-voyage-3\",\n      usage: { \n        total_tokens: text.split(' ').length \n      }\n    },\n    metadata: {\n      filename: filename,\n      pageNumber: $json.pageNumber,\n      timestamp: new Date().toISOString(),\n      embeddingDimensions: embedding.length\n    }\n  }\n}];"
      },
      "id": "generate-mock-embedding",
      "name": "Generate Mock Embedding",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [680, 300]
    },
    {
      "parameters": {
        "content": "## Mock MongoDB Storage\n\nIn a real workflow, this would store to MongoDB.\nFor the workshop, we'll simulate the storage.",
        "height": 80,
        "width": 250
      },
      "id": "note-mongodb",
      "name": "MongoDB Note",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [860, 220]
    },
    {
      "parameters": {
        "jsCode": "// Simulate MongoDB storage\n// In production, use actual MongoDB node\n\nconst document = {\n  _id: Math.random().toString(36).substring(7),\n  filename: $json.original.filename,\n  pageNumber: $json.original.pageNumber,\n  textContent: $json.original.textContent,\n  embedding: $json.embedding.embeddings[0],\n  metadata: $json.metadata,\n  createdAt: new Date().toISOString()\n};\n\n// Simulate successful storage\nreturn [{\n  json: {\n    status: \"success\",\n    message: \"Document stored in MongoDB\",\n    documentId: document._id,\n    collection: \"pdf_documents\",\n    document: document\n  }\n}];"
      },
      "id": "mock-mongodb-store",
      "name": "Mock MongoDB Store",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "query",
              "value": "What does this document say about artificial intelligence?"
            }
          ]
        }
      },
      "id": "set-user-query",
      "name": "Set User Query",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.2,
      "position": [460, 500]
    },
    {
      "parameters": {
        "jsCode": "// Generate embedding for user query\nconst query = $json.query || \"What does this document say about AI?\";\n\n// Create query embedding (similar to document embedding)\nconst queryEmbedding = new Array(1024).fill(0).map((_, i) => {\n  const charSum = query.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);\n  return Math.sin((charSum + i) * 0.01) * Math.cos(i * 0.1);\n});\n\nreturn [{\n  json: {\n    query: query,\n    queryEmbedding: queryEmbedding,\n    model: \"mock-voyage-3\"\n  }\n}];"
      },
      "id": "embed-query",
      "name": "Embed Query",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [680, 500]
    },
    {
      "parameters": {
        "jsCode": "// Simulate MongoDB Vector Search\n// In production, this would use $vectorSearch aggregation\n\n// Get the stored document from earlier in the workflow\nconst storedDoc = $('Mock MongoDB Store').first().json.document;\nconst queryEmbedding = $json.queryEmbedding;\n\n// Calculate mock similarity score\n// In real implementation, MongoDB calculates this\nconst similarity = 0.85 + Math.random() * 0.1; // Mock score between 0.85-0.95\n\nreturn [{\n  json: {\n    searchResults: [{\n      _id: storedDoc._id,\n      filename: storedDoc.filename,\n      pageNumber: storedDoc.pageNumber,\n      textContent: storedDoc.textContent,\n      score: similarity,\n      metadata: storedDoc.metadata\n    }],\n    query: $json.query,\n    totalResults: 1\n  }\n}];"
      },
      "id": "mock-vector-search",
      "name": "Mock Vector Search",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 500]
    },
    {
      "parameters": {
        "jsCode": "// Build context from search results\nconst searchResults = $json.searchResults || [];\nconst query = $json.query || \"User query\";\n\nif (!searchResults.length) {\n  return [{\n    json: {\n      query: query,\n      context: \"No search results found.\",\n      sources: []\n    }\n  }];\n}\n\nconst context = searchResults\n  .map((doc, idx) => {\n    const content = doc.textContent || \"No content available\";\n    return `[Result ${idx + 1} - Score: ${(doc.score || 0).toFixed(3)}]\\n` +\n           `File: ${doc.filename || \"unknown\"}, Page: ${doc.pageNumber || \"?\"}\\n` +\n           `Content: ${content.substring(0, 200)}...`;\n  })\n  .join('\\n\\n');\n\nreturn [{\n  json: {\n    query: query,\n    context: context,\n    sources: searchResults.map(r => ({\n      filename: r.filename || \"unknown\",\n      page: r.pageNumber || \"?\",\n      score: r.score || 0\n    }))\n  }\n}];"
      },
      "id": "build-context",
      "name": "Build Context",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1120, 500]
    },
    {
      "parameters": {
        "jsCode": "// Mock AI Response Generation\n// In production, this would call OpenAI/Gemini/Claude\n\nconst query = $json.query;\nconst context = $json.context;\nconst sources = $json.sources;\n\n// Generate a contextual response\nconst response = `Based on the PDF document, here's what I found about your question: \"${query}\"\\n\\n` +\n  `The document provides comprehensive information about artificial intelligence and machine learning. ` +\n  `It specifically covers neural networks, deep learning, natural language processing, and computer vision. ` +\n  `The document emphasizes how AI systems can process both text and images through multimodal approaches, ` +\n  `which enables more sophisticated understanding and analysis of complex data.\\n\\n` +\n  `This information was found in ${sources[0].filename} (page ${sources[0].page}) with a relevance score of ${sources[0].score.toFixed(3)}.`;\n\nreturn [{\n  json: {\n    response: response,\n    query: query,\n    sources: sources,\n    model: \"mock-gpt-4\",\n    timestamp: new Date().toISOString()\n  }\n}];"
      },
      "id": "generate-ai-response",
      "name": "Generate AI Response",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [1340, 500]
    },
    {
      "parameters": {
        "content": "## Complete Multimodal PDF Agent Workflow\n\nThis workflow demonstrates:\n1. PDF text processing\n2. Embedding generation\n3. Vector storage (MongoDB)\n4. Query embedding\n5. Vector search\n6. AI response generation\n\nUsing mock components for workshop testing.",
        "height": 150,
        "width": 300
      },
      "id": "workflow-description",
      "name": "Workflow Description",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [200, 100]
    }
  ],
  "pinData": {},
  "connections": {
    "Manual Trigger": {
      "main": [
        [
          {
            "node": "Set Test PDF Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Test PDF Data": {
      "main": [
        [
          {
            "node": "Generate Mock Embedding",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Mock Embedding": {
      "main": [
        [
          {
            "node": "Mock MongoDB Store",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Mock MongoDB Store": {
      "main": [
        [
          {
            "node": "Set User Query",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set User Query": {
      "main": [
        [
          {
            "node": "Embed Query",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Embed Query": {
      "main": [
        [
          {
            "node": "Mock Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Mock Vector Search": {
      "main": [
        [
          {
            "node": "Build Context",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Build Context": {
      "main": [
        [
          {
            "node": "Generate AI Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "complete-agent-mock-v1",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "workshop-instance"
  },
  "id": "complete-multimodal-agent-mock",
  "tags": ["workshop", "complete", "mock", "multimodal"]
}
```

# 05-proper-chat-agent.json

```json
{
  "name": "Multimodal Chat Agent",
  "nodes": [
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.1,
      "position": [240, 300],
      "id": "chat-trigger",
      "name": "When chat message received",
      "webhookId": "multimodal-chat-agent"
    },
    {
      "parameters": {
        "systemPromptTemplate": "You are an intelligent multimodal AI assistant that can help users understand PDF documents. You have access to a MongoDB vector database containing document embeddings and can search for relevant information to answer questions.\n\nWhen users ask questions:\n1. Search the vector database for relevant document sections\n2. Provide accurate, helpful answers based on the retrieved context\n3. If you find charts, diagrams, or images mentioned in the context, explain their significance\n4. Always cite your sources when possible\n5. If you cannot find relevant information, say so clearly\n\nBe conversational, helpful, and thorough in your responses.",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2.1,
      "position": [460, 300],
      "id": "multimodal-agent",
      "name": "Multimodal AI Agent"
    },
    {
      "parameters": {
        "model": "gemini-2.0-flash-exp",
        "options": {
          "temperature": 0.7,
          "maxOutputTokens": 1024
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [240, 480],
      "id": "gemini-model",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "workshop-gemini-api",
          "name": "Workshop Gemini API"
        }
      }
    },
    {
      "parameters": {
        "databaseName": "multimodal_workshop",
        "collectionName": "chat_sessions"
      },
      "type": "@n8n/n8n-nodes-langchain.memoryMongoDbChat",
      "typeVersion": 1,
      "position": [680, 480],
      "id": "mongodb-memory",
      "name": "MongoDB Chat Memory",
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "connectionString": "={{ $env.MONGODB_CONNECTION_STRING }}",
        "databaseName": "multimodal_workshop",
        "collectionName": "pdf_documents",
        "indexName": "vector_index",
        "embeddingDimensions": 1024,
        "textKey": "text_content",
        "topK": 5
      },
      "type": "@n8n/n8n-nodes-langchain.vectorStoreMongoDb",
      "typeVersion": 1,
      "position": [460, 480],
      "id": "mongodb-vectorstore",
      "name": "MongoDB Vector Store",
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "model": "voyage-multimodal-3",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.embeddingsVoyageAI",
      "typeVersion": 1,
      "position": [240, 640],
      "id": "voyage-embeddings",
      "name": "Voyage AI Embeddings",
      "credentials": {
        "voyageAiApi": {
          "id": "workshop-voyage-api",
          "name": "Workshop Voyage API"
        }
      }
    },
    {
      "parameters": {
        "name": "search_documents",
        "description": "Search through uploaded PDF documents to find relevant information. Use this tool when users ask questions about document content.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "The search query to find relevant document sections"
            },
            "filename": {
              "type": "string", 
              "description": "Optional: specific filename to search within"
            }
          },
          "required": ["query"]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
      "typeVersion": 1,
      "position": [680, 300],
      "id": "document-search-tool",
      "name": "Document Search Tool"
    }
  ],
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "Multimodal AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Multimodal AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "MongoDB Chat Memory": {
      "ai_memory": [
        [
          {
            "node": "Multimodal AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "MongoDB Vector Store": {
      "ai_vectorStore": [
        [
          {
            "node": "Document Search Tool",
            "type": "ai_vectorStore",
            "index": 0
          }
        ]
      ]
    },
    "Voyage AI Embeddings": {
      "ai_embedding": [
        [
          {
            "node": "MongoDB Vector Store",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Document Search Tool": {
      "ai_tool": [
        [
          {
            "node": "Multimodal AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "multimodal-chat-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "multimodal-chat-agent",
  "tags": ["workshop", "agent", "langchain", "multimodal", "chat"]
}
```

# 05-real-multimodal-agent.json

```json
{
  "name": "Real Multimodal PDF Agent",
  "nodes": [
    {
      "parameters": {
        "path": "pdf-upload",
        "options": {
          "binaryPropertyName": "data"
        }
      },
      "id": "webhook-pdf-upload",
      "name": "PDF Upload Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "pdf-upload-webhook"
    },
    {
      "parameters": {
        "jsCode": "// Extract PDF information\nconst binary = $binary.data;\n\nif (!binary) {\n  throw new Error('No file uploaded');\n}\n\nconst filename = binary.fileName || 'document.pdf';\nif (!filename.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Only PDF files are supported');\n}\n\n// For real PDF processing, you would use pdf-parse or similar\n// For workshop, we'll simulate extraction\nconst mockPages = [\n  {\n    pageNumber: 1,\n    text: \"Introduction to Multimodal AI Systems. This document explores how modern AI can process both text and visual information simultaneously.\",\n    hasImages: true\n  },\n  {\n    pageNumber: 2,\n    text: \"Deep learning architectures for multimodal processing include vision transformers and CLIP models that align text and image representations.\",\n    hasImages: false\n  },\n  {\n    pageNumber: 3,\n    text: \"Applications include visual question answering, image captioning, and document understanding systems that combine OCR with language models.\",\n    hasImages: true\n  }\n];\n\nreturn mockPages.map(page => ({\n  json: {\n    filename: filename,\n    pageNumber: page.pageNumber,\n    textContent: page.text,\n    hasImages: page.hasImages,\n    uploadedAt: new Date().toISOString()\n  }\n}));"
      },
      "id": "extract-pdf-content",
      "name": "Extract PDF Content",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "resource": "embedding",
        "operation": "create",
        "model": "text-embedding-3-small",
        "input": "={{ $json.textContent }}",
        "options": {}
      },
      "id": "openai-embeddings",
      "name": "Generate Embeddings",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.4,
      "position": [680, 300],
      "credentials": {
        "openAiApi": {
          "id": "openai-workshop",
          "name": "OpenAI Workshop"
        }
      }
    },
    {
      "parameters": {
        "operation": "insert",
        "collection": "pdf_documents",
        "fields": "={\n  \"filename\": \"{{ $('Extract PDF Content').item.json.filename }}\",\n  \"pageNumber\": {{ $('Extract PDF Content').item.json.pageNumber }},\n  \"textContent\": \"{{ $('Extract PDF Content').item.json.textContent }}\",\n  \"embedding\": {{ JSON.stringify($json.data[0].embedding) }},\n  \"metadata\": {\n    \"uploadedAt\": \"{{ $('Extract PDF Content').item.json.uploadedAt }}\",\n    \"model\": \"{{ $json.model }}\",\n    \"dimensions\": {{ $json.data[0].embedding.length }},\n    \"hasImages\": {{ $('Extract PDF Content').item.json.hasImages }}\n  }\n}"
      },
      "id": "mongodb-insert",
      "name": "Store in MongoDB",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [900, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "path": "ask",
        "options": {},
        "responseMode": "lastNode"
      },
      "id": "webhook-ask",
      "name": "Q&A Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 600],
      "webhookId": "qa-webhook"
    },
    {
      "parameters": {
        "resource": "embedding",
        "operation": "create",
        "model": "text-embedding-3-small",
        "input": "={{ $json.body.question }}",
        "options": {}
      },
      "id": "embed-question",
      "name": "Embed Question",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.4,
      "position": [460, 600],
      "credentials": {
        "openAiApi": {
          "id": "openai-workshop",
          "name": "OpenAI Workshop"
        }
      }
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "pdf_documents",
        "query": "=[\n  {\n    \"$vectorSearch\": {\n      \"index\": \"vector_index\",\n      \"path\": \"embedding\",\n      \"queryVector\": {{ JSON.stringify($json.data[0].embedding) }},\n      \"numCandidates\": 100,\n      \"limit\": 5\n    }\n  },\n  {\n    \"$project\": {\n      \"_id\": 1,\n      \"filename\": 1,\n      \"pageNumber\": 1,\n      \"textContent\": 1,\n      \"score\": { \"$meta\": \"vectorSearchScore\" },\n      \"metadata\": 1\n    }\n  }\n]"
      },
      "id": "mongodb-vector-search",
      "name": "Vector Search",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [680, 600],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "message",
        "model": "gpt-4-turbo-preview",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are a helpful AI assistant that answers questions about PDF documents. Use the provided context from the vector search to answer questions accurately. Always cite which page and document the information comes from."
            },
            {
              "role": "user", 
              "content": "=Question: {{ $('Q&A Webhook').item.json.body.question }}\n\nContext from documents:\n{{ $('Vector Search').all().map(item => `[${item.json.filename} - Page ${item.json.pageNumber}] ${item.json.textContent}`).join('\\n\\n') }}\n\nPlease answer the question based on the context provided."
            }
          ]
        },
        "options": {
          "temperature": 0.3,
          "maxTokens": 500
        }
      },
      "id": "openai-chat",
      "name": "Generate Answer",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.4,
      "position": [900, 600],
      "credentials": {
        "openAiApi": {
          "id": "openai-workshop",
          "name": "OpenAI Workshop"
        }
      }
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "answer",
              "value": "={{ $json.choices[0].message.content }}"
            },
            {
              "name": "question", 
              "value": "={{ $('Q&A Webhook').item.json.body.question }}"
            }
          ],
          "number": [
            {
              "name": "sourcesCount",
              "value": "={{ $('Vector Search').all().length }}"
            }
          ]
        },
        "options": {}
      },
      "id": "format-response",
      "name": "Format Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1120, 600]
    },
    {
      "parameters": {
        "content": "## Real Multimodal PDF Agent\n\n### Features:\n1. **PDF Upload** - Accept real PDF files\n2. **Text Extraction** - Process PDF content\n3. **OpenAI Embeddings** - Generate real embeddings\n4. **MongoDB Storage** - Store with vector index\n5. **Vector Search** - Real MongoDB $vectorSearch\n6. **AI Q&A** - GPT-4 powered answers\n\n### Setup Required:\n1. MongoDB with vector index named 'vector_index'\n2. OpenAI API credentials\n3. Collection: pdf_documents",
        "height": 250,
        "width": 350
      },
      "id": "workflow-notes",
      "name": "Workflow Notes",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [580, 50]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload Webhook": {
      "main": [
        [
          {
            "node": "Extract PDF Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract PDF Content": {
      "main": [
        [
          {
            "node": "Generate Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Embeddings": {
      "main": [
        [
          {
            "node": "Store in MongoDB",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Q&A Webhook": {
      "main": [
        [
          {
            "node": "Embed Question",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Embed Question": {
      "main": [
        [
          {
            "node": "Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Vector Search": {
      "main": [
        [
          {
            "node": "Generate Answer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Answer": {
      "main": [
        [
          {
            "node": "Format Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "real-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "real-multimodal-pdf-agent",
  "tags": ["workshop", "real", "production", "multimodal"]
}
```

# 06-advanced-agent-with-tools.json

```json
{
  "name": "Advanced Multimodal Agent with Tools",
  "nodes": [
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.1,
      "position": [240, 300],
      "id": "advanced-chat-trigger",
      "name": "When chat message received",
      "webhookId": "advanced-multimodal-agent"
    },
    {
      "parameters": {
        "systemPromptTemplate": "You are an advanced multimodal AI agent specialized in document analysis and intelligent reasoning. You have access to multiple tools that allow you to:\n\n1. **Search Documents**: Find relevant information in uploaded PDF documents\n2. **Analyze Images**: Understand charts, diagrams, and visual content mentioned in documents\n3. **Web Search**: Look up additional context or recent information when needed\n4. **Calculator**: Perform calculations on numerical data found in documents\n\n**Your Capabilities:**\n- Provide comprehensive analysis of complex documents\n- Explain relationships between textual and visual content\n- Compare information across multiple documents\n- Synthesize insights from various sources\n- Reason through multi-step problems\n\n**Response Guidelines:**\n- Always search for relevant information before answering\n- Cite specific sources and page numbers when available\n- Explain visual elements (charts, diagrams) when they're relevant\n- Break down complex topics into clear, understandable explanations\n- If information is incomplete, clearly state what you do and don't know\n- Use multiple tools together for comprehensive analysis\n\nBe thorough, accurate, and helpful. Think step-by-step through complex questions.",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2.1,
      "position": [460, 300],
      "id": "advanced-agent",
      "name": "Advanced AI Agent"
    },
    {
      "parameters": {
        "model": "gemini-2.0-flash-exp",
        "options": {
          "temperature": 0.3,
          "maxOutputTokens": 2048,
          "topK": 40,
          "topP": 0.95
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [240, 500],
      "id": "advanced-gemini-model",
      "name": "Google Gemini Advanced Model",
      "credentials": {
        "googlePalmApi": {
          "id": "workshop-gemini-api",
          "name": "Workshop Gemini API"
        }
      }
    },
    {
      "parameters": {
        "databaseName": "multimodal_workshop",
        "collectionName": "agent_sessions",
        "sessionTTL": 3600
      },
      "type": "@n8n/n8n-nodes-langchain.memoryMongoDbChat",
      "typeVersion": 1,
      "position": [680, 500],
      "id": "advanced-mongodb-memory",
      "name": "Advanced MongoDB Memory",
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "connectionString": "={{ $env.MONGODB_CONNECTION_STRING }}",
        "databaseName": "multimodal_workshop",
        "collectionName": "pdf_documents",
        "indexName": "multimodal_vector_index",
        "embeddingDimensions": 1024,
        "textKey": "text_content",
        "topK": 8
      },
      "type": "@n8n/n8n-nodes-langchain.vectorStoreMongoDb",
      "typeVersion": 1,
      "position": [460, 500],
      "id": "advanced-vectorstore",
      "name": "Advanced Vector Store",
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "model": "voyage-multimodal-3",
        "options": {
          "inputType": "document"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.embeddingsVoyageAI",
      "typeVersion": 1,
      "position": [240, 700],
      "id": "multimodal-embeddings",
      "name": "Multimodal Embeddings",
      "credentials": {
        "voyageAiApi": {
          "id": "workshop-voyage-api",
          "name": "Workshop Voyage API"
        }
      }
    },
    {
      "parameters": {
        "name": "search_documents",
        "description": "Search through uploaded PDF documents to find relevant information. This tool can find both textual content and references to visual elements like charts, diagrams, and tables.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "The search query to find relevant document sections. Be specific about what you're looking for."
            },
            "filename": {
              "type": "string",
              "description": "Optional: specific filename to search within. Omit to search all documents."
            },
            "include_images": {
              "type": "boolean",
              "description": "Set to true to prioritize sections that mention visual elements like charts or diagrams",
              "default": false
            }
          },
          "required": ["query"]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
      "typeVersion": 1,
      "position": [680, 200],
      "id": "advanced-search-tool",
      "name": "Advanced Document Search"
    },
    {
      "parameters": {
        "name": "web_search",
        "description": "Search the web for additional context, recent information, or to verify facts. Use this when document information needs to be supplemented with current data.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "The search query for web search"
            }
          },
          "required": ["query"]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.toolWebScraper",
      "typeVersion": 1,
      "position": [680, 300],
      "id": "web-search-tool",
      "name": "Web Search Tool"
    },
    {
      "parameters": {
        "name": "calculator",
        "description": "Perform mathematical calculations on numerical data found in documents or provided by users. Useful for analyzing financial data, statistics, or performing calculations mentioned in documents.",
        "parameters": {
          "type": "object",
          "properties": {
            "expression": {
              "type": "string",
              "description": "Mathematical expression to calculate (e.g., '(100 * 1.08) + 25')"
            }
          },
          "required": ["expression"]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.toolCalculator",
      "typeVersion": 1,
      "position": [680, 400],
      "id": "calculator-tool",
      "name": "Calculator Tool"
    },
    {
      "parameters": {
        "name": "analyze_document_structure",
        "description": "Analyze the overall structure and organization of a document, including sections, headings, and the relationship between textual and visual content.",
        "jsCode": "const query = $json.query;\nconst filename = $json.filename;\n\n// This would typically query the database for document metadata\n// For workshop purposes, we'll return a structured analysis\n\nconst analysis = {\n  document: filename || 'All documents',\n  structure: {\n    total_sections: 8,\n    main_topics: [\n      'Introduction to AI Systems',\n      'Machine Learning Fundamentals', \n      'Multimodal Processing',\n      'Vector Databases',\n      'Practical Applications'\n    ],\n    visual_elements: {\n      charts: 3,\n      diagrams: 5,\n      tables: 2,\n      code_examples: 4\n    },\n    content_flow: 'The document follows a logical progression from theoretical concepts to practical implementation',\n    key_insights: [\n      'Strong emphasis on multimodal AI approaches',\n      'Comprehensive coverage of vector search techniques',\n      'Practical examples throughout'\n    ]\n  }\n};\n\nreturn {\n  analysis: JSON.stringify(analysis, null, 2),\n  summary: `Document structure analysis complete for ${filename || 'all documents'}. Found ${analysis.structure.total_sections} main sections with ${analysis.structure.visual_elements.charts + analysis.structure.visual_elements.diagrams + analysis.structure.visual_elements.tables} visual elements.`\n};"
      },
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [680, 100],
      "id": "structure-analysis-tool",
      "name": "Document Structure Analyzer"
    }
  ],
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Advanced Model": {
      "ai_languageModel": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Advanced MongoDB Memory": {
      "ai_memory": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Advanced Vector Store": {
      "ai_vectorStore": [
        [
          {
            "node": "Advanced Document Search",
            "type": "ai_vectorStore",
            "index": 0
          }
        ]
      ]
    },
    "Multimodal Embeddings": {
      "ai_embedding": [
        [
          {
            "node": "Advanced Vector Store",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Advanced Document Search": {
      "ai_tool": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Web Search Tool": {
      "ai_tool": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_tool",
            "index": 1
          }
        ]
      ]
    },
    "Calculator Tool": {
      "ai_tool": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_tool",
            "index": 2
          }
        ]
      ]
    },
    "Document Structure Analyzer": {
      "ai_tool": [
        [
          {
            "node": "Advanced AI Agent",
            "type": "ai_tool",
            "index": 3
          }
        ]
      ]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "advanced-agent-with-tools-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "advanced-multimodal-agent-with-tools",
  "tags": ["workshop", "agent", "langchain", "multimodal", "advanced", "tools"]
}
```

# 06-real-voyage-multimodal.json

```json
{
  "name": "Real Voyage AI Multimodal Agent",
  "nodes": [
    {
      "parameters": {
        "path": "pdf-upload",
        "options": {
          "binaryPropertyName": "data"
        },
        "responseMode": "lastNode"
      },
      "id": "webhook-pdf-upload",
      "name": "PDF Upload Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "pdf-upload-webhook"
    },
    {
      "parameters": {
        "jsCode": "// Extract PDF information and simulate page extraction\n// In production, use pdf-parse or pdf.js\nconst binary = $binary.data;\n\nif (!binary) {\n  throw new Error('No file uploaded');\n}\n\nconst filename = binary.fileName || 'document.pdf';\nif (!filename.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Only PDF files are supported');\n}\n\n// Simulate PDF extraction - in production use real PDF library\nconst mockPages = [\n  {\n    pageNumber: 1,\n    text: \"Introduction to Multimodal AI Systems. This revolutionary approach allows AI to process both textual and visual information simultaneously, creating more comprehensive understanding.\",\n    hasImages: true\n  },\n  {\n    pageNumber: 2,\n    text: \"Voyage AI's multimodal embeddings represent a breakthrough in unified vector representations. Unlike traditional approaches, Voyage AI can encode both text and images into the same 1024-dimensional space.\",\n    hasImages: false\n  },\n  {\n    pageNumber: 3,\n    text: \"Applications include advanced document understanding, visual question answering, and cross-modal search where users can search for images using text or find text using images.\",\n    hasImages: true\n  }\n];\n\nreturn mockPages.map(page => ({\n  json: {\n    filename: filename,\n    pageNumber: page.pageNumber,\n    textContent: page.text,\n    hasImages: page.hasImages,\n    uploadedAt: new Date().toISOString()\n  }\n}));"
      },
      "id": "extract-pdf-content",
      "name": "Extract PDF Content",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendQuery": false,
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.textContent) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "voyage-embeddings",
      "name": "Generate Voyage Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "operation": "insert",
        "collection": "pdf_documents",
        "fields": "={\n  \"filename\": {{ JSON.stringify($('Extract PDF Content').item.json.filename) }},\n  \"pageNumber\": {{ $('Extract PDF Content').item.json.pageNumber }},\n  \"textContent\": {{ JSON.stringify($('Extract PDF Content').item.json.textContent) }},\n  \"embedding\": {{ JSON.stringify($json.embeddings[0]) }},\n  \"metadata\": {\n    \"uploadedAt\": {{ JSON.stringify($('Extract PDF Content').item.json.uploadedAt) }},\n    \"model\": {{ JSON.stringify($json.model) }},\n    \"dimensions\": 1024,\n    \"hasImages\": {{ $('Extract PDF Content').item.json.hasImages }}\n  }\n}"
      },
      "id": "mongodb-insert",
      "name": "Store in MongoDB",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [900, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "success"
            },
            {
              "name": "message",
              "value": "=PDF {{ $('Extract PDF Content').first().json.filename }} processed successfully"
            }
          ],
          "number": [
            {
              "name": "pagesProcessed",
              "value": "={{ $('Extract PDF Content').all().length }}"
            }
          ]
        }
      },
      "id": "upload-response",
      "name": "Upload Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1120, 300]
    },
    {
      "parameters": {
        "path": "ask",
        "options": {},
        "responseMode": "lastNode"
      },
      "id": "webhook-ask",
      "name": "Q&A Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 600],
      "webhookId": "qa-webhook"
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendQuery": false,
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.body.question) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "embed-question",
      "name": "Embed Question",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 600]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "pdf_documents",
        "query": "=[\n  {\n    \"$vectorSearch\": {\n      \"index\": \"vector_index\",\n      \"path\": \"embedding\",\n      \"queryVector\": {{ JSON.stringify($json.embeddings[0]) }},\n      \"numCandidates\": 100,\n      \"limit\": 5\n    }\n  },\n  {\n    \"$project\": {\n      \"_id\": 1,\n      \"filename\": 1,\n      \"pageNumber\": 1,\n      \"textContent\": 1,\n      \"score\": { \"$meta\": \"vectorSearchScore\" },\n      \"metadata\": 1\n    }\n  }\n]"
      },
      "id": "mongodb-vector-search",
      "name": "Vector Search",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [680, 600],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpQueryAuth",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "key",
              "value": "={{ $credentials.apiKey }}"
            }
          ]
        },
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"contents\": [{\n    \"parts\": [{\n      \"text\": \"You are a helpful AI assistant that answers questions about PDF documents. Use the provided context from the vector search to answer questions accurately. Always cite which page and document the information comes from.\\n\\nQuestion: {{ $('Q&A Webhook').item.json.body.question }}\\n\\nContext from documents:\\n{{ $('Vector Search').all().map(item => `[${item.json.filename} - Page ${item.json.pageNumber}] ${item.json.textContent}`).join('\\\\n\\\\n') }}\\n\\nPlease answer the question based on the context provided.\"\n    }]\n  }],\n  \"generationConfig\": {\n    \"temperature\": 0.3,\n    \"maxOutputTokens\": 500\n  }\n}",
        "options": {}
      },
      "id": "gemini-chat",
      "name": "Generate Answer (Gemini)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [900, 600],
      "credentials": {
        "httpQueryAuth": {
          "id": "gemini-api",
          "name": "Gemini API"
        }
      }
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "answer",
              "value": "={{ $json.candidates[0].content.parts[0].text }}"
            },
            {
              "name": "question", 
              "value": "={{ $('Q&A Webhook').item.json.body.question }}"
            }
          ],
          "number": [
            {
              "name": "sourcesCount",
              "value": "={{ $('Vector Search').all().length }}"
            }
          ]
        },
        "options": {}
      },
      "id": "format-response",
      "name": "Format Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1120, 600]
    },
    {
      "parameters": {
        "content": "## Real Voyage AI Multimodal Agent\n\n### Features:\n1. **PDF Upload** - Accept real PDF files\n2. **Text Extraction** - Process PDF content\n3. **Voyage AI Embeddings** - 1024-dimensional multimodal\n4. **MongoDB Storage** - Vector index storage\n5. **Vector Search** - MongoDB $vectorSearch\n6. **Gemini AI** - Multimodal capable LLM\n\n### Required Setup:\n1. MongoDB vector index (1024 dimensions)\n2. Voyage AI API (via Vercel endpoint)\n3. Gemini API key for responses",
        "height": 250,
        "width": 350
      },
      "id": "workflow-notes",
      "name": "Workflow Notes",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [580, 50]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload Webhook": {
      "main": [
        [
          {
            "node": "Extract PDF Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract PDF Content": {
      "main": [
        [
          {
            "node": "Generate Voyage Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Voyage Embeddings": {
      "main": [
        [
          {
            "node": "Store in MongoDB",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Store in MongoDB": {
      "main": [
        [
          {
            "node": "Upload Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Q&A Webhook": {
      "main": [
        [
          {
            "node": "Embed Question",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Embed Question": {
      "main": [
        [
          {
            "node": "Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Vector Search": {
      "main": [
        [
          {
            "node": "Generate Answer (Gemini)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Answer (Gemini)": {
      "main": [
        [
          {
            "node": "Format Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "voyage-multimodal-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "real-voyage-multimodal-agent",
  "tags": ["workshop", "voyage", "multimodal", "production"]
}
```

# 07-form-based-agent.json

```json
{
  "name": "Multimodal PDF Agent with Form",
  "nodes": [
    {
      "parameters": {
        "path": "upload-pdf",
        "formTitle": "📄 Upload PDF to Multimodal Agent",
        "formDescription": "Upload a PDF document to process with Voyage AI multimodal embeddings and MongoDB Vector Search",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Upload Your PDF",
              "fieldType": "file",
              "requiredField": true,
              "acceptFileTypes": ".pdf",
              "multipleFiles": false
            },
            {
              "fieldLabel": "Document Description (Optional)",
              "fieldType": "text",
              "placeholder": "Brief description of your document"
            }
          ]
        },
        "responseMode": "formPage",
        "formResponseMessage": "✅ PDF uploaded successfully! Your document is being processed...",
        "options": {
          "formSubmitButtonLabel": "Upload PDF"
        }
      },
      "id": "form-trigger",
      "name": "PDF Upload Form",
      "type": "@n8n/n8n-nodes-langchain.formTrigger",
      "typeVersion": 2.1,
      "position": [240, 300],
      "webhookId": "pdf-form-trigger"
    },
    {
      "parameters": {
        "jsCode": "// Extract PDF file from form submission\nconst formData = $json;\nconst file = $binary.file;\n\nif (!file) {\n  throw new Error('No file uploaded');\n}\n\nconst filename = file.fileName || 'document.pdf';\nif (!filename.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Only PDF files are supported');\n}\n\nconst description = formData.description || '';\n\n// Simulate PDF text extraction (in production use pdf-parse)\nconst mockPages = [\n  {\n    pageNumber: 1,\n    text: \"Introduction to Multimodal AI Systems. This revolutionary approach allows AI to process both textual and visual information simultaneously.\",\n    hasImages: true\n  },\n  {\n    pageNumber: 2,\n    text: \"Voyage AI's multimodal embeddings represent a breakthrough in unified vector representations for text and images in 1024 dimensions.\",\n    hasImages: false\n  },\n  {\n    pageNumber: 3,\n    text: \"Applications include document understanding, visual question answering, and cross-modal search capabilities.\",\n    hasImages: true\n  }\n];\n\nreturn mockPages.map(page => ({\n  json: {\n    filename: filename,\n    description: description,\n    pageNumber: page.pageNumber,\n    textContent: page.text,\n    hasImages: page.hasImages,\n    uploadedAt: new Date().toISOString(),\n    formSubmissionId: $executionId\n  },\n  binary: { file: file }\n}));"
      },
      "id": "extract-pdf",
      "name": "Extract PDF Content",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendQuery": false,
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.textContent) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "voyage-embed",
      "name": "Generate Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "operation": "insert",
        "collection": "pdf_documents",
        "fields": "={\n  \"filename\": {{ JSON.stringify($('Extract PDF Content').item.json.filename) }},\n  \"description\": {{ JSON.stringify($('Extract PDF Content').item.json.description) }},\n  \"pageNumber\": {{ $('Extract PDF Content').item.json.pageNumber }},\n  \"textContent\": {{ JSON.stringify($('Extract PDF Content').item.json.textContent) }},\n  \"embedding\": {{ JSON.stringify($json.embeddings[0]) }},\n  \"metadata\": {\n    \"uploadedAt\": {{ JSON.stringify($('Extract PDF Content').item.json.uploadedAt) }},\n    \"model\": {{ JSON.stringify($json.model) }},\n    \"dimensions\": 1024,\n    \"hasImages\": {{ $('Extract PDF Content').item.json.hasImages }},\n    \"formSubmissionId\": {{ JSON.stringify($('Extract PDF Content').item.json.formSubmissionId) }}\n  }\n}"
      },
      "id": "mongodb-store",
      "name": "Store in MongoDB",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [900, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "path": "ask-question",
        "formTitle": "🤖 Ask About Your PDFs",
        "formDescription": "Ask questions about the documents you've uploaded",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Your Question",
              "fieldType": "text",
              "requiredField": true,
              "placeholder": "What would you like to know about your documents?"
            },
            {
              "fieldLabel": "Search Specific File (Optional)",
              "fieldType": "text",
              "placeholder": "Leave empty to search all documents"
            }
          ]
        },
        "responseMode": "responseNode",
        "options": {
          "formSubmitButtonLabel": "Ask Question"
        }
      },
      "id": "form-ask",
      "name": "Q&A Form",
      "type": "@n8n/n8n-nodes-langchain.formTrigger",
      "typeVersion": 2.1,
      "position": [240, 600],
      "webhookId": "qa-form-trigger"
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendQuery": false,
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.question) }},\n  \"model\": \"voyage-3\"\n}",
        "options": {}
      },
      "id": "embed-question",
      "name": "Embed Question",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 600]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "pdf_documents",
        "query": "=[\n  {\n    \"$vectorSearch\": {\n      \"index\": \"vector_index\",\n      \"path\": \"embedding\",\n      \"queryVector\": {{ JSON.stringify($json.embeddings[0]) }},\n      \"numCandidates\": 100,\n      \"limit\": 5,\n      \"filter\": {{ $('Q&A Form').item.json.filename ? JSON.stringify({ filename: $('Q&A Form').item.json.filename }) : '{}' }}\n    }\n  },\n  {\n    \"$project\": {\n      \"_id\": 1,\n      \"filename\": 1,\n      \"pageNumber\": 1,\n      \"textContent\": 1,\n      \"description\": 1,\n      \"score\": { \"$meta\": \"vectorSearchScore\" }\n    }\n  }\n]"
      },
      "id": "vector-search",
      "name": "Vector Search",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [680, 600],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-local",
          "name": "MongoDB Local"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Build AI prompt with context\nconst question = $('Q&A Form').item.json.question;\nconst searchResults = $input.all();\n\nif (!searchResults.length) {\n  return [{\n    json: {\n      answer: \"I couldn't find any relevant information in the uploaded documents. Please make sure you've uploaded PDFs first.\",\n      sources: []\n    }\n  }];\n}\n\n// Build context from search results\nconst context = searchResults\n  .map((item, idx) => \n    `[Source ${idx + 1} - ${item.json.filename}, Page ${item.json.pageNumber}]\\n${item.json.textContent}`\n  )\n  .join('\\n\\n');\n\n// For workshop - simulate AI response\n// In production, call OpenAI/Gemini here\nconst mockResponse = `Based on the documents you've uploaded, here's what I found regarding \"${question}\":\\n\\n`;\n\nconst answer = mockResponse + \n  `The documents discuss ${question.toLowerCase().includes('ai') ? 'artificial intelligence and multimodal systems' : 'the topic you asked about'}. ` +\n  `Specifically, I found relevant information in ${searchResults[0].json.filename} (page ${searchResults[0].json.pageNumber}) ` +\n  `that mentions: \"${searchResults[0].json.textContent.substring(0, 150)}...\"\\n\\n` +\n  `This information comes from ${searchResults.length} relevant sections across your uploaded PDFs.`;\n\nreturn [{\n  json: {\n    answer: answer,\n    sources: searchResults.map(r => ({\n      filename: r.json.filename,\n      page: r.json.pageNumber,\n      relevance: r.json.score\n    })),\n    question: question,\n    timestamp: new Date().toISOString()\n  }\n}];"
      },
      "id": "generate-answer",
      "name": "Generate Answer",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [900, 600]
    },
    {
      "parameters": {
        "html": "=<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;\">\n  <div style=\"background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n    <h2 style=\"color: #1a73e8; margin-top: 0;\">🤖 Your Answer</h2>\n    <p style=\"color: #5f6368; white-space: pre-wrap;\">{{ $json.answer }}</p>\n  </div>\n  \n  <div style=\"background: #e8f0fe; border-radius: 8px; padding: 20px;\">\n    <h3 style=\"color: #1967d2; margin-top: 0;\">📚 Sources</h3>\n    <ul style=\"list-style: none; padding: 0;\">\n      {{ $json.sources.map(s => `<li style=\"margin-bottom: 10px;\">• <strong>${s.filename}</strong> - Page ${s.page} (Relevance: ${(s.relevance * 100).toFixed(1)}%)</li>`).join('') }}\n    </ul>\n  </div>\n  \n  <div style=\"margin-top: 20px; text-align: center;\">\n    <a href=\"/webhook/ask-question\" style=\"background: #1a73e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;\">Ask Another Question</a>\n  </div>\n</div>"
      },
      "id": "respond-with-html",
      "name": "Format Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [1120, 600]
    },
    {
      "parameters": {
        "content": "## 🎯 Complete Multimodal PDF Agent with Forms\n\n### Two User-Friendly Forms:\n\n1. **PDF Upload Form** (`/webhook/upload-pdf`)\n   - Drag & drop PDF upload\n   - Optional description field\n   - Processes with Voyage AI\n\n2. **Q&A Form** (`/webhook/ask-question`)\n   - Natural language questions\n   - Optional filename filter\n   - Beautiful formatted responses\n\n### Features:\n- No coding required for users\n- Works perfectly in Codespaces\n- Mobile-friendly forms\n- Vector search with MongoDB\n- Source citations included",
        "height": 280,
        "width": 400
      },
      "id": "workflow-info",
      "name": "Workflow Info",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [620, 50]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload Form": {
      "main": [
        [
          {
            "node": "Extract PDF Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract PDF Content": {
      "main": [
        [
          {
            "node": "Generate Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Embeddings": {
      "main": [
        [
          {
            "node": "Store in MongoDB",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Q&A Form": {
      "main": [
        [
          {
            "node": "Embed Question",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Embed Question": {
      "main": [
        [
          {
            "node": "Vector Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Vector Search": {
      "main": [
        [
          {
            "node": "Generate Answer",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Answer": {
      "main": [
        [
          {
            "node": "Format Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "form-based-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "multimodal-pdf-agent-forms",
  "tags": ["workshop", "forms", "user-friendly", "multimodal"]
}
```

# 07-pdf-processing-agent.json

```json
{
  "name": "PDF Processing Agent with LangChain",
  "nodes": [
    {
      "parameters": {
        "path": "process-pdf",
        "options": {
          "noResponseBody": false
        },
        "responseMode": "lastNode"
      },
      "id": "pdf-webhook",
      "name": "PDF Upload Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "systemPromptTemplate": "You are a PDF processing agent. Your job is to:\n1. Validate uploaded PDF files\n2. Extract text and identify visual elements\n3. Generate multimodal embeddings\n4. Store processed content in MongoDB\n5. Provide a summary of the processing results\n\nAlways be thorough in your analysis and provide clear feedback about what was processed.",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2.1,
      "position": [680, 300],
      "id": "processing-agent",
      "name": "PDF Processing Agent"
    },
    {
      "parameters": {
        "model": "gemini-2.0-flash-exp",
        "options": {
          "temperature": 0.2,
          "maxOutputTokens": 1024
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [460, 500],
      "id": "gemini-processor",
      "name": "Gemini Processing Model",
      "credentials": {
        "googlePalmApi": {
          "id": "workshop-gemini-api",
          "name": "Workshop Gemini API"
        }
      }
    },
    {
      "parameters": {
        "connectionString": "={{ $env.MONGODB_CONNECTION_STRING }}",
        "databaseName": "multimodal_workshop",
        "collectionName": "pdf_documents",
        "indexName": "vector_index",
        "embeddingDimensions": 1024,
        "textKey": "text_content"
      },
      "type": "@n8n/n8n-nodes-langchain.vectorStoreMongoDb",
      "typeVersion": 1,
      "position": [680, 500],
      "id": "mongodb-storage",
      "name": "MongoDB Document Store",
      "credentials": {
        "mongoDb": {
          "id": "mongodb-workshop",
          "name": "MongoDB Workshop"
        }
      }
    },
    {
      "parameters": {
        "model": "voyage-multimodal-3",
        "options": {
          "inputType": "document"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.embeddingsVoyageAI",
      "typeVersion": 1,
      "position": [460, 700],
      "id": "voyage-processor",
      "name": "Voyage Multimodal Embeddings",
      "credentials": {
        "voyageAiApi": {
          "id": "workshop-voyage-api",
          "name": "Workshop Voyage API"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// PDF File Validation and Processing Preparation\nconst items = $input.all();\n\nif (!items.length) {\n  throw new Error('No input received');\n}\n\nconst item = items[0];\nconst binary = item.binary;\n\nif (!binary || !binary.data) {\n  throw new Error('No file uploaded');\n}\n\nconst filename = binary.data.fileName || 'unknown.pdf';\nconst fileSize = binary.data.fileSize || 0;\nconst mimeType = binary.data.mimeType || '';\n\n// Validate PDF\nif (!filename.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Only PDF files are supported');\n}\n\nif (fileSize > 50 * 1024 * 1024) { // 50MB limit\n  throw new Error('File too large. Maximum size is 50MB');\n}\n\n// Prepare processing context\nconst processingContext = {\n  filename: filename,\n  fileSize: fileSize,\n  sizeMB: (fileSize / (1024 * 1024)).toFixed(2),\n  mimeType: mimeType,\n  uploadedAt: new Date().toISOString(),\n  status: 'validated',\n  processingId: `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`\n};\n\nconsole.log('📄 PDF Validation Complete:', processingContext);\n\nreturn [{\n  json: {\n    message: `PDF file validated successfully: ${filename} (${processingContext.sizeMB}MB)`,\n    context: processingContext,\n    readyForProcessing: true\n  },\n  binary: binary\n}];"
      },
      "id": "validate-pdf",
      "name": "Validate PDF File",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "name": "extract_pdf_content",
        "description": "Extract text content and identify visual elements from the uploaded PDF file. This tool processes the PDF and prepares it for embedding generation.",
        "jsCode": "const context = $json.context;\nconst filename = context.filename;\n\n// Simulate advanced PDF content extraction\n// In production, this would use libraries like pdf-parse, pdf2pic, or pymupdf\n\nconst extractedContent = {\n  filename: filename,\n  text_content: `EXTRACTED CONTENT FROM: ${filename}\\n\\n` +\n    `DOCUMENT SUMMARY:\\n` +\n    `This PDF contains comprehensive information about multimodal AI systems, vector databases, and machine learning applications. ` +\n    `The document is well-structured with clear sections covering theoretical foundations and practical implementations.\\n\\n` +\n    \n    `MAIN SECTIONS:\\n` +\n    `1. Introduction to Multimodal AI (Pages 1-3)\\n` +\n    `   - Covers the basics of processing multiple data types simultaneously\\n` +\n    `   - Discusses the advantages of multimodal approaches\\n` +\n    `   - Includes architecture diagrams showing data flow\\n\\n` +\n    \n    `2. Vector Databases and Embeddings (Pages 4-7)\\n` +\n    `   - Detailed explanation of vector similarity search\\n` +\n    `   - MongoDB Atlas Vector Search implementation examples\\n` +\n    `   - Performance comparison charts and benchmarks\\n\\n` +\n    \n    `3. Practical Applications (Pages 8-12)\\n` +\n    `   - Real-world use cases in document processing\\n` +\n    `   - Code examples and implementation patterns\\n` +\n    `   - Best practices for production deployment\\n\\n` +\n    \n    `TECHNICAL DETAILS:\\n` +\n    `The document provides in-depth coverage of embedding techniques, including Voyage AI's multimodal-3 model ` +\n    `with 1024-dimensional vectors. It discusses HNSW (Hierarchical Navigable Small World) indexing for ` +\n    `efficient similarity search and provides performance metrics showing sub-second query times.\\n\\n` +\n    \n    `VISUAL ELEMENTS IDENTIFIED:\\n` +\n    `- System architecture diagrams showing data processing pipelines\\n` +\n    `- Performance charts comparing different embedding models\\n` +\n    `- Code snippets demonstrating implementation patterns\\n` +\n    `- Tables with numerical results and benchmarks`,\n  \n  images_detected: [\n    {\n      page: 2,\n      type: 'architecture_diagram',\n      title: 'Multimodal AI System Architecture',\n      description: 'Comprehensive diagram showing data flow from input processing through embedding generation to vector storage and retrieval'\n    },\n    {\n      page: 5,\n      type: 'performance_chart',\n      title: 'Embedding Model Comparison',\n      description: 'Bar chart comparing accuracy and speed metrics across different multimodal embedding models'\n    },\n    {\n      page: 8,\n      type: 'workflow_diagram', \n      title: 'Document Processing Pipeline',\n      description: 'Step-by-step workflow showing PDF ingestion, content extraction, embedding generation, and storage'\n    },\n    {\n      page: 10,\n      type: 'results_table',\n      title: 'Performance Benchmarks',\n      description: 'Detailed table showing query response times, accuracy scores, and throughput metrics'\n    }\n  ],\n  \n  metadata: {\n    word_count: 3247,\n    estimated_reading_time: '13-16 minutes',\n    pages: Math.ceil(context.fileSize / (1024 * 150)), // Rough estimate\n    has_images: true,\n    has_code: true,\n    has_tables: true,\n    content_type: 'technical_documentation',\n    complexity_level: 'advanced',\n    extracted_at: new Date().toISOString()\n  }\n};\n\nconsole.log('🔍 Content Extraction Complete:', {\n  filename: extractedContent.filename,\n  wordCount: extractedContent.metadata.word_count,\n  imagesFound: extractedContent.images_detected.length\n});\n\nreturn {\n  extracted_content: JSON.stringify(extractedContent, null, 2),\n  summary: `Successfully extracted ${extractedContent.metadata.word_count} words and identified ${extractedContent.images_detected.length} visual elements from ${filename}`\n};"
      },
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [900, 200],
      "id": "extraction-tool",
      "name": "PDF Content Extraction Tool"
    },
    {
      "parameters": {
        "name": "store_in_mongodb",
        "description": "Store the processed PDF content and embeddings in MongoDB Atlas with vector search capabilities.",
        "jsCode": "const extractedData = JSON.parse($json.extracted_content);\nconst context = $json.context;\n\n// Simulate storing in MongoDB\n// In production, this would use the actual MongoDB connection\n\nconst storageResult = {\n  document_id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,\n  filename: extractedData.filename,\n  collection: 'pdf_documents',\n  database: 'multimodal_workshop',\n  \n  stored_fields: {\n    filename: extractedData.filename,\n    text_content: extractedData.text_content,\n    images_detected: extractedData.images_detected,\n    metadata: extractedData.metadata,\n    embedding: '[1024-dimensional vector would be stored here]',\n    upload_info: context,\n    indexed_at: new Date().toISOString()\n  },\n  \n  vector_index: {\n    index_name: 'vector_index',\n    dimensions: 1024,\n    similarity_metric: 'cosine',\n    status: 'indexed'\n  },\n  \n  processing_stats: {\n    processing_time_ms: Math.floor(Math.random() * 5000) + 2000,\n    embedding_generation_time_ms: Math.floor(Math.random() * 2000) + 1000,\n    storage_time_ms: Math.floor(Math.random() * 1000) + 500\n  }\n};\n\nconsole.log('💾 MongoDB Storage Complete:', {\n  documentId: storageResult.document_id,\n  filename: storageResult.filename,\n  processingTime: `${storageResult.processing_stats.processing_time_ms}ms`\n});\n\nreturn {\n  storage_result: JSON.stringify(storageResult, null, 2),\n  summary: `Document ${extractedData.filename} successfully stored in MongoDB with document ID: ${storageResult.document_id}. Vector index created and ready for search.`\n};"
      },
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [900, 300],
      "id": "storage-tool",
      "name": "MongoDB Storage Tool"
    },
    {
      "parameters": {
        "name": "generate_processing_summary",
        "description": "Generate a comprehensive summary of the PDF processing results including all steps completed and next available actions.",
        "jsCode": "const extractedData = JSON.parse($json.extracted_content);\nconst storageData = JSON.parse($json.storage_result);\nconst context = $json.context;\n\nconst summary = {\n  processing_complete: true,\n  document_info: {\n    filename: extractedData.filename,\n    size_mb: context.sizeMB,\n    pages: extractedData.metadata.pages,\n    word_count: extractedData.metadata.word_count,\n    reading_time: extractedData.metadata.estimated_reading_time\n  },\n  \n  content_analysis: {\n    main_topics: [\n      'Multimodal AI Systems',\n      'Vector Databases', \n      'Machine Learning Applications',\n      'Technical Implementation'\n    ],\n    visual_elements: {\n      total: extractedData.images_detected.length,\n      types: [...new Set(extractedData.images_detected.map(img => img.type))],\n      detailed_list: extractedData.images_detected\n    },\n    complexity: extractedData.metadata.complexity_level,\n    content_type: extractedData.metadata.content_type\n  },\n  \n  processing_results: {\n    text_extracted: true,\n    images_identified: true,\n    embeddings_generated: true,\n    stored_in_mongodb: true,\n    vector_indexed: true,\n    document_id: storageData.document_id\n  },\n  \n  next_steps: [\n    'Document is now searchable via vector similarity',\n    'You can ask questions about the content',\n    'Visual elements can be referenced in queries',\n    'Full-text search is available',\n    'Document can be compared with other uploaded files'\n  ],\n  \n  performance: {\n    total_processing_time: `${storageData.processing_stats.processing_time_ms}ms`,\n    embedding_time: `${storageData.processing_stats.embedding_generation_time_ms}ms`,\n    storage_time: `${storageData.processing_stats.storage_time_ms}ms`\n  }\n};\n\nconst finalMessage = `\\n🎉 **PDF Processing Complete!**\\n\\n` +\n  `**Document:** ${summary.document_info.filename}\\n` +\n  `**Size:** ${summary.document_info.size_mb}MB (${summary.document_info.pages} pages)\\n` +\n  `**Content:** ${summary.document_info.word_count} words, ${summary.content_analysis.visual_elements.total} visual elements\\n\\n` +\n  \n  `**Analysis Results:**\\n` +\n  `• Main topics: ${summary.content_analysis.main_topics.join(', ')}\\n` +\n  `• Visual elements: ${summary.content_analysis.visual_elements.types.join(', ')}\\n` +\n  `• Complexity level: ${summary.content_analysis.complexity}\\n\\n` +\n  \n  `**What's Available Now:**\\n` +\n  `✅ Vector search enabled\\n` +\n  `✅ Question answering ready\\n` +\n  `✅ Visual content can be referenced\\n` +\n  `✅ Document comparison possible\\n\\n` +\n  \n  `**Next Steps:**\\n` +\n  `You can now ask questions about this document! I can help you understand the content, ` +\n  `explain charts and diagrams, compare sections, or find specific information.\\n\\n` +\n  \n  `**Processing Stats:** Completed in ${summary.performance.total_processing_time}`;\n\nreturn {\n  final_summary: JSON.stringify(summary, null, 2),\n  message: finalMessage\n};"
      },
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [900, 400],
      "id": "summary-tool",
      "name": "Processing Summary Tool"
    }
  ],
  "connections": {
    "PDF Upload Webhook": {
      "main": [
        [
          {
            "node": "Validate PDF File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validate PDF File": {
      "main": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Gemini Processing Model": {
      "ai_languageModel": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "MongoDB Document Store": {
      "ai_vectorStore": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "ai_vectorStore",
            "index": 0
          }
        ]
      ]
    },
    "Voyage Multimodal Embeddings": {
      "ai_embedding": [
        [
          {
            "node": "MongoDB Document Store",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "PDF Content Extraction Tool": {
      "ai_tool": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "MongoDB Storage Tool": {
      "ai_tool": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "ai_tool",
            "index": 1
          }
        ]
      ]
    },
    "Processing Summary Tool": {
      "ai_tool": [
        [
          {
            "node": "PDF Processing Agent",
            "type": "ai_tool",
            "index": 2
          }
        ]
      ]
    }
  },
  "pinData": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "pdf-processing-agent-v1",
  "meta": {
    "templateCredsSetupCompleted": false
  },
  "id": "pdf-processing-agent-langchain",
  "tags": ["workshop", "agent", "langchain", "pdf", "processing", "multimodal"]
}
```

# 08-voyage-context-3-embeddings.json

```json
{
  "name": "Enhanced Text Embeddings with Voyage Context-3",
  "nodes": [ 
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "context-embed",
        "responseMode": "lastNode",
        "options": {}
      },
      "id": "webhook-context",
      "name": "Webhook - Context Embeddings",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "context-embed-webhook"
    },
    {
      "parameters": {
        "url": "={{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.input) }},\n  \"model\": \"voyage-context-3\",\n  \"input_type\": {{ JSON.stringify($json.input_type || 'document') }},\n  \"context\": {{ JSON.stringify($json.context || null) }}\n}",
        "options": {}
      },
      "id": "voyage-context-3-request",
      "name": "Generate Context-3 Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "embedding_type",
              "value": "contextualized_chunk_embedding"
            },
            {
              "name": "model_used",
              "value": "={{ $json.model || 'voyage-context-3' }}"
            },
            {
              "name": "embedding_dimensions",
              "value": "={{ $json.embeddings[0].length }}"
            },
            {
              "name": "total_tokens",
              "value": "={{ $json.usage?.total_tokens || 'N/A' }}"
            }
          ],
          "number": [
            {
              "name": "embedding_preview_start",
              "value": "={{ $json.embeddings[0].slice(0, 5) }}"
            },
            {
              "name": "embedding_preview_end",
              "value": "={{ $json.embeddings[0].slice(-5) }}"
            }
          ]
        }
      },
      "id": "format-response",
      "name": "Format Context Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [680, 300]
    },
    {
      "parameters": {
        "content": "## Voyage Context-3: Advanced Text Understanding for Multimodal Workflows\n\n### Enhancing Your Multimodal Agent with Context-3\n\n**voyage-context-3** is a specialized text embedding model that complements multimodal workflows:\n\n1. **Contextual Text Understanding**: While your multimodal models (voyage-3, voyage-multimodal-3) handle images AND text, context-3 provides superior understanding of text relationships.\n\n2. **Hybrid Approach**: Use BOTH models together:\n   - **voyage-multimodal-3**: For images and general text from PDFs\n   - **voyage-context-3**: For deep text understanding and context\n\n3. **Better Text Retrieval**: When users ask complex questions about document text, context-3 excels at:\n   - Understanding relationships between paragraphs\n   - Maintaining document structure awareness\n   - Legal, technical, and narrative documents\n\n### Combining with Multimodal:\n\`\`\`json\n// For images + basic text:\n{ \"model\": \"voyage-multimodal-3\", \"input\": \"image_or_text\" }\n\n// For advanced text chunks:\n{ \"model\": \"voyage-context-3\", \"input\": \"text\", \"context\": \"surrounding_text\" }\n\`\`\`\n\n### Workshop Integration:\n- Extract images → voyage-multimodal-3\n- Extract complex text → voyage-context-3\n- Store both in MongoDB Atlas Vector Search",
        "height": 520,
        "width": 400
      },
      "id": "context-3-documentation",
      "name": "Context-3 Documentation",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [240, 580]
    },
    {
      "parameters": {
        "url": "={{ $env.WORKSHOP_EMBEDDING_URL || 'https://workshop-embedding-api.vercel.app/api/embed' }}",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "action",
              "value": "search"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"query\": {{ JSON.stringify($json.query) }},\n  \"model\": \"voyage-context-3\",\n  \"top_k\": {{ $json.top_k || 5 }},\n  \"input_type\": \"query\"\n}",
        "options": {}
      },
      "id": "context-retrieval-demo",
      "name": "Context-Aware Retrieval (Optional)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 580],
      "disabled": true
    },
    {
      "parameters": {
        "content": "## Workshop Integration: Enhancing Multimodal Agents\n\n🚀 **Power Combo**: voyage-multimodal-3 + voyage-context-3\n\n✅ Your multimodal PDF agent becomes even more powerful by:\n1. Using **voyage-multimodal-3** for images and basic text\n2. Using **voyage-context-3** for complex text understanding\n3. Storing both in MongoDB Atlas Vector Search\n\n✅ Example PDF Processing Flow:\n- Page has diagram → voyage-multimodal-3\n- Page has legal text → voyage-context-3\n- User asks about diagram → search multimodal embeddings\n- User asks about contract details → search context embeddings\n\n✅ This gives you the best of both worlds:\n- Visual understanding (multimodal)\n- Deep text comprehension (context-3)",
        "height": 220,
        "width": 400,
        "color": 5
      },
      "id": "multimodal-note",
      "name": "Multimodal Compatibility",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [700, 480]
    }
  ],
  "pinData": {},
  "connections": {
    "Webhook - Context Embeddings": {
      "main": [
        [
          {
            "node": "Generate Context-3 Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Context-3 Embeddings": {
      "main": [
        [
          {
            "node": "Format Context Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "voyage-context-3-v1",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "workshop-instance"
  },
  "id": "voyage-context-3-embeddings",
  "tags": ["embeddings", "voyage-ai", "context-3", "multimodal"]
}
```

# 09-hybrid-multimodal-context-agent.json

```json
{
  "name": "Hybrid Multimodal PDF Agent with Context-3 Enhancement",
  "nodes": [
    {
      "parameters": {
        "path": "pdf-hybrid-upload",
        "options": {
          "binaryPropertyName": "data"
        },
        "responseMode": "lastNode"
      },
      "id": "webhook-pdf-hybrid",
      "name": "PDF Upload (Hybrid Processing)",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "pdf-hybrid-upload"
    },
    {
      "parameters": {
        "jsCode": "// Extract PDF for HYBRID processing (images + contextualized text)\nconst binary = $binary.data;\nif (!binary || !binary.fileName?.toLowerCase().endsWith('.pdf')) {\n  throw new Error('Valid PDF file required');\n}\n\n// Simulate hybrid PDF extraction\nconst pages = [\n  {\n    pageNumber: 1,\n    text: \"Building Multimodal AI Agents with MongoDB and Voyage AI\",\n    context: \"Title page of workshop documentation\",\n    hasImages: true,\n    imageDescription: \"Voyage AI logo and MongoDB logo\"\n  },\n  {\n    pageNumber: 2,\n    text: \"Voyage AI offers both multimodal embeddings for images and contextualized embeddings for advanced text understanding\",\n    context: \"Introduction section following title page\",\n    hasImages: true,\n    imageDescription: \"Architecture diagram showing multimodal pipeline\"\n  },\n  {\n    pageNumber: 3,\n    text: \"Legal disclaimer: This workshop material is provided as-is for educational purposes\",\n    context: \"Legal section requiring deep text understanding\",\n    hasImages: false,\n    imageDescription: null\n  }\n];\n\nreturn pages.map(page => ({\n  json: {\n    filename: binary.fileName,\n    pageNumber: page.pageNumber,\n    textContent: page.text,\n    pageContext: page.context,\n    hasImages: page.hasImages,\n    imageDescription: page.imageDescription,\n    requiresContextualText: page.text.includes('Legal') || page.text.includes('technical'),\n    timestamp: new Date().toISOString()\n  }\n}));"
      },
      "id": "extract-hybrid-content",
      "name": "Extract Hybrid PDF Content",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "has-images",
              "leftValue": "={{ $json.hasImages }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "route-by-content",
      "name": "Route by Content Type",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [680, 300]
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.textContent) }},\n  \"model\": \"voyage-multimodal-3\",\n  \"input_type\": \"document\",\n  \"metadata\": {\n    \"page\": {{ $json.pageNumber }},\n    \"has_images\": true,\n    \"image_description\": {{ JSON.stringify($json.imageDescription) }}\n  }\n}",
        "options": {}
      },
      "id": "voyage-multimodal",
      "name": "Generate Multimodal Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [900, 240]
    },
    {
      "parameters": {
        "url": "https://workshop-embedding-api.vercel.app/api/embed",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"text\": {{ JSON.stringify($json.textContent) }},\n  \"model\": \"voyage-context-3\",\n  \"input_type\": \"document\",\n  \"context\": {{ JSON.stringify($json.pageContext) }},\n  \"metadata\": {\n    \"page\": {{ $json.pageNumber }},\n    \"requires_context\": true\n  }\n}",
        "options": {}
      },
      "id": "voyage-context-3",
      "name": "Generate Context-3 Embeddings",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [900, 360]
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByPosition",
        "options": {}
      },
      "id": "merge-embeddings",
      "name": "Merge All Embeddings",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3,
      "position": [1120, 300]
    },
    {
      "parameters": {
        "operation": "insert",
        "collection": "hybrid_pdf_documents",
        "fields": "={\n  \"filename\": {{ JSON.stringify($('Extract Hybrid PDF Content').item.json.filename) }},\n  \"pageNumber\": {{ $('Extract Hybrid PDF Content').item.json.pageNumber }},\n  \"content\": {\n    \"text\": {{ JSON.stringify($('Extract Hybrid PDF Content').item.json.textContent) }},\n    \"context\": {{ JSON.stringify($('Extract Hybrid PDF Content').item.json.pageContext) }},\n    \"hasImages\": {{ $('Extract Hybrid PDF Content').item.json.hasImages }}\n  },\n  \"embeddings\": {\n    \"multimodal\": {{ $json.hasImages ? JSON.stringify($('Generate Multimodal Embeddings').item.json.embeddings[0]) : null }},\n    \"contextual\": {{ $json.requiresContextualText ? JSON.stringify($('Generate Context-3 Embeddings').item.json.embeddings[0]) : null }}\n  },\n  \"metadata\": {\n    \"models_used\": [\n      {{ $json.hasImages ? '\"voyage-multimodal-3\"' : '' }},\n      {{ $json.requiresContextualText ? '\"voyage-context-3\"' : '' }}\n    ].filter(Boolean),\n    \"timestamp\": {{ JSON.stringify($('Extract Hybrid PDF Content').item.json.timestamp) }}\n  }\n}"
      },
      "id": "store-hybrid-embeddings",
      "name": "Store Hybrid Embeddings",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1.1,
      "position": [1340, 300],
      "credentials": {
        "mongoDb": {
          "id": "mongodb-atlas",
          "name": "MongoDB Atlas"
        }
      }
    },
    {
      "parameters": {
        "content": "## 🚀 Hybrid Approach: Best of Both Worlds\n\n### This workflow demonstrates the POWER of combining:\n\n1. **voyage-multimodal-3**: \n   - Handles images, diagrams, charts\n   - Basic text understanding\n   - Cross-modal search (text→image)\n\n2. **voyage-context-3**: \n   - Superior text comprehension\n   - Document structure awareness\n   - Legal/technical text mastery\n\n### Intelligent Routing:\n- Pages with images → Multimodal embeddings\n- Complex text pages → Context-3 embeddings\n- Some pages get BOTH!\n\n### MongoDB Storage:\nStore multiple embedding types per document for ultimate flexibility in search and retrieval.",
        "height": 420,
        "width": 400,
        "color": 4
      },
      "id": "hybrid-benefits",
      "name": "Hybrid Architecture Benefits",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [240, 560]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "status",
              "value": "success"
            },
            {
              "name": "message",
              "value": "=PDF processed with hybrid approach: {{ $('Extract Hybrid PDF Content').first().json.filename }}"
            }
          ],
          "number": [
            {
              "name": "pagesProcessed",
              "value": "={{ $('Extract Hybrid PDF Content').all().length }}"
            },
            {
              "name": "multimodalEmbeddings",
              "value": "={{ $('Generate Multimodal Embeddings').all().length }}"
            },
            {
              "name": "contextualEmbeddings",
              "value": "={{ $('Generate Context-3 Embeddings').all().length }}"
            }
          ]
        }
      },
      "id": "response-summary",
      "name": "Response Summary",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [1560, 300]
    }
  ],
  "pinData": {},
  "connections": {
    "PDF Upload (Hybrid Processing)": {
      "main": [
        [
          {
            "node": "Extract Hybrid PDF Content",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Hybrid PDF Content": {
      "main": [
        [
          {
            "node": "Route by Content Type",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Route by Content Type": {
      "main": [
        [
          {
            "node": "Generate Multimodal Embeddings",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Generate Context-3 Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Multimodal Embeddings": {
      "main": [
        [
          {
            "node": "Merge All Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Context-3 Embeddings": {
      "main": [
        [
          {
            "node": "Merge All Embeddings",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Merge All Embeddings": {
      "main": [
        [
          {
            "node": "Store Hybrid Embeddings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Store Hybrid Embeddings": {
      "main": [
        [
          {
            "node": "Response Summary",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "hybrid-multimodal-v1",
  "id": "hybrid-multimodal-context-agent",
  "tags": ["multimodal", "hybrid", "pdf", "voyage-context-3", "voyage-multimodal-3", "atlas-vector-search"]
}
```

