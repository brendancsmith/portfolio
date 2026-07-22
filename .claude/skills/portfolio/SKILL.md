```markdown
# portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill introduces the core development patterns and workflows used in the `portfolio` repository, a TypeScript-based codebase with no detected framework. You'll learn the project's coding conventions, commit practices, content update workflows, and how to write and organize tests. This guide is ideal for contributors aiming to maintain consistency and efficiency in portfolio development.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```
  resumeData.ts
  userProfile.ts
  ```

### Import Style
- **Style:** Alias imports are preferred.
- **Example:**
  ```typescript
  import experienceData from '@/data/experience';
  import { Skill } from '@/types/skill';
  ```

### Export Style
- **Style:** Mixed (both default and named exports are used).
- **Examples:**
  ```typescript
  // Default export
  export default experienceData;

  // Named export
  export const skills = [...];
  ```

### Commit Messages
- **Type:** Conventional commits
- **Prefixes:** `feat`, `build`, `fix`
- **Average length:** 71 characters
- **Example:**
  ```
  feat: add new project experience to resume data
  fix: correct typo in education section
  build: update dependencies for TypeScript 4.9
  ```

## Workflows

### Resume Content Update
**Trigger:** When someone wants to add, override, or fix resume-specific content (e.g., wording, highlights, skills, or typos).  
**Command:** `/update-resume-content`

1. Edit the relevant data files:
    - `data/experience.ts` for work experience
    - `data/education.ts` for education history
    - `data/skills.ts` for skills and technologies
2. Make your changes, such as adding new entries, correcting typos, or updating descriptions.
3. Commit your changes with a descriptive message, following the conventional commit format.
    - **Example:**  
      ```
      fix: update job title and correct typo in skills section
      ```
4. Open a pull request if collaborating, or push directly if you have access.

**Example Update:**
```typescript
// data/skills.ts
export const skills = [
  ...,
  { name: 'TypeScript', level: 'Advanced' },
  { name: 'React', level: 'Intermediate' }, // Add or update as needed
];
```

## Testing Patterns

- **Framework:** Unknown (no specific testing framework detected)
- **File Pattern:** Test files are named with the `.test.` infix.
    - **Example:** `userProfile.test.ts`
- **Typical Test Structure:**  
  ```typescript
  // userProfile.test.ts
  import { getUserProfile } from './userProfile';

  describe('getUserProfile', () => {
    it('returns correct user data', () => {
      // test implementation
    });
  });
  ```

## Commands

| Command                | Purpose                                                        |
|------------------------|----------------------------------------------------------------|
| /update-resume-content | Update or correct resume content (experience, education, skills)|
```
