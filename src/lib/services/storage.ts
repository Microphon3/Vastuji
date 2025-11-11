import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const UPLOAD_DIR = 'uploads/videos';

export interface UploadResult {
	success: boolean;
	url?: string;
	path?: string;
	error?: string;
}

/**
 * Upload video file to local file system
 * @param file - Video file from user upload
 * @param analysisId - UUID of the analysis record
 * @returns Upload result with URL or error
 */
export async function uploadVideo(file: File, analysisId: string): Promise<UploadResult> {
	// Validate file type
	if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
		return {
			success: false,
			error: 'Invalid file type. Please upload a video file (MP4, MOV, AVI, or WebM)'
		};
	}

	// Validate file size
	if (file.size > MAX_FILE_SIZE) {
		return {
			success: false,
			error: `File too large. Maximum size is 100MB (file is ${(file.size / 1024 / 1024).toFixed(1)}MB)`
		};
	}

	// Generate unique file path
	const timestamp = Date.now();
	const fileExt = file.name.split('.').pop() || 'mp4';
	const fileName = `${timestamp}.${fileExt}`;
	const analysisDir = join(UPLOAD_DIR, analysisId);
	const relativePath = join(analysisDir, fileName);
	const absolutePath = join(process.cwd(), relativePath);

	try {
		// Ensure directory exists
		if (!existsSync(join(process.cwd(), analysisDir))) {
			await mkdir(join(process.cwd(), analysisDir), { recursive: true });
		}

		// Convert File to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Write file to disk
		await writeFile(absolutePath, buffer);

		// Generate public URL (relative path for serving)
		const url = `/${relativePath}`;

		return {
			success: true,
			url,
			path: relativePath
		};
	} catch (err) {
		console.error('Unexpected upload error:', err);
		return {
			success: false,
			error: 'An unexpected error occurred during upload'
		};
	}
}

/**
 * Generate public URL for uploaded video
 * @param path - Storage path of the video
 * @returns Public URL
 */
export function generateVideoUrl(path: string): string {
	// Return the path as-is for local file serving
	// In production, this would be served by the web server
	return `/${path}`;
}

/**
 * Delete video from storage
 * @param path - Storage path of the video
 */
export async function deleteVideo(path: string): Promise<{ success: boolean; error?: string }> {
	try {
		const absolutePath = join(process.cwd(), path);
		await unlink(absolutePath);
		return { success: true };
	} catch (err) {
		console.error('Delete error:', err);
		return {
			success: false,
			error: 'Failed to delete video'
		};
	}
}
