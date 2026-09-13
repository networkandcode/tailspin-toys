/**
 * Data-access helpers for publisher entities.
 *
 * Provides typed, injectable-db queries for fetching publisher data
 * from the SQLite database using Drizzle ORM.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves a list of all publishers ordered alphabetically by name.
 *
 * @param db - The Drizzle database instance to execute the query against.
 * @returns A promise resolving to an array of publishers containing their id and name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    return db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));
}
