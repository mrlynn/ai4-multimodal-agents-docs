# 🎓 Instructor Guide: Slides + Docusaurus Workshop Delivery

This guide helps you deliver a seamless workshop experience using Google Slides for introduction and Docusaurus for hands-on content.

## 🎯 Workshop Flow Overview

### Phase 1: Introduction (Google Slides) - 15-20 minutes
- Welcome and introductions
- Workshop overview and objectives
- Technology stack introduction (n8n, MongoDB Atlas, Voyage AI)
- Architecture diagrams and concepts
- Logistics (timing, breaks, Q&A)

### Phase 2: Hands-On Learning (Docusaurus) - 90-100 minutes
- Step-by-step technical implementation
- Interactive exercises and validation
- Real-time API testing
- Progress tracking and completion

## 📊 Google Slides Optimization

### Essential Slides to Include

1. **Welcome & Workshop URL Slide**
   ```
   🎓 Multimodal PDF Agent Workshop
   
   📖 Hands-On Materials:
   [YOUR-DOCUSAURUS-URL]
   
   [QR CODE]
   
   👆 Bookmark this page now!
   ```

2. **Transition Slide**
   ```
   🚀 Let's Build Together!
   
   Time to switch from concepts to code
   
   ➡️ Open: [YOUR-DOCUSAURUS-URL]
   ➡️ Navigate to: Getting Started
   
   (Keep this tab open - we'll reference both)
   ```

3. **Architecture Summary Slide**
   ```
   🏗️ What You'll Build Today
   
   PDF → n8n Workflow → Voyage AI → MongoDB Atlas → AI Agent
   
   📋 This matches the step-by-step guide in your docs
   ```

### Best Practices

- **Add QR Codes**: Use [qr-code-generator.com](https://www.qr-code-generator.com/) 
- **Keep URLs Visible**: Add documentation URL to footer of every slide
- **Use Consistent Branding**: Match colors/fonts with Docusaurus theme
- **Include Bookmarking Reminders**: Multiple slides encouraging attendees to bookmark

## 🔄 Smooth Transition Techniques

### 1. The Bridge Statement
*"Great! Now that we understand the concepts, let's build this system together. Please open your bookmarked documentation page..."*

### 2. Screen Sharing Strategy
- **Dual monitors**: Slides on one, Docusaurus on the other
- **Single screen**: Use browser tabs, switch frequently
- **Virtual workshops**: Share documentation screen after slides

### 3. Interactive Check-In
*"Before we dive in, can everyone confirm they can see the workshop documentation? The page should show a progress tracker and welcome message..."*

## 📱 Attendee Access Options

### Option 1: Desktop/Laptop
- Send documentation URL in chat
- Encourage bookmarking
- Show how to navigate sidebar

### Option 2: Mobile + Desktop
- QR code for mobile access to docs
- Desktop for actual development work
- Mobile as reference during coding

### Option 3: Codespaces Users
- Emphasize opening docs in separate tab
- Port forwarding URLs are different
- Documentation stays consistent

## ⏰ Timing Recommendations

### Introduction Phase (Google Slides)
- **Welcome** (3 min): Introductions, logistics
- **Overview** (5 min): Workshop goals, what they'll build
- **Architecture** (5 min): Technical concepts, stack overview
- **Transition** (2 min): Move to hands-on, URL sharing

### Hands-On Phase (Docusaurus)
- **Environment Setup** (15 min): Docker/Codespaces verification
- **MongoDB Atlas** (15 min): Account setup, connection
- **PDF Processing** (25 min): First workflow creation
- **Vector Search** (20 min): Atlas Vector Search setup
- **AI Agent** (30 min): Complete agent with tool calling

## 🛠️ Technical Setup Tips

### Before Workshop
- [ ] Test all documentation links
- [ ] Verify embedding API is responding
- [ ] Have backup n8n instance ready
- [ ] Prepare sample PDFs for testing
- [ ] Check MongoDB Atlas free tier limits

### During Workshop
- [ ] Share documentation URL early and often
- [ ] Monitor chat for setup issues
- [ ] Use instructor notes in Docusaurus (click 👨‍🏫 buttons)
- [ ] Encourage peer-to-peer help
- [ ] Keep backup slides for common troubleshooting

## 🎨 Visual Consistency

### Google Slides Theme
Use colors that complement Docusaurus:
- **Primary**: #667eea (purple-blue gradient)
- **Secondary**: #10b981 (green for success states)
- **Background**: White or light gray
- **Text**: Dark gray (#374151)

### Font Recommendations
- **Headers**: Inter, Segoe UI, or system default
- **Body**: Same as headers for consistency
- **Code**: JetBrains Mono, Fira Code, or monospace

## 📞 Troubleshooting During Workshop

### Common Issues & Quick Fixes

1. **"Can't access documentation"**
   - Share URL in chat again
   - Check for typos in URL
   - Try incognito/private browsing

2. **"n8n not loading"**
   - Check Docker status
   - Verify port 5678 isn't blocked
   - Try different browser

3. **"MongoDB Atlas signup failing"**
   - Use different email address
   - Check spam folder for verification
   - Try incognito mode

4. **"Embedding API not working"**
   - Use built-in tester in docs
   - Check network connectivity
   - Fallback to mock data option

## 🚀 Advanced Tips

### For Virtual Workshops
- Use breakout rooms for troubleshooting
- Screen share documentation frequently
- Record session for later reference
- Use polls to check progress

### For In-Person Workshops
- Print QR codes on handouts
- Use projector for slides + laptop for docs
- Walk around to help with individual issues
- Consider printed backup of key concepts

### For Mixed Audiences
- Acknowledge different skill levels early
- Pair experienced with beginners
- Provide "extra credit" challenges
- Use instructor notes for differentiation

---

## 📋 Pre-Workshop Checklist

**24 Hours Before:**
- [ ] Update documentation with current workshop date/instructor
- [ ] Test all interactive components
- [ ] Verify embedding API availability
- [ ] Prepare Google Slides with correct URLs

**1 Hour Before:**
- [ ] Load both slides and documentation
- [ ] Test screen sharing setup
- [ ] Join workshop platform early
- [ ] Have backup plans ready

**During Workshop:**
- [ ] Share URLs immediately
- [ ] Monitor chat for questions
- [ ] Use timing guides in instructor notes
- [ ] Keep energy high during transitions

This setup gives you the best of both worlds: powerful presentation tools for concepts and interactive documentation for hands-on learning! 🎉