import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['src/index'],
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
    },
  },
  {
    entries: ['src/cli/index'],
    outDir: 'bin',
    rollup: {
      emitCJS: true,
    },
  },
])
