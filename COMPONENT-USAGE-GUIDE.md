# 📖 Workshop Component Usage Guide

This guide explains how to use the custom workshop components throughout your documentation.

## 🎯 Component Overview

### 1. WorkshopTransition
**Purpose**: Bridge between Google Slides presentation and hands-on Docusaurus content.
**Where it's used**: Currently only on the main workshop overview page (`docs/index.mdx`)
**When to use**: At the very beginning of your workshop documentation to welcome attendees transitioning from slides.

### 2. InstructorNotes
**Purpose**: Provide timing, tips, and guidance for workshop instructors.
**Where it's used**: Throughout the documentation (`index.mdx`, `10-intro.mdx`, `25-n8n-first-run.mdx`, `30-mongodb-atlas-setup.mdx`)
**When to use**: At the beginning of each major section or before complex exercises.

### 3. SlideRecap
**Purpose**: Summarize what was covered in the Google Slides before diving into hands-on content.
**Where it's used**: Currently in `10-intro.mdx`
**When to use**: After transitioning from slides to reinforce key concepts.

### 4. QRCodeAccess
**Purpose**: Generate QR codes for easy mobile access to workshop materials.
**Where it's used**: Bottom of `index.mdx`
**When to use**: Anywhere you want attendees to quickly access a URL on their phones.

## 📝 Usage Examples

### WorkshopTransition

```jsx
<WorkshopTransition 
  slideTopics={[
    "Workshop overview and learning objectives",
    "Architecture overview", 
    "Technology stack introduction"
  ]}
  instructor="Michael Lynn"
  welcomeMessage="Welcome to the Hands-On Workshop!"
  handsOnUrl="/docs/intro"
/>
```

**Best practices:**
- Use only on the main landing page
- List 3-5 key slide topics
- Customize instructor name
- Optional: Override welcome message

### InstructorNotes

```jsx
<InstructorNotes 
  timing="MongoDB Atlas Setup (15-20 minutes)"
  notes={[
    "Atlas signup can take a few minutes - start early",
    "Credit card may be required but we'll stay in free tier",
    "Network access setup often confuses first-time users"
  ]}
  tips={[
    "Demo the Atlas setup on screen while attendees follow",
    "Have backup connection strings ready",
    "Consider pair programming for troubleshooting"
  ]}
/>
```

**Best practices:**
- Include realistic timing estimates
- Add 3-5 practical notes from experience
- Provide actionable tips
- Place at the beginning of sections

### SlideRecap

```jsx
<SlideRecap 
  title="From Presentation to Practice"
  items={[
    {
      icon: "🏗️",
      title: "Architecture Overview",
      description: "We covered how n8n, MongoDB Atlas, and Voyage AI work together"
    },
    {
      icon: "🎯", 
      title: "Learning Objectives",
      description: "Build a production-ready multimodal PDF processing system"
    }
  ]}
  nextSection="Now we'll build this system step by step!"
/>
```

**Best practices:**
- Use after transitioning from slides
- Include 3-4 key concepts from slides
- Use relevant emojis for visual appeal
- End with encouraging next step message

### QRCodeAccess

```jsx
<QRCodeAccess 
  url={typeof window !== 'undefined' ? window.location.origin + '/docs/' : 'https://workshop.example.com/docs/'}
  title="Share Workshop Materials"
/>
```

**Best practices:**
- Use dynamic URL generation when possible
- Provide fallback URL for SSR
- Place where attendees might need mobile access
- Consider adding at section transitions

## 🚀 Where to Add More Components

### Recommended Additions:

1. **InstructorNotes** - Add to every major section:
   - `prerequisites.mdx` - Common setup issues
   - `github-codespaces.mdx` - Port forwarding tips
   - `pdf-processing-workflow.mdx` - Debugging workflow issues
   - `voyage-ai-setup.mdx` - API key management
   - `vector-search-implementation.mdx` - Index creation timing
   - `ai-agent-workflow.mdx` - Model selection guidance
   - `complete-multimodal-agent.mdx` - Integration testing tips

2. **SlideRecap** - Add after major conceptual sections:
   - After prerequisites overview
   - Before starting PDF processing
   - Before vector search implementation

3. **QRCodeAccess** - Add for:
   - External resources (MongoDB Atlas signup)
   - API documentation links
   - Sample file downloads
   - Final deployed application

## 💡 Component Composition

You can combine components for powerful experiences:

```jsx
{/* Start of a major section */}
<SlideRecap 
  title="Vector Search Concepts"
  items={[...]}
/>

<InstructorNotes 
  timing="20 minutes"
  notes={["Start MongoDB Atlas setup early"]}
/>

<WorkshopExercise>
  {/* Exercise content */}
</WorkshopExercise>

{/* End with access options */}
<QRCodeAccess 
  url="https://docs.mongodb.com/atlas"
  title="MongoDB Atlas Documentation"
/>
```

## 🎨 Styling Guidelines

1. **Consistency**: Use components in similar patterns across sections
2. **Visibility**: InstructorNotes should be at section starts
3. **Context**: SlideRecap should reference actual slide content
4. **Accessibility**: QR codes should include text URLs too

## 📊 Current Usage Statistics

- **WorkshopTransition**: 1 instance (index.mdx)
- **InstructorNotes**: 4 instances across 3 files
- **SlideRecap**: 1 instance (10-intro.mdx)
- **QRCodeAccess**: 1 instance (index.mdx)

## 🔄 Next Steps

1. Add InstructorNotes to remaining sections
2. Create SlideRecap components for major transitions
3. Add QRCodeAccess for external resources
4. Consider creating a WorkshopFeedback component
5. Build a WorkshopResources component for additional materials

## 🛠️ Maintenance

- Review instructor notes after each workshop
- Update timing estimates based on actual experience
- Add new tips discovered during delivery
- Keep slide topics synchronized with actual presentation