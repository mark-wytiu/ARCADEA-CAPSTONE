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

export const getImageSourceCandidates = (source, fallback = null) => {
    const normalizedSource = typeof source === 'string' ? source.trim() : '';
    const normalizedFallback = typeof fallback === 'string' ? fallback.trim() : '';
    const primarySource = normalizedSource || normalizedFallback;

    if (!primarySource) {
        return [];
    }

    const modernCandidates = MODERN_FORMAT_REWRITES
        .map((format) => toModernFormat(primarySource, format))
        .filter(Boolean);

    return Array.from(new Set([
        ...modernCandidates,
        primarySource,
        normalizedFallback,
    ].filter(Boolean)));
};
