---
title: Common Issues
sidebar_label: Common Issues
description: Common problems and mistakes to avoid when contributing
sidebar_position: 4
---

To maintain iDempiere's high standards, avoid the following common issues:

- **Database compatibility**: Your changes must work on both PostgreSQL and Oracle.

- **Breakage of existing features**: Do not break previous functionality — test thoroughly.

- **Backward compatibility**: Even "unused" fields may be used by implementers.

- **Language**: All code (comments, methods, variables) **must be in English**.

- **Comments and clarity**:  
  - Comment unclear logic.
  - Excessive need for comments may indicate poor naming or logic.

- **Documentation**:  
  Large or complex changes should come with:
  - Use cases
  - Test instructions
  - Unit tests
  - Manual documentation if applicable

- **Refactoring + new features**: Avoid combining both in the same pull request — separate them for clarity.

- **SQL-first approach**:  Avoid raw SQL where possible — prefer model classes or queries.

---
> 💡 Remember: contributing is about maintaining and growing a community. Code that only works for your use case without care for quality, clarity, or compatibility weakens the project for everyone.