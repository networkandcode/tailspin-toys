/**
 * Unit tests for publishers data-access helpers.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDatabase } from '../../db/test-helpers';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import { getAllPublishers } from './publishers';

describe('publishers data-access helpers', () => {
    let db: Database;

    beforeEach(async () => {
        db = await createTestDatabase();
    });

    it('returns an empty array when no publishers exist', async () => {
        const result = await getAllPublishers(db);
        expect(result).toEqual([]);
    });

    it('returns all publishers ordered by name with id and name', async () => {
        await db.insert(publishers).values([
            { name: 'Zeta Games', description: 'Zeta description' },
            { name: 'Alpha Studios', description: 'Alpha description' },
            { name: 'Beta Interactive', description: 'Beta description' },
        ]);

        const result = await getAllPublishers(db);
        expect(result).toEqual([
            { id: expect.any(Number), name: 'Alpha Studios' },
            { id: expect.any(Number), name: 'Beta Interactive' },
            { id: expect.any(Number), name: 'Zeta Games' },
        ]);
    });
});
