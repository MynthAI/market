# market

**market** is a Node.js CLI tool for interacting with Mynth markets.
It provides a simple command-line interface for authentication and
account management.

## 🚀 Quick Start

Get up and running in under a minute:

### Option 1: Install from npm

``` bash
npm install @mynthai/market
```

Or run directly without installing:

``` bash
npx @mynthai/market --help
```

### Option 2: Build from source

``` bash
git clone https://github.com/MynthAI/market.git
cd market
pnpm install
pnpm build
pnpm link
```

Authenticate and start using Market:

``` bash
market login request you@example.com
market login confirm 123456
```

Use `-h` or `--help` with any command to see detailed usage information.

## 📦 Installation

### Requirements

- Node.js **v24** (required)
- `pnpm` package manager (for building from source)

### Install from npm

``` bash
npm install @mynthai/market
```

You can also run Market directly with `npx` without installing it
globally:

``` bash
npx @mynthai/market --help
```

### Install from source

Clone the repository and install dependencies:

``` bash
cd market
pnpm install
pnpm build
pnpm link
```

After linking, the `market` command will be available globally.

## 🚀 Usage

After building, the `market` command will be available. The `market` CLI
provides commands to authenticate and manage your account.

### General Syntax

``` bash
market [options] [command]
```

Use `-h` or `--help` with any command to see detailed help.

### Global Options

- `-j, --json` — Output results as JSON
- `-t, --toon` — Output results as TOON (a compact binary-friendly format used by AI agents)

### Commands

#### `login`

Login using your email address (non-interactive 2-step flow).

``` bash
market login request <email>
market login confirm <code>
```

**Subcommands**

- `request <email>` — Send an authentication code to the email address
- `confirm <code>` — Confirm the authentication code and complete login

**Options for `request`**

- `-f, --force` — Overwrite existing credentials if they exist

**Example**

``` bash
market login request you@example.com
market login confirm ABC123
```

## ⚙️ Configuration

### Network

Market supports three networks: `testnet` (default), `mainnet`, and
`local`.

The active network is stored in configuration and defaults to `testnet`.

### Config Directory

By default, Market stores its configuration in a platform-appropriate
location. You can override this by setting the `MARKET_CONFIG`
environment variable to an existing directory path:

``` bash
MARKET_CONFIG=/path/to/config market login request you@example.com
```

## 🛠 Development

Lint the project:

``` bash
pnpm lint
```

Format code:

``` bash
pnpm prettier
```

Build the project:

``` bash
pnpm build
```

Run tests:

``` bash
pnpm test
```

## 📄 License

This project is licensed under the terms of the **MIT License**. See the
`LICENSE` file for details.
