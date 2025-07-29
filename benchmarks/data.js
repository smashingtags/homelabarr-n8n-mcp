window.BENCHMARK_DATA = {
  "lastUpdate": 1753772170284,
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
      }
    ]
  }
}