import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_STORAGE_BUCKET } from '$env/static/public';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

export interface UploadResult {
	success: boolean;
	url?: string;
	path?: string;
	error?: string;
}

/**
 * Upload video file to Supabase Storage
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
	const filePath = `videos/${analysisId}/${timestamp}.${fileExt}`;

	try {
		// Upload to Supabase Storage
		const { data, error } = await supabase.storage
			.from(PUBLIC_SUPABASE_STORAGE_BUCKET)
			.upload(filePath, file, {
				cacheControl: '3600',
				upsert: false
			});

		if (error) {
			console.error('Upload error:', error);
			return {
				success: false,
				error: `Upload failed: ${error.message}`
			};
		}

		// Generate public URL
		const url = generateVideoUrl(data.path);

		return {
			success: true,
			url,
			path: data.path
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
	const { data } = supabase.storage.from(PUBLIC_SUPABASE_STORAGE_BUCKET).getPublicUrl(path);

	return data.publicUrl;
}

/**
 * Delete video from storage
 * @param path - Storage path of the video
 */
export async function deleteVideo(path: string): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase.storage.from(PUBLIC_SUPABASE_STORAGE_BUCKET).remove([path]);

		if (error) {
			return {
				success: false,
				error: error.message
			};
		}

		return { success: true };
	} catch (err) {
		return {
			success: false,
			error: 'Failed to delete video'
		};
	}
}
