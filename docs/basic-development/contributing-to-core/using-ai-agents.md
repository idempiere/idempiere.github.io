# Using AI Agents

> How the iDempiere repositories guide AI coding agents, and what contributors remain responsible for

Many contributors work with AI coding agents in the terminal, such as Claude Code, Gemini CLI, Qwen Code, Codex or OpenCode. The iDempiere core repository and this documentation repository include instructions for these agents, so they follow the same rules as human contributors.

## How it works

Each repository has two parts:

- An `AGENTS.md` file at the root. It holds the rules that always apply and an index of skills.
- A `.agents/skills/` folder. Each skill is a `SKILL.md` file with instructions for one task, such as reviewing a pull request.

Skills use the open Agent Skills format. Agents that support it load a skill when the task matches its description. Agents that do not support it still read `AGENTS.md`, which tells them which skill file to read for each task.

The files `CLAUDE.md`, `GEMINI.md` and `QWEN.md` only point to `AGENTS.md`, so every agent gets the same instructions.

:::note Windows

`.claude/skills` is a symbolic link to `.agents/skills`. Git on Windows checks symbolic links out as plain files unless they are enabled. Enable Developer Mode, then clone with `git clone -c core.symlinks=true <repository URL>`. Without this, agents still find every skill through the index in `AGENTS.md`, but automatic skill loading may not work.

:::

## Core repository skills

The skills live in [`.agents/skills`](https://github.com/idempiere/idempiere/tree/master/.agents/skills) in the core repository.

| Skill | Use it for |
|---|---|
| `idempiere-contribution-workflow` | Branches, commit messages and pull requests linked to a Jira ticket |
| `idempiere-core-coding-standards` | Data access, transactions, backward compatibility and collateral impact analysis |
| `idempiere-database-changes` | Changes that need new tables, columns, messages or other dictionary records |
| `idempiere-unit-tests` | Writing and running tests in `org.idempiere.test` |
| `idempiere-headless-build-run` | Building with Maven, syncing the database and running the server from the terminal |
| `idempiere-pr-review` | Reviewing a pull request, or your own changes before opening one. Includes a script that checks out a pull request for local testing |
| `idempiere-jira-tickets` | Drafting bug reports and feature requests, and reporting vulnerabilities privately |

## Documentation repository skills

| Skill | Use it for |
|---|---|
| `idempiere-feature-docs` | New Feature pages, migration notes for breaking changes, and moving pages to a version folder |

## Rules that matter most

- Agents do not write migration scripts or dictionary IDs. You generate them from the iDempiere UI using [Centralized IDs](./changing-the-database). The agent tells you what to create and reviews the generated scripts.
- Agents never print, log or commit `idempiere.properties`, `idempiereEnv.properties` or other files with passwords. If an agent needs connection details, it asks you.
- Agents prefer overloads over changing public or protected method signatures. A signature change happens only when you explicitly decide on a breaking change. You then document it as one in the pull request and in the [migration notes](/docs/category/migration-notes).
- You are responsible for every line you submit, whether you wrote it or an agent did. Read and understand the change before opening a pull request.
- Be honest in the pull request about what you tested and what you did not test.
- All other contribution rules still apply. See [How to Contribute](./how-to-contribute) and [Common Issues](./common-issues).

## Getting started

1. Clone the repository and open your agent at the repository root.
2. Check that the agent read `AGENTS.md`. If it did not load it, ask it to read `AGENTS.md` first.
3. Describe your task with the Jira ticket number, for example: "Fix IDEMPIERE-1234 following the contribution workflow."
4. Review the agent's changes as you would review a pull request from someone else.

To improve these instructions, open a pull request that changes `AGENTS.md` or the skill files, the same way you would change code or documentation.
