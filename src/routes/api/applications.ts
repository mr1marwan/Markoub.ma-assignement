import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { db } from '../../db';
import { applications } from '../../db/schema';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

export const Route = createFileRoute('/api/applications')({
  server: {
    handlers: {
      GET: async () => {
        const result = await db.select().from(applications);
        return json(result);
      },

      POST: async ({ request }) => {
        try {
          // Parse multipart form data
          const formData = await request.formData();
          const fullName = formData.get('fullName') as string;
          const email = formData.get('email') as string;
          const positionId = formData.get('positionId') as string;
          const isSpontaneous = formData.get('isSpontaneous') === 'true';
          const file = formData.get('resume') as File;

          // Validate required fields
          if (!fullName || !email || !file) {
            return json({ error: 'Missing required fields' }, { status: 400 });
          }

          // Validate file size (2MB)
          if (file.size > 2 * 1024 * 1024) {
            return json({ error: 'File size must be less than 2MB' }, { status: 400 });
          }

          // Validate file type
          if (file.type !== 'application/pdf') {
            return json({ error: 'Only PDF files are allowed' }, { status: 400 });
          }

          // Save file to disk
          const uploadDir = path.join(process.cwd(), 'uploads');
          await fs.mkdir(uploadDir, { recursive: true });

          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = uniqueSuffix + '.pdf';
          const filepath = path.join(uploadDir, filename);

          const buffer = await file.arrayBuffer();
          await fs.writeFile(filepath, Buffer.from(buffer));

          // Save to database
          const result = await db
            .insert(applications)
            .values({
              fullName,
              email,
              positionId: positionId && !isSpontaneous ? parseInt(positionId) : null,
              resumePath: `/uploads/${filename}`,
              isSpontaneous,
            })
            .returning();

          return json(result[0], { status: 201 });
        } catch (error) {
          console.error('Error processing application:', error);
          return json(
            { error: 'Failed to process application' },
            { status: 500 }
          );
        }
      },
    },
  },
});
