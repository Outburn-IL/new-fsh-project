# FSH Project Template

This repository provides a complete template for starting new FHIR Implementation Guide projects using FSH (FHIR Shorthand).

## Features

- ✅ **JRE 21** - Automatic Java Runtime Environment installation
- ✅ **FHIR Validator** - Automatic download of latest validator
- ✅ **Dynamic Metadata** - Version and contact info auto-generated from `sushi-config.yaml`
- ✅ **Windows Path Fix** - Proper handling of paths with spaces
- ✅ **Dependency Filtering** - Automatic removal of `hl7.fhir.extensions.r*` packages
- ✅ **npm Test Suite** - Validation scripts for examples and full IG

## Quick Start

### 1. Create New Repository from Template

1. Click the green **"Use this template"** button above
2. Select owner: **Outburn-IL** (or your organization)
3. Enter your project name
4. Choose Public/Private visibility
5. Click **"Create repository from template"**

### 2. Clone Your New Repository

```bash
git clone https://github.com/Outburn-IL/{your-project-name}.git
cd {your-project-name}
```

### 3. Configure Your Project

#### Edit `sushi-config.yaml`
- Replace all fields containing `{}` with your project details
- **Important**: The `id` field must comply with [FHIR IG naming guidelines](https://confluence.hl7.org/plugins/servlet/mobile?contentId=35718629#content/view/35718629)
- The `version`, `date`, and `contact` fields will automatically populate your RuleSet metadata

#### Edit `package.json`
- Update fields to match `sushi-config.yaml`
- **Critical**: `name`, `version`, and `description` must match exactly

#### Edit `ig.ini`
Replace `{id}` with your exact IG id:
```ini
ig = fsh-generated/resources/ImplementationGuide-{id}.json
```

#### Edit `.gitignore` (Optional)
Add any files/folders you don't want in the repository.

### 4. Install Dependencies

```bash
npm install
```

This will install all required npm packages.

### 5. Setup Java and Validator

On first run, these will auto-download:

```bash
npm run check:java        # Downloads JRE 21 to ./jre/
npm run check:validator   # Downloads FHIR validator to ./validator_cli.jar
```

Or run validation directly - missing resources will auto-install:

```bash
npm run validate:ex       # Validates examples (auto-installs JRE & validator if needed)
```

### 6. Initial Commit

```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

### 7. Create Your Working Branch (Recommended)

```bash
git checkout -b your-name-dev
git push -u origin your-name-dev
```

Or via GitHub website:
1. Go to your repo page
2. Click **Branches** > **New branch**
3. In VS Code, click branch name (bottom-left) > select your branch

---

## Available npm Scripts

### Validation
```bash
npm run validate:ex       # Validate example resources
npm run validate:ig       # Validate full Implementation Guide
npm test                  # Run all validation tests
```

### Setup
```bash
npm run check:java        # Install/verify Java Runtime Environment
npm run check:validator   # Install/verify FHIR Validator
npm run prepare:validation # Prepare all validation resources
```

### SUSHI
```bash
npm run sushi             # Compile FSH to FHIR resources
```

---

## Project Structure

```
your-project/
├── input/
│   └── fsh/              # Your FSH files go here
│       └── RuleSet-metadata.fsh  # Auto-generated from sushi-config.yaml
├── examples/             # Example FHIR resources
├── jre/                  # Java Runtime (auto-downloaded)
├── fsh-generated/        # Generated FHIR resources (don't edit)
├── validator_cli.jar     # FHIR validator (auto-downloaded)
├── sushi-config.yaml     # Main IG configuration
├── package.json          # npm configuration
└── ig.ini                # IG Publisher configuration
```

---

## Best Practices

### ConformanceMetadata RuleSet
Add this line below the Description in every Profile, ValueSet, or CodeSystem:

```fsh
* insert ConformanceMetadata
```

This automatically adds:
- Version (from `sushi-config.yaml`)
- Date (from `sushi-config.yaml`)
- Publisher contact info

### Version Management
- **Single source of truth**: Edit version only in `sushi-config.yaml`
- `RuleSet-metadata.fsh` regenerates automatically on each `npm run sushi`
- Update `package.json` version to match

### Git Workflow
1. Always work in a feature branch
2. Commit frequently with clear messages
3. Push to remote regularly
4. Create Pull Requests for review

---

## Automated Features

### Dynamic Metadata Generation
The `updateRuleSet.js` script automatically:
- Reads version from `sushi-config.yaml`
- Extracts date from `sushi-config.yaml`
- Pulls contact email from `sushi-config.yaml`
- Generates `input/fsh/RuleSet-metadata.fsh`

**Runs automatically before validation** - no manual action needed.

### Dependency Filtering
Automatically removes problematic `hl7.fhir.extensions.r*` packages that cause validation issues.

### Windows Path Handling
Fixed issue where paths with spaces would break validation on Windows.

---

## Troubleshooting

### JRE Not Found
```bash
npm run check:java
```

### Validator Not Found
```bash
npm run check:validator
```

### Validation Errors
1. Check `validator_cli_output.ex.html` for detailed error reports
2. Verify your `sushi-config.yaml` dependencies are correct
3. Ensure examples are in `examples/` folder
4. Run `npm run sushi` to regenerate resources

### Multiple JRE Versions
The system will automatically clean up if multiple JRE versions exist.

---

## Technical Details

### JRE Version
- **Version 21** (OpenJDK from adoptopenjdk.net)
- Auto-downloads on first validation
- Supports Windows, Mac, Linux

### FHIR Validator
- Latest version from [hapifhir/org.hl7.fhir.core](https://github.com/hapifhir/org.hl7.fhir.core)
- Updates automatically when you run `npm run check:validator`

### npm Dependencies
```json
{
  "execa": "^9.3.0",
  "sushi": "^3.0.0",
  "axios": "^1.7.2",
  "fs-extra": "^11.2.0",
  "js-yaml": "^4.1.0",
  "jsonata": "^2.0.5",
  "tar": "^7.4.0",
  "adm-zip": "^0.5.14",
  "path": "^0.12.7"
}
```

---

## Support

For questions or issues:
1. Check this README
2. Review [FHIR Shorthand documentation](https://fshschool.org/)
3. Ask your team lead
4. Open an issue in this repository

---

## License

See LICENSE file in repository.
