import { query, queryOne, generateId, objectToSnakeCase, rowToCamelCase } from '$lib/db';
import type { Booking, BookingInsert, BookingUpdate } from '$lib/types/database';
import type { ResultSetHeader } from 'mysql2';

/**
 * Create a new booking record
 */
export async function createBooking(data: BookingInsert): Promise<Booking> {
	const id = generateId();
	const now = new Date().toISOString();

	const bookingData = {
		id,
		created_at: now,
		updated_at: now,
		...objectToSnakeCase(data)
	};

	const columns = Object.keys(bookingData).join(', ');
	const placeholders = Object.keys(bookingData)
		.map(() => '?')
		.join(', ');
	const values = Object.values(bookingData);

	await query(`INSERT INTO bookings (${columns}) VALUES (${placeholders})`, values);

	const result = await getBookingById(id);
	if (!result) {
		throw new Error('Failed to create booking');
	}
	return result;
}

/**
 * Get booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
	const row = await queryOne('SELECT * FROM bookings WHERE id = ?', [id]);
	if (!row) return null;
	return rowToCamelCase<Booking>(row);
}

/**
 * Update a booking
 */
export async function updateBooking(id: string, data: BookingUpdate): Promise<Booking | null> {
	const updateData = objectToSnakeCase(data);

	const setClause = Object.keys(updateData)
		.map((key) => `${key} = ?`)
		.join(', ');
	const values = [...Object.values(updateData), id];

	await query(`UPDATE bookings SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);

	return getBookingById(id);
}

/**
 * Get bookings by email
 */
export async function getBookingsByEmail(email: string): Promise<Booking[]> {
	const rows = await query('SELECT * FROM bookings WHERE email = ? ORDER BY created_at DESC', [
		email
	]);
	return rows.map((row) => rowToCamelCase<Booking>(row));
}

/**
 * Get bookings by analysis ID
 */
export async function getBookingsByAnalysisId(analysisId: string): Promise<Booking[]> {
	const rows = await query('SELECT * FROM bookings WHERE analysis_id = ? ORDER BY created_at DESC', [
		analysisId
	]);
	return rows.map((row) => rowToCamelCase<Booking>(row));
}

/**
 * Delete a booking
 */
export async function deleteBooking(id: string): Promise<boolean> {
	const result = await query<ResultSetHeader>('DELETE FROM bookings WHERE id = ?', [id]);
	return result[0]?.affectedRows > 0;
}
