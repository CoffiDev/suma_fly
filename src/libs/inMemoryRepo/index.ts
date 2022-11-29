export const inMemoryRepo = <T>(initialRepo: (T & { id: string })[] = []) => {
  const repo = [...initialRepo]

  const getAll = async () => repo

  const create = async (item: T) => {
    const id = Math.random().toString()
    const n = { ...item, id }
    repo.push(n)
    return n
  }

  const remove = async (id: string) => {
    const a = repo.findIndex(({ id: aid }) => id === aid)

    if (a < 0) {
      return { found: false }
    } else {
      repo.splice(a, 1)
      return { found: true }
    }
  }

  const update = async (id: string, update: T) => {
    const index = repo.findIndex(({ id: aid }) => id === aid)

    if (index < 0) {
      return { found: false, item: null } as const
    } else {
      repo[index] = { ...repo[index], ...update }
      return { found: true, item: repo[index] } as const
    }
  }

  return { getAll, create, remove, update }
}
