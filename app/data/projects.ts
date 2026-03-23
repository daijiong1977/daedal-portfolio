export interface Project {
  name: string
  description: string
  year: string
  tags: string[]
  url?: string
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'OpenSearch CLI',
    description:
      'A powerful command-line interface for exploring and querying Elasticsearch/OpenSearch clusters. Supports fuzzy search, index exploration, and query profiling.',
    year: '2025',
    tags: ['Go', 'CLI', 'Elasticsearch'],
    github: 'https://github.com/daedaldai/opensearch-cli',
    featured: true,
  },
  {
    name: 'GoRoutine Monitor',
    description:
      'Real-time goroutine visualization and leak detection for Go applications. Integrates with pprof and exports Prometheus metrics.',
    year: '2025',
    tags: ['Go', 'observability', 'DevTools'],
    github: 'https://github.com/daedaldai/goroutine-monitor',
    featured: true,
  },
  {
    name: 'Daedal.dev',
    description:
      'This website — my personal digital garden. Built with Next.js, TypeScript, and Tailwind CSS. Open source.',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/daedaldai/daedal.dev',
    featured: true,
  },
  {
    name: 'DevKit',
    description:
      'A curated collection of shell scripts and utilities for developer productivity — from smart git aliases to cross-platform dev environment bootstrapping.',
    year: '2024',
    tags: ['Shell', 'DevTools', 'productivity'],
    github: 'https://github.com/daedaldai/devkit',
    featured: false,
  },
  {
    name: 'Flux Config',
    description:
      'Declarative configuration management for distributed services. Define config schemas once, validate everywhere.',
    year: '2024',
    tags: ['Go', 'configuration', 'distributed-systems'],
    github: 'https://github.com/daedaldai/flux-config',
    featured: false,
  },
]
