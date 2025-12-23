import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { db } from '../../db';
import { positions } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/positions/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const result = await db
          .select()
          .from(positions)
          .where(eq(positions.id, parseInt(params.id)));

        if (result.length === 0) {
          return json({ error: 'Position not found' }, { status: 404 });
        }

        return json(result[0]);
      },

      PUT: async ({ params, request }) => {
        const body = await request.json();
        const result = await db
          .update(positions)
          .set(body)
          .where(eq(positions.id, parseInt(params.id)))
          .returning();

        if (result.length === 0) {
          return json({ error: 'Position not found' }, { status: 404 });
        }

        return json(result[0]);
      },

      DELETE: async ({ params }) => {
        const result = await db
          .delete(positions)
          .where(eq(positions.id, parseInt(params.id)))
          .returning();

        if (result.length === 0) {
          return json({ error: 'Position not found' }, { status: 404 });
        }

        return json({ success: true });
      },
    },
  },
});
