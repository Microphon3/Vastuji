import { describe, it, expect, afterEach } from 'vitest';
import { uploadVideo, generateVideoUrl, deleteVideo } from './storage';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Storage Service', () => {
	const testFiles: string[] = [];

	afterEach(async () => {
		// Clean up test files
		for (const path of testFiles) {
			try {
				await deleteVideo(path);
			} catch (err) {
				// Ignore errors during cleanup
			}
		}
		testFiles.length = 0;
	});

	it('should upload video file and return URL', async () => {
		const mockFile = new File(['test video content'], 'test.mp4', { type: 'video/mp4' });
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(mockFile, analysisId);

		expect(result.success).toBe(true);
		expect(result.url).toContain('uploads/videos');
		expect(result.url).toContain(analysisId);
		expect(result.path).toBeDefined();

		// Verify file exists
		if (result.path) {
			testFiles.push(result.path);
			const absolutePath = join(process.cwd(), result.path);
			expect(existsSync(absolutePath)).toBe(true);
		}
	});

	it('should reject non-video files', async () => {
		const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(mockFile, analysisId);

		expect(result.success).toBe(false);
		expect(result.error).toContain('video');
	});

	it('should reject files larger than 100MB', async () => {
		const largeFile = new File([new ArrayBuffer(101 * 1024 * 1024)], 'large.mp4', {
			type: 'video/mp4'
		});
		const analysisId = 'test-analysis-123';

		const result = await uploadVideo(largeFile, analysisId);

		expect(result.success).toBe(false);
		expect(result.error).toContain('100MB');
	});

	it('should generate public URL for uploaded video', () => {
		const path = 'uploads/videos/test-analysis-123/video.mp4';
		const url = generateVideoUrl(path);

		expect(url).toContain('uploads');
		expect(url).toContain(path);
	});

	it('should delete uploaded video', async () => {
		const mockFile = new File(['test video content'], 'test.mp4', { type: 'video/mp4' });
		const analysisId = 'test-analysis-delete';

		const uploadResult = await uploadVideo(mockFile, analysisId);
		expect(uploadResult.success).toBe(true);

		const deleteResult = await deleteVideo(uploadResult.path!);
		expect(deleteResult.success).toBe(true);

		// Verify file is deleted
		const absolutePath = join(process.cwd(), uploadResult.path!);
		expect(existsSync(absolutePath)).toBe(false);
	});
});
