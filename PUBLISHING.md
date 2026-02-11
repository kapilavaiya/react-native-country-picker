# Publishing Guide: @avaiyakapil/react-native-country-picker

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **NPM CLI**: Ensure npm is installed (`npm --version`)
3. **Git Repository**: Package should be in a git repository (already configured)

## Pre-Publishing Checklist

### 1. Verify package.json
- ✅ Package name is available (check: `npm view @avaiyakapil/react-native-country-picker`)
- ✅ Version number is correct (starting with 1.0.0)
- ✅ All required fields are filled
- ✅ Keywords are comprehensive
- ✅ Repository URL is correct

### 2. Test Locally
```bash
# Navigate to package directory
cd src/components/react-native-country-picker

# Test installation locally
npm pack
# This creates a .tgz file - you can test installing it in another project
```

### 3. Verify Files to Publish
The `files` field in package.json controls what gets published:
- `src/` - Source code
- `README.md` - Documentation

Make sure `.npmignore` excludes:
- `examples/` - Example files (not needed in npm package)
- `Demo/` - Demo GIFs (not needed in npm package)
- Development files

## Publishing Steps

### Step 1: Login to NPM

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- OTP (if 2FA is enabled)

Verify login:
```bash
npm whoami
```

### Step 2: Navigate to Package Directory

```bash
cd /Users/kapilavaiya/Desktop/Project/OpenSource/src/components/react-native-country-picker
```

### Step 3: Check Package Name Availability

```bash
npm view @avaiyakapil/react-native-country-picker
```

If it returns 404, the name is available. If it returns package info, the package is already published.

### Step 4: Update .npmignore (if needed)

Ensure examples and demo files are excluded:
```bash
# Add to .npmignore if not already there
examples/
Demo/
*.gif
```

### Step 5: Dry Run (Test without publishing)

```bash
npm publish --dry-run
```

This shows what files will be published without actually publishing.

### Step 6: Publish to NPM

**For first-time publishing:**
```bash
npm publish --access public
```

**For updates:**
```bash
# Update version first
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)

# Then publish
npm publish
```

### Step 7: Verify Publication

```bash
# Check package on npm
npm view @avaiyakapil/react-native-country-picker

# Or visit in browser
# https://www.npmjs.com/package/@avaiyakapil/react-native-country-picker
```

### Step 8: Test Installation

In a new project:
```bash
npm install @avaiyakapil/react-native-country-picker
```

## Post-Publishing

### 1. Create Git Tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Update GitHub Repository
- Ensure README.md is up to date
- Add installation instructions
- Add badges (already done)

### 3. Announce
- Share on social media
- Post on React Native communities
- Add to React Native directory

## Troubleshooting

### Error: Package name already exists
- This package uses scoped name: `@avaiyakapil/react-native-country-picker`
- Ensure package.json name field is correct
- Publish with: `npm publish --access public`

### Error: You must verify your email
- Check email and verify your npm account

### Error: 402 Payment Required
- Free accounts can publish unlimited public packages
- This error usually means trying to publish private package on free account
- Use `--access public` flag

### Error: Version already exists
- Update version in package.json
- Or use: `npm version patch` then `npm publish`

## Version Management

### Semantic Versioning (semver)
- **MAJOR** (2.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes, backward compatible

### Update Version
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Quick Reference Commands

```bash
# Login
npm login

# Check if logged in
npm whoami

# Check package availability
npm view @avaiyakapil/react-native-country-picker

# Dry run
npm publish --dry-run

# Publish
npm publish --access public

# Update version and publish
npm version patch && npm publish

# View published package
npm view @avaiyakapil/react-native-country-picker
```

## Important Notes

1. **Once published, you cannot unpublish** (unless within 72 hours and no one has installed it)
2. **Version numbers are immutable** - you cannot republish the same version
3. **Always test locally** before publishing
4. **Keep examples separate** - don't publish example files to npm
5. **Update README** before publishing - first impression matters
