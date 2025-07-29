window.BENCHMARK_DATA = {
  "lastUpdate": 1753775570502,
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
          "id": "e66a17b5c2f83df0689f0fc3c27d4e64ee1d8191",
          "message": "fix: disable flaky test and fix benchmark workflow git conflicts\n\n- Skipped the environment configuration test that consistently fails in CI\n- Added workspace cleanup step in benchmark workflow to prevent git conflicts\n- Stash uncommitted changes before benchmark-action switches branches\n\nThis should finally get all CI workflows passing.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-29T08:54:10+02:00",
          "tree_id": "f168720fd43230ee6b99518e83df1ad9b2c23d99",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/e66a17b5c2f83df0689f0fc3c27d4e64ee1d8191"
        },
        "date": 1753772169966,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0135,
            "unit": "ms",
            "range": 0.21789999999999998,
            "extra": "74100 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 2.3265,
            "unit": "ms",
            "range": 0.8298999999999999,
            "extra": "430 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0032,
            "unit": "ms",
            "range": 0.26320000000000005,
            "extra": "309346 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0476,
            "unit": "ms",
            "range": 0.30010000000000003,
            "extra": "20994 ops/sec"
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
          "id": "1d464e29e53a4b229c5a5d95f5dd187a652cc2c3",
          "message": "test: add Phase 4 database integration tests (partial)\n\n- Add comprehensive test utilities for database testing\n- Implement connection management tests for in-memory and file databases\n- Add transaction tests including nested transactions and savepoints\n- Test database lifecycle, error handling, and performance\n- Include tests for WAL mode, connection pooling, and constraints\n\nPart of Phase 4: Integration Testing",
          "timestamp": "2025-07-29T09:36:14+02:00",
          "tree_id": "fe63070c969006990c2490c10a400167c6a5a8fd",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/1d464e29e53a4b229c5a5d95f5dd187a652cc2c3"
        },
        "date": 1753774675129,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0135,
            "unit": "ms",
            "range": 0.21789999999999998,
            "extra": "74100 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 2.3265,
            "unit": "ms",
            "range": 0.8298999999999999,
            "extra": "430 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0032,
            "unit": "ms",
            "range": 0.26320000000000005,
            "extra": "309346 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0476,
            "unit": "ms",
            "range": 0.30010000000000003,
            "extra": "20994 ops/sec"
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
          "id": "253b51f5c6024fe94bb84a6560e591a6bc25857f",
          "message": "fix: resolve database integration test issues\n\n- Fix better-sqlite3 import statements to use namespace import\n- Update test schemas to match actual database schema\n- Align NodeRepository tests with actual API implementation\n- Fix FTS5 tests to work with templates instead of nodes\n- Update mock data to match ParsedNode interface\n- Fix column names to match actual schema (node_type, package_name, etc)\n- Add proper ParsedNode creation helper function\n- Remove tests for non-existent foreign key constraints",
          "timestamp": "2025-07-29T09:47:44+02:00",
          "tree_id": "a48bedbc4210fb26c98a19da7c4b93360f57fd76",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/253b51f5c6024fe94bb84a6560e591a6bc25857f"
        },
        "date": 1753775367107,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0135,
            "unit": "ms",
            "range": 0.21789999999999998,
            "extra": "74100 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 2.3265,
            "unit": "ms",
            "range": 0.8298999999999999,
            "extra": "430 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0032,
            "unit": "ms",
            "range": 0.26320000000000005,
            "extra": "309346 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0476,
            "unit": "ms",
            "range": 0.30010000000000003,
            "extra": "20994 ops/sec"
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
          "id": "9470986650b097288f18db653a809d147c896fab",
          "message": "test: add template repository and performance integration tests\n\n- Add comprehensive TemplateRepository integration tests\n- Test FTS5 functionality with templates\n- Add performance benchmarks for database operations\n- Test concurrent read/write operations\n- Measure memory usage and query performance\n- Verify index optimization and WAL mode benefits\n- Include bulk operation performance tests\n\nPart of Phase 4: Integration Testing",
          "timestamp": "2025-07-29T09:51:13+02:00",
          "tree_id": "3ad46519a211e2d262db4d1625d225c799e6c0c7",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/9470986650b097288f18db653a809d147c896fab"
        },
        "date": 1753775570209,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0135,
            "unit": "ms",
            "range": 0.21789999999999998,
            "extra": "74100 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 2.3265,
            "unit": "ms",
            "range": 0.8298999999999999,
            "extra": "430 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0032,
            "unit": "ms",
            "range": 0.26320000000000005,
            "extra": "309346 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0476,
            "unit": "ms",
            "range": 0.30010000000000003,
            "extra": "20994 ops/sec"
          }
        ]
      }
    ]
  }
}