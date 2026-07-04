# `types/validations` — zod schemas (Instinct layout)

One zod schema per backend DTO, used with `react-hook-form` +
`@hookform/resolvers/zod` in forms. They mirror the icons-api class-validator
DTOs field for field, so the FE rejects the same input the API would.

Conventions:
- Messages are **i18n KEYS**, not literals, so errors stay translatable.
- Keep field names and optionality in sync with the backend DTO.
- Export the inferred type alongside the schema (`z.infer<typeof schema>`).

Files end in `.ts.template` — copy, drop the suffix, wire the i18n keys to your
translation files to activate. They are written against the installed zod
(`zod` ^4) API.
