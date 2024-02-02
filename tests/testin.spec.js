// @vitest-environment node
import { describe, expect, test } from 'vitest'

describe('suite', () => {
  test('my test', () => {
    const sum = (a, b) => a + b;
    expect(sum(1, 2)).toBe(3);
  });
})