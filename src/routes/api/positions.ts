import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { db } from '../../db';
import { positions } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/positions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const department = url.searchParams.get('department');

        let query = db.select().from(positions);

        if (department && department !== 'All departments') {
          query = query.where(eq(positions.department, department)) as any;
        }

        const result = await query;
        return json(result);
      },

      POST: async ({ request }) => {
        const body = await request.json();
        const result = await db.insert(positions).values(body).returning();
        return json(result[0], { status: 201 });
      },
    },
  },
});
