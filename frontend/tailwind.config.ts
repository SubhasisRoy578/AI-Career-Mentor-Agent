import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { brand: { 50: '#eef6ff', 500: '#3478f6', 700: '#1f4fd1' } }, boxShadow: { glow: '0 24px 80px rgba(52,120,246,.25)' } } }, plugins: [] };
export default config;
