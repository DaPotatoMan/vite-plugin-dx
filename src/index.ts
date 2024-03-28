import { components, console, devtools, imports, jsx } from './exports'

const plugins = { components, console, devtools, imports, jsx }

type PluginMap = typeof plugins

type Config = {
  [K in keyof PluginMap]: Parameters<PluginMap[K]>[0] | false
}

export function VueDX(config: Partial<Config> = {}) {
  const list: any[] = []

  for (const [key, plugin] of Object.entries(plugins)) {
    const pluginArgs = config[key as keyof PluginMap]

    // Skip disabled plugin
    if (pluginArgs === false)
      continue

    list.push(
      plugin(pluginArgs as any),
    )
  }

  return list
}

export * from './exports'
