# 🧠 Commit Convention

To maintain a clean and consistent commit history, this project follows a structured commit message format.

---

## 📌 Format

```
[SYSTEM] : Commit message
```

### Example:

```
[BACKEND] : Fix authentication bug
[FRONTEND] : Add login UI
[DEVOPS] : Update CI workflow
```

---

## 🧩 SYSTEM Types

Use one of the following systems:

* `BACKEND` → Spring Boot / Java code
* `FRONTEND` → React UI
* `DEVOPS` → CI/CD, workflows, infrastructure
* `DOCUMENT` → Documentation changes
* `TEST` → Test-related changes
* `DATABASE` → DB-related changes

---

## ✍️ Message Guidelines

* Use **present tense**
  ✔ `Fix bug`
  ❌ `Fixed bug`

* Keep it **short and clear**

* Start with a **capital letter**

* Avoid unnecessary words

---

## 📦 Examples

### ✅ Good

```
[BACKEND] : Add user authentication service
[FRONTEND] : Fix navbar responsiveness
[DEVOPS] : Add PR validation workflow
[DOCS] : Update contributing guide
```

---

### ❌ Bad

```
fix login bug
Added new feature
backend stuff
```

---

## ⚠️ Breaking Changes

If your commit introduces a breaking change:

* Mention it clearly in the message
* Provide context in the PR description

Example:

```
[BACKEND] : Change API response format (BREAKING)
```

---

## 🎯 Why This Matters

* Improves readability of commit history
* Makes debugging easier
* Enables automation (changelog, releases)
* Maintains professional standards

---

## 🚀 Enforcement

This convention is enforced via:

* ✅ PR title validation
* ✅ Commit message checks (GitHub Actions)

Please ensure your commits follow this format before pushing.
