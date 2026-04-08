#!/usr/bin/env node
/**
 * Prints core performance numbers from a Lighthouse JSON report.
 *
 * Generate a report (Chrome required), for example:
 *   npm run build && npx serve -s build -l 3456
 *   npx lighthouse http://127.0.0.1:3456 --preset=desktop --only-categories=performance --output=json --output-path=lighthouse.json
 *   npm run perf:lh-print -- lighthouse.json
 */

const fs = require('fs');
const path = require('path');

const reportPath = path.resolve(process.cwd(), process.argv[2] || 'lighthouse.json');

if (!fs.existsSync(reportPath)) {
    console.error(`File not found: ${reportPath}`);
    process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const audits = report.audits || {};
const perfScore = report.categories?.performance?.score;

const pick = (id) => {
    const a = audits[id];
    if (!a) {
        return { title: id, display: '—' };
    }
    const unit = a.numericUnit === 'millisecond' ? 'ms' : a.numericUnit === 'unitless' ? '' : '';
    const val =
        typeof a.numericValue === 'number'
            ? `${a.numericValue.toFixed(a.numericUnit === 'millisecond' ? 0 : 3)}${unit ? ` ${unit}` : ''}`.trim()
            : a.displayValue || '—';
    return { title: a.title, display: val };
};

const rows = [
    ['Performance score (0–100)', perfScore != null ? String(Math.round(perfScore * 100)) : '—'],
    [pick('first-contentful-paint').title, pick('first-contentful-paint').display],
    [pick('largest-contentful-paint').title, pick('largest-contentful-paint').display],
    [pick('total-blocking-time').title, pick('total-blocking-time').display],
    [pick('cumulative-layout-shift').title, pick('cumulative-layout-shift').display],
    [pick('speed-index').title, pick('speed-index').display],
    [pick('interactive').title, pick('interactive').display],
];

const labelW = Math.max(...rows.map((r) => r[0].length));

console.log(`\nLighthouse: ${reportPath}\n`);
for (const [label, value] of rows) {
    console.log(`${label.padEnd(labelW)}  ${value}`);
}
console.log('');
