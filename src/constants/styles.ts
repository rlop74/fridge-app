import { scale, verticalScale } from '@/utils/styling';
import { colors } from './colors';

export const GlobalStyles = {
  colors: {
    primary50: '#eef7f1',
    primary100: '#d7ede0',
    primary200: '#b3ddc7',
    primary400: '#4fa87d',
    primary500: '#2f8f5b',
    primary700: '#226b43',
    primary800: '#193221', //'#142f23'
    accent500: '#f7bc0c',
    accentGreen: '#56e84b', // #14EC5C

    error50: '#fde8ef',
    error500: '#b4235f',

    gray200: '#ddd',
    gray300: '#cccccc',
    gray500: '#5b6470',
    gray700: '#2c3138',

    background: '#f6fbf8',
  },
};

export const lightTheme = {
  colors: {
    // 🌤 BACKGROUND
    background: colors.background,
    surface: '#ffffff',
    surfaceLight: colors.gray100,

    // 📝 TEXT
    textPrimary: colors.gray900,
    textSecondary: colors.gray700,
    textMuted: colors.gray500,

    // 🧱 BORDER
    border: colors.gray200,

    // 🌿 PRIMARY
    primary: colors.primary500,
    primaryHover: colors.primary400,

    // ✨ ACCENT
    accent: colors.accent500,

    // ❌ ERROR
    error: colors.error500,

    // ✅ SUCCESS
    success: colors.accentGreen,
  },
};

export const darkTheme = {
  colors: {
    // 🌌 BACKGROUND
    background: '#0f1a14', // darker than primary800
    surface: colors.primary800, // your dark green
    surfaceLight: '#1f3d2e', // lifted green surface

    // 📝 TEXT
    textPrimary: '#f0fdf4',
    textSecondary: '#bbf7d0',
    textMuted: '#86efac',

    // 🧱 BORDER
    border: '#1f3d2e',

    // 🌿 PRIMARY
    primary: colors.primary400, // brighter for contrast
    primaryHover: colors.primary200,

    // ✨ ACCENT
    accent: colors.accent500,

    // ❌ ERROR
    error: '#f43f5e', // brighter red for dark bg

    // ✅ SUCCESS
    success: colors.accentGreen,
  },
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
};
