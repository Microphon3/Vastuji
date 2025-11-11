import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
	createAnalysis,
	getAnalysisById,
	updateAnalysis,
	deleteAnalysis
} from './analyses';
import type { AnalysisInsert } from '$lib/types/database';
import { closePool } from '$lib/db';

describe('Analyses Database Operations', () => {
	let testAnalysisId: string;

	const mockAnalysis: AnalysisInsert = {
		propertyType: 'home',
		selectedGoals: ['wealth', 'health'],
		videoUrl: 'https://example.com/test-video.mp4',
		compassHeading: 45.5,
		status: 'uploading'
	};

	afterAll(async () => {
		// Clean up and close database connection
		if (testAnalysisId) {
			await deleteAnalysis(testAnalysisId);
		}
		await closePool();
	});

	it('should create a new analysis', async () => {
		const analysis = await createAnalysis(mockAnalysis);

		expect(analysis).toBeDefined();
		expect(analysis.id).toBeDefined();
		expect(analysis.propertyType).toBe('home');
		expect(analysis.compassHeading).toBe(45.5);
		expect(analysis.selectedGoals).toEqual(['wealth', 'health']);

		testAnalysisId = analysis.id;
	});

	it('should retrieve analysis by id', async () => {
		const analysis = await getAnalysisById(testAnalysisId);

		expect(analysis).toBeDefined();
		expect(analysis?.id).toBe(testAnalysisId);
		expect(analysis?.propertyType).toBe('home');
	});

	it('should update analysis status', async () => {
		const updated = await updateAnalysis(testAnalysisId, { status: 'processing' });

		expect(updated).toBeDefined();
		expect(updated?.status).toBe('processing');
	});

	it('should delete analysis', async () => {
		const result = await deleteAnalysis(testAnalysisId);
		expect(result).toBe(true);

		const deleted = await getAnalysisById(testAnalysisId);
		expect(deleted).toBeNull();

		testAnalysisId = ''; // Prevent double deletion in afterAll
	});
});
