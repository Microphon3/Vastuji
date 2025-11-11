import { query, queryOne, generateId, objectToSnakeCase, rowToCamelCase } from '$lib/db';
import type { Analysis, AnalysisInsert, AnalysisUpdate } from '$lib/types/database';
import type { ResultSetHeader } from 'mysql2';

/**
 * Create a new analysis record
 */
export async function createAnalysis(data: AnalysisInsert): Promise<Analysis> {
	const id = generateId();
	const now = new Date().toISOString();

	const analysisData = {
		id,
		created_at: now,
		updated_at: now,
		...objectToSnakeCase(data)
	};

	// Convert arrays and objects to JSON strings
	if (data.selectedGoals) {
		analysisData.selected_goals = JSON.stringify(data.selectedGoals);
	}
	if (data.floorPlan) {
		analysisData.floor_plan = JSON.stringify(data.floorPlan);
	}
	if (data.zones) {
		analysisData.zones = JSON.stringify(data.zones);
	}
	if (data.summary) {
		analysisData.summary = JSON.stringify(data.summary);
	}
	if (data.detailedReport) {
		analysisData.detailed_report = JSON.stringify(data.detailedReport);
	}

	const columns = Object.keys(analysisData).join(', ');
	const placeholders = Object.keys(analysisData)
		.map(() => '?')
		.join(', ');
	const values = Object.values(analysisData);

	await query(`INSERT INTO analyses (${columns}) VALUES (${placeholders})`, values);

	const result = await getAnalysisById(id);
	if (!result) {
		throw new Error('Failed to create analysis');
	}
	return result;
}

/**
 * Get analysis by ID
 */
export async function getAnalysisById(id: string): Promise<Analysis | null> {
	const row = await queryOne('SELECT * FROM analyses WHERE id = ?', [id]);
	if (!row) return null;
	return parseAnalysisRow(row);
}

/**
 * Update an analysis
 */
export async function updateAnalysis(id: string, data: AnalysisUpdate): Promise<Analysis | null> {
	const updateData = objectToSnakeCase(data);

	// Convert arrays and objects to JSON strings
	if (data.selectedGoals) {
		updateData.selected_goals = JSON.stringify(data.selectedGoals);
	}
	if (data.floorPlan) {
		updateData.floor_plan = JSON.stringify(data.floorPlan);
	}
	if (data.zones) {
		updateData.zones = JSON.stringify(data.zones);
	}
	if (data.summary) {
		updateData.summary = JSON.stringify(data.summary);
	}
	if (data.detailedReport) {
		updateData.detailed_report = JSON.stringify(data.detailedReport);
	}

	const setClause = Object.keys(updateData)
		.map((key) => `${key} = ?`)
		.join(', ');
	const values = [...Object.values(updateData), id];

	await query(`UPDATE analyses SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);

	return getAnalysisById(id);
}

/**
 * Get analyses by user ID
 */
export async function getAnalysesByUserId(userId: string): Promise<Analysis[]> {
	const rows = await query('SELECT * FROM analyses WHERE user_id = ? ORDER BY created_at DESC', [
		userId
	]);
	return rows.map(parseAnalysisRow);
}

/**
 * Delete an analysis
 */
export async function deleteAnalysis(id: string): Promise<boolean> {
	const result = await query<ResultSetHeader>('DELETE FROM analyses WHERE id = ?', [id]);
	return result[0]?.affectedRows > 0;
}

/**
 * Parse database row to Analysis object
 */
function parseAnalysisRow(row: any): Analysis {
	const analysis = rowToCamelCase<Analysis>(row);

	// Parse JSON fields
	if (typeof analysis.selectedGoals === 'string') {
		analysis.selectedGoals = JSON.parse(analysis.selectedGoals);
	}
	if (typeof analysis.floorPlan === 'string') {
		analysis.floorPlan = JSON.parse(analysis.floorPlan);
	}
	if (typeof analysis.zones === 'string') {
		analysis.zones = JSON.parse(analysis.zones);
	}
	if (typeof analysis.summary === 'string') {
		analysis.summary = JSON.parse(analysis.summary);
	}
	if (typeof analysis.detailedReport === 'string') {
		analysis.detailedReport = JSON.parse(analysis.detailedReport);
	}

	return analysis;
}
