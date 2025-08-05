window.BENCHMARK_DATA = {
  "lastUpdate": 1754375777063,
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
          "id": "f6906d7971c40adc5a30aada4a2c9aba99264ec3",
          "message": "Merge pull request #116 from czlonkowski/fix/issue-90-fixed-collection-validation\n\nfix: prevent 'propertyValues[itemName] is not iterable' error (fixes #90)",
          "timestamp": "2025-08-02T10:51:38+02:00",
          "tree_id": "9401ece475b1fbfce378f396494799984d608f30",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/f6906d7971c40adc5a30aada4a2c9aba99264ec3"
        },
        "date": 1754124783270,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0193,
            "unit": "ms",
            "range": 0.30589999999999995,
            "extra": "51868 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1516,
            "unit": "ms",
            "range": 0.4737,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.3856,
            "extra": "205391 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0659,
            "unit": "ms",
            "range": 0.3015,
            "extra": "15173 ops/sec"
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
          "id": "1c6bff7d428288b04235b24f5b7bd8686e909ccd",
          "message": "fix: Docker build failures and outdated pre-built images",
          "timestamp": "2025-08-02T08:58:21Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/117/commits/1c6bff7d428288b04235b24f5b7bd8686e909ccd"
        },
        "date": 1754126222980,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.2192,
            "extra": "53314 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1387,
            "unit": "ms",
            "range": 0.45809999999999995,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0051,
            "unit": "ms",
            "range": 0.27,
            "extra": "194194 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0666,
            "unit": "ms",
            "range": 0.3459,
            "extra": "15017 ops/sec"
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
          "id": "3eecda4bd51ae460232eff4554d1be7eea8ba76b",
          "message": "fix: Docker build failures and outdated pre-built images",
          "timestamp": "2025-08-02T09:37:19Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/117/commits/3eecda4bd51ae460232eff4554d1be7eea8ba76b"
        },
        "date": 1754128420228,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.30179999999999996,
            "extra": "52782 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1492,
            "unit": "ms",
            "range": 1.5722999999999998,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0049,
            "unit": "ms",
            "range": 0.2732,
            "extra": "205741 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0676,
            "unit": "ms",
            "range": 0.3385,
            "extra": "14803 ops/sec"
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
          "id": "6856add1770035bf8ae670ab81812120ba5c919c",
          "message": "fix: Docker build failures and outdated pre-built images",
          "timestamp": "2025-08-02T09:37:19Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/117/commits/6856add1770035bf8ae670ab81812120ba5c919c"
        },
        "date": 1754128572233,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.3255,
            "extra": "53337 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1359,
            "unit": "ms",
            "range": 0.5553000000000003,
            "extra": "319 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.25680000000000003,
            "extra": "217253 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0656,
            "unit": "ms",
            "range": 0.3508,
            "extra": "15240 ops/sec"
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
          "id": "6de82cd2b986442ad8d47f1b422ce157deda85eb",
          "message": "Merge pull request #117 from czlonkowski/bugfix/general-fixes\n\nfix: Docker build failures and outdated pre-built images",
          "timestamp": "2025-08-02T12:01:16+02:00",
          "tree_id": "b92536fb56fc4717bc29572e14a230096471772c",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/6de82cd2b986442ad8d47f1b422ce157deda85eb"
        },
        "date": 1754128961879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.3613,
            "extra": "52738 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1999,
            "unit": "ms",
            "range": 0.7241,
            "extra": "313 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2632,
            "extra": "213234 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0667,
            "unit": "ms",
            "range": 0.3528,
            "extra": "15002 ops/sec"
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
          "id": "907d3846a9eb4f978991177128996fe1d3f6ecbe",
          "message": "feat: Add automated release system with CI/CD pipeline",
          "timestamp": "2025-08-02T10:33:11Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/119/commits/907d3846a9eb4f978991177128996fe1d3f6ecbe"
        },
        "date": 1754131288260,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.27899999999999997,
            "extra": "53462 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.3121,
            "unit": "ms",
            "range": 3.0972000000000004,
            "extra": "302 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2564,
            "extra": "215854 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0659,
            "unit": "ms",
            "range": 0.3029,
            "extra": "15164 ops/sec"
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
          "id": "3bfad51519a502d969cc9d0cfb9da5c51ef01ff4",
          "message": "Merge pull request #119 from czlonkowski/ci-cd\n\nfeat: Add automated release system with CI/CD pipeline",
          "timestamp": "2025-08-02T13:03:38+02:00",
          "tree_id": "93edeb3937cf9e36022161f4005c3ed34fe2e2db",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/3bfad51519a502d969cc9d0cfb9da5c51ef01ff4"
        },
        "date": 1754132707592,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0206,
            "unit": "ms",
            "range": 0.6753,
            "extra": "48601 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1432,
            "unit": "ms",
            "range": 0.657,
            "extra": "318 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.2528,
            "extra": "201833 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.3407,
            "extra": "15157 ops/sec"
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
          "id": "7a71c3c3f89e7759f36fbc8a79e4b868d3f6a49c",
          "message": "fix: memory leak in SimpleCache causing MCP connection loss (fixes #118)",
          "timestamp": "2025-08-02T12:40:04Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/120/commits/7a71c3c3f89e7759f36fbc8a79e4b868d3f6a49c"
        },
        "date": 1754140255920,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.23490000000000003,
            "extra": "53339 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1287,
            "unit": "ms",
            "range": 0.43130000000000024,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2691,
            "extra": "215735 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.38739999999999997,
            "extra": "15156 ops/sec"
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
          "id": "df4066022f94584c8edd59cb829ecb9a0a848e5d",
          "message": "fix: memory leak in SimpleCache causing MCP connection loss (fixes #118)",
          "timestamp": "2025-08-02T12:40:04Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/120/commits/df4066022f94584c8edd59cb829ecb9a0a848e5d"
        },
        "date": 1754140849097,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.24619999999999997,
            "extra": "53084 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1545,
            "unit": "ms",
            "range": 0.6778999999999997,
            "extra": "317 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0052,
            "unit": "ms",
            "range": 0.3212,
            "extra": "192167 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0664,
            "unit": "ms",
            "range": 0.3721,
            "extra": "15064 ops/sec"
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
          "id": "9e71c71698520dc729da42ed6d9510277018be80",
          "message": "Merge pull request #120 from czlonkowski/fix/issue-118-mcp-connection-loss\n\n### Fixed\n- **Memory Leak in SimpleCache**: Fixed critical memory leak causing MCP server connection loss after several hours (fixes #118)\n  - Added proper timer cleanup in `SimpleCache.destroy()` method\n  - Updated MCP server shutdown to clean up cache timers\n  - Enhanced HTTP server error handling with transport error handlers\n  - Fixed event listener cleanup to prevent accumulation\n  - Added comprehensive test coverage for memory leak prevention",
          "timestamp": "2025-08-02T15:24:53+02:00",
          "tree_id": "3a251849a9284d47dc62a67986384b27e01014e2",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/9e71c71698520dc729da42ed6d9510277018be80"
        },
        "date": 1754141174983,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 1.1844,
            "extra": "52621 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1152,
            "unit": "ms",
            "range": 0.5049999999999999,
            "extra": "321 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.2639,
            "extra": "215603 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.3366,
            "extra": "15161 ops/sec"
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
          "id": "8022ee1f65b954eff4e601819ecc38977cdf295d",
          "message": "feat: add automated release workflow for npm publishing\n\n- Add release.yml GitHub workflow for automated npm releases\n- Add prepare-release.js script for version bumping and changelog\n- Add extract-changelog.js for release notes extraction\n- Add test-release-automation.js for testing the workflow\n- Add documentation for automated releases\n\nThis enables automatic npm publishing when tags are pushed,\nfixing the issue where releases were created but npm packages\nwere not published.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-08-02T21:14:00+02:00",
          "tree_id": "417f4aac4a932b9063c9a397364f6fb4ddd6e5f0",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/8022ee1f65b954eff4e601819ecc38977cdf295d"
        },
        "date": 1754162135128,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.23369999999999996,
            "extra": "53256 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1299,
            "unit": "ms",
            "range": 0.43489999999999984,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.2627,
            "extra": "212416 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0657,
            "unit": "ms",
            "range": 0.3036,
            "extra": "15222 ops/sec"
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
          "id": "7dc938065f3223091c823befbf7fb563c427424c",
          "message": "fix: resolve YAML syntax error in release workflow\n\n- Fix multiline commit message syntax that was breaking YAML parsing\n- Add missing GITHUB_TOKEN environment variable for gh CLI commands\n- Simplify commit message to avoid YAML parsing issues\n\nThe workflow was failing due to unescaped multiline string in git commit command.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-08-02T21:32:27+02:00",
          "tree_id": "cfd9e6f0c17ec4e7f502ca0db9774d635dfe5ec5",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/7dc938065f3223091c823befbf7fb563c427424c"
        },
        "date": 1754163242780,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.24680000000000002,
            "extra": "53251 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1272,
            "unit": "ms",
            "range": 1.9423000000000004,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.27390000000000003,
            "extra": "216204 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0657,
            "unit": "ms",
            "range": 0.3552,
            "extra": "15218 ops/sec"
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
          "id": "1a99e9c6c733841e214ed329cc7513db2fb76e64",
          "message": "fix: resolve YAML syntax error in release workflow\n\n- Fix GitHub Actions expression in shell script by using env variable\n- Prevents YAML parsing error on line 452\n- Ensures workflow can execute properly\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-08-02T21:34:49+02:00",
          "tree_id": "fe4b51c5f7d466c2b5cada46a7748778e0990a13",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/1a99e9c6c733841e214ed329cc7513db2fb76e64"
        },
        "date": 1754163376980,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0189,
            "unit": "ms",
            "range": 0.2714,
            "extra": "52955 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.2654,
            "unit": "ms",
            "range": 1.5471000000000004,
            "extra": "306 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2882,
            "extra": "208321 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0661,
            "unit": "ms",
            "range": 0.3105,
            "extra": "15133 ops/sec"
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
          "id": "e94bb5479cbe9feb4561d61e43d8671203a5e8d3",
          "message": "Fix deploy on Railway button",
          "timestamp": "2025-08-02T21:42:00+02:00",
          "tree_id": "2606d14c8b2229f2befd8735896d22b857c4571f",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/e94bb5479cbe9feb4561d61e43d8671203a5e8d3"
        },
        "date": 1754163841523,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.35469999999999996,
            "extra": "53293 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1667,
            "unit": "ms",
            "range": 0.7376,
            "extra": "316 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.27290000000000003,
            "extra": "206624 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0668,
            "unit": "ms",
            "range": 0.4093,
            "extra": "14961 ops/sec"
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
          "id": "08f3d8120dd59e8b7bc4b04887e7c11dd61a6d33",
          "message": "fix: skip CI/CD workflows for documentation-only changes",
          "timestamp": "2025-08-02T19:56:55Z",
          "url": "https://github.com/czlonkowski/n8n-mcp/pull/121/commits/08f3d8120dd59e8b7bc4b04887e7c11dd61a6d33"
        },
        "date": 1754166352414,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0187,
            "unit": "ms",
            "range": 0.24699999999999997,
            "extra": "53542 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1245,
            "unit": "ms",
            "range": 0.44079999999999986,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0046,
            "unit": "ms",
            "range": 0.24330000000000002,
            "extra": "216295 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.066,
            "unit": "ms",
            "range": 0.2671,
            "extra": "15158 ops/sec"
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
          "id": "035c4a349e848baa04b36f4bffdd47f7cad0325d",
          "message": "Merge pull request #121 from czlonkowski/fix/ci-skip-docs-only-changes\n\nfix: skip CI/CD workflows for documentation-only changes",
          "timestamp": "2025-08-02T22:57:58+02:00",
          "tree_id": "66a1b5b36de41b0594fb6e444df54baadb54bd06",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/035c4a349e848baa04b36f4bffdd47f7cad0325d"
        },
        "date": 1754168355467,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0188,
            "unit": "ms",
            "range": 0.2869,
            "extra": "53217 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1259,
            "unit": "ms",
            "range": 0.6545999999999998,
            "extra": "320 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.005,
            "unit": "ms",
            "range": 0.3068,
            "extra": "199967 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0656,
            "unit": "ms",
            "range": 0.301,
            "extra": "15240 ops/sec"
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
          "id": "6d95786938afe2cc278264ae708573848bcfa6f0",
          "message": "2.10.2",
          "timestamp": "2025-08-05T08:09:22+02:00",
          "tree_id": "d37cac8a2aabf90ebf74d01af6da355d21e0e363",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/6d95786938afe2cc278264ae708573848bcfa6f0"
        },
        "date": 1754374296601,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.019,
            "unit": "ms",
            "range": 0.2854,
            "extra": "52759 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.163,
            "unit": "ms",
            "range": 0.5223,
            "extra": "316 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0047,
            "unit": "ms",
            "range": 0.25070000000000003,
            "extra": "211067 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0708,
            "unit": "ms",
            "range": 0.3591,
            "extra": "14129 ops/sec"
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
          "id": "ba3d1b35f2c2f8940c9903686260a16d0fb418d4",
          "message": "fix: remove conflicting paths-ignore from release workflow\n\n- GitHub Actions doesn't support both 'paths' and 'paths-ignore' in the same trigger\n- This was causing the release workflow to fail on startup\n- Keeping only the 'paths' filter for package.json changes\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-08-05T08:34:35+02:00",
          "tree_id": "2e474d55b23e880e33ce0e59e41d8f7dc80698d9",
          "url": "https://github.com/czlonkowski/n8n-mcp/commit/ba3d1b35f2c2f8940c9903686260a16d0fb418d4"
        },
        "date": 1754375776779,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "sample - array sorting - small",
            "value": 0.0191,
            "unit": "ms",
            "range": 0.2687,
            "extra": "52277 ops/sec"
          },
          {
            "name": "sample - array sorting - large",
            "value": 3.1747,
            "unit": "ms",
            "range": 0.7626,
            "extra": "315 ops/sec"
          },
          {
            "name": "sample - string concatenation",
            "value": 0.0048,
            "unit": "ms",
            "range": 0.2757,
            "extra": "207606 ops/sec"
          },
          {
            "name": "sample - object creation",
            "value": 0.0677,
            "unit": "ms",
            "range": 0.49219999999999997,
            "extra": "14771 ops/sec"
          }
        ]
      }
    ]
  }
}