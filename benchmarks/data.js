window.BENCHMARK_DATA = {
  "lastUpdate": 1754123352820,
  "repoUrl": "https://github.com/czlonkowski/n8n-mcp",
  "entries": {
    "n8n-mcp Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "07cda6e3abbd3161a01ef67198381b6766d2ff83",
          "message": "chore: clean up development artifacts and update .gitignore\n\n- Remove AI agent coordination files and progress tracking\n- Remove temporary test results and generated artifacts\n- Remove diagnostic test scripts from src/scripts/\n- Remove development planning documents\n- Update .gitignore to exclude test artifacts\n- Clean up 53 temporary files total",
          "timestamp": "2025-07-30T09:22:53+02:00",
          "tree_id": "1553cc5ca363d04a2322e0c72d34f78dde595a93",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/07cda6e3abbd3161a01ef67198381b6766d2ff83"
        },
        "date": 1753860266074,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0193,
            "unit": "ms",
            "range": 0.30569999999999997,
            "extra": "51919 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2044,
            "unit": "ms",
            "range": 1.7138999999999998,
            "extra": "312 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2854,
            "extra": "212905 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0681,
            "unit": "ms",
            "range": 0.2999,
            "extra": "14679 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "0e26a46af96cbe287099682545da77b9f9fb43a7",
          "message": "feat: add test execution to npm publish workflow\n\n- Run all tests before publishing to npm\n- Abort publish if any tests fail\n- Ensures only quality-tested code gets published\n- Shows clear success/failure messages\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T09:47:58+02:00",
          "tree_id": "fe3c572de9f5154386a3e429f601830814079be6",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/0e26a46af96cbe287099682545da77b9f9fb43a7"
        },
        "date": 1753861795335,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.2506,
            "extra": "53199 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1373,
            "unit": "ms",
            "range": 0.9872999999999998,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.26080000000000003,
            "extra": "200999 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0663,
            "unit": "ms",
            "range": 0.3349,
            "extra": "15083 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "ced38b2f8a49f91e0ba4004ab242f13363c1a6d5",
          "message": "feat: add comprehensive update script for n8n dependencies\n\n- Created update-and-publish-prep.sh script that automates entire update process\n- Script now runs all 1,182 tests before allowing updates\n- Automatically bumps version and updates README badges\n- Integrates with npm publish preparation workflow\n- Added 'npm run update:all' command for one-step updates\n- Updated MEMORY_N8N_UPDATE.md with new comprehensive process\n\nThe new workflow ensures:\n- All tests pass before version bump\n- README badges stay in sync\n- Consistent commit messages\n- Ready for npm publish after update\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T09:53:40+02:00",
          "tree_id": "2e50363065ef1ed5fab578e9c71e694540be40c0",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/ced38b2f8a49f91e0ba4004ab242f13363c1a6d5"
        },
        "date": 1753862118107,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.37929999999999997,
            "extra": "52952 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1335,
            "unit": "ms",
            "range": 0.5701999999999998,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2901,
            "extra": "207259 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0659,
            "unit": "ms",
            "range": 0.3066,
            "extra": "15181 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "ced38b2f8a49f91e0ba4004ab242f13363c1a6d5",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T07:16:02Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/ced38b2f8a49f91e0ba4004ab242f13363c1a6d5"
        },
        "date": 1753862386886,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.27199999999999996,
            "extra": "53615 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1447,
            "unit": "ms",
            "range": 0.5281000000000002,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2594,
            "extra": "215484 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0661,
            "unit": "ms",
            "range": 0.3047,
            "extra": "15134 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "ee9efd7849e9ef20d1da5c73138389bbd67a5b3b",
          "message": "fix: resolve Docker build failures by copying tsconfig.build.json\n\n- Updated Dockerfile to copy all tsconfig*.json files (includes tsconfig.build.json)\n- Updated Dockerfile.railway with same fix\n- Changed standard Dockerfile to use 'tsc -p tsconfig.build.json' for consistency\n- This fixes the missing file errors preventing Docker builds in CI\n\nThe issue was that tsconfig.build.json was added for the testing infrastructure\nbut the Docker COPY commands were not updated to include it.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T10:13:14+02:00",
          "tree_id": "fd4b182dbb433551daf009419c65a4928d829546",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/ee9efd7849e9ef20d1da5c73138389bbd67a5b3b"
        },
        "date": 1753863300360,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.3651,
            "extra": "53068 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1402,
            "unit": "ms",
            "range": 0.7529000000000003,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0051,
            "unit": "ms",
            "range": 0.5585,
            "extra": "196612 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0674,
            "unit": "ms",
            "range": 0.37129999999999996,
            "extra": "14845 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "ee9efd7849e9ef20d1da5c73138389bbd67a5b3b",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T08:07:45Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/ee9efd7849e9ef20d1da5c73138389bbd67a5b3b"
        },
        "date": 1753863323002,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.22849999999999998,
            "extra": "53002 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1451,
            "unit": "ms",
            "range": 1.4502000000000002,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.271,
            "extra": "202154 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0661,
            "unit": "ms",
            "range": 0.3175,
            "extra": "15136 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "bd208e71f8e8de35b4ccf5bc669cad92a5bdb633",
          "message": "fix: override test-related types in tsconfig.build.json for Docker builds\n\n- Override the 'types' array to only include 'node' types\n- Exclude 'types' directory and any nested types directories from build\n- Add comment explaining the types override rationale\n- This prevents TypeScript from looking for vitest/globals and test-env types\n\nThe issue was that tsconfig.build.json was inheriting test-related type\ndefinitions from tsconfig.json which aren't available in the minimal\nDocker build environment.\n\nCode reviewed and enhanced based on suggestions:\n- Added '**/types' to exclude pattern for comprehensive exclusion\n- Added explanatory comment for future maintainers\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T10:18:29+02:00",
          "tree_id": "eff1e3a295be3450a88ee378478c118d7803ae20",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/bd208e71f8e8de35b4ccf5bc669cad92a5bdb633"
        },
        "date": 1753863597738,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.4264,
            "extra": "52430 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1497,
            "unit": "ms",
            "range": 0.46119999999999983,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2666,
            "extra": "214393 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0668,
            "unit": "ms",
            "range": 0.3388,
            "extra": "14967 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "bd208e71f8e8de35b4ccf5bc669cad92a5bdb633",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T08:07:45Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/bd208e71f8e8de35b4ccf5bc669cad92a5bdb633"
        },
        "date": 1753863618044,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.3854,
            "extra": "52332 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1829,
            "unit": "ms",
            "range": 0.5514000000000001,
            "extra": "314 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.3033,
            "extra": "212632 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0678,
            "unit": "ms",
            "range": 0.3568,
            "extra": "14755 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "6699a1d34c8cb93612084659096cc666e612ebdd",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T11:25:02Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/6699a1d34c8cb93612084659096cc666e612ebdd"
        },
        "date": 1753875983557,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0203,
            "unit": "ms",
            "range": 0.3331,
            "extra": "49355 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1657,
            "unit": "ms",
            "range": 0.6713999999999998,
            "extra": "316 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2597,
            "extra": "209749 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0686,
            "unit": "ms",
            "range": 0.27040000000000003,
            "extra": "14573 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "6699a1d34c8cb93612084659096cc666e612ebdd",
          "message": "test: implement comprehensive testing improvements from PR #104 review\n\nMajor improvements based on comprehensive test suite review:\n\nTest Fixes:\n- Fix all 78 failing tests across logger, MSW, and validator tests\n- Fix console spy management in logger tests with proper DEBUG env handling\n- Fix MSW test environment restoration in session-management.test.ts\n- Fix workflow validator tests by adding proper node connections\n- Fix mock setup issues in edge case tests\n\nTest Organization:\n- Split large config-validator.test.ts (1,075 lines) into 4 focused files\n- Rename 63+ tests to follow \"should X when Y\" naming convention\n- Add comprehensive edge case test files for all major validators\n- Create tests/README.md with testing guidelines and best practices\n\nNew Features:\n- Add ConfigValidator.validateBatch() method for bulk validation\n- Add edge case coverage for null/undefined, boundaries, invalid data\n- Add CI-aware performance test timeouts\n- Add JSDoc comments to test utilities and factories\n- Add workflow duplicate node name validation tests\n\nResults:\n- All tests passing: 1,356 passed, 19 skipped\n- Test coverage: 85.34% statements, 85.3% branches\n- From 78 failures to 0 failures\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T13:44:35+02:00",
          "tree_id": "d9caad4daabdcc6858f2f167df8cbd34b25016cf",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/6699a1d34c8cb93612084659096cc666e612ebdd"
        },
        "date": 1753875984669,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0193,
            "unit": "ms",
            "range": 0.3656,
            "extra": "51734 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1392,
            "unit": "ms",
            "range": 0.42890000000000006,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2993,
            "extra": "202612 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.31679999999999997,
            "extra": "15158 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "e4acb6a1ef55f6d5b7f4ebd31ce16d97134f03b1",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T11:45:06Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/e4acb6a1ef55f6d5b7f4ebd31ce16d97134f03b1"
        },
        "date": 1753877719787,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.33249999999999996,
            "extra": "52526 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1523,
            "unit": "ms",
            "range": 0.5766,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2944,
            "extra": "210423 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0671,
            "unit": "ms",
            "range": 0.4111,
            "extra": "14901 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "e4acb6a1ef55f6d5b7f4ebd31ce16d97134f03b1",
          "message": "fix: resolve TypeScript compilation errors in test files\n\n- Add explicit type annotations for properties arrays in config validator tests\n- Update ValidationResult mock to include required visibleProperties and hiddenProperties\n- Fix all TypeScript compilation errors found in CI/CD pipeline\n\nAll tests passing with 85.36% coverage.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T14:13:19+02:00",
          "tree_id": "3a0c08cf73ae50fb8f7abdbbaba7af2d54b09477",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/e4acb6a1ef55f6d5b7f4ebd31ce16d97134f03b1"
        },
        "date": 1753877733764,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.27680000000000005,
            "extra": "52514 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1378,
            "unit": "ms",
            "range": 0.5802,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2914,
            "extra": "214877 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.2854,
            "extra": "15152 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "b8dc9a037cdfcc84804fa6821aac10535fce022d",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T12:23:17Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/b8dc9a037cdfcc84804fa6821aac10535fce022d"
        },
        "date": 1753878630758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.23619999999999997,
            "extra": "52874 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1238,
            "unit": "ms",
            "range": 0.44259999999999966,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.24970000000000003,
            "extra": "216674 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0666,
            "unit": "ms",
            "range": 0.3276,
            "extra": "15016 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "b8dc9a037cdfcc84804fa6821aac10535fce022d",
          "message": "fix: add missing permissions to GitHub Actions workflows\n\n- Add issues, pull-requests, and checks write permissions to test.yml\n- Add statuses write permission to benchmark-pr.yml\n- Fixes \"Resource not accessible by integration\" errors in CI/CD\n\nThese permissions allow workflows to create PR comments and commit statuses.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T14:28:36+02:00",
          "tree_id": "954441a7b44613fd580df1ab601fe7544515901b",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/b8dc9a037cdfcc84804fa6821aac10535fce022d"
        },
        "date": 1753878638855,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.3716,
            "extra": "52265 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1408,
            "unit": "ms",
            "range": 0.5615999999999999,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2795,
            "extra": "209107 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0679,
            "unit": "ms",
            "range": 0.3333,
            "extra": "14721 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "c36567875a6ca2499a4660332a93d390bdb465b7",
          "message": "chore: bump version to 2.8.0\n\n- Update package.json version from 2.7.23 to 2.8.0\n- Update README.md test count from 1,182 to 1,356 tests\n- Add comprehensive CHANGELOG entry for v2.8.0\n- Document all test improvements and fixes from PR #104\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T15:43:48+02:00",
          "tree_id": "6b8507d1827d1865dc69e2e74945ce432f367de5",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/c36567875a6ca2499a4660332a93d390bdb465b7"
        },
        "date": 1753883125428,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.2807,
            "extra": "52881 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2642,
            "unit": "ms",
            "range": 3.1914999999999996,
            "extra": "306 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2457,
            "extra": "202642 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0672,
            "unit": "ms",
            "range": 0.3097,
            "extra": "14887 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "c36567875a6ca2499a4660332a93d390bdb465b7",
          "message": "This PR implements a comprehensive testing infrastructure for n8n-MCP, adding 1,182 tests to ensure code quality and reliability.",
          "timestamp": "2025-07-30T13:37:13Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/104/commits/c36567875a6ca2499a4660332a93d390bdb465b7"
        },
        "date": 1753883147464,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2371,
            "extra": "53608 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1286,
            "unit": "ms",
            "range": 1.0852,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2686,
            "extra": "211177 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0656,
            "unit": "ms",
            "range": 0.2725,
            "extra": "15239 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "Romuald Członkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4847fae1a1268a3a1b865b5d5bdc1e4801e8c9e3",
          "message": "Merge pull request #104 from czlonkowski/feat/comprehensive-testing-suite\n\nThis PR implements a comprehensive testing infrastructure for n8n-MCP",
          "timestamp": "2025-07-30T15:47:33+02:00",
          "tree_id": "6b8507d1827d1865dc69e2e74945ce432f367de5",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/4847fae1a1268a3a1b865b5d5bdc1e4801e8c9e3"
        },
        "date": 1753883359395,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.2345,
            "extra": "53123 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1176,
            "unit": "ms",
            "range": 0.4623000000000004,
            "extra": "321 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.24130000000000001,
            "extra": "216883 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0653,
            "unit": "ms",
            "range": 0.3465,
            "extra": "15318 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "dce2d9d83bdd53633886148dd992cec4aac3010b",
          "message": "chore: update n8n to ^1.104.1 and bump version to 2.8.1\n\n- Updated n8n to ^1.104.1\n- Updated n8n-core to ^1.103.1\n- Updated n8n-workflow to ^1.101.0\n- Updated @n8n/n8n-nodes-langchain to ^1.103.1\n- Rebuilt node database with 532 nodes\n- Sanitized 499 workflow templates\n- All 1,182 tests passing (933 unit, 249 integration)\n- All validation tests passing\n- Built and prepared for npm publish\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-30T16:20:51+02:00",
          "tree_id": "9553220afce5b02079ab24a2a0bb1fed4d9d4145",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/dce2d9d83bdd53633886148dd992cec4aac3010b"
        },
        "date": 1753885735665,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2555,
            "extra": "53387 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1425,
            "unit": "ms",
            "range": 0.4264999999999999,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2508,
            "extra": "211982 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0673,
            "unit": "ms",
            "range": 0.29050000000000004,
            "extra": "14866 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "distinct": true,
          "id": "903a49d3b0d9a82eef2fc48f5e51772654d62271",
          "message": "fix: add Docker configuration file support (fixes #105)\n\nThis commit adds comprehensive support for JSON configuration files in Docker containers,\naddressing the issue where the Docker image fails to start in server mode and ignores\nconfiguration files.\n\n## Changes\n\n### Docker Configuration Support\n- Added parse-config.js to safely parse JSON configs and export as shell variables\n- Implemented secure shell quoting to prevent command injection\n- Added dangerous environment variable blocking for security\n- Support for all JSON data types with proper edge case handling\n\n### Docker Server Mode Fix\n- Added support for \"n8n-mcp serve\" command in entrypoint\n- Properly transforms serve command to HTTP mode\n- Fixed missing n8n-mcp binary issue in Docker image\n\n### Security Enhancements\n- POSIX-compliant shell quoting without eval\n- Blocked dangerous variables (PATH, LD_PRELOAD, etc.)\n- Sanitized configuration keys to prevent invalid shell variables\n- Protection against shell metacharacters in values\n\n### Testing\n- Added 53 comprehensive tests for Docker configuration\n- Unit tests for parsing, security, and edge cases\n- Integration tests for Docker entrypoint behavior\n- Security-focused tests for injection prevention\n\n### Documentation\n- Updated Docker README with config file mounting examples\n- Enhanced troubleshooting guide with config file issues\n- Added version bump to 2.8.2\n\n### Additional Files\n- Included deployment-engineer and technical-researcher agent files\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-31T11:48:31+02:00",
          "tree_id": "ea2163e91bd0a80e4773945503bd4d17b187cdbf",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/903a49d3b0d9a82eef2fc48f5e51772654d62271"
        },
        "date": 1753955434950,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2234,
            "extra": "53420 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1228,
            "unit": "ms",
            "range": 0.48850000000000016,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.24719999999999998,
            "extra": "202390 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.34659999999999996,
            "extra": "15159 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "71cd20bf95539857d7c7518abe7a3c72b261e62d",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T10:57:30Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/71cd20bf95539857d7c7518abe7a3c72b261e62d"
        },
        "date": 1753960015635,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.213,
            "extra": "52796 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.145,
            "unit": "ms",
            "range": 0.5198,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2496,
            "extra": "218154 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0649,
            "unit": "ms",
            "range": 0.3113,
            "extra": "15401 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "55deb69bafd5b51b7f0101b4c66757afd1d11c6e",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T11:17:36Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/55deb69bafd5b51b7f0101b4c66757afd1d11c6e"
        },
        "date": 1753961750181,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.24259999999999998,
            "extra": "53071 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1489,
            "unit": "ms",
            "range": 0.5188000000000001,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.269,
            "extra": "213473 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0662,
            "unit": "ms",
            "range": 0.3024,
            "extra": "15106 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "8047297abc8dceea0a63230eda3b3e8e3930f1bb",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T11:44:03Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/8047297abc8dceea0a63230eda3b3e8e3930f1bb"
        },
        "date": 1753962406980,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.25360000000000005,
            "extra": "53058 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1335,
            "unit": "ms",
            "range": 0.4918999999999998,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2614,
            "extra": "216793 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0655,
            "unit": "ms",
            "range": 0.3141,
            "extra": "15274 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "9cd5e42cb7843fc1cd9e5406228500f14627f726",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T12:05:46Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/9cd5e42cb7843fc1cd9e5406228500f14627f726"
        },
        "date": 1753963812318,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.20550000000000002,
            "extra": "52917 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.142,
            "unit": "ms",
            "range": 0.45020000000000016,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2558,
            "extra": "213868 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0694,
            "unit": "ms",
            "range": 0.42760000000000004,
            "extra": "14407 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "e935a05223aded899436a1af29661c2ddcdcc03b",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T12:05:46Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/e935a05223aded899436a1af29661c2ddcdcc03b"
        },
        "date": 1753965154860,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0196,
            "unit": "ms",
            "range": 0.30989999999999995,
            "extra": "50928 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.264,
            "unit": "ms",
            "range": 0.7831999999999999,
            "extra": "306 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.2621,
            "extra": "200247 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0714,
            "unit": "ms",
            "range": 0.3922,
            "extra": "14007 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "75a22163949e02c7ce14f8b3014cb273b2a49aef",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T12:38:48Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/75a22163949e02c7ce14f8b3014cb273b2a49aef"
        },
        "date": 1753966344492,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2879,
            "extra": "53404 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1322,
            "unit": "ms",
            "range": 0.4101999999999997,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2862,
            "extra": "211887 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0659,
            "unit": "ms",
            "range": 0.3368,
            "extra": "15167 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "7606566c4ca08f0eff117024ecb425a18eb69b7e",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T13:13:32Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/7606566c4ca08f0eff117024ecb425a18eb69b7e"
        },
        "date": 1753968578861,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0193,
            "unit": "ms",
            "range": 1.2304,
            "extra": "51893 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.567,
            "unit": "ms",
            "range": 2.6273999999999997,
            "extra": "280 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2771,
            "extra": "211719 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.067,
            "unit": "ms",
            "range": 0.3552,
            "extra": "14929 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "13591df47c22e8695cf1f16a6fbddb516d512e22",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T14:19:53Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/13591df47c22e8695cf1f16a6fbddb516d512e22"
        },
        "date": 1753972655982,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0192,
            "unit": "ms",
            "range": 0.27140000000000003,
            "extra": "52124 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1453,
            "unit": "ms",
            "range": 0.4518,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2636,
            "extra": "214446 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0661,
            "unit": "ms",
            "range": 0.28640000000000004,
            "extra": "15123 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "959f2913957b1e50caf928830c031b96cd54c8a9",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T15:15:59Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/959f2913957b1e50caf928830c031b96cd54c8a9"
        },
        "date": 1753977017622,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2779,
            "extra": "53453 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1629,
            "unit": "ms",
            "range": 0.4607000000000001,
            "extra": "316 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.2661,
            "extra": "200272 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0694,
            "unit": "ms",
            "range": 0.48070000000000007,
            "extra": "14415 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "a4053de998595b4321576ad6a908e65590816ee0",
          "message": "fix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T15:15:59Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/106/commits/a4053de998595b4321576ad6a908e65590816ee0"
        },
        "date": 1753977630757,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0205,
            "unit": "ms",
            "range": 0.2163,
            "extra": "48759 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1319,
            "unit": "ms",
            "range": 0.47809999999999997,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.27540000000000003,
            "extra": "202911 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0663,
            "unit": "ms",
            "range": 0.32420000000000004,
            "extra": "15094 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "Romuald Członkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23327f5dc72270cf77cd87779779fdd237c7a15c",
          "message": "Merge pull request #106 from czlonkowski/fix/docker-config-file-support\n\nfix: add Docker configuration file support (fixes #105)",
          "timestamp": "2025-07-31T18:07:48+02:00",
          "tree_id": "ee973173090c4b224f364e2e1f313c9c23d7bf89",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/23327f5dc72270cf77cd87779779fdd237c7a15c"
        },
        "date": 1753978139261,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.3092,
            "extra": "53192 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1504,
            "unit": "ms",
            "range": 0.5278999999999998,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.27340000000000003,
            "extra": "200516 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0668,
            "unit": "ms",
            "range": 0.3655,
            "extra": "14963 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "a5ef55f1975784bb42594ef2972864666f7183f2",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T05:17:32Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/a5ef55f1975784bb42594ef2972864666f7183f2"
        },
        "date": 1754026815062,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.363,
            "extra": "53198 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1591,
            "unit": "ms",
            "range": 0.5848,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.27390000000000003,
            "extra": "211592 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0676,
            "unit": "ms",
            "range": 0.37520000000000003,
            "extra": "14800 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "0976aeb318e3bc1ae4caaf8adcd63a3883141ad2",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T05:17:32Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/0976aeb318e3bc1ae4caaf8adcd63a3883141ad2"
        },
        "date": 1754027239875,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.4205,
            "extra": "52696 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1798,
            "unit": "ms",
            "range": 0.5530999999999997,
            "extra": "314 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2802,
            "extra": "209210 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0681,
            "unit": "ms",
            "range": 0.49139999999999995,
            "extra": "14688 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "72dfcfc2128e754eaf4962c3e92b6e8b7bb3b657",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:04:17Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/72dfcfc2128e754eaf4962c3e92b6e8b7bb3b657"
        },
        "date": 1754028412905,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0195,
            "unit": "ms",
            "range": 0.2806,
            "extra": "51174 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2385,
            "unit": "ms",
            "range": 0.6840999999999999,
            "extra": "309 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0052,
            "unit": "ms",
            "range": 0.3048,
            "extra": "190765 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0712,
            "unit": "ms",
            "range": 0.37149999999999994,
            "extra": "14040 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "641ec489298ec844caffe43760b62f9a69adadea",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:04:17Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/641ec489298ec844caffe43760b62f9a69adadea"
        },
        "date": 1754029582782,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.2965,
            "extra": "53269 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1614,
            "unit": "ms",
            "range": 0.6158000000000001,
            "extra": "316 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2641,
            "extra": "215253 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0662,
            "unit": "ms",
            "range": 0.3504,
            "extra": "15097 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "916825634b4cd818c25c3e47b432043eab92f8cb",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:31:56Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/916825634b4cd818c25c3e47b432043eab92f8cb"
        },
        "date": 1754030516812,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.3351,
            "extra": "53002 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.3873,
            "unit": "ms",
            "range": 1.6542,
            "extra": "295 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.4175,
            "extra": "203506 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0667,
            "unit": "ms",
            "range": 0.38039999999999996,
            "extra": "14987 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "6264bcff339223144f9ec870bb5cc91e6518d0d2",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:31:56Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/6264bcff339223144f9ec870bb5cc91e6518d0d2"
        },
        "date": 1754031359974,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.3892,
            "extra": "52870 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1697,
            "unit": "ms",
            "range": 0.7061999999999999,
            "extra": "315 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2576,
            "extra": "207293 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0694,
            "unit": "ms",
            "range": 0.44889999999999997,
            "extra": "14402 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "12818443df5ca3a7c11f20ed07f07808a44c2eec",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:31:56Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/12818443df5ca3a7c11f20ed07f07808a44c2eec"
        },
        "date": 1754031732524,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.3998,
            "extra": "52596 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1559,
            "unit": "ms",
            "range": 0.6420000000000003,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2906,
            "extra": "209748 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0665,
            "unit": "ms",
            "range": 0.34009999999999996,
            "extra": "15027 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "6cdb52f56f560d02b43f0f84d732236520c72a6c",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T06:31:56Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/6cdb52f56f560d02b43f0f84d732236520c72a6c"
        },
        "date": 1754033817476,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.2564,
            "extra": "52386 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1369,
            "unit": "ms",
            "range": 0.43279999999999985,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2674,
            "extra": "205762 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0657,
            "unit": "ms",
            "range": 0.3616,
            "extra": "15224 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "3fec6813f3ee370f70553a71394eb15d5448c602",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T12:10:02Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/3fec6813f3ee370f70553a71394eb15d5448c602"
        },
        "date": 1754051119553,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0198,
            "unit": "ms",
            "range": 0.3069,
            "extra": "50417 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.148,
            "unit": "ms",
            "range": 0.47989999999999977,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2702,
            "extra": "204410 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.067,
            "unit": "ms",
            "range": 0.3291,
            "extra": "14935 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "ff7fa33e51e917676cae68f8025a980a5443f6a6",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T13:07:38Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/ff7fa33e51e917676cae68f8025a980a5443f6a6"
        },
        "date": 1754054449111,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.3208,
            "extra": "53219 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1543,
            "unit": "ms",
            "range": 1.1707,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.3118,
            "extra": "203287 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0664,
            "unit": "ms",
            "range": 0.365,
            "extra": "15052 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "100f67ce3b23e9d659249479d56d06348fa5bbe9",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T13:07:38Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/100f67ce3b23e9d659249479d56d06348fa5bbe9"
        },
        "date": 1754054966311,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.4158,
            "extra": "52951 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.4082,
            "unit": "ms",
            "range": 2.2373,
            "extra": "293 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.4143,
            "extra": "201968 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0676,
            "unit": "ms",
            "range": 0.4547,
            "extra": "14783 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "0c81251faca4911a71e5af888ec52525ec7e8343",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T13:07:38Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/0c81251faca4911a71e5af888ec52525ec7e8343"
        },
        "date": 1754056451104,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.3004,
            "extra": "53046 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1501,
            "unit": "ms",
            "range": 0.9146999999999998,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2642,
            "extra": "214508 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.345,
            "extra": "15141 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "6c7033bb4514aaf9b2514c286aef3e5979043174",
          "message": "Feature/n8n integration",
          "timestamp": "2025-08-01T21:50:06Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/112/commits/6c7033bb4514aaf9b2514c286aef3e5979043174"
        },
        "date": 1754085754075,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.23520000000000002,
            "extra": "53352 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.125,
            "unit": "ms",
            "range": 0.4677000000000002,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.26940000000000003,
            "extra": "216236 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0654,
            "unit": "ms",
            "range": 0.30569999999999997,
            "extra": "15282 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "56956555+czlonkowski@users.noreply.github.com",
            "name": "Romuald Członkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7fbab3ec490ba59c0e9dc50e6551cf1c525bef6b",
          "message": "Merge pull request #112 from czlonkowski/feature/n8n-integration\n\n## [2.9.0] - 2025-08-01\n\n### Added\n- **n8n Integration with MCP Client Tool Support**: Complete n8n integration enabling n8n-mcp to run as MCP server within n8n workflows\n  - Full compatibility with n8n's MCP Client Tool node\n  - Dedicated n8n mode (`N8N_MODE=true`) for optimized operation\n  - Workflow examples and n8n-friendly tool descriptions\n  - Quick deployment script (`deploy/quick-deploy-n8n.sh`) for easy setup\n  - Docker configuration specifically for n8n deployment (`Dockerfile.n8n`, `docker-compose.n8n.yml`)\n  - Test scripts for n8n integration (`test-n8n-integration.sh`, `test-n8n-mode.sh`)\n- **n8n Deployment Documentation**: Comprehensive guide for deploying n8n-MCP with n8n (`docs/N8N_DEPLOYMENT.md`)\n  - Local testing instructions using `/scripts/test-n8n-mode.sh`\n  - Production deployment with Docker Compose\n  - Cloud deployment guide for Hetzner, AWS, and other providers\n  - n8n MCP Client Tool setup and configuration\n  - Troubleshooting section with common issues and solutions\n- **Protocol Version Negotiation**: Intelligent client detection for n8n compatibility\n  - Automatically detects n8n clients and uses protocol version 2024-11-05\n  - Standard MCP clients get the latest version (2025-03-26)\n  - Improves compatibility with n8n's MCP Client Tool node\n  - Comprehensive protocol negotiation test suite\n- **Comprehensive Parameter Validation**: Enhanced validation for all MCP tools\n  - Clear, user-friendly error messages for invalid parameters\n  - Numeric parameter conversion and edge case handling\n  - 52 new parameter validation tests\n  - Consistent error format across all tools\n- **Session Management**: Improved session handling with comprehensive test coverage\n  - Fixed memory leak potential with async cleanup\n  - Better connection close handling\n  - Enhanced session management tests\n- **Dynamic README Version Badge**: Made version badge update automatically from package.json\n  - Added `update-readme-version.js` script\n  - Enhanced `sync-runtime-version.js` to update README badges\n  - Version badge now stays in sync during publish workflow\n\n### Fixed\n- **Docker Build Optimization**: Fixed Dockerfile.n8n using wrong dependencies\n  - Now uses `package.runtime.json` instead of full `package.json`\n  - Reduces build time from 13+ minutes to 1-2 minutes\n  - Fixes ARM64 build failures due to network timeouts\n  - Reduces image size from ~1.5GB to ~280MB\n- **CI Test Failures**: Resolved Docker entrypoint permission issues\n  - Updated tests to accept dynamic UID range (10000-59999)\n  - Enhanced lock file creation with better error recovery\n  - Fixed TypeScript lint errors in test files\n  - Fixed flaky performance tests with deterministic versions\n- **Schema Validation Issues**: Fixed n8n nested output format compatibility\n  - Added validation for n8n's nested output workaround\n  - Fixed schema validation errors with n8n MCP Client Tool\n  - Enhanced error sanitization for production environments\n\n### Changed\n- **Memory Management**: Improved session cleanup to prevent memory leaks\n- **Error Handling**: Enhanced error sanitization for production environments\n- **Docker Security**: Using unpredictable UIDs/GIDs (10000-59999 range) for better security\n- **CI/CD Configuration**: Made codecov patch coverage informational to prevent CI failures on infrastructure code\n- **Test Scripts**: Enhanced with Docker auto-installation and better user experience\n  - Added colored output and progress indicators\n  - Automatic Docker installation for multiple operating systems\n  - n8n API key flow for management tools\n\n### Security\n- **Enhanced Docker Security**: Dynamic UID/GID generation for containers\n- **Error Sanitization**: Improved error messages to prevent information leakage\n- **Permission Handling**: Better permission management for mounted volumes\n- **Input Validation**: Comprehensive parameter validation prevents injection attacks",
          "timestamp": "2025-08-02T00:11:44+02:00",
          "tree_id": "a2f2d5456a92b9604b2f3b3e23b21ad299e043d0",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/7fbab3ec490ba59c0e9dc50e6551cf1c525bef6b"
        },
        "date": 1754086389396,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.3953,
            "extra": "52303 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1595,
            "unit": "ms",
            "range": 0.5754000000000001,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2658,
            "extra": "203787 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0665,
            "unit": "ms",
            "range": 0.3488,
            "extra": "15044 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "ff17fbcc0a812d908d207de06bfc0c5e77d06029",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T06:14:48Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/ff17fbcc0a812d908d207de06bfc0c5e77d06029"
        },
        "date": 1754115843696,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.25129999999999997,
            "extra": "53238 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1309,
            "unit": "ms",
            "range": 0.4227999999999996,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0053,
            "unit": "ms",
            "range": 0.2731,
            "extra": "187704 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0659,
            "unit": "ms",
            "range": 0.3314,
            "extra": "15172 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "066e7fc668963b101a589989906bcdffa83f408d",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T06:49:02Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/066e7fc668963b101a589989906bcdffa83f408d"
        },
        "date": 1754118671562,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0194,
            "unit": "ms",
            "range": 0.25260000000000005,
            "extra": "51523 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2001,
            "unit": "ms",
            "range": 1.4576999999999996,
            "extra": "312 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.2524,
            "extra": "198748 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0673,
            "unit": "ms",
            "range": 0.4016,
            "extra": "14857 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "a5c60ddde1f239a03ac94ec848ac6a0f968794e5",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T06:49:02Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/a5c60ddde1f239a03ac94ec848ac6a0f968794e5"
        },
        "date": 1754119354425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0205,
            "unit": "ms",
            "range": 0.2565,
            "extra": "48770 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1323,
            "unit": "ms",
            "range": 0.44430000000000014,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.26380000000000003,
            "extra": "216789 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0656,
            "unit": "ms",
            "range": 0.3096,
            "extra": "15242 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "35b4e77bcd0141cd1f49130f2b9f9f9b083a8b02",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T07:33:44Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/35b4e77bcd0141cd1f49130f2b9f9f9b083a8b02"
        },
        "date": 1754120210628,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0195,
            "unit": "ms",
            "range": 0.2333,
            "extra": "51284 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2692,
            "unit": "ms",
            "range": 0.6299000000000001,
            "extra": "306 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0051,
            "unit": "ms",
            "range": 0.2654,
            "extra": "196522 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0699,
            "unit": "ms",
            "range": 0.398,
            "extra": "14310 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "a2be2b36d569e8e5684ba911f4f6a116351ad94c",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T08:01:05Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/a2be2b36d569e8e5684ba911f4f6a116351ad94c"
        },
        "date": 1754122660631,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.2738,
            "extra": "53364 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1308,
            "unit": "ms",
            "range": 0.5044,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.24380000000000002,
            "extra": "214353 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0663,
            "unit": "ms",
            "range": 0.2764,
            "extra": "15083 ops/sec"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "committer": {
            "name": "czlonkowski",
            "username": "czlonkowski"
          },
          "id": "296bf76e682ed8adf7489e08ef3e11a66555bdf6",
          "message": "fix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T08:01:05Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/116/commits/296bf76e682ed8adf7489e08ef3e11a66555bdf6"
        },
        "date": 1754123352576,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.24069999999999997,
            "extra": "53007 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1221,
            "unit": "ms",
            "range": 0.4663999999999997,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2384,
            "extra": "205308 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0705,
            "unit": "ms",
            "range": 0.3566,
            "extra": "14183 ops/sec"
          }
        ]
      }
    ]
  }
}