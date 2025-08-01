# DemoQA Playwright JavaScript Framework

A robust and scalable Playwright automation framework built with JavaScript, implementing the Page Object Model (POM) design pattern for testing the DemoQA website.

## 🚀 Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Modular Architecture**: Organized page objects with inheritance hierarchy
- **Data-Driven Testing**: Excel-based test data management
- **Comprehensive Reporting**: HTML reports with screenshots, videos and traces on failure
- **Environment Configuration**: Flexible configuration management
- **Tagged Test Execution**: Support for test categorization and selective execution

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm package manager
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/animeshkqa/demoqa-playwright-js-pom-demo.git
   cd demoqa-playwright-js-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   BASE_URL=https://demoqa.com
   DATA_FILE=./data/testData.xlsx
   ```

## 📁 Project Structure

```
demoqa-playwright-js-framework/
├── config/
│   └── playwright.config.js          # Playwright configuration
├── data/
│   └── testData.xlsx                 # Test data files
├── pages/
│   ├── basePagePO.js                 # Base page object with common methods
│   ├── homePagePO.js                 # Home page object
│   ├── elementsPagePO.js             # Elements page object
│   ├── widgetsPagePO.js              # Widgets page object
│   ├── interactionsPagePO.js         # Interactions page object
│   ├── alertsFramesWindowsPagePO.js  # Alerts, Frames & Windows page object
│   ├── addUpdatePersonModalPagePO.js # Modal page object
│   ├── elementsSubTabs/              # Sub-page objects for Elements section
│   │    ├── textBoxPO.js
│   │    ├── checkBoxPO.js
│   │    ├── radioButtonPO.js
│   │    ├── webTablesPO.js
│   │    ├── buttonsPagePO.js
│   │    ├── linksPagePO.js
│   │    └── uploadDownloadPO.js
│   └── alertsFramesWindowsSubTabs/   # Sub-page objects for Alerts, Frames & Windows section
│        ├── alertsPO.js
│        └── framesPO.js
├── tests/
│   ├── elements.spec.js              # Elements page tests
│   ├── widgets.spec.js               # Widgets page tests
│   ├── alertsFrames.spec.js          # Alerts, Frames & Windows tests
│   └── dragAndDrop.spec.js           # Drag and drop tests
├── utils/
│   ├── readExcel.js                  # Excel data reading utilities
│   ├── datePicker.js                 # Date picker utilities
│   └── webTables.js                  # Web tables utilities
├── reports/                          # Test execution reports
├── package.json
└── README.md
```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm run test

# Run tests in headed mode (with browser UI)
npm run test:headed
```

### Selective Test Execution

```bash
# Run only SIT tests
npm run test:sit

# Run only smoke tests
npm run test:smoke
```

### View Test Reports

```bash
# Open HTML report
npm run test:report
```

## 📊 Test Categories

The framework supports test categorization using tags:

- **@sit**: System Integration Tests
- **@smoke**: Smoke/Regression Tests

### Example Test with Tags

```javascript
test(
  "TC01_ELEMENTS_pVE Submit Text Boxes Data and Verify",
  { tag: ["@sit", "@smoke"] },
  async () => {
    // Test implementation
  },
);
```

## 🔧 Configuration

### Playwright Configuration

The framework uses a custom Playwright configuration (`config/playwright.config.js`) with the following settings:

- **Timeout**: 90 seconds for test execution
- **Viewport**: 1366x768
- **Screenshots**: Captured on test failure
- **Videos**: Retained on test failure
- **Traces**: Retained on test failure
- **Base URL**: Configurable via environment variables

### Environment Variables

Create a `.env` file with the following variables:

```env
BASE_URL=https://demoqa.com
DATA_FILE=./data/testData.xlsx
```

## 📝 Page Object Model Implementation

### Base Page Object

The `BasePagePO` class provides common methods for all page objects:

```javascript
export class BasePagePO {
  constructor(page) {
    this.page = page;
  }

  async waitAndClick(locator) {
    /* ... */
  }
  async fillAndWait(locator, text) {
    /* ... */
  }
  async getText(locator) {
    /* ... */
  }
  // ... more common methods
}
```

### Page Object Example

```javascript
import { BasePagePO } from "./basePagePO.js";

export class HomePagePO extends BasePagePO {
  constructor(page) {
    super(page);
    this.elementsPageLink = page.getByText("Elements");
    this.widgetsPageLink = page.getByText("Widgets");
  }

  async navigateToElements() {
    await this.waitAndClick(this.elementsPageLink);
  }
}
```

### Test Example

```javascript
import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/homePagePO.js";
import { ElementsPagePO } from "../pages/elementsPagePO.js";

test("Submit Text Box Data", async ({ page }) => {
  const homePO = new HomePagePO(page);
  const elementsPO = new ElementsPagePO(page);

  await page.goto("/");
  await homePO.navigateToElements();
  await elementsPO.init();

  await elementsPO.clickTextBoxLink();
  const result = await elementsPO.textBoxTab.fillTextBoxesAndSubmit();
  expect(result).toBeTruthy();
});
```

## 📊 Data Management

The framework supports Excel-based test data management:

### Excel Structure

Create an Excel file with sheets for different test modules:

- `elements` sheet for Elements page data
- `widgets` sheet for Widgets page data
- etc.

### Reading Test Data

```javascript
import { readKeyValueSheet } from "../utils/readExcel.js";

const data = await readKeyValueSheet(filePath, "elements");
```

### Viewing Reports

After test execution, reports are available in the `reports/` directory:

- HTML reports with detailed test results
- Screenshots of failed tests
- Video recordings of failed test execution
- Traces of failed tests

## 📝 Code Style

The project uses Prettier for code formatting. Run the following command to format code:

```bash
npx prettier --write .
```

## 🧪 Test Coverage

The framework covers the following DemoQA sections:

- **Elements**: Text Box, Check Box, Radio Button, Web Tables, Buttons, Links, Upload/Download
- **Widgets**: Tool Tips, Date Picker
- **Alerts, Frames & Windows**: Alerts, Frames, Windows
- **Interactions**: Drag and Drop

## 👨‍💻 Author

**Animesh Koley**

- GitHub: [@animeshkqa](https://github.com/animeshkqa)

## 🙏 Acknowledgments

- DemoQA for providing the test application
- Playwright team for the excellent testing framework
- The open-source community for various utilities and tools

---

**Note**: This framework is designed for educational and demonstration purposes. Please ensure you have proper permissions before using it for commercial purposes.
