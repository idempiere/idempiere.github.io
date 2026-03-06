---
sidebar_position: 2
---

# Fast Linux Development Setup (Alternative)

There is an alternative for quickly creating an iDempiere development environment on Linux, maintained by Heng Sin:

- [hengsin/idempiere-dev-setup](https://github.com/hengsin/idempiere-dev-setup)

:::info
This page summarizes the repository README and is a good starting point. For the most up-to-date instructions, always check the project README directly.
:::

## What this setup does

The scripts automate most of the development setup flow:

- Clone iDempiere source and run Maven build
- Download and configure Eclipse IDE
- Create workspace and import all projects
- Set target platform and build workspace
- Configure `idempiere.properties` and `jettyhome`
- Import DB seed if database does not exist
- Apply migration scripts if database already exists

At the end, you should have a ready-to-run Eclipse workspace.

## Prerequisites

- [Maven](https://maven.apache.org) `>= 3.8.6`
- Git
- Docker (optional, for PostgreSQL container)
- JDK 17 (optional, because Eclipse may include a bundled JRE 17)

Check your Maven version:

```bash
mvn -version
```

If needed, configure a specific Maven installation:

```bash
export MVN_HOME=/your/mvn/version
export PATH=$MVN_HOME/bin:$PATH
```

:::note
If building older iDempiere releases does not work properly, the README suggests using the appropriate tagged version of `idempiere-dev-setup`.
:::

## Quick usage

1. Clone or download the setup repository.
2. If you use Docker for PostgreSQL, ensure your user can run Docker without sudo.
3. Enable shell completion and review options.

```bash
source completion.bash
./setup.sh --help
```

If using `zsh`, run:

```bash
autoload bashcompinit
bashcompinit
```

### Example commands

```bash
./setup.sh --branch release-10 --repository-url git@github.com:idempiere/idempiere.git --docker-postgres-create

./setup.sh --branch release-10 --docker-postgres-create --db-admin-pass <your-password>

./setup.sh --skip-setup-db
```

:::tip
The README examples use `release-10`. You can adapt `--branch` to the version you need (for example `master` or `release-12`).
:::

## Main scripts

- `setup.sh`: Main entry point
- `docker-postgres.sh`: Install and run PostgreSQL Docker image
- `eclipse.sh`: Start Eclipse IDE
- `setup-db.sh`: Configure DB properties, `jettyhome`, import DB seed or apply migrations
- `setup-ws.sh`: Setup workspace and target platform

## Optional frontends

- `setup.py`: GTK frontend that generates and executes `setup.sh` command line
- `setup.html`: Simple HTML/JavaScript frontend to generate `setup.sh` command line

## Gemini CLI

Video walkthrough for a complete setup in Eclipse:

- [Gemini CLI: Complete setup of iDempiere workspace for Eclipse](https://www.youtube.com/watch?v=0lhypnHd1UI)
- [ Gemini CLI: Install and using idempiere-dev-setup skill ](https://www.youtube.com/watch?v=jZI-xPZ8QxI)

### User scope

```bash
gemini skills install https://github.com/hengsin/idempiere-dev-setup.git
```

### Workspace scope

```bash
gemini skills install https://github.com/hengsin/idempiere-dev-setup.git --scope workspace
```

## Windows notes from README

Although this project focuses on Linux, the README also mentions Windows options:

- WSL
- Git Bash (with required tools like `wget` and Maven)
- MSYS2

See the repository README for full Windows-specific steps and PATH details.

---

*This page is based on the README from [hengsin/idempiere-dev-setup](https://github.com/hengsin/idempiere-dev-setup), maintained by Heng Sin and contributors.*
