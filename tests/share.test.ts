import { describe, expect, it } from 'vitest';
import { createBlankBuild } from '@/domain/buildFactory';
import { createDefaultModuleState } from '@/domain/modules';
import { decodeSharePayload, encodeSharePayload } from '@/domain/share';

describe('share payloads', () => {
  it('round-trips a build and module state through URL-safe text', () => {
    const payload = { build: createBlankBuild(), modules: createDefaultModuleState() };
    const encoded = encodeSharePayload(payload);
    expect(decodeSharePayload(encoded)?.build.name).toBe(payload.build.name);
    expect(decodeSharePayload(encoded)?.modules.enabled.presets).toBe(true);
  });

  it('returns undefined for invalid payloads', () => {
    expect(decodeSharePayload('not-base64')).toBeUndefined();
  });
});
