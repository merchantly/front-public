import assert from 'assert';
import ThumborService from 'r/services/Thumbor';

const BREAKPOINTS = [40, 80, 160, 240, 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2560];

describe('ThumborService', () => {
  describe('snapToBreakpoint via imageUrl', () => {
    it('should snap arbitrary widths to breakpoints', () => {
      const cases = [
        [1, 40],
        [50, 80],
        [100, 160],
        [200, 240],
        [300, 320],
        [450, 480],
        [500, 640],
        [700, 768],
        [800, 1024],
        [1100, 1280],
        [1400, 1536],
        [1800, 1920],
        [2000, 2560],
        [3000, 2560],
      ];

      cases.forEach(([input, expected]) => {
        const url = ThumborService.imageUrl('http://img.jpg', { width: input }, []);
        const match = url.match(/\/unsafe\/(\d+)x\//);
        assert(match, `URL should contain width for input ${input}: ${url}`);
        assert.strictEqual(
          parseInt(match[1], 10),
          expected,
          `Width ${input} should snap to ${expected}, got ${match[1]}`
        );
      });
    });

    it('should snap exact breakpoint values to themselves', () => {
      BREAKPOINTS.forEach((bp) => {
        const url = ThumborService.imageUrl('http://img.jpg', { width: bp }, []);
        const match = url.match(/\/unsafe\/(\d+)x\//);
        assert.strictEqual(
          parseInt(match[1], 10),
          bp,
          `Exact breakpoint ${bp} should stay ${bp}`
        );
      });
    });

    it('should not include height in URL', () => {
      const url = ThumborService.imageUrl('http://img.jpg', { width: 300, height: 200 }, []);
      const match = url.match(/\/unsafe\/(\d+)x\//);
      assert(match, `URL should have empty height: ${url}`);
    });

    it('should return original URL when width is absent', () => {
      const url = ThumborService.imageUrl('http://img.jpg', {}, []);
      assert(url.includes('/unsafe/x/'), `URL with no width: ${url}`);
    });
  });

  describe('retinaImageUrl', () => {
    it('should snap doubled width to breakpoints', () => {
      const url = ThumborService.retinaImageUrl('http://img.jpg', { width: 300 }, []);
      const match = url.match(/\/unsafe\/(\d+)x\//);
      // 300 * 2 = 600, snap to 640
      assert.strictEqual(parseInt(match[1], 10), 640, `Retina 300 should snap to 640, got ${match[1]}`);
    });

    it('should NOT include 2x suffix in URL (2x is a srcSet descriptor, not part of URL)', () => {
      const url = ThumborService.retinaImageUrl('http://img.jpg', { width: 300 }, []);
      assert(!url.includes(' 2x'), `Retina URL should NOT contain ' 2x': ${url}`);
      assert(!url.includes('%202x'), `Retina URL should NOT contain '%202x': ${url}`);
    });

    it('should return clean Thumbor URL without space or descriptor', () => {
      const url = ThumborService.retinaImageUrl('http://img.jpg', { width: 300 }, []);
      assert(url.match(/\/unsafe\/\d+x\//), `URL should be a valid Thumbor URL: ${url}`);
      assert(!url.includes(' '), `URL should not contain spaces: ${url}`);
    });

    it('should return raw URL without 2x when thumborUrl is not configured', () => {
      const saved = global.gon;
      global.gon = {};
      const url = ThumborService.retinaImageUrl('http://img.jpg', { width: 300 }, []);
      global.gon = saved;
      assert.strictEqual(url, 'http://img.jpg', `Fallback should return raw URL: ${url}`);
      assert(!url.includes(' 2x'), `Fallback URL should not contain 2x: ${url}`);
    });
  });
});
