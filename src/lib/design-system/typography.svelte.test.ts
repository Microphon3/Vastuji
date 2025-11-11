import { describe, it, expect } from 'vitest';

describe('Design System Typography', () => {
	it('should load Inter font family', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);
		const fontFamily = styles.getPropertyValue('font-family');

		expect(fontFamily).toContain('Inter');
	});

	it('should have typography scale defined', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);

		expect(styles.getPropertyValue('--text-5xl')).toBe('3rem');
		expect(styles.getPropertyValue('--text-3xl')).toBe('2rem');
		expect(styles.getPropertyValue('--text-base')).toBe('1rem');
		expect(styles.getPropertyValue('--text-sm')).toBe('0.875rem');
	});
});
