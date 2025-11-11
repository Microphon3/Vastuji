import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '$lib/supabase';
import type { AnalysisInsert } from '$lib/types/database';

describe('Analyses Database Operations', () => {
	let testAnalysisId: string;

	const mockAnalysis: AnalysisInsert = {
		propertyType: 'home',
		selectedGoals: ['wealth', 'health'],
		videoUrl: 'https://example.com/test-video.mp4',
		compassHeading: 45.5,
		status: 'uploading'
	};

	it('should create a new analysis', async () => {
		const { data, error } = await supabase.from('analyses').insert(mockAnalysis).select().single();

		expect(error).toBeNull();
		expect(data).toBeDefined();
		expect(data?.propertyType).toBe('home');
		expect(data?.compassHeading).toBe(45.5);

		testAnalysisId = data!.id;
	});

	it('should retrieve analysis by id', async () => {
		const { data, error } = await supabase
			.from('analyses')
			.select('*')
			.eq('id', testAnalysisId)
			.single();

		expect(error).toBeNull();
		expect(data?.id).toBe(testAnalysisId);
	});

	it('should update analysis status', async () => {
		const { data, error } = await supabase
			.from('analyses')
			.update({ status: 'processing' })
			.eq('id', testAnalysisId)
			.select()
			.single();

		expect(error).toBeNull();
		expect(data?.status).toBe('processing');
	});
});
