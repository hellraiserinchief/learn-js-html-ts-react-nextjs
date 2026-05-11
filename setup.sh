#!/usr/bin/env bash
# Toolchain check for the Fast Track curriculum.
# Verifies Node >= 20, installs pnpm via Homebrew if missing,
# prints VS Code extension install commands, and a next-steps checklist.

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

ok()    { printf "${GREEN}✓${NC} %s\n" "$1"; }
warn()  { printf "${YELLOW}!${NC} %s\n" "$1"; }
fail()  { printf "${RED}✗${NC} %s\n" "$1"; }
info()  { printf "${BLUE}→${NC} %s\n" "$1"; }
header(){ printf "\n${BOLD}%s${NC}\n" "$1"; }

header "Fast Track — toolchain check"

# --- Homebrew ---------------------------------------------------------------
if ! command -v brew >/dev/null 2>&1; then
  fail "Homebrew not found. Install from https://brew.sh first, then re-run this script."
  exit 1
fi
ok "Homebrew $(brew --version | head -n1 | awk '{print $2}')"

# --- Node.js ----------------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  warn "Node.js not found. Installing via Homebrew..."
  brew install node
fi
NODE_VERSION_RAW="$(node --version)"
NODE_MAJOR="$(echo "$NODE_VERSION_RAW" | sed 's/v\([0-9]*\).*/\1/')"
if [ "$NODE_MAJOR" -lt 20 ]; then
  fail "Node $NODE_VERSION_RAW found, but >=20 required. Run: brew upgrade node"
  exit 1
fi
ok "Node $NODE_VERSION_RAW"

# --- pnpm -------------------------------------------------------------------
if ! command -v pnpm >/dev/null 2>&1; then
  warn "pnpm not found. Installing via Homebrew..."
  brew install pnpm
fi
ok "pnpm $(pnpm --version)"

# --- VS Code ----------------------------------------------------------------
if ! command -v code >/dev/null 2>&1; then
  warn "VS Code 'code' command not found."
  info "Install with:  brew install --cask visual-studio-code"
  info "Then in VS Code: Cmd+Shift+P → 'Shell Command: Install code command in PATH'"
else
  ok "VS Code $(code --version | head -n1)"
fi

# --- VS Code extensions (printed, not auto-installed) -----------------------
header "Recommended VS Code extensions"
echo "Review and run any you want:"
echo
cat <<'EOF'
  code --install-extension dbaeumer.vscode-eslint
  code --install-extension esbenp.prettier-vscode
  code --install-extension dsznajder.es7-react-js-snippets
  code --install-extension bradlc.vscode-tailwindcss
  code --install-extension usernamehw.errorlens
  code --install-extension eamodio.gitlens
EOF

# --- Next steps -------------------------------------------------------------
header "Next steps"
cat <<EOF
  1. Read the curriculum:    open curriculum.pdf
  2. Skim the repo:          cat README.md
  3. Start Day 1:            cd week-01-modern-javascript/day-01-variables-scope-modules && cat README.md
  4. Optional accounts:      GitHub, Vercel, Neon or Supabase (Week 6)

Build something every single day. The proof is in the typing.
EOF
