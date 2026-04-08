/**
 * Game image URLs from the API may be relative (e.g. ./Game-Images/foo.png), absolute
 * https (Steam), or missing. Optional CDN resizing via REACT_APP_IMAGE_CDN_TEMPLATE:
 *   https://images.weserv.nl/?url={encodedUrl}&w={width}&output=webp&n=-1
 * ({encodedUrl} = encodeURIComponent(source), {width} = target width in px)
 *
 * Opt-in modern format probes (.webp/.avif siblings): REACT_APP_IMAGE_MODERN_FORMATS=true
 */

const API_BASE = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050').replace(/\/$/, '');

const MODERN_FORMAT_REWRITES = ['avif', 'webp'];
const RASTER_EXTENSION_REGEX = /^(.*)\.(jpe?g|png)(\?.*)?$/i;

const toModernFormat = (url, extension) => {
    const match = url.match(RASTER_EXTENSION_REGEX);
    if (!match) {
        return null;
    }

    const [, basePath, , query = ''] = match;
    return `${basePath}.${extension}${query}`;
};

const isLoopbackUrl = (url) => /localhost|127\.0\.0\.1|\[::1\]/i.test(url);

export const resolveGameImageUrl = (raw) => {
    const normalized = typeof raw === 'string' ? raw.trim() : '';
    if (!normalized) {
        return '';
    }
    if (/^https?:\/\//i.test(normalized)) {
        return normalized;
    }
    const path = normalized.replace(/^\.\//, '');
    return `${API_BASE}/${path}`;
};

const buildCdnSizedUrl = (absoluteUrl, width) => {
    const template = process.env.REACT_APP_IMAGE_CDN_TEMPLATE;
    if (!template || !absoluteUrl || !width) {
        return null;
    }
    if (!/^https:\/\//i.test(absoluteUrl) || isLoopbackUrl(absoluteUrl)) {
        return null;
    }
    return template
        .replace(/\{encodedUrl\}/g, encodeURIComponent(absoluteUrl))
        .replace(/\{width\}/g, String(width));
};

const modernFormatAlternates = (url) => {
    if (process.env.REACT_APP_IMAGE_MODERN_FORMATS !== 'true' || !url) {
        return [];
    }
    return MODERN_FORMAT_REWRITES.map((format) => toModernFormat(url, format)).filter(Boolean);
};

/**
 * Ordered list of URLs to try (CDN-optimized first when configured, then direct / fallbacks).
 * @param {string} [rawSource] - value from API
 * @param {string|null} [bundledFallbackUrl] - webpack-resolved static import URL
 * @param {{ cdnWidth?: number }} [options]
 */
export const getGameImageUrlCandidates = (rawSource, bundledFallbackUrl, { cdnWidth = 320 } = {}) => {
    const resolved = resolveGameImageUrl(rawSource);
    const fallback = typeof bundledFallbackUrl === 'string' ? bundledFallbackUrl.trim() : '';
    const direct = resolved || fallback;
    if (!direct) {
        return [];
    }

    const ordered = [];
    const seen = new Set();
    const add = (u) => {
        if (!u || seen.has(u)) {
            return;
        }
        seen.add(u);
        ordered.push(u);
    };

    const cdnUrl = resolved ? buildCdnSizedUrl(resolved, cdnWidth) : null;
    add(cdnUrl);

    for (const alt of modernFormatAlternates(resolved || direct)) {
        add(alt);
    }

    add(resolved || null);
    add(fallback);

    return ordered;
};
