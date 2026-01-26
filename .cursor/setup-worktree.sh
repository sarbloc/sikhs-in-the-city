#!/usr/bin/env bash
set -euo pipefail

# (A) Install deps can stay in worktrees.json, but it's fine here too.

# (B) Make pushes use the bot SSH host alias by setting origin *push url*
origin_fetch="$(git remote get-url origin 2>/dev/null || true)"
if [[ -n "$origin_fetch" ]]; then
  if [[ "$origin_fetch" == git@github.com:* ]]; then
    bot_push="${origin_fetch/git@github.com:/git@github-bot:}"
    git remote set-url --push origin "$bot_push"
  elif [[ "$origin_fetch" == https://github.com/* ]]; then
    path="${origin_fetch#https://github.com/}"
    git remote set-url --push origin "git@github-bot:${path%.git}.git"
  fi
fi

# (C) Optional: make commits authored by the bot in THIS worktree only
git config --worktree user.name "sarblocbot"
git config --worktree user.email "sarblocbot@users.noreply.github.com"

# (D) Switch gh CLI to use sarblocbot account
if command -v gh &>/dev/null; then
  current_user="$(gh api user --jq '.login' 2>/dev/null || true)"
  if [[ "$current_user" != "sarblocbot" ]]; then
    gh auth switch --user sarblocbot 2>/dev/null || true
  fi
fi