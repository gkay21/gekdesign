import { describe, expect, it } from 'vitest';
import { ARTICLES } from '../data/articles';
import { PROJECTS } from '../data/projects';
import { PATHS, articlePath, contactPath, projectPath } from '../paths';
import { getSitePages } from './site-pages';

describe('getSitePages', () => {
  const pages = getSitePages();

  it('includes every static page, case study and article exactly once', () => {
    expect(pages).toEqual(expect.arrayContaining(Object.values(PATHS)));
    PROJECTS.forEach((p) => expect(pages).toContain(projectPath(p.slug)));
    ARTICLES.forEach((a) => expect(pages).toContain(articlePath(a.slug)));
    expect(new Set(pages).size).toBe(pages.length);
    expect(pages).toHaveLength(Object.values(PATHS).length + PROJECTS.length + ARTICLES.length);
  });
});

describe('paths', () => {
  it('builds case study, article and contact URLs', () => {
    expect(projectPath('stan-live-video')).toBe('/work/stan-live-video');
    expect(articlePath('restraint-in-digital-luxury')).toBe('/insights/restraint-in-digital-luxury');
    expect(contactPath()).toBe('/contact');
    expect(contactPath('Sprint Model')).toBe('/contact?service=Sprint+Model');
  });
});

describe('project data', () => {
  it('has unique ids and slugs', () => {
    expect(new Set(PROJECTS.map((p) => p.id)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
  });

  it('has real per-project headings, status and stack (no template filler)', () => {
    for (const p of PROJECTS) {
      expect(p.challengeHeading.trim()).not.toBe('');
      expect(p.approachHeading.trim()).not.toBe('');
      expect(p.status.trim()).not.toBe('');
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.metrics.length).toBeGreaterThan(0);
    }
  });
});
