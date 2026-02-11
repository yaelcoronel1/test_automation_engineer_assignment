# Test Automation Engineer assignment — Mobile Automation

> **Status:** Cleaned & stabilized project. A pre-generated Allure report (`/allure-report`) is included in the repository showing a successful run of the test suite.

This repository contains 3 automation test cases using **JavaScript**, **WebdriverIO** and **Appium**, following a Page Object Model architecture. The project includes a full ready-to-open Allure HTML report in `./allure-report` and a full automation stack that can be run locally.

---

## Table of contents
- [Project structure](#project-structure)
- [Technology stack & versions](#technology-stack--versions)
- [System prerequisites and installation](#system-prerequisites-and-installation)
- [Android device / emulator setup](#android-device--emulator-setup)
- [Appium chromedriver auto-download](#appium-chromedriver-auto-download)
- [Run tests (commands)](#run-tests-commands)
- [Allure reports (existing + generate/open)](#allure-reports-existing--generateopen)
- [Configuration notes](#configuration-notes)
- [Troubleshooting tips](#troubleshooting-tips)
- [Repository hygiene & final notes](#repository-hygiene--final-notes)

---

## Project structure

```
repo-root/
├── wdio.conf.cjs           
├── package.json
├── package-lock.json
├── README.md               
├── allure-results/          
├── allure-report/           # pre-generated Allure HTML report (committed as project deliverable)
├── test/
│   ├── specs/               # test specs 
│   ├── screen_objects/      # Page Objects 
│   └── helpers/             # test helpers (allure helper)
└── chromedrivers/           

```

---

## Technology stack & versions

These are the versions used to build and validate the repository. Using the same versions is best for the most reproducible experience.

- **Node.js**: `v24.13.0` (tested). Node >= 18.x is usually compatible but the project was validated on Node 24.
- **npm**: bundled with Node.
- **Appium**: `v3.2.0` (Appium 3.x).
- **WebdriverIO** (WDIO): `@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`, `@wdio/appium-service`, `@wdio/allure-reporter` — compatible with WDIO 9.x (project used `^9.23.3`).
- **Mocha**: `^11.x` (project validated with 11.7.5).
- **Allure commandline**: `2.36.0` (recommended). The project includes Allure results and a pre-generated `allure-report`.
- **Chrome (mobile)**: Chrome Mobile on Android device under test. Chromedriver will be auto-managed by Appium when using the autodownload option.
- **Android SDK / platform-tools**: latest stable (adb).
- **Java JDK**: 11+ (required for Android SDK tooling and some platform tooling).

---

## System prerequisites and installation

### 1) Install Node.js (and npm)

Download and install Node.js from https://nodejs.org (LTS or the version specified above). Verify:

```bash
node -v    # expected: v24.13.0 (or close)
npm -v
```

### 2) Install Java (JDK) and Android SDK (if running on Android)

- Install Java JDK 11+ (OpenJDK is fine). Verify with:

```bash
java -version
```

- Install Android SDK (Command line tools) and platform-tools. Ensure `adb` is on your PATH. On macOS/Linux you can use sdkmanager to install platforms and build tools. On Windows, install via Android Studio or SDK manager.

Verify `adb`:

```bash
adb version
```

Make sure `ANDROID_HOME` / `ANDROID_SDK_ROOT` environment variables point to your SDK folder, and add `$ANDROID_HOME/platform-tools` to `PATH` if necessary.

### 3) Install Appium (recommended via npx or global install)

You can run Appium using `npx` (no global install required) or install globally.

**Global install (optional):**

```bash
npm install -g appium@3.2.0
```

**Use via npx (recommended for reproducibility):**

You can run Appium directly with `npx appium` (no global install required).

### 4) Install Allure commandline (optional global)

**Global install (optional):**

```bash
npm i -g allure-commandline@2.36.0
```

### 5) Install project dependencies

From project root:

```bash
npm ci

```

This will install WebdriverIO packages, test helpers, and the Allure CLI devDependencies.

---

## Android device / emulator setup

1. Enable **USB debugging** on your Android device (Developer Options).
2. Connect device with USB and verify:

```bash
adb devices
# should list a device id
```

3. For emulator use, start an Android emulator from Android Studio or `avdmanager` and confirm `adb devices` lists the emulator.

4. If using a real device, ensure Chrome is installed and note its version (Chrome version determines chromedriver selection):

```bash
adb shell dumpsys package com.android.chrome | findstr versionName
```

---

## Appium chromedriver auto-download

This project relies on Appium's insecure feature to automatically download the matching Chromedriver for the Chrome version on the device. Use the following command to start Appium with that feature enabled (recommended for local testing where multiple Chrome versions may appear):

```bash
npx appium --allow-insecure="*:chromedriver_autodownload"
```

**Notes:**
- The `*:` prefix is required by Appium 3.x to indicate the destination driver or wildcard.
- Appium will create its local cache directory (typical path: `~/.appium`) and store downloaded chromedriver binaries there.
- If you prefer to run Appium via the WDIO Appium service, configure the service with `allowInsecure: ['*:chromedriver_autodownload']` in `wdio.conf.cjs` (the repository's config supports this pattern).

---

## Run tests (commands)

Below are the exact commands you can run from the repository root. These commands assume you have an Android device/emulator connected and Appium available (either started manually or via WDIO service).

### 1) Start Appium (manual)

```bash
npx appium --allow-insecure="*:chromedriver_autodownload"
```

> Use this if you prefer to see Appium logs in the terminal. If you want WDIO to spawn Appium automatically, keep Appium stopped and WDIO will start it when you run the test (if the `appium` service is enabled in `wdio.conf.cjs`).

### 2) Run the test suite (WebdriverIO)

```bash
npx wdio run wdio.conf.cjs
```

or via npm script:

```bash
npm run test
# or
npm run wdio
```

> To run a single spec file: update the `specs` array in `wdio.conf.cjs` or create an ad-hoc config.

### 3) Run Appium + WDIO in one step (WDIO starts Appium)

If the `appium` service is configured in `wdio.conf.cjs` (it is in this project), then running WDIO will spawn Appium automatically. Use:

```bash
npx wdio run wdio.conf.cjs
```

WDIO will print Appium server output in the test log if it spawned Appium.

---

## Allure reports (existing + generate / open)

### View the pre-generated report included in the repo

A complete Allure HTML report is included at `./allure-report` as part of the submission. To open it interactively using the Allure CLI (preferred):

```bash
npx allure open ./allure-report
```

This command will launch a local web server and open the pre-generated report in your browser.

> Alternative: if you do not want to use Allure CLI, open `allure-report/index.html` with your browser directly. Some features (like attachments) may not work correctly without a webserver.

### Generate a fresh Allure report after running tests

After a test run (Allure results are written to `./allure-results`), generate and open a new HTML report:

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

Or use the npm scripts:

```bash
npm run allure:generate
npm run allure:open
```

---

## Configuration notes

- `wdio.conf.cjs` contains the capabilities and driver configuration for Android/Chrome mobile web. Review these properties before running tests on a different device:
  - `appium:deviceName` — set to your device name or `emulator-5554`.
  - `appium:udid` — optional (set if you use a specific device id).
  - `appium:platformVersion` — set the Android version (matching the device/emulator).
  - `appium:chromedriverExecutableDir` & `appium:chromedriverChromeMappingFile` — used when managing a project-local directory of chromedrivers and mapping files. If you use Appium autodownload, these are not required.

---

## Troubleshooting tips

1. **`adb` does not list device** — ensure USB debugging enabled, device authorized, and `adb` in PATH. Run `adb devices` and accept the authorization on device.

2. **Appium cannot find chromedriver** — prefer starting Appium with `--allow-insecure="*:chromedriver_autodownload"`. Ensure the machine has internet access. If Appium is behind a proxy, configure proxy settings so it can download binaries.

3. **WDIO errors about missing reporter / service** — install the needed packages and use `npm ci` to match versions.

4. **Session timeouts** — device may be asleep, or the web view not ready. Use `adb shell input keyevent 26` to toggle wake, check that Chrome version is compatible, and ensure `chromedriver` is available.

5. **Allure generation errors** — ensure `allure-commandline` is installed (either globally or using `npx`). Use `npx allure --version` to confirm.

6. **`browser` object errors in specs at load time** — helper modules that call `browser` at import time should be adjusted: `browser` should only be used inside test hooks or test code, not at module top-level. Review test/helpers for accidental `browser` usage during import.

---

## Repository hygiene & final notes

- The repository includes a committed `allure-report/` HTML report as a project deliverable
- If you plan to run tests on CI (GitHub Actions or similar), set up a runner with Android SDK and Appium installed, or use device cloud infrastructure.

---

## Quick reference command list

Start Appium with chromedriver autodownload:

```bash
npx appium --allow-insecure="*:chromedriver_autodownload"
```

Run the tests (WDIO):

```bash
npx wdio run wdio.conf.cjs
```

Generate and open Allure report (after tests):

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

Open the included pre-generated Allure report:

```bash
npx allure open ./allure-report
```

NPM script shortcuts:

```bash
npm run appium:autodownload
npm run test
npm run wdio
npm run allure:generate
npm run allure:open
```

---

