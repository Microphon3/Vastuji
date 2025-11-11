import { describe, it, expect } from 'vitest';

describe('Design System Colors', () => {
	it('should have blueprint color tokens defined in CSS', () => {
		const root = document.documentElement;
		const styles = getComputedStyle(root);

		// Primary blueprint colors
		expect(styles.getPropertyValue('--navy-base')).toBe('#0f1528');
		expect(styles.getPropertyValue('--navy-light')).toBe('#1e2a4a');
		expect(styles.getPropertyValue('--technical-blue')).toBe('#2563eb');

		// Heat map colors
		expect(styles.getPropertyValue('--optimal-green')).toBe('#10b981');
		expect(styles.getPropertyValue('--attention-amber')).toBe('#f59e0b');
		expect(styles.getPropertyValue('--critical-red')).toBe('#ef4444');
	});
});
