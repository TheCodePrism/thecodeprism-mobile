// Advanced Theme System - Premium Admin Control Centre
export const theme = {
    // Enhanced Color Palette
    colors: {
        // Backgrounds
        background: '#050508',
        backgroundSecondary: '#0a0a0f',
        backgroundCard: '#0f0f14',
        backgroundElevated: '#141419',

        // Primary Palette
        primary: '#4facfe',
        primaryLight: '#6fc5ff',
        primaryDark: '#2d8bd4',
        primaryGlow: '#00f2fe',

        // Secondary Palette
        secondary: '#667eea',
        secondaryLight: '#8a9cff',
        secondaryDark: '#4d5fd1',

        // Accent Colors
        accent: '#764ba2',
        accentPurple: '#a855f7',
        accentCyan: '#06b6d4',
        accentPink: '#ec4899',

        // Status Colors
        success: '#10b981',
        successLight: '#34d399',
        successDark: '#059669',
        warning: '#f59e0b',
        warningLight: '#fbbf24',
        danger: '#ef4444',
        dangerLight: '#f87171',
        info: '#3b82f6',

        // Neutrals
        white: '#ffffff',
        gray100: '#f5f5f7',
        gray200: '#e5e5ea',
        gray300: '#d1d1d6',
        gray400: '#a3a3ab',
        gray500: '#737380',
        gray600: '#52525f',
        gray700: '#3a3a45',
        gray800: '#27272e',
        gray900: '#1c1c21',

        // Text
        textPrimary: '#ffffff',
        textSecondary: '#a3a3ab',
        textTertiary: '#52525f',
        textMuted: '#3a3a45',
    },

    // Advanced Gradients
    gradients: {
        primary: ['#4facfe', '#00f2fe'],
        primaryMulti: ['#4facfe', '#00f2fe', '#06b6d4'],
        purple: ['#667eea', '#764ba2'],
        purpleMulti: ['#a855f7', '#667eea', '#764ba2'],
        dark: ['#0a0a0f', '#050508'],
        darkMulti: ['#0f0f14', '#0a0a0f', '#050508'],
        cyberpunk: ['#4facfe', '#a855f7', '#ec4899'],
        success: ['#10b981', '#34d399'],
        cardHover: ['rgba(79, 172, 254, 0.08)', 'rgba(0, 242, 254, 0.08)'],
        cardActive: ['rgba(79, 172, 254, 0.15)', 'rgba(0, 242, 254, 0.15)'],
        background: ['#050508', '#0a0a0f', '#0f0f14'],
        mesh: ['rgba(79, 172, 254, 0.1)', 'rgba(102, 126, 234, 0.1)', 'rgba(168, 85, 247, 0.1)'],
    },

    // Spacing Scale
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        '2xl': 32,
        '3xl': 48,
        '4xl': 64,
    },

    // Border Radius
    radius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        full: 9999,
    },

    // Typography
    typography: {
        sizes: {
            xs: 10,
            sm: 12,
            base: 14,
            md: 16,
            lg: 18,
            xl: 22,
            '2xl': 28,
            '3xl': 36,
            '4xl': 48,
        },
        weights: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
        letterSpacing: {
            tighter: -1.5,
            tight: -1,
            normal: 0,
            wide: 0.5,
            wider: 1,
        },
    },

    // Advanced Shadows & Elevation
    elevation: {
        1: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 1,
        },
        2: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 4,
            elevation: 2,
        },
        3: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.16,
            shadowRadius: 8,
            elevation: 3,
        },
        4: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 4,
        },
        5: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 5,
        },
    },

    // Glow Effects
    glow: {
        small: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 8,
        },
        medium: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 10,
        },
        large: {
            shadowColor: '#4facfe',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 24,
            elevation: 12,
        },
        purple: {
            shadowColor: '#a855f7',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 10,
        },
    },

    // Border Widths
    borderWidths: {
        hairline: 0.5,
        thin: 1,
        base: 1.5,
        thick: 2,
        heavy: 3,
    },
};

// Enhanced Component Styles
export const componentStyles = {
    // Status Badge
    statusBadge: {
        active: {
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981',
            color: '#34d399',
        },
        inactive: {
            backgroundColor: 'rgba(115, 115, 128, 0.2)',
            borderColor: '#737380',
            color: '#a3a3ab',
        },
        warning: {
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderColor: '#f59e0b',
            color: '#fbbf24',
        },
        info: {
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
            color: '#60a5fa',
        },
    },

    // Enhanced Card Styles
    card: {
        base: {
            backgroundColor: theme.colors.backgroundCard,
            borderRadius: theme.radius.xl,
            borderWidth: theme.borderWidths.thin,
            borderColor: 'rgba(79, 172, 254, 0.2)',
            padding: theme.spacing.xl,
        },
        elevated: {
            backgroundColor: theme.colors.backgroundElevated,
            borderRadius: theme.radius.xl,
            borderWidth: theme.borderWidths.thin,
            borderColor: 'rgba(79, 172, 254, 0.3)',
            padding: theme.spacing.xl,
            ...theme.elevation[3],
        },
        premium: {
            backgroundColor: theme.colors.backgroundElevated,
            borderRadius: theme.radius['2xl'],
            borderWidth: theme.borderWidths.base,
            borderColor: 'rgba(79, 172, 254, 0.4)',
            padding: theme.spacing.xl,
            ...theme.elevation[4],
        },
        glass: {
            backgroundColor: 'rgba(15, 15, 20, 0.7)',
            borderRadius: theme.radius.xl,
            borderWidth: theme.borderWidths.thin,
            borderColor: 'rgba(255, 255, 255, 0.15)',
            padding: theme.spacing.xl,
            ...theme.elevation[2],
        },
    },

    // Enhanced Button Styles
    button: {
        primary: {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xl,
            ...theme.elevation[2],
        },
        secondary: {
            backgroundColor: 'rgba(79, 172, 254, 0.15)',
            borderColor: theme.colors.primary,
            borderWidth: theme.borderWidths.base,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xl,
        },
        danger: {
            backgroundColor: 'transparent',
            borderColor: theme.colors.danger,
            borderWidth: theme.borderWidths.base,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xl,
        },
        ghost: {
            backgroundColor: 'rgba(79, 172, 254, 0.08)',
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing.xl,
        },
    },

    // Enhanced Input Styles
    input: {
        base: {
            backgroundColor: 'rgba(15, 15, 20, 0.9)',
            borderRadius: theme.radius.md,
            borderWidth: theme.borderWidths.thin,
            borderColor: 'rgba(79, 172, 254, 0.25)',
            padding: theme.spacing.lg,
            color: theme.colors.textPrimary,
            fontSize: theme.typography.sizes.md,
        },
        focused: {
            borderColor: theme.colors.primary,
            borderWidth: theme.borderWidths.base,
            ...theme.glow.small,
        },
    },
};

// Animation Configuration
export const animations = {
    durations: {
        fast: 150,
        normal: 300,
        slow: 500,
        slower: 800,
    },
    easing: {
        easeIn: [0.4, 0, 1, 1],
        easeOut: [0, 0, 0.2, 1],
        easeInOut: [0.4, 0, 0.2, 1],
        spring: [0.25, 0.1, 0.25, 1],
    },
};

export default theme;
