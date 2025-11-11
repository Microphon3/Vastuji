import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
	createBooking,
	getBookingById,
	updateBooking,
	deleteBooking
} from './bookings';
import { createAnalysis, deleteAnalysis } from './analyses';
import type { BookingInsert, AnalysisInsert } from '$lib/types/database';
import { closePool } from '$lib/db';

describe('Bookings Database Operations', () => {
	let testAnalysisId: string;
	let testBookingId: string;

	beforeAll(async () => {
		// Create a test analysis for the booking
		const mockAnalysis: AnalysisInsert = {
			propertyType: 'home',
			selectedGoals: ['wealth'],
			videoUrl: 'https://example.com/test-video.mp4',
			compassHeading: 90,
			status: 'complete'
		};

		const analysis = await createAnalysis(mockAnalysis);
		testAnalysisId = analysis.id;
	});

	afterAll(async () => {
		// Clean up
		if (testBookingId) {
			await deleteBooking(testBookingId);
		}
		if (testAnalysisId) {
			await deleteAnalysis(testAnalysisId);
		}
		await closePool();
	});

	const mockBooking: BookingInsert = {
		analysisId: '', // Will be set in test
		name: 'Test User',
		email: 'test@example.com',
		phone: '+919876543210',
		scheduledTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
		timezone: 'Asia/Kolkata',
		paymentStatus: 'pending',
		amount: 299900, // ₹2999
		consultationStatus: 'scheduled'
	};

	it('should create a booking', async () => {
		const bookingData = { ...mockBooking, analysisId: testAnalysisId };
		const booking = await createBooking(bookingData);

		expect(booking).toBeDefined();
		expect(booking.id).toBeDefined();
		expect(booking.email).toBe('test@example.com');
		expect(booking.amount).toBe(299900);

		testBookingId = booking.id;
	});

	it('should retrieve booking by id', async () => {
		const booking = await getBookingById(testBookingId);

		expect(booking).toBeDefined();
		expect(booking?.id).toBe(testBookingId);
		expect(booking?.email).toBe('test@example.com');
	});

	it('should update booking payment status', async () => {
		const updated = await updateBooking(testBookingId, { paymentStatus: 'completed' });

		expect(updated).toBeDefined();
		expect(updated?.paymentStatus).toBe('completed');
	});
});
