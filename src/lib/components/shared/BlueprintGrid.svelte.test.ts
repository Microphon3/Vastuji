import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BlueprintGrid from './BlueprintGrid.svelte';

describe('BlueprintGrid Component', () => {
  it('should render 16 zones in 4x4 grid', () => {
    const { container } = render(BlueprintGrid);
    const zones = container.querySelectorAll('[data-zone]');
    expect(zones.length).toBe(16);
  });

  it('should apply color based on zone status', () => {
    const zones = [
      { id: 1, status: 'optimal' as const },
      { id: 2, status: 'attention' as const },
      { id: 3, status: 'critical' as const }
    ];

    const { container } = render(BlueprintGrid, { zones });

    const optimal = container.querySelector('[data-zone="1"]');
    const attention = container.querySelector('[data-zone="2"]');
    const critical = container.querySelector('[data-zone="3"]');

    expect(optimal?.className).toContain('optimal');
    expect(attention?.className).toContain('attention');
    expect(critical?.className).toContain('critical');
  });

  it('should show zone number in each cell', () => {
    const { container } = render(BlueprintGrid);
    const zone5 = container.querySelector('[data-zone="5"]');
    expect(zone5?.textContent).toContain('5');
  });
});
