# Docusaurus Linking Guide for Workshop Documentation

## 🚨 IMPORTANT: Proper Link Format in Docusaurus

To avoid broken links and ensure your documentation works correctly, follow these guidelines:

## ✅ Correct Link Formats

### 1. **Between Docs Pages (Recommended)**
Use **relative paths** starting with `./`:
```markdown
[Link Text](./page-name)
[Link Text](./subfolder/page-name)
```

**Examples:**
```markdown
[Prerequisites](./20-prerequisites)
[Workshop Overview](./workshop-overview)
[Path Selection](./01-path-selection)
```

### 2. **From Components/Pages to Docs**
Use the slug without `/docs/`:
```jsx
href="page-name"  // NOT href="/docs/page-name"
```

**Example in React component:**
```jsx
<a href="workshop-overview">Workshop Overview</a>
```

### 3. **External Resources**
Use full URLs:
```markdown
[GitHub Repo](https://github.com/mongodb-developer/multimodal-pdf-agent-n8n)
[Python Notebook](https://github.com/.../notebooks/notebook.ipynb)
```

## ❌ Common Mistakes to Avoid

### 1. **Don't use absolute paths with baseUrl**
```markdown
❌ [Link](/multimodal-pdf-agent-n8n/docs/page-name)
❌ [Link](/docs/page-name)
✅ [Link](./page-name)
```

### 2. **Don't mix formats**
```markdown
❌ href="/docs/workshop-overview"  // In components
❌ [Link](page-name)  // Without ./ in markdown
✅ href="workshop-overview"  // In components
✅ [Link](./page-name)  // In markdown
```

### 3. **Don't forget the extension**
```markdown
❌ [Link](./20-prerequisites.mdx)  // Don't include .mdx
✅ [Link](./20-prerequisites)  // Docusaurus handles extensions
```

## 📁 File Structure Reference

```
docs/
├── index.mdx (slug: /)
├── workshop-overview.mdx
├── 01-path-selection.mdx
├── path-a-n8n-overview.mdx
├── path-b-python-overview.mdx
├── 15-github-codespaces.mdx
├── 20-prerequisites.mdx
├── 25-n8n-first-run.mdx
├── 30-mongodb-atlas-setup.mdx
├── 40-pdf-processing-workflow.mdx
├── 50-vector-search-workflow.mdx
├── 60-ai-agent-workflow.mdx
├── 65-agent-patterns.mdx
├── 67-memory-context-patterns.mdx
├── 69-multimodal-image-queries.mdx
├── 70-complete-multimodal-agent.mdx
├── 82-production-security.mdx
├── 83-monitoring-observability.mdx
├── 85-troubleshooting-guide.mdx
└── ... (other docs)
```

## 🔧 Quick Fix Script

If you need to fix links in a file, use this pattern:

```javascript
// Replace absolute paths with relative
old: /\/docs\//g
new: ./

// Replace baseUrl paths
old: /\/multimodal-pdf-agent-n8n\/docs\//g
new: ./

// Fix component href attributes
old: href="/docs/
new: href="

// Fix missing ./ prefix
old: ](page-name)
new: ](./page-name)
```

## 🌐 Internationalization (i18n) Considerations

When dealing with Spanish translations:
- Spanish pages can link to English pages if translations don't exist
- Use the same relative path format
- Consider setting `onBrokenLinks: "ignore"` in `docusaurus.config.js` if many translations are missing

## 💡 Best Practices

1. **Always test links locally** before committing
2. **Use relative paths** for maintainability
3. **Keep link text descriptive** for accessibility
4. **Update this guide** when you discover new patterns

## 🛠️ Troubleshooting

### "Broken link" build errors
1. Check if the target file exists
2. Verify you're using relative paths with `./`
3. Ensure no `.mdx` extension in links
4. Check for typos in file names

### Links work locally but not in production
1. Check your `baseUrl` in `docusaurus.config.js`
2. Ensure you're not hardcoding the baseUrl in links
3. Use relative paths consistently

---

**Remember:** When in doubt, use `./page-name` for linking between docs!