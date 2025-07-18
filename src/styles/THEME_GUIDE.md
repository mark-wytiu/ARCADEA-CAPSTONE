# ARCADEA Theme Guide

## Overview
This guide documents the ARCADEA design system, including color palettes, typography, spacing, and component patterns.

## Theme Structure

```
src/styles/
├── theme/
│   ├── _colors.scss      # All color variables
│   ├── _mixins.scss      # Reusable style mixins
│   └── _index.scss       # Main theme entry point
├── global.scss           # Global styles and utilities
└── THEME_GUIDE.md       # This file
```

## Color System

### Brand Colors
- **Primary (Cyan/Blue)**: `$brand-primary` (#00d4ff)
- **Secondary (Purple)**: `$brand-secondary` (#8b5cf6)

### Gaming Neon Palette
- **Neon Blue**: `$neon-blue` (#00d4ff)
- **Neon Purple**: `$neon-purple` (#8b5cf6)
- **Neon Green**: `$neon-green` (#00ff88)
- **Neon Pink**: `$neon-pink` (#ff0080)
- **Neon Orange**: `$neon-orange` (#ff6b00)
- **Neon Yellow**: `$neon-yellow` (#ffd700)

### Semantic Colors
- **Success**: `$success` (#00ff88)
- **Warning**: `$warning` (#ff6b00)
- **Error**: `$error` (#ff0080)
- **Info**: `$info` (#00d4ff)

### Background Colors
- **Primary**: `$bg-primary` - Darkest background
- **Secondary**: `$bg-secondary` - Card backgrounds
- **Tertiary**: `$bg-tertiary` - Hover states
- **Elevated**: `$bg-elevated` - Modal/elevated surfaces

## Typography

### Gaming Headings
```scss
@include gaming-heading($size);
```
Creates uppercase, bold headings with text shadow.

### Gradient Text
```scss
@include gradient-text($gradient);
```
Applies gradient to text (default: accent gradient).

### Neon Text
```scss
@include neon-text($color, $intensity);
```
Adds glowing neon effect to text.

## Components

### Cards
```scss
@include gaming-card;
```
Creates a card with:
- Dark glass background
- Subtle border
- Hover effects with glow
- Smooth transitions

### Buttons

#### Primary Button
```scss
@include gaming-button($color, $gradient);
```

#### Secondary Button
```scss
@include secondary-button;
```

#### Icon Button
```scss
@include icon-button($size);
```

### Form Inputs
```scss
@include form-input;
```
Styled inputs with:
- Dark background
- Subtle borders
- Focus states with brand colors
- Consistent padding

## Effects

### Glow Effect
```scss
@include glow($color, $spread, $intensity);
```

### Neon Border
```scss
@include neon-border($color, $width);
```

### Glass Morphism
```scss
@include glass-morphism($opacity, $blur);
@include dark-glass; // Dark variant
```

## Spacing System

Based on 8px unit:
```scss
spacing(1) = 8px
spacing(2) = 16px
spacing(3) = 24px
// etc.
```

## Responsive Design

### Breakpoints
- Mobile: `@include mobile` (max-width: 768px)
- Tablet: `@include tablet` (max-width: 1024px)
- Desktop: `@include desktop` (min-width: 1280px)
- Wide: `@include wide` (min-width: 1440px)

## Utility Classes

### Spacing
- Margin: `.m-{0-10}`, `.mt-{0-10}`, `.mb-{0-10}`, etc.
- Padding: `.p-{0-10}`, `.pt-{0-10}`, `.pb-{0-10}`, etc.

### Text
- `.text-primary`, `.text-secondary`, `.text-muted`, `.text-accent`
- `.text-gradient`, `.text-neon`

### Backgrounds
- `.bg-primary`, `.bg-secondary`, `.bg-tertiary`
- `.bg-gradient`, `.bg-glass`

### Shadows
- `.shadow-sm`, `.shadow-md`, `.shadow-lg`, `.shadow-xl`
- `.shadow-glow`

### Display
- `.d-none`, `.d-block`, `.d-flex`, `.d-grid`
- Flex utilities: `.justify-center`, `.align-center`, etc.

## Best Practices

1. **Always use theme variables** instead of hardcoded colors
2. **Use mixins** for consistent component styling
3. **Apply spacing using the spacing() function** for consistency
4. **Use semantic color names** (e.g., `$success` not `$green`)
5. **Test responsive designs** at all breakpoints
6. **Maintain high contrast** for accessibility
7. **Use transitions** for smooth interactions

## Example Component

```scss
.my-component {
  @include gaming-card;
  padding: spacing(3);
  
  .title {
    @include gaming-heading(1.5rem);
    margin-bottom: spacing(2);
  }
  
  .content {
    color: $text-secondary;
    line-height: 1.6;
  }
  
  .action-button {
    @include gaming-button($brand-primary, true);
    margin-top: spacing(2);
  }
  
  @include mobile {
    padding: spacing(2);
  }
}
```

## Migration Guide

When updating components to use the new theme:

1. Replace hardcoded colors with theme variables
2. Replace custom card styles with `@include gaming-card`
3. Replace button styles with appropriate button mixins
4. Update spacing to use `spacing()` function
5. Add responsive mixins where needed
