# Siva Visual Portfolio

Personal Photo Editing and Video Editing Portfolio website.

## Tech Stack
- **React**
- **Vite**
- **JavaScript**
- **CSS**

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## EmailJS Configuration

- **Service ID**: `service_q9d8ezb`
- **Template ID**: `template_x8kfjbr`
- **Public Key**: Configured via `VITE_EMAILJS_PUBLIC_KEY` in `.env`

### Template Mapping (`template_x8kfjbr`)

Under **CLIENT DETAILS** in your EmailJS template, ensure the following fields are included:

```text
CLIENT DETAILS:
Name: {{name}}
Email: {{email}}
Phone Number: {{phone}}
Project Type: {{project_type}}
Message: {{message}}
```

- `phone` is optional and will be sent as an empty string or trimmed string if provided, ensuring submissions without a phone number do not fail.

