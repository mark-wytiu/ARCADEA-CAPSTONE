/**
 * Canonical id for persisted games (API routes, prefetch, navigation).
 * MongoDB documents use `_id`; some payloads may expose `id` instead.
 */
export function getGameId(game) {
    if (!game || typeof game !== 'object') {
        return undefined;
    }
    const raw = game._id ?? game.id;
    if (raw == null) {
        return undefined;
    }
    if (typeof raw === 'object' && typeof raw.toString === 'function') {
        return String(raw);
    }
    return raw;
}
