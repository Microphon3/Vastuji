import mysql from 'mysql2/promise';
import {
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD
} from '$env/static/private';

// Create connection pool for better performance
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
	if (!pool) {
		pool = mysql.createPool({
			host: MYSQL_HOST || 'localhost',
			port: parseInt(MYSQL_PORT || '3306'),
			database: MYSQL_DATABASE || 'vastuji',
			user: MYSQL_USER || 'vastuji_user',
			password: MYSQL_PASSWORD || 'vastuji_pass',
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			enableKeepAlive: true,
			keepAliveInitialDelay: 0
		});
	}
	return pool;
}

// Get a connection from the pool
export async function getConnection() {
	const pool = getPool();
	return await pool.getConnection();
}

// Execute a query
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
	const pool = getPool();
	const [rows] = await pool.execute(sql, params);
	return rows as T[];
}

// Execute a single row query
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
	const rows = await query<T>(sql, params);
	return rows.length > 0 ? rows[0] : null;
}

// Close the pool (useful for testing and cleanup)
export async function closePool() {
	if (pool) {
		await pool.end();
		pool = null;
	}
}

// Helper function to generate UUID-like IDs (MySQL compatible)
export function generateId(): string {
	return crypto.randomUUID();
}

// Convert camelCase to snake_case for database columns
export function toSnakeCase(str: string): string {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Convert snake_case to camelCase for JavaScript objects
export function toCamelCase(str: string): string {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Convert object keys from snake_case to camelCase
export function rowToCamelCase<T = any>(row: any): T {
	if (!row) return row;
	const result: any = {};
	for (const key in row) {
		result[toCamelCase(key)] = row[key];
	}
	return result as T;
}

// Convert object keys from camelCase to snake_case
export function objectToSnakeCase(obj: any): any {
	if (!obj) return obj;
	const result: any = {};
	for (const key in obj) {
		result[toSnakeCase(key)] = obj[key];
	}
	return result;
}
